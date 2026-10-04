// Demo Mode page (P06): the UrbanBrew Café walkthrough.
//
// The backend owns the demo scenario, the deterministic manual baseline,
// the P03 optimization, and the comparison math. This page renders those
// results and never computes schedule, cost, or savings numbers itself.
// Demo Mode is a separate workspace: the user's team and current schedule
// are never touched.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CircleCheck,
  FlaskConical,
  Play,
  RotateCcw,
  Users,
  Zap,
} from 'lucide-react';
import { friendlyErrorMessage, resetDemo, runDemo } from '../api';
import {
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
  MetricCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
} from '../components/ui';
import { useDemoComparison, useDemoDataset } from '../hooks';
import { formatMoney, formatSignedHours, prettyDate, timeAgo } from '../schedule';
import type { DemoDataset, ScheduleComparison } from '../types';

function savingsValue(comparison: ScheduleComparison): {
  value: string;
  sub: string;
} {
  const saved = comparison.improvements.cost_saved;
  const symbol = comparison.currency_symbol;
  if (saved == null) return { value: '—', sub: 'Comparison unavailable' };
  if (saved > 0) {
    const percent = comparison.improvements.cost_saved_percent;
    return {
      value: `${formatMoney(saved, symbol)} saved`,
      sub:
        percent != null
          ? `${percent}% lower staff cost than the manual baseline`
          : 'Lower staff cost than the manual baseline',
    };
  }
  if (saved === 0) {
    return { value: `${formatMoney(0, symbol)} saved`, sub: 'Same staff cost as the baseline' };
  }
  return {
    value: `${formatMoney(Math.abs(saved), symbol)} added`,
    sub: 'Staff cost increased vs the baseline',
  };
}

interface ComparisonRow {
  label: string;
  baseline: string;
  optimized: string;
  baselineWidth: number;
  optimizedWidth: number;
  chip: string;
  chipPositive: boolean;
}

function comparisonRows(comparison: ScheduleComparison): ComparisonRow[] {
  const b = comparison.baseline.metrics;
  const o = comparison.optimized.metrics;
  const symbol = comparison.currency_symbol;
  const bCoverage = b.shifts_total > 0 ? (b.shifts_staffed / b.shifts_total) * 100 : 0;
  const oCoverage = o.shifts_total > 0 ? (o.shifts_staffed / o.shifts_total) * 100 : 0;
  const bSpread = b.max_hours_per_employee - b.min_hours_per_employee;
  const oSpread = o.max_hours_per_employee - o.min_hours_per_employee;
  const pctOf = (base: number, value: number) =>
    Math.round((value / Math.max(base, 0.0001)) * 100);
  const chipFor = (change: number | null, unit: string, lowerIsBetter: boolean) => {
    if (change == null) return '—';
    if (change === 0) return 'no change';
    const arrow = change < 0 ? '↓' : '↑';
    const positive = lowerIsBetter ? change < 0 : change > 0;
    return `${arrow} ${formatSignedHours(Math.abs(change), unit)} ${positive ? 'better' : 'worse'}`;
  };
  const saved = comparison.improvements.cost_saved;
  const costChip =
    saved == null
      ? '—'
      : saved > 0
        ? `↓ ${formatMoney(saved, symbol)} saved`
        : saved === 0
          ? 'no change'
          : `↑ ${formatMoney(Math.abs(saved), symbol)} more`;
  return [
    {
      label: 'Staff cost',
      baseline: formatMoney(b.total_labor_cost, symbol),
      optimized: formatMoney(o.total_labor_cost, symbol),
      baselineWidth: 100,
      optimizedWidth: pctOf(b.total_labor_cost, o.total_labor_cost),
      chip: costChip,
      chipPositive: (saved ?? 0) > 0,
    },
    {
      label: 'Total hours',
      baseline: `${b.total_hours} hrs`,
      optimized: `${o.total_hours} hrs`,
      baselineWidth: 100,
      optimizedWidth: pctOf(b.total_hours, o.total_hours),
      chip: chipFor(comparison.improvements.hours_change, 'hrs', false),
      chipPositive: (comparison.improvements.hours_change ?? 0) <= 0,
    },
    {
      label: 'Coverage',
      baseline: `${Math.round(bCoverage)}%`,
      optimized: `${Math.round(oCoverage)}%`,
      baselineWidth: Math.max(2, Math.min(100, Math.round(bCoverage))),
      optimizedWidth: Math.max(2, Math.min(100, Math.round(oCoverage))),
      chip: chipFor(comparison.improvements.coverage_change, 'pts', false),
      chipPositive: (comparison.improvements.coverage_change ?? 0) >= 0,
    },
    {
      label: 'Extra hours',
      baseline: `${b.extra_hours_total} hrs`,
      optimized: `${o.extra_hours_total} hrs`,
      baselineWidth: 100,
      optimizedWidth: pctOf(Math.max(b.extra_hours_total, o.extra_hours_total, 1), o.extra_hours_total),
      chip: chipFor(comparison.improvements.extra_hours_change, 'hrs', true),
      chipPositive: (comparison.improvements.extra_hours_change ?? 0) <= 0,
    },
    {
      label: 'Work balance',
      baseline: `${bSpread} hrs spread`,
      optimized: `${oSpread} hrs spread`,
      baselineWidth: 100,
      optimizedWidth: pctOf(Math.max(bSpread, oSpread, 1), oSpread),
      chip: chipFor(comparison.improvements.work_balance_change, 'hrs', true),
      chipPositive: (comparison.improvements.work_balance_change ?? 0) <= 0,
    },
  ];
}

