# Soft-objective builders and metric calculation for P03.
#
# Objective (minimize):
#   W_COST    * total labor cost
# + W_EXTRA   * total overtime hours   (0 while H3 hard-caps hours)
# + W_PREF    * preference penalty     (0: P02 model has no preferences)
# + W_BALANCE * peak employee load     (linear fairness proxy)
# + epsilon   * deterministic tie-breaker over sorted employee order
#
# The workload-balance term uses a single auxiliary variable `peak_load`
# constrained to be >= every employee's assigned hours. Minimizing it pushes
# hours to spread evenly. All components are exposed separately in the
# result so a manager can see WHY the schedule costs what it costs.

from typing import Dict, List, Tuple

import pulp

from app.models.domain import Employee, Shift
from app.optimizer.model import (
    TIEBREAK_EPSILON,
    ObjectiveWeights,
    OptimizationMetrics,
    ObjectiveBreakdown,
)


def add_peak_load_variable(
    prob: pulp.LpProblem,
    variables: Dict[Tuple[str, str], pulp.LpVariable],
    employees: List[Employee],
    shifts: List[Shift],
    eligible: Dict[Tuple[str, str], bool],
    durations: Dict[str, float],
) -> pulp.LpVariable:
    """Auxiliary variable >= each employee's assigned hours (fairness proxy)."""
    peak = pulp.LpVariable("peak_employee_hours", lowBound=0)
    for employee in employees:
        terms = [
            durations[s.id] * variables[(employee.id, s.id)]
            for s in shifts
            if eligible.get((employee.id, s.id), False)
        ]
        if terms:
            prob += (peak >= pulp.lpSum(terms), f"fairness_peak_{employee.id}")
    return peak


def build_objective(
    prob: pulp.LpProblem,
    variables: Dict[Tuple[str, str], pulp.LpVariable],
    employees: List[Employee],
    shifts: List[Shift],
    eligible: Dict[Tuple[str, str], bool],
    durations: Dict[str, float],
    weights: ObjectiveWeights,
    peak: pulp.LpVariable,
) -> pulp.LpAffineExpression:
    """Attach the weighted soft-objective to the problem and return it."""
    employees_sorted = sorted(employees, key=lambda e: e.id)
    cost_terms = []
    for order, employee in enumerate(employees_sorted):
        for shift in shifts:
            if not eligible.get((employee.id, shift.id), False):
                continue
            unit_cost = employee.hourly_pay * durations[shift.id]
            # Tiny index-based cost breaks ties deterministically in favour
            # of the lowest sorted employee id when all else is equal.
            cost_terms.append(
                (unit_cost + TIEBREAK_EPSILON * order)
                * variables[(employee.id, shift.id)]
            )
    labor_cost = pulp.lpSum(cost_terms) if cost_terms else 0
    objective = (
        weights.labor_cost * labor_cost + weights.balance * peak
        # W_EXTRA and W_PREFERENCE contribute 0 in P03 (hard-capped hours,
        # no preference data) but the weights stay in the contract for P07+.
    )
    prob += objective, "P03_weighted_objective"
    return objective


def calculate_metrics(
    employee_hours: Dict[str, float],
    employees: List[Employee],
    shifts: List[Shift],
    durations: Dict[str, float],
    assignment_pairs: List[Tuple[str, str]],
    weights: ObjectiveWeights,
) -> Tuple[OptimizationMetrics, ObjectiveBreakdown]:
    """Pure-python metrics + objective breakdown from solved assignments."""
    pay_by_employee = {e.id: e.hourly_pay for e in employees}
    total_hours = round(sum(employee_hours.values()), 4)
    total_cost = round(
        sum(
            pay_by_employee.get(e_id, 0.0) * durations.get(s_id, 0.0)
            for e_id, s_id in assignment_pairs
        ),
        2,
    )
    # H3 hard-caps hours, so overtime is normally zero; still reported.
    limits = {e.id: e.max_weekly_hours for e in employees}
    extra = round(
        sum(max(0.0, employee_hours.get(e_id, 0.0) - limits.get(e_id, 0.0)) for e_id in employee_hours),
        4,
    )
    hours_list = list(employee_hours.values())
    peak = round(max(hours_list), 4) if hours_list else 0.0
    floor = round(min(hours_list), 4) if hours_list else 0.0

    staffed_shifts = len({s_id for _, s_id in assignment_pairs})
    metrics = OptimizationMetrics(
        total_labor_cost=total_cost,
        total_hours=total_hours,
        extra_hours_total=extra,
        max_hours_per_employee=peak,
        min_hours_per_employee=floor,
        employee_hours={k: round(v, 4) for k, v in sorted(employee_hours.items())},
        shifts_staffed=staffed_shifts,
        shifts_total=len(shifts),
    )
    breakdown = ObjectiveBreakdown(
        labor_cost=total_cost,
        labor_cost_weighted=round(weights.labor_cost * total_cost, 4),
        extra_hours=extra,
        extra_hours_weighted=round(weights.extra_hours * extra, 4),
        preference_penalty=0.0,
        preference_weighted=0.0,
        balance_term=peak,
        balance_weighted=round(weights.balance * peak, 4),
        total_objective=round(weights.labor_cost * total_cost + weights.balance * peak, 4),
    )
    return metrics, breakdown
