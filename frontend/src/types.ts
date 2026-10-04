// OptiShift frontend domain types (P04).
// Mirrors backend/app/models/domain.py + optimizer/model.py manually.
// No code generation infrastructure (P04 scope).

export interface Availability {
  day_of_week: number; // 0=Monday .. 6=Sunday
  start_time: string; // "HH:MM:SS"
  end_time: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  skills: string[];
  hourly_pay: number;
  max_weekly_hours: number;
  availability: Availability[];
  status: string;
}

export interface EmployeeCreate {
  name: string;
  role: string;
  skills: string[];
  hourly_pay: number;
  max_weekly_hours: number;
  availability: Availability[];
  status: string;
}

export interface Shift {
  id: string;
  name: string;
  shift_date: string; // "YYYY-MM-DD"
  start_time: string;
  end_time: string;
  required_role?: string | null;
}

export interface StaffingRequirement {
  id: string;
  shift_id: string;
  min_employees: number;
  required_skills: string[];
}

export interface ObjectiveWeights {
  labor_cost: number;
  extra_hours: number;
  preference: number;
  balance: number;
}

export interface OptimizeRequest {
  employees: Employee[];
  shifts: Shift[];
  requirements: StaffingRequirement[];
  weights?: ObjectiveWeights;
}

export interface Assignment {
  employee_id: string;
  shift_id: string;
  assigned_date: string;
}

export interface OptimizationMetrics {
  total_labor_cost: number;
  total_hours: number;
  extra_hours_total: number;
  max_hours_per_employee: number;
  min_hours_per_employee: number;
  employee_hours: Record<string, number>;
  shifts_staffed: number;
  shifts_total: number;
}

export interface ObjectiveBreakdown {
  labor_cost: number;
  labor_cost_weighted: number;
  extra_hours: number;
  extra_hours_weighted: number;
  preference_penalty: number;
  preference_weighted: number;
  balance_term: number;
  balance_weighted: number;
  total_objective: number;
}

export type OptimizationStatus = 'optimal' | 'infeasible' | 'error';

export interface OptimizationResult {
  status: OptimizationStatus;
  assignments: Assignment[];
  metrics: OptimizationMetrics | null;
  violations: string[];
  objective_breakdown: ObjectiveBreakdown | null;
  solver: { solver: string; status: string; solve_seconds?: number | null };
  explanation: string[];
}

export class ApiError extends Error {
  status: number;
  detail: string;
  constructor(status: number, detail: string) {
    super(detail);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}
