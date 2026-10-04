# Hard-constraint builders for the OptiShift P03 optimizer.
#
# Depends only on PuLP and the domain/optimizer models. Each function adds
# one family of hard constraints (H1..H6) to the problem. H1/H5/H6 are
# enforced structurally: variables are only created for eligible
# (employee, shift) pairs (see solver.py), so an ineligible assignment is
# impossible by construction. The remaining constraints are linear rules.

from typing import Dict, List, Tuple

import pulp

from app.models.domain import Employee, Shift, StaffingRequirement
from app.optimizer.model import employee_eligible, shift_duration_hours


def build_eligibility(
    employees: List[Employee],
    shifts: List[Shift],
    requirements_by_shift: Dict[str, StaffingRequirement],
) -> Tuple[Dict[Tuple[str, str], bool], Dict[Tuple[str, str], str]]:
    """Precompute the eligible (employee, shift) pairs.

    Returns (eligible, reasons) where eligible[(e, s)] is True only when the
    employee satisfies H1 (availability), H5 (skills + role) and H6 (active
    status) for the shift. Reasons hold the human-readable cause for every
    ineligible pair and are used for infeasibility diagnostics.
    """
    eligible: Dict[Tuple[str, str], bool] = {}
    reasons: Dict[Tuple[str, str], str] = {}
    for employee in employees:
        for shift in shifts:
            req = requirements_by_shift.get(shift.id)
            required_skills = req.required_skills if req else []
            ok, reason = employee_eligible(employee, shift, required_skills)
            eligible[(employee.id, shift.id)] = ok
            if not ok:
                reasons[(employee.id, shift.id)] = reason
    return eligible, reasons


def add_staffing_constraints(
    prob: pulp.LpProblem,
    variables: Dict[Tuple[str, str], pulp.LpVariable],
    shifts: List[Shift],
    requirements_by_shift: Dict[str, StaffingRequirement],
    eligible: Dict[Tuple[str, str], bool],
    employees: List[Employee],
) -> None:
    """H4 — every shift meets its minimum staffing level."""
    for shift in shifts:
        req = requirements_by_shift.get(shift.id)
        minimum = req.min_employees if req else 0
        if minimum <= 0:
            continue
        prob += (
            pulp.lpSum(
                variables[(e.id, shift.id)]
                for e in employees
                if eligible.get((e.id, shift.id), False)
            )
            >= minimum,
            f"H4_min_staffing_{shift.id}",
        )


def add_one_shift_per_day_constraints(
    prob: pulp.LpProblem,
    variables: Dict[Tuple[str, str], pulp.LpVariable],
    employees: List[Employee],
    shifts: List[Shift],
    eligible: Dict[Tuple[str, str], bool],
) -> None:
    """H2 — one shift per employee per day (also forbids same-day overlaps)."""
    shifts_by_date: Dict[object, List[Shift]] = {}
    for shift in shifts:
        shifts_by_date.setdefault(shift.shift_date, []).append(shift)
    for employee in employees:
        for day, day_shifts in shifts_by_date.items():
            terms = [
                variables[(employee.id, s.id)]
                for s in day_shifts
                if eligible.get((employee.id, s.id), False)
            ]
            if len(terms) > 1:
                prob += (
                    pulp.lpSum(terms) <= 1,
                    f"H2_one_shift_per_day_{employee.id}_{day}",
                )


def add_max_hours_constraints(
    prob: pulp.LpProblem,
    variables: Dict[Tuple[str, str], pulp.LpVariable],
    employees: List[Employee],
    shifts: List[Shift],
    eligible: Dict[Tuple[str, str], bool],
    durations: Dict[str, float],
) -> None:
    """H3 — no employee exceeds max_weekly_hours (based on shift durations)."""
    for employee in employees:
        terms = [
            durations[s.id] * variables[(employee.id, s.id)]
            for s in shifts
            if eligible.get((employee.id, s.id), False)
        ]
        if terms:
            prob += (
                pulp.lpSum(terms) <= employee.max_weekly_hours + 1e-9,
                f"H3_max_weekly_hours_{employee.id}",
            )
