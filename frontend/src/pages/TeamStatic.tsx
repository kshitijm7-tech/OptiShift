// Auto-generated from ui/optishift_my_team/code.html

export default function Team() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">

<div className="mb-space-lg p-space-xs rounded-xl bg-surface-container-low flex flex-wrap items-center justify-between gap-space-xs shadow-sm">
<div className="flex items-center gap-space-xs px-space-xs">
<span className="material-symbols-outlined text-primary text-body-md">tune</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Prototype Simulator:</span>
</div>
<div className="flex flex-wrap items-center gap-space-xs">
<button className="px-space-sm py-1 rounded-lg font-label-sm text-label-sm font-semibold transition-all bg-primary-container text-on-primary shadow-sm" id="sim-btn-directory" type="button">
        Team Directory (Default)
      </button>
<button className="px-space-sm py-1 rounded-lg font-label-sm text-label-sm font-medium transition-all bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container" id="sim-btn-drawer" type="button">
        View Member Drawer
      </button>
<button className="px-space-sm py-1 rounded-lg font-label-sm text-label-sm font-medium transition-all bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container" id="sim-btn-modal" type="button">
        Add Member Modal
      </button>
<button className="px-space-sm py-1 rounded-lg font-label-sm text-label-sm font-medium transition-all bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container" id="sim-btn-remove" type="button">
        Remove Dialog
      </button>
<button className="px-space-sm py-1 rounded-lg font-label-sm text-label-sm font-medium transition-all bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container" id="sim-btn-empty" type="button">
        First-Time Empty State
      </button>
</div>
</div>

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-space-md mb-space-lg">
<div>
<div className="flex items-center gap-space-sm">
<h1 className="font-headline-lg text-headline-lg font-semibold text-on-surface tracking-tight">My Team</h1>
<span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">Active Roster</span>
</div>
<p className="mt-0.5 font-body-md text-body-md text-on-surface-variant">Add your team and tell us when and where they can work.</p>
</div>
<div className="flex items-center gap-space-sm self-start md:self-auto">
<button className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-medium shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-body-md text-on-surface-variant">file_download</span>
<span>Export List</span>
</button>
<button className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary shadow-sm transition-all active:scale-[0.98]" type="button">
<span className="material-symbols-outlined text-body-md">add</span>
<span>Add Team Member</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md mb-space-lg">
<div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-headline-md">badge</span>
</div>
<div>
<div className="flex items-baseline gap-space-xs">
<span className="font-metric-display text-metric-display text-on-surface font-semibold">8</span>
<span className="font-label-md text-label-md text-on-surface-variant font-medium">people enrolled</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">UrbanBrew Café · Core Staff</p>
</div>
</div>
<div className="h-8 w-px bg-surface-variant hidden sm:block"></div>
<div className="flex items-center gap-space-lg">
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span className="font-label-md text-label-md font-semibold text-on-surface">6 Available</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Ready for today</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-md text-label-md font-semibold text-on-surface">2 Off Today</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Rest day or leave</span>
</div>
</div>
</div>
<div className="lg:col-span-6 bg-surface-container-low rounded-xl p-space-md shadow-sm flex items-start gap-space-md">
<div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-body-md">lightbulb</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface">Why we ask for this:</span>
<span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface-variant">Algorithmic Balance</span>
</div>
<p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          OptiShift cross-references individual skill levels, weekly maximum hours, and explicit shift preferences to automatically generate compliant, conflict-free shift rosters in seconds.
        </p>
</div>
</div>
</div>

