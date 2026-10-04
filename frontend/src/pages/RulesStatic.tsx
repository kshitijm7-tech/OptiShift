// Auto-generated from ui/optishift_rules_preferences/code.html

export default function Rules() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full font-body-md text-on-surface">

<section className="bg-surface-container-high rounded-xl p-space-md mb-space-lg shadow-sm">
<div className="flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-body-lg">tune</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">State Simulator: Switch View</span>
</div>
<div className="flex flex-wrap items-center gap-space-xs text-label-sm">
<button className="px-space-sm py-1 rounded bg-primary text-on-primary font-semibold transition-all" id="btn-scenario-default">
          Active Rules (Default)
        </button>
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all" id="btn-scenario-unsaved">
          Unsaved Changes Banner
        </button>
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all" id="btn-scenario-impact">
          Schedule Impact Warning
        </button>
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all" id="btn-scenario-saved">
          Rules Saved Toast
        </button>
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all" id="btn-scenario-strict">
          Rules Too Strict (Guidance)
        </button>
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all" id="btn-scenario-reset">
          Reset Dialog
        </button>
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all" id="btn-scenario-first">
          First-Time Defaults
        </button>
</div>
</div>
</section>

<header className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md mb-space-lg">
<div>
<div className="flex items-center gap-space-xs">
<h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">Rules</h1>
<span className="inline-flex items-center px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Active Engine v2.4</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
        Tell OptiShift how you want your schedule to work for UrbanBrew Café.
      </p>
</div>
<div className="flex items-center gap-space-sm shrink-0">
<button className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest text-on-surface rounded-lg font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-body-md text-on-surface-variant">restart_alt</span>
<span>Reset to Defaults</span>
</button>
<button className="inline-flex items-center gap-space-xs px-space-lg py-space-sm bg-primary-container text-on-primary rounded-lg font-label-md text-label-md font-semibold hover:bg-primary transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-body-md">check</span>
<span>Save Changes</span>
</button>
</div>
</header>

<section className="space-y-space-sm mb-space-lg" id="alert-container">

<div className="hidden p-space-md rounded-lg bg-secondary-container text-on-secondary-container shadow-sm flex items-start justify-between gap-space-md transition-all" id="toast-saved">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-headline-md text-primary">check_circle</span>
<div>
<h2 className="font-label-md text-label-md font-semibold">Rules successfully updated!</h2>
<p className="font-body-sm text-body-sm text-on-secondary-container">Your changes will take effect automatically the next time you regenerate the UrbanBrew Café roster.</p>
</div>
</div>
<button aria-label="Close notification" className="text-on-secondary-container hover:opacity-70 p-0.5">
<span className="material-symbols-outlined text-body-md">close</span>
</button>
</div>

<div className="hidden p-space-md rounded-lg bg-error-container text-on-error-container shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md" id="banner-strict">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-headline-md text-error shrink-0">warning</span>
<div>
<h2 className="font-label-md text-label-md font-semibold">These rules may be too strict for your current team</h2>
<p className="font-body-sm text-body-sm mt-0.5">
            3 shifts currently require <strong>4 Baristas</strong> simultaneously, but only <strong>2 Baristas</strong> are currently marked active in your team list. This makes an automatic schedule impossible without overtime or unstaffed shifts.
          </p>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0 self-end md:self-auto">
<button className="px-space-sm py-1 bg-surface-container-lowest text-on-error-container font-label-sm text-label-sm font-semibold rounded hover:bg-surface-container-low transition-colors">
          Adjust to Available Staff
        </button>
<button aria-label="Dismiss warning" className="p-1 text-on-error-container">
<span className="material-symbols-outlined text-body-md">close</span>
</button>
</div>
</div>

<div className="hidden p-space-md rounded-lg bg-surface-container-high text-on-surface shadow-sm flex items-start justify-between gap-space-md" id="banner-impact">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-headline-md text-secondary shrink-0">info</span>
<div>
<h2 className="font-label-md text-label-md font-semibold">Active Schedule Impact Detected</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            You've modified minimum rest periods from 11 hrs to 12 hrs. Two team members (Rahul S. &amp; Priya M.) currently have back-to-back close/open shifts on Oct 17. Updating will mark these as needing reassignment.
          </p>
