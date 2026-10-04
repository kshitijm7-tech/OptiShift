// Auto-generated from ui/optishift_overview/code.html

export default function Overview() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">

<div className="w-full bg-surface-container-high/60 backdrop-blur-md px-space-md py-space-xs rounded-xl shadow-sm mb-space-lg flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary-container text-body-md">tune</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Store State Simulator:</span>
</div>
<div className="flex items-center gap-space-xs flex-wrap" id="state-selector-group">
<button className="px-space-md py-1 rounded-lg font-label-md text-label-md transition-all bg-primary-container text-on-primary shadow-sm" id="btn-state-ready" type="button">
        State A: Schedule Ready
      </button>
<button className="px-space-md py-1 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:bg-surface-container-lowest" id="btn-state-attention" type="button">
        State B: Attention Needed (Time Off)
      </button>
<button className="px-space-md py-1 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:bg-surface-container-lowest" id="btn-state-updating" type="button">
        State C: Needs Updating
      </button>
<button className="px-space-md py-1 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:bg-surface-container-lowest" id="btn-state-empty" type="button">
        State D: First Time (No Schedule)
      </button>
</div>
</div>

<div className="flex flex-col gap-space-xl" id="dashboard-content">

<header className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider font-semibold">Live Operational Sync</span>
<span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant" id="header-context">UrbanBrew Café · Mumbai · Week of Oct 14 – Oct 20</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight" id="header-greeting">Good morning, Alex</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant" id="header-subtitle">Here’s how your team and schedule are looking today.</p>
</div>

<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm" id="header-actions">
<button className="px-space-lg py-2.5 bg-surface-container-lowest text-on-surface rounded-lg font-label-md text-label-md shadow-sm hover:bg-surface-container transition-colors flex items-center justify-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-body-lg">calendar_month</span>
<span>View Schedule</span>
</button>
<div className="flex flex-col items-center">
<button className="w-full sm:w-auto px-space-lg py-2.5 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary transition-colors flex items-center justify-center gap-space-xs" id="primary-action-btn" type="button">
<span className="material-symbols-outlined text-body-lg">auto_fix_high</span>
<span id="primary-action-text">Update Schedule</span>
</button>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-center" id="primary-action-sub">Using latest team availability</span>
</div>
</div>
</header>

<div className="transition-all duration-300" id="state-banner-container">

</div>

<section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-sm" id="kpi-section">

<div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant font-semibold">Active Team</span>
<div>
<div className="font-metric-display text-metric-display text-on-surface tracking-tight" id="kpi-team">8 people</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs truncate">All active &amp; ready</p>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant font-semibold">Staffing Covered</span>
<div>
<div className="font-metric-display text-metric-display text-on-surface tracking-tight" id="kpi-coverage">100%</div>
<p className="font-body-sm text-body-sm text-on-secondary-container mt-space-xs truncate" id="kpi-coverage-sub">All planned shifts filled</p>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant font-semibold">Staff Cost</span>
<div>
<div className="font-metric-display text-metric-display text-on-surface tracking-tight" id="kpi-cost">₹42,680</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs truncate">Estimated 7-day cost</p>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant font-semibold">Extra Hours</span>
<div>
<div className="font-metric-display text-metric-display text-on-surface tracking-tight" id="kpi-overtime">0 hrs</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs truncate">Within normal limits</p>
</div>
</div>

<div className="bg-secondary-container/40 p-space-md rounded-lg shadow-sm flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-on-secondary-container font-semibold">Money Saved</span>
<div>
<div className="font-metric-display text-metric-display text-primary tracking-tight font-bold" id="kpi-savings">₹5,670</div>
<p className="font-body-sm text-body-sm text-on-secondary-container mt-space-xs truncate">vs. manual scheduling</p>
</div>
</div>

<div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
<span className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant font-semibold">Work Balance</span>
<div>
<div className="font-metric-display text-metric-display text-on-surface tracking-tight" id="kpi-balance">91 / 100</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs truncate">Evenly distributed</p>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg" id="main-schedule-workspace">

