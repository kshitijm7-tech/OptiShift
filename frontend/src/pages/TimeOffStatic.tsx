// Auto-generated from ui/optishift_time_off/code.html

export default function TimeOff() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">

<div className="sticky top-0 z-30 mb-space-lg flex items-center justify-between rounded-lg bg-surface-container-low px-space-md py-space-xs shadow-sm">
<div className="flex items-center gap-space-sm overflow-x-auto py-1">
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider pr-space-xs">
<span className="material-symbols-outlined text-body-md text-primary">tune</span>
<span>State Simulator:</span>
</div>
<button className="state-pill px-space-md py-1 rounded-full text-label-sm font-label-md transition-colors bg-primary text-on-primary font-semibold shadow-sm" id="btn-state-default">
        Default (Pending Triage)
      </button>
<button className="state-pill px-space-md py-1 rounded-full text-label-sm font-label-md transition-colors bg-surface-container hover:bg-surface-container-high text-on-surface-variant" id="btn-state-approve-modal">
        Approve Flow Modal
      </button>
<button className="state-pill px-space-md py-1 rounded-full text-label-sm font-label-md transition-colors bg-surface-container hover:bg-surface-container-high text-on-surface-variant" id="btn-state-impact-warning">
        Schedule Impact Warning
      </button>
<button className="state-pill px-space-md py-1 rounded-full text-label-sm font-label-md transition-colors bg-surface-container hover:bg-surface-container-high text-on-surface-variant" id="btn-state-updating">
        Updating Schedule...
      </button>
<button className="state-pill px-space-md py-1 rounded-full text-label-sm font-label-md transition-colors bg-surface-container hover:bg-surface-container-high text-on-surface-variant" id="btn-state-updated-success">
        Schedule Updated Success
      </button>
<button className="state-pill px-space-md py-1 rounded-full text-label-sm font-label-md transition-colors bg-surface-container hover:bg-surface-container-high text-on-surface-variant" id="btn-state-conflict">
        No Replacement Conflict
      </button>
<button className="state-pill px-space-md py-1 rounded-full text-label-sm font-label-md transition-colors bg-surface-container hover:bg-surface-container-high text-on-surface-variant" id="btn-state-empty">
        Empty State
      </button>
</div>
<div className="hidden lg:flex items-center gap-1.5 pl-space-md text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span>Solver Engine Active</span>
</div>
</div>

<div className="space-y-space-sm mb-space-lg" id="toast-container">

<div className="hidden items-center justify-between p-space-md rounded-lg bg-secondary-container/60 text-on-secondary-container shadow-sm transition-all duration-300" id="toast-success">
<div className="flex items-center gap-space-md">
<div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-body-md">verified</span>
</div>
<div>
<span className="font-label-md text-label-md font-semibold text-primary block">Schedule automatically rebalanced</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Priya's time off is now reflected. <strong>Rahul V.</strong> has been assigned to Friday Morning (7:00–15:30) with 0 overtime impact.</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm hover:bg-surface-container shadow-sm transition-colors">Dismiss</button>
<button className="px-space-md py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container shadow-sm transition-colors">View Schedule</button>
</div>
</div>

<div className="hidden items-center justify-between p-space-md rounded-lg bg-error-container text-on-error-container shadow-sm transition-all duration-300" id="toast-conflict">
<div className="flex items-center gap-space-md">
<div className="w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-body-md">error_outline</span>
</div>
<div>
<span className="font-label-md text-label-md font-semibold text-error block">We couldn't auto-resolve shift coverage</span>
<span className="font-body-sm text-body-sm text-on-error-container">Friday, 18 Oct Morning shift lacks 1 certified Barista. All alternate qualified baristas are at weekly statutory hour maximums.</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm hover:bg-surface-container shadow-sm transition-colors">Dismiss</button>
<button className="px-space-md py-1 rounded-lg bg-error text-on-error font-label-sm text-label-sm font-semibold hover:opacity-95 shadow-sm transition-colors">Override &amp; Assign</button>
</div>
</div>

