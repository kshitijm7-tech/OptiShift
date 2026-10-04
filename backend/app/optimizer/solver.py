# PuLP/CBC solver orchestration for OptiShift P03.
#
# Pipeline: validate input -> build eligibility -> construct problem ->
# add variables (binary x[e,s], eligible pairs only) -> add hard
# constraints H2/H3/H4 -> add weighted soft objective -> invoke CBC ->
# inspect status -> extract assignments -> post-validate -> metrics ->
# structured OptimizationResult.
#
# Depends only on PuLP + domain/optimizer models. Fully testable without
# FastAPI. Deterministic: all iteration is over explicitly sorted ids.

import time
from typing import Dict, List

import pulp

from app.models.domain import Employee, Shift, StaffingRequirement
from app.optimizer import constraints as C
from app.optimizer import objectives as O
from app.optimizer.model import (
    Assignment,
    OptimizationResult,
    OptimizationStatus,
    OptimizeRequest,
    SolverInfo,
    is_employee_active,
    shift_duration_hours,
)
from app.optimizer.validator import validate_assignments

SOLVER_NAME = "PULP_CBC_CMD"


def _error_result(messages: List[str]) -> OptimizationResult:
    return OptimizationResult(
        status=OptimizationStatus.ERROR,
        violations=messages,
        solver=SolverInfo(solver=SOLVER_NAME, status="error"),
        explanation=messages,
    )


def _infeasible_result(
    messages: List[str], solver_status: str, elapsed: float
) -> OptimizationResult:
    return OptimizationResult(
        status=OptimizationStatus.INFEASIBLE,
        violations=messages,
        solver=SolverInfo(
            solver=SOLVER_NAME, status=solver_status, solve_seconds=round(elapsed, 4)
        ),
        explanation=[
            "No schedule satisfying the current rules could be created. "
            + " ".join(messages)
        ],
    )


def _validate_request(request: OptimizeRequest) -> List[str]:
    errors: List[str] = []
    if not request.employees:
        errors.append("at least one employee is required")
    if not request.shifts:
        errors.append("at least one shift is required")
    if len({e.id for e in request.employees}) != len(request.employees):
        errors.append("duplicate employee ids in request")
    if len({s.id for s in request.shifts}) != len(request.shifts):
        errors.append("duplicate shift ids in request")
    shift_ids = {s.id for s in request.shifts}
    for req in request.requirements:
        if req.shift_id not in shift_ids:
            errors.append(
                f"staffing requirement references unknown shift '{req.shift_id}'"
            )
        if req.min_employees < 0:
            errors.append(
                f"staffing requirement for shift '{req.shift_id}' "
                "has negative min_employees"
            )
    return errors


