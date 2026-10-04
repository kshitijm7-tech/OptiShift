// Auto-generated from ui/optishift_settings_preferences/code.html

export default function Settings() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">

<div className="w-full bg-surface-container-lowest shadow-sm rounded-xl p-space-md mb-space-xl flex flex-wrap items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary-container text-body-lg">tune</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">Simulator State:</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Click to test scenario previews</span>
</div>
<div className="flex flex-wrap items-center gap-space-xs" id="sim-button-group">
<button className="px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all bg-secondary-container text-on-secondary-container" id="btn-state-default">
        Default View
      </button>
<button className="px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all bg-surface-container-high text-on-surface-variant hover:text-on-surface" id="btn-state-toast">
        Changes Saved (Toast)
      </button>
<button className="px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all bg-surface-container-high text-on-surface-variant hover:text-on-surface" id="btn-state-unsaved">
        Unsaved Changes Prompt
      </button>
<button className="px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all bg-surface-container-high text-on-surface-variant hover:text-on-surface" id="btn-state-modal">
        Reset Demo Data Modal
      </button>
<button className="px-space-md py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all bg-surface-container-high text-on-surface-variant hover:text-on-surface" id="btn-state-notify">
        Test Notification Sent
      </button>
</div>
</div>

<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg mb-space-xl">
<div>
<div className="flex items-center gap-space-xs mb-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Preferences &amp; Configuration</span>
<span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Auto-sync enabled</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Settings</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Manage your business profile, roster rules, and OptiShift preferences.</p>
</div>
<div className="flex items-center gap-space-sm shrink-0">
<button className="px-space-md h-9 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-sm font-label-md text-label-md font-medium transition-all flex items-center gap-space-xs">
<span className="material-symbols-outlined text-body-md">restart_alt</span>
        Reset to Defaults
      </button>
<button className="px-space-lg h-9 rounded-lg bg-primary-container text-on-primary hover:bg-primary shadow-sm font-label-md text-label-md font-semibold transition-all flex items-center gap-space-xs">
<span className="material-symbols-outlined text-body-md">check</span>
        Save Changes
      </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">

<div className="lg:col-span-3">
<div className="sticky top-24 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm uppercase text-on-surface-variant px-space-sm py-1 font-semibold">Jump to category</span>
<a className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md font-semibold" href="#section-business">
<span className="material-symbols-outlined text-primary-container text-body-lg">storefront</span>
          Business Profile
        </a>
<a className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md" href="#section-schedule">
<span className="material-symbols-outlined text-secondary text-body-lg">calendar_month</span>
          Schedule Preferences
        </a>
<a className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md" href="#section-notifications">
<span className="material-symbols-outlined text-secondary text-body-lg">notifications_active</span>
          Notifications
        </a>
<a className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md" href="#section-account">
<span className="material-symbols-outlined text-secondary text-body-lg">person_pin</span>
          Account &amp; Workspace
        </a>
<a className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-error hover:bg-error-container/40 transition-colors font-label-md text-label-md" href="#section-demo">
<span className="material-symbols-outlined text-body-lg">dataset</span>
          Demo Environment
        </a>

<div className="mt-space-lg pt-space-md bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm font-semibold text-primary">Algothon Live Instance</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">UrbanBrew Café has 8 team members scheduled across 14 peak shifts this week.</p>
</div>
</div>
</div>

<div className="lg:col-span-9 flex flex-col gap-space-xl">

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm" id="section-business">
<div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md mb-space-lg">
<div>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary-container text-headline-md">storefront</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Business</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Basic information about your business and operating footprint.</p>
</div>
<span className="mt-2 md:mt-0 inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-body-sm">verified</span> Verified Location
          </span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="biz-name">Business Name</label>