<div className="hidden items-center justify-between p-space-md rounded-lg bg-surface-container-high text-on-surface shadow-sm transition-all duration-300" id="toast-updating">
<div className="flex items-center gap-space-md">
<div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 animate-spin">
<span className="material-symbols-outlined text-body-md">sync</span>
</div>
<div>
<span className="font-label-md text-label-md font-semibold text-primary block">Running shift constraint solver...</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Scanning 14 staff availability profiles, role certifications, and overtime thresholds.</span>
</div>
</div>
<div className="w-32 bg-surface-container-lowest rounded-full h-2 overflow-hidden shadow-inner">
<div className="bg-primary h-full w-2/3 animate-pulse"></div>
</div>
</div>
</div>

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-xl">
<div>
<div className="flex items-center gap-space-sm">
<h1 className="font-headline-lg text-headline-lg font-semibold text-on-surface tracking-tight">Time Off</h1>
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold" id="header-badge">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          2 Requests Waiting
        </span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
        See when your team can't work and manage their leave requests.
      </p>
</div>

<div className="flex items-center gap-space-sm">
<button className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold shadow-sm transition-colors">
<span className="material-symbols-outlined text-body-lg text-secondary">auto_fix_high</span>
<span>Update Schedule</span>
</button>
<button className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-colors">
<span className="material-symbols-outlined text-body-lg">add</span>
<span>Add Time Off</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-space-md mb-space-xl">

<div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Review Queue</span>
<span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
</div>
<div className="my-space-xs flex items-baseline gap-space-xs">
<span className="font-metric-display text-metric-display text-on-surface font-semibold tracking-tight" id="metric-waiting-count">2</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">waiting approval</span>
</div>
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-body-sm text-primary">priority_high</span>
<span>Action before Friday roster run</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Active Today</span>
<span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">On Leave</span>
</div>
<div className="my-space-xs flex items-baseline gap-space-xs">
<span className="font-metric-display text-metric-display text-on-surface font-semibold tracking-tight">1</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">person off</span>
</div>
<div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface">
<span className="material-symbols-outlined text-body-sm text-secondary">person</span>
<span className="font-semibold">Priya Sharma</span>
<span className="text-on-surface-variant font-normal">· Personal (Full Day)</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Next 14 Days</span>
<span className="material-symbols-outlined text-on-surface-variant text-body-md">date_range</span>
</div>
<div className="my-space-xs flex items-baseline gap-space-xs">
<span className="font-metric-display text-metric-display text-on-surface font-semibold tracking-tight">3</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">upcoming leaves</span>
</div>
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-body-sm text-primary">check_circle</span>
<span>Already accommodated in draft</span>
</div>
</div>

<div className="bg-surface-container-low rounded-lg p-space-md shadow-sm flex flex-col justify-center">
<div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider mb-1">
<span className="material-symbols-outlined text-body-sm">hub</span>
<span>Smart Availability Sync</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
        Approved time off is locked as <strong>unavailable time</strong> in the solver. Shifts are reassigned using qualified staff to prevent overtime penalties.
      </p>
</div>
</div>

<section className="mb-space-xl" id="section-triage">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Needs Your Attention</h2>
<span className="px-space-xs py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold" id="triage-badge">2 waiting</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Review promptly to prevent scheduling bottlenecks</span>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md" id="triage-grid">

<div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm transition-all hover:shadow-md flex flex-col justify-between" id="card-priya">
<div>

<div className="flex items-start justify-between gap-space-md mb-space-md">
<div className="flex items-center gap-space-md">
<img className="w-10 h-10 rounded-full object-cover shadow-xs" data-alt="Professional headshot portrait of Priya Sharma, female senior barista with an approachable smile, modern cafe uniform, natural soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ5d09Ls122QAq1cJP8NP9b2cfycVyik85pSXxdFoD_57gknPR2pKQ9fcD978qwlKhjfqm3kO4022gNyRanNoRCunJpOFs09Ybl_fNmHZi6TsZzq9h9UkwLLeOemWGduz83qxNwKTCsrkkhwaD2qJzc8PwPleveGDh7JyVAQgwtIWGjhkzJ4FmenEa-OL6fM6dzEym60X8yu1IZVM6gpbZpYRrdFH1uO3rzFJDQEQRN9txoylc5d5y"/>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-body-lg font-semibold text-on-surface">Priya Sharma</span>
<span className="px-space-xs py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface-variant">Full-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Senior Barista · Level 2 Specialist</span>
</div>
</div>
<span className="px-space-sm py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium">Personal</span>
</div>

<div className="space-y-space-xs mb-space-md">
<div className="flex items-center gap-space-xs text-on-surface font-label-md text-label-md">
<span className="material-symbols-outlined text-body-md text-secondary">calendar_today</span>
<span className="font-semibold">Friday, 18 Oct · Full Day (1 day)</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant pl-6">
              "Need to attend a family function out of town."
            </p>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-high/60 flex items-start gap-space-sm mb-space-md">