</div>
</div>
<button aria-label="Close notification" className="text-on-surface-variant hover:text-on-surface">
<span className="material-symbols-outlined text-body-md">close</span>
</button>
</div>
</section>

<section className="bg-surface-container-low rounded-xl p-space-lg mb-space-xl shadow-sm">
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-headline-md">psychology</span>
</div>
<div className="flex-1">
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold">These rules help us build schedules that fit your business and your team.</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
          We’ll always follow your must-have requirements first (people available, mandatory skills, working limits), then try to create the most balanced, cost-effective schedule. You stay in control without having to calculate shift math.
        </p>
<div className="mt-space-sm flex flex-wrap items-center gap-space-md font-label-sm text-label-sm text-secondary">
<span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> 100% Labour Law Compliant</span>
<span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Mumbai Retail Hours Optimized</span>
<span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Fair Allocation by Default</span>
</div>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">

<div className="lg:col-span-7 flex flex-col gap-space-xl">

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold flex items-center justify-center">1</span>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Staffing Requirements</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              How many people do you need working at the same time? We'll make sure every shift has enough hands.
            </p>
</div>
<span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Must-Have</span>
</div>
<div className="flex flex-col gap-space-sm" id="shift-requirements-list">

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm transition-all hover:bg-surface-container">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-body-lg">wb_sunny</span>
</div>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Morning Shift</span>
<span className="text-label-sm font-label-sm text-on-surface-variant">07:00 – 15:30</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Breakfast &amp; corporate coffee peak</span>
</div>
</div>
<div className="flex items-center gap-space-sm self-end sm:self-auto">
<div className="flex items-center bg-surface-container-lowest rounded-lg p-0.5 shadow-sm">
<button aria-label="Decrease morning count" className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" type="button">-</button>
<input className="w-10 text-center font-label-md text-label-md font-semibold bg-transparent text-on-surface focus:outline-none" id="morning-stepper" type="text" value="3"/>
<button aria-label="Increase morning count" className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" type="button">+</button>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant w-16">people min</span>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm transition-all hover:bg-surface-container">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-body-lg">bedtime</span>
</div>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Evening Shift</span>
<span className="text-label-sm font-label-sm text-on-surface-variant">15:00 – 23:30</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">After-work rush &amp; kitchen closing prep</span>
</div>
</div>
<div className="flex items-center gap-space-sm self-end sm:self-auto">
<div className="flex items-center bg-surface-container-lowest rounded-lg p-0.5 shadow-sm">
<button aria-label="Decrease evening count" className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" type="button">-</button>
<input className="w-10 text-center font-label-md text-label-md font-semibold bg-transparent text-on-surface focus:outline-none" id="evening-stepper" type="text" value="4"/>
<button aria-label="Increase evening count" className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" type="button">+</button>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant w-16">people min</span>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm transition-all hover:bg-surface-container">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-body-lg">local_cafe</span>
</div>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Weekend Brunch Peak</span>
<span className="text-label-sm font-label-sm text-on-surface-variant">Sat – Sun (10:00 – 16:00)</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Heavy dine-in &amp; patio traffic</span>
</div>
</div>
<div className="flex items-center gap-space-sm self-end sm:self-auto">
<div className="flex items-center bg-surface-container-lowest rounded-lg p-0.5 shadow-sm">
<button aria-label="Decrease weekend count" className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" type="button">-</button>
<input className="w-10 text-center font-label-md text-label-md font-semibold bg-transparent text-on-surface focus:outline-none" id="weekend-stepper" type="text" value="4"/>
<button aria-label="Increase weekend count" className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" type="button">+</button>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant w-16">people min</span>
</div>
</div>
</div>
<button className="inline-flex items-center gap-space-xs font-label-md text-label-md font-semibold text-primary hover:text-primary-container transition-colors pt-space-xs self-start" type="button">
<span className="material-symbols-outlined text-body-md">add_circle</span>
<span>+ Add custom shift requirement</span>
</button>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold flex items-center justify-center">2</span>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Mandatory Skills &amp; Roles</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Make sure specialized roles like Baristas and Supervisors are always on shift when the store is open.
            </p>
