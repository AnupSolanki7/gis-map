import styles from './Toolbar.module.css';

const TOOLS = [
  {
    id: 'rectangle',
    label: 'Rectangle',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="16" height="10" rx="1" />
      </svg>
    ),
  },
  {
    id: 'polygon',
    label: 'Polygon',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="10,2 18,8 15,17 5,17 2,8" />
      </svg>
    ),
  },
  {
    id: 'circle',
    label: 'Circle',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="10" cy="10" r="8" />
      </svg>
    ),
  },
];

export function Toolbar({ activeDrawTool, onToolSelect, onClear, hasSelection }) {
  return (
    <div className={styles.toolbar}>
      <p className={styles.sectionLabel}>Draw Shape</p>
      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          className={`${styles.btn} ${activeDrawTool === tool.id ? styles.active : ''}`}
          onClick={() => onToolSelect(tool.id)}
          title={`Draw ${tool.label}`}
        >
          <span className={styles.icon}>{tool.icon}</span>
          {tool.label}
        </button>
      ))}

      <div className={styles.divider} />

      <button
        className={`${styles.btn} ${styles.clearBtn}`}
        onClick={onClear}
        disabled={!hasSelection && !activeDrawTool}
        title="Clear selection"
      >
        <span className={styles.icon}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </span>
        Clear
      </button>
    </div>
  );
}
