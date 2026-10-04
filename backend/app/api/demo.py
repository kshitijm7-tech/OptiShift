# Demo Mode API routes (P06). Kept thin: delegate to DemoService.
from fastapi import APIRouter, HTTPException

from app.services.comparison_service import ComparisonEnvelope
from app.services.demo_data import DemoDataset
from app.services.demo_service import DemoRunError, DemoService

router = APIRouter(prefix="/api/v1/demo", tags=["demo"])


@router.get("", response_model=DemoDataset)
def get_demo_dataset():
    """Read-only UrbanBrew Café scenario for the current week."""
    return DemoService.get_dataset()


@router.post("/run", response_model=ComparisonEnvelope)
def run_demo():
    """Baseline → P03 optimizer → comparison, all inside the demo workspace.

    The user's team and current schedule are never touched. Re-running
    replaces the previous demo result.
    """
    try:
        DemoService.run_demo()
    except DemoRunError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return ComparisonEnvelope(has_comparison=True, comparison=DemoService.get_comparison())


@router.get("/comparison", response_model=ComparisonEnvelope)
def get_demo_comparison():
    comparison = DemoService.get_comparison()
    if comparison is None:
        return ComparisonEnvelope(has_comparison=False, comparison=None)
    return ComparisonEnvelope(has_comparison=True, comparison=comparison)


@router.post("/reset")
def reset_demo():
    """Clear the demo workspace (results only; user data was never touched)."""
    DemoService.reset()
    return {"reset": True}
