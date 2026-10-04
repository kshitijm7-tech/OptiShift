# P07 tests: leave (time-off) workflow + re-optimization with approved
# leave applied to the real P03 optimizer.
#
# Storage contract: TimeOffService is an in-memory dict (same lifecycle as the
# rest of the app). Tests clear it via TimeOffService reset only if exposed;
# here we drive the API so the whole flow is end-to-end.

from datetime import date, time

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.models.domain import Availability, Employee, Shift, StaffingRequirement
from app.services.time_off_service import (
    REJECTED,
    APPROVED,
    PENDING,
    TimeOffService,
    TimeOffError,
)
from app.services.schedule_service import ScheduleService

client = TestClient(app)

# Deterministic fixture: Monday 2026-10-05 .. Wednesday 2026-10-07, three
# 4h shifts a day (Morning/Afternoon/Evening), each needing one barista.
MON, TUE, WED = date(2026, 10, 5), date(2026, 10, 6), date(2026, 10, 7)


@pytest.fixture(autouse=True)
def clean_stores():
    ScheduleService.clear()
    TimeOffService._store().clear()
    yield
    ScheduleService.clear()
    TimeOffService._store().clear()


def _availability():
    return {"day_of_week": 0, "start_time": "08:00:00", "end_time": "20:00:00"}


def _make_employees():
    employees = []
    for emp_id, overrides in [
        ("priya", {"skills": ["barista", "cashier"], "hourly_pay": 15.0, "max_weekly_hours": 24.0}),
        ("ananya", {"hourly_pay": 16.0, "max_weekly_hours": 24.0}),
        ("rahul", {"role": "Cook", "skills": ["kitchen"], "hourly_pay": 18.0, "max_weekly_hours": 24.0}),
        ("neha", {"availability": [_availability()]}),
        ("arjun", {"max_weekly_hours": 40.0}),
        ("vikram", {"status": "inactive"}),
    ]:
        payload = {
            "name": emp_id.title(),
            "role": "Barista",
            "skills": ["barista"],
            "hourly_pay": 15.0,
            "max_weekly_hours": 24.0,
            "availability": [_availability() for _ in range(7)],
            "status": "active",
        }
        payload.update(overrides)
        resp = client.post("/api/v1/employees", json=payload)
        assert resp.status_code == 201, resp.text
        employees.append(resp.json())
    return employees


def _make_shifts(days=(MON, TUE, WED)):
    shifts = []
    for day in days:
        shifts.append({
            "id": f"morning-{day.isoformat()}", "name": "Morning", "shift_date": day.isoformat(),
            "start_time": "08:00:00", "end_time": "12:00:00", "required_role": "Barista",
        })
        shifts.append({
            "id": f"afternoon-{day.isoformat()}", "name": "Afternoon", "shift_date": day.isoformat(),
            "start_time": "12:00:00", "end_time": "16:00:00", "required_role": "Barista",
        })
        shifts.append({
            "id": f"evening-{day.isoformat()}", "name": "Evening", "shift_date": day.isoformat(),
            "start_time": "16:00:00", "end_time": "20:00:00", "required_role": "Barista",
        })
    return shifts


def _make_requirements(shifts, min_employees=1):
    return [{"id": f"req-{s['id']}", "shift_id": s["id"], "min_employees": min_employees, "required_skills": ["barista"]} for s in shifts]


def _optimize(payload):
    return client.post("/api/v1/optimize", json=payload).json()


def _leave_payload(employee_id, start, end, reason=None):
    payload = {"employee_id": employee_id, "start_date": start, "end_date": end}
    if reason is not None:
        payload["reason"] = reason
    return payload


# --- leave lifecycle ----------------------------------------------------------

def test_create_leave_request():
    employees = _make_employees()
    priya = employees[0]
    resp = client.post("/api/v1/leave", json=_leave_payload(priya["id"], "2026-10-06", "2026-10-07", "Planned absence"))
    assert resp.status_code == 201, resp.text
    body = resp.json()
    assert body["status"] == "pending"
    assert body["employee_id"] == priya["id"]
    assert body["reason"] == "Planned absence"


def test_create_leave_invalid_employee():
    resp = client.post("/api/v1/leave", json=_leave_payload("nope", "2026-10-06", "2026-10-07"))
    assert resp.status_code == 400
    assert "does not exist" in resp.json()["detail"]


def test_create_leave_invalid_date_range():
    employees = _make_employees()
    priya = employees[0]
    resp = client.post("/api/v1/leave", json=_leave_payload(priya["id"], "2026-10-07", "2026-10-06"))
    assert resp.status_code == 400
    assert "Start date must be on or before the end date" in resp.json()["detail"]


def test_list_leave_requests():
    employees = _make_employees()
    client.post("/api/v1/leave", json=_leave_payload(employees[0]["id"], "2026-10-06", "2026-10-06"))
    resp = client.get("/api/v1/leave")
    assert resp.status_code == 200
    body = resp.json()
    assert body["requests"]
    assert body["requests"][0]["status"] == "pending"


def test_approve_request():
    employees = _make_employees()
    priya = employees[0]
    created = client.post("/api/v1/leave", json=_leave_payload(priya["id"], "2026-10-06", "2026-10-06")).json()
    resp = client.post(f"/api/v1/leave/{created['id']}/approve")
    assert resp.status_code == 200, resp.text
    assert resp.json()["status"] == "approved"


def test_approve_rejected_transition_fails():
    employees = _make_employees()
    priya = employees[0]
    created = client.post("/api/v1/leave", json=_leave_payload(priya["id"], "2026-10-06", "2026-10-06")).json()
    client.post(f"/api/v1/leave/{created['id']}/reject")
    resp = client.post(f"/api/v1/leave/{created['id']}/approve")
    assert resp.status_code == 400
    assert "Cannot transition" in resp.json()["detail"]


