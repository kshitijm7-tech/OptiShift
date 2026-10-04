# OptiShift - Agent Instructions

Every coding agent working on OptiShift MUST follow these rules:

1. Read `AGENTS.md` first.
2. Read `CURRENT_STATE.md`.
3. Read `ROADMAP.md`.
4. Read relevant documentation under `docs/`.
5. Inspect the existing implementation before changing it.
6. Work only within the requested phase.
7. Never implement future phases without explicit instruction.
8. Never hardcode optimization results.
9. Never create fake schedules.
10. Never duplicate backend business logic in the frontend.
11. Keep API routes thin.
12. Keep business logic in services.
13. Keep optimization logic in optimizer modules.
14. Run tests after meaningful changes.
15. Review git diff before completion.
16. Never claim a test or Sentinel verification passed unless it was actually run.
17. Preserve existing Stitch UI assets in the `ui/` folder.
18. Avoid unnecessary dependencies and infrastructure.

## Roadmap

P01 — Project Foundation + Development Contract
P02 — Core Data Models + Backend Foundation
P03 — Optimization Engine
P04 — Frontend Foundation + Core UI
P05 — Schedule + Dashboard Integration
P06 — Demo Mode + Baseline Comparison
P07 — Leave + Approval + Re-optimization
P08 — Custom Mode + Dynamic Scheduling
P09 — Testing + Sentinel Verification + Hardening
P10 — Final Integration + UX Polish + Algothon Demo Gate
