# Architecture

This document reflects the actual P04 architecture.

- **Frontend**: React 19 + TypeScript + Vite + Tailwind (`frontend/src/`).
  Stitch-faithful shell: `AppShell` sidebar nav, routes `/`, `/schedule`,
  `/team`, `/time-off`, `/rules`, `/settings`. Single API client (`api.ts`
  via `VITE_API_URL`); pages: Overview (real Active-Team KPI, honest
  placeholders for schedule-dependent metrics), Schedule (editable shift
  windows × week + real `POST /api/v1/optimize` results), Team (real
  employee CRUD), TimeOff (P07 shell), Rules (static H1–H6 truth), Settings
  (static + live backend-status card). No optimizer logic in the frontend
  (grep-verified); no store libraries (React state + fetch only).
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
