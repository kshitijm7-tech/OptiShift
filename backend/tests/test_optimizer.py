# P03 optimizer tests with a small deterministic UrbanBrew Cafe fixture.
#
# Fixture: Monday 2026-10-05 .. Wednesday 2026-10-07, three 4h shifts a day
# (Morning 08-12, Afternoon 12-16, Evening 16-20), each needing one barista.
from datetime import date, time

from app.models.domain import (
    Availability,
    Employee,
    Shift,
    StaffingRequirement,
)
from app.optimizer.model import (
    Assignment,
    OptimizationStatus,
    OptimizeRequest,
    shift_duration_hours,
)
from app.optimizer.solver import solve_optimization
from app.optimizer.validator import validate_assignments

MON, TUE, WED = date(2026, 10, 5), date(2026, 10, 6), date(2026, 10, 7)


def _avail(days, start=time(8, 0), end=time(20, 0)):
    return [Availability(day_of_week=d, start_time=start, end_time=end) for d in days]


def make_employees():
    return [
        Employee(id="priya", name="Priya", role="Barista",
                 skills=["barista", "cashier"], hourly_pay=15.0,
                 max_weekly_hours=24.0, availability=_avail([0, 1, 2]),
                 status="active"),
        Employee(id="ananya", name="Ananya", role="Barista",
                 skills=["barista"], hourly_pay=16.0,
                 max_weekly_hours=24.0, availability=_avail([0, 1, 2]),
                 status="active"),
        Employee(id="rahul", name="Rahul", role="Cook",
                 skills=["kitchen"], hourly_pay=18.0,
                 max_weekly_hours=24.0, availability=_avail([0, 1, 2]),
                 status="active"),
        # Neha is only available on Monday.
        Employee(id="neha", name="Neha", role="Barista",
                 skills=["barista", "cashier"], hourly_pay=22.0,
                 max_weekly_hours=24.0, availability=_avail([0]),
                 status="active"),
        Employee(id="arjun", name="Arjun", role="Barista",
                 skills=["barista", "cashier", "kitchen"], hourly_pay=17.0,
                 max_weekly_hours=40.0, availability=_avail([0, 1, 2]),
                 status="active"),
        # Inactive employee must never be scheduled.
        Employee(id="vikram", name="Vikram", role="Barista",
                 skills=["barista"], hourly_pay=10.0,
                 max_weekly_hours=40.0, availability=_avail([0, 1, 2]),
                 status="inactive"),
    ]


def make_shifts(days=(MON, TUE, WED)):
    shifts = []
    for day in days:
        shifts.append(Shift(id=f"morning-{day.isoformat()}", name="Morning",
                            shift_date=day, start_time=time(8, 0),
                            end_time=time(12, 0), required_role="Barista"))
        shifts.append(Shift(id=f"afternoon-{day.isoformat()}", name="Afternoon",
                            shift_date=day, start_time=time(12, 0),
                            end_time=time(16, 0), required_role="Barista"))
        shifts.append(Shift(id=f"evening-{day.isoformat()}", name="Evening",
                            shift_date=day, start_time=time(16, 0),
                            end_time=time(20, 0), required_role="Barista"))
    return shifts


def make_requirements(shifts, min_employees=1):
    return [
        StaffingRequirement(id=f"req-{s.id}", shift_id=s.id,
                            min_employees=min_employees,
                            required_skills=["barista"])
        for s in shifts
    ]


def make_request(days=(MON, TUE, WED), min_employees=1):
    shifts = make_shifts(days)
    return OptimizeRequest(
        employees=make_employees(),
        shifts=shifts,
        requirements=make_requirements(shifts, min_employees),
    )


def assignments_by_employee(result):
    grouped = {}
    for a in result.assignments:
        grouped.setdefault(a.employee_id, []).append(a.shift_id)
    return grouped


# --- basic optimization -----------------------------------------------------

def test_basic_optimization_succeeds_and_meets_staffing():
    result = solve_optimization(make_request(days=(MON,)))
    assert result.status == OptimizationStatus.OPTIMAL
    assert len(result.assignments) == 3  # 3 Monday shifts x 1 barista
    assert result.violations == []
    assert result.metrics is not None
    assert result.metrics.shifts_staffed == 3
    assert result.objective_breakdown is not None


def test_shift_duration_and_midnight_handling():
    s = Shift(id="s", name="Day", shift_date=MON,
              start_time=time(8, 0), end_time=time(12, 0))
    assert shift_duration_hours(s) == 4.0
    night = Shift(id="n", name="Night", shift_date=MON,
                  start_time=time(22, 0), end_time=time(2, 0))
    assert shift_duration_hours(night) == 4.0


# --- hard constraints --------------------------------------------------------

def test_availability_respected():
    result = solve_optimization(make_request())
    assert result.status == OptimizationStatus.OPTIMAL
    tue_wed = {a.shift_id for a in result.assignments
               if not a.shift_id.endswith(MON.isoformat())}
    neha_shifts = [a.shift_id for a in result.assignments
                   if a.employee_id == "neha"]
    # Neha (Monday-only) must never appear on Tue/Wed shifts.
    assert all(s.endswith(MON.isoformat()) for s in neha_shifts)
    assert tue_wed  # sanity: Tue/Wed shifts were staffed by others


