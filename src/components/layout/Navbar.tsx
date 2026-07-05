import { Bell, Settings, User, Search, ChevronDown } from 'lucide-react';
import { useUIStore } from '@/store';
import { cn } from '@/utils/cn';

const NAV_ITEMS = ['Projects', 'Workspace', 'Analytics', 'Archive'];

export function Navbar() {
  const { treeColorBy, setTreeColorBy } = useUIStore();

  return (
    <header
      className="flex items-center gap-4 px-4 h-11 shrink-0 z-[1000]"
      style={{
        background: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 0 var(--border-sub)',
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 shrink-0">
        <div
          className="h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-black"
          style={{ background: 'var(--accent)', color: 'var(--bg-app)' }}
        >
          G
        </div>
        <span className="text-[13px] font-bold text-[var(--text)] tracking-tight">
          TGIS <span className="text-[var(--text-muted)] font-normal">Portal</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-0.5 ml-2">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item}
            className={cn(
              'h-7 px-3 rounded-md text-[12px] font-medium transition-all',
              i === 1
                ? 'text-[var(--text)] bg-[var(--bg-hover)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]'
            )}
          >
            {item}
            {i === 1 && (
              <span
                className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Project name */}
      <div className="flex items-center gap-1.5 ml-2">
        <span className="text-[var(--text-muted)] text-[12px]">/</span>
        <button className="flex items-center gap-1 text-[12px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors">
          Project Alpha
          <ChevronDown size={12} className="text-[var(--text-muted)]" />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Color mode toggle */}
      <div
        className="flex items-center rounded-lg overflow-hidden"
        style={{ background: 'var(--bg-hover)', border: '1px solid var(--border)' }}
      >
        {(['health', 'species'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setTreeColorBy(mode)}
            className={cn(
              'h-7 px-3 text-[11px] font-medium capitalize transition-all',
              treeColorBy === mode
                ? 'bg-[var(--accent-dim)] text-[var(--accent)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Add Layer */}
      <button
        className="h-7 px-3 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all"
        style={{ background: 'var(--accent)', color: 'var(--bg-app)' }}
      >
        <span className="text-[14px] leading-none">+</span>
        Add Layer
      </button>

      {/* Icons */}
      <div className="flex items-center gap-0.5">
        {[Bell, Settings].map((Icon, i) => (
          <button
            key={i}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            <Icon size={15} />
          </button>
        ))}

        {/* Avatar */}
        <div
          className="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold ml-1 cursor-pointer"
          style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1.5px solid var(--accent)' }}
        >
          AP
        </div>
      </div>
    </header>
  );
}
