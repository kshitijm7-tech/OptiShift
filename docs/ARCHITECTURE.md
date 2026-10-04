# Architecture

This document reflects the actual P03 architecture.

- **Frontend**: A minimal React + TypeScript + Vite + Tailwind application shell (`frontend/`). No complex state management is introduced yet.
- **Backend**: A FastAPI application (`backend/app/main.py`) serving `/health`, employee routes, and the P03 optimization route:
```text
API (app/api/optimize.py, thin)
 ↓
Service (app/services/optimization_service.py)
 ↓
Optimization Engine (app/optimizer/: model, constraints, objectives, solver, validator)
 ↓
PuLP 2.8.0 + CBC (PULP_CBC_CMD)
```
  Decision variables: binary x[e,s] for eligible (employee, shift) pairs.
  Hard constraints H1–H6 (availability, one shift/day, max weekly hours,
  minimum staffing, skills/role, active status); H1/H5/H6 enforced
  structurally (no variable exists for ineligible pairs).
  Soft objective: minimize 1.0·labor_cost + 10.0·overtime (0 while H3 caps
  hours) + 0.0·preferences (no P02 preference data) + 0.5·peak_load
  fairness proxy + 1e-4 deterministic tie-breaker.
  Post-solve validation independently re-checks every hard constraint.
- **Data/Storage**: In-memory (dict-based). Avoid complex databases/cloud infrastructure until required.
- **Communication**: Frontend calls REST API over HTTP.

We are intentionally keeping the architecture small and avoid microservices, Kafka, Redis, or heavy cloud infrastructure.
