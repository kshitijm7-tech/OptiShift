# Leave (time-off) API routes (P07). Thin: delegate to TimeOffService.
#
# Approval rules mirror the service:
#   pending -> approved
#   pending -> rejected
#   approved -> rejected (retract a decision)
#   everything else -> friendly 400
from fastapi import APIRouter, HTTPException
from typing import List

from app.models.domain import TimeOff, TimeOffCreate
from app.services.time_off_service import (
    APPROVED,
    PENDING,
    REJECTED,
    TimeOffError,
    TimeOffList,
    TimeOffOut,
    TimeOffService,
)

router = APIRouter(prefix="/api/v1/leave", tags=["leave"])


def _to_list(requests: List[TimeOff]) -> TimeOffList:
    return TimeOffList(requests=[TimeOffOut.model_validate(r.model_dump() if hasattr(r, "model_dump") else r) for r in requests])


@router.get("", response_model=TimeOffList)
def list_leave_requests(status: str | None = None):
    """List leave requests (optionally filtered by status)."""
    if status is not None and status not in {PENDING, APPROVED, REJECTED}:
        raise HTTPException(
            status_code=400,
            detail="status must be one of: pending, approved, rejected.",
        )
    try:
        requests = TimeOffService.list_requests(status or None)
    except TimeOffError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return _to_list(requests)


@router.post("", response_model=TimeOffOut, status_code=201)
def create_leave_request(payload: TimeOffCreate):
    """Create a pending leave request for an existing employee."""
    if payload.employee_id is None or payload.employee_id == "":
        raise HTTPException(status_code=400, detail="Employee is required.")
    try:
        request = TimeOffService.create(
            TimeOffCreate(
                employee_id=payload.employee_id,
                start_date=payload.start_date,
                end_date=payload.end_date,
                reason=payload.reason,
            )
        )
    except TimeOffError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return TimeOffOut.model_validate(request)


@router.post("/{request_id}/approve", response_model=TimeOffOut)
def approve_leave_request(request_id: str):
    """Approve a pending request (pending -> approved only)."""
    try:
        request = TimeOffService.approve(request_id)
    except TimeOffError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return TimeOffOut.model_validate(request)


@router.post("/{request_id}/reject", response_model=TimeOffOut)
def reject_leave_request(request_id: str):
    """Reject a pending request (pending -> rejected only)."""
    try:
        request = TimeOffService.reject(request_id)
    except TimeOffError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return TimeOffOut.model_validate(request)