<span className="material-symbols-outlined text-body-md text-error shrink-0 mt-0.5">warning</span>
<div className="flex-1">
<span className="font-label-sm text-label-sm font-semibold text-on-surface block">Scheduled for Morning Shift (7:00–15:30) on Friday</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Approving this leave will create 1 open slot. 2 alternative Baristas are available to swap.</span>
</div>
</div>
<div className="text-on-surface-variant font-label-sm text-label-sm mb-space-md flex items-center gap-1">
<span className="material-symbols-outlined text-label-md">schedule</span>
<span>Requested by Priya · Yesterday 9:18 AM</span>
</div>
</div>

<div className="flex items-center justify-between pt-space-sm">
<button className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-0.5">
            View shift history
            <span className="material-symbols-outlined text-body-sm">chevron_right</span>
</button>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
              Reject
            </button>
<button className="px-space-md py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-body-sm">check</span>
              Approve
            </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm transition-all hover:shadow-md flex flex-col justify-between" id="card-arjun">
<div>

<div className="flex items-start justify-between gap-space-md mb-space-md">
<div className="flex items-center gap-space-md">
<img className="w-10 h-10 rounded-full object-cover shadow-xs" data-alt="Crisp professional headshot of Arjun Patel, young South Asian male barista in dark apron, soft cafe background, confident friendly expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWPV6FJ93vjg2CkYiiUJykKtUTFfDECV44d8ZTr95VrGz4Aox1-_ahvPCNtsXfhPu5e5jTHgLWkVH_PYJFaoIH66sXCXl1Y3rb4SM6_P6nzcmxXuwfL9-tu04OtPxfZ47oot-jr9kGGq7qBIlYgWTt7Sg1qBU-P1h3qj7O103uj2iz7_BvkRloLw80LMgREPAHxXyvmSB2bIUhPDqDnDVgawbn47xaLPki9_CoEY8-GP1WfY3WKTFB"/>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-body-lg font-semibold text-on-surface">Arjun Patel</span>
<span className="px-space-xs py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface-variant">Part-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Junior Barista · Front Counter</span>
</div>
</div>
<span className="px-space-sm py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium">Education / Exam</span>
</div>

<div className="space-y-space-xs mb-space-md">
<div className="flex items-center gap-space-xs text-on-surface font-label-md text-label-md">
<span className="material-symbols-outlined text-body-md text-secondary">calendar_today</span>
<span className="font-semibold">Sunday, 20 Oct · Evening (15:00–23:30)</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant pl-6">
              "College semester mid-term exam on Monday morning."
            </p>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm mb-space-md">
<span className="material-symbols-outlined text-body-md text-secondary shrink-0 mt-0.5">check_circle</span>
<div className="flex-1">
<span className="font-label-sm text-label-sm font-semibold text-on-surface block">Not currently assigned to Sunday evening</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Zero roster adjustments. Approval will block him from automatic schedule fills.</span>
</div>
</div>
<div className="text-on-surface-variant font-label-sm text-label-sm mb-space-md flex items-center gap-1">
<span className="material-symbols-outlined text-label-md">schedule</span>
<span>Requested by Arjun · Today 8:30 AM</span>
</div>
</div>

<div className="flex items-center justify-between pt-space-sm">
<button className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-0.5">
            View shift history
            <span className="material-symbols-outlined text-body-sm">chevron_right</span>
</button>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
              Reject
            </button>
<button className="px-space-md py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-body-sm">check</span>
              Approve
            </button>
</div>
</div>
</div>
</div>

<div className="hidden bg-surface-container-lowest rounded-lg p-space-xl text-center shadow-sm" id="triage-empty">
<div className="w-12 h-12 rounded-full bg-secondary-container/60 text-primary mx-auto flex items-center justify-center mb-space-sm">
<span className="material-symbols-outlined text-headline-lg">task_alt</span>
</div>
<h3 className="font-headline-md text-headline-md font-semibold text-on-surface">You're all caught up!</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-md mx-auto">
        There are no pending time-off requests waiting for review. All future leaves are reflected in the current shift plan.
      </p>
<div className="mt-space-md">
<button className="px-space-md py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors">
          Add Time Off for Team
        </button>
</div>
</div>
</section>

