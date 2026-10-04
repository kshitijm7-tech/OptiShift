// Settings page (P04): minimal Stitch-faithful shell.
// Only the backend-connection card shows live data; the rest is static
// display structure (no auth/billing/admin infrastructure in P04).
import { Bell, Store, User } from 'lucide-react';
import { API_BASE_URL, checkHealth } from '../api';
import { useEffect, useState } from 'react';
import {
  Card,
  LoadingState,
  PageHeader,
  StatusBadge,
} from '../components/ui';

export default function Settings() {
  const [backend, setBackend] = useState<'checking' | 'ok' | 'down'>('checking');

  useEffect(() => {
    checkHealth()
      .then(() => setBackend('ok'))
      .catch(() => setBackend('down'));
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Store & preferences"
        title="Settings"
        subtitle="Manage your business profile and OptiShift preferences."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <Store className="h-4 w-4 text-[#166534]" aria-hidden="true" />
            <h2 className="text-[15px] font-semibold text-[#111827]">
              Business profile
            </h2>
          </div>
          <dl className="flex flex-col gap-2 text-[13px]">
            <div className="flex justify-between border-b border-[#F3F4F6] pb-2">
              <dt className="text-[#6B7280]">Business name</dt>
              <dd className="font-medium text-[#111827]">UrbanBrew Café</dd>
            </div>
            <div className="flex justify-between border-b border-[#F3F4F6] pb-2">
              <dt className="text-[#6B7280]">Location</dt>
              <dd className="font-medium text-[#111827]">Mumbai Outlet</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#6B7280]">Week starts</dt>
              <dd className="font-medium text-[#111827]">Monday</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <div className="mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4 text-[#166534]" aria-hidden="true" />
            <h2 className="text-[15px] font-semibold text-[#111827]">
              Backend connection
            </h2>
          </div>
          {backend === 'checking' && <LoadingState message="Checking your backend..." />}
          {backend !== 'checking' && (
            <dl className="flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between border-b border-[#F3F4F6] pb-2">
                <dt className="text-[#6B7280]">API URL</dt>
                <dd className="tnum font-medium text-[#111827]">{API_BASE_URL}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[#6B7280]">Status</dt>
                <dd>
                  {backend === 'ok' ? (
                    <StatusBadge tone="success">Connected</StatusBadge>
                  ) : (
                    <StatusBadge tone="error">Unreachable</StatusBadge>
                  )}
                </dd>
              </div>
            </dl>
          )}
        </Card>

        <Card>
          <div className="mb-3 flex items-center gap-2">
            <User className="h-4 w-4 text-[#166534]" aria-hidden="true" />
            <h2 className="text-[15px] font-semibold text-[#111827]">
              Account & workspace
            </h2>
          </div>
          <dl className="flex flex-col gap-2 text-[13px]">
            <div className="flex justify-between border-b border-[#F3F4F6] pb-2">
              <dt className="text-[#6B7280]">Owner</dt>
              <dd className="font-medium text-[#111827]">Alex Morgan</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#6B7280]">Sign-in & billing</dt>
              <dd>
                <StatusBadge tone="neutral">Not in P04 scope</StatusBadge>
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </>
  );
}
