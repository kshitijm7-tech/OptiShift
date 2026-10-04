# Baseline schedule generator (P06).
#
# The baseline models a reasonable MANUAL scheduling pass — the way a busy
# manager fills the week from the roster, without any cost optimization and
# without the P03 objective function. It is deliberately simple and fully
# explainable:
#
#   1. Hard-to-fill shifts first: within each day, shifts whose eligible
#      pool is smallest are filled before easy ones (a real scheduler
#      secures the skill-constrained rush shifts before generic ones).
#   2. Roster order: eligible employees are tried in a fixed roster order —
#      availability-scarcest first (protect scarce availability), then id.
#   3. Fill staffing minimums only, respecting the fundamental feasibility
#      rules: active status, required role/skills, availability coverage,
#      one shift per person per day, and max weekly hours.
#   4. No cost is considered anywhere — that is exactly the difference the
#      comparison must expose.
#
# The baseline NEVER runs PuLP/CBC and never changes optimizer behaviour;
# metrics are computed with the same pure function the optimizer uses
# (objectives.calculate_metrics) so both sides are measured identically.

from collections import defaultdict
from typing import Dict, List, Tuple

from pydantic import BaseModel

from app.models.domain import Employee, Shift, StaffingRequirement
from app.optimizer.constraints import build_eligibility
from app.optimizer.model import (
    Assignment,
    ObjectiveWeights,
    OptimizationMetrics,
    OptimizeRequest,
    SolverInfo,
    employee_eligible,
    shift_duration_hours,
)
from app.optimizer.objectives import calculate_metrics

BASELINE_SOLVER_NAME = "manual-baseline"
BASELINE_STATUS = "deterministic"


class BaselineSchedule(BaseModel):
    """A schedule produced by the deterministic manual baseline.

    Status is intentionally NOT "optimal": the baseline makes no claim of
    optimality. It reuses the P03 assignment/metrics contracts verbatim so
    both sides of a comparison are measured the same way.
    """

    status: str = "baseline"
    assignments: List[Assignment] = []
    shifts: List[Shift] = []
    employees: List[Employee] = []
    requirements: List[StaffingRequirement] = []
    metrics: OptimizationMetrics
    solver: SolverInfo
    explanation: List[str] = []


def _availability_day_count(employee: Employee) -> int:
    """Days the employee can work (7 = open availability, tried last)."""
    if not employee.availability:
        return 7
    return len({slot.day_of_week for slot in employee.availability})


class BaselineService:
    @staticmethod
    def generate_baseline(request: OptimizeRequest) -> BaselineSchedule:
        # Deterministic ordering everywhere (mirrors the optimizer's rules).
        employees: List[Employee] = sorted(request.employees, key=lambda e: e.id)
        shifts: List[Shift] = sorted(
            request.shifts, key=lambda s: (s.shift_date, s.start_time, s.id)
        )
        requirements_by_shift: Dict[str, StaffingRequirement] = {}
        for req in sorted(request.requirements, key=lambda r: r.shift_id):
            requirements_by_shift.setdefault(req.shift_id, req)

        durations = {s.id: shift_duration_hours(s) for s in shifts}
        eligible, _reasons = build_eligibility(employees, shifts, requirements_by_shift)
        pool_sizes = {
            shift.id: sum(
                1 for e in employees if eligible.get((e.id, shift.id), False)
            )
            for shift in shifts
        }

        # Roster order: availability-scarcest first, then employee id.
        roster_order = sorted(
            employees,
            key=lambda e: (_availability_day_count(e), e.id),
        )

        assignments: List[Assignment] = []
        explanation: List[str] = [
            "Baseline built like a manual roster pass: shifts with the "
            "fewest eligible employees are filled first, team members are "
            "picked in availability order, and every assignment respects "
            "availability, skills, hour limits, and one shift per day. "
            "Staff cost is not optimized."
        ]

        hours: Dict[str, float] = defaultdict(float)
        days_used: Dict[str, set] = defaultdict(set)
        shortfall_by_shift: List[str] = []

        # Chronological days; hard-to-fill shifts first within a day.
        ordered_shifts: List[Shift] = sorted(
            shifts,
            key=lambda s: (s.shift_date, pool_sizes.get(s.id, 0), s.start_time, s.id),
        )
        for shift in ordered_shifts:
            req = requirements_by_shift.get(shift.id)
            needed = req.min_employees if req else 0
            if needed <= 0:
                continue
            required_skills = req.required_skills if req else []
            assigned = 0
            for employee in roster_order:
                if assigned >= needed:
                    break
                if not eligible.get((employee.id, shift.id), False):
                    continue
                ok, _reason = employee_eligible(employee, shift, required_skills)
                if not ok:
                    continue
                if shift.shift_date in days_used[employee.id]:
                    continue  # one shift per person per day
                if hours[employee.id] + durations[shift.id] > employee.max_weekly_hours + 1e-9:
                    continue  # hard weekly-hours cap
                assignments.append(
                    Assignment(
                        employee_id=employee.id,
                        shift_id=shift.id,
                        assigned_date=shift.shift_date,
                    )
                )
                days_used[employee.id].add(shift.shift_date)
                hours[employee.id] += durations[shift.id]
                assigned += 1
            if assigned < needed:
                shortfall_by_shift.append(
                    f"shift '{shift.id}' could only be staffed with "
                    f"{assigned} of {needed} required employees"
                )

        pairs: List[Tuple[str, str]] = [(a.employee_id, a.shift_id) for a in assignments]
        metrics, _breakdown = calculate_metrics(
            dict(hours), employees, shifts, durations, pairs, ObjectiveWeights()
        )

        if shortfall_by_shift:
            explanation.extend(
                [
                    "Some shifts could not be fully staffed by the manual "
                    "pass: " + " ".join(shortfall_by_shift)
                ]
            )
        pay = {e.id: e.hourly_pay for e in employees}
        explanation.extend(
            f"{a.employee_id} -> {a.shift_id} on {a.assigned_date} "
            f"({pay.get(a.employee_id, 0.0):.2f}/h x "
            f"{durations.get(a.shift_id, 0.0):.1f}h)"
            for a in sorted(
                assignments,
                key=lambda a: (a.assigned_date, a.shift_id, a.employee_id),
            )
        )
        return BaselineSchedule(
            status="baseline",
            assignments=sorted(
                assignments,
                key=lambda a: (a.assigned_date, a.shift_id, a.employee_id),
            ),
            shifts=list(request.shifts),
            employees=list(request.employees),
            requirements=list(request.requirements),
            metrics=metrics,
            solver=SolverInfo(solver=BASELINE_SOLVER_NAME, status=BASELINE_STATUS),
            explanation=explanation,
        )
