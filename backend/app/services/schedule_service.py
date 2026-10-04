# Current-schedule store (P05). Backend-owned authoritative state.
#
# After a successful optimization, the resulting schedule is stored here as
# the ONE current schedule. Overview and Schedule pages both read it, so
# they can never disagree. Only optimal results are stored: infeasible or
# error outcomes never replace a valid current schedule.
#
# Persistence lifecycle (deliberately simple, consistent with EMPLOYEES_DB):
# in-memory for the running backend process. Survives every frontend
# refresh; cleared on backend restart (the referenced employees live in the
# same in-memory DB, so a file-backed schedule would dangle after restart).

from datetime import datetime, timezone
from typing import List, Optional
import uuid

from pydantic import BaseModel, Field

from app.models.domain import Employee, Shift, StaffingRequirement
from app.optimizer.model import (
    Assignment,
    ObjectiveBreakdown,
    OptimizationMetrics,
    OptimizationStatus,
    OptimizeRequest,
    OptimizationResult,
    SolverInfo,
)


class CurrentSchedule(BaseModel):
    """Authoritative current schedule. Reuses P03 contracts verbatim."""

    id: str
    generated_at: datetime
    status: OptimizationStatus = OptimizationStatus.OPTIMAL
    assignments: List[Assignment] = []
    shifts: List[Shift] = []
    employees: List[Employee] = []
    requirements: List[StaffingRequirement] = []
    metrics: OptimizationMetrics
    objective_breakdown: Optional[ObjectiveBreakdown] = None
    explanation: List[str] = []
    solver: SolverInfo = Field(default_factory=SolverInfo)


class ScheduleResponse(BaseModel):
    """Envelope for GET /api/v1/schedule. No fake schedules: when nothing
    was built yet, has_schedule is False and schedule is None (HTTP 200)."""

    has_schedule: bool
    schedule: Optional[CurrentSchedule] = None


_CURRENT_SCHEDULE: Optional[CurrentSchedule] = None


class ScheduleService:
    @staticmethod
    def get_current() -> Optional[CurrentSchedule]:
        return _CURRENT_SCHEDULE

    @staticmethod
    def save_from_result(
        request: OptimizeRequest, result: OptimizationResult
    ) -> CurrentSchedule:
        """Store an optimal result as the new current schedule.

        Must only be called with optimal results that carry metrics;
        raises ValueError otherwise so failures can never overwrite state.
        """
        if result.status != OptimizationStatus.OPTIMAL:
            raise ValueError(
                "only optimal results may become the current schedule"
            )
        if result.metrics is None:
            raise ValueError(
                "optimal result without metrics cannot be stored"
            )
        global _CURRENT_SCHEDULE
        schedule = CurrentSchedule(
            id=str(uuid.uuid4()),
            generated_at=datetime.now(timezone.utc),
            status=result.status,
            assignments=list(result.assignments),
            shifts=list(request.shifts),
            employees=list(request.employees),
            requirements=list(request.requirements),
            metrics=result.metrics,
            objective_breakdown=result.objective_breakdown,
            explanation=list(result.explanation),
            solver=result.solver,
        )
        _CURRENT_SCHEDULE = schedule
        return schedule

    @staticmethod
    def clear() -> None:
        """Reset the store. Used by tests; no API route exposes this."""
        global _CURRENT_SCHEDULE
        _CURRENT_SCHEDULE = None
