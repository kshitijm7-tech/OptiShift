# OptiShift Development Contract

## Product Principle

OptiShift converts:
```text
People
+
Availability
+
Skills
+
Business needs
+
Rules
```
into:
```text
A feasible and cost-efficient schedule
```

## Engineering Principle

```text
Working
→ Correct
→ Testable
→ Maintainable
→ Presentable
```

## Architecture

Target:
```text
React
 ↓
REST API
 ↓
FastAPI
 ↓
Services
 ↓
Optimization
 ↓
PuLP/CBC
```

## Boundaries

**Frontend:**
* presentation
* interaction
* API consumption

**Backend:**
* business logic
* validation
* scheduling
* metrics

**Optimizer:**
* mathematical optimization

Frontend must NOT contain optimizer/business logic.
