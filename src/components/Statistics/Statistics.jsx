import { useMemo } from 'react';
import { computeStats } from '../../utils/geoUtils';
import { getSpeciesColor } from '../../utils/markerUtils';
import styles from './Statistics.module.css';

export function Statistics({ visibleTrees, selectedSpecies }) {
  const stats = useMemo(() => computeStats(visibleTrees), [visibleTrees]);

  const accentColor = selectedSpecies
    ? getSpeciesColor(selectedSpecies)
    : '#1565C0';

  return (
    <div className={styles.card}>
      <p className={styles.title} style={{ color: accentColor }}>
        {selectedSpecies
          ? (visibleTrees[0]?.name ?? selectedSpecies)
          : 'All Trees'}
      </p>

      <div className={styles.grid}>
        <Stat value={stats.total}        label="Showing"   color={accentColor} />
        <Stat value={stats.healthy}      label="Healthy"   color="#16a34a"     />
        <Stat value={stats.avgHealth}    label="Avg Health"                    />
        <Stat value={stats.speciesCount} label="Species"                       />
      </div>
    </div>
  );
}

function Stat({ value, label, color }) {
  return (
    <div className={styles.stat}>
      <span className={styles.value} style={color ? { color } : {}}>
        {value}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
