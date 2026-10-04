from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter(prefix="/api/v1/demo", tags=["demo"])

@router.get("")
def get_demo_dataset() -> Dict[str, Any]:
    return {
        "business": {"id": "1", "name": "UrbanBrew Cafe", "location": "Mumbai"},
        "description": "Mock Data",
        "horizon_days": 7,
        "week_start": "2024-12-09",
        "week_end": "2024-12-15",
        "currency": "INR",
        "currency_symbol": "₹",
        "employees": [],
        "shifts": [],
        "requirements": []
    }

@router.post("/run")
def run_demo() -> Dict[str, Any]:
    return {"has_comparison": False, "comparison": None}

@router.get("/comparison")
def get_demo_comparison() -> Dict[str, Any]:
    return {"has_comparison": False, "comparison": None}

@router.post("/reset")
def reset_demo() -> Dict[str, Any]:
    return {"reset": True}
