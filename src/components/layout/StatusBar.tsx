import { useMapStore, useLayerStore } from '@/store';
import { formatCoord, formatScale } from '@/utils/geo';
import { Layers, Navigation, ZoomIn } from 'lucide-react';

export function StatusBar() {
  const { mousePos, zoom, tool, basemap } = useMapStore();
  const layers = useLayerStore((s) => s.layers);
  const visibleCount = layers.filter((l) => l.visible).length;

  return (
    <footer
      className="flex items-center gap-0 h-7 px-3 shrink-0 text-[10px] z-[1000] font-mono"
      style={{
        background: 'var(--bg-panel)',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-muted)',
      }}
    >
      {/* Coords */}
      <div className="flex items-center gap-1.5 pr-3" style={{ borderRight: '1px solid var(--border)' }}>
        <Navigation size={10} />
        {mousePos ? (
          <span className="text-[var(--text-sub)]">
            {formatCoord(mousePos.lat, 'lat')} &nbsp; {formatCoord(mousePos.lng, 'lng')}
          </span>
        ) : (
          <span>—</span>
        )}
      </div>

      {/* Zoom + scale */}
      <div className="flex items-center gap-1.5 px-3" style={{ borderRight: '1px solid var(--border)' }}>
        <ZoomIn size={10} />
        <span>Z{zoom.toFixed(1)}</span>
        <span className="text-[var(--border)]">·</span>
        <span>{formatScale(zoom)}</span>
      </div>

      {/* Active layers */}
      <div className="flex items-center gap-1.5 px-3" style={{ borderRight: '1px solid var(--border)' }}>
        <Layers size={10} />
        <span>{visibleCount}/{layers.length} layers</span>
      </div>

      {/* Current tool */}
      <div className="flex items-center gap-1.5 px-3" style={{ borderRight: '1px solid var(--border)' }}>
        <span className="uppercase tracking-wide">Tool: <span style={{ color: 'var(--accent)' }}>{tool}</span></span>
      </div>

      {/* Basemap */}
      <div className="flex items-center gap-1.5 px-3">
        <span>Base: <span style={{ color: 'var(--text-sub)' }}>{basemap}</span></span>
      </div>

      {/* Right spacer + system status */}
      <div className="flex-1" />
      <div className="flex items-center gap-2 pr-1">
        <span
          className="h-1.5 w-1.5 rounded-full inline-block"
          style={{ background: 'var(--good)', boxShadow: '0 0 4px var(--good)' }}
        />
        <span>SYSTEM READY</span>
      </div>
    </footer>
  );
}
