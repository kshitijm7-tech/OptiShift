// OptiShift frontend domain types (P04/P05).
// Mirrors backend/app/models/domain.py + optimizer/model.py +
// services/schedule_service.py manually.
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

// Authoritative current schedule (P05). Mirrors the backend
// CurrentSchedule / ScheduleResponse — rendered verbatim, never rebuilt.
export interface CurrentSchedule {
  id: string;
  generated_at: string; // ISO-8601 timestamp
  status: OptimizationStatus;
  assignments: Assignment[];
  shifts: Shift[];
  employees: Employee[];
  requirements: StaffingRequirement[];
  metrics: OptimizationMetrics;
  objective_breakdown: ObjectiveBreakdown | null;
  explanation: string[];
  solver: { solver: string; status: string; solve_seconds?: number | null };
}

export interface ScheduleResponse {
  has_schedule: boolean;
  schedule: CurrentSchedule | null;
}

// ---------------------------------------------------------------------------
// P06 — Demo Mode + Baseline Comparison
// ---------------------------------------------------------------------------

export interface Business {
  id: string;
  name: string;
  location: string;
}

// Backend-owned UrbanBrew Café scenario served by GET /api/v1/demo.
// Rendered verbatim — the frontend never builds demo data itself.
export interface DemoDataset {
  business: Business;
  description: string;
  horizon_days: number;
  week_start: string; // "YYYY-MM-DD"
  week_end: string;
  currency: string;
  currency_symbol: string;
  employees: Employee[];
  shifts: Shift[];
  requirements: StaffingRequirement[];
}

// Deterministic manual-approach baseline (never claims optimality).
export interface BaselineSchedule {
  status: 'baseline';
  assignments: Assignment[];
  shifts: Shift[];
  employees: Employee[];
  requirements: StaffingRequirement[];
  metrics: OptimizationMetrics;
  solver: { solver: string; status: string; solve_seconds?: number | null };
  explanation: string[];
}

// Signed deltas. Positive cost_saved = money saved; negative means the
// optimized schedule costs more and is reported honestly, never flipped.
export interface ComparisonImprovements {
  cost_saved: number | null;
  cost_saved_percent: number | null;
  hours_change: number | null;
  coverage_change: number | null;
  extra_hours_change: number | null;
  work_balance_change: number | null;
}

export interface ScheduleComparison {
  id: string;
  generated_at: string;
  currency: string;
  currency_symbol: string;
  baseline: BaselineSchedule;
  optimized: CurrentSchedule;
  improvements: ComparisonImprovements;
  summary: string;
}

// Envelope for comparison reads; absence is data (HTTP 200), mirroring the
// schedule envelope.
export interface ComparisonEnvelope {
  has_comparison: boolean;
  comparison: ScheduleComparison | null;
}

export interface DemoResetResponse {
  reset: boolean;
}