</div>
<span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Must-Have</span>
</div>
<div className="space-y-space-xs">

<div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<span className="font-label-md text-label-md font-semibold text-on-surface w-28">Morning Shift</span>
<div className="flex flex-wrap items-center gap-space-xs">
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Min 1 Barista (L2+)
                </span>
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Min 1 Cashier / POS
                </span>
</div>
</div>
<button aria-label="Delete rule" className="text-on-surface-variant hover:text-error p-1 rounded transition-colors" type="button">
<span className="material-symbols-outlined text-body-md">delete</span>
</button>
</div>

<div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-md">
<span className="font-label-md text-label-md font-semibold text-on-surface w-28">Evening Shift</span>
<div className="flex flex-wrap items-center gap-space-xs">
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Min 1 Shift Supervisor
                </span>
<span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Min 1 Kitchen &amp; Prep
                </span>
</div>
</div>
<button aria-label="Delete rule" className="text-on-surface-variant hover:text-error p-1 rounded transition-colors" type="button">
<span className="material-symbols-outlined text-body-md">delete</span>
</button>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low mt-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block mb-space-sm">Add Skill Coverage Rule</span>
<div className="grid grid-cols-1 sm:grid-cols-4 gap-space-sm">
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="shift-select">Shift</label>
<select className="w-full h-9 px-space-sm bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none" id="shift-select">
<option>Evening Shift</option>
<option>Morning Shift</option>
<option>Weekend Brunch</option>
</select>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="skill-select">Role or Skill</label>
<select className="w-full h-9 px-space-sm bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none" id="skill-select">
<option>Senior Barista</option>
<option>Shift Supervisor</option>
<option>Food Handler Certified</option>
<option>Counter Cashier</option>
</select>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="count-select">Required</label>
<select className="w-full h-9 px-space-sm bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none" id="count-select">
<option>At least 1</option>
<option>At least 2</option>
<option>At least 3</option>
</select>
</div>
<div className="flex items-end">
<button className="w-full h-9 px-space-md bg-secondary text-on-secondary rounded-lg font-label-md text-label-md font-semibold hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-sm" type="button">
                Add Rule
              </button>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold flex items-center justify-center">3</span>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Working Hours &amp; Rest Limits</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Set limits so people don’t get scheduled for too much work and have enough time to sleep between shifts.
            </p>
</div>
<span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Labour Safety</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
<div>
<label className="font-label-md text-label-md font-semibold text-on-surface block" htmlFor="input-max-weekly">Weekly Hours Cap</label>
<span className="font-body-sm text-body-sm text-on-surface-variant text-xs block mt-0.5">Maximum normal hours</span>
</div>
<div className="mt-space-md flex items-baseline gap-space-xs">
<input className="w-16 h-9 px-2 bg-surface-container-lowest rounded-lg font-headline-md text-headline-md font-semibold text-on-surface text-center focus:outline-none" id="input-max-weekly" type="number" value="40"/>
<span className="font-label-sm text-label-sm text-on-surface-variant">hrs / week</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-space-sm pt-space-xs">Can be customized per person in My Team</p>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
<div>
<label className="font-label-md text-label-md font-semibold text-on-surface block" htmlFor="input-max-daily">Daily Hours Limit</label>
<span className="font-body-sm text-body-sm text-on-surface-variant text-xs block mt-0.5">Single shift maximum</span>
</div>
<div className="mt-space-md flex items-baseline gap-space-xs">
<input className="w-16 h-9 px-2 bg-surface-container-lowest rounded-lg font-headline-md text-headline-md font-semibold text-on-surface text-center focus:outline-none" id="input-max-daily" type="number" value="8"/>
<span className="font-label-sm text-label-sm text-on-surface-variant">hrs / day</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-space-sm pt-space-xs">Excludes 30-min unpaid meal break</p>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
<div>
<label className="font-label-md text-label-md font-semibold text-on-surface block" htmlFor="input-rest-hours">Rest Between Shifts</label>
<span className="font-body-sm text-body-sm text-on-surface-variant text-xs block mt-0.5">No "clopenings"</span>
</div>
<div className="mt-space-md flex items-baseline gap-space-xs">
<input className="w-16 h-9 px-2 bg-surface-container-lowest rounded-lg font-headline-md text-headline-md font-semibold text-on-surface text-center focus:outline-none" id="input-rest-hours" type="number" value="12"/>
<span className="font-label-sm text-label-sm text-on-surface-variant">hours minimum</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-space-sm pt-space-xs">Between store closing and next opening</p>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold flex items-center justify-center">4</span>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Extra Hours &amp; Overtime</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Tell us what to do when someone would need to work beyond their normal hours to cover a shift.
            </p>
