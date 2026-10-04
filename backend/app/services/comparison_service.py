# Comparison service (P06).
#
# Compares two schedules measured the same way — a deterministic manual
# baseline (BaselineService) and an optimizer result (P03 PuLP/CBC) — and
# produces the improvement numbers shown in the UI. Every number is derived
# from the two schedules' own metrics; nothing is hardcoded.
#
# Money Saved = baseline staff cost − optimized staff cost (SIGNED).
# A negative result is reported truthfully as a cost increase, never
# flipped into a fake saving.
#
# Two stores live here:
#   - the normal-mode comparison (built from the user's current schedule)
#   - Demo Mode keeps its own comparison in DemoService (separate state)
# so demo activity can never overwrite user data.

from datetime import datetime, timezone
from typing import Optional
import uuid

from pydantic import BaseModel

from app.services.baseline_service import BaselineSchedule, BaselineService
from app.services.schedule_service import CurrentSchedule, ScheduleService


def _coverage_percent(metrics) -> float:
    if metrics.shifts_total <= 0:
        return 0.0
    return round(metrics.shifts_staffed / metrics.shifts_total * 100.0, 1)


def _hours_spread(metrics) -> float:
    """Work-balance proxy: gap between the busiest and lightest workload."""
    return round(metrics.max_hours_per_employee - metrics.min_hours_per_employee, 2)


class ComparisonImprovements(BaseModel):
    """Signed deltas. Positive cost_saved = money saved; negative = the
    optimized schedule costs MORE (reported honestly, never flipped)."""

    cost_saved: Optional[float] = None
    cost_saved_percent: Optional[float] = None
    hours_change: Optional[float] = None
    coverage_change: Optional[float] = None
    extra_hours_change: Optional[float] = None
    work_balance_change: Optional[float] = None


class ScheduleComparison(BaseModel):
    id: str
    generated_at: datetime
    currency: str
    currency_symbol: str
    baseline: BaselineSchedule
    optimized: CurrentSchedule
    improvements: ComparisonImprovements
    summary: str


class ComparisonEnvelope(BaseModel):
    """Envelope for comparison reads. Absence is data (HTTP 200), mirroring
    the P05 schedule envelope: has_comparison False + comparison None."""

    has_comparison: bool
    comparison: Optional[ScheduleComparison] = None


def _cost_clause(improvements: ComparisonImprovements, symbol: str) -> str:
    saved = improvements.cost_saved or 0.0
    percent = improvements.cost_saved_percent
    if percent is not None:
        return (
            f"OptiShift saved {symbol}{saved:,.2f} "
            f"({percent:g}% lower staff cost) compared with the manual baseline"
        )
    return f"OptiShift saved {symbol}{saved:,.2f} compared with the manual baseline"


def _coverage_clause(optimized_pct: float, baseline_pct: float) -> str:
    if optimized_pct > baseline_pct:
        return (
            f"and raised shift coverage from {baseline_pct:g}% to {optimized_pct:g}%"
        )
    if optimized_pct < baseline_pct:
        return (
            f"though coverage fell from {baseline_pct:g}% to {optimized_pct:g}% "
            "— review the gaps before using it"
        )
    if optimized_pct >= 100.0:
        return "with every required shift fully staffed on both sides"
    return f"with the same {optimized_pct:g}% staffing coverage as the manual pass"


def _balance_clause(baseline_metrics, optimized_metrics) -> str:
    change = round(_hours_spread(optimized_metrics) - _hours_spread(baseline_metrics), 2)
    if change > 0.05:
        return (
            f" Workload is spread a little less evenly ({_hours_spread(baseline_metrics):g}h -> "
            f"{_hours_spread(optimized_metrics):g}h between the busiest and lightest team "
            "members) — the optimizer traded some evenness for the lower cost."
        )
    if change < -0.05:
        return (
            f" Workload is also spread more evenly ({_hours_spread(baseline_metrics):g}h -> "
            f"{_hours_spread(optimized_metrics):g}h between the busiest and lightest team members)."
        )
    return ""


def _baseline_gap_note(baseline_pct: float, optimized_pct: float) -> str:
    if baseline_pct < optimized_pct:
        return (
            " The baseline left shifts unfilled, which lowered its cost "
            "without covering the week."
        )
    return ""


