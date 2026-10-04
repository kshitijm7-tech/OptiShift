# Optimizer shared model for OptiShift P03.
#
# This module holds the optimization input/output contracts, the documented
# objective weights, and small deterministic helper functions. It depends only
# on the domain models (`app.models.domain`) and never on API or service
# layers.
#
# For P07, `OptimizeRequest` also carries an optional
# `unavailability: Dict[str, List[date]]` context: `employee_id -> dates the
# person is out (approved leave, inclusive)`. The solver treats those
# employee/shift pairs as ineligible by construction, so an employee on
# approved leave can never be assigned to a shift they are out for. Adding or
# removing the field is backward compatible: existing requests simply omit it.

from datetime import date, datetime, time, timedelta
from enum import Enum
from typing import Dict, List, Optional, Tuple

from pydantic import BaseModel, Field

from app.models.domain import Employee, Shift, StaffingRequirement


# ---------------------------------------------------------------------------
# Objective weights (P03 decision, documented here and in docs/ARCHITECTURE.md)
# ---------------------------------------------------------------------------
# No pre-existing weights were found in the docs, so P03 defines simple ones:
#   W_COST       = 1.0   per currency unit of labor cost (dominant term)
#   W_EXTRA      = 10.0  per overtime hour (normally 0: H3 hard-caps hours)
#   W_PREFERENCE = 0.0   P02 domain model has no preference data yet
#   W_BALANCE    = 0.5   per hour of peak (max) employee load; breaks ties
#                        toward fair schedules without overriding cost.
# A tiny deterministic tie-breaker (1e-4 * employee sort index) makes
# equal-cost solutions stable for tests and the Algothon demo.
DEFAULT_W_COST = 1.0
DEFAULT_W_EXTRA = 10.0
DEFAULT_W_PREFERENCE = 0.0
DEFAULT_W_BALANCE = 0.5
TIEBREAK_EPSILON = 1e-4


class OptimizationStatus(str, Enum):
    OPTIMAL = "optimal"
    INFEASIBLE = "infeasible"
    ERROR = "error"


class ObjectiveWeights(BaseModel):
    labor_cost: float = Field(default=DEFAULT_W_COST, ge=0)
    extra_hours: float = Field(default=DEFAULT_W_EXTRA, ge=0)
    preference: float = Field(default=DEFAULT_W_PREFERENCE, ge=0)
    balance: float = Field(default=DEFAULT_W_BALANCE, ge=0)


class OptimizeRequest(BaseModel):
    employees: List[Employee] = []
    shifts: List[Shift] = []
    requirements: List[StaffingRequirement] = []
    weights: ObjectiveWeights = Field(default_factory=ObjectiveWeights)
    # P07: dates an employee is unavailable because of approved leave
    # (inclusive). The solver treats these employee/shift pairs as
    # ineligible so an employee on approved leave can never be assigned to a
    # shift they are out for. Kept optional so normal P03/P05/P06 calls are
    # unaffected and backward compatible.
    unavailability: Dict[str, List[date]] = Field(
        default_factory=dict,
        description="employee_id -> dates the employee is out (approved leave, inclusive).",
    )


class Assignment(BaseModel):
    employee_id: str
    shift_id: str
    assigned_date: date


class OptimizationMetrics(BaseModel):
    total_labor_cost: float
    total_hours: float
    extra_hours_total: float
    max_hours_per_employee: float
    min_hours_per_employee: float
    employee_hours: Dict[str, float] = {}
    shifts_staffed: int = 0
    shifts_total: int = 0


class ObjectiveBreakdown(BaseModel):
    labor_cost: float
    labor_cost_weighted: float
    extra_hours: float
    extra_hours_weighted: float
    preference_penalty: float
    preference_weighted: float
    balance_term: float
    balance_weighted: float
    total_objective: float


class SolverInfo(BaseModel):
    solver: str = "PULP_CBC_CMD"
    status: str = "unknown"
    solve_seconds: Optional[float] = None


