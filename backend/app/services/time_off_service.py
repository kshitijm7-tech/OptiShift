# Time-off / leave service (P07).
#
# Turns the existing TimeOff model into a real workflow:
#
#   employee requests time off
#     -> manager sees request
#     -> approve / reject
#     -> approved leave becomes unavailability for the real P03 optimizer on
#        re-optimization
#     -> "Update Schedule" -> POST /api/v1/reoptimize -> the optimizer
#        rebuilds the schedule WITHOUT employees on approved leave
#     -> current schedule is replaced only when the re-optimization is
#        optimal; infeasible results never destroy the valid schedule.
#
# Storage: an in-memory dict, same lifecycle as the rest of the app
# (survives frontend refresh, cleared on backend restart). It does NOT write
# to EMPLOYEES_DB, and it never touches ScheduleService directly: the
# re-optimization flow uses ScheduleService as the single authoritative
# current-schedule store.
#
# Approval rules (documented, no silent transitions):
#   pending -> approved
#   pending -> rejected
#   approved -> rejected (allowed; a manager can stop an approval)
#   rejected -> anything is rejected as a nonsensical transition.

from datetime import date, datetime, timezone
from typing import Dict, List, Optional
import uuid

from pydantic import BaseModel

from app.models.domain import Employee, TimeOff, TimeOffBase, TimeOffCreate
from app.services.employee_service import EmployeeService
from app.services.schedule_service import CurrentSchedule, ScheduleService
from app.optimizer.model import OptimizationStatus, OptimizeRequest
from app.services.optimization_service import OptimizationService
from app.optimizer.validator import validate_assignments

# Status constants (must match the existing TimeOff model defaults).
PENDING = "pending"
APPROVED = "approved"
REJECTED = "rejected"

VALID_STATUSES = {PENDING, APPROVED, REJECTED}

# Allowed transitions. The existing product only permits pending ->
# approved and pending -> rejected, so approved/rejected are terminal. A
# manager may still reject an already-approved request (approved -> rejected)
# to retract a decision; anything else is a nonsensical transition.
ALLOWED_TRANSITIONS = {
    PENDING: {APPROVED, REJECTED},
    APPROVED: {REJECTED},
    REJECTED: set(),
}

# The leave context carried to the optimizer for every re-optimization run.
# employee_id -> dates the person is out (approved leave, inclusive).
LeaveUnavailability = Dict[str, List[date]]




class TimeOffOut(TimeOff):
    """The field set returned to the API and frontend."""
    pass


class TimeOffList(BaseModel):
    requests: List[TimeOffOut]


class TimeOffResponse(BaseModel):
    request: TimeOffOut


class ReoptimizationResult(BaseModel):
    """Envelope returned by POST /api/v1/reoptimize (P07).

    status is optimal | infeasible | error. On optimal the new current
    schedule is stored by ScheduleService and echoed here; on infeasible or
    error the previous valid schedule is preserved and echoed unchanged under
    `schedule` so the UI can keep showing it.

    affected_leave lists the approved requests that drove the run (mostly
    useful for the infeasible explanation).
    """

    status: str
    schedule: Optional[CurrentSchedule] = None
    previous_schedule_id: Optional[str] = None
    explanation: List[str] = []
    affected_leave: List[TimeOffOut] = []
    solver: Optional[dict] = None


