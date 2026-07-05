import { motion } from 'framer-motion';
import { HEALTH_COLOR } from '@/utils/geo';
import { useUIStore } from '@/store';
import type { HealthLevel } from '@/types';

const HEALTH_LEVELS: { level: HealthLevel; label: string }[] = [
  { level: 'Healthy',  label: 'Healthy'  },
  { level: 'Medium',   label: 'Medium'   },
  { level: 'Critical', label: 'Critical' },
  { level: 'Dead',     label: 'Dead'     },
];

export function Legend() {
  const treeColorBy = useUIStore((s) => s.treeColorBy);

  if (treeColorBy !== 'health') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.3 }}
      className="absolute bottom-10 right-4 z-[800] px-3 py-2.5 rounded-xl"
      style={{
        background: 'rgba(15,23,40,0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
      }}
    >
      <p className="text-[9px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-2">
        Tree Health
      </p>
      <div className="flex flex-col gap-1.5">
        {HEALTH_LEVELS.map(({ level, label }) => (
          <div key={level} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: HEALTH_COLOR[level] }}
            />
            <span className="text-[11px] text-[var(--text-sub)]">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
