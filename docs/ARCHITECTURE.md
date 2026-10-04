# Architecture

This document reflects the actual P05 architecture.

- **Frontend**: React 19 + TypeScript + Vite + Tailwind (`frontend/src/`).
  Stitch-faithful shell: `AppShell` sidebar nav, routes `/`, `/schedule`,
  `/team`, `/time-off`, `/rules`, `/settings`. Single API client (`api.ts`
  via `VITE_API_URL`); pages: Overview (Active-Team KPI + schedule-derived
  coverage/cost/extra-hours/balance, honest P06 placeholder for savings),
  Schedule (editable shift windows × week + authoritative current schedule
  with generated timestamp), Team (real employee CRUD), TimeOff (P07 shell),
  Rules (static H1–H6 truth), Settings (static + live backend-status card).
  Both Overview and Schedule read the ONE backend current schedule through
  `useCurrentSchedule`; no frontend-owned schedule state, no optimizer logic
  in the frontend (grep-verified); no store libraries (React state + fetch
  only).
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
- **Current schedule (P05)**: `ScheduleService`
  (`backend/app/services/schedule_service.py`) owns the ONE authoritative
  schedule in-memory for the running backend process (consistent with the
  in-memory employee DB; cleared on backend restart, survives all frontend
  refreshes). `OptimizationService.optimize` stores optimal results;
  `GET /api/v1/schedule` (`backend/app/api/schedule.py`, thin) serves them.
  Infeasible/error outcomes never overwrite a valid stored schedule.
- **Custom scheduling (P08)**: `CustomScheduleConfig`
  (`backend/app/models/scheduling.py`) + `SchedulingService`
  (`backend/app/services/scheduling_service.py`) translate customer rules
  into an `OptimizeRequest` and delegate to the SAME `OptimizationService`
  engine (one path, different configuration source). Served by thin
  `POST /api/v1/schedules/build` (`backend/app/api/schedules.py`); the
  `/custom` wizard (`frontend/src/pages/CustomMode.tsx`) collects config
  only and renders results via the existing `/schedule` experience.
- **Data/Storage**: In-memory (dict-based). Avoid complex databases/cloud infrastructure until required.
- **Communication**: Frontend calls REST API over HTTP.

We are intentionally keeping the architecture small and avoid microservices, Kafka, Redis, or heavy cloud infrastructure.
