from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_employees_empty():
    response = client.get("/api/v1/employees")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_and_get_employee():
    payload = {
        "name": "Charlie",
        "role": "Manager",
        "skills": ["Management", "Barista"],
        "hourly_pay": 20.0,
        "max_weekly_hours": 40.0,
        "availability": [],
        "status": "active"
    }
    response = client.post("/api/v1/employees", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Charlie"
    assert "id" in data

    emp_id = data["id"]
    
    get_resp = client.get(f"/api/v1/employees/{emp_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["id"] == emp_id

def test_get_employee_not_found():
    response = client.get("/api/v1/employees/invalid-id")
    assert response.status_code == 404
