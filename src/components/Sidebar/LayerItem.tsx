import { Eye, EyeOff, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Slider } from '@/components/ui/Slider';
import { Switch } from '@/components/ui/Switch';
import { useLayerStore } from '@/store';
import type { LayerDef } from '@/types';
import { cn } from '@/utils/cn';

interface LayerItemProps {
  layer: LayerDef;
}

export function LayerItem({ layer }: LayerItemProps) {
  const { toggleLayer, setOpacity } = useLayerStore();
  const [expanded, setExpanded] = useState(false);

  const typeIcon = {
    polygon:  '▬',
    polyline: '〜',
    point:    '●',
    cluster:  '◉',
  }[layer.type];

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden transition-colors duration-150',
        layer.visible ? 'bg-[var(--bg-hover)]' : 'opacity-50'
      )}
    >
      {/* Main row */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Switch
          checked={layer.visible}
          onChange={() => toggleLayer(layer.id)}
          color={layer.color}
        />

        {/* Color + type indicator */}
        <span
          className="text-[10px] font-bold shrink-0"
          style={{ color: layer.color }}
          title={layer.type}
        >
          {typeIcon}
        </span>

        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleLayer(layer.id)}>
          <p className="text-[12px] font-medium text-[var(--text)] truncate leading-tight">
            {layer.label}
          </p>
          <p className="text-[10px] text-[var(--text-muted)] truncate leading-tight mt-0.5">
            {layer.featureCount.toLocaleString()} features
          </p>
        </div>

        <button
          title="Layer settings"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'h-6 w-6 flex items-center justify-center rounded-md transition-colors shrink-0',
            expanded
              ? 'text-[var(--accent)] bg-[var(--accent-dim)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-active)]'
          )}
        >
          <Settings2 size={12} />
        </button>
      </div>

      {/* Expanded controls */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 flex flex-col gap-3 border-t border-[var(--border-sub)]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide font-semibold">Opacity</span>
                <div className="flex-1">
                  <Slider
                    value={layer.opacity}
                    onChange={(v) => setOpacity(layer.id, v)}
                    min={0} max={1} step={0.05}
                    color={layer.color}
                    showValue
                  />
                </div>
              </div>

              <div className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                {layer.description}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleLayer(layer.id)}
                  className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  {layer.visible ? <EyeOff size={10} /> : <Eye size={10} />}
                  {layer.visible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
