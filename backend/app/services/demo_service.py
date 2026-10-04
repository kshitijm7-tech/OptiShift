# Demo Mode service (P06).
#
# Owns the Demo Mode workspace: the UrbanBrew Café scenario, its baseline,
# its optimized schedule, and its comparison. Deliberately separate from the
# user's real data:
#
#   - The demo NEVER writes to EMPLOYEES_DB or ScheduleService. Demo runs
#     call the P03 engine (solve_optimization) directly instead of
#     OptimizationService.optimize, whose job is to refresh the user's
#     current schedule. The optimizer itself is untouched and generic.
#   - Demo state is in-memory for the running backend process (same
#     lifecycle as every other store) and is cleared explicitly via reset.
#   - A demo run re-derives the dataset each time and replaces the previous
#     demo result wholesale, so re-running is always consistent.

from datetime import datetime, timezone
from typing import Optional
import uuid

from pydantic import BaseModel

from app.optimizer.model import OptimizationStatus, OptimizeRequest
from app.optimizer.solver import solve_optimization
from app.services.baseline_service import BaselineSchedule, BaselineService
from app.services.comparison_service import (
    ComparisonService,
    ScheduleComparison,
)
from app.services.demo_data import (
    DEMO_CURRENCY,
    DEMO_CURRENCY_SYMBOL,
    DemoDataset,
    get_demo_dataset,
)
from app.services.schedule_service import CurrentSchedule


class DemoRunError(Exception):
    """The demo scenario could not be scheduled. Message is user-facing."""


class DemoState(BaseModel):
    dataset: DemoDataset
    baseline: BaselineSchedule
    optimized: CurrentSchedule
    comparison: ScheduleComparison
    generated_at: datetime


_DEMO_STATE: Optional[DemoState] = None


class DemoService:
    @staticmethod
    def get_dataset() -> DemoDataset:
        return get_demo_dataset()

    @staticmethod
    def run_demo() -> DemoState:
        """Run the full demo workflow: baseline → P03 optimizer → comparison.

        Keeps every artifact inside the demo workspace; the user's team and
        current schedule are never read or written here.
        """
        global _DEMO_STATE
        dataset = get_demo_dataset()
        request = OptimizeRequest(
            employees=list(dataset.employees),
            shifts=list(dataset.shifts),
            requirements=list(dataset.requirements),
        )

        baseline = BaselineService.generate_baseline(request)

        result = solve_optimization(request)  # real P03 PuLP/CBC engine
        if result.status != OptimizationStatus.OPTIMAL or result.metrics is None:
            reasons = "; ".join(result.violations) or "the scenario could not be solved"
            raise DemoRunError(
                f"We couldn't build the demo schedule yet. {reasons}"
            )

        optimized = CurrentSchedule(
            id=str(uuid.uuid4()),
            generated_at=datetime.now(timezone.utc),
            status=result.status,
            assignments=list(result.assignments),
            shifts=list(dataset.shifts),
            employees=list(dataset.employees),
            requirements=list(dataset.requirements),
            metrics=result.metrics,
            objective_breakdown=result.objective_breakdown,
            explanation=list(result.explanation),
            solver=result.solver,
        )
        comparison = ComparisonService.compare(
            baseline,
            optimized,
            currency=DEMO_CURRENCY,
            currency_symbol=DEMO_CURRENCY_SYMBOL,
        )
        _DEMO_STATE = DemoState(
            dataset=dataset,
            baseline=baseline,
            optimized=optimized,
            comparison=comparison,
            generated_at=datetime.now(timezone.utc),
        )
        return _DEMO_STATE

    @staticmethod
    def get_comparison() -> Optional[ScheduleComparison]:
        return _DEMO_STATE.comparison if _DEMO_STATE is not None else None

    @staticmethod
    def reset() -> None:
        """Clear the demo workspace. The user's data was never touched."""
        global _DEMO_STATE
        _DEMO_STATE = None
