# Optimization service layer (P03/P05).
#
# Thin wrapper: the API calls this, and it delegates to the optimizer.
# All mathematics lives in app.optimizer; nothing is solved here.
# P05: a successful (optimal) result is additionally stored as the
# authoritative current schedule via ScheduleService. Infeasible/error
# outcomes never touch the stored schedule.

from app.optimizer.model import (
    OptimizationStatus,
    OptimizeRequest,
    OptimizationResult,
)
from app.optimizer.solver import solve_optimization
from app.services.schedule_service import ScheduleService


class OptimizationService:
    @staticmethod
    def optimize(request: OptimizeRequest) -> OptimizationResult:
        result = solve_optimization(request)
        if (
            result.status == OptimizationStatus.OPTIMAL
            and result.metrics is not None
        ):
            ScheduleService.save_from_result(request, result)
        return result
