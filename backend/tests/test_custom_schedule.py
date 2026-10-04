# P08 custom scheduling tests: configuration contract, rules translation,
# and end-to-end builds through the shared P03 engine.
#
# Every behavior test runs the real optimizer (PuLP/CBC) via the service
# or the HTTP route — nothing is faked or bypassed.
from fastapi.testclient import TestClient

from app.main import app
from app.models.scheduling import (
    BusinessInput,
    CustomScheduleConfig,
    SchedulingRules,
)
from app.services.scheduling_service import SchedulingService
from test_optimizer import (
    MON,
    TUE,
    make_employees,
    make_requirements,
    make_shifts,
)

client = TestClient(app)


def make_config(days=(MON,), min_employees=1, **overrides):
    shifts = make_shifts(days)
    kwargs = dict(
        business=BusinessInput(name="UrbanBrew Café", location="Mumbai"),
        employees=make_employees(),
        shifts=shifts,
        requirements=make_requirements(shifts, min_employees),
        rules=SchedulingRules(),
    )
    kwargs.update(overrides)
    return CustomScheduleConfig(**kwargs)


def post_config(config):
    return client.post(
        "/api/v1/schedules/build", json=config.model_dump(mode="json")
    )


# --- contract ---------------------------------------------------------------

def test_custom_business_configuration_accepted():
    response = post_config(make_config())
    assert response.status_code == 200, response.text
    assert response.json()["status"] == "optimal"


def test_custom_shifts_accepted():
    shifts = make_shifts((MON,))[:1]  # a single custom Morning shift
    config = make_config()
    config.shifts = shifts
    config.requirements = make_requirements(shifts, 1)
    response = post_config(config)
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["status"] == "optimal"
    assert len(body["assignments"]) == 1
    assert body["assignments"][0]["shift_id"] == shifts[0].id


def test_custom_staffing_requirements_accepted():
    config = make_config(min_employees=0)
    response = post_config(config)
    assert response.status_code == 200, response.text
    assert response.json()["status"] == "optimal"


def test_custom_rules_accepted():
    config = make_config(
        rules=SchedulingRules(labor_cost_weight=2.0, work_balance_weight=3.0)
    )
    response = post_config(config)
    assert response.status_code == 200, response.text
    assert response.json()["status"] == "optimal"


def test_rules_translation_preserves_engine_defaults():
    request = SchedulingService.build_optimize_request(make_config())
    assert request.weights.labor_cost == 1.0
    assert request.weights.balance == 0.5
    assert request.weights.extra_hours == 10.0
    assert request.weights.preference == 0.0


def test_rules_reach_optimizer():
    request = SchedulingService.build_optimize_request(
        make_config(
            rules=SchedulingRules(labor_cost_weight=2.0, work_balance_weight=4.0)
        )
    )
    assert request.weights.labor_cost == 2.0
    assert request.weights.balance == 4.0

    result = SchedulingService.build_custom_schedule(
        make_config(
            rules=SchedulingRules(labor_cost_weight=2.0, work_balance_weight=4.0)
        )
    )
    assert result.objective_breakdown is not None
    breakdown = result.objective_breakdown
    # The solved breakdown carries the custom weights: proof the rules
    # reached the optimizer rather than being saved-and-ignored.
    assert breakdown.labor_cost_weighted == breakdown.labor_cost * 2.0
    assert breakdown.balance_weighted == breakdown.balance_term * 4.0


# --- behavior -----------------------------------------------------------------

def test_minimum_staffing_affects_result():
    one_each = post_config(make_config(min_employees=1)).json()
    assert one_each["status"] == "optimal"
    assert len(one_each["assignments"]) == 3  # 3 Monday shifts x 1

    none = post_config(make_config(min_employees=0)).json()
    assert none["status"] == "optimal"
    assert none["assignments"] == []  # nothing required, cheapest is nobody


def test_minimum_staffing_can_make_problem_infeasible():
    # 2 per shift x 3 Monday shifts = 6 slots, but only 4 eligible baristas
    # exist and each works at most one shift a day.
    body = post_config(make_config(min_employees=2)).json()
    assert body["status"] == "infeasible"
    assert body["violations"]


def test_required_skills_affect_eligibility():
    shifts = make_shifts((MON,))[:1]
    config = make_config()
    config.shifts = shifts
    config.requirements = make_requirements(shifts, 1)
    config.requirements[0].required_skills = ["cashier"]
    body = post_config(config).json()
    assert body["status"] == "optimal"
    skilled = {"priya", "neha", "arjun"}  # the cashier-skilled baristas
    assert body["assignments"][0]["employee_id"] in skilled


def test_availability_affects_eligibility():
    # Neha is Monday-only: she must never appear on a Tuesday schedule.
    body = post_config(make_config(days=(TUE,))).json()
    assert body["status"] == "optimal"
    assigned = {a["employee_id"] for a in body["assignments"]}
    assert "neha" not in assigned


def test_max_weekly_hours_respected():
    employees = make_employees()
    for e in employees:
        if e.id == "priya":
            e.max_weekly_hours = 4.0
    config = make_config()
    config.employees = employees
    body = post_config(config).json()
    assert body["status"] == "optimal"
    assert body["metrics"]["employee_hours"].get("priya", 0.0) <= 4.0


def test_inactive_employees_not_assigned():
    # Vikram is the cheapest ($10/h) but inactive: the optimizer must
    # never pick him despite the cost incentive.
    body = post_config(make_config()).json()
    assert body["status"] == "optimal"
    assigned = {a["employee_id"] for a in body["assignments"]}
    assert "vikram" not in assigned


def test_rerun_with_changed_configuration():
    first = post_config(make_config(min_employees=1)).json()
    assert first["status"] == "optimal"
    assert len(first["assignments"]) == 3

    second = post_config(make_config(min_employees=0)).json()
    assert second["status"] == "optimal"
    assert second["assignments"] == []

    # And the stored current schedule follows the latest successful build.
    stored = client.get("/api/v1/schedule").json()
    assert stored["has_schedule"] is True
    assert stored["schedule"]["assignments"] == []


def test_invalid_configuration_returns_useful_error():
    config = make_config()
    config.employees = []
    response = post_config(config)
    assert response.status_code == 400
    assert response.json()["detail"]  # human-readable, no stack trace


def test_blank_business_name_rejected_with_validation_error():
    payload = make_config().model_dump(mode="json")
    payload["business"]["name"] = ""
    response = client.post("/api/v1/schedules/build", json=payload)
    assert response.status_code == 422
