import { motion, AnimatePresence } from 'framer-motion';
import {
  X, TreePine, Leaf, MapPin, Calendar, User, Activity,
  Zap, Ruler, Clock, ChevronRight, Navigation,
} from 'lucide-react';
import { useUIStore } from '@/store';
import { Badge, healthVariant } from '@/components/ui/Badge';
import { HEALTH_COLOR, SPECIES_COLOR, formatCoord } from '@/utils/geo';
import type { Tree } from '@/types';
import { TREES } from '@/mock/trees';

export function Inspector() {
  const { inspectorTarget, closeInspector } = useUIStore();

  return (
    <AnimatePresence>
      {inspectorTarget && (
        <motion.div
          key="inspector"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-0 top-0 bottom-0 z-[850] flex flex-col overflow-hidden"
          style={{
            width: 320,
            background: 'var(--bg-panel)',
            borderLeft: '1px solid var(--border)',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.4)',
          }}
        >
          {inspectorTarget.type === 'tree' && (
            <TreeInspector tree={inspectorTarget.data} onClose={closeInspector} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TreeInspector({ tree, onClose }: { tree: Tree; onClose: () => void }) {
  const color = HEALTH_COLOR[tree.health];
  const speciesColor = SPECIES_COLOR[tree.species] ?? '#94A3B8';

  // Find adjacent trees for navigation
  const idx = TREES.findIndex((t) => t.id === tree.id);
  const prev = idx > 0 ? TREES[idx - 1] : null;
  const next = idx < TREES.length - 1 ? TREES[idx + 1] : null;
  const setTarget = useUIStore((s) => s.setInspectorTarget);

  return (
    <>
      {/* Header */}
      <div
        className="flex items-start gap-3 px-4 py-3.5 shrink-0"
        style={{ borderBottom: '1px solid var(--border-sub)' }}
      >
        <div
          className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: `${speciesColor}20`, border: `1px solid ${speciesColor}40` }}
        >
          <TreePine size={18} style={{ color: speciesColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase">
              {tree.id}
            </p>
            <Badge variant={healthVariant(tree.health)}>{tree.health}</Badge>
          </div>
          <p className="text-[15px] font-bold text-[var(--text)] leading-tight">{tree.commonName}</p>
          <p className="text-[11px] text-[var(--text-muted)] italic mt-0.5">{tree.species}</p>
        </div>
        <button
          onClick={onClose}
          className="h-7 w-7 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Health bar */}
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-sub)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wide">Health Score</span>
            <span className="text-[11px] font-bold" style={{ color }}>
              {{ Healthy: '92', Medium: '61', Critical: '28', Dead: '0' }[tree.health]}%
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${{ Healthy: 92, Medium: 61, Critical: 28, Dead: 0 }[tree.health]}%` }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: color }}
            />
          </div>
        </div>

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 gap-px p-4" style={{ background: 'var(--border-sub)' }}>
          {[
            { icon: <Ruler size={13} />,    label: 'Height',   value: `${tree.heightM} m`,       color: 'var(--text)' },
            { icon: <Clock size={13} />,    label: 'Age',      value: `${tree.agYears} yrs`,      color: 'var(--text)' },
            { icon: <Zap size={13} />,      label: 'Carbon',   value: `${tree.carbonKg} kg`,      color: 'var(--accent)' },
            { icon: <Activity size={13} />, label: 'Status',   value: tree.health,                color },
          ].map((m) => (
            <div
              key={m.label}
              className="flex flex-col gap-1 p-3"
              style={{ background: 'var(--bg-panel)' }}
            >
              <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                {m.icon}
                <span className="text-[10px] uppercase tracking-wide font-semibold">{m.label}</span>
              </div>
              <p className="text-[16px] font-bold font-mono" style={{ color: m.color }}>
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* Detail rows */}
        <div className="px-4 py-3 flex flex-col gap-2.5">
          <DetailRow icon={<MapPin size={12} />}    label="Village"   value={tree.village} />
          <DetailRow icon={<MapPin size={12} />}    label="District"  value={tree.district} />
          <DetailRow icon={<Leaf size={12} />}      label="Owner"     value={tree.owner} />
          <DetailRow icon={<Calendar size={12} />}  label="Planted"   value={String(tree.plantationYear)} />
          <DetailRow icon={<Calendar size={12} />}  label="Surveyed"  value={tree.surveyDate} />
          <DetailRow icon={<User size={12} />}      label="GPS"       value={tree.gps} mono />
        </div>

        {/* Notes */}
        {tree.notes && (
          <div className="mx-4 mb-3 px-3 py-2.5 rounded-lg" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <p className="text-[11px] text-[var(--crit)]">{tree.notes}</p>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="px-4 py-3 shrink-0 flex flex-col gap-2" style={{ borderTop: '1px solid var(--border-sub)' }}>
        <div className="flex gap-2">
          <button
            className="flex-1 h-8 flex items-center justify-center gap-1.5 rounded-lg text-[12px] font-medium transition-all"
            style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-sub)' }}
          >
            Edit
          </button>
          <button
            className="flex-1 h-8 flex items-center justify-center gap-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{ background: 'var(--accent)', color: 'var(--bg-app)' }}
          >
            Report
          </button>
        </div>

        {/* Navigation between trees */}
        <div className="flex items-center justify-between">
          <button
            disabled={!prev}
            onClick={() => prev && setTarget({ type: 'tree', data: prev })}
            className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight size={12} className="rotate-180" />
            {prev ? `T${String(TREES.indexOf(prev) + 1).padStart(4, '0')}` : 'First'}
          </button>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">
            {idx + 1} / {TREES.length}
          </span>
          <button
            disabled={!next}
            onClick={() => next && setTarget({ type: 'tree', data: next })}
            className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            {next ? `T${String(TREES.indexOf(next) + 1).padStart(4, '0')}` : 'Last'}
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </>
  );
}

function DetailRow({ icon, label, value, mono }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[var(--text-muted)] mt-0.5 shrink-0">{icon}</span>
      <span className="text-[11px] text-[var(--text-muted)] shrink-0 w-16">{label}</span>
      <span className={`text-[11px] text-[var(--text)] flex-1 ${mono ? 'font-mono text-[10px]' : 'font-medium'}`}>
        {value}
      </span>
    </div>
  );
}