<div className="flex flex-col w-full" id="section-directory">

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="relative flex-1 max-w-md">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-body-lg">search</span>
<input className="w-full h-9 pl-9 pr-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest transition-colors" id="team-search-input" placeholder="Search your team by name, role, or skill..." type="text"/>
</div>
<div className="flex flex-wrap items-center gap-space-xs">
<div className="flex items-center p-0.5 rounded-lg bg-surface-container-low" id="status-filter-pills">
<button className="px-space-sm py-1 rounded-md font-label-sm text-label-sm font-semibold bg-surface-container-lowest text-on-surface shadow-sm transition-all filter-pill active" type="button">All (8)</button>
<button className="px-space-sm py-1 rounded-md font-label-sm text-label-sm font-medium text-on-surface-variant hover:text-on-surface transition-all filter-pill" type="button">Active (7)</button>
<button className="px-space-sm py-1 rounded-md font-label-sm text-label-sm font-medium text-on-surface-variant hover:text-on-surface transition-all filter-pill" type="button">On Leave (1)</button>
<button className="px-space-sm py-1 rounded-md font-label-sm text-label-sm font-medium text-on-surface-variant hover:text-on-surface transition-all filter-pill" type="button">Part-time (3)</button>
<button className="px-space-sm py-1 rounded-md font-label-sm text-label-sm font-medium text-on-surface-variant hover:text-on-surface transition-all filter-pill" type="button">Full-time (5)</button>
</div>
<div className="relative">
<button className="flex items-center gap-space-xs px-space-md h-8 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm font-medium text-on-surface transition-colors" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">sort</span>
<span id="current-sort-label">Sort: Name (A-Z)</span>
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">expand_more</span>
</button>
<div className="hidden absolute right-0 mt-1 w-44 rounded-lg bg-surface-container-lowest shadow-md py-1 z-30" id="sort-dropdown">
<button className="w-full text-left px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center justify-between" type="button">
<span>Name (A-Z)</span>
<span className="material-symbols-outlined text-body-sm text-primary">check</span>
</button>
<button className="w-full text-left px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low" type="button">Target Hours (High-Low)</button>
<button className="w-full text-left px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low" type="button">Hourly Pay (High-Low)</button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse" id="team-table">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-space-sm px-space-lg font-semibold" scope="col">Person</th>
<th className="py-space-sm px-space-md font-semibold" scope="col">Skills</th>
<th className="py-space-sm px-space-md font-semibold" scope="col">Weekly Availability</th>
<th className="py-space-sm px-space-md font-semibold text-right" scope="col">Hourly Rate</th>
<th className="py-space-sm px-space-md font-semibold" scope="col">Assigned / Max Hours</th>
<th className="py-space-sm px-space-md font-semibold" scope="col">Status</th>
<th className="py-space-sm px-space-lg text-right font-semibold" scope="col">Action</th>
</tr>
</thead>
<tbody className="divide-y-0" id="team-table-body">

<tr className="team-row hover:bg-surface-container-low/60 transition-colors cursor-pointer group" data-category="full-time leave" data-hours="40" data-name="Priya Sharma" data-pay="260" data-role="Senior Barista" data-skills="Coffee Specialist, Counter, Latte Art">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-md">
<div className="relative shrink-0">
<img className="w-10 h-10 rounded-full object-cover shadow-sm" data-alt="Close-up professional portrait of Priya Sharma, an Indian woman in her late 20s with tied-back dark hair and a clean dark apron, standing in an upscale specialty café with soft warm lighting and green interior accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNtUQd78UZHxnDUAqx_34vBVbdFmVVt0dzhEZEQQYQXkZTps36YtdXOby7Kr8L4nkn3WkAPiiu71Oj0Un38Yg4gfCOvAFvqiV8omS_7v5C4DJ_MQpmlUYWzn_W5UyjVX7KWoxD_txSRG7hLg7oJ_Y4UeAfpsp0MOmemmx0ioIjplbPTeuxb0Rh0seq1SqQe4zj2xXjktgVeJQTI2s19Ivoq8CSNgP3-EqD5Wgjx6iq2oproKnGdME3"/>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim"></span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">Priya Sharma</span>
<span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container-highest text-on-surface-variant">Full-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant block truncate">Senior Barista</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-wrap gap-1 max-w-[200px]">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Coffee Specialist</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Latte Art</span>
<span className="px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm text-[10px]">+1</span>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Mon–Fri</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">9:00 AM – 6:00 PM</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<span className="font-label-md text-label-md font-semibold text-on-surface">₹260</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hr</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1 w-28">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="font-semibold text-on-surface">38 hrs</span>
<span className="text-on-surface-variant">/ 40h</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="bg-primary-container h-full rounded-full" ></div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  On Leave (Fri)
                </span>
</td>
<td className="py-space-md px-space-lg text-right relative">
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">more_horiz</span>
</button>
<div className="row-menu hidden absolute right-6 top-10 w-36 rounded-lg bg-surface-container-lowest shadow-md py-1 z-20 text-left" id="menu-priya">
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">visibility</span> View details
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">edit</span> Edit member
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container/20 flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-error">delete</span> Remove
                  </button>
</div>
</td>
</tr>

