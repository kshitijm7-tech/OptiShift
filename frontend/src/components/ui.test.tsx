// Render tests for shared states (P04): honest empty/error/metric UI.
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CalendarPlus } from 'lucide-react';
import {
  EmptyState,
  ErrorState,
  MetricCard,
  PrimaryButton,
} from './ui';

describe('EmptyState', () => {
  it('renders the team empty message with an action', () => {
    render(
      <EmptyState
        icon={<CalendarPlus />}
        title="No team members yet."
        body="Add your first team member."
        action={<PrimaryButton>Add Team Member</PrimaryButton>}
      />,
    );
    expect(screen.getByText('No team members yet.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add Team Member' }),
    ).toBeInTheDocument();
  });
});

describe('ErrorState', () => {
  it('shows a customer-friendly message without internals', () => {
    render(
      <ErrorState
        title="Couldn't load your team. Please try again."
        body="Backend says no."
      />,
    );
    expect(
      screen.getByText("Couldn't load your team. Please try again."),
    ).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/Traceback|Exception/);
  });
});

describe('MetricCard', () => {
  it('marks unavailable metrics honestly', () => {
    render(
      <MetricCard
        label="Money Saved"
        value="—"
        sub="Needs a baseline · Demo Mode P06"
        unavailable
      />,
    );
    expect(screen.getByText('Money Saved')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
