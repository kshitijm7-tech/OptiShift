# Optimization service layer (P03).
#
# Thin wrapper: the API calls this, and it delegates to the optimizer.
# All mathematics lives in app.optimizer; nothing is solved here.

from app.optimizer.model import OptimizeRequest, OptimizationResult
from app.optimizer.solver import solve_optimization


class OptimizationService:
    @staticmethod
    def optimize(request: OptimizeRequest) -> OptimizationResult:
        return solve_optimization(request)
