// Shared data hooks (P04/P05/P06). React state + Fetch only; no store libraries.
import { useCallback, useEffect, useState } from 'react';
import {
  friendlyErrorMessage,
  getComparison,
  getCurrentSchedule,
  getDemoComparison,
  getDemoDataset,
  getEmployees,
  getReoptimizationStatus,
} from './api';
import type {
  ComparisonEnvelope,
  CurrentSchedule,
  DemoDataset,
  Employee,
  ScheduleComparison,
  TimeOff,
} from './types';

export interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useEmployees(): EmployeesState {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getEmployees()
      .then((list) => setEmployees(list))
      .catch((e: unknown) => setError(friendlyErrorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { employees, loading, error, reload: load };
}

export interface ReoptimizationStatusState {
  needsUpdate: boolean;
  approvedCount: number;
  approvedRequests: TimeOff[];
  loading: boolean;
  error: string | null;
}

export interface CurrentScheduleState {
  schedule: CurrentSchedule | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

// Single authoritative schedule, backend-owned. Both Overview and Schedule
// read through this hook so they can never disagree. Absence of a schedule
// is normal (not an error) and reported via schedule === null.
export function useReoptimizationStatus(): ReoptimizationStatusState {
  const [state, setState] = useState<ReoptimizationStatusState>({
    needsUpdate: false,
    approvedCount: 0,
    approvedRequests: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    getReoptimizationStatus()
      .then((res) => {
        if (!cancelled) {
          setState({
            needsUpdate: res.needs_update,
            approvedCount: res.approved_count,
            approvedRequests: res.approved_requests,
            loading: false,
            error: null,
          });
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, error: friendlyErrorMessage(e) }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useCurrentSchedule(): CurrentScheduleState {
  const [schedule, setSchedule] = useState<CurrentSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCurrentSchedule();
      setSchedule(res.has_schedule ? res.schedule : null);
    } catch (e: unknown) {
      setError(friendlyErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { schedule, loading, error, reload: load };
}

// ---------------------------------------------------------------------------
// P06 — Demo Mode + Baseline Comparison hooks
// ---------------------------------------------------------------------------

export interface DemoDatasetState {
  dataset: DemoDataset | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useDemoDataset(): DemoDatasetState {
  const [dataset, setDataset] = useState<DemoDataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getDemoDataset()
      .then((ds) => setDataset(ds))
      .catch((e: unknown) => setError(friendlyErrorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { dataset, loading, error, reload: load };
}

export interface ComparisonState {
  comparison: ScheduleComparison | null;
  loading: boolean;
  error: string | null;
}

function envelopeToState(
  res: ComparisonEnvelope,
): Omit<ComparisonState, 'loading' | 'error'> {
  return { comparison: res.has_comparison ? res.comparison : null };
}

// Stored demo comparison (Demo Mode workspace). Absence is normal.
export function useDemoComparison(): ComparisonState {
  const [state, setState] = useState<ComparisonState>({
    comparison: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    getDemoComparison()
      .then((res) => {
        if (!cancelled) setState({ ...envelopeToState(res), loading: false, error: null });
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setState({ comparison: null, loading: false, error: friendlyErrorMessage(e) });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

// Normal-mode comparison. Only valid while it refers to the CURRENT
// schedule; callers match comparison.optimized.id against their schedule.
export function useComparison(): ComparisonState {
  const [state, setState] = useState<ComparisonState>({
    comparison: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    getComparison()
      .then((res) => {
        if (!cancelled) setState({ ...envelopeToState(res), loading: false, error: null });
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setState({ comparison: null, loading: false, error: friendlyErrorMessage(e) });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function formatAvailability(e: Employee): string {
  if (!e.availability || e.availability.length === 0) return 'Open availability';
  const byDay = new Map<number, string[]>();
  for (const slot of e.availability) {
    const range = `${slot.start_time.slice(0, 5)}–${slot.end_time.slice(0, 5)}`;
    const list = byDay.get(slot.day_of_week) ?? [];
    list.push(range);
    byDay.set(slot.day_of_week, list);
  }
  const days = [...byDay.keys()].sort((a, b) => a - b);
  if (days.length === 7) return 'Every day';
  const names = days.map((d) => DAY_NAMES[d] ?? `Day ${d}`).join(', ');
  const firstRanges = byDay.get(days[0])?.join(', ') ?? '';
  return `${names} · ${firstRanges}`;
}
