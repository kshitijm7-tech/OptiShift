# Product Overview

**OptiShift: From workforce constraints to optimal schedules.**

## Target Users
Managers and schedulers who need to balance business needs, employee availability, and skills efficiently.

## Problem
Creating manual schedules is error-prone, time-consuming, and often suboptimal. Existing tools rely on heuristics or manual dragging/dropping.

## Core Workflow
1. Define team and skills.
2. Define business needs and constraints.
3. Run the optimization engine.
4. Review, adjust, and approve the schedule.

## Customer Terminology
- **Employee/Team Member**: The people being scheduled.
- **Shift**: A block of time with required skills.
- **Availability/Time Off**: Constraints on when an employee can work.
- **Rules**: Business logic constraints (e.g., max hours, required rest).
- **Optimization**: The process of assigning shifts based on true mathematical programming.

## Core Product Differentiator
We use true mathematical optimization (PuLP/CBC) to find optimal (or near-optimal) schedules rather than basic matching or LLM-based hallucinated schedules.

## Demo Story
We show a baseline broken/costly schedule and then hit "Optimize" to reveal a mathematically sound, cost-efficient, rule-compliant schedule in seconds.
