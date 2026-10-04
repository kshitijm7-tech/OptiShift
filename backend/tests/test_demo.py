# P06 tests: demo dataset, deterministic baseline, comparison math
# (including the money-saved formula), API behaviour, and the strict
# separation between Demo Mode and the user's real data.
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services.baseline_service import BaselineService
from app.services.comparison_service import ComparisonService
from app.services.demo_data import DEMO_HORIZON_DAYS, get_demo_dataset
from app.services.demo_service import DemoService
from app.services.schedule_service import ScheduleService
from app.optimizer.validator import validate_assignments
from test_optimizer import make_request

client = TestClient(app)


@pytest.fixture(autouse=True)
def clean_stores():
    ScheduleService.clear()
    ComparisonService.clear_stored()
    DemoService.reset()
    yield
    ScheduleService.clear()
    ComparisonService.clear_stored()
    DemoService.reset()


# --- demo dataset -------------------------------------------------------------

def test_demo_dataset_loads_with_expected_business_and_currency():
    dataset = get_demo_dataset()
    assert dataset.business.name == "UrbanBrew Café"
    assert dataset.business.location == "Mumbai"
    assert dataset.currency == "INR"
    assert dataset.currency_symbol == "₹"
    assert dataset.horizon_days == DEMO_HORIZON_DAYS == 7
    assert dataset.description.strip()


def test_demo_dataset_has_expected_employees():
    dataset = get_demo_dataset()
    assert len(dataset.employees) == 9
    active = [e for e in dataset.employees if e.status == "active"]
    inactive = [e for e in dataset.employees if e.status == "inactive"]
    assert len(active) == 8
    assert len(inactive) == 1
    assert inactive[0].name == "Nisha Nair"  # on study leave, never scheduled
    for employee in dataset.employees:
        assert employee.skills, f"{employee.id} must have skills"
        assert employee.hourly_pay > 0
        assert employee.max_weekly_hours > 0
        assert employee.availability, f"{employee.id} must have availability"


def test_demo_dataset_has_expected_shifts_and_requirements():
    dataset = get_demo_dataset()
    assert len(dataset.shifts) == 7 * 3  # 3 shift types x 7 days
    names = {s.name for s in dataset.shifts}
    assert names == {"Morning", "Afternoon", "Evening"}
    dates = {s.shift_date for s in dataset.shifts}
    assert len(dates) == 7
    assert min(dates) == dataset.week_start
    assert max(dates) == dataset.week_end
    for shift in dataset.shifts:
        assert shift.start_time < shift.end_time

    assert len(dataset.requirements) == len(dataset.shifts)
    req_by_shift = {r.shift_id: r for r in dataset.requirements}
    for shift in dataset.shifts:
        req = req_by_shift[shift.id]
        assert req.min_employees == 2
        if shift.name in ("Morning", "Evening"):
            assert req.required_skills == ["coffee"]
        else:
            assert req.required_skills == []


def test_demo_dataset_is_deterministic_within_a_run():
    first = get_demo_dataset()
    second = get_demo_dataset()
    assert first == second


def test_demo_dataset_is_feasible_for_the_optimizer():
    dataset = get_demo_dataset()
    result = client.post(
        "/api/v1/optimize",
        json={
            "employees": [e.model_dump(mode="json") for e in dataset.employees],
            "shifts": [s.model_dump(mode="json") for s in dataset.shifts],
            "requirements": [r.model_dump(mode="json") for r in dataset.requirements],
        },
    ).json()
    assert result["status"] == "optimal"


# --- baseline -----------------------------------------------------------------

def _baseline_request():
    dataset = get_demo_dataset()
    from app.optimizer.model import OptimizeRequest

    return OptimizeRequest(
        employees=list(dataset.employees),
        shifts=list(dataset.shifts),
        requirements=list(dataset.requirements),
    )


def test_baseline_is_deterministic():
    first = BaselineService.generate_baseline(_baseline_request())
    second = BaselineService.generate_baseline(_baseline_request())
    assert [(a.employee_id, a.shift_id) for a in first.assignments] == [
        (a.employee_id, a.shift_id) for a in second.assignments
    ]
    assert first.metrics.total_labor_cost == second.metrics.total_labor_cost
    assert first.metrics.total_hours == second.metrics.total_hours


def test_baseline_respects_hard_constraints():
    request = _baseline_request()
    baseline = BaselineService.generate_baseline(request)
    reqs_by_shift = {r.shift_id: r for r in request.requirements}
    assert validate_assignments(
        baseline.assignments, request.employees, request.shifts, reqs_by_shift
    ) == []
    # The inactive team member must never appear.
    assert "nisha" not in {a.employee_id for a in baseline.assignments}


