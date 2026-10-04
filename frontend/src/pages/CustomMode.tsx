// Custom Mode page (P08): guided setup — Business → Team → Shifts →
// Staffing → Review — then Build My Schedule through the shared P03 engine.
//
// The wizard only COLLECTS configuration. It never maps rules, never
// decides assignments, never solves: POST /api/v1/schedules/build carries
// the raw configuration and the backend translates + optimizes. Results
// render in the existing Schedule experience (/schedule), which reads the
// same current-schedule store every other build uses.
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  ClipboardList,
  Plus,
  Scale,
  Trash2,
  Users,
  Zap,
} from 'lucide-react';
import { buildCustomSchedule, friendlyErrorMessage } from '../api';
import {
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
} from '../components/ui';
import { useEmployees } from '../hooks';
import { mondayOf, slug, toDateStr, weekDays } from '../schedule';
import type { CustomScheduleConfig, Shift } from '../types';

const STEPS = [
  { label: 'Business', hint: 'Type & details' },
  { label: 'Team', hint: 'Who can work' },
  { label: 'Shifts', hint: 'When you need cover' },
  { label: 'Staffing', hint: 'How many & what skills' },
  { label: 'Review', hint: 'Ready to solve' },
] as const;

interface DraftShift {
  key: number;
  date: string; // YYYY-MM-DD
  name: string;
  start: string; // HH:MM
  end: string; // HH:MM
  role: string; // empty = anyone
}

interface DraftStaffing {
  minStaff: number;
  skills: string; // comma separated
}

const FALLBACK_STAFFING: DraftStaffing = { minStaff: 1, skills: '' };

function defaultShifts(): { shifts: DraftShift[]; staffing: Record<number, DraftStaffing> } {
  const days = weekDays(mondayOf(new Date())).slice(0, 5); // Mon–Fri
  const shifts: DraftShift[] = [];
  const staffing: Record<number, DraftStaffing> = {};
  let key = 1;
  for (const day of days) {
    const date = toDateStr(day);
    for (const window of [
      { name: 'Morning', start: '08:00', end: '12:00' },
      { name: 'Evening', start: '16:00', end: '20:00' },
    ]) {
      shifts.push({ key, date, name: window.name, start: window.start, end: window.end, role: '' });
      staffing[key] = { minStaff: 1, skills: '' };
      key += 1;
    }
  }
  return { shifts, staffing };
}