def solve_optimization(request: OptimizeRequest) -> OptimizationResult:
    # Deterministic ordering everywhere.
    employees: List[Employee] = sorted(request.employees, key=lambda e: e.id)
    shifts: List[Shift] = sorted(
        request.shifts, key=lambda s: (s.shift_date, s.start_time, s.id)
    )
    requirements_by_shift: Dict[str, StaffingRequirement] = {}
    for req in sorted(request.requirements, key=lambda r: r.shift_id):
        requirements_by_shift.setdefault(req.shift_id, req)

    errors = _validate_request(request)
    if errors:
        return _error_result(errors)

    durations = {s.id: shift_duration_hours(s) for s in shifts}
    eligible, reasons = C.build_eligibility(employees, shifts, requirements_by_shift)

    # Early, explainable infeasibility: a shift whose eligible pool is
    # smaller than its minimum can never be staffed. Reported directly with
    # the blocking reason instead of a bare solver verdict.
    for shift in shifts:
        req = requirements_by_shift.get(shift.id)
        minimum = req.min_employees if req else 0
        if minimum <= 0:
            continue
        pool = [e for e in employees if eligible.get((e.id, shift.id), False)]
        if len(pool) < minimum:
            detail = (
                f"shift '{shift.id}' requires {minimum} employees but only "
                f"{len(pool)} eligible employees exist"
            )
            active_pool = [e for e in pool if is_employee_active(e)]
            if not active_pool:
                detail += " (no active, skilled and available employees)"
            return _infeasible_result([detail], "precheck_infeasible", 0.0)

    prob = pulp.LpProblem("optishift_schedule", pulp.LpMinimize)
    variables = {
        (e.id, s.id): pulp.LpVariable(f"x_{e.id}_{s.id}", cat="Binary")
        for e in employees
        for s in shifts
        if eligible.get((e.id, s.id), False)
    }

    C.add_staffing_constraints(
        prob, variables, shifts, requirements_by_shift, eligible, employees
    )
    C.add_one_shift_per_day_constraints(prob, variables, employees, shifts, eligible)
    C.add_max_hours_constraints(prob, variables, employees, shifts, eligible, durations)
    peak = O.add_peak_load_variable(
        prob, variables, employees, shifts, eligible, durations
    )
    O.build_objective(
        prob, variables, employees, shifts, eligible, durations, request.weights, peak
    )

    started = time.perf_counter()
    try:
        prob.solve(pulp.PULP_CBC_CMD(msg=0))
    except Exception as exc:  # solver binary failure, missing exe, etc.
        elapsed = time.perf_counter() - started
        return _error_result([f"solver failure: {exc}"])
    elapsed = time.perf_counter() - started
    raw_status = pulp.LpStatus.get(prob.status, "Unknown")

    if raw_status != "Optimal":
        if raw_status == "Infeasible":
            return _infeasible_result(
                ["the solver proved no feasible schedule exists "
                 "under the current constraints"],
                raw_status,
                elapsed,
            )
        return _error_result(
            [f"solver did not reach an optimal solution (status: {raw_status})"]
        )

    assignments: List[Assignment] = []
    employee_hours: Dict[str, float] = {}
    pairs: List[tuple] = []
    for e in employees:
        for s in shifts:
            var = variables.get((e.id, s.id))
            if var is not None and (var.value() or 0) > 0.5:
                assignments.append(
                    Assignment(
                        employee_id=e.id, shift_id=s.id, assigned_date=s.shift_date
                    )
                )
                employee_hours[e.id] = employee_hours.get(e.id, 0.0) + durations[s.id]
                pairs.append((e.id, s.id))

    violations = validate_assignments(
        assignments, employees, shifts, requirements_by_shift
    )
    if violations:
        # Never ship an invalid schedule: surface as an error with diagnostics.
        return OptimizationResult(
            status=OptimizationStatus.ERROR,
            assignments=assignments,
            violations=violations,
            solver=SolverInfo(
                solver=SOLVER_NAME,
                status="OptimalButInvalid",
                solve_seconds=round(elapsed, 4),
            ),
            explanation=[
                "The solver returned a schedule that failed independent "
                "validation; it was rejected. " + " ".join(violations)
            ],
        )

    metrics, breakdown = O.calculate_metrics(
        employee_hours, employees, shifts, durations, pairs, request.weights
    )
    pay = {e.id: e.hourly_pay for e in employees}
    explanation = [
        f"{a.employee_id} -> {a.shift_id} on {a.assigned_date} "
        f"({pay.get(a.employee_id, 0.0):.2f}/h x "
        f"{durations.get(a.shift_id, 0.0):.1f}h)"
        for a in sorted(assignments, key=lambda a: (a.assigned_date, a.shift_id, a.employee_id))
    ]
    return OptimizationResult(
        status=OptimizationStatus.OPTIMAL,
        assignments=sorted(
            assignments, key=lambda a: (a.assigned_date, a.shift_id, a.employee_id)
        ),
        metrics=metrics,
        violations=[],
        objective_breakdown=breakdown,
        solver=SolverInfo(
            solver=SOLVER_NAME, status=raw_status, solve_seconds=round(elapsed, 4)
        ),
        explanation=explanation,
    )