<section className="mb-space-xl">
<div className="bg-gradient-to-r from-surface-container-low via-surface-container-lowest to-surface-container-low rounded-lg p-space-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-headline-md">sync_alt</span>
</div>
<div>
<div className="flex items-center gap-space-xs">
<h3 className="font-label-md text-headline-md font-semibold text-on-surface">Schedule may need updating</h3>
<span className="px-space-xs py-0.5 rounded text-label-sm font-label-sm bg-surface-container-highest text-on-surface font-medium">1 open shift</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-2xl">
            Priya Sharma is currently scheduled to work Friday Morning. Once approved, click <strong>Update Schedule</strong> to automatically find an available replacement with matching barista skills without adding overtime.
          </p>
</div>
</div>
<div className="shrink-0 flex items-center gap-space-sm">
<button className="w-full md:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-colors">
<span className="material-symbols-outlined text-body-lg">auto_fix_high</span>
<span>Update Schedule</span>
</button>
</div>
</div>
</section>

<section className="mb-space-xl">
<div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden">

<div className="p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Upcoming Approved Time Off</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Scheduled absences booked in advance across the next 30 days</p>
</div>
<div className="flex flex-wrap items-center gap-space-sm">

<div className="relative min-w-[220px]">
<span className="material-symbols-outlined absolute left-2.5 top-2.5 text-body-md text-on-surface-variant">search</span>
<input className="w-full h-9 pl-9 pr-space-md rounded-lg bg-surface-container-low text-on-surface text-body-sm font-body-sm placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container transition-colors" placeholder="Search team member..." type="text"/>
</div>

<div className="flex items-center bg-surface-container-low p-1 rounded-lg">
<button className="px-space-md py-1 rounded text-label-sm font-label-sm font-semibold bg-surface-container-lowest text-on-surface shadow-xs">All (5)</button>
<button className="px-space-md py-1 rounded text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface">Approved (3)</button>
<button className="px-space-md py-1 rounded text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface">Waiting (2)</button>
<button className="px-space-md py-1 rounded text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface">Past (12)</button>
</div>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low/60 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider h-9">
<th className="px-space-lg py-2 font-semibold">Team Member</th>
<th className="px-space-md py-2 font-semibold">Dates &amp; Duration</th>
<th className="px-space-md py-2 font-semibold">Reason</th>
<th className="px-space-md py-2 font-semibold">Origin</th>
<th className="px-space-md py-2 font-semibold">Status</th>
<th className="px-space-lg py-2 text-right font-semibold">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container">

<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="px-space-lg py-space-md">
<div className="flex items-center gap-space-md">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-md font-semibold">
                    RP
                  </div>
<div>
<span className="font-label-md text-label-md font-semibold text-on-surface block">Rahul Patil</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Shift Supervisor</span>
</div>
</div>
</td>
<td className="px-space-md py-space-md">
<span className="font-body-md text-body-md font-medium text-on-surface block">Mon, 21 Oct – Tue, 22 Oct</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">2 days · Full Days</span>
</td>
<td className="px-space-md py-space-md">
<span className="inline-flex items-center px-space-sm py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface font-medium">Family</span>
</td>
<td className="px-space-md py-space-md text-body-sm font-body-sm text-on-surface-variant">
                Added by Alex Morgan (Manager)
              </td>
<td className="px-space-md py-space-md">
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Approved
                </span>
</td>
<td className="px-space-lg py-space-md text-right">
<button className="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors" title="Manage entry">
<span className="material-symbols-outlined text-body-md">more_horiz</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="px-space-lg py-space-md">
<div className="flex items-center gap-space-md">
<img className="w-8 h-8 rounded-full object-cover" data-alt="Portrait of Sneha Roy, hospitality front-of-house specialist smiling warmly in contemporary coffee shop setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7QytCiP2d9vFXQRrgcz3-QHP7uOIeEJ8nYh8rnu_lIT83hwUAau6w7YXE0Tq9-4tY7dzDTOuVJIX68OZw3kIg5WmpseWkX9Kejmz9Y96hOsXuxKZzB0_wiTuMehiW7_XWns4GCeHjuj6nkopEyFjS1V7BpWSvq20LRl_4AUN86glBtrQk1AWLhIDV9wwFDrJ40XoDRbOfMYnh7z0YRB8jxMMey4FeOIfGFRLpkVvPvUlPY4NmLCCH"/>
<div>
<span className="font-label-md text-label-md font-semibold text-on-surface block">Sneha Roy</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Customer Service</span>
</div>
</div>
</td>
<td className="px-space-md py-space-md">
<span className="font-body-md text-body-md font-medium text-on-surface block">Saturday, 26 Oct</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">1 day · Full Day</span>
</td>
<td className="px-space-md py-space-md">
<span className="inline-flex items-center px-space-sm py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface font-medium">Vacation</span>
</td>
<td className="px-space-md py-space-md text-body-sm font-body-sm text-on-surface-variant">
                Requested by Sneha
              </td>
