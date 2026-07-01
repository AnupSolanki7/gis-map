import { useMemo } from 'react';
import { TREES } from '../../data/trees';
import { CAMPUS_NAME } from '../../data/boundary';
import { SPECIES_COLORS } from '../../utils/markerUtils';
import { computeStats } from '../../utils/geoUtils';
import styles from './TreeTypeFilter.module.css';

// Build a sorted species summary from the full dataset once
const SPECIES_LIST = (() => {
  const map = {};
  TREES.forEach((t) => {
    if (!map[t.species]) map[t.species] = { name: t.name, species: t.species, count: 0 };
    map[t.species].count++;
  });
  return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
})();

export function TreeTypeFilter({ selectedSpecies, onSelect }) {
  const overallStats = useMemo(() => computeStats(TREES), []);

  return (
    <aside className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerIcon}>🌿</span>
        <div>
          <p className={styles.headerTitle}>Tree Inventory</p>
          <p className={styles.headerSub}>{CAMPUS_NAME}</p>
        </div>
      </div>

      {/* Overall summary */}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryVal}>{overallStats.total}</span>
          <span className={styles.summaryKey}>Total Trees</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryVal}>{SPECIES_LIST.length}</span>
          <span className={styles.summaryKey}>Species</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryVal}>{overallStats.healthy}</span>
          <span className={styles.summaryKey}>Healthy</span>
        </div>
      </div>

      {/* Filter label */}
      <p className={styles.filterLabel}>SELECT TREE TYPE</p>

      {/* All Trees */}
      <button
        className={`${styles.item} ${selectedSpecies === null ? styles.itemActive : ''}`}
        onClick={() => onSelect(null)}
      >
        <span className={styles.dot} style={{ background: '#6b7280' }} />
        <span className={styles.itemName}>All Trees</span>
        <span className={styles.badge}>{TREES.length}</span>
      </button>

      {/* Per-species rows */}
      {SPECIES_LIST.map(({ name, species, count }) => {
        const isActive = selectedSpecies === species;
        const color    = SPECIES_COLORS[species] ?? '#1565C0';
        return (
          <button
            key={species}
            className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
            onClick={() => onSelect(isActive ? null : species)}
            title={species}
          >
            <span className={styles.dot} style={{ background: color }} />
            <span className={styles.itemName}>{name}</span>
            <span className={styles.badge}>{count}</span>
          </button>
        );
      })}

      {/* Hint */}
      <p className={styles.hint}>
        {selectedSpecies
          ? `Showing ${SPECIES_LIST.find(s => s.species === selectedSpecies)?.name} trees`
          : 'Click a type to filter the map'}
      </p>
    </aside>
  );
}