</div>
<span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Budget Control</span>
</div>
<div className="space-y-space-sm">
<label className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-md cursor-pointer hover:bg-surface-container transition-colors block">
<input className="mt-1 accent-primary w-4 h-4" name="overtime_policy" type="radio" value="avoid"/>
<div className="flex-1">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Avoid extra hours whenever possible</span>
<span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Recommended</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                OptiShift will first prioritize staff who haven't reached 40 hours. Extra hours will only be used if there is truly no other person available. Protects your monthly wage budget.
              </p>
</div>
</label>
<label className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-md cursor-pointer hover:bg-surface-container transition-colors block">
<input className="mt-1 accent-primary w-4 h-4" name="overtime_policy" type="radio" value="allow"/>
<div className="flex-1">
<span className="font-label-md text-label-md font-semibold text-on-surface">Allow extra hours when needed</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Allows team members to take on up to
                <input className="inline-block w-12 h-6 px-1 mx-1 text-center bg-surface-container-lowest rounded font-semibold text-on-surface focus:outline-none" id="input-ot-cap" type="number" value="4"/>
                extra hours per week if they want more hours or to cover absences easily.
              </p>
</div>
</label>
</div>
</section>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-xl">

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div>
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold flex items-center justify-center">5</span>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Fair Work Distribution</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Try to share work and weekend shifts fairly across your team so morale stays high.
          </p>
</div>
<div className="space-y-space-md">

<div className="flex items-start justify-between gap-space-md">
<div>
<span className="font-label-md text-label-md font-semibold text-on-surface block">Keep weekly hours balanced</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                When possible, avoid giving one full-timer 42 hours while another gets only 28 hours.
              </span>
</div>
<label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>

<div className="flex items-start justify-between gap-space-md pt-space-sm border-t border-surface-container">
<div>
<span className="font-label-md text-label-md font-semibold text-on-surface block">Prefer balanced weekend distribution</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                Rotate Saturday and Sunday shifts across staff so everyone gets some weekend rest.
              </span>
</div>
<label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div>
<div className="flex items-center gap-space-xs">
<span className="w-6 h-6 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold flex items-center justify-center">6</span>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Team Preferences</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Use people’s shift preferences whenever they don’t conflict with store opening needs.
          </p>
</div>
<div className="space-y-space-md">

<div className="flex items-start justify-between gap-space-md">
<div>
<span className="font-label-md text-label-md font-semibold text-on-surface block">Try to follow preferred shifts</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                We'll match employee preferred mornings or evenings when staffing requirements permit.
              </span>
</div>
<label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>

<div className="flex items-start justify-between gap-space-md pt-space-sm border-t border-surface-container">
<div>
<span className="font-label-md text-label-md font-semibold text-on-surface block">Avoid abrupt shift pattern changes</span>
<span className="font-body-sm text-body-sm text-on-surface-variant block mt-0.5">
                Keep people on consistent blocks (e.g. 3 mornings in a row instead of flipping daily).
              </span>
