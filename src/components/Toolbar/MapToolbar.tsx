import { motion } from 'framer-motion';
import {
  Hand, ZoomIn, Ruler, Hexagon, Spline, Square, Circle, MapPin,
  Home, Layers, Map, Satellite, RotateCcw, Undo2, Redo2, Trash2,
} from 'lucide-react';
import { useDrawStore, useMapStore } from '@/store';

import type { MapTool, Basemap } from '@/types';
import { cn } from '@/utils/cn';

interface ToolDef {
  id: MapTool;
  icon: React.ReactNode;
  label: string;
  group: string;
}

const TOOLS: ToolDef[] = [
  { id: 'pan',              icon: <Hand size={15} />,     label: 'Pan',              group: 'nav'     },
  { id: 'zoom-rect',        icon: <ZoomIn size={15} />,   label: 'Zoom to Rectangle', group: 'nav'     },
  { id: 'measure-distance', icon: <Ruler size={15} />,    label: 'Measure Distance', group: 'measure' },
  { id: 'measure-area',     icon: <Spline size={15} />,   label: 'Measure Area',     group: 'measure' },
  { id: 'draw-polygon',     icon: <Hexagon size={15} />,  label: 'Draw Polygon',     group: 'draw'    },
  { id: 'draw-line',        icon: <Spline size={15} />,   label: 'Draw Line',       group: 'draw'    },
  { id: 'draw-rectangle',   icon: <Square size={15} />,   label: 'Draw Rectangle',  group: 'draw'    },
  { id: 'draw-circle',      icon: <Circle size={15} />,   label: 'Draw Circle',     group: 'draw'    },
  { id: 'marker',           icon: <MapPin size={15} />,   label: 'Add Marker',      group: 'draw'    },
];

const BASEMAPS: { id: Basemap; icon: React.ReactNode; label: string }[] = [
  { id: 'dark',      icon: <Map size={14} />,       label: 'Dark'      },
  { id: 'satellite', icon: <Satellite size={14} />, label: 'Satellite' },
  { id: 'osm',       icon: <Layers size={14} />,    label: 'Street'    },
];

const HINTS: Partial<Record<MapTool, string>> = {
  'zoom-rect':        'Drag a rectangle to zoom in',
  'measure-distance': 'Click to add points · double-click to finish · Esc to cancel',
  'measure-area':     'Click to add points · double-click to finish · Esc to cancel',
  'draw-polygon':     'Click to add points · double-click to finish · Esc to cancel',
  'draw-line':        'Click to add points · double-click to finish · Esc to cancel',
  'draw-rectangle':   'Click a corner, then click the opposite corner',
  'draw-circle':      'Click a center, then click to set the radius',
  marker:             'Click the map to drop a marker',
};

export function MapToolbar() {
  const { tool, setTool, basemap, setBasemap, setCenter, setZoom } = useMapStore();
  const { features, history, future, undo, redo, clearAll } = useDrawStore();

  const handleReset = () => {
    setCenter([23.0400, 72.5350]);
    setZoom(12);
  };

  const hint = HINTS[tool];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[900] flex flex-col items-center gap-2">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-1"
        style={{
          background: 'rgba(15,23,40,0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '4px 6px',
          boxShadow: 'var(--shadow-glass)',
        }}
      >
        {/* Nav/measure/draw tools */}
        {TOOLS.map((t, i) => {
          const isFirst = i === 0 || TOOLS[i - 1].group !== t.group;
          return (
            <div key={t.id} className="flex items-center">
              {isFirst && i !== 0 && (
                <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
              )}
              <button
                title={t.label}
                onClick={() => setTool(t.id)}
                className={cn(
                  'h-8 w-8 flex items-center justify-center rounded-lg transition-all duration-150 focus-visible:outline-none',
                  tool === t.id
                    ? 'bg-[var(--accent-dim)] text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]'
                )}
              >
                {t.icon}
              </button>
            </div>
          );
        })}

        {/* Undo / redo / delete */}
        <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
        <button
          title="Undo"
          disabled={history.length === 0}
          onClick={undo}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-all disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Undo2 size={15} />
        </button>
        <button
          title="Redo"
          disabled={future.length === 0}
          onClick={redo}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-all disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Redo2 size={15} />
        </button>
        <button
          title="Delete All Drawings"
          disabled={features.length === 0}
          onClick={clearAll}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--crit)] hover:bg-[var(--bg-hover)] transition-all disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Trash2 size={15} />
        </button>

        {/* Reset home */}
        <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
        <button
          title="Reset View"
          onClick={handleReset}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-all"
        >
          <Home size={15} />
        </button>

        {/* Basemap selector */}
        <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
        <div className="flex items-center gap-0.5">
          {BASEMAPS.map((b) => (
            <button
              key={b.id}
              title={b.label}
              onClick={() => setBasemap(b.id)}
              className={cn(
                'h-8 px-2.5 flex items-center gap-1.5 rounded-lg text-[11px] font-medium transition-all duration-150',
                basemap === b.id
                  ? 'bg-[var(--accent)] text-[var(--bg-app)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]'
              )}
            >
              {b.icon}
              <span className="hidden sm:inline">{b.label}</span>
            </button>
          ))}
        </div>

        {/* Reset tool */}
        <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
        <button
          title="Reset Tool"
          onClick={() => setTool('pan')}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-all"
        >
          <RotateCcw size={14} />
        </button>
      </motion.div>

      {hint && (
        <motion.div
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-[11px] px-3 py-1.5 rounded-lg"
          style={{
            background: 'rgba(15,23,40,0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
            color: 'var(--text-sub)',
          }}
        >
          {hint}
        </motion.div>
      )}
    </div>
  );
}