<tr className="team-row hover:bg-surface-container-low/60 transition-colors cursor-pointer group" data-category="full-time active" data-hours="40" data-name="Rahul Patil" data-pay="280" data-role="Shift Supervisor" data-skills="Management, Barista, Inventory">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-md">
<div className="relative shrink-0">
<img className="w-10 h-10 rounded-full object-cover shadow-sm" data-alt="Medium headshot of Rahul Patil, a professional Indian male supervisor in his 30s with a sharp haircut, dressed in a neat dark work shirt in a contemporary artisan café environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBk5LXLLRZPgYuOJV0rP8zKUg91HQPEDXsdG6KC3b08Vdc3YpSG5yqgRj_nnt6d_XCJt_FC0Lt7Lk8m0D9wES25t96tKSk_EFPAZYQMCszq90j4ZCviMdusGwbWFID9DpuQtBDrdumYRo-xGLG7nVCqYPu4S1ESc9xEMeqnIadTxC0QTdFGCHI0Adu7WbKitmYi66JxVOmNNbh3Mwt5XCByZbdxZXNkybvnwh1vnkkhJNFDaDlWr6g"/>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container"></span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">Rahul Patil</span>
<span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container-highest text-on-surface-variant">Full-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant block truncate">Shift Supervisor</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-wrap gap-1 max-w-[200px]">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Management</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Inventory</span>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Mon–Sat</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Flexible Coverage</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<span className="font-label-md text-label-md font-semibold text-on-surface">₹280</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hr</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1 w-28">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="font-semibold text-on-surface">38.5 hrs</span>
<span className="text-on-surface-variant">/ 40h</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="bg-primary-container h-full rounded-full" ></div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Active
                </span>
</td>
<td className="py-space-md px-space-lg text-right relative">
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">more_horiz</span>
</button>
<div className="row-menu hidden absolute right-6 top-10 w-36 rounded-lg bg-surface-container-lowest shadow-md py-1 z-20 text-left" id="menu-rahul">
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">visibility</span> View details
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">edit</span> Edit member
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container/20 flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-error">delete</span> Remove
                  </button>
</div>
</td>
</tr>

<tr className="team-row hover:bg-surface-container-low/60 transition-colors cursor-pointer group" data-category="full-time active" data-hours="40" data-name="Aisha Khan" data-pay="270" data-role="Head Barista" data-skills="Coffee Specialist, Training, Quality">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-md">
<div className="relative shrink-0">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-md font-bold">AK</div>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container"></span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">Aisha Khan</span>
<span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container-highest text-on-surface-variant">Full-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant block truncate">Head Barista</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-wrap gap-1 max-w-[200px]">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Training</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Quality Ctrl</span>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Tue–Sun</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Flexible Coverage</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<span className="font-label-md text-label-md font-semibold text-on-surface">₹270</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hr</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1 w-28">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="font-semibold text-on-surface">36 hrs</span>
<span className="text-on-surface-variant">/ 40h</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="bg-primary-container h-full rounded-full" ></div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Active
                </span>
</td>
<td className="py-space-md px-space-lg text-right relative">
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">more_horiz</span>
</button>
<div className="row-menu hidden absolute right-6 top-10 w-36 rounded-lg bg-surface-container-lowest shadow-md py-1 z-20 text-left" id="menu-aisha">
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">visibility</span> View details
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">edit</span> Edit member
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container/20 flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-error">delete</span> Remove
                  </button>
</div>
</td>
</tr>

<tr className="team-row hover:bg-surface-container-low/60 transition-colors cursor-pointer group" data-category="part-time active" data-hours="25" data-name="Vikram Mehta" data-pay="210" data-role="Counter & POS" data-skills="Billing, Customer Service">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-md">
<div className="relative shrink-0">
<img className="w-10 h-10 rounded-full object-cover shadow-sm" data-alt="Portrait of Vikram Mehta, a youthful Indian male cashier in a crisp forest green polo shirt with clean ambient lighting behind an espresso counter." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5ZopGxSPv3nCbrhSYG9NuU9mVqluG3QJMFnKBo0Cz7uRWHASkI5FIzqDbG-yaqgnmyWft7wXmXhS5R_iJP2rHDaVJpG3ITCZczrR2w-9o1T7wbI-XgswTGX6pMAKUPT8yvt8a1k2tgTMWn-d0OlNunDNg-qb8riXRvHIfPZB-chmEUsXZua7qGJ0RLpl1xh8HAVt_OoJbIw8P7aKeEIHFpMwu-eZMtCF5LRSm7Y3MAlRNtIxk5Lpb"/>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container"></span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">Vikram Mehta</span>
<span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container text-on-surface-variant">Part-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant block truncate">Counter & POS</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-wrap gap-1 max-w-[200px]">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Billing</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Customer Care</span>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Mon, Tue, Fri, Sat</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Morning Shift</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<span className="font-label-md text-label-md font-semibold text-on-surface">₹210</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hr</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1 w-28">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="font-semibold text-on-surface">24 hrs</span>
<span className="text-on-surface-variant">/ 25h</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="bg-primary-container h-full rounded-full" ></div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Active
                </span>
