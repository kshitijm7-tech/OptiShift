"""Probe for Fix 6 — run as `python app/tmp_fix6_probe.py` from backend/."""
from data.store import store as shared_store
from services.schedule_service import ScheduleService
from services.impact_service import ImpactService
from optimizer.milp_engine import MILPOptimizer
from data.demo_data import EMPLOYEES, SHIFTS, TASKS, LEAVES, WEEK_START

# Fresh singleton each run
shared_store._employees = {e.id: e for e in EMPLOYEES}
shared_store._shifts = {s.id: s for s in SHIFTS}
shared_store._tasks = {t.id: t for t in TASKS}
shared_store._leaves = {l.id: l for l in LEAVES}
shared_store._schedule = None
shared_store._week_start = WEEK_START

ss = ScheduleService(shared_store)
imp = ImpactService(shared_store)

print("=== STEP 1: optimize (pre-approval) ===")
res = ss.optimize({"week_start": WEEK_START, "include_baseline": True})
print("status:", res.status)
m = res.optimized_metrics
if m:
    print("metrics:", {k: v for k, v in m.__dict__.items() if not k.startswith('_')})
print()

print("=== STEP 2: approve leave_001 ===")
from models.leave import LeaveStatus
shared_store.update_leave_status("leave_001", LeaveStatus.approved)
print("leave status:", shared_store.get_leave("leave_001").status)

print("=== STEP 3: reoptimize ===")
r = ss.reoptimize("leave_001")
print("status:", r["status"])
print("diff:", r["diff"])
print("affected_tasks:", r["diff"]["affected_tasks"])
print("removed:", len(r["diff"]["removed_assignments"]))
print("added:", len(r["diff"]["added_assignments"]))
print()

print("=== STEP 4: impact ===")
impact = imp.analyze(shared_store.get_leave("leave_001"))
print("overall_risk:", impact.overall_risk)
print("affected_tasks:", [t.task_id for t in impact.affected_tasks])
print("is_infeasible:", impact.is_infeasible)
print()

print("=== STEP 5: infeasibility diagnosis probe (synthetic hard case) ===")
from models.employee import Employee, Availability
from models.shift import Shift
from models.leave import Leave

emp = Employee(id="e1", name="One", role="x", hourly_rate=10.0, max_hours_per_week=40.0,
               availability=[Availability(day="Monday", available=True)])
emp2 = Employee(id="e2", name="Two", role="x", hourly_rate=10.0, max_hours_per_week=40.0,
                availability=[Availability(day="Monday", available=True)])
sh = Shift(id="s1", name="Solo", start_time="08:00", end_time="10:00", hours=2.0,
           required_staff=2, required_skills=["barista"])
leav = [Leave(id="l1", employee_id="e1", start_date="2024-12-09", end_date="2024-12-09",
              type=None, reason="x", status=LeaveStatus.pending)]
opt = MILPOptimizer(employees=[emp, emp2], shifts=[sh], leaves=leav, week_start="2024-12-09",
                    weights=None)
sch = opt.solve()
print("status:", sch.status)
print("reason:", sch.infeasibility_reason[:250])
