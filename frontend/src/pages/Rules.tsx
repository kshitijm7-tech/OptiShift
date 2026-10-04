// Rules page (P04): product rules in customer language.
// Describes what the P03 engine actually enforces (H1–H6 + objective) —
// no raw solver internals, no editing UI (rule customization is P08).
import { Info } from 'lucide-react';
import {
  Card,
  NoticeState,
  PageHeader,
  StatusBadge,
} from '../components/ui';

const MUST_HAVE = [
  {
    title: 'Availability first',
    body: 'Nobody is scheduled outside the hours they can actually work. An empty availability means open availability.',
  },
  {
    title: 'Right skills, right role',
    body: 'Every shift is filled only by people who hold each required skill — and the required role when you set one.',
  },
  {
    title: 'One shift per day',
    body: 'Nobody works two shifts on the same day, so overlapping or back-to-back double shifts are impossible.',
  },
  {
    title: 'Weekly hour limits respected',
    body: 'Assigned hours never exceed a person\u2019s max weekly hours. That is why extra hours stay at zero.',
  },
  {
    title: 'Minimum staffing guaranteed',
    body: 'Every shift meets its minimum headcount — or the run is reported infeasible instead of silently understaffed.',
  },
  {
    title: 'Only active team scheduled',
    body: 'Inactive team members are never assigned, no matter how cheap or skilled they are.',
  },
];

const NICE_TO_HAVE = [
  {
    title: 'Lowest fair cost',
    body: 'Among all rule-compliant rosters, the engine picks the cheapest one (hourly pay × shift length).',
  },
  {
    title: 'Balanced workload',
    body: 'Hours spread evenly across the team instead of piling onto the same people.',
  },
  {
    title: 'Every result independently checked',
    body: 'A separate validator re-checks all six rules on the solved schedule before it is returned.',
  },
];

export default function Rules() {
  return (
    <>
      <PageHeader
        eyebrow="Scheduling rules"
        title="Rules"
        subtitle="Tell OptiShift how scheduling should work. Must-have requirements always win; then the most balanced, cost-effective roster is built."
      />

      <NoticeState
        tone="info"
        title="Tune these rules in Custom Mode."
        body="Custom Mode lets you set staffing minimums, required skills, shifts, and cost/balance priorities — then builds a real schedule with this engine."
      />

      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-semibold text-[#111827]">
              Must-have requirements
            </h2>
            <StatusBadge tone="success">Always enforced</StatusBadge>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            {MUST_HAVE.map((r) => (
              <Card key={r.title}>
                <p className="mb-1 text-[13px] font-semibold text-[#111827]">
                  {r.title}
                </p>
                <p className="text-[13px] text-[#4B5563]">{r.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-semibold text-[#111827]">
              Optimization goals
            </h2>
            <StatusBadge tone="info">Balanced automatically</StatusBadge>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {NICE_TO_HAVE.map((r) => (
              <Card key={r.title}>
                <p className="mb-1 text-[13px] font-semibold text-[#111827]">
                  {r.title}
                </p>
                <p className="text-[13px] text-[#4B5563]">{r.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <div className="flex items-start gap-2">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-[#166534]"
              aria-hidden="true"
            />
            <p className="text-[13px] text-[#4B5563]">
              If your rules are stricter than your team allows — for example
              three people needed but only two qualified and available — the
              optimizer reports the schedule as infeasible and tells you
              exactly which shift is short, instead of guessing.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