def test_skill_matching():
    result = solve_optimization(make_request())
    assert result.status == OptimizationStatus.OPTIMAL
    rahul_shifts = [a for a in result.assignments if a.employee_id == "rahul"]
    # Rahul has only kitchen skills; all shifts require barista.
    assert rahul_shifts == []


def test_max_weekly_hours_respected():
    employees = make_employees()
    # Priya (cheapest) may only work 4h: at most one shift on Monday.
    for e in employees:
        if e.id == "priya":
            e.max_weekly_hours = 4.0
    shifts = make_shifts(days=(MON,))
    result = solve_optimization(OptimizeRequest(
        employees=employees, shifts=shifts,
        requirements=make_requirements(shifts)))
    assert result.status == OptimizationStatus.OPTIMAL
    priya_hours = result.metrics.employee_hours.get("priya", 0.0)
    assert priya_hours <= 4.0 + 1e-6


def test_no_shift_conflicts_one_shift_per_day():
    result = solve_optimization(make_request(days=(MON,)))
    assert result.status == OptimizationStatus.OPTIMAL
    seen = {}
    for a in result.assignments:
        day = a.assigned_date
        assert (a.employee_id, day) not in seen, \
            f"{a.employee_id} works twice on {day}"
        seen[(a.employee_id, day)] = a.shift_id


def test_every_shift_meets_minimum_staffing():
    result = solve_optimization(make_request())
    assert result.status == OptimizationStatus.OPTIMAL
    counts = {}
    for a in result.assignments:
        counts[a.shift_id] = counts.get(a.shift_id, 0) + 1
    for req in make_request().requirements:
        assert counts.get(req.shift_id, 0) >= req.min_employees


def test_inactive_employee_excluded():
    result = solve_optimization(make_request())
    assert result.status == OptimizationStatus.OPTIMAL
    assert "vikram" not in assignments_by_employee(result)


# --- cost / determinism ------------------------------------------------------

def test_labor_cost_matches_assignments():
    request = make_request(days=(MON,))
    result = solve_optimization(request)
    assert result.status == OptimizationStatus.OPTIMAL
    pay = {e.id: e.hourly_pay for e in request.employees}
    expected = round(sum(
        pay[a.employee_id] * shift_duration_hours(
            next(s for s in request.shifts if s.id == a.shift_id))
        for a in result.assignments), 2)
    assert result.metrics.total_labor_cost == expected


def test_determinism_same_input_same_result():
    first = solve_optimization(make_request())
    second = solve_optimization(make_request())
    assert first.status == second.status == OptimizationStatus.OPTIMAL
    assert [(a.employee_id, a.shift_id) for a in first.assignments] == \
           [(a.employee_id, a.shift_id) for a in second.assignments]
    assert first.metrics.total_labor_cost == second.metrics.total_labor_cost


# --- infeasibility -----------------------------------------------------------

def test_infeasible_problem_reported():
    # One shift needs 10 baristas; only 4 eligible active baristas exist.
    request = make_request(days=(MON,), min_employees=10)
    result = solve_optimization(request)
    assert result.status == OptimizationStatus.INFEASIBLE
    assert result.assignments == []
    assert result.violations, "infeasible result must explain why"


def test_impossible_skill_requirement_reported():
    shifts = make_shifts(days=(MON,))
    reqs = [StaffingRequirement(id=f"req-{s.id}", shift_id=s.id,
                                min_employees=1,
                                required_skills=["sushi-chef"])
            for s in shifts]
    result = solve_optimization(OptimizeRequest(
        employees=make_employees(), shifts=shifts, requirements=reqs))
    assert result.status == OptimizationStatus.INFEASIBLE


def test_invalid_request_returns_error():
    result = solve_optimization(OptimizeRequest(employees=[], shifts=[]))
    assert result.status == OptimizationStatus.ERROR
    assert result.violations


# --- post-solve validator ----------------------------------------------------

def test_validator_detects_invalid_schedule():
    employees = make_employees()
    shifts = make_shifts(days=(MON,))
    reqs_by_shift = {r.shift_id: r for r in make_requirements(shifts)}
    bad = [
        # rahul lacks the barista skill
        Assignment(employee_id="rahul", shift_id=shifts[0].id,
                   assigned_date=MON),
        # neha works twice on Monday (conflict)
        Assignment(employee_id="neha", shift_id=shifts[0].id, assigned_date=MON),
        Assignment(employee_id="neha", shift_id=shifts[1].id, assigned_date=MON),
        # vikram is inactive
        Assignment(employee_id="vikram", shift_id=shifts[2].id,
                   assigned_date=MON),
    ]
    violations = validate_assignments(bad, employees, shifts, reqs_by_shift)
    lowered = [v.lower() for v in violations]
    assert len(violations) >= 3
    assert any("barista" in v or "skill" in v or "role" in v for v in lowered)
    assert any("not active" in v for v in lowered)
    assert any("twice" in v or "overlap" in v or "one shift" in v
               for v in lowered)


def test_validator_accepts_solver_output():
    request = make_request()
    result = solve_optimization(request)
    assert result.status == OptimizationStatus.OPTIMAL
    reqs_by_shift = {r.shift_id: r for r in request.requirements}
    assert validate_assignments(
        result.assignments, request.employees, request.shifts,
        reqs_by_shift) == []
