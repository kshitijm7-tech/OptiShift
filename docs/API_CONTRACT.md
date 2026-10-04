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
  An `optimal` result is additionally stored as the current schedule
  (infeasible/error outcomes never overwrite it).
- `GET /api/v1/schedule` — read the authoritative current schedule.
  Response (HTTP 200): `{ has_schedule, schedule }`. When nothing was built
  yet: `{ "has_schedule": false, "schedule": null }` (not an error).
  Otherwise `schedule` carries `{ id, generated_at, status, assignments[],
  shifts[], employees[], requirements[], metrics, objective_breakdown,
  explanation[], solver }` verbatim from the stored optimization result.
- `POST /api/v1/schedules/build` (P08) — build from a Custom Mode
  configuration: `{ business{name, location}, employees[], shifts[],
  requirements[], rules{labor_cost_weight, work_balance_weight} }`.
  Rules are translated server-side into engine weights; the request then
  runs the SAME shared optimizer + result contract + current-schedule
  store as `POST /api/v1/optimize`. `optimal` → HTTP 200; `infeasible` →
  HTTP 200 with reasons; invalid config → HTTP 400/422 with a message.

**Planned (Do NOT pretend these exist yet):**
- `POST /api/v1/leave`
- `POST /api/v1/leave/{id}/approve`
- `POST /api/v1/leave/{id}/reject`
- `POST /api/v1/reoptimize`
