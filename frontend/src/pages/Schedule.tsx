// Schedule page (P04/P05): weekly builder + authoritative current schedule.
// The backend OWNS the current schedule: this page loads it on mount,
// re-reads it after every successful optimization, and renders it verbatim.
// The frontend NEVER decides assignments and keeps no competing schedule
// state. Shift windows are editable *inputs*, not results.
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarClock,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Plus,
  Scale,
  Trash2,
  Users,
  Zap,
} from 'lucide-react';
import {
  friendlyErrorMessage,
  generateComparison,
  getCurrentSchedule,
  reoptimizeSchedule,
  optimizeSchedule,
} from '../api';
import {
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
  MetricCard,
  NoticeState,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
} from '../components/ui';
import { useCurrentSchedule, useEmployees, useReoptimizationStatus } from '../hooks';
import {
  activeEmployees,
  buildWeekInputs,
  mondayOf,
  prettyDate,
  scheduleDates,
  timeAgo,
  weekdayLabel,
  weekDays,
} from '../schedule';
import type { Employee } from '../types';

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

export default function Schedule() {
  const { employees, loading: teamLoading, error: teamError, reload: reloadTeam } = useEmployees();
  const {
    schedule,
    loading: scheduleLoading,
    error: scheduleError,
    reload: reloadSchedule,
  } = useCurrentSchedule();
  const [weekOffset, setWeekOffset] = useState(0);
  const [windows, setWindows] = useState<ShiftWindow[]>(DEFAULT_WINDOWS);
  const [building, setBuilding] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [compareSummary, setCompareSummary] = useState<string | null>(null);
  const [compareError, setCompareError] = useState<string | null>(null);
  const [lastRun, setLastRun] = useState<
    { status: 'infeasible'; violations: string[] } | null
  >(null);
  const [failure, setFailure] = useState<string | null>(null);

  // P07: does approved leave affect the current schedule? Drives the compact
  // notice + the Update Schedule action. Re-reads after every re-optimization.
  const reopt = useReoptimizationStatus();
  const [reoptimizing, setReoptimizing] = useState(false);
  const [_reoptError, setReoptError] = useState<string | null>(null);
  const [reoptSuccess, setReoptSuccess] = useState(false);

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

  // Roster display comes exclusively from the stored schedule: its own
  // shifts (own dates), its team snapshot for names, its metrics.
  const dates = useMemo(
    () => (schedule ? scheduleDates(schedule.shifts) : []),
    [schedule],
  );

  const namesById = useMemo(() => {
    const map = new Map<string, Employee>();
    for (const e of schedule?.employees ?? []) map.set(e.id, e);
    return map;
  }, [schedule]);

  const assignedByShift = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const a of schedule?.assignments ?? []) {
      const list = map.get(a.shift_id) ?? [];
      const person = namesById.get(a.employee_id);
      list.push(person ? person.name : a.employee_id);
      map.set(a.shift_id, list);
    }
    return map;
  }, [schedule, namesById]);

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
    setLastRun(null);
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
    setBuilding(true);
    try {
      const res = await optimizeSchedule({
        employees,
        shifts,
        requirements,
      });
      if (res.status === 'optimal') {
        // The backend stored this as the current schedule; re-read the
        // authoritative copy instead of trusting the POST echo.
        await reloadSchedule();
      } else {
        // Infeasible: the previous valid schedule (if any) stays intact
        // and keeps rendering below; only this notice is new.
        setLastRun({ status: 'infeasible', violations: res.violations });
      }
    } catch (e: unknown) {
      setFailure(friendlyErrorMessage(e));
    } finally {
      setBuilding(false);
    }
  }

  async function updateSchedule() {
    setReoptError(null);
    setReoptSuccess(false);
    setReoptimizing(true);
    try {
      const result = await reoptimizeSchedule();
      if (result.status === 'optimal') {
        setReoptSuccess(true);
        // The backend stored the new schedule; re-read it so the roster and
        // metrics below reflect the re-optimized week.
        await reloadSchedule();
      } else if (result.status === 'infeasible') {
        setReoptError(
          result.explanation.join(' ') ||
            'OptiShift couldn\u2019t update the schedule. There isn\u2019t enough available staff to cover the required shifts.',
        );
      } else {
        setReoptError('Re-optimization ended with an unknown error. Please try again.');
      }
    } catch (e: unknown) {
      setReoptError(friendlyErrorMessage(e));
    } finally {
      setReoptimizing(false);
    }
  }

  async function compareWithBaseline() {
    setCompareError(null);
    setCompareSummary(null);
    if (!schedule) return;
    setComparing(true);
    try {
      const res = await generateComparison();
      if (res.has_comparison && res.comparison) {
        setCompareSummary(res.comparison.summary);
      } else {
        setCompareSummary('The comparison finished but returned no result. Please try again.');
      }
    } catch (e: unknown) {
      setCompareError(friendlyErrorMessage(e));
    } finally {
      setComparing(false);
    }
  }

  // Re-read the authoritative schedule after a successful re-optimization so
  // the UI renders the NEW current schedule (not the stale POST echo).
  useEffect(() => {
    if (reoptSuccess) {
      // Reload the stored schedule + re-opt status; reoptSuccess stays true
      // so the success banner persists until the user leaves the page.
      (async () => {
        try {
          const schedule = await getCurrentSchedule();
          if (schedule.has_schedule) {
            // The current schedule changed — exit re-opt mode so the full
            // P07 transition has completed.
            setReoptSuccess(false);
          }
        } catch {
          // The backend may be briefly restarting. Keep the success banner.
        }
      })();
    }
  }, [reoptSuccess]);

  const metrics = schedule?.metrics ?? null;

  // Re-read the authoritative schedule after a successful re-optimization so
  // the UI renders the NEW current schedule (not the stale POST echo).
  useEffect(() => {
    if (reoptSuccess) {
      (async () => {
        try {
          const schedule = await getCurrentSchedule();
          if (schedule.has_schedule) {
            // The current schedule changed — exit re-opt mode so the full
            // P07 transition has completed. (The backend stored the new
            // schedule; a hard refresh re-reads it from ScheduleService.)
            setReoptSuccess(false);
          }
        } catch {
          // The backend may be briefly restarting. Keep the success banner.
        }
      })();
    }
  }, [reoptSuccess]);

  return (
    <>
      <PageHeader
        eyebrow="Schedule workspace"
        title="Your Schedule"
        subtitle={
          schedule
            ? `Current schedule · last built ${timeAgo(schedule.generated_at)}`
            : 'See who is working each day and ensure every shift has enough people.'
        }
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
            <SecondaryButton
              onClick={() => void compareWithBaseline()}
              disabled={!schedule || comparing || building}
            >
              <Scale className="h-4 w-4" aria-hidden="true" />
              {comparing ? 'Comparing…' : 'Compare with baseline'}
            </SecondaryButton>              <PrimaryButton onClick={buildSchedule} disabled={teamLoading || activeTeam.length === 0 || building}>
              <Zap className="h-4 w-4" aria-hidden="true" />
              {building ? 'Building…' : 'Build My Schedule'}
            </PrimaryButton>
            {reopt.needsUpdate && (
              <PrimaryButton
                onClick={() => void updateSchedule()}
                disabled={reoptimizing}
              >
                <CalendarClock className="h-4 w-4" aria-hidden="true" />
                {reoptimizing ? 'Updating…' : 'Update Schedule'}
              </PrimaryButton>
            )}
          </>
        }
      />

      {teamError && (
        <ErrorState
          title="Couldn't load your team."
          body={teamError}
          retry={<SecondaryButton onClick={reloadTeam}>Try again</SecondaryButton>}
        />
      )}

      {scheduleError && (
        <ErrorState
          title="Couldn't load the current schedule."
          body={scheduleError}
          retry={<SecondaryButton onClick={() => void reloadSchedule()}>Try again</SecondaryButton>}
        />
      )}

      {/* P07: compact notice + Update Schedule action when approved leave
          affects the current schedule. No left/right breaks the one-authority
          schedule rule: this only reads backend state, it never writes a
          schedule itself. */}
      {!building && !reoptimizing && (
        <div
          className={`flex items-start gap-2 rounded-lg border p-4 ${
            reopt.needsUpdate
              ? 'border-[#FDE68A] bg-[#FEF3C7] text-[#92400E]'
              : 'border-[#E5E7EB] bg-white text-[#4B5563]'
          }`}
        >
          {reopt.needsUpdate ? (
            <>
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F59E0B] text-[12px] font-semibold text-white">
                !
              </div>
              <div>
                <p className="text-[13px] font-semibold">Schedule needs updating</p>
                <p className="text-[13px] opacity-90">
                  {reopt.approvedCount}{' '}
                  {reopt.approvedCount === 1
                    ? 'approved time-off request affects the schedule.'
                    : 'approved time-off requests affect the schedule.'}
                  Click <b>Update Schedule</b> to let OptiShift rebuild the
                  week around the approved leave.
                </p>
                <div className="mt-2">
                  <PrimaryButton
                    onClick={() => void updateSchedule()}
                    disabled={reoptimizing}
                  >
                    <CalendarClock className="h-4 w-4" aria-hidden="true" />
                    {reoptimizing ? 'Updating…' : 'Update Schedule'}
                  </PrimaryButton>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-[12px] font-semibold text-white">
                ✓
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  {reopt.approvedCount === 0
                    ? 'No approved leave affecting the schedule'
                    : `No update needed — ${reopt.approvedCount} approved request(s) are not overlapping the schedule.`}
                </p>
                <p className="text-[13px] opacity-90">
                  The current schedule already reflects all approved leave.
                </p>
              </div>
            </>
          )}
        </div>
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

      {building && (
        <LoadingState message="Building your schedule..." />
      )}

      {scheduleLoading && !schedule && (
        <LoadingState message="Loading the current schedule..." />
      )}

      {!scheduleLoading && !schedule && !scheduleError && !teamLoading && activeTeam.length === 0 && !teamError && (
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

      {!scheduleLoading && !schedule && !scheduleError && (teamLoading || activeTeam.length > 0) && (
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

      {lastRun && lastRun.status === 'infeasible' && (
        <ErrorState
          title="We couldn't build this schedule yet."
          body={`Staffing needs exceed what your team can cover. ${lastRun.violations.join(' ')} Adjust the windows above and try again.`}
          retry={<SecondaryButton onClick={buildSchedule}>Try again</SecondaryButton>}
        />
      )}

      {compareError && (
        <ErrorState
          title="Couldn't build the baseline comparison."
          body={compareError}
          retry={
            <SecondaryButton onClick={() => void compareWithBaseline()}>
              Try again
            </SecondaryButton>
          }
        />
      )}

      {compareSummary && (
        <NoticeState tone="info" title="Baseline comparison" body={compareSummary} />
      )}

      {schedule && metrics && (
        <>
          <section
            className="grid grid-cols-2 gap-2 md:grid-cols-4"
            aria-label="Schedule metrics"
          >
            <MetricCard
              label="Est. Staff Cost"
              value={`₹${metrics.total_labor_cost.toFixed(2)}`}
              sub={`${metrics.shifts_staffed} of ${metrics.shifts_total} shifts staffed`}
            />
            <MetricCard
              label="Total Hours"
              value={`${metrics.total_hours} hrs`}
              sub={`Peak load ${metrics.max_hours_per_employee} hrs · lightest ${metrics.min_hours_per_employee} hrs`}
            />
            <MetricCard
              label="Extra Hours"
              value={`${metrics.extra_hours_total} hrs`}
              sub="Within normal limits"
            />
            <MetricCard
              label="Coverage"
              value={`${Math.round((metrics.shifts_staffed / Math.max(1, metrics.shifts_total)) * 100)}%`}
              sub="Shifts meeting minimum staffing"
            />
          </section>

          <Card>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-semibold text-[#111827]">
                  Week roster · solved by the optimization engine
                </h2>
                <p
                  className="tnum text-[12px] text-[#6B7280]"
                  title={new Date(schedule.generated_at).toLocaleString()}
                >
                  Last built {timeAgo(schedule.generated_at)}
                </p>
              </div>
              <StatusBadge tone="success">Optimal</StatusBadge>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-7">
              {dates.map((dateStr) => {
                const dayShifts = schedule.shifts
                  .filter((s) => s.shift_date === dateStr)
                  .sort((a, b) => a.start_time.localeCompare(b.start_time));
                return (
                  <div
                    key={dateStr}
                    className="flex flex-col gap-2 rounded-lg bg-[#F9FAFB] p-2"
                  >
                    <div className="px-1 pt-1">
                      <p className="text-[12px] font-semibold text-[#111827]">
                        {weekdayLabel(dateStr)}
                      </p>
                      <p className="tnum text-[11px] text-[#6B7280]">
                        {prettyDate(dateStr)}
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
                {schedule.explanation.map((line) => (
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