</div>
<label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Priority Hierarchy Guide</span>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface mt-1">How OptiShift Applies Your Rules</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            When creating your schedule, our engine balances requirements in this exact priority order:
          </p>
</div>
<div className="space-y-space-sm">

<div className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm">
<span className="w-6 h-6 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center justify-center shrink-0 mt-0.5">1</span>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Must-Haves (Non-negotiable)</span>
<span className="material-symbols-outlined text-primary text-body-md">lock</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Store coverage targets, certified skill availability (Baristas &amp; Supervisors), approved leaves, and not double-booking.
              </p>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm">
<span className="w-6 h-6 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold flex items-center justify-center shrink-0 mt-0.5">2</span>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Well-being &amp; Rest Limits</span>
<span className="material-symbols-outlined text-secondary text-body-md">shield</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Max 40 hrs/week per person, max 8 hrs/day, and mandatory 12 hours rest between evening close and morning opening.
              </p>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm">
<span className="w-6 h-6 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold flex items-center justify-center shrink-0 mt-0.5">3</span>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Staff Happiness &amp; Optimization</span>
<span className="material-symbols-outlined text-on-surface-variant text-body-md">sentiment_satisfied</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Zero overtime where possible, balanced weekend rotations, and matching individual morning or evening preferences.
              </p>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-body-lg">calendar_month</span>
<span className="font-label-md text-label-md font-semibold text-on-surface">Current Schedule Status</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          UrbanBrew Café's active schedule for <strong>Oct 14 – Oct 20</strong> is running smoothly under these rules. Changing staffing minimums or weekly caps will automatically apply to next week's draft.
        </p>
<div className="pt-space-xs">
<a className="inline-flex items-center gap-space-xs font-label-md text-label-md font-semibold text-primary hover:text-primary-container transition-colors" href="#">
<span>View Active Schedule</span>
<span className="material-symbols-outlined text-body-md">arrow_forward</span>
</a>
</div>
</section>
</div>
</div>

<div className="hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl bg-inverse-surface text-inverse-on-surface p-space-md rounded-xl shadow-xl z-50 flex items-center justify-between gap-space-md transition-all" id="unsaved-bar">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-tertiary-fixed text-headline-md">info</span>
<div>
<p className="font-label-md text-label-md font-semibold text-inverse-on-surface">You have unsaved changes</p>
<p className="font-body-sm text-body-sm text-surface-variant">Changes will not affect scheduled shifts until saved.</p>
</div>
</div>
<div className="flex items-center gap-space-sm">
<button className="px-space-md py-space-xs rounded-lg font-label-md text-label-md font-medium text-inverse-on-surface hover:bg-surface-variant/20 transition-colors">
        Discard
      </button>
<button className="px-space-lg py-space-xs bg-primary-fixed text-on-primary-fixed rounded-lg font-label-md text-label-md font-semibold hover:bg-primary-fixed-dim transition-colors shadow-sm">
        Save Changes
      </button>
</div>
</div>

<div className="hidden fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-space-md" id="modal-reset">
<div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-space-xl shadow-xl flex flex-col gap-space-md">
<div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
<span className="material-symbols-outlined text-headline-lg">restart_alt</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Reset rules to defaults?</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
          This will restore the standard UrbanBrew Café shift settings: 3 morning staff, 4 evening staff, 40-hour weekly cap, and 12-hour rest requirement. Your team roster will not be altered.
        </p>
</div>
<div className="flex items-center justify-end gap-space-sm pt-space-sm">
<button className="px-space-lg py-space-sm rounded-lg font-label-md text-label-md font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors" type="button">
          Cancel
        </button>
<button className="px-space-lg py-space-sm bg-error text-on-error rounded-lg font-label-md text-label-md font-semibold hover:opacity-90 transition-opacity shadow-sm" type="button">
          Reset to Defaults
        </button>
</div>
</div>
</div>
</div>
    </div>
  );
}