def test_baseline_does_not_use_the_optimizer():
    baseline = BaselineService.generate_baseline(_baseline_request())
    assert baseline.solver.solver == "manual-baseline"
    assert baseline.status == "baseline"
    assert baseline.explanation, "baseline must explain its approach"
    # Metrics are computed from the baseline's own assignments.
    pay = {e.id: e.hourly_pay for e in _baseline_request().employees}
    durations = {s.id: 4.0 for s in _baseline_request().shifts}
    expected = round(
        sum(
            pay[a.employee_id] * durations[a.shift_id]
            for a in baseline.assignments
        ),
        2,
    )
    assert baseline.metrics.total_labor_cost == expected


def test_baseline_covers_all_required_shifts_for_the_demo():
    baseline = BaselineService.generate_baseline(_baseline_request())
    assert baseline.metrics.shifts_total == 21
    assert baseline.metrics.shifts_staffed == 21
    assert baseline.metrics.total_hours == 168  # 21 shifts x 2 staff x 4h


# --- comparison math ----------------------------------------------------------

def test_money_saved_is_baseline_cost_minus_optimized_cost():
    request = _baseline_request()
    baseline = BaselineService.generate_baseline(request)
    from app.optimizer.solver import solve_optimization

    result = solve_optimization(request)
    assert result.status == "optimal" and result.metrics is not None
    from app.services.schedule_service import CurrentSchedule

    from datetime import datetime, timezone

    optimized = CurrentSchedule(
        id="opt-1",
        generated_at=datetime.now(timezone.utc),
        assignments=list(result.assignments),
        shifts=list(request.shifts),
        employees=list(request.employees),
        requirements=list(request.requirements),
        metrics=result.metrics,
        solver=result.solver,
    )
    comparison = ComparisonService.compare(
        baseline, optimized, currency="INR", currency_symbol="₹"
    )
    expected_saved = round(
        baseline.metrics.total_labor_cost - optimized.metrics.total_labor_cost, 2
    )
    assert comparison.improvements.cost_saved == expected_saved
    assert comparison.improvements.cost_saved == 1500.0
    assert comparison.improvements.cost_saved_percent == round(
        expected_saved / baseline.metrics.total_labor_cost * 100.0, 1
    )
    assert comparison.improvements.hours_change == round(
        optimized.metrics.total_hours - baseline.metrics.total_hours, 2
    )
    assert comparison.improvements.extra_hours_change == round(
        optimized.metrics.extra_hours_total - baseline.metrics.extra_hours_total, 2
    )
    # Coverage and balance changes derive from the schedules' own metrics.
    assert comparison.improvements.coverage_change == round(
        (optimized.metrics.shifts_staffed - baseline.metrics.shifts_staffed)
        / max(1, optimized.metrics.shifts_total)
        * 100.0,
        1,
    )
    assert comparison.improvements.work_balance_change == round(
        (optimized.metrics.max_hours_per_employee - optimized.metrics.min_hours_per_employee)
        - (baseline.metrics.max_hours_per_employee - baseline.metrics.min_hours_per_employee),
        2,
    )
    assert "₹1,500.00" in comparison.summary


def test_cost_increase_is_reported_negatively_not_flipped():
    # An optimized side that costs MORE must yield negative savings and an
    # honest "cost increased" summary — never a fake positive.
    from datetime import datetime, timezone

    from app.optimizer.model import OptimizationMetrics
    from app.services.baseline_service import BaselineSchedule
    from app.services.schedule_service import CurrentSchedule

    baseline = BaselineSchedule(
        metrics=OptimizationMetrics(
            total_labor_cost=100.0,
            total_hours=10.0,
            extra_hours_total=0.0,
            max_hours_per_employee=5.0,
            min_hours_per_employee=5.0,
            shifts_staffed=2,
            shifts_total=2,
        ),
        solver={"solver": "manual-baseline", "status": "deterministic"},
    )
    optimized = CurrentSchedule(
        id="opt-2",
        generated_at=datetime.now(timezone.utc),
        metrics=OptimizationMetrics(
            total_labor_cost=140.0,
            total_hours=10.0,
            extra_hours_total=0.0,
            max_hours_per_employee=6.0,
            min_hours_per_employee=4.0,
            shifts_staffed=2,
            shifts_total=2,
        ),
    )
    comparison = ComparisonService.compare(
        baseline, optimized, currency="INR", currency_symbol="₹"
    )
    assert comparison.improvements.cost_saved == -40.0
    assert comparison.improvements.cost_saved_percent == -40.0
    assert comparison.summary.startswith("Staff cost increased")
    assert "₹40.00" in comparison.summary


# --- demo API -----------------------------------------------------------------

