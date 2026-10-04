// Demo Mode page tests (P06): scenario rendering, run flow, comparison UI,
// and honest error/empty states. Every asserted number comes from the
// mocked backend payload — the page computes nothing itself.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DemoMode from './DemoMode';
import {
  ApiError,
  getDemoComparison,
  getDemoDataset,
  resetDemo,
  runDemo,
} from '../api';
import type {
  BaselineSchedule,
  ComparisonEnvelope,
  DemoDataset,
  ScheduleComparison,
} from '../types';

vi.mock('../api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../api')>();
  return {
    ...actual,
    getDemoDataset: vi.fn(),
    runDemo: vi.fn(),
    getDemoComparison: vi.fn(),
    resetDemo: vi.fn(),
  };
});

const mockedGetDataset = vi.mocked(getDemoDataset);
const mockedRunDemo = vi.mocked(runDemo);
const mockedGetComparison = vi.mocked(getDemoComparison);
const mockedResetDemo = vi.mocked(resetDemo);

const EMPLOYEES = [
  {
    id: 'aarav',
    name: 'Aarav Sharma',
    role: 'Barista',
    skills: ['coffee', 'cashier'],
    hourly_pay: 140,
    max_weekly_hours: 24,
    availability: [],
    status: 'active',
  },
  {
    id: 'nisha',
    name: 'Nisha Nair',
    role: 'Barista',
    skills: ['coffee'],
    hourly_pay: 130,
    max_weekly_hours: 30,
    availability: [],
    status: 'inactive',
  },
];

function datasetFixture(): DemoDataset {
  return {
    business: { id: 'urbanbrew-mumbai', name: 'UrbanBrew Café', location: 'Mumbai' },
    description: 'A Mumbai speciality coffee shop demo scenario.',
    horizon_days: 7,
    week_start: '2026-09-28',
    week_end: '2026-10-04',
    currency: 'INR',
    currency_symbol: '₹',
    employees: EMPLOYEES,
    shifts: [
      {
        id: 'morning-2026-09-28',
        name: 'Morning',
        shift_date: '2026-09-28',
        start_time: '08:00:00',
        end_time: '12:00:00',
        required_role: null,
      },
    ],
    requirements: [
      {
        id: 'req-morning-2026-09-28',
        shift_id: 'morning-2026-09-28',
        min_employees: 2,
        required_skills: ['coffee'],
      },
    ],
  };
}

function comparisonFixture(): ScheduleComparison {
  const baseline: BaselineSchedule = {
    status: 'baseline',
    assignments: [
      { employee_id: 'aarav', shift_id: 'morning-2026-09-28', assigned_date: '2026-09-28' },
    ],
    shifts: datasetFixture().shifts,
    employees: EMPLOYEES,
    requirements: datasetFixture().requirements,
    metrics: {
      total_labor_cost: 21980,
      total_hours: 168,
      extra_hours_total: 0,
      max_hours_per_employee: 32,
      min_hours_per_employee: 16,
      employee_hours: { aarav: 24 },
      shifts_staffed: 21,
      shifts_total: 21,
    },
    solver: { solver: 'manual-baseline', status: 'deterministic' },
    explanation: ['Baseline built like a manual roster pass.'],
  };
  return {
    id: 'cmp-1',
    generated_at: new Date().toISOString(),
    currency: 'INR',
    currency_symbol: '₹',
    baseline,
    optimized: {
      id: 'sched-opt-1',
      generated_at: new Date().toISOString(),
      status: 'optimal',
      assignments: [
        { employee_id: 'aarav', shift_id: 'morning-2026-09-28', assigned_date: '2026-09-28' },
      ],
      shifts: datasetFixture().shifts,
      employees: EMPLOYEES,
      requirements: datasetFixture().requirements,
      metrics: {
        total_labor_cost: 20480,
        total_hours: 168,
        extra_hours_total: 0,
        max_hours_per_employee: 28,
        min_hours_per_employee: 20,
        employee_hours: { aarav: 28 },
        shifts_staffed: 21,
        shifts_total: 21,
      },
      objective_breakdown: null,
      explanation: ['aarav -> morning-2026-09-28 on 2026-09-28 (140.00/h x 4.0h)'],
      solver: { solver: 'PULP_CBC_CMD', status: 'Optimal', solve_seconds: 0.05 },
    },
    improvements: {
      cost_saved: 1500,
      cost_saved_percent: 6.8,
      hours_change: 0,
      coverage_change: 0,
      extra_hours_change: 0,
      work_balance_change: 0,
    },
    summary: 'OptiShift saved ₹1,500.00 (6.8% lower staff cost).',
  };
}

