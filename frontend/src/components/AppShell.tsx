// AppShell: Full layout shell matching the OptiShift Stitch UI mockups exactly.
// Persistent 256px sidebar, sticky top header, main content area.
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  CalendarDays,
  LayoutDashboard,
  Palmtree,
  Play,
  Settings,
  SlidersHorizontal,
  Store,
  Users,
  Zap,
  Bell,
  HelpCircle,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  hint: string;
  icon: ReactNode;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  {
    to: '/',
    label: 'Overview',
    hint: "Today's summary",
    icon: <LayoutDashboard className="h-[18px] w-[18px]" aria-hidden="true" />,
  },
  {
    to: '/schedule',
    label: 'Schedule',
    hint: 'See who works when',
    icon: <CalendarDays className="h-[18px] w-[18px]" aria-hidden="true" />,
  },
  {
    to: '/demo',
    label: 'Demo Mode',
    hint: 'UrbanBrew walkthrough',
    icon: <Play className="h-[18px] w-[18px]" aria-hidden="true" />,
  },
  {
    to: '/team',
    label: 'My Team',
    hint: 'Staff & work limits',
    icon: <Users className="h-[18px] w-[18px]" aria-hidden="true" />,
  },
  {
    to: '/time-off',
    label: 'Time Off',
    hint: 'Vacation & requests',
    icon: <Palmtree className="h-[18px] w-[18px]" aria-hidden="true" />,
    badge: 1,
  },
  {
    to: '/rules',
    label: 'Rules',
    hint: 'Shift & hour limits',
    icon: <SlidersHorizontal className="h-[18px] w-[18px]" aria-hidden="true" />,
  },
  {
    to: '/settings',
    label: 'Settings',
    hint: 'Store & preferences',
    icon: <Settings className="h-[18px] w-[18px]" aria-hidden="true" />,
  },
];

function SidebarNav() {
  return (
    <nav className="flex flex-col gap-0.5 flex-1" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex items-start gap-3 rounded-lg px-3 py-2 transition-colors ${
              isActive
                ? 'bg-[#E8F5E9] text-[#1B5E20] font-semibold'
                : 'text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`mt-0.5 shrink-0 ${isActive ? 'text-[#166534]' : 'text-[#6B7280]'}`}>
                {item.icon}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-center justify-between">
                  <span className="text-[13px] font-medium leading-5">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-[#9CA3AF] leading-4">{item.hint}</span>
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppShell({
  backendStatus,
  children,
}: {
  backendStatus: string;
  children: ReactNode;
}) {
  const isConnected = backendStatus === 'Backend connected';

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      {/* ── Persistent Sidebar ─────────────────────────────────── */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-[#E5E7EB] bg-white">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-[#F3F4F6]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#166534] text-white shadow-sm">
            <Zap className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold leading-5 text-[#111827]">OptiShift</span>
            <span className="text-[11px] text-[#9CA3AF]">Smart Scheduling</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <SidebarNav />
        </div>

        {/* Help block */}
        <div className="mx-3 mb-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] p-3">
          <div className="flex items-center gap-1.5 text-[#166534] mb-1">
            <HelpCircle className="h-3.5 w-3.5" />
            <span className="text-[12px] font-semibold">Need help?</span>
          </div>
          <p className="text-[11px] text-[#6B7280] leading-4">
            Simple guide to scheduling staff and managing shifts easily.
          </p>
          <a href="#" className="mt-1.5 inline-block text-[11px] font-semibold text-[#166534] hover:underline">
            View documentation →
          </a>
        </div>
      </aside>

      {/* ── Right Panel ────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Sticky Top Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#E5E7EB] bg-white px-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {/* Store Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] cursor-pointer transition-colors">
            <Store className="h-4 w-4 text-[#166534]" aria-hidden="true" />
            <span className="text-[13px] font-medium text-[#111827]">UrbanBrew Café · Mumbai Outlet</span>
            <svg className="h-3.5 w-3.5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Right side: notification + user */}
          <div className="flex items-center gap-4">
            {/* Connection status dot */}
            <div className="flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-[11px] text-[#9CA3AF]">{backendStatus}</span>
            </div>

            {/* Bell */}
            <button className="relative rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6] transition-colors">
              <Bell className="h-5 w-5" aria-hidden="true" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* User */}
            <div className="flex items-center gap-2.5 border-l border-[#E5E7EB] pl-4">
              <div className="text-right">
                <p className="text-[13px] font-semibold text-[#111827] leading-4">Alex Morgan</p>
                <p className="text-[11px] text-[#9CA3AF]">Owner</p>
              </div>
              <img
                src="https://ui-avatars.com/api/?name=Alex+Morgan&background=166534&color=fff&size=36"
                alt="Alex Morgan"
                className="h-9 w-9 rounded-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