<td className="px-space-md py-space-md">
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Approved
                </span>
</td>
<td className="px-space-lg py-space-md text-right">
<button className="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors" title="Manage entry">
<span className="material-symbols-outlined text-body-md">more_horiz</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="px-space-lg py-space-md">
<div className="flex items-center gap-space-md">
<div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-label-md font-semibold">
                    DL
                  </div>
<div>
<span className="font-label-md text-label-md font-semibold text-on-surface block">David Lobo</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Kitchen &amp; Prep</span>
</div>
</div>
</td>
<td className="px-space-md py-space-md">
<span className="font-body-md text-body-md font-medium text-on-surface block">Wed, 30 Oct</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">1 day · Morning (7:00–12:00)</span>
</td>
<td className="px-space-md py-space-md">
<span className="inline-flex items-center px-space-sm py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface font-medium">Medical / Doctor</span>
</td>
<td className="px-space-md py-space-md text-body-sm font-body-sm text-on-surface-variant">
                Requested by David
              </td>
<td className="px-space-md py-space-md">
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Approved
                </span>
</td>
<td className="px-space-lg py-space-md text-right">
<button className="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors" title="Manage entry">
<span className="material-symbols-outlined text-body-md">more_horiz</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-space-lg py-space-md bg-surface-container-low/30 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span>Showing 3 upcoming scheduled absences</span>
<button className="hover:text-primary font-label-md text-label-md font-medium transition-colors">Download Leave Calendar (iCal/CSV) →</button>
</div>
</div>
</section>

<section className="mb-space-xl">
<div className="bg-surface-container-lowest rounded-lg shadow-sm p-space-lg">
<div className="flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-body-lg text-on-surface-variant" id="past-chevron">expand_more</span>
<div>
<h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Past Time Off</h3>
<span className="font-body-sm text-body-sm text-on-surface-variant">Archived time-off records for previous operational cycles</span>
</div>
</div>
<span className="px-space-sm py-1 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm">12 completed</span>
</div>
<div className="mt-space-md pt-space-md space-y-space-sm" id="past-content">
<div className="flex items-center justify-between py-space-xs px-space-sm rounded-lg hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-md">
<span className="font-label-md text-label-md font-semibold text-on-surface w-36">Ananya Rao</span>
<span className="font-body-sm text-body-sm text-on-surface-variant w-44">Thu, 10 Oct (1 day)</span>
<span className="px-space-sm py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface-variant">Sick Leave</span>
</div>
<div className="flex items-center gap-space-lg">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm font-semibold text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Approved
            </span>
<span className="text-on-surface-variant text-label-sm">Replaced by David L.</span>
</div>
</div>
<div className="flex items-center justify-between py-space-xs px-space-sm rounded-lg hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-md">
<span className="font-label-md text-label-md font-semibold text-on-surface w-36">Karan Mehta</span>
<span className="font-body-sm text-body-sm text-on-surface-variant w-44">Sun, 06 Oct (Evening)</span>
<span className="px-space-sm py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface-variant">Personal</span>
</div>
<div className="flex items-center gap-space-lg">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm font-semibold text-error">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
              Rejected
            </span>
<span className="text-on-surface-variant text-label-sm">Overlapping critical peak</span>
</div>
</div>
<div className="flex items-center justify-between py-space-xs px-space-sm rounded-lg hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-md">
<span className="font-label-md text-label-md font-semibold text-on-surface w-36">Sneha Roy</span>
<span className="font-body-sm text-body-sm text-on-surface-variant w-44">Fri, 27 Sep – Sat, 28 Sep</span>
<span className="px-space-sm py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-on-surface-variant">Vacation</span>
</div>
<div className="flex items-center gap-space-lg">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm font-semibold text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Approved
            </span>
<span className="text-on-surface-variant text-label-sm">Full team covered</span>
</div>
</div>
<div className="pt-space-sm text-center">
<button className="font-label-sm text-label-sm font-semibold text-primary hover:text-primary-container transition-colors">
            View full 6-month historical time-off audit log (12 entries) →
          </button>
