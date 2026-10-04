// Unit tests for the Schedule page input builders (P04/P05).
// These cover pure input construction and presentation formatting only —
// assignment decisions always come from the backend optimizer and are
// covered by backend tests.
import { describe, expect, it } from 'vitest';
import {
  activeEmployees,
  buildWeekInputs,
  mondayOf,
  parseSkills,
  prettyDate,
  scheduleDates,
  slug,
  timeAgo,
  toDateStr,
  weekdayLabel,
  weekDays,
} from './schedule';
import type { Employee } from './types';

function employee(id: string, status = 'active'): Employee {
  return {
    id,
    name: id,
    role: 'Barista',
    skills: ['barista'],
    hourly_pay: 15,
    max_weekly_hours: 24,
    availability: [],
    status,
  };
}

describe('toDateStr', () => {
  it('formats a local date as YYYY-MM-DD', () => {
    expect(toDateStr(new Date(2026, 9, 6))).toBe('2026-10-06');
  });
});

describe('mondayOf', () => {
  it('returns the Monday of the same week', () => {
    // Tuesday 2026-10-06 -> Monday 2026-10-05
    expect(toDateStr(mondayOf(new Date(2026, 9, 6)))).toBe('2026-10-05');
  });
  it('keeps a Monday unchanged', () => {
    expect(toDateStr(mondayOf(new Date(2026, 9, 5)))).toBe('2026-10-05');
  });
  it('maps Sunday back to the previous Monday', () => {
    expect(toDateStr(mondayOf(new Date(2026, 9, 4)))).toBe('2026-09-28');
  });
});

describe('weekDays', () => {
  it('produces 7 consecutive days starting Monday', () => {
    const days = weekDays(new Date(2026, 9, 5));
    expect(days).toHaveLength(7);
    expect(toDateStr(days[0])).toBe('2026-10-05');
    expect(toDateStr(days[6])).toBe('2026-10-11');
  });
});

describe('slug', () => {
  it('slugifies window names for deterministic shift ids', () => {
    expect(slug('Morning Rush!')).toBe('morning-rush');
    expect(slug('')).toBe('shift');
  });
});

describe('parseSkills', () => {
  it('splits comma input and drops blanks', () => {
    expect(parseSkills('barista, cashier ,,')).toEqual(['barista', 'cashier']);
    expect(parseSkills('')).toEqual([]);
  });
});

describe('buildWeekInputs', () => {
  it('creates one shift + requirement per day per window', () => {
    const days = weekDays(new Date(2026, 9, 5));
    const { shifts, requirements } = buildWeekInputs(days, [
      { name: 'Morning', start: '08:00', end: '12:00', minStaff: 1, skills: '' },
      { name: 'Evening', start: '16:00', end: '20:00', minStaff: 2, skills: 'barista' },
    ]);
    expect(shifts).toHaveLength(14);
    expect(requirements).toHaveLength(14);
    expect(new Set(shifts.map((s) => s.id)).size).toBe(14);
    const first = shifts[0];
    expect(first.shift_date).toBe('2026-10-05');
    expect(first.start_time).toBe('08:00:00');
    expect(requirements[1].min_employees).toBe(2);
    expect(requirements[1].required_skills).toEqual(['barista']);
    expect(requirements[0].required_skills).toEqual([]);
    // requirement ids always reference their shift
    for (const r of requirements) {
      expect(shifts.some((s) => s.id === r.shift_id)).toBe(true);
    }
  });

  it('clamps negative staffing to zero', () => {
    const days = weekDays(new Date(2026, 9, 5)).slice(0, 1);
    const { requirements } = buildWeekInputs(days, [
      { name: 'X', start: '08:00', end: '12:00', minStaff: -3, skills: '' },
    ]);
    expect(requirements[0].min_employees).toBe(0);
  });
});

describe('activeEmployees', () => {
  it('keeps active staff regardless of case and drops the rest', () => {
    const list = [employee('a'), employee('b', 'Active'), employee('c', 'inactive')];
    expect(activeEmployees(list).map((e) => e.id)).toEqual(['a', 'b']);
  });
});

describe('timeAgo', () => {
  it('says just now for fresh timestamps', () => {
    expect(timeAgo(new Date().toISOString())).toBe('just now');
  });
  it('reports minutes and hours', () => {
    const now = Date.now();
    expect(timeAgo(new Date(now - 5 * 60000).toISOString(), now)).toBe(
      '5 minutes ago',
    );
    expect(timeAgo(new Date(now - 60 * 60000).toISOString(), now)).toBe(
      '1 hour ago',
    );
    expect(timeAgo(new Date(now - 3 * 3600000).toISOString(), now)).toBe(
      '3 hours ago',
    );
  });
  it('falls back to a calendar date after a day', () => {
    const now = new Date(2026, 9, 6, 12, 0, 0).getTime();
    const then = new Date(2026, 9, 4, 12, 0, 0).toISOString();
    expect(timeAgo(then, now)).toBe('on Oct 4, 2026');
  });
});

describe('scheduleDates', () => {
  it('returns distinct shift dates ascending', () => {
    const days = weekDays(new Date(2026, 9, 5));
    const { shifts } = buildWeekInputs(days.slice(0, 2), [
      { name: 'Morning', start: '08:00', end: '12:00', minStaff: 1, skills: '' },
    ]);
    expect(scheduleDates([...shifts].reverse())).toEqual([
      '2026-10-05',
      '2026-10-06',
    ]);
  });
});

describe('weekdayLabel and prettyDate', () => {
  it('labels known dates without timezone tricks', () => {
    expect(weekdayLabel('2026-10-05')).toBe('Mon');
    expect(weekdayLabel('2026-10-06')).toBe('Tue');
    expect(prettyDate('2026-10-06')).toBe('Oct 6');
  });
});