</td>
<td className="py-space-md px-space-lg text-right relative">
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">more_horiz</span>
</button>
<div className="row-menu hidden absolute right-6 top-10 w-36 rounded-lg bg-surface-container-lowest shadow-md py-1 z-20 text-left" id="menu-vikram">
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">visibility</span> View details
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">edit</span> Edit member
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container/20 flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-error">delete</span> Remove
                  </button>
</div>
</td>
</tr>

<tr className="team-row hover:bg-surface-container-low/60 transition-colors cursor-pointer group" data-category="full-time active" data-hours="40" data-name="Kavita Nair" data-pay="290" data-role="Closing Manager" data-skills="Shift Close, Cash Management, Barista">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-md">
<div className="relative shrink-0">
<div className="w-10 h-10 rounded-full bg-surface-container-highest text-primary font-label-md font-bold flex items-center justify-center">KN</div>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container"></span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">Kavita Nair</span>
<span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container-highest text-on-surface-variant">Full-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant block truncate">Closing Manager</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-wrap gap-1 max-w-[200px]">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Shift Close</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Cash Mgmt</span>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Mon–Fri</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Evening Shift</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<span className="font-label-md text-label-md font-semibold text-on-surface">₹290</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hr</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1 w-28">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="font-semibold text-on-surface">38 hrs</span>
<span className="text-on-surface-variant">/ 40h</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="bg-primary-container h-full rounded-full" ></div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Active
                </span>
</td>
<td className="py-space-md px-space-lg text-right relative">
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">more_horiz</span>
</button>
<div className="row-menu hidden absolute right-6 top-10 w-36 rounded-lg bg-surface-container-lowest shadow-md py-1 z-20 text-left" id="menu-kavita">
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">visibility</span> View details
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">edit</span> Edit member
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container/20 flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-error">delete</span> Remove
                  </button>
</div>
</td>
</tr>

<tr className="team-row hover:bg-surface-container-low/60 transition-colors cursor-pointer group" data-category="part-time active" data-hours="28" data-name="Arjun Patel" data-pay="200" data-role="Junior Barista" data-skills="Coffee, Cleaning">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-md">
<div className="relative shrink-0">
<div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface font-label-md font-bold flex items-center justify-center">AP</div>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container"></span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">Arjun Patel</span>
<span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container text-on-surface-variant">Part-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant block truncate">Junior Barista</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-wrap gap-1 max-w-[200px]">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Brew Assist</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Sanitation</span>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Wed–Sun</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Flexible Coverage</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<span className="font-label-md text-label-md font-semibold text-on-surface">₹200</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hr</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1 w-28">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="font-semibold text-on-surface">25 hrs</span>
<span className="text-on-surface-variant">/ 28h</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="bg-primary-container h-full rounded-full" ></div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Active
                </span>
</td>
<td className="py-space-md px-space-lg text-right relative">
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">more_horiz</span>
</button>
<div className="row-menu hidden absolute right-6 top-10 w-36 rounded-lg bg-surface-container-lowest shadow-md py-1 z-20 text-left" id="menu-arjun">
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">visibility</span> View details
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">edit</span> Edit member
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container/20 flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-error">delete</span> Remove
                  </button>
</div>
</td>
</tr>

<tr className="team-row hover:bg-surface-container-low/60 transition-colors cursor-pointer group" data-category="part-time active" data-hours="25" data-name="Sneha Roy" data-pay="210" data-role="Customer Service" data-skills="POS, Order Taking, Table Service">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-md">
<div className="relative shrink-0">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-label-md font-bold flex items-center justify-center">SR</div>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container"></span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">Sneha Roy</span>
<span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container text-on-surface-variant">Part-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant block truncate">Customer Service</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-wrap gap-1 max-w-[200px]">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">POS Billing</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Guest Exp</span>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Mon, Tue, Thu, Sat</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Mid Shifts</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<span className="font-label-md text-label-md font-semibold text-on-surface">₹210</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hr</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1 w-28">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="font-semibold text-on-surface">24 hrs</span>
<span className="text-on-surface-variant">/ 25h</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="bg-primary-container h-full rounded-full" ></div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Active
                </span>
