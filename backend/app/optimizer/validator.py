# Post-solve validator for P03.
#
# Independently re-checks every hard constraint against a solved schedule so
# that a modelling bug can never silently ship an invalid roster. Returns a
# list of human-readable violations (empty means the schedule is valid).

from collections import defaultdict
from typing import Dict, List

from app.models.domain import Employee, Shift, StaffingRequirement
from app.optimizer.model import (
    Assignment,
    employee_eligible,
    shift_duration_hours,
    shifts_overlap,
)


def validate_assignments(
    assignments: List[Assignment],
    employees: List[Employee],
    shifts: List[Shift],
    requirements_by_shift: Dict[str, StaffingRequirement],
) -> List[str]:
    violations: List[str] = []
    employees_by_id = {e.id: e for e in employees}
    shifts_by_id = {s.id: s for s in shifts}

    seen = set()
    per_employee_shifts: Dict[str, List[Shift]] = defaultdict(list)
    hours: Dict[str, float] = defaultdict(float)
    count_per_shift: Dict[str, int] = defaultdict(int)

    for a in assignments:
        if (a.employee_id, a.shift_id) in seen:
            violations.append(
                f"duplicate assignment: employee '{a.employee_id}' "
                f"assigned twice to shift '{a.shift_id}'"
            )
        seen.add((a.employee_id, a.shift_id))

        employee = employees_by_id.get(a.employee_id)
        shift = shifts_by_id.get(a.shift_id)
        if employee is None:
            violations.append(f"unknown employee '{a.employee_id}' in assignments")
            continue
        if shift is None:
            violations.append(f"unknown shift '{a.shift_id}' in assignments")
            continue

        req = requirements_by_shift.get(shift.id)
        required_skills = req.required_skills if req else []
        ok, reason = employee_eligible(employee, shift, required_skills)
        if not ok:
            violations.append(f"ineligible assignment: {reason}")

        per_employee_shifts[employee.id].append(shift)
        hours[employee.id] += shift_duration_hours(shift)
        count_per_shift[shift.id] += 1

    # H2 — one shift per day + no overlapping shifts.
    for emp_id, emp_shifts in per_employee_shifts.items():
        by_date: Dict[object, List[Shift]] = defaultdict(list)
        for s in emp_shifts:
            by_date[s.shift_date].append(s)
        for day, day_shifts in by_date.items():
            if len(day_shifts) > 1:
                violations.append(
                    f"employee '{emp_id}' assigned to {len(day_shifts)} "
                    f"shifts on {day} (one shift per day)"
                )
            for i in range(len(day_shifts)):
                for j in range(i + 1, len(day_shifts)):
                    if shifts_overlap(day_shifts[i], day_shifts[j]):
                        violations.append(
                            f"employee '{emp_id}' has overlapping shifts "
                            f"'{day_shifts[i].id}' and '{day_shifts[j].id}'"
                        )

    # H3 — max weekly hours.
    for emp_id, total in hours.items():
        limit = employees_by_id[emp_id].max_weekly_hours
        if total - limit > 1e-6:
            violations.append(
                f"employee '{emp_id}' assigned {total:.2f}h "
                f"exceeding max {limit:.2f}h"
            )

    # H4 — minimum staffing on every shift.
    for shift in shifts:
        req = requirements_by_shift.get(shift.id)
        minimum = req.min_employees if req else 0
        got = count_per_shift.get(shift.id, 0)
        if got < minimum:
            violations.append(
                f"shift '{shift.id}' staffed with {got} "
                f"below minimum {minimum}"
            )

    return violations