</div>
</div>
</div>
</section>

<div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-xs p-space-md hidden" id="modal-add-timeoff">
<div className="bg-surface-container-lowest rounded-xl max-w-lg w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

<div className="p-space-lg flex items-center justify-between bg-surface-container-low/40">
<div>
<h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Add Time Off</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Record approved absence or manual block-out for a team member</p>
</div>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-body-lg">close</span>
</button>
</div>

<form className="p-space-lg space-y-space-md">

<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5">Team Member</label>
<div className="relative">
<select className="w-full h-10 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container focus:outline-none transition-colors appearance-none">
<option value="priya">Priya Sharma (Senior Barista)</option>
<option value="arjun">Arjun Patel (Junior Barista)</option>
<option value="rahul">Rahul Patil (Shift Supervisor)</option>
<option value="sneha">Sneha Roy (Customer Service)</option>
<option value="david">David Lobo (Kitchen &amp; Prep)</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none">arrow_drop_down</span>
</div>
</div>

<div className="grid grid-cols-2 gap-space-md">
<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5">Start Date</label>
<input className="w-full h-10 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container focus:outline-none transition-colors" type="date" value="2024-10-24"/>
</div>
<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5">End Date</label>
<input className="w-full h-10 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container focus:outline-none transition-colors" type="date" value="2024-10-24"/>
</div>
</div>

<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5">Time of Day</label>
<div className="grid grid-cols-3 gap-space-xs">
<label className="flex items-center justify-center p-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm font-semibold cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-on-primary transition-colors">
<input className="sr-only" name="time_duration" type="radio"/>
              Full Day
            </label>
<label className="flex items-center justify-center p-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm font-semibold cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-on-primary transition-colors">
<input className="sr-only" name="time_duration" type="radio"/>
              Morning Only
            </label>
<label className="flex items-center justify-center p-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm font-semibold cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-on-primary transition-colors">
<input className="sr-only" name="time_duration" type="radio"/>
              Evening Only
            </label>
</div>
</div>

<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5">Reason Category</label>
<div className="relative">
<select className="w-full h-10 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container focus:outline-none transition-colors appearance-none">
<option value="personal">Personal Leave</option>
<option value="sick">Sick / Medical</option>
<option value="vacation">Scheduled Vacation</option>
<option value="family">Family Emergency</option>
<option value="education">Exam / Academic</option>
<option value="other">Other</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none">arrow_drop_down</span>
</div>
</div>

<div>
<label className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5">Notes (Optional)</label>
<textarea className="w-full p-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant focus:bg-surface-container focus:outline-none transition-colors" placeholder="Add context or notes for shift supervisors..." rows={2}></textarea>
</div>

<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-body-md text-secondary">info</span>
<span>This will instantly reflect on the shift planning grid.</span>
</div>

<div className="flex items-center justify-end gap-space-sm pt-space-xs">
<button className="px-space-lg py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">
            Cancel
          </button>
<button className="px-space-xl py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-colors" type="submit">
            Save Time Off
          </button>
</div>
</form>
</div>
</div>

<div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-xs p-space-md hidden" id="modal-approve-flow">
<div className="bg-surface-container-lowest rounded-xl max-w-md w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
<div className="p-space-lg">
<div className="w-12 h-12 rounded-full bg-secondary-container/60 text-primary flex items-center justify-center mb-space-md">
<span className="material-symbols-outlined text-headline-lg">verified</span>
</div>
<h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Approve Time Off for Priya?</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Friday, 18 Oct · Full Day. Priya is currently assigned to <strong>Friday Morning (7:00–15:30)</strong>.
        </p>
<div className="mt-space-md p-space-md rounded-lg bg-surface-container-low space-y-space-xs text-on-surface font-body-sm text-body-sm">
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Recommended Replacement:</span>
<span className="font-semibold text-primary">Rahul V. (Barista L2)</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Weekly hours impact:</span>
<span className="font-semibold">32h → 40h (No overtime)</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant">Skills match:</span>
<span className="font-semibold text-primary">100% Certified</span>
</div>
</div>
<div className="mt-space-lg flex items-center justify-end gap-space-sm">
<button className="px-space-md py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
            Cancel
          </button>
<button className="px-space-lg py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-colors">
            Approve &amp; Reassign Shift
          </button>
</div>
</div>
</div>
</div>
</div>
    </div>
  );
}