<div className="lg:col-span-7 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-sm bg-surface-container-low/30 -mx-space-lg px-space-lg -mt-space-lg pt-space-md rounded-t-xl">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary-container">search_off</span>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Today's Shifts &amp; Daily Staffing</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tuesday, Oct 15 · UrbanBrew Espresso &amp; Counter</p>
</div>
</div>
<span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-space-sm py-1 rounded-full font-semibold">
              7 / 7 Present Today
            </span>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-amber-700 text-body-md">wb_sunny</span>
<span className="font-label-md text-label-md font-semibold text-on-surface">Morning Shift</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">7:00 AM – 3:30 PM</span>
</div>
<span className="font-label-sm text-label-sm text-on-secondary-container bg-surface-container-lowest px-2 py-0.5 rounded-full font-medium">
                3 of 3 assigned · Fully staffed
              </span>
</div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs pt-1">
<div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs px-space-sm rounded-lg">
<div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">RV</div>
<div className="min-w-0 flex-1">
<div className="font-label-md text-label-md text-on-surface truncate">Rahul V.</div>
<div className="font-label-sm text-label-sm text-on-surface-variant truncate">Lead Barista</div>
</div>
</div>
<div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs px-space-sm rounded-lg">
<div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">AK</div>
<div className="min-w-0 flex-1">
<div className="font-label-md text-label-md text-on-surface truncate">Aisha K.</div>
<div className="font-label-sm text-label-sm text-on-surface-variant truncate">Counter Service</div>
</div>
</div>
<div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs px-space-sm rounded-lg">
<div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">VM</div>
<div className="min-w-0 flex-1">
<div className="font-label-md text-label-md text-on-surface truncate">Vikram M.</div>
<div className="font-label-sm text-label-sm text-on-surface-variant truncate">Kitchen Prep</div>
</div>
</div>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-indigo-700 text-body-md">nights_stay</span>
<span className="font-label-md text-label-md font-semibold text-on-surface">Evening Shift</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">3:00 PM – 11:30 PM</span>
</div>
<span className="font-label-sm text-label-sm text-on-secondary-container bg-surface-container-lowest px-2 py-0.5 rounded-full font-medium">
                4 of 4 assigned · Fully staffed
              </span>
</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs pt-1">
<div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs px-space-sm rounded-lg">
<div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">KN</div>
<div className="min-w-0 flex-1">
<div className="font-label-md text-label-md text-on-surface truncate">Kavita N.</div>
<div className="font-label-sm text-label-sm text-on-surface-variant truncate">Shift Supervisor</div>
</div>
</div>
<div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs px-space-sm rounded-lg">
<div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">AP</div>
<div className="min-w-0 flex-1">
<div className="font-label-md text-label-md text-on-surface truncate">Arjun P.</div>
<div className="font-label-sm text-label-sm text-on-surface-variant truncate">Barista</div>
</div>
</div>
<div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs px-space-sm rounded-lg">
<div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">SR</div>
<div className="min-w-0 flex-1">
<div className="font-label-md text-label-md text-on-surface truncate">Sneha R.</div>
<div className="font-label-sm text-label-sm text-on-surface-variant truncate">Cashier &amp; Floor</div>
</div>
</div>
<div className="flex items-center gap-space-xs bg-surface-container-lowest p-space-xs px-space-sm rounded-lg">
<div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">DL</div>
<div className="min-w-0 flex-1">
<div className="font-label-md text-label-md text-on-surface truncate">David L.</div>
<div className="font-label-sm text-label-sm text-on-surface-variant truncate">Counter Help</div>
</div>
</div>
</div>
</div>

<div className="flex items-center justify-between pt-space-xs text-on-surface-variant font-body-sm text-body-sm px-1">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-body-md text-on-surface-variant">person_off</span>
              1 team member off today (Priya Sharma · Regular Day Off).
            </span>
<a className="font-label-sm text-label-sm text-primary-container font-semibold hover:underline" href="#">Full Day Roster →</a>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-sm">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">How This Schedule Helps Your Business</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Real comparison against standard fixed scheduling patterns</p>
</div>
<div className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-space-sm py-1 rounded-md font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">trending_up</span>
              Optimized
            </div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase">
