from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter(prefix="/api/v1/comparison", tags=["comparison"])

@router.post("")
def generate_comparison() -> Dict[str, Any]:
    return {"has_comparison": False, "comparison": None}

@router.get("")
def get_comparison() -> Dict[str, Any]:
    return {"has_comparison": False, "comparison": None}
