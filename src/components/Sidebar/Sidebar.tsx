import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, Leaf, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useUIStore } from '@/store';
import { LayerTree } from './LayerTree';
import { TreeFilterPanel } from './TreeFilterPanel';
import { TREE_STATS } from '@/mock/trees';
import { cn } from '@/utils/cn';

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, filterOpen, setFilterOpen } = useUIStore();

  return (
    <>
      {/* Collapse button when sidebar is closed */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            onClick={toggleSidebar}
            className="absolute left-2 top-4 z-[950] h-9 w-9 flex items-center justify-center rounded-lg transition-colors"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-sub)',
            }}
            title="Open sidebar"
          >
            <PanelLeft size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col overflow-hidden shrink-0 h-full z-[900]"
            style={{
              background: 'var(--bg-panel)',
              borderRight: '1px solid var(--border)',
            }}
          >
            <div className="flex flex-col h-full min-w-[280px]">
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 shrink-0"
                style={{ borderBottom: '1px solid var(--border-sub)' }}
              >
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'var(--accent-dim)' }}
                >
                  <Leaf size={14} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[var(--text)] truncate leading-tight">
                    GIS Forest Portal
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] truncate">
                    Ahmedabad East Division
                  </p>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="h-7 w-7 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors shrink-0"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose size={14} />
                </button>
              </div>

              {/* Quick stats */}
              <div
                className="grid grid-cols-3 gap-0 shrink-0"
                style={{ borderBottom: '1px solid var(--border-sub)' }}
              >
                {[
                  { label: 'Trees', value: TREE_STATS.total, color: 'var(--accent)' },
                  { label: 'Healthy', value: TREE_STATS.healthy, color: 'var(--good)' },
                  { label: 'Critical', value: TREE_STATS.critical, color: 'var(--crit)' },
                ].map((s) => (
                  <div key={s.label} className="px-3 py-2.5 text-center" style={{ borderRight: '1px solid var(--border-sub)' }}>
                    <p className="text-[16px] font-bold font-mono" style={{ color: s.color }}>
                      {s.value}
                    </p>
                    <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Search + filter */}
              <div className="px-3 py-2.5 flex gap-1.5 shrink-0" style={{ borderBottom: '1px solid var(--border-sub)' }}>
                <div
                  className="flex items-center gap-2 flex-1 h-8 px-2.5 rounded-lg"
                  style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }}
                >
                  <Search size={13} style={{ color: 'var(--text-muted)' }} className="shrink-0" />
                  <input
                    type="text"
                    placeholder="Search trees, species…"
                    className="flex-1 bg-transparent text-[12px] text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none border-none"
                    onChange={(e) => useUIStore.getState().setFilter({ search: e.target.value })}
                  />
                </div>
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={cn(
                    'h-8 w-8 flex items-center justify-center rounded-lg transition-all shrink-0',
                    filterOpen
                      ? 'bg-[var(--accent-dim)] text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]'
                  )}
                  style={{ border: '1px solid var(--border)' }}
                  title="Filters"
                >
                  <Filter size={13} />
                </button>
              </div>

              {/* Filter panel */}
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden shrink-0"
                    style={{ borderBottom: '1px solid var(--border-sub)' }}
                  >
                    <TreeFilterPanel />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Layers label */}
              <div className="px-4 pt-3 pb-1 shrink-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Map Layers
                </p>
              </div>

              {/* Layer tree — scrollable */}
              <div className="flex-1 overflow-y-auto">
                <LayerTree />
              </div>

              {/* Footer */}
              <div
                className="px-4 py-2.5 shrink-0 flex items-center justify-between"
                style={{ borderTop: '1px solid var(--border-sub)' }}
              >
                <span className="text-[10px] text-[var(--text-muted)]">
                  Carbon: <strong style={{ color: 'var(--accent)' }}>
                    {(TREE_STATS.totalCarbonKg / 1000).toFixed(1)} t
                  </strong>
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {TREE_STATS.speciesCount} species
                </span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
