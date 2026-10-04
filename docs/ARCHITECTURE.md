# Architecture

This document reflects the actual P01 architecture.

- **Frontend**: A minimal React + TypeScript + Vite + Tailwind application shell (`frontend/`). No complex state management is introduced yet.
- **Backend**: A minimal FastAPI application (`backend/app/main.py`) serving a `/health` endpoint.
- **Data/Storage**: None currently. Avoid complex databases/cloud infrastructure until required.
- **Communication**: Frontend calls REST API over HTTP.

We are intentionally keeping the architecture small and avoid microservices, Kafka, Redis, or heavy cloud infrastructure.
