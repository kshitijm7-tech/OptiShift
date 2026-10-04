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

### Build
```bash
cd frontend
npm run build
```

### Test/Type-check
```bash
cd frontend
npm run tsc
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
uv run uvicorn app.main:app --reload
```

### Health check
```bash
curl http://127.0.0.1:8000/health
```

### Run tests
```bash
cd backend
uv run pytest
```

## Sentinel

Sentinel is our development-time guardian for architecture blueprint enforcement.

### Scan
```bash
uv run sentinel scan .
```

### Analyze
```bash
uv run sentinel analyze .
```

### Watch
Start the watchdog (use only as appropriate; do not leave unnecessary background processes running):
```bash
uv run sentinel watch .
```
*(To stop the watchdog, use `Ctrl+C` or kill the process in your terminal).*

### Inspect Events
```bash
uv run sentinel events . --limit 20
```

### Verify Architecture Checks
```bash
uv run sentinel verify LAYER_BOUNDARY DEPENDENCY_RULE CIRCULAR_DEPENDENCY BLUEPRINT_FRESH
```
*(If `--decide` is appropriate for the installed Sentinel version, append it).*

### Findings
If findings exist:
```bash
uv run sentinel findings
```

### Explain Result
```bash
uv run sentinel explain <verification_result_id>
```
