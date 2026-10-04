# Custom scheduling configuration contract (P08).
#
# Customer-facing knobs for Custom Mode. This module lives in the models
# layer and therefore contains NO optimizer imports: it only describes what
# the manager wants. The translation into engine inputs
# (ObjectiveWeights inside OptimizeRequest) happens in the service layer
# (app/services/scheduling_service.py), so the mapping stays on the
# backend and the frontend remains presentation-only.
#
# Deliberately absent: an "extra hours allowed" switch. The P03 engine
# enforces max weekly hours as a hard constraint (H3), so overtime can
# never be scheduled. Custom Mode is honest about this: managers raise a
# person's max weekly hours instead, and hour caps are always enforced.
# Likewise there is no preference switch: the P02 domain model carries no
# preference data, so the preference weight stays 0.

from typing import List

from pydantic import BaseModel, Field

from app.models.domain import Employee, Shift, StaffingRequirement


class SchedulingRules(BaseModel):
    """Tunable soft-objective priorities, in engine weight units.

    Both default to the P03 engine defaults, so omitting rules reproduces
    standard optimization behavior exactly.
    """

    labor_cost_weight: float = Field(
        default=1.0,
        ge=0,
        description="Priority of keeping staff cost low (P03 default 1.0).",
    )
    work_balance_weight: float = Field(
        default=0.5,
        ge=0,
        description="Priority of sharing hours fairly (P03 default 0.5).",
    )


class BusinessInput(BaseModel):
    """Who the schedule is for. Validated context for the run; the
    optimized result itself carries the team/shifts/metrics."""

    name: str = Field(min_length=1, description="Business name.")
    location: str = Field(default="", description="Outlet or city.")


class CustomScheduleConfig(BaseModel):
    """One complete Custom Mode setup: business + team + shifts +
    staffing needs + rules. The service layer converts this into an
    OptimizeRequest for the single shared P03 engine."""

    business: BusinessInput
    employees: List[Employee] = Field(
        default_factory=list,
        description="Team members to schedule (inactive ones are excluded).",
    )
    shifts: List[Shift] = []
    requirements: List[StaffingRequirement] = []
    rules: SchedulingRules = Field(default_factory=SchedulingRules)
