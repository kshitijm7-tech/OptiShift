# P03 API tests for POST /api/v1/optimize.
from fastapi.testclient import TestClient

from app.main import app
from test_optimizer import make_request

client = TestClient(app)


def _payload(**overrides):
    request = make_request()
    data = request.model_dump(mode="json")
    data.update(overrides)
    return data


def test_optimize_valid_request():
    response = client.post("/api/v1/optimize", json=_payload())
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["status"] == "optimal"
    assert len(body["assignments"]) == 9  # 3 days x 3 shifts x 1 barista
    assert body["violations"] == []
    assert body["metrics"]["total_labor_cost"] > 0
    assert body["objective_breakdown"]["total_objective"] > 0
    assert body["solver"]["status"] == "Optimal"


def test_optimize_invalid_request():
    response = client.post("/api/v1/optimize",
                           json={"employees": [], "shifts": []})
    assert response.status_code == 400


def test_optimize_infeasible_request():
    request = make_request()
    for req in request.requirements:
        req.min_employees = 10
    data = request.model_dump(mode="json")
    response = client.post("/api/v1/optimize", json=data)
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["status"] == "infeasible"
    assert body["assignments"] == []
    assert body["violations"], "must explain the infeasibility"
