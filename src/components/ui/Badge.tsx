import { cn } from '@/utils/cn';

type BadgeVariant = 'healthy' | 'medium' | 'critical' | 'dead' | 'default' | 'accent';

const VARIANTS: Record<BadgeVariant, string> = {
  healthy:  'bg-[rgba(74,222,128,0.15)] text-[var(--good)] border border-[rgba(74,222,128,0.3)]',
  medium:   'bg-[rgba(251,191,36,0.15)]  text-[var(--warn)] border border-[rgba(251,191,36,0.3)]',
  critical: 'bg-[rgba(248,113,113,0.15)] text-[var(--crit)] border border-[rgba(248,113,113,0.3)]',
  dead:     'bg-[rgba(100,116,139,0.15)] text-[var(--dead-c)] border border-[rgba(100,116,139,0.3)]',
  default:  'bg-[var(--bg-hover)] text-[var(--text-sub)] border border-[var(--border)]',
  accent:   'bg-[var(--accent-dim)] text-[var(--accent)] border border-[rgba(52,211,153,0.3)]',
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase',
      VARIANTS[variant],
      className
    )}>
      {children}
    </span>
  );
}

export function healthVariant(h: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    Healthy: 'healthy', Medium: 'medium', Critical: 'critical', Dead: 'dead',
  };
  return map[h] ?? 'default';
}
