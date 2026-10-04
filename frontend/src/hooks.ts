// Shared data hooks (P04). React state + Fetch only; no store libraries.
import { useCallback, useEffect, useState } from 'react';
import { friendlyErrorMessage, getEmployees } from './api';
import type { Employee } from './types';

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