class OptimizationResult(BaseModel):
    status: OptimizationStatus
    assignments: List[Assignment] = []
    metrics: Optional[OptimizationMetrics] = None
    violations: List[str] = []
    objective_breakdown: Optional[ObjectiveBreakdown] = None
    solver: SolverInfo = Field(default_factory=SolverInfo)
    explanation: List[str] = []


# ---------------------------------------------------------------------------
# Deterministic helpers (pure functions, no solver dependency)
# ---------------------------------------------------------------------------

def shift_duration_hours(shift: Shift) -> float:
    """Duration of a shift in hours.

    Handles midnight-crossing shifts (end <= start means the shift ends the
    next day). Combines shift_date with start/end times for correctness.
    """
    start = datetime.combine(shift.shift_date, shift.start_time)
    end = datetime.combine(shift.shift_date, shift.end_time)
    if end <= start:
        # Crosses midnight: the shift ends the following day.
        end = end + timedelta(days=1)
    return (end - start).total_seconds() / 3600.0


def is_employee_active(employee: Employee) -> bool:
    return (employee.status or "").strip().lower() == "active"


def covers_availability(employee: Employee, shift: Shift) -> bool:
    """True when the employee's availability covers the whole shift.

    An empty availability list means open availability (available for any
    shift). Otherwise at least one entry must match the shift's weekday and
    fully contain [start_time, end_time].
    """
    if not employee.availability:
        return True
    weekday = shift.shift_date.weekday()  # Monday=0 .. Sunday=6
    for slot in employee.availability:
        if slot.day_of_week != weekday:
            continue
        if slot.start_time <= shift.start_time and shift.end_time <= slot.end_time:
            return True
    return False


def has_required_skills(employee: Employee, required_skills: List[str]) -> bool:
    return all(skill in (employee.skills or []) for skill in required_skills)


def matches_required_role(employee: Employee, shift: Shift) -> bool:
    if not shift.required_role:
        return True
    return employee.role == shift.required_role


def shifts_overlap(a: Shift, b: Shift) -> bool:
    """True when two shifts on the same date overlap in time."""
    if a.shift_date != b.shift_date:
        return False

    def _interval(s: Shift) -> Tuple[float, float]:
        start = s.start_time.hour * 60 + s.start_time.minute
        end = s.end_time.hour * 60 + s.end_time.minute
        if end <= start:
            end += 24 * 60
        return (start, end)

    a_start, a_end = _interval(a)
    b_start, b_end = _interval(b)
    return max(a_start, b_start) < min(a_end, b_end)


def employee_eligible(
    employee: Employee,
    shift: Shift,
    required_skills: List[str],
    unavailability: Optional[Dict[str, List[date]]] = None,
) -> Tuple[bool, str]:
    """Eligibility check used both before solving and in post-validation.

    Returns (True, "") when the employee may take the shift, otherwise
    (False, reason).

    H1/H5/H6 are documented in app.optimizer.constraints. H7 (P07) is the
    approved-leave check: an employee on leave cannot be assigned to any
    shift inside the leave window, inclusive. `unavailability` carries
    `employee_id -> dates` (approved leave, inclusive); when it is None the
    leave check is skipped (backward compatibility).
    """
    if not is_employee_active(employee):
        return False, f"employee '{employee.id}' is not active"
    if not matches_required_role(employee, shift):
        return False, (
            f"employee '{employee.id}' role '{employee.role}' does not match "
            f"required role '{shift.required_role}' for shift '{shift.id}'"
        )
    if not has_required_skills(employee, required_skills):
        return False, (
            f"employee '{employee.id}' lacks required skills {required_skills} "
            f"for shift '{shift.id}'"
        )
    if not covers_availability(employee, shift):
        return False, (
            f"employee '{employee.id}' is not available for shift '{shift.id}'"
        )
    # H7 - approved leave availability.
    emp_dates = (unavailability or {}).get(employee.id, [])
    if emp_dates and shift.shift_date in emp_dates:
        return False, (
            f"employee '{employee.id}' is on approved leave on {shift.shift_date}"
        )
    return True, ""