<input className="h-9 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20 shadow-inner bg-surface-container-low" id="biz-name" type="text" value="UrbanBrew Café"/>
<span className="font-body-sm text-body-sm text-on-surface-variant">Displayed on employee rosters and shift notifications.</span>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="biz-type">Business Type</label>
<select className="h-9 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20" id="biz-type">
<option>Café &amp; Specialty Coffee</option>
<option>Casual &amp; Fine Dining Restaurant</option>
<option>Retail Store / Boutique</option>
<option>Salon &amp; Wellness</option>
<option>Healthcare &amp; Clinic</option>
<option>Warehouse &amp; Logistics</option>
<option>Other Service Business</option>
</select>
<span className="font-body-sm text-body-sm text-on-surface-variant">Calibrates schedule templates to common cafe staffing flows.</span>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="biz-loc">Location / Outlet City</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-2.5 top-2 text-on-surface-variant text-body-md">location_on</span>
<input className="w-full h-9 pl-8 pr-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20" id="biz-loc" type="text" value="Bandra West, Mumbai"/>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Local labor jurisdiction: Maharashtra Shops &amp; Establishments.</span>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="biz-curr">Operating Currency</label>
<div className="relative">
<input className="w-full h-9 px-space-md rounded-lg bg-surface-container-high/60 text-on-surface font-body-md text-body-md cursor-not-allowed" id="biz-curr" type="text" value="₹ INR (Indian Rupee)"/>
<span className="material-symbols-outlined absolute right-2.5 top-2 text-on-surface-variant text-body-md">lock</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Fixed for this outlet region. Overtime estimates calculate in ₹ INR.</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm" id="section-schedule">
<div className="pb-space-md mb-space-lg">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary-container text-headline-md">calendar_month</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Schedule Preferences</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Configure high-level calendar displays. Detailed workforce constraints are managed in Rules.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-lg">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Default Schedule Horizon</label>
<select className="h-9 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20">
<option>7 days (Weekly roster)</option>
<option>14 days (Bi-weekly roster)</option>
<option>30 days (Monthly planner)</option>
</select>
<span className="font-body-sm text-body-sm text-on-surface-variant">OptiShift generates full seven-day cycle assignments.</span>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Start of Week</label>
<select className="h-9 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container/20">
<option>Monday (Standard hospitality week)</option>
<option>Sunday</option>
</select>
<span className="font-body-sm text-body-sm text-on-surface-variant">The timeline canvas begins on this day across all views.</span>
</div>
</div>
<div className="flex flex-col gap-space-md pt-space-md">

<div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-md">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-body-lg">weekend</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Show weekends highlighted</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Applies a tinted contrast column to Saturday and Sunday on the schedule canvas.</span>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>

<div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-md">
<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-body-lg">schedule</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Time Format</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Format applied to shift pill headers and duration trackers.</span>
</div>
</div>
<div className="flex items-center bg-surface-container p-1 rounded-lg">
<button className="px-space-md py-1 rounded-md font-label-sm text-label-sm font-semibold transition-all bg-surface-container-lowest text-primary-container shadow-sm" id="fmt-12h">
                12-hour (9:00 AM)
              </button>
<button className="px-space-md py-1 rounded-md font-label-sm text-label-sm font-medium transition-all text-on-surface-variant hover:text-on-surface" id="fmt-24h">
                24-hour (09:00)
              </button>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm" id="section-notifications">
<div className="pb-space-md mb-space-lg">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary-container text-headline-md">notifications_active</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Notifications</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Choose when OptiShift alerts you to pending operational actions.</p>
</div>
<div className="space-y-space-md mb-space-xl">

<div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<span className="material-symbols-outlined text-primary-container">event_available</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Schedule ready</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Let me know when an automated schedule has been built or updated.</span>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>

<div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<span className="material-symbols-outlined text-primary-container">beach_access</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Time-off requests</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Let me know when a team member submits a leave or swap request.</span>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>

<div className="flex items-center justify-between p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<span className="material-symbols-outlined text-primary-container">notification_important</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Schedule needs attention</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Alert me when a draft has an uncovered shift or rule conflict.</span>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">Delivery Channels</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">

<div className="p-space-md bg-surface-container-low rounded-lg flex flex-col justify-between gap-space-md">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary-container text-body-md">mail</span> Primary Email Address
                </span>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">Active</span>
</div>
<input className="w-full h-9 px-space-md rounded-md bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none" type="email" value="alex.morgan@urbanbrew.in"/>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">Weekly summaries dispatched every Sunday at 8:00 PM.</p>
</div>
<button className="self-start h-8 px-space-md rounded-md bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold shadow-sm transition-all flex items-center gap-1">
<span className="material-symbols-outlined text-body-sm">send</span>
              Send Test Notification
            </button>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg flex flex-col justify-between gap-space-md">
<div>
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary-container text-body-md">chat</span> WhatsApp Team Broadcast
                </span>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">Enabled</span>
</div>
<p className="font-body-md text-body-md text-on-surface font-medium">Send weekly roster link to team members upon publishing.</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Staff members can view their shifts in 1 tap without downloading an app.</p>
</div>
<div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-body-md">check_circle</span>
              All 8 team member phones verified
            </div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm" id="section-account">
