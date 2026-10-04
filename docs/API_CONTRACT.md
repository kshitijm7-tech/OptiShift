# API Contract

This documents the intended API direction.

**Currently Implemented:**
- `GET /health`
- `GET /api/v1/employees`
- `POST /api/v1/employees`
- `GET /api/v1/employees/{employee_id}`
- `POST /api/v1/optimize` — solve a scheduling problem with PuLP/CBC.
  Request: `{ employees[], shifts[], requirements[], weights? }`
  (weights default: labor_cost 1.0, extra_hours 10.0, preference 0.0,
  balance 0.5). Response: `{ status, assignments[], metrics,
  violations[], objective_breakdown, solver, explanation[] }`.
  `status` is `optimal` (HTTP 200), `infeasible` (HTTP 200 with reasons in
  `violations`), or invalid input (HTTP 400). See `HANDOFF.md` and
  `docs/examples/optimize-request.json`.

**Planned (Do NOT pretend these exist yet):**
- `GET  /api/v1/schedule`
- `POST /api/v1/leave`
- `POST /api/v1/leave/{id}/approve`
- `POST /api/v1/leave/{id}/reject`
- `POST /api/v1/reoptimize`
