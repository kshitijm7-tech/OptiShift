// Schedule — direct from Stitch UI mockup
export default function Schedule() {
  const html = `<div className="flex flex-col w-full">



<div className="flex flex-col w-full gap-space-lg" id="workspace-loaded-view">

<header className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
<div className="flex flex-col gap-0.5">
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Your Schedule</h1>
<p className="font-body-md text-body-md text-on-surface-variant">See who is working each day and ensure every shift has enough people.</p>
</div>

<div className="flex flex-wrap items-center gap-space-md">

<nav aria-label="Schedule Period Navigation" className="flex items-center bg-surface-container-low p-1 rounded-xl shadow-xs">
<button aria-label="Previous Week" className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors" title="Previous Week" type="button">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<div className="flex items-center gap-1.5 px-space-md py-1 text-on-surface font-label-md font-semibold">
<span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
<span>This Week: Oct 14 – Oct 20</span>
</div>
<button aria-label="Next Week" className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors" title="Next Week" type="button">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</nav>

<div className="flex items-center bg-surface-container-low p-1 rounded-xl">
<button className="px-space-md py-1 rounded-lg text-label-md font-semibold bg-surface-container-lowest text-on-surface shadow-xs transition-all" id="filter-all" type="button">All Shifts</button>
<button className="px-space-md py-1 rounded-lg text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-all" id="filter-morning" type="button">Morning (7:00–15:30)</button>
<button className="px-space-md py-1 rounded-lg text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-all" id="filter-evening" type="button">Evening (15:00–23:30)</button>
</div>

<div className="flex items-center gap-space-xs">
<button className="flex items-center gap-space-xs px-space-lg py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all font-label-md font-semibold shadow-xs" type="button">
<span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
<span>Update Schedule</span>
</button>
<button className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-all font-label-md font-medium" type="button">
<span className="material-symbols-outlined text-[18px]">print</span>
<span>Export / Print</span>
</button>
</div>
</div>
</header>

<section aria-label="Weekly Key Performance Indicators" className="grid grid-cols-2 md:grid-cols-5 gap-space-sm">
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-[20px]">date_range</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Duration</span>
<span className="font-headline-md text-headline-md text-on-surface">7 Days</span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
<span className="material-symbols-outlined text-[20px]">group</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Active Staff</span>
<span className="font-headline-md text-headline-md text-on-surface">8 Members</span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0" id="kpi-coverage-icon">
<span className="material-symbols-outlined text-[20px]">verified</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Coverage Rate</span>
<span className="font-headline-md text-headline-md text-on-surface" id="kpi-coverage-value">100% Covered</span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md">
<div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-tertiary-container shrink-0">
<span className="material-symbols-outlined text-[20px]">hourglass_empty</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Extra Hours</span>
<span className="font-headline-md text-headline-md text-on-surface">0 Overtime</span>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md col-span-2 md:col-span-1">
<div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
<span className="material-symbols-outlined text-[20px]">payments</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Est. Staff Cost</span>
<span className="font-headline-md text-headline-md text-primary font-bold">₹42,680</span>
</div>
</div>
</section>

<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs text-on-surface font-label-md font-semibold">
<span className="material-symbols-outlined text-[18px] text-primary">fact_check</span>
<span>Shift Fulfillment per Day</span>
</div>
<span className="font-label-sm text-on-surface-variant">Store Requirement: Morning (3) · Evening (4)</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-space-sm">

<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between gap-1.5 transition-all">
<div className="flex items-center justify-between">
<span className="font-label-md font-bold text-on-surface">Mon, Oct 14</span>
<span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-label-sm font-semibold bg-secondary-container text-on-secondary-container">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Fully staffed
            </span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">
<span>Morn: <strong>3/3</strong></span> · <span>Eve: <strong>4/4</strong></span>
</div>
</div>

<div className="bg-surface-container-high p-space-sm rounded-lg flex flex-col justify-between gap-1.5 relative shadow-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1">
<span className="font-label-md font-bold text-on-surface">Tue, Oct 15</span>
<span className="px-1 py-0.2 bg-primary-container text-on-primary rounded text-[9px] uppercase font-bold tracking-wider">Today</span>
</div>
<span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-label-sm font-semibold bg-secondary-container text-on-secondary-container">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Fully staffed
            </span>
</div>
<div className="font-body-sm text-body-sm text-on-surface">
<span>Morn: <strong>3/3</strong></span> · <span>Eve: <strong>4/4</strong></span>
</div>
</div>

<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between gap-1.5 transition-all">
<div className="flex items-center justify-between">
<span className="font-label-md font-bold text-on-surface">Wed, Oct 16</span>
<span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-label-sm font-semibold bg-secondary-container text-on-secondary-container">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Fully staffed
            </span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">
<span>Morn: <strong>3/3</strong></span> · <span>Eve: <strong>4/4</strong></span>
</div>
</div>

<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between gap-1.5 transition-all">
<div className="flex items-center justify-between">
<span className="font-label-md font-bold text-on-surface">Thu, Oct 17</span>
<span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-label-sm font-semibold bg-secondary-container text-on-secondary-container">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Fully staffed
            </span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">
<span>Morn: <strong>3/3</strong></span> · <span>Eve: <strong>4/4</strong></span>
</div>
</div>

<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between gap-1.5 transition-all" id="friday-summary-card">
<div className="flex items-center justify-between">
<span className="font-label-md font-bold text-on-surface">Fri, Oct 18</span>
<span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-label-sm font-semibold bg-secondary-container text-on-secondary-container" id="friday-badge">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Fully staffed
            </span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant" id="friday-ratio-info">
<span>Morn: <strong>3/3</strong></span> · <span>Eve: <strong>4/4</strong></span>
</div>
<div className="hidden mt-0.5" id="friday-fix-btn-container">
<button className="w-full py-1 px-2 rounded-md bg-amber-500 text-surface-container-lowest font-label-sm font-bold flex items-center justify-center gap-1 hover:bg-amber-600 transition-colors shadow-xs" type="button">
<span className="material-symbols-outlined text-[14px]">build</span>
<span>Fix Shift</span>
</button>
</div>
</div>

<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between gap-1.5 transition-all">
<div className="flex items-center justify-between">
<span className="font-label-md font-bold text-on-surface">Sat, Oct 19</span>
<span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-label-sm font-semibold bg-secondary-container text-on-secondary-container">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Fully staffed
            </span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">
<span>Morn: <strong>4/4</strong></span> · <span>Eve: <strong>4/4</strong></span>
</div>
</div>

<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between gap-1.5 transition-all">
<div className="flex items-center justify-between">
<span className="font-label-md font-bold text-on-surface">Sun, Oct 20</span>
<span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-label-sm font-semibold bg-secondary-container text-on-secondary-container">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Fully staffed
            </span>
</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">
<span>Morn: <strong>3/3</strong></span> · <span>Eve: <strong>3/3</strong></span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">

<div className="overflow-x-auto">
<div className="min-w-[1080px] flex flex-col">

<div className="grid grid-cols-[260px_repeat(7,1fr)] bg-surface-container-high py-space-sm px-space-md text-on-surface font-label-md font-semibold uppercase tracking-wider">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">badge</span>
<span>Team Member</span>
</div>
<div className="text-center">Mon 14</div>
<div className="text-center font-bold text-primary flex items-center justify-center gap-1">
<span>Tue 15</span>
<span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
</div>
<div className="text-center">Wed 16</div>
<div className="text-center">Thu 17</div>
<div className="text-center">Fri 18</div>
<div className="text-center">Sat 19</div>
<div className="text-center">Sun 20</div>
</div>


<div className="grid grid-cols-[260px_repeat(7,1fr)] items-center px-space-md py-space-sm hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-sm pr-space-sm">
<img className="w-10 h-10 rounded-full object-cover shrink-0" data-alt="Warm portrait of Priya Sharma, a smiling Indian woman in barista uniform inside a light-filled contemporary artisan coffee bar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCihryyruhp3ckO6hzD4SU-rrXZlmBnK4xMoc2BcmjnOvac5TMnGuMpK68_FO-2pIVnbIk1i-DLsbb_oj5w0iB8ctOhFzEXf4duOMOsa1av7_ErOrfjl9qmbujz2YHUQumUAwsG9hj4oWh-gKJQsENnsK0Vs7xoGPH5G0rGl7DGR71Lge7Mq8XyRoAHrLIp5NL-SJ72byXs9sbuw2umJZsOmt5w49m8AHq8vEL7UvjAP76AfIVtfLen"/>
<div className="flex flex-col min-w-0">
<span className="font-headline-md text-body-lg text-on-surface leading-tight truncate">Priya Sharma</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Senior Barista · Full-time</span>
<span className="font-label-sm text-primary font-semibold">38 hrs assigned</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="leave">
<div className="bg-amber-50 text-amber-900 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-amber-600">beach_access</span>Time Off</span>
<span className="text-[10px] text-amber-700 font-medium">Personal (Approved)</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>
</div>

<div className="grid grid-cols-[260px_repeat(7,1fr)] items-center px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-sm pr-space-sm">
<img className="w-10 h-10 rounded-full object-cover shrink-0" data-alt="Professional headshot of Rahul Patil, an Indian male supervisor in his late twenties with a focused friendly expression inside a modern espresso lounge." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBztOGIVYSqPAGVTZduL46zdYzoYl-xwsxksr5VQp0AGFTWph9UxF_HIee_5fn3Fwm05U09od9PIQ2U1e5l8URRC027cEQ0ntuJlVEd6JB3W2waaUPRkPYg4Lwf7oWkXFgSTx8FStGKszOwV6qwD7QZa9-1X-vkTc_vmgH5WD7hRKvE3rnVSWn-IJmPAIKGvqL1btIzkD8gPEd8GSZFGcLglhPbmDYqL1m5s4Jwav29jDsCeKfLFD5P"/>
<div className="flex flex-col min-w-0">
<span className="font-headline-md text-body-lg text-on-surface leading-tight truncate">Rahul Patil</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Shift Supervisor · Full-time</span>
<span className="font-label-sm text-primary font-semibold">38.5 hrs assigned</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>
</div>

<div className="grid grid-cols-[260px_repeat(7,1fr)] items-center px-space-md py-space-sm bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-sm pr-space-sm">
<img className="w-10 h-10 rounded-full object-cover shrink-0" data-alt="Portrait of Aisha Khan, an energetic young professional South Asian woman in casual apron standing beside stainless steel coffee equipment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUleyhmHGTRv9EA5MKBxFIDmtkqAad_pyEuEAJjNyYrKXxfq7_-vzI8gYffn-TEoMgL7svjR6GV8zktpkeCetOlDmpQvsIDwoov_ERyltRGyzTqUASHG0nVaLdODYaU7VZeigf-BpeJqLkV5erZw4ZPOGzepNGS1Bj29JBPgNxkSZkRRAaVAOLGC-nyAU7KqvvsE1iNgmJnFWQIylXChr3AfMRgL26cDE3Q3BlpFBG3I20b9huz8VA"/>
<div className="flex flex-col min-w-0">
<span className="font-headline-md text-body-lg text-on-surface leading-tight truncate">Aisha Khan</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Head Barista · Full-time</span>
<span className="font-label-sm text-primary font-semibold">36 hrs assigned</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening" id="aisha-fri-cell">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>
</div>

<div className="grid grid-cols-[260px_repeat(7,1fr)] items-center px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-sm pr-space-sm">
<img className="w-10 h-10 rounded-full object-cover shrink-0" data-alt="Headshot of Vikram Mehta, an affable young male clerk with glasses in a tidy retail hospitality environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO20JVfIDUVJMWFjvQtjEvaJX-WUPYqGM-9xth5EzleDipXfyuTHNSR1S0G3WHARF9ZRwPhhKsF8KFMinPPLb3ycuvt1VzFHcOlWzH2SD2NBxIBdGv7DAKJ3pcJz4ssRl3yQDkmkWAKk1Mev-nAcLmVKdYVJ82-gzTCKoTCNS7ZXXmtbP4k9PwNGfiJHcjFum-BMp9Z5xntOkKv0GAz6FkKf3ehA6hO3CLi4wU5lRIe93ltYwjOr3w"/>
<div className="flex flex-col min-w-0">
<span className="font-headline-md text-body-lg text-on-surface leading-tight truncate">Vikram Mehta</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Counter &amp; POS · Part-time</span>
<span className="font-label-sm text-primary font-semibold">24 hrs assigned</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>
</div>

<div className="grid grid-cols-[260px_repeat(7,1fr)] items-center px-space-md py-space-sm bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-sm pr-space-sm">
<img className="w-10 h-10 rounded-full object-cover shrink-0" data-alt="Portrait of Kavita Nair, an experienced Indian female closing manager in casual dark shirt in a calm warm café setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuByTsh-Slacq9kxoNRxUWixXr6bkV8IGOHAKvEoq7qLYJjjj3ShKMpQv4Hupp9OqEYSxXHUVLZdFpg0yimCZPn8c7JG-YjOtdITMUMQ26bAlVIhqGnQvgHcBosIXpV0szZTsbcy_B6zcu2Wg44Ib2tpOLAjCDRXA6hZ0VZY8VaQ00amCiPBCvJ60VruaBzXtFbL1-Kot2CpZsFOErdNe2e-wcwR7uXeWP05-Jh_rF_XLdesOCaZZEeP"/>
<div className="flex flex-col min-w-0">
<span className="font-headline-md text-body-lg text-on-surface leading-tight truncate">Kavita Nair</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Closing Manager · Full-time</span>
<span className="font-label-sm text-primary font-semibold">38 hrs assigned</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>
</div>

<div className="grid grid-cols-[260px_repeat(7,1fr)] items-center px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-sm pr-space-sm">
<img className="w-10 h-10 rounded-full object-cover shrink-0" data-alt="Headshot photo of Arjun Patel, a college student barista with cheerful demeanor holding a clean cup in an artisan roastery." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjjp0Wa_RiQtWBlAqjOYEdXnVF_7fmgZuOtFD7otYpzIHF-X3A8ZgRjw6J3y95-hbYdi5KbthkAdyxqSNbz3pJaF0Iiy_Vj27ZQ590o6vwfHnifUQSoJIyYsu1XGpE7lXdOb7FQsDhlwaceCPJTlJLGyKmNZVzcEn90fMwn3BbGm_H8x4weR26QyE4ocLc6rqHpk2Ll62JDZkXUAe7rfnDrJzAn7Mcm0Vu9P8LsDdXSPRH66pWHJN2"/>
<div className="flex flex-col min-w-0">
<span className="font-headline-md text-body-lg text-on-surface leading-tight truncate">Arjun Patel</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Barista · Part-time</span>
<span className="font-label-sm text-primary font-semibold">25 hrs assigned</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>
</div>

<div className="grid grid-cols-[260px_repeat(7,1fr)] items-center px-space-md py-space-sm bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-sm pr-space-sm">
<img className="w-10 h-10 rounded-full object-cover shrink-0" data-alt="Portrait of Sneha Roy, a cheerful Indian young woman in customer service uniform smiling at counter of coffee store." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYscK3Vr3R2HncavodcTGxyTsIDLUfhGOWhOFVqMbHj1cw7-PwU5ScUi4_ezEJA_bZyc9nsKJfsSzhIUbr0iozS1WyPnAZoJ4HKXFxZD619W1kP4sjtyJQpnV4m_kE9cZk6F7996LCqOapeXed77ryaIGkCHGRvZBGgJzzJ4_C5XUlStKh5qf8MKMeEtaxThxtTQalofqdK1yvrGaF0heTgQRnI_6F_b07bYNd0kR_N5pdtD-VpsKJ"/>
<div className="flex flex-col min-w-0">
<span className="font-headline-md text-body-lg text-on-surface leading-tight truncate">Sneha Roy</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Customer Service · Part-time</span>
<span className="font-label-sm text-primary font-semibold">24 hrs assigned</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>
</div>

<div className="grid grid-cols-[260px_repeat(7,1fr)] items-center px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-space-sm pr-space-sm">
<img className="w-10 h-10 rounded-full object-cover shrink-0" data-alt="Portrait photo of David Lobo, a skilled culinary kitchen prep cook in clean black chef coat inside modern bakery prep room." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbtP3LB2vl2MacDXDeASxkPd1XpC1dp4Lr4BWPTGdcf0CQWaGs5jO9YgSJvW6tR39jhFYu98IIsKd4REggHWPNrh8cxkj_U4PTjJemAj4g6USh54vU4o4NdN-j6APXeMpD670rKvF_f2uuxLbO_8nGI00UHVCYBs5hqRl1XZ8R7ubPHZmZXpKp2Ovd32MIIQKLzH1JtDP777TAwti6tvPbFkyUIBXvH58AjJbcorC9fD8S48pq-j8D"/>
<div className="flex flex-col min-w-0">
<span className="font-headline-md text-body-lg text-on-surface leading-tight truncate">David Lobo</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Kitchen &amp; Prep · Full-time</span>
<span className="font-label-sm text-primary font-semibold">37 hrs assigned</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="off">
<div className="bg-surface-container-high/60 text-on-surface-variant p-space-xs rounded-lg text-center flex flex-col justify-center min-h-[44px]">
<span className="font-label-sm font-medium">Day Off</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="morning">
<div className="bg-emerald-50 text-emerald-950 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Morning</span>
<span className="text-[11px] font-mono text-emerald-800">7:00–15:30</span>
</div>
</div>

<div className="p-1 shift-cell" data-shift="evening">
<div className="bg-slate-100 text-slate-800 p-space-xs rounded-lg flex flex-col gap-0.5">
<span className="font-label-sm font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>Evening</span>
<span className="text-[11px] font-mono text-slate-700">15:00–23:30</span>
</div>
</div>
</div>
</div>
</div>

<footer className="p-space-md bg-surface-container-low flex flex-wrap items-center justify-between text-label-sm text-on-surface-variant gap-space-md">
<div className="flex items-center gap-space-lg">
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-sm bg-emerald-100 inline-block"></span>
<span>Morning (7:00–15:30)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-sm bg-slate-200 inline-block"></span>
<span>Evening (15:00–23:30)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-sm bg-amber-100 inline-block"></span>
<span>Approved Time Off</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-sm bg-surface-container-high inline-block"></span>
<span>Scheduled Rest Day</span>
</div>
</div>
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[16px] text-primary">lock_clock</span>
<span>Mandatory 14-hour minimum rest guaranteed across shifts</span>
</div>
</footer>
</div>
</div>

<div className="hidden flex-col items-center justify-center py-20 px-space-lg bg-surface-container-lowest rounded-xl shadow-sm text-center" id="workspace-empty-view">
<div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-primary-container mb-space-lg shadow-sm">
<span className="material-symbols-outlined text-[40px]">calendar_add_on</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">No schedule built yet for this week.</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-space-xl">
      Tell us who can work and your store hours, and OptiShift will build your schedule in one click.
    </p>
<div className="flex flex-col sm:flex-row items-center gap-space-md">
<button className="flex items-center gap-space-xs px-space-xl py-3 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all font-label-md font-bold shadow-md" type="button">
<span className="material-symbols-outlined text-[20px]">auto_awesome</span>
<span>Build My Schedule</span>
</button>
<button className="px-space-lg py-3 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-all font-label-md font-medium" type="button">
        Load Sample Template
      </button>
</div>
</div>

<div className="hidden fixed inset-0 z-50 flex items-center justify-center p-space-lg bg-inverse-surface/40 backdrop-blur-xs" id="modal-what-changed">
<div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-xl p-space-lg flex flex-col gap-space-md animate-in fade-in zoom-in-95 duration-200">
<div className="flex items-start justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">published_with_changes</span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">See What Changed</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Optimal schedule rebalancing explanation</p>
</div>
</div>
<button aria-label="Close modal" className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-low transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
<span className="font-label-md font-bold text-on-surface">Schedule updated because:</span>
<ul className="flex flex-col gap-space-sm text-body-md text-on-surface-variant font-body-md">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5">event_busy</span>
<span><strong>Priya Sharma</strong> is taking Friday off (Personal leave).</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">swap_horiz</span>
<span><strong>Aisha Khan</strong> was moved to Friday morning so customer rush is fully covered.</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">bedtime</span>
<span>Everyone still has at least <strong>14 hours of rest</strong> between consecutive shifts.</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">savings</span>
<span>Zero extra hours or overtime added (Staff cost stayed strictly at <strong>₹42,680</strong>).</span>
</li>
</ul>
</div>

<div className="flex items-center justify-end gap-space-sm pt-space-xs">
<button className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md font-semibold" type="button">
          Close
        </button>
<button className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-md font-semibold flex items-center gap-1 shadow-xs" type="button">
<span className="material-symbols-outlined text-[18px]">print</span>
<span>Print Schedule</span>
</button>
</div>
</div>
</div>

<div className="hidden fixed inset-0 z-50 flex items-center justify-center p-space-lg bg-inverse-surface/40 backdrop-blur-xs" id="modal-updating-progress">
<div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-xl p-space-xl flex flex-col gap-space-lg animate-in fade-in zoom-in-95 duration-200">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[28px] animate-spin">sync</span>
</div>
<div className="flex flex-col">
<h3 className="font-headline-md text-headline-md text-on-surface">Updating Schedule</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">OptiShift AI solver running checks</p>
</div>
</div>

<div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl">
<div className="flex items-center gap-2 text-body-md text-on-surface font-medium" id="step-1">
<span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
<span>Checking your team...</span>
</div>
<div className="flex items-center gap-2 text-body-md text-on-surface font-medium" id="step-2">
<span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
<span>Checking when people can work...</span>
</div>
<div className="flex items-center gap-2 text-body-md text-on-surface font-medium" id="step-3">
<span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
<span>Checking your business rules...</span>
</div>
<div className="flex items-center gap-2 text-body-md text-on-surface font-medium animate-pulse" id="step-4">
<span className="material-symbols-outlined text-[18px] text-primary-container">hourglass_top</span>
<span>Making the best schedule...</span>
</div>
<div className="flex items-center gap-2 text-body-md text-on-surface-variant" id="step-5">
<span className="material-symbols-outlined text-[18px]">radio_button_unchecked</span>
<span>Finishing up...</span>
</div>
</div>

<div className="flex flex-col gap-1.5">
<div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
<div className="bg-primary-container h-full rounded-full transition-all duration-300 w-3/4" id="progress-bar-fill"></div>
</div>
<span className="font-label-sm text-body-sm text-on-surface-variant text-center">Your new schedule will be ready in seconds.</span>
</div>
<div className="flex justify-center">
<button className="text-body-sm text-on-surface-variant hover:text-on-surface font-medium underline" type="button">
          Cancel &amp; Return
        </button>
</div>
</div>
</div>
</div>
`;
  return (
    <div className="flex flex-col w-full" dangerouslySetInnerHTML={{__html: html}} />
  );
}
