// Custom Mode page tests (P08): wizard flow, configuration capture,
// review summary, real build API call, and result navigation.
//
// The API boundary is mocked; the page itself computes no assignments —
// assertions target the configuration payload sent to the backend and the
// navigation/result behavior around the real response contract.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CustomMode from './CustomMode';
import { buildCustomSchedule, getEmployees } from '../api';
import type { CustomScheduleConfig, Employee } from '../types';

vi.mock('../api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../api')>();
  return {
    ...actual,
    getEmployees: vi.fn(),
    buildCustomSchedule: vi.fn(),
  };
});

const mockedGetEmployees = vi.mocked(getEmployees);
const mockedBuild = vi.mocked(buildCustomSchedule);

function employee(id: string, name: string, status = 'active'): Employee {
  return {
    id,
    name,
    role: 'Barista',
    skills: ['barista'],
    hourly_pay: 15,
    max_weekly_hours: 40,
    availability: [],
    status,
  };
}

function renderPage() {
  render(
    <MemoryRouter initialEntries={['/custom']}>
      <Routes>
        <Route path="/custom" element={<CustomMode />} />
        <Route path="/schedule" element={<div>Schedule result page</div>} />
        <Route path="/team" element={<div>Team page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

function pressContinue() {
  fireEvent.click(screen.getByRole('button', { name: /Continue/ }));
}

// Business → Team (waits for the real roster) → Shifts → Staffing → Review.
async function advanceToReview() {
  pressContinue();
  await screen.findByText('Priya');
  pressContinue();
  pressContinue();
  pressContinue();
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedGetEmployees.mockResolvedValue([
    employee('e1', 'Priya'),
    employee('e2', 'Arjun'),
    employee('e3', 'Vikram', 'inactive'),
  ]);
});

describe('Custom Mode wizard', () => {
  it('renders the five setup steps', () => {
    renderPage();
    for (const label of ['Business', 'Team', 'Shifts', 'Staffing', 'Review']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(
      screen.getByText('Create Your Schedule'),
    ).toBeInTheDocument();
  });

  it('captures business data and shows it in Review', async () => {
    renderPage();

    const nameInput = screen.getByLabelText('Business name');
    fireEvent.change(nameInput, { target: { value: 'Acme Bakery' } });
    await advanceToReview();

    expect(screen.getByText(/Acme Bakery/)).toBeInTheDocument();
  });

  it('configures shifts, staffing, and rules end to end', async () => {
    renderPage();

    // Team step first (waits for the roster), then Shifts.
    pressContinue();
    await screen.findByText('Priya');
    pressContinue();

    // Shifts step: rename the first shift.
    const nameInputs = screen.getAllByLabelText('Shift name');
    fireEvent.change(nameInputs[0], { target: { value: 'Sunrise' } });

    // Staffing step: raise the first shift to 3 people.
    pressContinue();
    const minInputs = screen.getAllByLabelText(/Minimum staff/);
    fireEvent.change(minInputs[0], { target: { value: '3' } });

    // Rules step: raise the staff-cost priority.
    pressContinue();
    fireEvent.change(screen.getByLabelText('Staff cost priority'), {
      target: { value: '2' },
    });

    // Review reflects everything entered.
    expect(screen.getByText(/12 slots required/)).toBeInTheDocument(); // 3 + 9x1
    expect(screen.getByText(/Cost 2 · Balance 0.5/)).toBeInTheDocument();
  });
});

describe('Custom Mode build', () => {
  function optimalResponse() {
    return {
      status: 'optimal' as const,
      assignments: [],
      metrics: null,
      violations: [],
      objective_breakdown: null,
      solver: { solver: 'PULP_CBC_CMD', status: 'Optimal' },
      explanation: [],
    };
  }

  it('sends the full configuration to the build API and opens the result', async () => {
    mockedBuild.mockResolvedValue(optimalResponse());
    renderPage();
    await advanceToReview();

    fireEvent.click(
      screen.getByRole('button', { name: 'Build My Schedule' }),
    );

    expect(await screen.findByText('Schedule result page')).toBeInTheDocument();
    expect(mockedBuild).toHaveBeenCalledTimes(1);
    const sent = mockedBuild.mock.calls[0][0] as CustomScheduleConfig;
    // Business, team, shifts, staffing, and rules all travel to the backend.
    expect(sent.business.name).toBe('UrbanBrew Café');
    expect(sent.employees.map((e) => e.id)).toEqual(['e1', 'e2']); // inactive excluded
    expect(sent.shifts.length).toBe(10);
    expect(sent.requirements).toHaveLength(10);
    expect(
      sent.requirements.every((r) =>
        sent.shifts.some((s) => s.id === r.shift_id),
      ),
    ).toBe(true);
    expect(sent.rules).toEqual({
      labor_cost_weight: 1.0,
      work_balance_weight: 0.5,
    });
  });

  it('sends tuned rules and custom staffing to the backend', async () => {
    mockedBuild.mockResolvedValue(optimalResponse());
    renderPage();
    await advanceToReview();

    // Raise first shift to 2 staff with a skill, and tune both priorities.
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    const minInputs = screen.getAllByLabelText(/Minimum staff/);
    fireEvent.change(minInputs[0], { target: { value: '2' } });
    const skillInputs = screen.getAllByLabelText(/Required skills/);
    fireEvent.change(skillInputs[0], { target: { value: 'barista' } });
    fireEvent.click(screen.getByRole('button', { name: /Continue/ }));
    fireEvent.change(screen.getByLabelText('Staff cost priority'), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText('Work balance priority'), {
      target: { value: '2' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Build My Schedule' }),
    );

    await screen.findByText('Schedule result page');
    const sent = mockedBuild.mock.calls[0][0] as CustomScheduleConfig;
    expect(sent.requirements[0].min_employees).toBe(2);
    expect(sent.requirements[0].required_skills).toEqual(['barista']);
    expect(sent.rules).toEqual({
      labor_cost_weight: 3,
      work_balance_weight: 2,
    });
  });

  it('explains infeasible results without leaving Custom Mode', async () => {
    mockedBuild.mockResolvedValue({
      status: 'infeasible' as const,
      assignments: [],
      metrics: null,
      violations: ['Only 2 eligible employees exist for 9 needed.'],
      objective_breakdown: null,
      solver: { solver: 'PULP_CBC_CMD', status: 'Infeasible' },
      explanation: [],
    });
    renderPage();
    await advanceToReview();
    fireEvent.click(
      screen.getByRole('button', { name: 'Build My Schedule' }),
    );

    expect(
      await screen.findByText(
        "OptiShift couldn't build a schedule that satisfies all current rules.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Schedule result page'),
    ).not.toBeInTheDocument();
  });
});
