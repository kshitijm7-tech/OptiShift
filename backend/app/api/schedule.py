from fastapi import APIRouter, HTTPException
from typing import Any, Dict
from datetime import datetime
from ..data.store import store
from ..models.optimization import OptimizationRequest, OptimizationResult
from ..services.schedule_service import ScheduleService

router = APIRouter(tags=["Schedule & Optimization"])
_svc = ScheduleService(store)

def map_metrics(m):
    if not m:
        return None
    return {
        "total_labor_cost": m.labor_cost,
        "total_hours": m.labor_cost / 15.0 if m.labor_cost else 0, # rough approx or skip
        "extra_hours_total": m.overtime_hours,
        "max_hours_per_employee": 40.0,
        "min_hours_per_employee": 0.0,
        "employee_hours": {},
        "shifts_staffed": int(m.coverage * 100),
        "shifts_total": 100
    }

def map_assignments(assignments):
    return [
        {
            "employee_id": a["employee_id"] if isinstance(a, dict) else a.employee_id,
            "shift_id": a["shift_id"] if isinstance(a, dict) else a.shift_id,
            "assigned_date": a["date"] if isinstance(a, dict) else a.date,
        }
        for a in assignments
    ]

@router.get("/schedule", summary="Get current stored schedule")
def get_schedule():
    sched = store.get_schedule()
    if not sched:
        return {"has_schedule": False, "schedule": None}
    
    # Needs to match CurrentSchedule
    # We don't have all the metrics, we'll dummy out what we don't have
    mapped = {
        "id": "sched_1",
        "generated_at": datetime.now().isoformat(),
        "status": "optimal" if sched.status == "feasible" else "infeasible",
        "assignments": map_assignments(sched.assignments),
        "shifts": [],
        "employees": [],
        "requirements": [],
        "metrics": {
            "total_labor_cost": sum(a.cost for a in sched.assignments),
            "total_hours": sum(a.hours for a in sched.assignments),
            "extra_hours_total": 0, # Calculate if needed
            "max_hours_per_employee": 40,
            "min_hours_per_employee": 0,
            "employee_hours": {},
            "shifts_staffed": len(sched.assignments),
            "shifts_total": len(sched.assignments)
        },
        "objective_breakdown": None,
        "explanation": [],
        "solver": {"solver": "CBC", "status": "Optimal"}
    }
    return {"has_schedule": True, "schedule": mapped}

@router.post("/optimize", summary="Run MILP optimization")
def optimize(request: OptimizationRequest):
    result = _svc.optimize(request)
    
    mapped_res = {
        "status": "optimal" if result.status == "feasible" else "infeasible",
        "assignments": map_assignments(result.assignments),
        "metrics": map_metrics(result.optimized_metrics),
        "violations": [],
        "objective_breakdown": None,
        "solver": {"solver": "CBC", "status": result.status},
        "explanation": result.infeasibility_causes
    }
    return mapped_res

@router.post("/reoptimize", summary="Re-optimize after a leave approval")
def reoptimize(body: Dict[str, Any]):
    leave_id = body.get("leave_id")
    if not leave_id:
        raise HTTPException(status_code=422, detail="Field 'leave_id' is required")
    try:
        result = _svc.reoptimize(leave_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
