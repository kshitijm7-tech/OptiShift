// Shared data hooks (P04/P05). React state + Fetch only; no store libraries.
import { useCallback, useEffect, useState } from 'react';
import { friendlyErrorMessage, getCurrentSchedule, getEmployees } from './api';
import type { CurrentSchedule, Employee } from './types';

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

export interface CurrentScheduleState {
  schedule: CurrentSchedule | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

// Single authoritative schedule, backend-owned. Both Overview and Schedule
// read through this hook so they can never disagree. Absence of a schedule
// is normal (not an error) and reported via schedule === null.
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
