# OptiShift - Developer Handoff

## What is OptiShift?
OptiShift is a workforce optimization engine that creates feasible and cost-efficient schedules from people, availability, skills, business needs, and rules. It uses true mathematical optimization (PuLP/CBC).

## Current Phase
**P05 — Schedule + Dashboard Integration** (Completed)
Next step is P06 — Demo Mode + Baseline Comparison.

## Architecture
- **Frontend**: React 19 + TypeScript + Vite + Tailwind (`frontend/src/`):
  - `App.tsx` — routes `/`, `/schedule`, `/team`, `/time-off`, `/rules`,
    `/settings` (+ `/overview`→`/`, `/my-team`→`/team` redirects)
  - `components/AppShell.tsx` — 240px Stitch sidebar + header + content
  - `components/ui.tsx` — Card, PageHeader, buttons, StatusBadge, MetricCard,
    Loading/Empty/Error/Notice states
  - `api.ts` — single API client (VITE_API_URL): health, employees,
    `optimizeSchedule`, `getCurrentSchedule`; `types.ts` mirrors backend
    domain + optimization + schedule contracts; `hooks.ts` (`useEmployees`,
    `useCurrentSchedule`, `formatAvailability`); `schedule.ts` (pure week/
    shift builders + `timeAgo`, `scheduleDates`, `weekdayLabel`, `prettyDate`)
  - `pages/`: Overview (schedule-aware KPIs/health/activity), Schedule
    (builder + authoritative current schedule), Team (real CRUD),
    TimeOff (P07 shell), Rules (static H1–H6 truth), Settings (static +
    live backend-status card)
  - Tests: vitest (`npm test`, 31 passing); `npm run build` = tsc + vite
- **Backend**: FastAPI with layered architecture:
  - `app/api/` — thin route handlers (`employees.py`, `optimize.py`,
    `schedule.py` → `GET /api/v1/schedule`)
  - `app/services/` — business logic (EmployeeService,
    OptimizationService (stores optimal results), ScheduleService
    (backend-owned in-memory current schedule))
  - `app/models/` — Pydantic domain models
  - `app/optimizer/` — P03 engine (unchanged in P05)
- **Communication**: REST API
- **Storage**: In-memory (dict-based), incl. the current schedule — survives
  frontend refresh, cleared on backend restart (documented lifecycle)

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
- Sentinel V1 API_EXISTENCE verifier returns an internal ERROR for route checks (endpoints proven by passing tests + live API calls instead).
- Sentinel V1 analyze returns PARTIAL with 3 TSX parser warnings on P04 pages (they compile under tsc/vite/vitest — parser limitation).
- PuLP is pinned to 2.8.0 because PuLP 4.x no longer bundles the CBC binary.
- Port 8000 in this environment is occupied by an unrelated Sentinel service; use another port (e.g. 8001) for local backend runs here.

## P03 Optimization API (for P04 consumers)

### Request — POST /api/v1/optimize
```json
{
  "employees": [ { "id": "priya", "name": "Priya", "role": "Barista",
                   "skills": ["barista"], "hourly_pay": 15.0,
                   "max_weekly_hours": 24.0,
                   "availability": [ { "day_of_week": 0,
                                       "start_time": "08:00:00",
                                       "end_time": "20:00:00" } ],
                   "status": "active" } ],
  "shifts": [ { "id": "morning-2026-10-05", "name": "Morning",
                "shift_date": "2026-10-05",
                "start_time": "08:00:00", "end_time": "12:00:00",
                "required_role": "Barista" } ],
  "requirements": [ { "id": "req-1", "shift_id": "morning-2026-10-05",
                      "min_employees": 1, "required_skills": ["barista"] } ],
  "weights": { "labor_cost": 1.0, "extra_hours": 10.0,
               "preference": 0.0, "balance": 0.5 }
}
```
Notes: empty `availability` = open availability; `required_role` null/empty =
no role filter; `weights` optional (defaults shown).

### Response (optimal)
```json
{
  "status": "optimal",
  "assignments": [ { "employee_id": "priya",
                     "shift_id": "morning-2026-10-05",
                     "assigned_date": "2026-10-05" } ],
  "metrics": { "total_labor_cost": 60.0, "total_hours": 4.0,
               "extra_hours_total": 0.0, "employee_hours": {"priya": 4.0},
               "shifts_staffed": 1, "shifts_total": 1 },
  "violations": [],
  "objective_breakdown": { "labor_cost": 60.0, "balance_term": 4.0,
                           "total_objective": 62.0 },
  "solver": { "solver": "PULP_CBC_CMD", "status": "Optimal" },
  "explanation": ["priya -> morning-2026-10-05 on 2026-10-05 ($15.00/h x 4.0h)"]
}
```
- `status: "infeasible"` (HTTP 200) with `violations` explaining why when no
  rule-compliant schedule exists.
- HTTP 400 when the request itself is invalid (e.g. no employees/shifts).

### Key entry points / services
- Optimizer entry: `solve_optimization(request)` in `backend/app/optimizer/solver.py`
- Service: `OptimizationService.optimize(request)` in `backend/app/services/optimization_service.py`
- Test command: `cd backend; $env:PYTHONPATH="."; uv run pytest` (35 tests)
- Known limitations: one shift per employee per day; max hours is a hard cap
  (overtime always 0); no preference data in P02 model (weight 0); no leave /
  re-optimization yet (P07); no custom/dynamic weights UI (P08).

## Next Step
Begin **P06 — Demo Mode + Baseline Comparison**: seeded UrbanBrew demo
dataset + baseline schedule + real Money Saved comparison. The current
schedule store (`ScheduleService`) and the Overview placeholders marked P06
are the integration points. Read `AGENTS.md` and `CURRENT_STATE.md` before
starting.

## P05 notes for P06 (schedule/dashboard map)
- Current schedule: `ScheduleService.get_current()/save_from_result()` in
  `backend/app/services/schedule_service.py`; served by
  `GET /api/v1/schedule` (`{has_schedule, schedule}` envelope).
- Frontend reads it via `useCurrentSchedule()` in Overview + Schedule —
  P06 demo seeding should produce/refresh the same store (or a demo
  equivalent) so both pages stay consistent.
- Money Saved stays "—" until a real baseline exists; do not invent one.
- Test commands: `cd backend; $env:PYTHONPATH="."; uv run pytest`
  (35 tests) · `cd frontend; npm test` (31 vitest) · `npm run build`.
- Known gaps: no baseline/savings (P06); no leave workflow (P07); no rule
  editing/custom mode (P08); in-memory store resets on backend restart.