class TimeOffService:
    # --- in-memory store (same lifecycle as the rest of the app) -------------
    @staticmethod
    def _store() -> Dict[str, TimeOff]:
        # Module-level in-memory store keyed by request id, created on first
        # use so the module can be imported without executing.
        from app.services import time_off_service as _mod

        if not hasattr(_mod, "_DB"):
            _mod._DB = {}
        return _mod._DB

    @staticmethod
    def _next_id() -> str:
        return str(uuid.uuid4())

    # --- public API ---------------------------------------------------------

    @staticmethod
    def create(payload: TimeOffCreate) -> TimeOff:
        """Create a pending request after validation."""
        TimeOffService._validate_create(payload)
        employee = EmployeeService.get_employee(payload.employee_id)
        if employee is None:
            raise TimeOffError(
                f"Employee '{payload.employee_id}' does not exist."
            )
        request = TimeOff(
            id=TimeOffService._next_id(),
            employee_id=payload.employee_id,
            start_date=payload.start_date,
            end_date=payload.end_date,
            reason=payload.reason,
            status=PENDING,
        )
        TimeOffService._store()[request.id] = request
        return request

    @staticmethod
    def list_requests(status: Optional[str] = None) -> List[TimeOff]:
        """Return all requests, optionally filtered by status."""
        if status is None:
            return list(TimeOffService._store().values())
        if status not in VALID_STATUSES:
            raise TimeOffError(f"Unknown status filter '{status}'.")
        return [r for r in TimeOffService._store().values() if r.status == status]

    @staticmethod
    def get_request(request_id: str) -> TimeOff:
        request = TimeOffService._store().get(request_id)
        if request is None:
            raise TimeOffError(f"Leave request '{request_id}' not found.")
        return request

    @staticmethod
    def approve(request_id: str) -> TimeOff:
        request = TimeOffService.get_request(request_id)
        TimeOffService._validate_transition(request, APPROVED)
        request.status = APPROVED
        return request

    @staticmethod
    def reject(request_id: str) -> TimeOff:
        request = TimeOffService.get_request(request_id)
        TimeOffService._validate_transition(request, REJECTED)
        request.status = REJECTED
        return request

    # --- P07 helpers for the optimizer --------------------------------------

    @staticmethod
    def get_leave_unavailability() -> LeaveUnavailability:
        """approved leave -> dates out (inclusive), ready to feed the optimizer.

        Only approved requests participate. Leave is inclusive on both ends,
        matching the existing Shift dates (a shift on 2026-10-06 is excluded
        for a 2026-10-06 -> 2026-10-07 leave).
        """
        unavailability: LeaveUnavailability = {}
        for request in TimeOffService.list_requests(status=APPROVED):
            dates = list(
                range(
                    request.start_date.toordinal(),
                    request.end_date.toordinal() + 1,
                )
            )
            unavailability[request.employee_id] = [
                date.fromordinal(o) for o in dates
            ]
        return unavailability

    @staticmethod
    def get_approved_requests() -> List[TimeOff]:
        return TimeOffService.list_requests(status=APPROVED)

    @staticmethod
    def get_rejected_requests() -> List[TimeOff]:
        return TimeOffService.list_requests(status=REJECTED)

    @staticmethod
    def get_unapproved_or_pending_leaves() -> List[TimeOff]:
        return [
            r
            for r in TimeOffService.list_requests()
            if r.status != APPROVED
        ]

    # --- re-optimization workflow -------------------------------------------

    @staticmethod
    def reoptimize() -> ReoptimizationResult:
        """Load the current schedule, apply approved leave, rebuild with the
        real P03 optimizer, and store the result only if it succeeds.

        Returns a ReoptimizationResult. An optimal run replaces the current
        schedule; an infeasible or error run leaves the previous valid
        schedule unchanged and reports it back.
        """
        current = ScheduleService.get_current()
        if current is None:
            return ReoptimizationResult(
                status="error",
                explanation=[
                    "No current schedule to re-optimize. Build a schedule first "
                    "with the optimizer."
                ],
            )

        approved = TimeOffService.get_approved_requests()
        unavailability = (
            TimeOffService.get_leave_unavailability() if approved else {}
        )
        request = OptimizeRequest(
            employees=list(current.employees),
            shifts=list(current.shifts),
            requirements=list(current.requirements),
            unavailability=unavailability,
        )

        result = OptimizationService.optimize(request)  # real P03 engine
        if result.status == OptimizationStatus.OPTIMAL and result.metrics is not None:
            # OptimizationService already stored the optimal result as the
            # single current schedule. Echo the fresh store.
            new_schedule = ScheduleService.get_current()
            return ReoptimizationResult(
                status="optimal",
                schedule=new_schedule,
                previous_schedule_id=current.id,
                affected_leave=list(approved),
                solver=result.solver.model_dump() if result.solver else None,
            )

        # Infeasible or error: never overwrite the valid schedule.
        return ReoptimizationResult(
            status=result.status.value
            if hasattr(result.status, "value")
            else result.status,
            schedule=current,
            previous_schedule_id=current.id,
            explanation=list(result.violations or []),
            affected_leave=list(approved),
            solver=result.solver.model_dump() if result.solver else None,
        )

    # --- internal validation ------------------------------------------------

    @staticmethod
    def _validate_create(payload: TimeOffCreate) -> None:
        if not payload.employee_id:
            raise TimeOffError("Employee is required.")
        if payload.start_date > payload.end_date:
            raise TimeOffError("Start date must be on or before the end date.")
        # Both dates must be valid calendar dates (pydantic already enforces
        # this via the TimeOffBase schema).

    @staticmethod
    def _validate_transition(request: TimeOff, new_status: str) -> None:
        if request.status not in VALID_STATUSES:
            raise TimeOffError(f"Unknown request status '{request.status}'.")
        if new_status not in VALID_STATUSES:
            raise TimeOffError(f"Unknown status '{new_status}'.")
        allowed = ALLOWED_TRANSITIONS.get(request.status, set())
        if new_status not in allowed:
            raise TimeOffError(
                f"Cannot transition leave from '{request.status}' to "
                f"'{new_status}'. Only pending requests can be approved or "
                f"rejected."
            )


class TimeOffError(Exception):
    """A P07 error with a friendly, customer-facing message. Never a raw
    traceback or solver detail reaches the UI."""

    def __init__(self, message: str):
        super().__init__(message)
        self.message = message
