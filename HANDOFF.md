# OptiShift - Developer Handoff

## What is OptiShift?
OptiShift is a workforce optimization engine that creates a feasible and cost-efficient schedule from people, availability, skills, business needs, and rules. It uses true mathematical optimization (PuLP/CBC) instead of heuristic approximations or LLMs.

## Current Phase
**P01 — Project Foundation + Development Contract** (Completed)
Next step is P02.

## Architecture
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router.
- **Backend**: FastAPI, Pydantic, PuLP, CBC.
- **Communication**: REST API.

## Important Files
- `ui/`: Contains existing Stitch UI/UX work that MUST NOT be deleted or redesigned.
- `docs/`: Product, Architecture, UI/UX Spec, API Contract, and Sentinel Evidence.
- `AGENTS.md`: Crucial instructions for agent workflows.
- `sentinel.yaml`: Blueprint for architecture dependency checking.

## How to Start the Project
Check the `RUNBOOK.md` for specific commands to start the backend, frontend, and tests.

## Sentinel Commands
See `RUNBOOK.md` for Sentinel workflow.

## Current Known Issues
- None

## Next Step
Begin **P02 — Core Data Models + Backend Foundation**. Ensure you read `AGENTS.md` and `CURRENT_STATE.md` before starting!
