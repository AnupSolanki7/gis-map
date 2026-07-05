import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayerItem } from './LayerItem';
import { useLayerStore } from '@/store';
import type { LayerCategory } from '@/types';
import { cn } from '@/utils/cn';

const CATEGORY_ORDER: LayerCategory[] = [
  'Administrative', 'Forest', 'Hydrology', 'Infrastructure', 'Trees', 'Survey',
];

const CATEGORY_ICONS: Record<LayerCategory, string> = {
  Administrative: '🏛',
  Forest:         '🌲',
  Hydrology:      '💧',
  Infrastructure: '🛤',
  Agriculture:    '🌾',
  Survey:         '📍',
  Trees:          '🌳',
};

export function LayerTree() {
  const layers = useLayerStore((s) => s.layers);
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(CATEGORY_ORDER)
  );

  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof layers>>((acc, cat) => {
    acc[cat] = layers.filter((l) => l.category === cat);
    return acc;
  }, {});

  const toggle = (cat: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });

  return (
    <div className="flex flex-col gap-1 px-3 pb-4">
      {CATEGORY_ORDER.filter((cat) => grouped[cat]?.length > 0).map((cat) => {
        const isOpen = expanded.has(cat);
        const catLayers = grouped[cat];
        const visibleCount = catLayers.filter((l) => l.visible).length;

        return (
          <div key={cat} className="flex flex-col gap-0.5">
            {/* Category header */}
            <button
              onClick={() => toggle(cat)}
              className={cn(
                'flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide',
                'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-all duration-150',
                'uppercase select-none'
              )}
            >
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                <ChevronRight size={12} />
              </motion.span>
              <span>{CATEGORY_ICONS[cat]}</span>
              <span className="flex-1 text-left">{cat}</span>
              <span className="text-[9px] font-mono text-[var(--text-muted)]">
                {visibleCount}/{catLayers.length}
              </span>
            </button>

            {/* Layers */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pl-4">
                    {catLayers.map((layer) => (
                      <LayerItem key={layer.id} layer={layer} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
