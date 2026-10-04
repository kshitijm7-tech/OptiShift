// Schedule page tests (P05): authoritative current-schedule flow.
// The page must render the backend-stored schedule (not the POST echo) and
// must keep a valid schedule visible when a later run is infeasible.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Schedule from './Schedule';
import {
  getCurrentSchedule,
  getEmployees,
  optimizeSchedule,
} from '../api';
import { toDateStr } from '../schedule';
import type { CurrentSchedule, Employee } from '../types';

vi.mock('../api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../api')>();
  return {
    ...actual,
    getEmployees: vi.fn(),
    getCurrentSchedule: vi.fn(),
    optimizeSchedule: vi.fn(),
  };
});

const mockedGetEmployees = vi.mocked(getEmployees);
const mockedGetSchedule = vi.mocked(getCurrentSchedule);
const mockedOptimize = vi.mocked(optimizeSchedule);

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

function scheduleFor(dateStr: string, id = 'sched-1'): CurrentSchedule {
  return {
    id,
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
      <Schedule />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Schedule with no current schedule', () => {
  it('shows the build empty state', async () => {
    mockedGetEmployees.mockResolvedValue([employee()]);
    mockedGetSchedule.mockResolvedValue({ has_schedule: false, schedule: null });
    renderPage();

    expect(
      await screen.findByText("Your schedule hasn't been built yet."),
    ).toBeInTheDocument();
  });
});

describe('Schedule with a current schedule', () => {
  it('renders the stored roster, metrics, and generated time', async () => {
    const today = toDateStr(new Date());
    mockedGetEmployees.mockResolvedValue([employee()]);
    mockedGetSchedule.mockResolvedValue({
      has_schedule: true,
      schedule: scheduleFor(today),
    });
    renderPage();

    expect(await screen.findByText('Morning')).toBeInTheDocument();
    expect(screen.getByText('Priya')).toBeInTheDocument();
    expect(screen.getByText('$60.00')).toBeInTheDocument();
    expect(screen.getByText(/Last built/)).toBeInTheDocument();
    expect(screen.getByText('Why this schedule')).toBeInTheDocument();
  });
});

describe('Schedule build flow', () => {
  it('refreshes from the authoritative schedule after optimizing', async () => {
    const today = toDateStr(new Date());
    mockedGetEmployees.mockResolvedValue([employee()]);
    mockedGetSchedule
      .mockResolvedValueOnce({ has_schedule: false, schedule: null })
      .mockResolvedValueOnce({
        has_schedule: true,
        schedule: scheduleFor(today, 'sched-2'),
      });
    mockedOptimize.mockResolvedValue({
      status: 'optimal',
      assignments: [],
      metrics: null,
      violations: [],
      objective_breakdown: null,
      solver: { solver: 'PULP_CBC_CMD', status: 'Optimal' },
      explanation: [],
    });
    renderPage();

    fireEvent.click(
      await screen.findByRole('button', { name: 'Build My Schedule Now' }),
    );

    // The page re-reads the stored schedule instead of the POST echo.
    expect(await screen.findByText('Priya')).toBeInTheDocument();
    expect(mockedGetSchedule).toHaveBeenCalledTimes(2);
  });

  it('keeps the previous valid schedule when a run is infeasible', async () => {
    const today = toDateStr(new Date());
    mockedGetEmployees.mockResolvedValue([employee()]);
    mockedGetSchedule.mockResolvedValue({
      has_schedule: true,
      schedule: scheduleFor(today),
    });
    mockedOptimize.mockResolvedValue({
      status: 'infeasible',
      assignments: [],
      metrics: null,
      violations: ['Only 1 eligible employee exists for 9 needed.'],
      objective_breakdown: null,
      solver: { solver: 'PULP_CBC_CMD', status: 'Infeasible' },
      explanation: [],
    });
    renderPage();

    expect(await screen.findByText('Priya')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Build My Schedule' }),
    );

    expect(
      await screen.findByText("We couldn't build this schedule yet."),
    ).toBeInTheDocument();
    // Previous schedule still rendered.
    expect(screen.getByText('$60.00')).toBeInTheDocument();
    expect(screen.getByText('Morning')).toBeInTheDocument();
  });
});

describe('Schedule API error', () => {
  it('shows a customer-friendly error with retry', async () => {
    mockedGetEmployees.mockResolvedValue([employee()]);
    mockedGetSchedule.mockRejectedValue(new Error('down'));
    renderPage();

    expect(
      await screen.findByText("Couldn't load the current schedule."),
    ).toBeInTheDocument();
  });
});
