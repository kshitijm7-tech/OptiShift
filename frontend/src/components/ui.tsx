// Shared presentational components (P04). Stitch-faithful styling:
// white 8px cards, hairline borders, mineral-green primary actions,
// restrained semantic badges. No business logic lives here.
import type { ReactNode } from 'react';
import {
  CircleCheck,
  CircleX,
  Inbox,
  LoaderCircle,
  TriangleAlert,
} from 'lucide-react';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-[#E5E7EB] bg-white p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-1">
        {eyebrow && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#15803D]">
            {eyebrow}
          </span>
        )}
        <h1 className="text-[24px] font-semibold leading-8 tracking-tight text-[#111827]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[15px] leading-[22px] text-[#6B7280]">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          {actions}
        </div>
      )}
    </header>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#166534] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#0F5132] active:bg-[#14532D] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#374151] transition-colors hover:border-[#D1D5DB] hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export type BadgeTone = 'success' | 'warning' | 'error' | 'info' | 'neutral';

const badgeStyles: Record<BadgeTone, string> = {
  success: 'border-[#A7F3D0] bg-[#ECFDF5] text-[#15803D]',
  warning: 'border-[#FDE68A] bg-[#FEF3C7] text-[#B45309]',
  error: 'border-[#FECACA] bg-[#FEE2E2] text-[#B91C1C]',
  info: 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]',
  neutral: 'border-[#E5E7EB] bg-[#F9FAFB] text-[#4B5563]',
};

export function StatusBadge({
  tone = 'neutral',
  children,
}: {
  tone?: BadgeTone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex h-[22px] items-center whitespace-nowrap rounded border px-2 text-[11px] font-semibold tracking-wide ${badgeStyles[tone]}`}
    >
      {children}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  sub,
  unavailable = false,
}: {
  label: string;
  value: string;
  sub: string;
  unavailable?: boolean;
}) {
  return (
    <div className="flex h-28 flex-col justify-between rounded-md border border-[#E5E7EB] bg-white p-3">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
        {label}
      </span>
      <div>
        <div
          className={`tnum text-[28px] font-semibold leading-[34px] tracking-tight ${
            unavailable ? 'text-[#9CA3AF]' : 'text-[#111827]'
          }`}
        >
          {value}
        </div>
        <p className="mt-0.5 truncate text-[12px] text-[#6B7280]">{sub}</p>
      </div>
    </div>
  );
}

export function LoadingState({ message }: { message: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-6"
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className="h-5 w-5 animate-spin text-[#166534]"
        aria-hidden="true"
      />
      <p className="text-[13px] text-[#374151]">{message}</p>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-lg border border-[#E5E7EB] bg-white p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F4F6] text-[#166534]">
        {icon}
      </div>
      <h2 className="mb-1 text-[18px] font-semibold text-[#111827]">{title}</h2>
      <p className="mb-6 max-w-lg text-[15px] text-[#6B7280]">{body}</p>
      {action}
    </div>
  );
}

export function ErrorState({
  title,
  body,
  retry,
}: {
  title: string;
  body: string;
  retry?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[#FECACA] bg-[#FEE2E2] p-4">
      <div className="flex items-center gap-2 text-[#B91C1C]">
        <CircleX className="h-4 w-4" aria-hidden="true" />
        <span className="text-[13px] font-semibold">{title}</span>
      </div>
      <p className="text-[13px] text-[#7F1D1D]">{body}</p>
      {retry && <div className="mt-1">{retry}</div>}
    </div>
  );
}

export function NoticeState({
  tone,
  title,
  body,
}: {
  tone: 'success' | 'warning' | 'info';
  title: string;
  body: string;
}) {
  const styles = {
    success: 'border-[#A7F3D0] bg-[#ECFDF5] text-[#166534]',
    warning: 'border-[#FDE68A] bg-[#FEF3C7] text-[#B45309]',
    info: 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]',
  } as const;
  const Icon =
    tone === 'success' ? CircleCheck : tone === 'warning' ? TriangleAlert : Inbox;
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border p-4 ${styles[tone]}`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-[13px] font-semibold">{title}</p>
        <p className="text-[13px] opacity-90">{body}</p>
      </div>
    </div>
  );
}
