import { cn } from '@/utils/cn';

interface SliderProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  color?: string;
  className?: string;
  showValue?: boolean;
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, color, className, showValue }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative flex-1 h-1.5 rounded-full bg-[var(--border)]">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color ?? 'var(--accent)' }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      {showValue && (
        <span className="text-[10px] text-[var(--text-muted)] font-mono w-7 text-right">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