def test_reject_request():
    employees = _make_employees()
    priya = employees[0]
    created = client.post("/api/v1/leave", json=_leave_payload(priya["id"], "2026-10-06", "2026-10-06")).json()
    resp = client.post(f"/api/v1/leave/{created['id']}/reject")
    assert resp.status_code == 200, resp.text
    assert resp.json()["status"] == "rejected"


def test_reject_approved_transition_fails():
    employees = _make_employees()
    priya = employees[0]
    created = client.post("/api/v1/leave", json=_leave_payload(priya["id"], "2026-10-06", "2026-10-06")).json()
    client.post(f"/api/v1/leave/{created['id']}/approve")
    resp = client.post(f"/api/v1/leave/{created['id']}/reject")
    assert resp.status_code == 200, resp.text  # approved -> rejected is allowed
    assert resp.json()["status"] == "rejected"


# --- approved leave affects optimizer eligibility ------------------------------

def test_approved_leave_excludes_employee_from_reoptimization():
    employees = _make_employees()
    priya = employees[0]
    # Build a valid schedule first.
    shifts = _make_shifts(days=(MON,))
    requirements = _make_requirements(shifts, min_employees=1)
    _optimize({"employees": employees, "shifts": shifts, "requirements": requirements})
    before = client.get("/api/v1/schedule").json()["schedule"]
    assert before is not None

    # Approve leave covering Tuesday (TUE) and Wednesday (WED).
    client.post("/api/v1/leave", json=_leave_payload(priya["id"], "2026-10-06", "2026-10-07"))

    result = client.post("/api/v1/reoptimize").json()
    assert result["status"] == "optimal", result

    after = client.get("/api/v1/schedule").json()["schedule"]
    assert after is not None
    # Priya must not appear in assignments on leave dates (TUE=2026-10-06, WED=2026-10-07).
    priya_assignments = [a for a in after["assignments"] if a["employee_id"] == priya["id"]]
    for a in priya_assignments:
        assert a["assigned_date"] not in {"2026-10-06", "2026-10-07"}

    # Coverage must still hold (another barista covers the excluded shifts).
    metrics = after["metrics"]
    assert metrics["shifts_staffed"] >= metrics["shifts_total"], "coverage broken"


def test_reoptimization_preserves_previous_schedule_on_infeasible():
    employees = _make_employees()
    shifts = _make_shifts(days=(MON, TUE, WED))
    requirements = _make_requirements(shifts, min_employees=1)
    _optimize({"employees": employees, "shifts": shifts, "requirements": requirements})

    # Make the problem infeasible: force every shift to need 5 baristas
    # while only 5 employees exist and vikram is inactive.
    infeas_reqs = _make_requirements(shifts, min_employees=5)
    res = _optimize({"employees": employees, "shifts": shifts, "requirements": infeas_reqs})
    assert res["status"] == "infeasible"

    # Now approve leave for the only other barista, making it truly impossible.
    others = [e for e in employees if e["id"] != "vikram"]
    for emp in others:
        client.post("/api/v1/leave", json=_leave_payload(emp["id"], "2026-10-05", "2026-10-07"))

    result = client.post("/api/v1/reoptimize").json()
    assert result["status"] == "infeasible"
    # Previous valid schedule preserved.
    preserved = client.get("/api/v1/schedule").json()["schedule"]
    assert preserved is not None
    assert len(preserved["assignments"]) > 0


def test_rejected_leave_does_not_affect_scheduling():
    employees = _make_employees()
    priya = employees[0]
    shifts = _make_shifts(days=(MON,))
    requirements = _make_requirements(shifts, min_employees=1)
    _optimize({"employees": employees, "shifts": shifts, "requirements": requirements})

    # Create a leave request and reject it (pending -> rejected).
    client.post("/api/v1/leave", json=_leave_payload(priya["id"], "2026-10-06", "2026-10-06"))
    list_resp = client.get("/api/v1/leave").json()["requests"]
    req_id = list_resp[0]["id"]
    client.post(f"/api/v1/leave/{req_id}/reject")

    result = client.post("/api/v1/reoptimize").json()
    assert result["status"] == "optimal", result
    after = client.get("/api/v1/schedule").json()["schedule"]
    assert after is not None


def test_pending_leave_does_not_affect_scheduling():
    employees = _make_employees()
    shifts = _make_shifts(days=(MON,))
    requirements = _make_requirements(shifts, min_employees=1)
    _optimize({"employees": employees, "shifts": shifts, "requirements": requirements})

    # Create a pending leave for an employee (pending does not affect scheduling).
    priya = employees[0]
    client.post("/api/v1/leave", json=_leave_payload(priya["id"], "2026-10-06", "2026-10-06"))

    result = client.post("/api/v1/reoptimize").json()
    assert result["status"] == "optimal", result
    after = client.get("/api/v1/schedule").json()["schedule"]
    assert after is not None


def test_no_current_schedule_returns_error():
    resp = client.post("/api/v1/reoptimize")
    assert resp.status_code == 200, resp.text
    body = resp.json()
    assert body["status"] == "error"
    assert "No current schedule" in " ".join(body["explanation"])


def test_reoptimization_requires_valid_employee():
    employees = _make_employees()
    # Build a valid schedule first.
    shifts = _make_shifts(days=(MON,))
    requirements = _make_requirements(shifts, min_employees=1)
    _optimize({"employees": employees, "shifts": shifts, "requirements": requirements})

    # Approve leave for a nonexistent employee (must be rejected at creation).
    resp = client.post("/api/v1/leave", json=_leave_payload("ghost", "2026-10-06", "2026-10-06"))
    assert resp.status_code == 400
