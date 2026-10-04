# OptiShift Developer Runbook

## Frontend

### Install dependencies
```bash
cd frontend
npm install
```

### Start development server
```bash
cd frontend
npm run dev
```
(Vite default `http://127.0.0.1:5173/`; backend URL comes from
`frontend/.env` → `VITE_API_URL`.)

### Run frontend tests
```bash
cd frontend
npm test
```

### Typecheck + production build
```bash
cd frontend
npm run build
```

### Stitch screens (original UI, live data)
The Stitch deliverables from `ui/*/code.html` are served verbatim at:

- `http://127.0.0.1:5173/stitch/overview.html` — Overview
- `http://127.0.0.1:5173/stitch/schedule.html` — Schedule workspace
- `http://127.0.0.1:5173/stitch/team.html` — My Team
- `http://127.0.0.1:5173/stitch/timeoff.html` — Time Off
- `http://127.0.0.1:5173/stitch/rules.html` — Rules
- `http://127.0.0.1:5173/stitch/settings.html` — Settings
- `http://127.0.0.1:5173/stitch/custom.html` — Custom Mode
- `http://127.0.0.1:5173/stitch/comparison.html` — Value comparison

Files live in `frontend/public/stitch/` (byte-identical copies plus a
one-line `<script src="./connect.js">` tag). `connect.js` is the only
hand-written UI code: it fills the screens' existing DOM ids from the real
backend and binds primary actions (build/approve/add). API base defaults to
`http://127.0.0.1:8002`; override with `?api=…` or
`localStorage.optishift_api`. Also linked from the app sidebar
("Stitch Screens").

### Backend branch (pulled, NOT merged)
```bash
git fetch origin
git worktree add D:\MProjects\OptiShift-backend origin/backend
cd D:\MProjects\OptiShift-backend
uv venv
uv pip install -r backend/requirements.txt
uv run uvicorn app.main:app --port 8002 --app-dir backend
```
The `backend` branch has unrelated history — never merge it into `master`.
It serves the Stitch screens above on port 8002 with seeded demo data
(verify: `GET /api/v1/employees/`, `POST /api/v1/optimize`
with `{"week_start": "2024-12-09", "include_baseline": true}`).

### Build
```bash
cd frontend
npm run build
```

## Backend

### Install environment/dependencies
```bash
cd backend
uv venv
uv pip install -r requirements.txt
```

### Start FastAPI
```bash
cd backend
$env:PYTHONPATH="." ; uv run uvicorn app.main:app --reload
```

### Health check
```bash
curl http://127.0.0.1:8000/health
```

### Run tests
```bash
cd backend
$env:PYTHONPATH="." ; uv run pytest
```

### Optimization API (P03)
```bash
# Start backend first (see above), then:
curl -X POST http://127.0.0.1:8000/api/v1/optimize ^
  -H "Content-Type: application/json" ^
  -d "@docs/examples/optimize-request.json"
# PowerShell alternative:
# Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/api/v1/optimize `
#   -ContentType "application/json" -InFile docs/examples/optimize-request.json
```

### Current schedule API (P05)
```bash
# An optimal POST /api/v1/optimize is stored as the current schedule.
# Read it back (200 + {"has_schedule":false,"schedule":null} when empty):
curl http://127.0.0.1:8000/api/v1/schedule
```

## Sentinel

Sentinel is installed at `D:\MProjects\Sentinel_v1.0`.
OptiShift is the target project at `D:\MProjects\OptiShift`.

All Sentinel commands must be run from the Sentinel directory, targeting the OptiShift path.

### Scan
```bash
cd D:\MProjects\Sentinel_v1.0
uv run sentinel scan d:\MProjects\OptiShift
```

### Analyze
```bash
uv run sentinel analyze d:\MProjects\OptiShift
```

### Watch
```bash
uv run sentinel watch d:\MProjects\OptiShift
```
*(Stop with Ctrl+C)*

### Inspect Events
```bash
uv run sentinel events d:\MProjects\OptiShift --limit 20
```

### Verify Architecture Checks
```bash
uv run sentinel verify -c CIRCULAR_DEPENDENCY -s OptiShift -p "compliant" d:\MProjects\OptiShift --decide
uv run sentinel verify -c LAYER_BOUNDARY -s OptiShift -p "compliant" d:\MProjects\OptiShift --decide
uv run sentinel verify -c DEPENDENCY_RULE -s OptiShift -p "compliant" d:\MProjects\OptiShift --decide
uv run sentinel verify -c BLUEPRINT_FRESH -s architecture -p valid d:\MProjects\OptiShift --decide
```

### Evidence
```bash
uv run sentinel evidence --project d:\MProjects\OptiShift --limit 20
```

### Project Info
```bash
uv run sentinel project-info d:\MProjects\OptiShift
```
