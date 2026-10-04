# P05 tests: current-schedule store + GET /api/v1/schedule.
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services.schedule_service import ScheduleService
from test_optimizer import MON, make_request

client = TestClient(app)


@pytest.fixture(autouse=True)
def clean_schedule_store():
    ScheduleService.clear()
    yield
    ScheduleService.clear()


def _optimize_valid():
    data = make_request().model_dump(mode="json")
    response = client.post("/api/v1/optimize", json=data)
    assert response.status_code == 200, response.text
    assert response.json()["status"] == "optimal"
    return response.json()


def test_no_current_schedule_returns_empty():
    response = client.get("/api/v1/schedule")
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["has_schedule"] is False
    assert body["schedule"] is None


def test_successful_optimization_stores_current_schedule():
    _optimize_valid()
    response = client.get("/api/v1/schedule")
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["has_schedule"] is True
    schedule = body["schedule"]
    assert schedule["id"]
    assert schedule["generated_at"]
    assert schedule["status"] == "optimal"
    assert len(schedule["assignments"]) == 9
    assert schedule["metrics"]["total_labor_cost"] > 0
    assert schedule["explanation"]


def test_get_returns_stored_schedule():
    posted = _optimize_valid()
    stored = client.get("/api/v1/schedule").json()["schedule"]
    assert stored["assignments"] == posted["assignments"]
    assert stored["metrics"] == posted["metrics"]
    assert stored["objective_breakdown"] == posted["objective_breakdown"]
    assert stored["explanation"] == posted["explanation"]
    # Shifts and team snapshot travel with the schedule for display.
    assert len(stored["shifts"]) == 9
    assert len(stored["employees"]) == len(make_request().employees)


def test_infeasible_does_not_overwrite_valid_schedule():
    _optimize_valid()
    before = client.get("/api/v1/schedule").json()["schedule"]

    request = make_request()
    for req in request.requirements:
        req.min_employees = 10
    response = client.post("/api/v1/optimize", json=request.model_dump(mode="json"))
    assert response.status_code == 200, response.text
    assert response.json()["status"] == "infeasible"

    after = client.get("/api/v1/schedule").json()["schedule"]
    assert after["id"] == before["id"]
    assert after["assignments"] == before["assignments"]
    assert after["metrics"] == before["metrics"]


def test_error_does_not_overwrite_valid_schedule():
    _optimize_valid()
    before = client.get("/api/v1/schedule").json()["schedule"]

    response = client.post("/api/v1/optimize", json={"employees": [], "shifts": []})
    assert response.status_code == 400

    after = client.get("/api/v1/schedule").json()["schedule"]
    assert after["id"] == before["id"]
    assert after["assignments"] == before["assignments"]


def test_second_successful_run_replaces_current_schedule():
    _optimize_valid()
    first_id = client.get("/api/v1/schedule").json()["schedule"]["id"]

    data = make_request(days=(MON,)).model_dump(mode="json")
    response = client.post("/api/v1/optimize", json=data)
    assert response.status_code == 200, response.text
    assert response.json()["status"] == "optimal"

    stored = client.get("/api/v1/schedule").json()["schedule"]
    assert stored["id"] != first_id
    assert stored["assignments"] == response.json()["assignments"]
    assert len(stored["assignments"]) == 3  # single Monday schedule now


def test_stored_schedule_validates_against_requirements():
    _optimize_valid()
    stored = client.get("/api/v1/schedule").json()["schedule"]
    counts = {}
    for assignment in stored["assignments"]:
        counts[assignment["shift_id"]] = counts.get(assignment["shift_id"], 0) + 1
    for requirement in make_request().requirements:
        assert counts.get(requirement.shift_id, 0) >= requirement.min_employees
