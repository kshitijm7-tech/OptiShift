# Current State

Current phase: P03
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

Current work:
- None (awaiting instruction for P04)

Next phase:
- P04 — Frontend Foundation + Core UI

Objective weights (P03, defined in backend/app/optimizer/model.py):
- labor cost 1.0, extra hours 10.0 (normally 0: H3 hard-caps hours),
  preferences 0.0 (P02 model has no preference data), balance 0.5.
- PuLP pinned to 2.8.0 (bundles CBC; PuLP 4.x ships no solver binary).

Known issues:
- Sentinel V1 blueprint verifier returns NOT_APPLICABLE for LAYER_BOUNDARY/DEPENDENCY_RULE/BLUEPRINT_FRESH due to sentinel.yaml schema mismatch. CIRCULAR_DEPENDENCY check PASSED.
- Sentinel V1 API_EXISTENCE verifier returns internal ERROR for /health and optimize routes (not a project failure; endpoints proven by passing API tests).

Last verification:
- Backend: 28 tests passed (pytest, PYTHONPATH=".")
- Frontend: untouched (P04 scope)
- Sentinel: scan SUCCESS, analyze SUCCESS, CIRCULAR_DEPENDENCY PASS, optimizer symbols PASS
- Real solver run (UrbanBrew 3-day fixture): Optimal, 9 assignments, $576.00 labor cost, 12h each for priya/ananya/arjun, 0.035s CBC solve
