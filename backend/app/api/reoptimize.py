# Re-optimization API route (P07).
#
# Workflow: load the current schedule -> apply approved leave -> rebuild the
# scheduling inputs -> run the real P03 optimizer -> validate -> store the
# result ONLY when optimization succeeds.
#
# Safety rule: if re-optimization is infeasible or errors, the existing valid
# current schedule is preserved and returned unchanged (never replaced by a
# broken/no schedule).
from fastapi import APIRouter
from typing import List

from app.models.domain import TimeOff
from app.services.time_off_service import (
    ReoptimizationResult,
    TimeOffError,
    TimeOffService,
)

router = APIRouter(prefix="/api/v1", tags=["reoptimize"])


@router.post("/reoptimize", response_model=ReoptimizationResult)
def reoptimize_schedule():
    """Re-optimize the current schedule with approved leave applied.

    Reads the current schedule, applies all approved leave as unavailability
    in the P03 optimization request, runs the real solver, and stores the new
    optimal result. On infeasibility/error the previous schedule is kept
    intact and returned with a friendly explanation.
    """
    try:
        result = TimeOffService.reoptimize()
    except TimeOffError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:  # noqa: BLE001 - surface as friendly error, never crash
        return ReoptimizationResult(
            status="error",
            schedule=None,
            previous_schedule_id=None,
            explanation=[
                "OptiShift couldn't re-optimize the schedule right now. "
                "Please try again."
            ],
            affected_leave=[],
            solver=None,
        )
    if result.status == "optimal" and result.schedule is None:
        # Should not happen, but keep the response shape honest.
        return ReoptimizationResult(
            status="error",
            explanation=["Re-optimization completed without returning a schedule."],
            affected_leave=result.affected_leave,
        )
    return result


@router.get("/reoptimization/status", response_model=dict)
def reoptimization_status():
    """Whether any approved leave affects the current schedule.

    Used by the UI to show the compact "Schedule needs updating" notice + the
    Update Schedule action. Nested approved requests are returned in full so
    the Time Off page can render them.
    """
    status_info = {
        "needs_update": False,
        "approved_count": 0,
        "approved_requests": [],
    }
    current = None
    try:
        from app.services.schedule_service import ScheduleService

        current = ScheduleService.get_current()
    except Exception:  # noqa: BLE001
        current = None

    try:
        all_requests = TimeOffService.list_requests()
        approved = TimeOffService.get_approved_requests()
    except TimeOffError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    if current is not None and approved:
        current_dates = {
            s.shift_date for s in current.shifts if s.shift_date is not None
        }
        overlapping = []
        for req in approved:
            if req.start_date is None or req.end_date is None:
                continue
            if (
                req.start_date <= max(current_dates or {req.start_date})
                and req.end_date >= min(current_dates or {req.end_date})
            ):
                # Overlap check against the schedule's date range.
                if any(
                    req.start_date <= d <= req.end_date
                    for d in current_dates
                ):
                    overlapping.append(req)
        status_info = {
            "needs_update": bool(overlapping),
            "approved_count": len(overlapping),
            "approved_requests": [TimeOffOut.model_validate(r) for r in overlapping],
        }
    return status_info
