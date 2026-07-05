import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'solid' | 'outline' | 'danger';
  size?: 'xs' | 'sm' | 'md';
  active?: boolean;
  tooltip?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'ghost', size = 'sm', active, tooltip, className, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-1.5 rounded font-medium transition-all duration-150 select-none disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]';

    const variants = {
      ghost:   cn('text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]', active && 'text-[var(--accent)] bg-[var(--accent-dim)]'),
      solid:   'bg-[var(--accent)] text-[var(--bg-app)] hover:brightness-110 font-semibold',
      outline: 'border border-[var(--border)] text-[var(--text-sub)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-dim)]',
      danger:  'text-[var(--crit)] hover:bg-[rgba(248,113,113,0.12)]',
    };

    const sizes = {
      xs: 'h-6 px-2 text-[11px]',
      sm: 'h-8 px-3 text-[12px]',
      md: 'h-9 px-4 text-[13px]',
    };

    return (
      <button
        ref={ref}
        title={tooltip}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
