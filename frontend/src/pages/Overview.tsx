// Overview page (P04/P05/P06): Stitch Overview screen wired to real data.
// Active Team comes from the team API; coverage, cost, extra hours, and
// balance come from the ONE authoritative current schedule (backend-owned).
// Money Saved appears only when a real baseline comparison exists for the
// current schedule — it is never assumed or invented.
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  CalendarPlus,
  CircleCheck,
  Inbox,
  Zap,
} from 'lucide-react';
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
import { useComparison, useCurrentSchedule, useEmployees } from '../hooks';
import { formatMoney, prettyDate, timeAgo, toDateStr } from '../schedule';

export default function Overview() {
  const { employees, loading, error, reload } = useEmployees();
  const {
    schedule,
    loading: scheduleLoading,
    error: scheduleError,
    reload: reloadSchedule,
  } = useCurrentSchedule();
  const { comparison: storedComparison } = useComparison();
  // Only a comparison of THIS current schedule counts; anything else stays "—".
  const comparison =
    storedComparison && schedule && storedComparison.optimized.id === schedule.id
      ? storedComparison
      : null;
  const saved = comparison?.improvements.cost_saved ?? null;
  const savingsSymbol = comparison?.currency_symbol ?? '₹';

  const activeCount = employees.filter(
    (e) => (e.status || '').toLowerCase() === 'active',
  ).length;

  const metrics = schedule?.metrics ?? null;
  const coveragePct =
    metrics && metrics.shifts_total > 0
      ? Math.round((metrics.shifts_staffed / metrics.shifts_total) * 100)
      : null;
  const gaps =
    metrics != null ? metrics.shifts_total - metrics.shifts_staffed : null;
  const spread =
    metrics != null
      ? Math.round(
          (metrics.max_hours_per_employee - metrics.min_hours_per_employee) *
            10,
        ) / 10
      : null;

  const namesById = new Map(
    (schedule?.employees ?? []).map((e) => [e.id, e.name] as const),
  );
  const todayStr = toDateStr(new Date());
  const todayShifts = (schedule?.shifts ?? [])
    .filter((s) => s.shift_date === todayStr)
    .sort((a, b) => a.start_time.localeCompare(b.start_time));
  const crewByShift = new Map<string, string[]>();
  for (const a of schedule?.assignments ?? []) {
    if (!a.shift_id.endsWith(todayStr)) continue;
    const list = crewByShift.get(a.shift_id) ?? [];
    list.push(namesById.get(a.employee_id) ?? a.employee_id);
    crewByShift.set(a.shift_id, list);
  }

  return (
    <>
      <PageHeader
        eyebrow="UrbanBrew Café · Mumbai"
        title="Good morning, Alex"
        subtitle={
          schedule
            ? `Current schedule · last built ${timeAgo(schedule.generated_at)}`
            : "Here's how your team and schedule are looking today."
        }
        actions={
          <>
            <Link to="/schedule">
              <SecondaryButton>
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                View Schedule
              </SecondaryButton>
            </Link>
            <Link to="/schedule">
              <PrimaryButton>
                <Zap className="h-4 w-4" aria-hidden="true" />
                Build My Schedule
              </PrimaryButton>
            </Link>
          </>
        }
      />

      {error && (
        <ErrorState
          title="Couldn't load your team."
          body={error}
          retry={<SecondaryButton onClick={reload}>Try again</SecondaryButton>}
        />
      )}

      {scheduleError && (
        <ErrorState
          title="Couldn't load the current schedule."
          body={scheduleError}
          retry={
            <SecondaryButton onClick={() => void reloadSchedule()}>
              Try again
            </SecondaryButton>
          }
        />
      )}

      {scheduleLoading && (
        <LoadingState message="Loading your schedule..." />
      )}

      <section
        className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6"
        aria-label="Key metrics"
      >
        <MetricCard
          label="Active Team"
          value={loading ? '…' : `${activeCount}`}
          sub={
            loading
              ? 'Checking your team…'
              : activeCount === 1
                ? '1 person ready'
                : `${activeCount} people ready`
          }
        />
        <MetricCard
          label="Staffing Covered"
          value={coveragePct == null ? '—' : `${coveragePct}%`}
          sub={
            metrics
              ? `${metrics.shifts_staffed} of ${metrics.shifts_total} shifts staffed`
              : 'Available after scheduling'
          }
          unavailable={coveragePct == null}
        />
        <MetricCard
          label="Staff Cost"
          value={
            metrics ? `₹${metrics.total_labor_cost.toFixed(2)}` : '—'
          }
          sub={
            metrics
              ? 'From the current schedule'
              : 'Available after scheduling'
          }
          unavailable={metrics == null}
        />
        <MetricCard
          label="Extra Hours"
          value={metrics ? `${metrics.extra_hours_total} hrs` : '—'}
          sub={
            metrics
              ? metrics.extra_hours_total === 0
                ? 'Within normal limits'
                : 'Above normal limits'
              : 'Available after scheduling'
          }
          unavailable={metrics == null}
        />
        <MetricCard
          label="Money Saved"
          value={
            saved == null
              ? '—'
              : saved > 0
                ? `${formatMoney(saved, savingsSymbol)} saved`
                : saved === 0
                  ? `${formatMoney(0, savingsSymbol)} saved`
                  : `${formatMoney(Math.abs(saved), savingsSymbol)} added`
          }
          sub={
            saved == null
              ? 'Run a baseline comparison to see savings'
              : saved > 0
                ? `vs manual baseline${comparison?.improvements.cost_saved_percent != null ? ` · ${comparison.improvements.cost_saved_percent}% lower cost` : ''}`
                : saved === 0
                  ? 'Same staff cost as the manual baseline'
                  : 'Staff cost increased vs the baseline'
          }
          unavailable={saved == null}
        />
        <MetricCard
          label="Work Balance"
          value={spread == null ? '—' : `${spread} hrs`}
          sub={
            metrics
              ? `Largest–smallest workload · peak ${metrics.max_hours_per_employee}h`
              : 'Available after scheduling'
          }
          unavailable={spread == null}
        />
      </section>

      {schedule && gaps != null && gaps === 0 && (
        <NoticeState
          tone="success"
          title="All required shifts covered."
          body="Every shift in the current schedule meets its minimum staffing."
        />
      )}
      {schedule && gaps != null && gaps > 0 && (
        <NoticeState
          tone="warning"
          title={`${gaps} shift${gaps === 1 ? '' : 's'} need${gaps === 1 ? 's' : ''} attention.`}
          body="Some shifts in the current schedule are short on staff. Open the schedule to review them."
        />
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-semibold text-[#111827]">
                  Today's Shifts & Daily Staffing
                </h2>
                <p className="text-[12px] text-[#6B7280]">
                  {schedule
                    ? `Today · ${prettyDate(todayStr)}`
                    : 'Staffing detail appears here once a schedule exists.'}
                </p>
              </div>
              {schedule && <StatusBadge tone="success">Current</StatusBadge>}
            </div>
            {!schedule && (
              <EmptyState
                icon={<CalendarPlus className="h-8 w-8" aria-hidden="true" />}
                title="Your schedule hasn't been built yet."
                body="OptiShift will build the weekly roster from your team, their availability, and your staffing needs — with zero overtime by default."
                action={
                  <Link to="/schedule">
                    <PrimaryButton>
                      <Zap className="h-4 w-4" aria-hidden="true" />
                      Build My Schedule Now
                    </PrimaryButton>
                  </Link>
                }
              />
            )}
            {schedule && todayShifts.length === 0 && (
              <EmptyState
                icon={<CalendarPlus className="h-8 w-8" aria-hidden="true" />}
                title="No shifts scheduled for today."
                body="The current schedule has no shifts on today's date. Open the schedule to review the full week."
                action={
                  <Link to="/schedule">
                    <SecondaryButton>
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      View Schedule
                    </SecondaryButton>
                  </Link>
                }
              />
            )}
            {schedule && todayShifts.length > 0 && (
              <div className="flex flex-col gap-2">
                {todayShifts.map((s) => {
                  const crew = crewByShift.get(s.id) ?? [];
                  return (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-2 rounded-lg bg-[#F9FAFB] p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-[#111827]">
                          {s.name}{' '}
                          <span className="tnum font-normal text-[#6B7280]">
                            {s.start_time.slice(0, 5)}–{s.end_time.slice(0, 5)}
                          </span>
                        </p>
                        <p className="truncate text-[12px] text-[#4B5563]">
                          {crew.length > 0 ? crew.join(', ') : 'Unstaffed'}
                        </p>
                      </div>
                      {crew.length > 0 ? (
                        <StatusBadge tone="success">
                          {crew.length} staffed
                        </StatusBadge>
                      ) : (
                        <StatusBadge tone="warning">Needs attention</StatusBadge>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
        <div className="lg:col-span-5">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#111827]">
                Recent Team Activity
              </h2>
            </div>
            {!schedule && (
              <EmptyState
                icon={<Inbox className="h-8 w-8" aria-hidden="true" />}
                title="No recent activity yet."
                body="Schedule runs, time-off requests, and team changes will show up here."
              />
            )}
            {schedule && metrics && (
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-[#ECFDF5] p-1.5 text-[#15803D]">
                    <CircleCheck className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-semibold text-[#111827]">
                        Schedule built
                      </span>
                      <span
                        className="tnum shrink-0 text-[12px] text-[#6B7280]"
                        title={new Date(schedule.generated_at).toLocaleString()}
                      >
                        {timeAgo(schedule.generated_at)}
                      </span>
                    </div>
                    <p className="tnum truncate text-[12px] text-[#6B7280]">
                      {schedule.assignments.length} assignments · ₹
                      {metrics.total_labor_cost.toFixed(2)} staff cost
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
