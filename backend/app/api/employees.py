"""Employee API routes."""
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any

from typing import Any, Dict
from ..models.employee import Employee

def map_employee_to_frontend(emp: Employee) -> Dict[str, Any]:
    days = {"monday": 0, "tuesday": 1, "wednesday": 2, "thursday": 3, "friday": 4, "saturday": 5, "sunday": 6}
    avail = []
    for a in emp.availability:
        if a.available:
            avail.append({
                "day_of_week": days.get(a.day.lower(), 0),
                "start_time": "00:00:00",
                "end_time": "23:59:59"
            })
    return {
        "id": emp.id,
        "name": emp.name,
        "role": emp.role,
        "skills": emp.skills,
        "hourly_pay": emp.hourly_rate,
        "max_weekly_hours": emp.max_hours_per_week,
        "availability": avail,
        "status": "active"
    }

from ..data.store import store


router = APIRouter(prefix="/employees", tags=["Employees"])


@router.get("/", response_model=List[Dict[str, Any]])
def list_employees():
    """Return all employees."""
    return [map_employee_to_frontend(e) for e in store.get_employees()]


@router.get("/{employee_id}", response_model=Dict[str, Any])
def get_employee(employee_id: str):
    emp = store.get_employee(employee_id)
    if not emp:
        raise HTTPException(status_code=404, detail=f"Employee '{employee_id}' not found")
    return map_employee_to_frontend(emp)


@router.post("/", response_model=Dict[str, Any], status_code=201)
def create_employee(payload: Dict[str, Any]):
    import uuid
    from ..models.employee import Availability
    
    # Map frontend availability to backend availability
    days_map = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"}
    backend_avail = []
    for a in payload.get("availability", []):
        day_str = days_map.get(a.get("day_of_week", 0), "Monday")
        backend_avail.append(Availability(day=day_str, available=True))
        
    emp = Employee(
        id=payload.get("id") or f"emp_{uuid.uuid4().hex[:8]}",
        name=payload.get("name", "Unknown"),
        role=payload.get("role", "Staff"),
        skills=payload.get("skills", []),
        hourly_rate=payload.get("hourly_pay", 0.0),
        max_hours_per_week=payload.get("max_weekly_hours", 40.0),
        availability=backend_avail
    )
    
    if store.get_employee(emp.id):
        raise HTTPException(status_code=409, detail=f"Employee '{emp.id}' already exists")
    store.add_employee(emp)
    return map_employee_to_frontend(emp)