def _build_summary(
    baseline_metrics,
    optimized_metrics,
    improvements: ComparisonImprovements,
    symbol: str,
) -> str:
    baseline_pct = _coverage_percent(baseline_metrics)
    optimized_pct = _coverage_percent(optimized_metrics)
    saved = improvements.cost_saved or 0.0
    clause = _coverage_clause(optimized_pct, baseline_pct)
    balance = _balance_clause(baseline_metrics, optimized_metrics)
    if saved > 0:
        return f"{_cost_clause(improvements, symbol)}, {clause}.{balance}"
    if saved == 0:
        return (
            f"Staff cost is the same as the manual baseline ({symbol}0 saved), "
            f"{clause}.{balance}"
        )
    # Negative: the optimized schedule costs more. Say so plainly.
    return (
        f"Staff cost increased by {symbol}{abs(saved):,.2f} versus the manual "
        f"baseline, {clause}.{_baseline_gap_note(baseline_pct, optimized_pct)}{balance}"
    )


class ComparisonService:
    @staticmethod
    def compare(
        baseline: BaselineSchedule,
        optimized: CurrentSchedule,
        currency: str,
        currency_symbol: str,
    ) -> ScheduleComparison:
        improvements = ComparisonImprovements()
        summary = (
            "A comparison is not available because one of the schedules is "
            "missing metrics."
        )
        if baseline.metrics is not None and optimized.metrics is not None:
            b, o = baseline.metrics, optimized.metrics
            cost_saved = round(b.total_labor_cost - o.total_labor_cost, 2)
            percent = (
                round(cost_saved / b.total_labor_cost * 100.0, 1)
                if b.total_labor_cost > 0
                else None
            )
            improvements = ComparisonImprovements(
                cost_saved=cost_saved,
                cost_saved_percent=percent,
                hours_change=round(o.total_hours - b.total_hours, 2),
                coverage_change=round(
                    _coverage_percent(o) - _coverage_percent(b), 1
                ),
                extra_hours_change=round(o.extra_hours_total - b.extra_hours_total, 2),
                work_balance_change=round(_hours_spread(o) - _hours_spread(b), 2),
            )
            summary = _build_summary(b, o, improvements, currency_symbol)
        return ScheduleComparison(
            id=str(uuid.uuid4()),
            generated_at=datetime.now(timezone.utc),
            currency=currency,
            currency_symbol=currency_symbol,
            baseline=baseline,
            optimized=optimized,
            improvements=improvements,
            summary=summary,
        )

    # --- normal-mode comparison (user's current schedule) ----------------

    @staticmethod
    def generate_for_current_schedule(
        currency: str = "INR", currency_symbol: str = "₹"
    ) -> Optional[ScheduleComparison]:
        """Build a baseline for the CURRENT schedule's own inputs and store
        the comparison. Returns None when no current schedule exists yet.

        Baselines are never generated implicitly: this runs only when the
        user explicitly asks for a comparison.
        """
        current = ScheduleService.get_current()
        if current is None:
            return None
        return ComparisonService.store_from_schedule(
            current, currency=currency, currency_symbol=currency_symbol
        )

    @staticmethod
    def store_from_schedule(
        schedule: CurrentSchedule, currency: str, currency_symbol: str
    ) -> ScheduleComparison:
        from app.optimizer.model import OptimizeRequest

        request = OptimizeRequest(
            employees=list(schedule.employees),
            shifts=list(schedule.shifts),
            requirements=list(schedule.requirements),
        )
        baseline = BaselineService.generate_baseline(request)
        comparison = ComparisonService.compare(
            baseline, schedule, currency=currency, currency_symbol=currency_symbol
        )
        global _COMPARISON_STORE
        _COMPARISON_STORE = comparison
        return comparison

    @staticmethod
    def get_stored() -> Optional[ScheduleComparison]:
        return _COMPARISON_STORE

    @staticmethod
    def clear_stored() -> None:
        """Reset the normal-mode comparison. Used by tests."""
        global _COMPARISON_STORE
        _COMPARISON_STORE = None


_COMPARISON_STORE: Optional[ScheduleComparison] = None