<th className="py-2.5 px-space-md rounded-l-lg">Metric</th>
<th className="py-2.5 px-space-md">Usual Way (Manual)</th>
<th className="py-2.5 px-space-md">OptiShift Schedule</th>
<th className="py-2.5 px-space-md text-right rounded-r-lg">Store Impact</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-high/40 font-body-md text-body-md">
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-3 px-space-md font-semibold text-on-surface">Staff Cost</td>
<td className="py-3 px-space-md text-on-surface-variant">₹48,350</td>
<td className="py-3 px-space-md font-semibold text-primary">₹42,680</td>
<td className="py-3 px-space-md text-right font-semibold text-primary">
<span className="inline-flex items-center gap-0.5 bg-secondary-container/60 px-2 py-0.5 rounded-full text-label-sm text-on-secondary-container font-bold">-₹5,670</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-3 px-space-md font-semibold text-on-surface">Shifts Covered</td>
<td className="py-3 px-space-md text-on-surface-variant">44 of 48 (92%)</td>
<td className="py-3 px-space-md font-semibold text-on-surface">48 of 48 (100%)</td>
<td className="py-3 px-space-md text-right font-medium text-on-secondary-container">
<span className="inline-flex items-center gap-0.5 text-label-sm font-semibold">+4 shifts filled</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-3 px-space-md font-semibold text-on-surface">Extra Overtime</td>
<td className="py-3 px-space-md text-amber-700">12 hrs overtime</td>
<td className="py-3 px-space-md font-semibold text-primary">0 hrs</td>
<td className="py-3 px-space-md text-right font-medium text-on-secondary-container">
<span className="text-label-sm font-semibold">Zero overtime cost</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-3 px-space-md font-semibold text-on-surface">Scheduling Conflicts</td>
<td className="py-3 px-space-md text-error">6 overlap clashes</td>
<td className="py-3 px-space-md font-semibold text-primary">0 issues</td>
<td className="py-3 px-space-md text-right font-medium text-on-secondary-container">
<span className="material-symbols-outlined text-body-md text-primary align-middle">check_circle</span>
</td>
</tr>
</tbody>
</table>
</div>

<div className="bg-surface-container-low p-space-md rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary-container text-headline-md mt-0.5">lightbulb</span>
<div>
<p className="font-body-md text-body-md text-on-surface font-semibold">Why this saves you money:</p>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                You saved ₹5,670 this week by matching shift start times with peak customer rush hours (8:30–11:00 AM &amp; 5:00–7:30 PM) and completely eliminating unplanned overtime.
              </p>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<h3 className="font-headline-md text-headline-md text-on-surface">Store Presence</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant">Mumbai Outlet</span>
</div>

<div className="grid grid-cols-2 gap-space-sm">
<div className="relative rounded-lg overflow-hidden h-28 bg-surface-container shadow-sm">
<img className="w-full h-full object-cover" data-alt="A warm, bright contemporary coffee shop interior in Mumbai with light wood counters, espresso machine steam rising in natural sunlight, neat barista workstations, clean modern seating area, muted sage green accents and organized aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0vg-owPFtvyd-opCMaTuh7aHvtALXpiEX9qATZ2-otzqzjWzsKPJCoJbPG5NqhHVvN5JMcSg-fMQW5SJjOzvE8w7dXuCwRXZNEd8iqOQSWg7N3MrYgOFfxsjxHy6q1ZIH3W-xS-8DcGo1X8GsYcyrbq1LJH48XYngLZ9BRlsSoBXYtHtg2VhjuBFvdOddShrHeRGkSp7PeULOqnJoRsU29CtLPWrTsBPVtHWiBlwLszf_vD8b6FMz"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent flex items-end p-space-sm">
<span className="font-label-sm text-label-sm text-white font-medium">Coffee Bar &amp; Floor</span>
</div>
</div>
<div className="relative rounded-lg overflow-hidden h-28 bg-surface-container shadow-sm">
<img className="w-full h-full object-cover" data-alt="Smiling barista wearing a neat forest green apron pouring artisan latte art behind a clean café counter, warm soft daylight filtering in, stainless steel equipment, professional restaurant vibe with authentic welcoming hospitality atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFYBdCQU_2ivXe3tBcl5as2Y5xMEJ2Ni2q17T1-jG_NrE991MflzU_xR0HGG6uraBVxVuPKUkATkNeUIrItI9Wa3uaIAp7f0zRoHKNnXrf1ZBqe-oMtsqzFLayoK9VI3OYVF8vs8l09kZcxBgx1nH-58G9rYduEtZbUXmSE9QacxH5lSX5fNgew0CflbEw5thI18k2b8_9V8mhdh-M_ZSdGNpQEvq-chTNzavaXNki8az1kcYqxj_3"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent flex items-end p-space-sm">
<span className="font-label-sm text-label-sm text-white font-medium">Shift Crew Ready</span>
</div>
</div>
</div>

