# Custom schedule build route (P08). Kept thin: validates the Custom Mode
# configuration, translates it, and delegates to the shared P03 engine via
# the service layer. Same optimizer, same result contract, same
# current-schedule store as POST /api/v1/optimize.
from fastapi import APIRouter, HTTPException

from app.models.scheduling import CustomScheduleConfig
from app.optimizer.model import OptimizationResult, OptimizationStatus
from app.services.scheduling_service import SchedulingService

router = APIRouter(prefix="/api/v1/schedules", tags=["schedules"])


@router.post("/build", response_model=OptimizationResult)
def build_custom_schedule(config: CustomScheduleConfig):
    result = SchedulingService.build_custom_schedule(config)
    if result.status == OptimizationStatus.ERROR:
        raise HTTPException(status_code=400, detail="; ".join(result.violations))
    return result