</td>
<td className="py-space-md px-space-lg text-right relative">
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">more_horiz</span>
</button>
<div className="row-menu hidden absolute right-6 top-10 w-36 rounded-lg bg-surface-container-lowest shadow-md py-1 z-20 text-left" id="menu-sneha">
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">visibility</span> View details
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">edit</span> Edit member
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container/20 flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-error">delete</span> Remove
                  </button>
</div>
</td>
</tr>

<tr className="team-row hover:bg-surface-container-low/60 transition-colors cursor-pointer group" data-category="full-time active" data-hours="40" data-name="David Lobo" data-pay="240" data-role="Kitchen & Prep" data-skills="Bakery Prep, Sandwiches, Inventory">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-md">
<div className="relative shrink-0">
<div className="w-10 h-10 rounded-full bg-surface-container text-on-surface font-label-md font-bold flex items-center justify-center">DL</div>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container"></span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors">David Lobo</span>
<span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-surface-container-highest text-on-surface-variant">Full-time</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant block truncate">Kitchen & Prep</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-wrap gap-1 max-w-[200px]">
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Bakery Prep</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Sandwiches</span>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-body-md text-body-md font-medium text-on-surface">Tue–Sun</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Early Morning (6 AM)</span>
</div>
</td>
<td className="py-space-md px-space-md text-right">
<span className="font-label-md text-label-md font-semibold text-on-surface">₹240</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">/hr</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1 w-28">
<div className="flex justify-between font-label-sm text-label-sm">
<span className="font-semibold text-on-surface">37 hrs</span>
<span className="text-on-surface-variant">/ 40h</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
<div className="bg-primary-container h-full rounded-full" ></div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Active
                </span>
</td>
<td className="py-space-md px-space-lg text-right relative">
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">more_horiz</span>
</button>
<div className="row-menu hidden absolute right-6 top-10 w-36 rounded-lg bg-surface-container-lowest shadow-md py-1 z-20 text-left" id="menu-david">
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">visibility</span> View details
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">edit</span> Edit member
                  </button>
<button className="w-full px-space-md py-1.5 font-label-sm text-label-sm text-error hover:bg-error-container/20 flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-body-sm text-error">delete</span> Remove
                  </button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-space-lg py-space-sm bg-surface-container-low/50 flex flex-col sm:flex-row items-center justify-between gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
<div className="flex items-center gap-space-xs">
<span>Showing 8 of 8 team members</span>
<span>·</span>
<span>Total Weekly Capacity: <strong>283.5 / 298 hrs</strong> (95.1% scheduled)</span>
</div>
<div className="flex items-center gap-space-md">
<span className="flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-primary-container"></span> Optimal capacity load
          </span>
<span className="flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-secondary"></span> Leave booked
          </span>
</div>
</div>
</div>
</div>

<div className="hidden flex-col items-center justify-center p-space-xl bg-surface-container-lowest rounded-xl shadow-sm text-center py-20 max-w-2xl mx-auto my-8" id="section-empty">
<div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-primary mb-space-md">
<span className="material-symbols-outlined text-metric-display">group_add</span>
</div>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-space-xs">Add your first team member</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-lg leading-relaxed">
      Add the people who work at your business so OptiShift can build a schedule for you. You can configure their work hours, skills, availability, and weekly limits anytime.
    </p>
<div className="flex flex-col sm:flex-row items-center gap-space-sm">
<button className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary shadow-sm transition-all flex items-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-body-md">add</span>
<span>Add Team Member</span>
</button>
<button className="px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-medium transition-colors" type="button">
        Load Sample Café Roster
      </button>
</div>
<div className="mt-space-lg pt-space-md border-t-0 flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-body-sm text-primary">verified</span>
<span>No complicated HR settings — just names, roles, and when they can work.</span>
</div>
</div>

<div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 transition-opacity opacity-0 pointer-events-none duration-300" id="member-drawer-backdrop"></div>
<aside className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface-container-lowest shadow-xl z-50 transform translate-x-full transition-transform duration-300 ease-out flex flex-col" id="member-drawer">

