# OptiShift - Developer Handoff

## What is OptiShift?
OptiShift is a workforce optimization engine that creates feasible and cost-efficient schedules from people, availability, skills, business needs, and rules. It uses true mathematical optimization (PuLP/CBC).

## Current Phase
**P02 — Core Data Models + Backend Foundation** (Completed)
Next step is P03 — Optimization Engine.

## Architecture
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router. Minimal shell with navigation placeholders.
- **Backend**: FastAPI with layered architecture:
  - `app/api/` — thin route handlers
  - `app/services/` — business logic (EmployeeService)
  - `app/models/` — Pydantic domain models
  - `app/optimizer/` — placeholder for P03
- **Communication**: REST API
- **Storage**: In-memory (dict-based) for now

## Important Files
- `ui/` — Stitch UI/UX (DO NOT modify)
- `backend/app/models/domain.py` — All domain models (Employee, Shift, StaffingRequirement, TimeOff, ScheduleAssignment, Availability, Business)
- `backend/app/api/employees.py` — Employee API routes
- `backend/app/services/employee_service.py` — Employee service layer
- `backend/app/main.py` — FastAPI application entry point
- `backend/tests/` — Test suite (test_main, test_models, test_api)
- `sentinel.yaml` — Architecture blueprint
- `docs/` — Product, Architecture, UI/UX Spec, API Contract, Sentinel Evidence

## How to Start
### Backend
```bash
cd backend
uv venv
uv pip install -r requirements.txt
$env:PYTHONPATH="." ; uv run uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Tests
```bash
cd backend
$env:PYTHONPATH="." ; uv run pytest
```

### Sentinel (from D:\MProjects\Sentinel_v1.0)
```bash
cd D:\MProjects\Sentinel_v1.0
uv run sentinel scan d:\MProjects\OptiShift
uv run sentinel analyze d:\MProjects\OptiShift
uv run sentinel verify -c CIRCULAR_DEPENDENCY -s OptiShift -p "compliant" d:\MProjects\OptiShift --decide
```

## Current Known Issues
- Sentinel V1 blueprint verifier does not parse custom sentinel.yaml schema (returns NOT_APPLICABLE for LAYER_BOUNDARY/DEPENDENCY_RULE). CIRCULAR_DEPENDENCY PASS works.

## Next Step
Begin **P03 — Optimization Engine**. Implement PuLP/CBC-based mathematical optimization that consumes the domain models from `backend/app/models/domain.py`. The optimizer should live in `backend/app/optimizer/`. Read `AGENTS.md` and `CURRENT_STATE.md` before starting.