function envelope(comparison: ScheduleComparison | null): ComparisonEnvelope {
  return { has_comparison: comparison != null, comparison };
}

function renderPage(initialEntry = '/demo') {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/demo" element={<DemoMode />} />
        <Route path="/" element={<div>Overview home</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedGetDataset.mockResolvedValue(datasetFixture());
  mockedGetComparison.mockResolvedValue(envelope(null));
  mockedResetDemo.mockResolvedValue({ reset: true });
});

describe('DemoMode scenario', () => {
  it('loads and renders the backend demo data', async () => {
    renderPage();

    expect(await screen.findByText('UrbanBrew Café · Mumbai')).toBeInTheDocument();
    expect(screen.getByText('Aarav Sharma')).toBeInTheDocument();
    expect(screen.getByText('Nisha Nair')).toBeInTheDocument();
    expect(screen.getByText('Morning')).toBeInTheDocument();
    expect(screen.getByText(/Needs 2 people/)).toBeInTheDocument();
    expect(mockedGetDataset).toHaveBeenCalledTimes(1);
  });

  it('shows a friendly error when the dataset fails to load', async () => {
    mockedGetDataset.mockRejectedValue(new Error('down'));
    renderPage();

    expect(
      await screen.findByText("Couldn't load the demo scenario."),
    ).toBeInTheDocument();
  });

  it('shows an empty state before the first run', async () => {
    renderPage();
    expect(
      await screen.findByText('Run the demo to see the value.'),
    ).toBeInTheDocument();
  });
});

describe('DemoMode run flow', () => {
  it('runs the demo and renders the comparison from the API result', async () => {
    const comparison = comparisonFixture();
    mockedRunDemo.mockResolvedValue(envelope(comparison));
    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: 'Run Demo Now' }));

    // Money Saved renders the backend's real signed value.
    expect(await screen.findByText('₹1,500 saved')).toBeInTheDocument();
    expect(screen.getByText('6.8% lower staff cost than the manual baseline')).toBeInTheDocument();
    expect(screen.getByText('Side-by-Side Comparison')).toBeInTheDocument();
    expect(screen.getByText('₹21,980')).toBeInTheDocument();
    // Optimized cost renders twice by design: metric card + comparison row.
    const optimizedCosts = await screen.findAllByText('₹20,480');
    expect(optimizedCosts).toHaveLength(2);
    expect(screen.getByText('↓ ₹1,500 saved')).toBeInTheDocument();
    // The optimized roster and its solver identity render verbatim.
    expect(screen.getByText('PULP_CBC_CMD')).toBeInTheDocument();
    expect(screen.getByText('Optimized week roster')).toBeInTheDocument();
    expect(mockedRunDemo).toHaveBeenCalledTimes(1);
  });

  it('keeps a previous comparison visible when re-entering Demo Mode', async () => {
    mockedGetComparison.mockResolvedValue(envelope(comparisonFixture()));
    renderPage();

    expect(await screen.findByText('₹1,500 saved')).toBeInTheDocument();
    // The header switches to re-run wording once a comparison exists.
    expect(screen.getByRole('button', { name: 'Re-run Demo' })).toBeInTheDocument();
  });

  it('surfaces a friendly failure when the demo run fails', async () => {
    // ApiError carries the backend detail through friendlyErrorMessage.
    mockedRunDemo.mockRejectedValue(
      new ApiError(
        400,
        "We couldn't build the demo schedule yet. Staffing too tight.",
      ),
    );
    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: 'Run Demo Now' }));

    expect(
      await screen.findByText("We couldn't build the demo schedule yet."),
    ).toBeInTheDocument();
    expect(screen.getByText(/Staffing too tight/)).toBeInTheDocument();
  });

  it('exits Demo Mode through reset and navigates home', async () => {
    mockedGetComparison.mockResolvedValue(envelope(comparisonFixture()));
    renderPage();

    fireEvent.click(await screen.findByRole('button', { name: 'Exit Demo Mode' }));

    await waitFor(() => expect(mockedResetDemo).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByText('Overview home')).toBeInTheDocument(),
    );
  });
});