<div className="pb-space-md mb-space-lg">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary-container text-headline-md">person_pin</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Account</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Your manager profile and current OptiShift environment status.</p>
</div>
<div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
<div className="flex items-center gap-space-md">
<img alt="Alex Morgan" className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-primary-container/20" src="https://lh3.googleusercontent.com/aida/AEtjO1XRxQJLnYxCI1g-Y78NHJx3nS5df7-CAXGTAmcOp4WnpNbNPjgBZE3wg5NpuAIJfFYulYCSMAHRnwLFhM9AEV-qOaLctvLSEi7-87aYazI3XggBOXFBIn7k-FOgFXdW5me9gFO9i5bPBCGm0pdGq8UPSKBEAsMIFIhoCadKLiSxC_vgM6uyXIEwj68GQISr9JKuR0s7VLm2L7nYvL88HwVcH7OejBwRg3597x2TXImYc0KdgvAdc-O10Q"/>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-headline-md text-headline-md text-on-surface">Alex Morgan</span>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-semibold">Owner</span>
</div>
<span className="font-body-md text-body-md text-on-surface-variant">alex.morgan@urbanbrew.in</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 flex items-center gap-1">
<span className="material-symbols-outlined text-body-sm text-primary-container">store</span> UrbanBrew Café · Mumbai Outlet
              </span>
</div>
</div>
<div className="flex flex-col items-start md:items-end gap-1">
<span className="font-label-sm text-label-sm text-on-surface-variant">Workspace Subscription</span>
<span className="font-label-md text-label-md font-semibold text-primary px-space-sm py-1 rounded-md bg-secondary-container">Algothon Demo Instance</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Active through Algothon Presentation</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm" id="section-demo">
<div className="pb-space-md mb-space-lg">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-error text-headline-md">dataset</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Demo Environment &amp; Data</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Control sample business data used during live scheduling demonstrations.</p>
</div>
<div className="p-space-lg rounded-xl bg-error-container/20 flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-error shrink-0 shadow-sm">
<span className="material-symbols-outlined text-headline-md">lock_reset</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Demo Mode Active</span>
<span className="font-label-sm text-label-sm px-2 py-0.2 rounded-full bg-error-container text-on-error-container font-semibold">Reset Option Available</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Restores the original UrbanBrew Café dataset. Any custom employees or shift edits made during this session will be safely reverted to default presentation values.
                </p>
</div>
</div>
<button className="shrink-0 h-9 px-space-lg rounded-lg bg-surface-container-lowest hover:bg-error hover:text-on-error text-error font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center gap-1.5">
<span className="material-symbols-outlined text-body-md">delete_sweep</span>
              Reset Demo Data
            </button>
</div>
</div>
</section>
</div>
</div>

<div className="fixed bottom-6 right-8 bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-xl flex items-center gap-space-md transform translate-y-24 opacity-0 transition-all duration-300 z-50" id="toast-notification">
<div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-body-md">check</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold" id="toast-title">Changes saved</span>
<span className="font-body-sm text-body-sm opacity-80" id="toast-msg">Your settings have been updated successfully.</span>
</div>
<button className="ml-space-sm text-inverse-on-surface/60 hover:text-inverse-on-surface">
<span className="material-symbols-outlined text-body-md">close</span>
</button>
</div>

<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-space-xl py-space-md rounded-xl shadow-2xl items-center gap-space-lg z-50 hidden transition-all" id="unsaved-banner">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-warning text-headline-md text-secondary-fixed">error</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-inverse-on-surface">You have unsaved changes</span>
<span className="font-body-sm text-body-sm opacity-80">Do you want to apply your new settings across OptiShift?</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-md h-8 rounded-lg bg-surface-container-high/20 hover:bg-surface-container-high/40 text-inverse-on-surface font-label-sm text-label-sm font-medium transition-all">
        Discard
      </button>
<button className="px-space-md h-8 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-sm text-label-sm font-semibold transition-all">
        Save Changes
      </button>
</div>
</div>

<div className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-sm z-50 flex items-center justify-center p-space-lg hidden" id="reset-modal">
<div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-space-xl shadow-2xl transform scale-95 transition-all" id="reset-modal-content">
<div className="flex items-center gap-space-md mb-space-md">
<div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
<span className="material-symbols-outlined text-headline-lg">restart_alt</span>
</div>
<div className="flex flex-col">
<h3 className="font-headline-md text-headline-md text-on-surface">Reset demo data?</h3>
<span className="font-body-sm text-body-sm text-on-surface-variant">Restore presentation defaults</span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
        This will restore the original UrbanBrew Café dataset. 8 standard employees, initial hour caps, shift patterns, and default preferences will be reinjected.
      </p>
<div className="flex items-center justify-end gap-space-sm">
<button className="px-space-lg h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all">
          Cancel
        </button>
<button className="px-space-lg h-9 rounded-lg bg-error hover:bg-error/90 text-on-error font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 shadow-sm">
<span className="material-symbols-outlined text-body-md">refresh</span>
          Reset Data
        </button>
</div>
</div>
</div>


</div>
    </div>
  );
}
