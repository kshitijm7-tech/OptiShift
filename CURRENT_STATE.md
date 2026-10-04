# Current State

Current phase: P04
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

Current work:
- None (awaiting instruction for P05)

Next phase:
- P05 — Schedule + Dashboard Integration

Frontend (P04, in frontend/src/):
- Routes: `/` (Overview), `/schedule`, `/team`, `/time-off`, `/rules`,
  `/settings` (+ legacy redirects `/overview`→`/`, `/my-team`→`/team`)
- API client: `api.ts` (health/employees/optimize via VITE_API_URL) + `types.ts`
- Schedule page builds real OptimizeRequest payloads (editable shift windows ×
  week days + API team) and renders real backend results; no fake metrics —
  unavailable KPIs show honest placeholders (P05/P06).
- Tests: `npm test` → 18 passing (vitest); `npm run build` (tsc + vite) green.

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
- Backend: 28 tests passed (pytest, PYTHONPATH=".")
- Frontend: 18 tests passed (vitest); tsc + vite build green; oxlint 0 errors
- Live integration: backend :8001 seeded 2 employees, GET team = 2,
  POST /api/v1/optimize → optimal $128.00 (PULP_CBC_CMD/Optimal),
  infeasible variant explained correctly; vite dev :5173 serves the app shell
- Sentinel: scan SUCCESS, analyze PARTIAL (parser warnings), CIRCULAR_DEPENDENCY PASS, P04 symbols PASS
