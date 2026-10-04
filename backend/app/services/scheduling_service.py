# Custom scheduling service (P08).
#
# Translates a CustomScheduleConfig (customer language) into an
# OptimizeRequest (engine language) and runs it through the ONE shared
# optimization path: OptimizationService.optimize -> PuLP/CBC. No second
# optimizer, no duplicated solver logic. Successful results flow into the
# same current-schedule store as every other build.
#
# The customer-rules -> engine-weights mapping lives here (backend), never
# in React, per the architecture boundaries.

from app.models.scheduling import CustomScheduleConfig
from app.optimizer.model import (
    ObjectiveWeights,
    OptimizeRequest,
    OptimizationResult,
)
from app.services.optimization_service import OptimizationService

# Engine defaults preserved for the untouched objective terms: overtime is
# hard-capped by H3 (extra-hours weight irrelevant) and the P02 model has
# no preference data (preference weight 0).
DEFAULT_W_EXTRA = 10.0
DEFAULT_W_PREFERENCE = 0.0


class SchedulingService:
    @staticmethod
    def build_optimize_request(config: CustomScheduleConfig) -> OptimizeRequest:
        """Convert Custom Mode configuration into engine inputs.

        Staffing minimums, required skills/roles, availability, hour caps,
        and employee status travel unchanged inside employees/shifts/
        requirements; the tunable rules become the objective weights.
        """
        return OptimizeRequest(
            employees=list(config.employees),
            shifts=list(config.shifts),
            requirements=list(config.requirements),
            weights=ObjectiveWeights(
                labor_cost=config.rules.labor_cost_weight,
                extra_hours=DEFAULT_W_EXTRA,
                preference=DEFAULT_W_PREFERENCE,
                balance=config.rules.work_balance_weight,
            ),
        )

    @staticmethod
    def build_custom_schedule(config: CustomScheduleConfig) -> OptimizationResult:
        """Run Custom Mode end to end through the shared P03 engine."""
        return OptimizationService.optimize(
            SchedulingService.build_optimize_request(config)
        )
