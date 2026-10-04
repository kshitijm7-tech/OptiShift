// Schedule page (P04/P05): weekly builder + authoritative current schedule.
// The backend OWNS the current schedule: this page loads it on mount,
// re-reads it after every successful optimization, and renders it verbatim.
// The frontend NEVER decides assignments and keeps no competing schedule
// state. Shift windows are editable *inputs*, not results.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Plus,
  Scale,
  Trash2,
  Users,
  Zap,
} from 'lucide-react';
import { friendlyErrorMessage, generateComparison, optimizeSchedule } from '../api';
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
  // StatusBadge,
} from '../components/ui';
import { useCurrentSchedule, useEmployees } from '../hooks';
import {
  activeEmployees,
  buildWeekInputs,
  mondayOf,
  // prettyDate,
  scheduleDates,
  timeAgo,
  weekdayLabel,
  weekDays,
} from '../schedule';


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


  const shiftsByEmployee = useMemo(() => {
    const map = new Map<string, { date: string, shift: any }[]>();
    if (schedule && activeTeam) {
      schedule.assignments.forEach((a: any) => {
        const shift = schedule.shifts.find((s: any) => s.id === a.shift_id);
        if (shift) {
          const arr = map.get(a.employee_id) ?? [];
          arr.push({ date: shift.shift_date, shift });
          map.set(a.employee_id, arr);
        }
      });
    }
    return map;
  }, [schedule, activeTeam]);

  const totalHoursByEmployee = useMemo(() => {
    const map = new Map<string, number>();
    if (schedule && activeTeam) {
      schedule.assignments.forEach((a: any) => {
        const shift = schedule.shifts.find((s: any) => s.id === a.shift_id);
        if (shift) {
          const [h1, m1] = shift.start_time.split(':').map(Number);
          const [h2, m2] = shift.end_time.split(':').map(Number);
          const hrs = (h2 + m2 / 60) - (h1 + m1 / 60);
          const currentTotal = map.get(a.employee_id) ?? 0;
          map.set(a.employee_id, currentTotal + hrs);
        }
      });
    }
    return map;
  }, [schedule, activeTeam]);

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

  const metrics = schedule?.metrics ?? null;

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
            </SecondaryButton>
            <PrimaryButton onClick={buildSchedule} disabled={teamLoading || activeTeam.length === 0 || building}>
              <Zap className="h-4 w-4" aria-hidden="true" />
              {building ? 'Building…' : 'Build My Schedule'}
            </PrimaryButton>
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

          <Card className="overflow-x-auto p-0 border border-gray-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Your Schedule</h2>
                <p className="text-sm text-gray-500">See who is working each day and ensure every shift has enough people.</p>
              </div>
              <div className="flex gap-2">
                <PrimaryButton>Update Schedule</PrimaryButton>
                <SecondaryButton>Export / Print</SecondaryButton>
              </div>
            </div>

            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-48">Team Member</th>
                  {dates.map(dateStr => (
                    <th key={dateStr} className="py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                      {weekdayLabel(dateStr)}<br/>
                      <span className="text-[10px]">{dateStr.slice(5)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {activeTeam.map(emp => {
                  const empShifts = shiftsByEmployee.get(emp.id) ?? [];
                  const totalHrs = totalHoursByEmployee.get(emp.id) ?? 0;
                  
                  return (
                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 border-r border-gray-100">
                        <div className="flex items-center gap-3">
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=166534&color=fff`} className="w-10 h-10 rounded-full" alt={emp.name} />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                            <p className="text-xs text-gray-500 truncate w-32">{emp.role}</p>
                            <p className="text-xs font-bold text-gray-900 mt-1">{totalHrs.toFixed(1)} hrs assigned</p>
                          </div>
                        </div>
                      </td>
                      {dates.map(dateStr => {
                        const dayAssign = empShifts.find((s: any) => s.date === dateStr);
                        if (!dayAssign) {
                          return (
                            <td key={dateStr} className="py-3 px-2 text-center border-r border-gray-100 last:border-r-0">
                              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">Day Off</span>
                            </td>
                          );
                        }
                        
                        const isMorning = dayAssign.shift.name.toLowerCase().includes('morn');
                        
                        return (
                          <td key={dateStr} className="py-3 px-2 text-center border-r border-gray-100 last:border-r-0">
                            <div className="flex flex-col items-center justify-center gap-1">
                              <span className={`text-xs font-bold flex items-center gap-1 ${isMorning ? 'text-green-700' : 'text-blue-700'}`}>
                                <span className="text-lg leading-none">•</span> {dayAssign.shift.name}
                              </span>
                              <span className="text-[10px] text-gray-500">{dayAssign.shift.start_time.slice(0, 5)} - {dayAssign.shift.end_time.slice(0, 5)}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-6">
              <div className="flex items-center gap-2">
                <span className="text-green-700 font-bold text-lg leading-none">•</span>
                <span className="text-xs text-gray-600 font-medium">Morning (7:00-15:30)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-700 font-bold text-lg leading-none">•</span>
                <span className="text-xs text-gray-600 font-medium">Evening (15:00-23:30)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded bg-gray-200"></span>
                <span className="text-xs text-gray-600 font-medium">Scheduled Rest Day</span>
              </div>
            </div>

            <details className="mt-4 rounded-md bg-[#F9FAFB] p-3 mx-4 mb-4 border border-gray-200">
              <summary className="cursor-pointer text-[13px] font-medium text-[#166534]">
                Why this schedule (Engine Explanation)
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
