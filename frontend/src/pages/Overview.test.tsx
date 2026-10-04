// Overview page tests (P05): schedule-aware dashboard rendering.
// API boundary is mocked; every asserted number comes from the mocked
// backend payload (never hardcoded expectations of solver behavior).
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Overview from './Overview';
import { getComparison, getCurrentSchedule, getEmployees } from '../api';
import { toDateStr } from '../schedule';
import type { CurrentSchedule, Employee } from '../types';

vi.mock('../api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../api')>();
  return {
    ...actual,
    getEmployees: vi.fn(),
    getCurrentSchedule: vi.fn(),
    getComparison: vi.fn(),
    optimizeSchedule: vi.fn(),
  };
});

const mockedGetEmployees = vi.mocked(getEmployees);
const mockedGetSchedule = vi.mocked(getCurrentSchedule);
const mockedGetComparison = vi.mocked(getComparison);

function employee(): Employee {
  return {
    id: 'e1',
    name: 'Priya',
    role: 'Barista',
    skills: ['barista'],
    hourly_pay: 15,
    max_weekly_hours: 24,
    availability: [],
    status: 'active',
  };
}

function scheduleFor(dateStr: string): CurrentSchedule {
  return {
    id: 'sched-1',
    generated_at: new Date().toISOString(),
    status: 'optimal',
    assignments: [
      { employee_id: 'e1', shift_id: `m-${dateStr}`, assigned_date: dateStr },
    ],
    shifts: [
      {
        id: `m-${dateStr}`,
        name: 'Morning',
        shift_date: dateStr,
        start_time: '08:00:00',
        end_time: '12:00:00',
        required_role: null,
      },
    ],
    employees: [employee()],
    requirements: [
      {
        id: 'req-1',
        shift_id: `m-${dateStr}`,
        min_employees: 1,
        required_skills: [],
      },
    ],
    metrics: {
      total_labor_cost: 60,
      total_hours: 4,
      extra_hours_total: 0,
      max_hours_per_employee: 4,
      min_hours_per_employee: 4,
      employee_hours: { e1: 4 },
      shifts_staffed: 1,
      shifts_total: 1,
    },
    objective_breakdown: null,
    explanation: ['Priya covers the morning rush.'],
    solver: { solver: 'PULP_CBC_CMD', status: 'Optimal', solve_seconds: 0.03 },
  };
}

function renderPage() {
  render(
    <MemoryRouter>
      <Overview />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  // No baseline comparison by default: Money Saved stays honestly "—".
  mockedGetComparison.mockResolvedValue({ has_comparison: false, comparison: null });
});

describe('Overview with no schedule', () => {
  it('shows honest empty states and keeps Money Saved unavailable', async () => {
    mockedGetEmployees.mockResolvedValue([employee()]);
    mockedGetSchedule.mockResolvedValue({ has_schedule: false, schedule: null });
    renderPage();

    expect(
      await screen.findByText("Your schedule hasn't been built yet."),
    ).toBeInTheDocument();
    expect(await screen.findByText('No recent activity yet.')).toBeInTheDocument();
    expect(
      screen.getByText('Run a baseline comparison to see savings'),
    ).toBeInTheDocument();
    // No fabricated coverage or cost.
    expect(screen.queryByText('All required shifts covered.')).not.toBeInTheDocument();
  });
});

describe('Overview with a current schedule', () => {
  it('renders backend metrics, health, today staffing, and activity', async () => {
    const today = toDateStr(new Date());
    mockedGetEmployees.mockResolvedValue([employee()]);
    mockedGetSchedule.mockResolvedValue({
      has_schedule: true,
      schedule: scheduleFor(today),
    });
    renderPage();

    expect(await screen.findByText('₹60.00')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(
      screen.getByText('All required shifts covered.'),
    ).toBeInTheDocument();
    // Today's card shows the real shift with its real crew.
    expect(screen.getByText('Morning')).toBeInTheDocument();
    expect(screen.getByText('Priya')).toBeInTheDocument();
    // Activity reflects the real generation event.
    expect(await screen.findByText('Schedule built')).toBeInTheDocument();
    // Money Saved is still honestly unavailable without a comparison.
    expect(
      screen.getByText('Run a baseline comparison to see savings'),
    ).toBeInTheDocument();
  });
});

describe('Overview API error', () => {
  it('shows a customer-friendly schedule error with retry', async () => {
    mockedGetEmployees.mockResolvedValue([employee()]);
    mockedGetSchedule.mockRejectedValue(new Error('down'));
    renderPage();

    expect(
      await screen.findByText("Couldn't load the current schedule."),
    ).toBeInTheDocument();
  });
});
