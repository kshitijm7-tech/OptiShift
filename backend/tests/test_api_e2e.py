import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_full_end_to_end_demo_flow():
    # 1. Optimize
    resp = client.post("/api/v1/optimize", json={"week_start": "2024-12-09"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] in ["feasible", "optimal"]
    
    # 2. Get impact for leave_001
    resp = client.get("/api/v1/leave/leave_001/impact")
    assert resp.status_code == 200
    impact = resp.json()
    assert impact["overall_risk"] == "CRITICAL"
    
    # 3. Approve leave
    resp = client.post("/api/v1/leave/leave_001/approve", json={"note": "Go ahead"})
    assert resp.status_code == 200
    assert resp.json()["status"] == "approved"
    
    # 4. Reoptimize
    resp = client.post("/api/v1/reoptimize", json={"leave_id": "leave_001"})
    assert resp.status_code == 200
    reopt = resp.json()
    assert reopt["status"] == "feasible"
    assert "diff" in reopt
    assert len(reopt["diff"]["removed_assignments"]) > 0

def test_typed_reoptimize_request():
    # Missing leave_id
    resp = client.post("/api/v1/reoptimize", json={})
    assert resp.status_code == 422
    
def test_explicit_no_baseline_api_error():
    # Reset store for this test by mocking or restarting state
    # A fresh TestClient doesn't reset the global store. Let's reset it manually.
    from app.data.store import store
    store._schedule = None
    store._week_start = None
    
    resp = client.post("/api/v1/reoptimize", json={"leave_id": "leave_001"})
    assert resp.status_code == 400
    assert "No baseline" in resp.json()["detail"]

