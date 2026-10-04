// My Team page (P04): roster from GET /api/v1/employees + add member.
// The backend API is the source of truth; no second employee model lives
// in the frontend. Full loading / empty / error states included.
import { useMemo, useState } from 'react';
import { Search, UserPlus, Users } from 'lucide-react';
import { createEmployee, friendlyErrorMessage } from '../api';
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
import { formatAvailability, useEmployees } from '../hooks';
import type { EmployeeCreate } from '../types';

type Filter = 'all' | 'active' | 'inactive';

export default function Team() {
  const { employees, loading, error, reload } = useEmployees();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    role: 'Barista',
    skills: '',
    hourly_pay: '15',
    max_weekly_hours: '24',
    status: 'active',
  });

  const counts = useMemo(() => {
    const active = employees.filter(
      (e) => (e.status || '').toLowerCase() === 'active',
    ).length;
    return { all: employees.length, active, inactive: employees.length - active };
  }, [employees]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return employees.filter((e) => {
      if (filter === 'active' && (e.status || '').toLowerCase() !== 'active')
        return false;
      if (filter === 'inactive' && (e.status || '').toLowerCase() === 'active')
        return false;
      if (q && !`${e.name} ${e.role} ${(e.skills ?? []).join(' ')}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [employees, filter, query]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const pay = Number(form.hourly_pay);
    const maxHours = Number(form.max_weekly_hours);
    if (!form.name.trim() || !form.role.trim()) {
      setFormError('Name and role are required.');
      return;
    }
    if (!(pay >= 0) || !(maxHours >= 0)) {
      setFormError('Hourly pay and max weekly hours must be zero or more.');
      return;
    }
    const payload: EmployeeCreate = {
      name: form.name.trim(),
      role: form.role.trim(),
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      hourly_pay: pay,
      max_weekly_hours: maxHours,
      availability: [],
      status: form.status,
    };
    setSaving(true);
    try {
      await createEmployee(payload);
      setForm({ name: '', role: 'Barista', skills: '', hourly_pay: '15', max_weekly_hours: '24', status: 'active' });
      setShowForm(false);
      reload();
    } catch (err: unknown) {
      setFormError(friendlyErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    'h-9 rounded-md border border-[#D1D5DB] bg-white px-2 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#166534] focus:outline-none';

  return (
    <>
      <PageHeader
        eyebrow="Team directory"
        title="My Team"
        subtitle="Active roster. Add your team and tell us when and where they can work."
        actions={
          <PrimaryButton onClick={() => setShowForm((s) => !s)}>
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Add Team Member
          </PrimaryButton>
        }
      />

      {showForm && (
        <Card>
          <h2 className="mb-1 text-[15px] font-semibold text-[#111827]">
            Add team member
          </h2>
          <p className="mb-3 text-[12px] text-[#6B7280]">
            New members start with open availability (available for any shift).
          </p>
          <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
              Name
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                placeholder="Priya Sharma"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
              Role
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={inputCls}
                placeholder="Barista"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
              Skills (comma separated)
              <input
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                className={inputCls}
                placeholder="barista, cashier"
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
              Hourly pay
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.hourly_pay}
                onChange={(e) => setForm({ ...form, hourly_pay: e.target.value })}
                className={inputCls}
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
              Max weekly hours
              <input
                type="number"
                min={0}
                step="0.5"
                value={form.max_weekly_hours}
                onChange={(e) => setForm({ ...form, max_weekly_hours: e.target.value })}
                className={inputCls}
              />
            </label>
            <label className="flex flex-col gap-1 text-[12px] font-medium text-[#374151]">
              Status
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={inputCls}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-3">
              <PrimaryButton type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save member'}
              </PrimaryButton>
              <SecondaryButton onClick={() => setShowForm(false)}>
                Cancel
              </SecondaryButton>
            </div>
            {formError && (
              <p className="text-[13px] text-[#B91C1C] sm:col-span-2 lg:col-span-3">
                {formError}
              </p>
            )}
          </form>
        </Card>
      )}

      {loading && <LoadingState message="Loading your team..." />}

      {error && (
        <ErrorState
          title="Couldn't load your team. Please try again."
          body={error}
          retry={<SecondaryButton onClick={reload}>Try again</SecondaryButton>}
        />
      )}

      {!loading && !error && employees.length === 0 && (
        <EmptyState
          icon={<Users className="h-8 w-8" aria-hidden="true" />}
          title="No team members yet."
          body="Add your first team member above. OptiShift schedules real people — nothing here is sample data."
          action={
            <PrimaryButton onClick={() => setShowForm(true)}>
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Add Team Member
            </PrimaryButton>
          }
        />
      )}

      {!loading && !error && employees.length > 0 && (
        <Card className="!p-0">
          <div className="flex flex-col gap-3 border-b border-[#F3F4F6] p-4 sm:flex-row sm:items-center">
            <div className="flex gap-2" role="group" aria-label="Status filter">
              {(
                [
                  ['all', `All (${counts.all})`],
                  ['active', `Active (${counts.active})`],
                  ['inactive', `Inactive (${counts.inactive})`],
                ] as [Filter, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`h-8 rounded-md px-3 text-[12px] font-medium ${
                    filter === key
                      ? 'bg-[#166534] text-white'
                      : 'bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative sm:ml-auto">
              <Search
                className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-[#9CA3AF]"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, role, skill…"
                className={`${inputCls} w-full pl-8 sm:w-64`}
                aria-label="Search team"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F9FAFB] text-[11px] uppercase text-[#6B7280]">
                  <th className="px-4 py-2 font-semibold">Person</th>
                  <th className="px-4 py-2 font-semibold">Skills</th>
                  <th className="px-4 py-2 font-semibold">Weekly availability</th>
                  <th className="px-4 py-2 text-right font-semibold">Hourly rate</th>
                  <th className="px-4 py-2 text-right font-semibold">Max hrs</th>
                  <th className="px-4 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[13px]">
                {visible.map((e) => {
                  const isActive = (e.status || '').toLowerCase() === 'active';
                  return (
                    <tr key={e.id} className="hover:bg-[#F9FAFB]">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-[11px] font-semibold text-[#374151]">
                            {e.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-[#111827]">{e.name}</p>
                            <p className="truncate text-[12px] text-[#6B7280]">{e.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex max-w-56 flex-wrap gap-1">
                          {(e.skills ?? []).length === 0 && (
                            <span className="text-[12px] text-[#9CA3AF]">—</span>
                          )}
                          {(e.skills ?? []).map((s) => (
                            <StatusBadge key={s} tone="neutral">
                              {s}
                            </StatusBadge>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-[#374151]">
                        {formatAvailability(e)}
                      </td>
                      <td className="tnum whitespace-nowrap px-4 py-2.5 text-right text-[#111827]">
                        ${e.hourly_pay.toFixed(2)}
                      </td>
                      <td className="tnum whitespace-nowrap px-4 py-2.5 text-right text-[#111827]">
                        {e.max_weekly_hours}
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusBadge tone={isActive ? 'success' : 'neutral'}>
                          {isActive ? 'Active' : e.status}
                        </StatusBadge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {visible.length === 0 && (
              <p className="p-6 text-center text-[13px] text-[#6B7280]">
                No team members match this filter.
              </p>
            )}
          </div>
        </Card>
      )}
    </>
  );
}
