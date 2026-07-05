import { useUIStore } from '@/store';
import { TREES } from '@/mock/trees';
import { RotateCcw } from 'lucide-react';
import type { TreeSpecies, HealthLevel } from '@/types';
import { HEALTH_COLOR, SPECIES_COLOR } from '@/utils/geo';
import { cn } from '@/utils/cn';

const SPECIES_LIST = Array.from(new Set(TREES.map((t) => t.species))) as TreeSpecies[];
const HEALTH_LIST: HealthLevel[] = ['Healthy', 'Medium', 'Critical', 'Dead'];
const VILLAGE_LIST = Array.from(new Set(TREES.map((t) => t.village))).sort();

export function TreeFilterPanel() {
  const { filter, setFilter, resetFilter } = useUIStore();

  return (
    <div className="px-3 py-3 flex flex-col gap-3">
      {/* Health filter */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Health</p>
        <div className="flex flex-wrap gap-1">
          {HEALTH_LIST.map((h) => (
            <button
              key={h}
              onClick={() => setFilter({ health: filter.health === h ? null : h })}
              className={cn(
                'px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all',
                filter.health === h
                  ? 'text-[var(--bg-app)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              )}
              style={{
                background: filter.health === h ? HEALTH_COLOR[h] : 'var(--bg-hover)',
                border: `1px solid ${filter.health === h ? HEALTH_COLOR[h] : 'var(--border)'}`,
              }}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Species filter */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Species</p>
        <div className="flex flex-col gap-0.5 max-h-[100px] overflow-y-auto pr-1">
          {SPECIES_LIST.map((sp) => {
            const tree = TREES.find((t) => t.species === sp);
            return (
              <button
                key={sp}
                onClick={() => setFilter({ species: filter.species === sp ? null : sp })}
                className={cn(
                  'flex items-center gap-2 px-2 py-1 rounded-md text-[11px] text-left transition-all',
                  filter.species === sp
                    ? 'bg-[var(--accent-dim)] text-[var(--accent)]'
                    : 'text-[var(--text-sub)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]'
                )}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: SPECIES_COLOR[sp] }}
                />
                <span className="truncate">{tree?.commonName ?? sp}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Village filter */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Village</p>
        <select
          value={filter.village ?? ''}
          onChange={(e) => setFilter({ village: e.target.value || null })}
          className="w-full h-7 px-2 text-[11px] rounded-md text-[var(--text)] outline-none focus:ring-1 focus:ring-[var(--accent)]"
          style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }}
        >
          <option value="">All villages</option>
          {VILLAGE_LIST.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilter}
        className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] hover:text-[var(--crit)] transition-colors self-start"
      >
        <RotateCcw size={11} />
        Reset filters
      </button>
    </div>
  );
}
