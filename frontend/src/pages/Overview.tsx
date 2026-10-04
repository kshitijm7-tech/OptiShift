// Overview page (P04): Stitch Overview screen wired to real data.
// Only the Active Team KPI comes from the backend today. Every metric that
// needs a built schedule or baseline comparison shows an honest
// "not yet available" placeholder (P05/P06) — never a fabricated number.
import { Link } from 'react-router-dom';
import { CalendarDays, CalendarPlus, Inbox, Zap } from 'lucide-react';
import {
  Card,
  EmptyState,
  ErrorState,
  MetricCard,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
} from '../components/ui';
import { useEmployees } from '../hooks';

export default function Overview() {
  const { employees, loading, error, reload } = useEmployees();
  const activeCount = employees.filter(
    (e) => (e.status || '').toLowerCase() === 'active',
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="UrbanBrew Café · Mumbai"
        title="Good morning, Alex"
        subtitle="Here's how your team and schedule are looking today."
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
          value="—"
          sub="Available after scheduling · P05"
          unavailable
        />
        <MetricCard
          label="Staff Cost"
          value="—"
          sub="Available after scheduling · P05"
          unavailable
        />
        <MetricCard
          label="Extra Hours"
          value="—"
          sub="Available after scheduling · P05"
          unavailable
        />
        <MetricCard
          label="Money Saved"
          value="—"
          sub="Needs a baseline · Demo Mode P06"
          unavailable
        />
        <MetricCard
          label="Work Balance"
          value="—"
          sub="Available after scheduling · P05"
          unavailable
        />
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-semibold text-[#111827]">
                  Today's Shifts & Daily Staffing
                </h2>
                <p className="text-[12px] text-[#6B7280]">
                  Staffing detail appears here once a schedule exists.
                </p>
              </div>
            </div>
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
          </Card>
        </div>
        <div className="lg:col-span-5">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#111827]">
                Recent Team Activity
              </h2>
            </div>
            <EmptyState
              icon={<Inbox className="h-8 w-8" aria-hidden="true" />}
              title="No recent activity yet."
              body="Schedule runs, time-off requests, and team changes will show up here."
            />
          </Card>
        </div>
      </div>
    </>
  );
}