<div className="p-space-lg bg-surface-container-lowest flex items-start justify-between">
<div className="flex items-center gap-space-md">
<img className="w-12 h-12 rounded-full object-cover shadow-sm" data-alt="Priya Sharma, senior barista, smiling warmly in a dark barista uniform in a clean, modern aesthetic coffee shop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7NUVB78VSnvMSjGDY8vzXBfCa0KKM82YxdD9ZChDV91rj0agKVrGqBU06mGSmBnNZghFaZ7_WOg1tkeh1tSZymq7CtQEYjqqO8z_PEYkICKnyRU2HrOeqqe3g7LbqyzpTHTdeVE_X0_wDup-VOfuBnckamfPLb4ZXwik7cenw6ziJYFkS3Lloe_kLujuP0ZBx8TRHRq4MIDqpVdCrrJ7RvFazasLHuFuasRXOIee28Fw1Jfkon54d"/>
<div>
<div className="flex items-center gap-space-xs">
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface">Priya Sharma</h2>
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">Active</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Senior Barista · Full-time Staff</span>
</div>
</div>
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">close</span>
</button>
</div>

<div className="px-space-lg py-space-sm bg-surface-container-low/60 flex items-center justify-between gap-space-sm">
<button className="flex-1 py-1.5 px-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-medium shadow-sm transition-colors text-center flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-body-sm text-on-surface-variant">edit</span> Edit Details
      </button>
<button className="py-1.5 px-space-sm rounded-lg hover:bg-error-container/20 text-error font-label-md text-label-md font-medium transition-colors flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-body-sm">delete</span> Remove
      </button>
</div>

<div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-lg">

<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Work & Pay Details</span>
<span className="font-label-sm text-label-sm text-primary font-medium">UrbanBrew Café</span>
</div>
<div className="bg-surface-container-low rounded-xl p-space-md grid grid-cols-2 gap-space-md">
<div>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Primary Role</span>
<span className="font-label-md text-label-md font-semibold text-on-surface mt-0.5 block">Senior Barista</span>
</div>
<div>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Hourly Pay Rate</span>
<span className="font-label-md text-label-md font-semibold text-on-surface mt-0.5 block">₹260 / hour</span>
</div>
<div>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Weekly Hours Cap</span>
<span className="font-label-md text-label-md font-semibold text-on-surface mt-0.5 block">40 hrs / week</span>
</div>
<div>
<span className="font-body-sm text-body-sm text-on-surface-variant block">Target Scheduled</span>
<span className="font-label-md text-label-md font-semibold text-primary mt-0.5 block">38 hrs (This week)</span>
</div>
<div className="col-span-2 pt-space-xs">
<span className="font-body-sm text-body-sm text-on-surface-variant block mb-1.5">Registered Skills</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium shadow-sm">Coffee Specialist</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium shadow-sm">Counter Operations</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-medium shadow-sm">Latte Art</span>
</div>
</div>
</div>
</div>

<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Weekly Availability</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Default Pattern</span>
</div>
<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden divide-y-0">
<div className="p-space-sm px-space-md flex items-center justify-between hover:bg-surface-container-low/50 transition-colors">
<span className="font-label-md text-label-md font-semibold text-on-surface w-24">Monday</span>
<span className="font-body-sm text-body-sm text-on-surface">9:00 AM – 6:00 PM</span>
<span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Morning/Mid</span>
</div>
<div className="p-space-sm px-space-md flex items-center justify-between bg-surface-container-low/30">
<span className="font-label-md text-label-md font-semibold text-on-surface-variant w-24">Tuesday</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Day Off (Recurring preference)</span>
<span className="px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">Unavailable</span>
</div>
<div className="p-space-sm px-space-md flex items-center justify-between hover:bg-surface-container-low/50 transition-colors">
<span className="font-label-md text-label-md font-semibold text-on-surface w-24">Wednesday</span>
<span className="font-body-sm text-body-sm text-on-surface">15:00 – 23:30</span>
<span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Evening Shift</span>
</div>
<div className="p-space-sm px-space-md flex items-center justify-between hover:bg-surface-container-low/50 transition-colors">
<span className="font-label-md text-label-md font-semibold text-on-surface w-24">Thursday</span>
<span className="font-body-sm text-body-sm text-on-surface">9:00 AM – 6:00 PM</span>
<span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Mid Shift</span>
</div>
<div className="p-space-sm px-space-md flex items-center justify-between bg-surface-variant/20">
<span className="font-label-md text-label-md font-semibold text-on-surface w-24">Friday</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">Approved Leave (Personal)</span>
<span className="px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">On Leave</span>
</div>
<div className="p-space-sm px-space-md flex items-center justify-between hover:bg-surface-container-low/50 transition-colors">
<span className="font-label-md text-label-md font-semibold text-on-surface w-24">Saturday</span>
<span className="font-body-sm text-body-sm text-on-surface">9:00 AM – 6:00 PM</span>
<span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Mid Shift</span>
</div>
<div className="p-space-sm px-space-md flex items-center justify-between bg-surface-container-low/30">
<span className="font-label-md text-label-md font-semibold text-on-surface-variant w-24">Sunday</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Day Off</span>
<span className="px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">Unavailable</span>
</div>
</div>
</div>

