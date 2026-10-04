# Optimization API route (P03). Kept thin: delegates to the service layer.
from fastapi import APIRouter, HTTPException

from app.optimizer.model import OptimizationResult, OptimizationStatus, OptimizeRequest
from app.services.optimization_service import OptimizationService

router = APIRouter(prefix="/api/v1/optimize", tags=["optimize"])


@router.post("", response_model=OptimizationResult)
def optimize_schedule(request: OptimizeRequest):
    result = OptimizationService.optimize(request)
    if result.status == OptimizationStatus.ERROR:
        raise HTTPException(status_code=400, detail="; ".join(result.violations))
    return result
