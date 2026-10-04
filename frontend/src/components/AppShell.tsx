// Application shell (P04): 240px sidebar navigation + header + content.
// Mirrors the Stitch layout: brand block, icon nav with subtitles,
// store context, owner identity. No page logic lives here.
import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  LayoutDashboard,
  Palmtree,
  Settings,
  SlidersHorizontal,
  Store,
  Users,
  Zap,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  hint: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    to: '/',
    label: 'Overview',
    hint: "Today's summary",
    icon: <LayoutDashboard className="h-5 w-5" aria-hidden="true" />,
  },
  {
    to: '/schedule',
    label: 'Schedule',
    hint: 'See who works when',
    icon: <CalendarDays className="h-5 w-5" aria-hidden="true" />,
  },
  {
    to: '/team',
    label: 'My Team',
    hint: 'Staff & work limits',
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
  },
  {
    to: '/time-off',
    label: 'Time Off',
    hint: 'Vacation & requests',
    icon: <Palmtree className="h-5 w-5" aria-hidden="true" />,
  },
  {
    to: '/rules',
    label: 'Rules',
    hint: 'Shift & hour limits',
    icon: <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />,
  },
  {
    to: '/settings',
    label: 'Settings',
    hint: 'Store & preferences',
    icon: <Settings className="h-5 w-5" aria-hidden="true" />,
  },
];

function SidebarNav() {
  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
              isActive
                ? 'bg-[#B0F1C7]/40 font-semibold text-[#111827]'
                : 'text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]'
            }`
          }
        >
          <span className="shrink-0 text-[#166534]">{item.icon}</span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[12px] font-medium leading-4">
              {item.label}
            </span>
            <span className="truncate text-[11px] text-[#6B7280]">
              {item.hint}
            </span>
          </span>
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
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[#E5E7EB] bg-white p-4 md:flex">
        <div className="flex items-center gap-2 px-1 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#166534] text-white">
            <Zap className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-semibold leading-6 tracking-tight text-[#111827]">
              OptiShift
            </span>
            <span className="truncate text-[11px] text-[#6B7280]">
              Smart Scheduling
            </span>
          </div>
        </div>
        <SidebarNav />
        <div className="mt-auto flex flex-col gap-3 pt-4">
          <div className="flex items-center gap-2 rounded-lg bg-[#F9FAFB] p-3">
            <Store
              className="h-4 w-4 shrink-0 text-[#166534]"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-[#111827]">
                UrbanBrew Café · Mumbai
              </p>
              <p className="text-[11px] text-[#6B7280]">{backendStatus}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5E7EB] text-[12px] font-semibold text-[#374151]">
              AM
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-[#111827]">
                Alex Morgan
              </p>
              <p className="text-[11px] text-[#6B7280]">Owner</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b border-[#E5E7EB] bg-white px-4 py-2 md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#166534] text-white">
            <Zap className="h-4 w-4" aria-hidden="true" />
          </div>
          <span className="text-[16px] font-semibold text-[#111827]">
            OptiShift
          </span>
        </header>
        <nav
          className="flex gap-1 overflow-x-auto border-b border-[#E5E7EB] bg-white px-3 py-2 md:hidden"
          aria-label="Primary mobile"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium ${
                  isActive
                    ? 'bg-[#B0F1C7]/40 text-[#111827]'
                    : 'text-[#4B5563]'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6">
          {children}
        </main>
        <footer className="px-4 pb-4 md:px-6">
          <button
            type="button"
            onClick={() => navigate('/schedule')}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#166534] px-4 py-3 text-[13px] font-medium text-white hover:bg-[#0F5132] md:hidden"
          >
            <Zap className="h-4 w-4" aria-hidden="true" />
            Build My Schedule
          </button>
        </footer>
      </div>
    </div>
  );
}
