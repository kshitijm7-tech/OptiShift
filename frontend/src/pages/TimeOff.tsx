// Time Off page (P04): Stitch shell + status UI + empty state.
// Approval workflow, schedule impact, and re-optimization are P07 scope:
// this page shows the boundary honestly instead of faking approvals.
import { CalendarClock } from 'lucide-react';
import { EmptyState, NoticeState, PageHeader } from '../components/ui';

export default function TimeOff() {
  return (
    <>
      <PageHeader
        eyebrow="Leave management"
        title="Time Off"
        subtitle="See when your team can't work and manage their leave requests."
      />

      <NoticeState
        tone="info"
        title="Approvals arrive in P07."
        body="The review queue, approve/reject actions, and automatic schedule rebalancing will be wired to the backend in the Leave + Approval phase. Nothing on this page is functional yet."
      />

      <EmptyState
        icon={<CalendarClock className="h-8 w-8" aria-hidden="true" />}
        title="No time-off requests."
        body="When a team member requests leave, it will appear here with its coverage impact."
      />
    </>
  );
}
