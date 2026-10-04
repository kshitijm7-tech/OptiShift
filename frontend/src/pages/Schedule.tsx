import { useState, useMemo } from 'react';
import { useCurrentSchedule, useEmployees } from '../hooks';
import { optimizeSchedule } from '../api';

export default function Schedule() {
  const { schedule, loading: scheduleLoading } = useCurrentSchedule();
  const { employees } = useEmployees();
  
  const [isGenerating, setIsGenerating] = useState(false);

  const activeTeam = useMemo(() => employees.filter(e => (e.status || '').toLowerCase() === 'active'), [employees]);
  const dates = useMemo(() => {
    const today = new Date();
    return Array.from({length: 7}).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, []);
  
  const shiftsByEmployee = useMemo(() => {
    const map = new Map();
    if (!schedule || !schedule.assignments || !schedule.shifts) return map;
    schedule.assignments.forEach(a => {
      const shift = schedule.shifts.find(s => s.id === a.shift_id);
      if (shift) {
        const empShifts = map.get(a.employee_id) || [];
        empShifts.push({ date: shift.start_time.split('T')[0], shift });
        map.set(a.employee_id, empShifts);
      }
    });
    return map;
  }, [schedule]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await optimizeSchedule({} as any);
      window.location.reload();
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg" id="workspace-loaded-view">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Your Schedule</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">See who is working each day and ensure every shift has enough people.</p>
        </div>
        <div className="flex flex-wrap items-center gap-space-md">
          <nav aria-label="Schedule Period Navigation" className="flex items-center bg-surface-container-low p-1 rounded-xl shadow-xs">
            <button className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors" type="button">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-1.5 px-space-md py-1 text-on-surface font-label-md font-semibold">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
              <span>This Week</span>
            </div>
            <button className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors" type="button">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </nav>
          <div className="flex items-center gap-space-xs">
            <button onClick={handleGenerate} disabled={isGenerating} className="flex items-center gap-space-xs px-space-lg py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all font-label-md font-semibold shadow-xs" type="button">
              <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
              <span>{isGenerating ? "Generating..." : "Auto-Generate Optimal"}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto min-h-[600px] relative">
          <div className="grid grid-cols-[260px_repeat(7,1fr)] bg-surface-container-high py-space-sm px-space-md text-on-surface font-label-md font-semibold uppercase tracking-wider">
            <div className="pl-space-sm">Team Member</div>
            {dates.map((d, i) => (
              <div key={i} className={`text-center ${i === 2 ? 'text-primary' : ''}`}>
                 {d.toLocaleDateString('en-US', { weekday: 'short' })} <span className="font-normal text-on-surface-variant">{d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric'})}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col divide-y divide-surface-container-low max-h-[500px] overflow-y-auto pb-space-lg custom-scrollbar">
            {scheduleLoading ? <div className="p-8 text-center">Loading schedule...</div> :
             activeTeam.map((emp, idx) => {
              const empShifts = shiftsByEmployee.get(emp.id) || [];
              return (
                <div key={emp.id} className={`grid grid-cols-[260px_repeat(7,1fr)] items-center px-space-md py-space-sm hover:bg-surface-container-low transition-colors ${idx % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/40'}`}>
                   <div className="flex items-center gap-space-sm pr-space-sm">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface font-bold text-xs">{emp.name.charAt(0)}</div>
                      <div className="flex flex-col min-w-0">
                         <span className="font-label-md font-semibold text-on-surface truncate">{emp.name}</span>
                         <span className="font-body-sm text-on-surface-variant truncate">{emp.role || 'Staff'}</span>
                      </div>
                   </div>
                   {dates.map((d, i) => {
                      const offset = d.getTimezoneOffset()
                      const normalized = new Date(d.getTime() - (offset*60*1000))
                      const dateStr = normalized.toISOString().split('T')[0];
                      const dayShifts = empShifts.filter((s: any) => s.date === dateStr);
                      return (
                        <div key={i} className="px-space-xs flex flex-col gap-1 min-h-[48px] justify-center">
                           {dayShifts.length > 0 ? (
                             dayShifts.map((s: any, j: number) => (
                               <div key={j} className="bg-primary-fixed border border-primary-fixed-dim rounded-md px-2 py-1 text-center cursor-pointer hover:shadow-sm transition-shadow">
                                 <div className="font-label-sm font-semibold text-on-primary-fixed">{new Date(s.shift.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(s.shift.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                 <div className="text-[10px] text-on-primary-fixed-variant leading-none mt-0.5">{s.shift.role_req}</div>
                               </div>
                             ))
                           ) : (
                             <div className="text-center font-body-sm text-on-surface-variant/40">-</div>
                           )}
                        </div>
                      )
                   })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