function ScenarioSection({ dataset }: { dataset: DemoDataset }) {
  const shiftWindows = ['morning', 'afternoon', 'evening'].map((prefix) => {
    const shift = dataset.shifts.find((s) => s.id.startsWith(prefix));
    const requirement = dataset.requirements.find(
      (r) => shift && r.shift_id === shift.id,
    );
    return { shift, requirement };
  });
  const activeCount = dataset.employees.filter(
    (e) => (e.status || '').toLowerCase() === 'active',
  ).length;
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-[#111827]">
            {dataset.business.name} · {dataset.business.location}
          </h2>
          <p className="text-[12px] text-[#6B7280]">
            Sample business for the week of {prettyDate(dataset.week_start)} –{' '}
            {prettyDate(dataset.week_end)}
          </p>
        </div>
        <StatusBadge tone="info">Demo data</StatusBadge>
      </div>
      <p className="mb-4 text-[13px] leading-[19px] text-[#4B5563]">
        {dataset.description}
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Team · {activeCount} active of {dataset.employees.length}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="bg-[#F9FAFB] text-[11px] uppercase text-[#6B7280]">
                  <th className="rounded-l-md px-2 py-1.5 font-semibold">Name</th>
                  <th className="px-2 py-1.5 font-semibold">Role</th>
                  <th className="px-2 py-1.5 font-semibold">Skills</th>
                  <th className="px-2 py-1.5 font-semibold">Pay</th>
                  <th className="rounded-r-md px-2 py-1.5 font-semibold">Max hrs/wk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {dataset.employees.map((e) => (
                  <tr key={e.id} className="hover:bg-[#F9FAFB]">
                    <td className="px-2 py-1.5 font-medium text-[#111827]">{e.name}</td>
                    <td className="px-2 py-1.5 text-[#374151]">{e.role}</td>
                    <td className="px-2 py-1.5 text-[#374151]">
                      {e.skills.join(', ')}
                    </td>
                    <td className="tnum px-2 py-1.5 text-[#374151]">
                      {formatMoney(e.hourly_pay, dataset.currency_symbol)}/h
                    </td>
                    <td className="tnum px-2 py-1.5 text-[#374151]">
                      {e.max_weekly_hours}h
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Shift windows · repeat every day
          </p>
          <div className="flex flex-col gap-2">
            {shiftWindows.map(({ shift, requirement }) =>
              shift && requirement ? (
                <div
                  key={shift.id}
                  className="flex items-center justify-between gap-2 rounded-lg bg-[#F9FAFB] p-3"
                >
                  <div>
                    <p className="text-[13px] font-semibold text-[#111827]">
                      {shift.name}{' '}
                      <span className="tnum font-normal text-[#6B7280]">
                        {shift.start_time.slice(0, 5)}–{shift.end_time.slice(0, 5)}
                      </span>
                    </p>
                    <p className="text-[12px] text-[#4B5563]">
                      Needs {requirement.min_employees} people
                      {requirement.required_skills.length > 0
                        ? ` with ${requirement.required_skills.join(', ')} skills`
                        : ' — any role'}
                    </p>
                  </div>
                  <StatusBadge tone="neutral">
                    × {dataset.horizon_days} days
                  </StatusBadge>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ComparisonSection({ comparison }: { comparison: ScheduleComparison }) {
  const savings = savingsValue(comparison);
  const rows = comparisonRows(comparison);
  const namesById = new Map(
    comparison.optimized.employees.map((e) => [e.id, e.name] as const),
  );
  const crewByShift = new Map<string, string[]>();
  for (const a of comparison.optimized.assignments) {
    const list = crewByShift.get(a.shift_id) ?? [];
    list.push(namesById.get(a.employee_id) ?? a.employee_id);
    crewByShift.set(a.shift_id, list);
  }
  const dates = [...new Set(comparison.optimized.shifts.map((s) => s.shift_date))].sort();
  const optimizedMetrics = comparison.optimized.metrics;

  return (
    <>
      {/* Money Saved — the headline result, from real baseline vs optimized cost. */}
      <div className="flex flex-col gap-4 rounded-lg border border-[#A7F3D0] bg-[#ECFDF5] p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] text-[#15803D]">
            <CircleCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#15803D]">
              Money Saved · Baseline vs OptiShift
            </p>
            <p className="tnum text-[30px] font-semibold leading-[38px] tracking-tight text-[#111827]">
              {savings.value}
            </p>
            <p className="text-[13px] text-[#4B5563]">{savings.sub}</p>
          </div>
        </div>
        <p className="max-w-md text-[13px] leading-[19px] text-[#4B5563]">
          {comparison.summary}
        </p>
      </div>

      {/* Side-by-side comparison: every number straight from the two schedules. */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-[#111827]">
              Side-by-Side Comparison
            </h2>
            <p className="text-[12px] text-[#6B7280]">
              Manual baseline vs OptiShift ·{' '}
              {timeAgo(comparison.generated_at)}
            </p>
          </div>
          <StatusBadge tone="success">
            {comparison.optimized.solver.solver}
          </StatusBadge>
        </div>
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <div key={row.label} className="rounded-lg bg-[#F9FAFB] p-3">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#111827]">
                  {row.label}
                </span>
                <span
                  className={`tnum text-[12px] font-semibold ${
                    row.chipPositive ? 'text-[#15803D]' : 'text-[#B45309]'
                  }`}
                >
                  {row.chip}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="w-16 shrink-0 text-[#6B7280]">Baseline</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
                    <div
                      className="h-full rounded-full bg-[#9CA3AF]"
                      style={{ width: `${row.baselineWidth}%` }}
                    />
                  </div>
                  <span className="tnum w-20 shrink-0 text-right text-[#6B7280]">
                    {row.baseline}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="w-16 shrink-0 font-semibold text-[#166534]">
                    OptiShift
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
                    <div
                      className="h-full rounded-full bg-[#166534]"
                      style={{ width: `${row.optimizedWidth}%` }}
                    />
                  </div>
                  <span className="tnum w-20 shrink-0 text-right font-semibold text-[#166534]">
                    {row.optimized}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <details className="mt-3 rounded-md bg-[#F9FAFB] p-3">
          <summary className="cursor-pointer text-[13px] font-medium text-[#166534]">
            How each side was built
          </summary>
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-[12px] text-[#4B5563]">
            <li>{comparison.baseline.explanation[0]}</li>
            <li>
              OptiShift solved the same scenario with{' '}
              {comparison.optimized.solver.solver} ({comparison.optimized.solver.status}) — the
              same engine that powers your real schedule.
            </li>
          </ul>
        </details>
      </Card>

      {/* Optimized week at a glance. */}
      <section className="grid grid-cols-2 gap-2 md:grid-cols-4" aria-label="Optimized schedule metrics">
        <MetricCard
          label="Staff Cost"
          value={formatMoney(optimizedMetrics.total_labor_cost, comparison.currency_symbol)}
          sub={`${optimizedMetrics.shifts_staffed} of ${optimizedMetrics.shifts_total} shifts staffed`}
        />
        <MetricCard
          label="Total Hours"
          value={`${optimizedMetrics.total_hours} hrs`}
          sub="Scheduled across the demo team"
        />
        <MetricCard
          label="Extra Hours"
          value={`${optimizedMetrics.extra_hours_total} hrs`}
          sub={
            optimizedMetrics.extra_hours_total === 0
              ? 'Within normal limits'
              : 'Above normal limits'
          }
        />
        <MetricCard
          label="Coverage"
          value={`${Math.round((optimizedMetrics.shifts_staffed / Math.max(1, optimizedMetrics.shifts_total)) * 100)}%`}
          sub="Shifts meeting minimum staffing"
        />
      </section>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-[#111827]">
              Optimized week roster
            </h2>
            <p className="text-[12px] text-[#6B7280]">
              The OptiShift result for the demo scenario
            </p>
          </div>
          <StatusBadge tone="success">Optimal</StatusBadge>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-7">
          {dates.map((dateStr) => {
            const dayShifts = comparison.optimized.shifts
              .filter((s) => s.shift_date === dateStr)
              .sort((a, b) => a.start_time.localeCompare(b.start_time));
            return (
              <div key={dateStr} className="flex flex-col gap-2 rounded-lg bg-[#F9FAFB] p-2">
                <div className="px-1 pt-1">
                  <p className="text-[12px] font-semibold text-[#111827]">
                    {prettyDate(dateStr)}
                  </p>
                </div>
                {dayShifts.map((s) => {
                  const crew = crewByShift.get(s.id) ?? [];
                  return (
                    <div key={s.id} className="rounded-md border border-[#E5E7EB] bg-white p-2">
                      <p className="text-[12px] font-semibold text-[#111827]">{s.name}</p>
                      <p className="tnum text-[11px] text-[#6B7280]">
                        {s.start_time.slice(0, 5)}–{s.end_time.slice(0, 5)}
                      </p>
                      {crew.length > 0 ? (
                        <ul className="mt-1 flex flex-col gap-0.5">
                          {crew.map((name) => (
                            <li key={name} className="truncate text-[12px] text-[#374151]">
                              {name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <StatusBadge tone="warning">Unstaffed</StatusBadge>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

export default function DemoMode() {
  const navigate = useNavigate();
  const { dataset, loading, error, reload } = useDemoDataset();
  const {
    comparison: storedComparison,
    loading: comparisonLoading,
  } = useDemoComparison();
  // A fresh run replaces the stored comparison for this visit.
  const [freshComparison, setFreshComparison] = useState<ScheduleComparison | null>(null);
  const comparison = freshComparison ?? storedComparison;
  const [running, setRunning] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const [exiting, setExiting] = useState(false);

  async function run() {
    setRunError(null);
    setRunning(true);
    try {
      const res = await runDemo();
      if (res.has_comparison && res.comparison) {
        setFreshComparison(res.comparison);
      } else {
        setRunError('The demo finished but no comparison was returned. Please try again.');
      }
    } catch (e: unknown) {
      setRunError(friendlyErrorMessage(e));
    } finally {
      setRunning(false);
    }
  }

  async function exitDemo() {
    setExiting(true);
    try {
      await resetDemo();
    } catch {
      // Exiting is best-effort: the demo store is separate from user data.
    } finally {
      navigate('/');
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Demo Mode · UrbanBrew Café, Mumbai"
        title="See OptiShift on a sample business"
        subtitle="A ready-made café scenario with a realistic team, shift windows, and staffing needs. Demo Mode has its own data — your team and schedule are never changed."
        actions={
          <>
            <Link to="/">
              <SecondaryButton onClick={() => void exitDemo()} disabled={exiting}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {exiting ? 'Exiting…' : 'Exit Demo Mode'}
              </SecondaryButton>
            </Link>
            <PrimaryButton onClick={() => void run()} disabled={running || loading}>
              {comparison && !running ? (
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4" aria-hidden="true" />
              )}
              {running
                ? 'Running demo…'
                : comparison
                  ? 'Re-run Demo'
                  : 'Run Demo'}
            </PrimaryButton>
          </>
        }
      />

      {error && (
        <ErrorState
          title="Couldn't load the demo scenario."
          body={error}
          retry={<SecondaryButton onClick={reload}>Try again</SecondaryButton>}
        />
      )}

      {loading && !error && <LoadingState message="Loading the demo scenario..." />}

      {!loading && !error && dataset && (
        <>
          <ScenarioSection dataset={dataset} />

          {running && (
            <LoadingState message="Building the manual baseline, then optimizing with the real engine..." />
          )}

          {runError && (
            <ErrorState
              title="We couldn't build the demo schedule yet."
              body={runError}
              retry={<SecondaryButton onClick={() => void run()}>Try again</SecondaryButton>}
            />
          )}

          {comparisonLoading && !comparison && !running && (
            <LoadingState message="Checking for a previous demo run..." />
          )}

          {!comparisonLoading && !comparison && !running && !runError && (
            <EmptyState
              icon={<FlaskConical className="h-8 w-8" aria-hidden="true" />}
              title="Run the demo to see the value."
              body="OptiShift builds a manual-style baseline from this scenario, then solves the same scenario with the real optimization engine — and shows you the difference in staff cost, coverage, and workload."
              action={
                <PrimaryButton onClick={() => void run()}>
                  <Zap className="h-4 w-4" aria-hidden="true" />
                  Run Demo Now
                </PrimaryButton>
              }
            />
          )}

          {comparison && <ComparisonSection comparison={comparison} />}
        </>
      )}

      {!loading && !error && !dataset && (
        <EmptyState
          icon={<Users className="h-8 w-8" aria-hidden="true" />}
          title="The demo scenario isn't available right now."
          body="Try again in a moment — the demo data comes from the OptiShift backend."
          action={<SecondaryButton onClick={reload}>Try again</SecondaryButton>}
        />
      )}
    </>
  );
}