<div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Upcoming Time Off</span>
<span className="px-2 py-0.2 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">1 Scheduled</span>
</div>
<div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-md">event_busy</span>
<div>
<span className="font-label-md text-label-md font-semibold text-on-surface block">Fri, 18 Oct 2024</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Personal Leave (1 Full Day)</span>
</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">Approved</span>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-body-lg">verified_user</span>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          OptiShift automatically respects these hours and time-off bookings when generating weekly schedules.
        </p>
</div>
</div>
</aside>

<div className="hidden fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm" id="add-modal">
<div className="bg-surface-container-lowest rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

<div className="p-space-lg flex items-center justify-between bg-surface-container-lowest">
<div>
<h2 className="font-headline-md text-headline-md font-semibold text-on-surface" id="modal-title">Add Team Member</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Add the basic details we need to build their schedule.</p>
</div>
<button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" type="button">
<span className="material-symbols-outlined text-body-lg">close</span>
</button>
</div>

<div className="p-space-lg overflow-y-auto flex flex-col gap-space-lg">

<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block mb-space-sm">Step 1: Basic Details</span>
<div className="space-y-space-sm">
<div>
<label className="block font-label-md text-label-md font-medium text-on-surface mb-1" htmlFor="member-name-input">Full Name</label>
<input className="w-full h-9 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm" id="member-name-input" placeholder="e.g. Priya Sharma" type="text"/>
</div>
<div>
<label className="block font-label-md text-label-md font-medium text-on-surface mb-1" htmlFor="member-role-input">Role Title</label>
<input className="w-full h-9 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm" id="member-role-input" placeholder="e.g. Senior Barista" type="text"/>
</div>
</div>
</div>

<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block mb-space-sm">Step 2: Work & Scheduling Details</span>
<div className="space-y-space-sm">
<div>
<label className="block font-label-md text-label-md font-medium text-on-surface mb-1">Skills & Capabilities</label>
<div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-container-low rounded-lg min-h-[42px]" id="skills-container">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm skill-chip">
                  Coffee <button className="hover:text-error" type="button">×</button>
</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm skill-chip">
                  Counter <button className="hover:text-error" type="button">×</button>
</span>
<button className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold hover:bg-secondary-fixed transition-colors" type="button">
                  + Add skill
                </button>
</div>
</div>
<div className="grid grid-cols-2 gap-space-sm">
<div>
<label className="block font-label-md text-label-md font-medium text-on-surface mb-1" htmlFor="member-pay-input">Hourly Pay (₹)</label>
<div className="relative">
<span className="absolute left-3 top-2 font-label-md text-on-surface-variant">₹</span>
<input className="w-full h-9 pl-7 pr-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm" id="member-pay-input" type="number" value="250"/>
</div>
</div>
<div>
<label className="block font-label-md text-label-md font-medium text-on-surface mb-1" htmlFor="member-hours-input">Max Hours / Week</label>
<input className="w-full h-9 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm" id="member-hours-input" type="number" value="40"/>
</div>
</div>
</div>
</div>

<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block mb-space-sm">Step 3: Weekly Availability</span>
<div className="bg-surface-container-low rounded-xl p-space-sm space-y-1 text-on-surface">

<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-lowest shadow-sm">
<span className="font-label-md text-label-md font-semibold w-16">Mon</span>
<div className="flex items-center gap-space-xs">
<select className="h-7 text-xs bg-surface-container-low rounded px-2 text-on-surface focus:outline-none">
<option>Any Time (Flexible)</option>
<option>Morning (9 AM - 2 PM)</option>
<option>Evening (3 PM - 11 PM)</option>
</select>
<button className="px-2 py-1 rounded font-label-sm text-[11px] font-semibold bg-secondary-container text-on-secondary-container" type="button">Available</button>
</div>
</div>

