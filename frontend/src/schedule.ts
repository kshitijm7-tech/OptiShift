// Pure week/shift builders for the Schedule page (P04).
// No React, no fetch, no optimizer logic — just input construction.
// The backend optimizer still owns every assignment decision.
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
