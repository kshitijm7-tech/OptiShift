// Schedule page (P04): weekly schedule builder + real optimizer results.
// The frontend NEVER decides assignments: it sends team + shifts +
// staffing needs to POST /api/v1/optimize and renders the backend answer.
// Shift windows below are editable *inputs* (manager's business needs),
// not results — every displayed assignment and metric comes from the API.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Users,
  Zap,
} from 'lucide-react';
import { friendlyErrorMessage, optimizeSchedule } from '../api';
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
import { useEmployees } from '../hooks';
import {
  activeEmployees,
  buildWeekInputs,
  mondayOf,
  toDateStr,
  weekDays,
} from '../schedule';
import type {
  Employee,
  OptimizationResult,
  Shift,
} from '../types';

interface ShiftWindow {
  key: number;
  name: string;
  start: string;
  end: string;
  minStaff: number;
  skills: string;
}

const DEFAULT_WINDOWS: ShiftWindow[] = [
  { key: 1, name: 'Morning', start: '08:00', end: '12:00', minStaff: 1, skills: '' },
  { key: 2, name: 'Afternoon', start: '12:00', end: '16:00', minStaff: 1, skills: '' },
  { key: 3, name: 'Evening', start: '16:00', end: '20:00', minStaff: 1, skills: '' },
];

const WEEKDAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Schedule() {
  const { employees, loading: teamLoading, error: teamError, reload } = useEmployees();
  const [weekOffset, setWeekOffset] = useState(0);
  const [windows, setWindows] = useState<ShiftWindow[]>(DEFAULT_WINDOWS);
  const [phase, setPhase] = useState<'idle' | 'building' | 'done'>('idle');
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [problem, setProblem] = useState<{ shifts: Shift[] } | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  const weekStart = useMemo(() => {
    const m = mondayOf(new Date());
    m.setDate(m.getDate() + weekOffset * 7);
    return m;
  }, [weekOffset]);

  const days = useMemo(() => weekDays(weekStart), [weekStart]);

  const weekLabel = useMemo(() => {
    const fmt = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(days[0])} – ${fmt(days[6])}`;
  }, [days]);

  const activeTeam = useMemo(() => activeEmployees(employees), [employees]);

  const namesById = useMemo(() => {
    const map = new Map<string, Employee>();
    for (const e of employees) map.set(e.id, e);
    return map;
  }, [employees]);

  function updateWindow(key: number, patch: Partial<ShiftWindow>) {
    setWindows((ws) => ws.map((w) => (w.key === key ? { ...w, ...patch } : w)));
  }

  function addWindow() {
    setWindows((ws) => {
      if (ws.length >= 6) return ws;
      const key = Math.max(...ws.map((w) => w.key)) + 1;
      return [...ws, { key, name: 'Night', start: '20:00', end: '23:00', minStaff: 1, skills: '' }];
    });
  }

  function removeWindow(key: number) {
    setWindows((ws) => (ws.length <= 1 ? ws : ws.filter((w) => w.key !== key)));
  }

  async function buildSchedule() {
    setFailure(null);
    setResult(null);
    setProblem(null);
    if (activeTeam.length === 0) return;
    const { shifts, requirements } = buildWeekInputs(
      days,
      windows.map((w) => ({
        name: w.name,
        start: w.start,
        end: w.end,
        minStaff: w.minStaff,
        skills: w.skills,
      })),
    );
    setPhase('building');
    try {
      const res = await optimizeSchedule({
        employees,
        shifts,
        requirements,
      });
      setProblem({ shifts });
      setResult(res);
      setPhase('done');
    } catch (e: unknown) {
      setFailure(friendlyErrorMessage(e));
      setPhase('done');
    }
  }

  const assignedByShift = useMemo(() => {
    const map = new Map<string, string[]>();
    if (result) {
      for (const a of result.assignments) {
        const list = map.get(a.shift_id) ?? [];
        const person = namesById.get(a.employee_id);
        list.push(person ? person.name : a.employee_id);
        map.set(a.shift_id, list);
      }
    }
    return map;
  }, [result, namesById]);

  return (
    <>
      <PageHeader
        eyebrow="Schedule workspace"
        title="Your Schedule"
        subtitle="See who is working each day and ensure every shift has enough people."
        actions={
          <>
            <SecondaryButton onClick={() => setWeekOffset((o) => o - 1)}>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Prev
            </SecondaryButton>
            <span className="tnum inline-flex h-9 items-center px-2 text-[13px] font-medium text-[#374151]">
              {weekLabel}
            </span>
            <SecondaryButton onClick={() => setWeekOffset((o) => o + 1)}>
              Next
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </SecondaryButton>
            <PrimaryButton onClick={buildSchedule} disabled={teamLoading || activeTeam.length === 0 || phase === 'building'}>
              <Zap className="h-4 w-4" aria-hidden="true" />
              {phase === 'building' ? 'Building…' : 'Build My Schedule'}
            </PrimaryButton>
          </>
        }
      />

      {teamError && (
        <ErrorState
          title="Couldn't load your team."
          body={teamError}
          retry={<SecondaryButton onClick={reload}>Try again</SecondaryButton>}
        />
      )}

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-[#111827]">
              Shift windows & staffing needs
            </h2>
            <p className="text-[12px] text-[#6B7280]">
              These repeat every day this week. {activeTeam.length} active team
              {activeTeam.length === 1 ? ' member' : ' members'} available to
              schedule.
            </p>
          </div>
          <SecondaryButton onClick={addWindow} disabled={windows.length >= 6}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add window
          </SecondaryButton>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F9FAFB] text-[11px] uppercase text-[#6B7280]">
                <th className="rounded-l-md px-3 py-2 font-semibold">Window</th>
                <th className="px-3 py-2 font-semibold">Start</th>
                <th className="px-3 py-2 font-semibold">End</th>
                <th className="px-3 py-2 font-semibold">Min staff</th>
                <th className="px-3 py-2 font-semibold">Required skills</th>
                <th className="rounded-r-md px-3 py-2" aria-label="Actions" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6] text-[13px]">
              {windows.map((w) => (
                <tr key={w.key} className="hover:bg-[#F9FAFB]">
                  <td className="px-3 py-2">
                    <input
                      value={w.name}
                      onChange={(e) => updateWindow(w.key, { name: e.target.value })}
                      className="h-9 w-32 rounded-md border border-[#D1D5DB] bg-white px-2 text-[#111827] focus:border-[#166534] focus:outline-none"
                      aria-label="Window name"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="time"
                      value={w.start}
                      onChange={(e) => updateWindow(w.key, { start: e.target.value })}
                      className="h-9 rounded-md border border-[#D1D5DB] bg-white px-2 text-[#111827] focus:border-[#166534] focus:outline-none"
                      aria-label="Window start"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="time"
                      value={w.end}
                      onChange={(e) => updateWindow(w.key, { end: e.target.value })}
                      className="h-9 rounded-md border border-[#D1D5DB] bg-white px-2 text-[#111827] focus:border-[#166534] focus:outline-none"
                      aria-label="Window end"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={w.minStaff}
                      onChange={(e) =>
                        updateWindow(w.key, { minStaff: Number(e.target.value) })
                      }
                      className="h-9 w-20 rounded-md border border-[#D1D5DB] bg-white px-2 text-[#111827] focus:border-[#166534] focus:outline-none"
                      aria-label="Minimum staff"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      value={w.skills}
                      onChange={(e) => updateWindow(w.key, { skills: e.target.value })}
                      placeholder="e.g. barista"
                      className="h-9 w-44 rounded-md border border-[#D1D5DB] bg-white px-2 text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#166534] focus:outline-none"
                      aria-label="Required skills, comma separated"
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => removeWindow(w.key)}
                      disabled={windows.length <= 1}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#B91C1C] disabled:opacity-40"
                      aria-label={`Remove ${w.name} window`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[12px] text-[#6B7280]">
          Leave skills blank to let any available team member qualify. The
          optimizer enforces availability, skills, hour limits, and one shift
          per person per day.
        </p>
      </Card>

      {phase === 'building' && (
        <LoadingState message="Building your schedule..." />
      )}

      {phase === 'idle' && !teamLoading && activeTeam.length === 0 && !teamError && (
        <EmptyState
          icon={<Users className="h-8 w-8" aria-hidden="true" />}
          title="No team members yet."
          body="Add your team first — OptiShift builds the schedule from real people, their availability, and their skills."
          action={
            <Link to="/team">
              <PrimaryButton>
                <Users className="h-4 w-4" aria-hidden="true" />
                Go to My Team
              </PrimaryButton>
            </Link>
          }
        />
      )}

      {phase === 'idle' && (teamLoading || activeTeam.length > 0) && (
        <EmptyState
          icon={<CalendarPlus className="h-8 w-8" aria-hidden="true" />}
          title="Your schedule hasn't been built yet."
          body="Set your shift windows above, then build the week. OptiShift solves it with real constraint optimization in seconds."
          action={
            <PrimaryButton onClick={buildSchedule} disabled={teamLoading || activeTeam.length === 0}>
              <Zap className="h-4 w-4" aria-hidden="true" />
              Build My Schedule Now
            </PrimaryButton>
          }
        />
      )}

      {failure && (
        <ErrorState
          title="Couldn't build the schedule."
          body={failure}
          retry={<SecondaryButton onClick={buildSchedule}>Try again</SecondaryButton>}
        />
      )}

      {result && result.status === 'infeasible' && (
        <ErrorState
          title="We couldn't build this schedule yet."
          body={`Staffing needs exceed what your team can cover. ${result.violations.join(' ')} Adjust the windows above and try again.`}
          retry={<SecondaryButton onClick={buildSchedule}>Try again</SecondaryButton>}
        />
      )}

      {result && result.status === 'optimal' && result.metrics && problem && (
        <>
          <section
            className="grid grid-cols-2 gap-2 md:grid-cols-4"
            aria-label="Schedule metrics"
          >
            <MetricCard
              label="Est. Staff Cost"
              value={`$${result.metrics.total_labor_cost.toFixed(2)}`}
              sub={`${result.metrics.shifts_staffed} of ${result.metrics.shifts_total} shifts staffed`}
            />
            <MetricCard
              label="Total Hours"
              value={`${result.metrics.total_hours} hrs`}
              sub={`Peak load ${result.metrics.max_hours_per_employee} hrs · lightest ${result.metrics.min_hours_per_employee} hrs`}
            />
            <MetricCard
              label="Extra Hours"
              value={`${result.metrics.extra_hours_total} hrs`}
              sub="Within normal limits"
            />
            <MetricCard
              label="Coverage"
              value={`${Math.round((result.metrics.shifts_staffed / Math.max(1, result.metrics.shifts_total)) * 100)}%`}
              sub="Shifts meeting minimum staffing"
            />
          </section>

          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-[#111827]">
                Week roster · solved by the optimization engine
              </h2>
              <StatusBadge tone="success">Optimal</StatusBadge>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-7">
              {days.map((day, di) => {
                const dateStr = toDateStr(day);
                const dayShifts = problem.shifts.filter((s) =>
                  s.id.endsWith(dateStr),
                );
                return (
                  <div
                    key={dateStr}
                    className="flex flex-col gap-2 rounded-lg bg-[#F9FAFB] p-2"
                  >
                    <div className="px-1 pt-1">
                      <p className="text-[12px] font-semibold text-[#111827]">
                        {WEEKDAY[di]}
                      </p>
                      <p className="tnum text-[11px] text-[#6B7280]">
                        {day.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    {dayShifts.map((s) => {
                      const crew = assignedByShift.get(s.id) ?? [];
                      return (
                        <div
                          key={s.id}
                          className="rounded-md border border-[#E5E7EB] bg-white p-2"
                        >
                          <p className="text-[12px] font-semibold text-[#111827]">
                            {s.name}
                          </p>
                          <p className="tnum text-[11px] text-[#6B7280]">
                            {s.start_time.slice(0, 5)}–{s.end_time.slice(0, 5)}
                          </p>
                          {crew.length > 0 ? (
                            <ul className="mt-1 flex flex-col gap-0.5">
                              {crew.map((name) => (
                                <li
                                  key={name}
                                  className="truncate text-[12px] text-[#374151]"
                                >
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
            <details className="mt-3 rounded-md bg-[#F9FAFB] p-3">
              <summary className="cursor-pointer text-[13px] font-medium text-[#166534]">
                Why this schedule
              </summary>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-[12px] text-[#4B5563]">
                {result.explanation.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </details>
          </Card>
        </>
      )}
    </>
  );
}