<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-lowest shadow-sm">
<span className="font-label-md text-label-md font-semibold w-16">Tue</span>
<div className="flex items-center gap-space-xs">
<select className="h-7 text-xs bg-surface-container-low rounded px-2 text-on-surface focus:outline-none">
<option>Any Time (Flexible)</option>
<option>Morning (9 AM - 2 PM)</option>
<option>Evening (3 PM - 11 PM)</option>
</select>
<button className="px-2 py-1 rounded font-label-sm text-[11px] font-semibold bg-secondary-container text-on-secondary-container" type="button">Available</button>
</div>
</div>

<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-lowest shadow-sm">
<span className="font-label-md text-label-md font-semibold w-16">Wed</span>
<div className="flex items-center gap-space-xs">
<select className="h-7 text-xs bg-surface-container-low rounded px-2 text-on-surface focus:outline-none">
<option>Any Time (Flexible)</option>
<option>Morning (9 AM - 2 PM)</option>
<option>Evening (3 PM - 11 PM)</option>
</select>
<button className="px-2 py-1 rounded font-label-sm text-[11px] font-semibold bg-secondary-container text-on-secondary-container" type="button">Available</button>
</div>
</div>

<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-lowest shadow-sm">
<span className="font-label-md text-label-md font-semibold w-16">Thu</span>
<div className="flex items-center gap-space-xs">
<select className="h-7 text-xs bg-surface-container-low rounded px-2 text-on-surface focus:outline-none">
<option>Any Time (Flexible)</option>
<option>Morning (9 AM - 2 PM)</option>
<option>Evening (3 PM - 11 PM)</option>
</select>
<button className="px-2 py-1 rounded font-label-sm text-[11px] font-semibold bg-secondary-container text-on-secondary-container" type="button">Available</button>
</div>
</div>

<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-lowest shadow-sm">
<span className="font-label-md text-label-md font-semibold w-16">Fri</span>
<div className="flex items-center gap-space-xs">
<select className="h-7 text-xs bg-surface-container-low rounded px-2 text-on-surface focus:outline-none">
<option>Any Time (Flexible)</option>
<option>Morning (9 AM - 2 PM)</option>
<option>Evening (3 PM - 11 PM)</option>
</select>
<button className="px-2 py-1 rounded font-label-sm text-[11px] font-semibold bg-secondary-container text-on-secondary-container" type="button">Available</button>
</div>
</div>

<div className="flex items-center justify-between p-1.5 rounded-lg bg-surface-container-lowest shadow-sm">
<span className="font-label-md text-label-md font-semibold w-24">Sat & Sun</span>
<div className="flex items-center gap-space-xs">
<button className="px-2 py-1 rounded font-label-sm text-[11px] font-semibold bg-secondary-container text-on-secondary-container" type="button">Available Weekends</button>
</div>
</div>
</div>
</div>
</div>

<div className="p-space-lg bg-surface-container-low flex items-center justify-end gap-space-sm">
<button className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-medium transition-colors" type="button">
          Cancel
        </button>
<button className="px-space-lg py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary shadow-sm transition-all" type="button">
          Save to My Team
        </button>
</div>
</div>
</div>

<div className="hidden fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm" id="remove-modal">
<div className="bg-surface-container-lowest rounded-xl shadow-xl w-full max-w-md overflow-hidden p-space-lg">
<div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-space-md">
<span className="material-symbols-outlined text-headline-md">person_remove</span>
</div>
<h3 className="font-headline-md text-headline-md font-semibold text-on-surface mb-space-xs" id="remove-modal-target">Remove Priya Sharma from team?</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
        This person will no longer be included when OptiShift automatically builds future schedules. Existing published schedules will not be changed automatically.
      </p>
<div className="flex items-center justify-end gap-space-sm">
<button className="px-space-md py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-medium transition-colors" type="button">
          Keep Person
        </button>
<button className="px-space-lg py-1.5 rounded-lg bg-error text-on-error font-label-md text-label-md font-semibold hover:bg-on-error-container shadow-sm transition-all" type="button">
          Yes, Remove
        </button>
</div>
</div>
</div>

<div className="fixed bottom-6 right-6 z-50 transform translate-y-12 opacity-0 pointer-events-none transition-all duration-300 flex items-center gap-space-sm px-space-md py-2.5 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl" id="toast-notification">
<span className="material-symbols-outlined text-primary-fixed text-body-lg">check_circle</span>
<span className="font-label-md text-label-md font-medium" id="toast-message">Team roster updated successfully</span>
</div>
</div>
    </div>
  );
}
