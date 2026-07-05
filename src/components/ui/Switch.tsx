import { cn } from '@/utils/cn';

interface SwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: 'sm' | 'md';
  color?: string;
  label?: string;
  className?: string;
}

export function Switch({ checked, onChange, size = 'sm', color, label, className }: SwitchProps) {
  const trackW = size === 'sm' ? 'w-7' : 'w-9';
  const trackH = size === 'sm' ? 'h-4' : 'h-5';
  const thumbSz = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const thumbTx = size === 'sm' ? 'translate-x-3.5' : 'translate-x-4.5';

  return (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer select-none', className)}>
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => onChange(!checked)}
        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none',
          trackW, trackH,
          checked ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
        )}
        style={checked && color ? { backgroundColor: color } : undefined}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow-sm ring-0 transition-transform duration-200',
            thumbSz,
            checked ? thumbTx : 'translate-x-0'
          )}
        />
      </span>
      {label && <span className="text-[12px] text-[var(--text-sub)]">{label}</span>}
    </label>
  );
}
