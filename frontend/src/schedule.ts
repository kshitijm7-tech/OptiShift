// Pure week/shift builders for the Schedule page (P04/P05).
// No React, no fetch, no optimizer logic — just input construction and
// presentation formatting. The backend optimizer still owns every
// assignment decision; the backend schedule store owns the result.
import type { Employee, Shift, StaffingRequirement } from './types';

export interface ShiftWindowInput {
  name: string;
  start: string; // "HH:MM"
  end: string; // "HH:MM"
  minStaff: number;
  skills: string; // comma separated
}

export function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function mondayOf(base: Date): Date {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  const dow = (d.getDay() + 6) % 7; // Monday=0 .. Sunday=6
  d.setDate(d.getDate() - dow);
  return d;
}

export function weekDays(weekStartMonday: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStartMonday);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export function slug(s: string): string {
  const clean = s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return clean || 'shift';
}

function toClock(hhmm: string): string {
  return `${hhmm}:00`.slice(0, 8);
}

export function parseSkills(csv: string): string[] {
  return csv
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function buildWeekInputs(
  days: Date[],
  windows: ShiftWindowInput[],
): { shifts: Shift[]; requirements: StaffingRequirement[] } {
  const shifts: Shift[] = [];
  const requirements: StaffingRequirement[] = [];
  days.forEach((day) => {
    const dateStr = toDateStr(day);
    windows.forEach((w, wi) => {
      const id = `${slug(w.name)}-${wi}-${dateStr}`;
      shifts.push({
        id,
        name: w.name,
        shift_date: dateStr,
        start_time: toClock(w.start),
        end_time: toClock(w.end),
        required_role: null,
      });
      requirements.push({
        id: `req-${id}`,
        shift_id: id,
        min_employees: Math.max(0, Math.floor(w.minStaff)),
        required_skills: parseSkills(w.skills),
      });
    });
  });
  return { shifts, requirements };
}

export function activeEmployees(employees: Employee[]): Employee[] {
  return employees.filter((e) => (e.status || '').toLowerCase() === 'active');
}

// Customer-friendly relative time for the generated timestamp, e.g.
// "just now", "5 minutes ago", "3 hours ago", "on Oct 4, 2026".
// Presentation only: the timestamp itself always comes from the backend.
export function timeAgo(isoTimestamp: string, nowMs?: number): string {
  const then = new Date(isoTimestamp).getTime();
  const now = nowMs ?? Date.now();
  const diffMs = now - then;
  if (Number.isNaN(then) || diffMs < 0) return 'just now';
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const date = new Date(then);
  return `on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

// Distinct shift dates in a stored schedule, ascending. Drives the roster
// grid so Schedule and Overview render the schedule's own dates.
export function scheduleDates(shifts: Shift[]): string[] {
  return [...new Set(shifts.map((s) => s.shift_date))].sort();
}

// Short weekday label for an ISO date, e.g. "Mon".
export function weekdayLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
    new Date(y, (m ?? 1) - 1, d ?? 1).getDay()
  ];
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Short date label for an ISO date, e.g. "Oct 6". Timezone-safe: parses
// the calendar parts directly instead of constructing a midnight Date.
export function prettyDate(dateStr: string): string {
  const [, m, d] = dateStr.split('-').map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${d ?? ''}`.trim();
}