<div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm font-semibold uppercase text-on-surface-variant">Rush Hours vs Staff On Floor</span>
<span className="font-label-sm text-label-sm text-primary font-bold">100% Match</span>
</div>

<div className="h-16 w-full pt-1 flex items-end justify-between gap-1">

<svg className="w-full h-full text-primary-container" preserveAspectRatio="none" viewBox="0 0 240 50">

<path className="opacity-80" d="M 0,40 Q 30,38 50,15 T 90,30 T 130,42 T 170,10 T 210,25 T 240,45" fill="none" stroke="currentColor" strokeWidth="2.5"></path>

<path className="opacity-10" d="M 0,40 Q 30,38 50,15 T 90,30 T 130,42 T 170,10 T 210,25 T 240,45 L 240,50 L 0,50 Z" fill="currentColor"></path>

<circle className="fill-primary" cx="50" cy="15" r="3"></circle>
<circle className="fill-primary" cx="170" cy="10" r="3"></circle>
</svg>
</div>
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-1 border-t border-surface-container-high/40">
<span>7 AM (Open)</span>
<span className="font-medium text-on-surface">9 AM Peak (3 staff)</span>
<span className="font-medium text-on-surface">6 PM Peak (4 staff)</span>
<span>11 PM (Close)</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between pb-space-xs">
<h3 className="font-headline-md text-headline-md text-on-surface">Recent Team Activity</h3>
<span className="material-symbols-outlined text-body-md text-on-surface-variant">history</span>
</div>
<div className="flex flex-col gap-space-sm divide-y divide-surface-container-high/40">

<div className="flex items-start gap-space-sm pt-space-xs first:pt-0">
<div className="p-1.5 rounded-lg bg-surface-container text-primary mt-0.5">
<span className="material-symbols-outlined text-body-md">verified</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-semibold text-on-surface">Schedule updated</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Today 10:42 AM</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Yielded ₹5,670 savings, 100% shifts covered</p>
</div>
</div>

<div className="flex items-start gap-space-sm pt-space-sm">
<div className="p-1.5 rounded-lg bg-surface-container text-amber-800 mt-0.5">
<span className="material-symbols-outlined text-body-md">event_busy</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-semibold text-on-surface">Time off requested</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Today 9:18 AM</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Priya Sharma requested Friday, Oct 18 off</p>
</div>
</div>

<div className="flex items-start gap-space-sm pt-space-sm">
<div className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant mt-0.5">
<span className="material-symbols-outlined text-body-md">schedule</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-semibold text-on-surface">Hours updated</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Yesterday 2:10 PM</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Aisha Khan updated availability for Thursday</p>
</div>
</div>

<div className="flex items-start gap-space-sm pt-space-sm">
<div className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant mt-0.5">
<span className="material-symbols-outlined text-body-md">bookmark_added</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-semibold text-on-surface">Schedule template loaded</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Oct 12 11:00 AM</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Fall Café Schedule applied successfully</p>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="hidden bg-surface-container-lowest p-12 rounded-xl shadow-sm flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-space-lg" id="empty-state-card">
<div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary-container mb-space-md">
<span className="material-symbols-outlined text-headline-xl">calendar_add_on</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">You don’t have a schedule for this week yet</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mb-space-lg">
        OptiShift can build your entire weekly schedule in under 10 seconds. It automatically respects team availability and covers your busy café hours with zero overtime.
      </p>
<div className="flex flex-col sm:flex-row items-center gap-space-sm">
<button className="px-space-xl py-3 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md shadow-sm hover:bg-primary transition-all flex items-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-body-lg">bolt</span>
<span>Build My Schedule Now</span>
</button>
<button className="px-space-lg py-3 bg-surface-container-low text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors" type="button">
          Import from Past Week
        </button>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-space-md">
        8 team members ready · Store hours: 7:00 AM - 11:30 PM
      </p>
</div>
</div>
</div>
    </div>
  );
}
