# Current State

Current phase: P05
Status: Complete

Completed:
- Product blueprint
- Stitch UI/UX
- P01 — Project foundation, dev contract, docs, health endpoint, frontend shell
- P02 — Core data models, employee API, service layer, backend tests, Sentinel verification
- P03 — Optimization engine: PuLP/CBC binary-assignment model, hard constraints
  H1–H6, weighted soft objectives (cost/extras/prefs/balance), post-solve
  validator, POST /api/v1/optimize, 18 new tests (28 total passing), Sentinel
  verification
- P04 — Frontend foundation + core UI: Stitch-faithful theme/shell/routing,
  6 pages, single API client, real team + optimization integration, honest
  loading/empty/error states, 18 frontend tests, Sentinel verification
- P05 — Schedule + dashboard integration: backend-owned current schedule
  (`ScheduleService`, stored on optimal, `GET /api/v1/schedule`), Schedule
  page renders the authoritative copy with generated timestamp, Overview
  shows schedule-derived coverage/cost/extra-hours/balance + health +
  activity, Money Saved honestly still "—" (P06). 35 backend + 31 frontend
  tests passing, Sentinel verification

Current work:
- None (awaiting instruction for P06)

Next phase:
- P06 — Demo Mode + Baseline Comparison

Current schedule (P05):
- Backend: `ScheduleService` in-memory store (same lifecycle as employee DB:
  survives frontend refresh, cleared on backend restart). Only optimal
  results stored; infeasible/error never overwrite.
- API: `POST /api/v1/optimize` (stores on optimal) + `GET /api/v1/schedule`
  (`{has_schedule, schedule}`; 200 with null schedule when empty).
- Frontend: `useCurrentSchedule` hook feeds both Overview and Schedule;
  no frontend-owned schedule state. Overview KPIs render backend metrics
  verbatim; Money Saved stays "—" (needs P06 baseline).
- Tests: backend 35 passed (7 new schedule tests); frontend 31 passed
  (13 new: helpers + Overview/Schedule pages); tsc + vite build green.

Objective weights (P03, defined in backend/app/optimizer/model.py):
- labor cost 1.0, extra hours 10.0 (normally 0: H3 hard-caps hours),
  preferences 0.0 (P02 model has no preference data), balance 0.5.
- PuLP pinned to 2.8.0 (bundles CBC; PuLP 4.x ships no solver binary).

Known issues:
- Sentinel V1 blueprint verifier returns NOT_APPLICABLE for LAYER_BOUNDARY/DEPENDENCY_RULE/BLUEPRINT_FRESH due to sentinel.yaml schema mismatch. CIRCULAR_DEPENDENCY check PASSED.
- Sentinel V1 API_EXISTENCE verifier returns internal ERROR for route checks (not a project failure; endpoints proven by passing tests + live API calls).
- Sentinel V1 analyze returns PARTIAL with 3 TSX parser warnings on new P04 pages (they compile under tsc/vite/vitest — parser limitation, not a defect).
- Port 8000 in this environment is occupied by an unrelated Sentinel service; P04 live backend checks used port 8001.

Last verification:
- Backend: 35 tests passed (pytest, PYTHONPATH=".")
- Frontend: 31 tests passed (vitest); tsc + vite build green; oxlint 0 errors
- Live integration (backend :8001): empty → `{"has_schedule":false,...}`;
  seeded 2 employees → optimal $128.00 stored (id + generated_at);
  repeat GET identical; infeasible run preserved previous schedule;
  backend restart cleared store (documented in-memory lifecycle);
  vite dev :5173 serves shell + /schedule SPA route
- Sentinel: scan SUCCESS, analyze PARTIAL (5 TSX parser warnings; code
  compiles), CIRCULAR_DEPENDENCY PASS, P05 schedule symbols PASS
