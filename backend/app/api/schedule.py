# Current-schedule API route (P05). Kept thin: delegates to the service layer.
from fastapi import APIRouter

from app.services.schedule_service import ScheduleResponse, ScheduleService

router = APIRouter(prefix="/api/v1/schedule", tags=["schedule"])


@router.get("", response_model=ScheduleResponse)
def get_current_schedule():
    schedule = ScheduleService.get_current()
    if schedule is None:
        return ScheduleResponse(has_schedule=False, schedule=None)
    return ScheduleResponse(has_schedule=True, schedule=schedule)