def test_demo_dataset_endpoint():
    response = client.get("/api/v1/demo")
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["business"]["name"] == "UrbanBrew Café"
    assert body["currency"] == "INR"
    assert len(body["employees"]) == 9
    assert len(body["shifts"]) == 21
    assert len(body["requirements"]) == 21


def test_demo_comparison_empty_before_run():
    response = client.get("/api/v1/demo/comparison")
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["has_comparison"] is False
    assert body["comparison"] is None


def test_demo_run_returns_real_comparison():
    response = client.post("/api/v1/demo/run")
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["has_comparison"] is True
    comparison = body["comparison"]
    assert comparison["baseline"]["solver"]["solver"] == "manual-baseline"
    # Optimized side comes from the real P03 optimizer.
    assert comparison["optimized"]["solver"]["solver"] == "PULP_CBC_CMD"
    assert comparison["optimized"]["solver"]["status"] == "Optimal"
    # Money saved is the real signed difference of the two schedules.
    saved = comparison["improvements"]["cost_saved"]
    assert saved == round(
        comparison["baseline"]["metrics"]["total_labor_cost"]
        - comparison["optimized"]["metrics"]["total_labor_cost"],
        2,
    )
    assert saved > 0  # the demo scenario genuinely saves money
    assert comparison["currency"] == "INR"
    assert comparison["summary"]


def test_demo_comparison_persists_and_is_stable():
    first = client.post("/api/v1/demo/run").json()["comparison"]
    r1 = client.get("/api/v1/demo/comparison").json()
    r2 = client.get("/api/v1/demo/comparison").json()
    assert r1["has_comparison"] and r2["has_comparison"]
    assert r1["comparison"]["id"] == first["id"] == r2["comparison"]["id"]
    assert (
        r1["comparison"]["improvements"]["cost_saved"]
        == r2["comparison"]["improvements"]["cost_saved"]
    )


def test_demo_reset_clears_only_demo_state():
    client.post("/api/v1/demo/run")
    response = client.post("/api/v1/demo/reset")
    assert response.status_code == 200, response.text
    assert response.json() == {"reset": True}
    assert client.get("/api/v1/demo/comparison").json()["has_comparison"] is False


def test_demo_run_never_touches_the_current_schedule():
    # A valid normal schedule is stored first, then Demo Mode runs: the
    # user's current schedule must be untouched by demo activity.
    data = make_request().model_dump(mode="json")
    assert client.post("/api/v1/optimize", json=data).json()["status"] == "optimal"
    before = client.get("/api/v1/schedule").json()["schedule"]

    assert client.post("/api/v1/demo/run").status_code == 200

    after = client.get("/api/v1/schedule").json()["schedule"]
    assert after["id"] == before["id"]
    assert after["assignments"] == before["assignments"]
    # And the demo comparison's optimized schedule is a different artifact.
    demo = client.get("/api/v1/demo/comparison").json()["comparison"]
    assert demo["optimized"]["id"] != after["id"]


# --- normal-mode comparison API ------------------------------------------------

def test_comparison_requires_a_current_schedule():
    response = client.post("/api/v1/comparison")
    assert response.status_code == 404, response.text
    assert "Build a schedule first" in response.json()["detail"]


def test_comparison_matches_the_current_schedule():
    data = make_request().model_dump(mode="json")
    assert client.post("/api/v1/optimize", json=data).json()["status"] == "optimal"
    schedule = client.get("/api/v1/schedule").json()["schedule"]

    response = client.post("/api/v1/comparison")
    assert response.status_code == 200, response.text
    comparison = response.json()["comparison"]
    assert comparison["optimized"]["id"] == schedule["id"]
    assert comparison["baseline"]["metrics"]["total_hours"] == schedule["metrics"]["total_hours"]
    saved = comparison["improvements"]["cost_saved"]
    assert saved == round(
        comparison["baseline"]["metrics"]["total_labor_cost"]
        - schedule["metrics"]["total_labor_cost"],
        2,
    )

    stored = client.get("/api/v1/comparison").json()
    assert stored["has_comparison"] is True
    assert stored["comparison"]["id"] == comparison["id"]


def test_normal_comparison_and_demo_state_are_independent():
    client.post("/api/v1/demo/run")
    demo_before = client.get("/api/v1/demo/comparison").json()["comparison"]

    data = make_request().model_dump(mode="json")
    client.post("/api/v1/optimize", json=data)
    client.post("/api/v1/comparison")

    demo_after = client.get("/api/v1/demo/comparison").json()["comparison"]
    assert demo_after["id"] == demo_before["id"]
    assert client.get("/api/v1/comparison").json()["comparison"]["optimized"]["id"] != (
        demo_after["optimized"]["id"]
    )
