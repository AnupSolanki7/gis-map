import styles from './Sidebar.module.css';

const HEALTH_COLORS = {
  Excellent: '#2E7D32',
  Healthy:   '#388E3C',
  Good:      '#F57C00',
  Average:   '#E65100',
  Poor:      '#C62828',
};

export function Sidebar({ tree, isOpen, onClose }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} aria-label="Tree details">
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close panel">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </svg>
      </button>

      {tree ? (
        <div className={styles.content}>
          <div className={styles.hero}>
            <span className={styles.treeGlyph}>🌳</span>
            <div
              className={styles.healthTag}
              style={{ backgroundColor: HEALTH_COLORS[tree.health] ?? '#888' }}
            >
              {tree.health}
            </div>
          </div>

          <h2 className={styles.treeName}>{tree.name}</h2>
          <p className={styles.species}>{tree.species}</p>

          <div className={styles.details}>
            <Row label="Age"       value={`${tree.age} years`} />
            <Row label="Height"    value={`${tree.height} m`} />
            <Row label="Diameter"  value={`${tree.diameter} cm`} />
            <Row label="Latitude"  value={`${tree.latitude.toFixed(5)}°N`} />
            <Row label="Longitude" value={`${tree.longitude.toFixed(5)}°E`} />
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📍</span>
          <p>Click a tree marker to view details</p>
        </div>
      )}
    </aside>
  );
}

function Row({ label, value }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowKey}>{label}</span>
      <span className={styles.rowVal}>{value}</span>
    </div>
  );
}
