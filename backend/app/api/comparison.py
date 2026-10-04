# Baseline-comparison API routes (P06, normal mode). Kept thin.
#
# A comparison is generated ONLY when the user explicitly asks for one —
# never implicitly for every schedule. It compares the current schedule
# against a deterministic manual baseline built from the same inputs.
from fastapi import APIRouter, HTTPException

from app.services.comparison_service import (
    ComparisonEnvelope,
    ComparisonService,
)

router = APIRouter(prefix="/api/v1/comparison", tags=["comparison"])


@router.post("", response_model=ComparisonEnvelope)
def generate_comparison():
    comparison = ComparisonService.generate_for_current_schedule()
    if comparison is None:
        raise HTTPException(
            status_code=404,
            detail=(
                "Build a schedule first — a baseline comparison needs a "
                "current schedule to compare against."
            ),
        )
    return ComparisonEnvelope(has_comparison=True, comparison=comparison)


@router.get("", response_model=ComparisonEnvelope)
def get_comparison():
    comparison = ComparisonService.get_stored()
    if comparison is None:
        return ComparisonEnvelope(has_comparison=False, comparison=None)
    return ComparisonEnvelope(has_comparison=True, comparison=comparison)
