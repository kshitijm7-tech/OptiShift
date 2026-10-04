# OptiShift

**From workforce constraints to optimal schedules.**

OptiShift is a workforce optimization engine that turns team availability, skills, staffing needs, and business rules into feasible, cost-efficient schedules using real mathematical optimization (PuLP + CBC) — not heuristics, not generated guesses.

## What's in this repo

| Path | What it is |
|---|---|
| `backend/` | FastAPI API: optimization engine, schedules, demo/baseline comparison, custom scheduling, leave + re-optimization |
| `frontend/` | React 19 + Vite + Tailwind UI wired to the backend's live solver API |
| `ui/` | Original Stitch screen designs (visual source of truth) |
| `docs/` | Architecture, API contract, product and verification docs |

## Run it

**Backend** (default `http://127.0.0.1:8000`)
```bash
cd backend
uv venv
uv pip install -r requirements.txt
$env:PYTHONPATH="." ; uv run uvicorn app.main:app --reload
```

**Frontend** (default `http://127.0.0.1:3000`)
```bash
cd frontend
npm install
npm run dev
```

The frontend talks to the backend via `VITE_API_URL` (see `frontend/.env.example`).

## Tests

```bash
cd backend
$env:PYTHONPATH="." ; uv run pytest
```

```bash
cd frontend
npm test        # vitest
npm run build   # tsc + vite build
npm run lint    # tsc --noEmit
```

## Docs & process

- `docs/ARCHITECTURE.md` — system design and data flow
- `docs/API_CONTRACT.md` — REST endpoints and payloads
- `docs/PRODUCT.md` — product overview and demo story
- `RUNBOOK.md` — day-to-day commands (dev servers, tests, verification)
- `AGENTS.md` — instructions for coding agents working in this repo