export default function CustomMode() {
  const navigate = useNavigate();
  const { employees, loading: teamLoading, error: teamError, reload: reloadTeam } = useEmployees();

  const [step, setStep] = useState(0);
  const [businessName, setBusinessName] = useState('UrbanBrew Café');
  const [location, setLocation] = useState('Mumbai');
  const [selectedIds, setSelectedIds] = useState<string[] | null>(null); // null = not yet initialized
  const [draft] = useState(defaultShifts);
  const [shifts, setShifts] = useState<DraftShift[]>(draft.shifts);
  const [staffing, setStaffing] = useState<Record<number, DraftStaffing>>(draft.staffing);
  const [costPriority, setCostPriority] = useState('1.0');
  const [balancePriority, setBalancePriority] = useState('0.5');
  const [building, setBuilding] = useState(false);
  const [buildError, setBuildError] = useState<string | null>(null);
  const [infeasible, setInfeasible] = useState<string[] | null>(null);

  const activeTeam = useMemo(
    () => employees.filter((e) => (e.status || '').toLowerCase() === 'active'),
    [employees],
  );
  // Default selection: everyone active, once the roster loads.
  const selected = selectedIds ?? activeTeam.map((e) => e.id);

  const activeCount = activeTeam.length;
  const selectedEmployees = useMemo(
    () => employees.filter((e) => selected.includes(e.id)),
    [employees, selected],
  );

  const totalSlots = useMemo(
    () =>
      shifts.reduce(
        (sum, s) => sum + Math.max(0, Math.floor(staffing[s.key]?.minStaff ?? 0)),
        0,
      ),
    [shifts, staffing],
  );

  const dates = useMemo(() => {
    const ds = [...new Set(shifts.map((s) => s.date))].sort();
    return ds.length > 0 ? `${ds[0]} → ${ds[ds.length - 1]}` : '—';
  }, [shifts]);

  // --- step validation (customer-facing gating, no business logic) ---
  const businessValid = businessName.trim().length > 0;
  const teamValid = selectedEmployees.length > 0;
  const shiftsValid =
    shifts.length > 0 &&
    shifts.every((s) => s.date.trim() && s.name.trim() && s.start && s.end);
  const rulesValid =
    costPriority.trim() !== '' &&
    balancePriority.trim() !== '' &&
    Number(costPriority) >= 0 &&
    Number(balancePriority) >= 0 &&
    Number.isFinite(Number(costPriority)) &&
    Number.isFinite(Number(balancePriority));
  const stepValid = [businessValid, teamValid, shiftsValid, true, rulesValid][step] ?? false;

  function toggleMember(id: string) {
    const base = selectedIds ?? activeTeam.map((e) => e.id);
    setSelectedIds(
      base.includes(id) ? base.filter((x) => x !== id) : [...base, id],
    );
  }

  function updateShift(key: number, patch: Partial<DraftShift>) {
    setShifts((rows) => rows.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }

  function addShift() {
    setShifts((rows) => {
      if (rows.length >= 30) return rows;
      const key = Math.max(...rows.map((r) => r.key)) + 1;
      const date = rows.length > 0 ? rows[rows.length - 1].date : toDateStr(new Date());
      return [...rows, { key, date, name: 'Custom', start: '09:00', end: '13:00', role: '' }];
    });
    setStaffing((prev) => {
      const key = Math.max(...shifts.map((r) => r.key), 0) + 1;
      return key in prev ? prev : { ...prev, [key]: { minStaff: 1, skills: '' } };
    });
  }

  function removeShift(key: number) {
    setShifts((rows) => (rows.length <= 1 ? rows : rows.filter((r) => r.key !== key)));
    setStaffing((prev) => {
      if (shifts.length <= 1) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function updateStaffing(key: number, patch: Partial<DraftStaffing>) {
    setStaffing((prev) => ({
      ...prev,
      [key]: { ...FALLBACK_STAFFING, ...prev[key], ...patch },
    }));
  }

  async function buildSchedule() {
    setBuildError(null);
    setInfeasible(null);
    if (!businessValid || !teamValid || !shiftsValid || !rulesValid) {
      setBuildError('Some scheduling details need attention before we can build your schedule.');
      return;
    }
    const builtShifts: Shift[] = [];
    const builtRequirements: CustomScheduleConfig['requirements'] = [];
    for (const s of shifts) {
      const id = `custom-${slug(s.name || 'shift')}-${s.key}-${s.date}`;
      builtShifts.push({
        id,
        name: s.name.trim(),
        shift_date: s.date,
        start_time: `${s.start}:00`.slice(0, 8),
        end_time: `${s.end}:00`.slice(0, 8),
        required_role: s.role.trim() === '' ? null : s.role.trim(),
      });
      const st = staffing[s.key] ?? { minStaff: 1, skills: '' };
      builtRequirements.push({
        id: `req-${id}`,
        shift_id: id,
        min_employees: Math.max(0, Math.floor(st.minStaff)),
        required_skills: st.skills
          .split(',')
          .map((x) => x.trim())
          .filter((x) => x.length > 0),
      });
    }
    const config: CustomScheduleConfig = {
      business: { name: businessName.trim(), location: location.trim() },
      employees: selectedEmployees,
      shifts: builtShifts,
      requirements: builtRequirements,
      rules: {
        labor_cost_weight: Number(costPriority),
        work_balance_weight: Number(balancePriority),
      },
    };
    setBuilding(true);
    try {
      const res = await buildCustomSchedule(config);
      if (res.status === 'optimal') {
        // Stored as the current schedule by the shared path; the existing
        // Schedule experience renders it.
        navigate('/schedule');
      } else {
        setInfeasible(res.violations);
      }
    } catch (e: unknown) {
      setBuildError(friendlyErrorMessage(e));
    } finally {
      setBuilding(false);
    }
  }

  const inputCls =
    'h-9 rounded-md border border-[#D1D5DB] bg-white px-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#166534] focus:outline-none';

  return (
    <>
      <PageHeader
        eyebrow="Custom setup"
        title="Create Your Schedule"
        subtitle="Tell us about your business and team. We'll build the optimal schedule for you."
        actions={
          <StatusBadge tone="info">Custom Schedule Builder</StatusBadge>
        }
      />

      {/* Stepper */}
      <ol className="flex flex-wrap items-center gap-1" aria-label="Setup steps">
        {STEPS.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={s.label} className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setStep(i)}
                disabled={i > step}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  active ? 'bg-[#B0F1C7]/40' : 'hover:bg-[#F3F4F6]'
                }`}
                aria-current={active ? 'step' : undefined}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                    done
                      ? 'bg-[#166534] text-white'
                      : active
                        ? 'bg-[#166534] text-white'
                        : 'bg-[#E5E7EB] text-[#4B5563]'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="flex flex-col">
                  <span className="text-[12px] font-medium leading-4 text-[#111827]">{s.label}</span>
                  <span className="text-[11px] text-[#6B7280]">{s.hint}</span>
                </span>
              </button>
              {i < STEPS.length - 1 && <span className="text-[#D1D5DB]">›</span>}
            </li>
          );
        })}
      </ol>

      {teamError && (
        <ErrorState
          title="Couldn't load your team."
          body={teamError}
          retry={<SecondaryButton onClick={reloadTeam}>Try again</SecondaryButton>}
        />
      )}

      {/* Step 1 — Business */}
      {step === 0 && (
        <Card>
          <div className="mb-1 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#166534]" aria-hidden="true" />
            <h2 className="text-[15px] font-semibold text-[#111827]">About Your Business</h2>
          </div>
          <p className="mb-3 text-[12px] text-[#6B7280]">
            This helps label the schedule. Staffing patterns come from your shifts, not this step.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
              Business Name
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className={inputCls}
                placeholder="UrbanBrew Café"
                aria-label="Business name"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
              Location
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputCls}
                placeholder="Mumbai"
                aria-label="Location"
              />
            </label>
          </div>
          {!businessValid && (
            <p className="mt-2 text-[12px] text-[#B91C1C]">Give your business a name to continue.</p>
          )}
        </Card>
      )}

      {/* Step 2 — Team */}
      {step === 1 && (
        <Card>
          <div className="mb-1 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#166534]" aria-hidden="true" />
            <h2 className="text-[15px] font-semibold text-[#111827]">
              Team <span className="font-normal text-[#6B7280]">· {selectedEmployees.length} of {activeCount} included</span>
            </h2>
          </div>
          <p className="mb-3 text-[12px] text-[#6B7280]">
            Choose who this schedule covers. Only active members can be selected — the optimizer
            never schedules anyone else. Manage people on the <Link to="/team" className="font-medium text-[#166534] hover:underline">My Team</Link> page.
          </p>
          {teamLoading && <p className="text-[13px] text-[#6B7280]">Loading your team…</p>}
          {!teamLoading && activeCount === 0 && !teamError && (
            <EmptyState
              icon={<Users className="h-8 w-8" aria-hidden="true" />}
              title="No active team members yet."
              body="Add your team first — Custom Mode schedules real people."
              action={
                <Link to="/team">
                  <PrimaryButton>Go to My Team</PrimaryButton>
                </Link>
              }
            />
          )}
          <ul className="flex flex-col gap-1">
            {employees.map((e) => {
              const isActive = (e.status || '').toLowerCase() === 'active';
              const checked = selected.includes(e.id);
              return (
                <li key={e.id}>
                  <label
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
                      isActive ? 'border-[#E5E7EB] bg-white' : 'border-[#F3F4F6] bg-[#F9FAFB] opacity-60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isActive && checked}
                      disabled={!isActive}
                      onChange={() => toggleMember(e.id)}
                      aria-label={`Include ${e.name}`}
                      className="h-4 w-4 accent-[#166534]"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-[#111827]">{e.name}</span>
                      <span className="block truncate text-[12px] text-[#6B7280]">
                        {e.role} · ${(e.hourly_pay ?? 0).toFixed(2)}/h · max {e.max_weekly_hours}h
                      </span>
                    </span>
                    <StatusBadge tone={isActive ? 'success' : 'neutral'}>
                      {isActive ? 'Active' : e.status}
                    </StatusBadge>
                  </label>
                </li>
              );
            })}
          </ul>
          {teamValid === false && (
            <p className="mt-2 text-[12px] text-[#B91C1C]">Select at least one team member to continue.</p>
          )}
        </Card>
      )}

      {/* Step 3 — Shifts */}
      {step === 2 && (
        <Card>
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#166534]" aria-hidden="true" />
              <h2 className="text-[15px] font-semibold text-[#111827]">Shifts</h2>
            </div>
            <SecondaryButton onClick={addShift} disabled={shifts.length >= 30}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add shift
            </SecondaryButton>
          </div>
          <p className="mb-3 text-[12px] text-[#6B7280]">
            Each row is a real shift the optimizer will staff. Dates, times, and roles are fully editable.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F9FAFB] text-[11px] uppercase text-[#6B7280]">
                  <th className="rounded-l-md px-3 py-2 font-semibold">Date</th>
                  <th className="px-3 py-2 font-semibold">Shift name</th>
                  <th className="px-3 py-2 font-semibold">Start</th>
                  <th className="px-3 py-2 font-semibold">End</th>
                  <th className="px-3 py-2 font-semibold">Required role</th>
                  <th className="rounded-r-md px-3 py-2" aria-label="Actions" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[13px]">
                {shifts.map((s) => (
                  <tr key={s.key} className="hover:bg-[#F9FAFB]">
                    <td className="px-3 py-2">
                      <input
                        type="date"
                        value={s.date}
                        onChange={(e) => updateShift(s.key, { date: e.target.value })}
                        className={inputCls}
                        aria-label="Shift date"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        value={s.name}
                        onChange={(e) => updateShift(s.key, { name: e.target.value })}
                        className={`${inputCls} w-32`}
                        aria-label="Shift name"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="time"
                        value={s.start}
                        onChange={(e) => updateShift(s.key, { start: e.target.value })}
                        className={inputCls}
                        aria-label="Shift start"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="time"
                        value={s.end}
                        onChange={(e) => updateShift(s.key, { end: e.target.value })}
                        className={inputCls}
                        aria-label="Shift end"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        value={s.role}
                        onChange={(e) => updateShift(s.key, { role: e.target.value })}
                        placeholder="Anyone"
                        className={`${inputCls} w-32`}
                        aria-label="Required role"
                      />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => removeShift(s.key)}
                        disabled={shifts.length <= 1}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#B91C1C] disabled:opacity-40"
                        aria-label={`Remove ${s.name} shift`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Step 4 — Staffing */}
      {step === 3 && (
        <Card>
          <div className="mb-1 flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-[#166534]" aria-hidden="true" />
            <h2 className="text-[15px] font-semibold text-[#111827]">
              Staffing <span className="font-normal text-[#6B7280]">· {totalSlots} slots across {shifts.length} shifts</span>
            </h2>
          </div>
          <p className="mb-3 text-[12px] text-[#6B7280]">
            How many people each shift needs, and what skills they must have. These numbers go
            straight to the optimizer — raise one and the next build must fill it.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F9FAFB] text-[11px] uppercase text-[#6B7280]">
                  <th className="rounded-l-md px-3 py-2 font-semibold">Shift</th>
                  <th className="px-3 py-2 font-semibold">Min staff</th>
                  <th className="rounded-r-md px-3 py-2 font-semibold">Required skills</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[13px]">
                {shifts.map((s) => (
                  <tr key={s.key} className="hover:bg-[#F9FAFB]">
                    <td className="px-3 py-2">
                      <span className="font-medium text-[#111827]">{s.name || 'Untitled'}</span>{' '}
                      <span className="tnum text-[12px] text-[#6B7280]">{s.date}</span>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={staffing[s.key]?.minStaff ?? 1}
                        onChange={(e) =>
                          updateStaffing(s.key, { minStaff: Number(e.target.value) })
                        }
                        className={`${inputCls} w-20`}
                        aria-label={`Minimum staff for ${s.name}`}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        value={staffing[s.key]?.skills ?? ''}
                        onChange={(e) => updateStaffing(s.key, { skills: e.target.value })}
                        placeholder="e.g. barista"
                        className={`${inputCls} w-52`}
                        aria-label={`Required skills for ${s.name}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Step 5 — Rules */}
      {step === 4 && (
        <div className="flex flex-col gap-4">
          <Card>
            <div className="mb-1 flex items-center gap-2">
              <Scale className="h-4 w-4 text-[#166534]" aria-hidden="true" />
              <h2 className="text-[15px] font-semibold text-[#111827]">Rules</h2>
            </div>
            <p className="mb-3 text-[12px] text-[#6B7280]">
              Tune what the optimizer prioritizes. Must-have requirements (availability, skills,
              hour limits, staffing) always win — these shape the best compliant roster.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
                Staff Cost priority
                <input
                  type="number"
                  min={0}
                  step="0.5"
                  value={costPriority}
                  onChange={(e) => setCostPriority(e.target.value)}
                  className={inputCls}
                  aria-label="Staff cost priority"
                />
                <span className="font-normal text-[#6B7280]">Higher = cheaper rosters first (default 1.0).</span>
              </label>
              <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
                Work Balance priority
                <input
                  type="number"
                  min={0}
                  step="0.5"
                  value={balancePriority}
                  onChange={(e) => setBalancePriority(e.target.value)}
                  className={inputCls}
                  aria-label="Work balance priority"
                />
                <span className="font-normal text-[#6B7280]">Higher = hours shared more evenly (default 0.5).</span>
              </label>
            </div>
            {!rulesValid && (
              <p className="mt-2 text-[12px] text-[#B91C1C]">Priorities must be numbers zero or above.</p>
            )}
            <div className="mt-3 flex flex-col gap-2 rounded-lg bg-[#F9FAFB] p-3 text-[12px] text-[#4B5563]">
              <p><span className="font-semibold text-[#111827]">Always enforced:</span> weekly hour limits (extra hours are never scheduled), availability windows, and active-only staffing.</p>
            </div>
          </Card>

          <Card>
            <h2 className="mb-2 text-[15px] font-semibold text-[#111827]">Review</h2>
            <dl className="flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between border-b border-[#F3F4F6] pb-2">
                <dt className="text-[#6B7280]">Business</dt>
                <dd className="font-medium text-[#111827]">{businessName.trim() || '—'}{location.trim() ? ` · ${location.trim()}` : ''}</dd>
              </div>
              <div className="flex justify-between border-b border-[#F3F4F6] pb-2">
                <dt className="text-[#6B7280]">Team</dt>
                <dd className="font-medium text-[#111827]">{selectedEmployees.length} selected</dd>
              </div>
              <div className="flex justify-between border-b border-[#F3F4F6] pb-2">
                <dt className="text-[#6B7280]">Shifts</dt>
                <dd className="tnum font-medium text-[#111827]">{shifts.length} shifts · {dates}</dd>
              </div>
              <div className="flex justify-between border-b border-[#F3F4F6] pb-2">
                <dt className="text-[#6B7280]">Staffing</dt>
                <dd className="tnum font-medium text-[#111827]">{totalSlots} slots required</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6B7280]">Rules</dt>
                <dd className="tnum font-medium text-[#111827]">
                  Cost {rulesValid ? Number(costPriority) : '—'} · Balance {rulesValid ? Number(balancePriority) : '—'}
                </dd>
              </div>
            </dl>
          </Card>

          {building && <LoadingState message="Building your schedule..." />}

          {buildError && (
            <ErrorState
              title="Some scheduling details need attention before we can build your schedule."
              body={buildError}
              retry={<SecondaryButton onClick={() => void buildSchedule()}>Try again</SecondaryButton>}
            />
          )}

          {infeasible && (
            <ErrorState
              title="OptiShift couldn't build a schedule that satisfies all current rules."
              body={`Try adjusting staffing or availability. ${infeasible.join(' ')}`}
              retry={<SecondaryButton onClick={() => setStep(3)}>Adjust staffing</SecondaryButton>}
            />
          )}
        </div>
      )}

      {/* Wizard footer */}
      <div className="flex items-center justify-between">
        <SecondaryButton onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0 || building}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </SecondaryButton>
        {step < 4 ? (
          <PrimaryButton onClick={() => setStep((s) => Math.min(4, s + 1))} disabled={!stepValid || building}>
            Continue
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => void buildSchedule()} disabled={!businessValid || !teamValid || !shiftsValid || !rulesValid || building}>
            <Zap className="h-4 w-4" aria-hidden="true" />
            {building ? 'Building…' : 'Build My Schedule'}
          </PrimaryButton>
        )}
      </div>
    </>
  );
}
