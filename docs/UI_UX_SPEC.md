# UI/UX Specification

**The Stitch UI in `ui/` is the visual source of truth.**

Do not redesign it during P01.

## Main Navigation
- Overview
- Schedule
- My Team
- Time Off
- Rules
- Settings

## Key Views
- **Overview**: High-level status of the schedule and metrics.
- **Schedule**: The core view (and Workspace) showing employee shift assignments.
- **My Team**: Roster, skills, and base availability.
- **Time Off**: Leave management.
- **Rules**: Business rules configuration (e.g., max hours, minimum rest).
- **Settings**: Application preferences.
- **Custom Mode**: Advanced scenario generation.
- **Optimization Result**: Value comparison after PuLP execution.
- **Demo Mode**: Story-driven presentation.

## States
- **Loading states**: Required when running the optimizer.
- **Empty states**: Required for empty team or uninitialized schedule.
- **Error states**: Required for infeasible optimization results or API errors.
