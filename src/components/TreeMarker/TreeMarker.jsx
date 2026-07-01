import { Marker, Popup } from 'react-leaflet';
import { createMarker, getSpeciesColor } from '../../utils/markerUtils';
import styles from './TreeMarker.module.css';

export function TreeMarker({ tree, onSelect }) {
  const healthClass = styles[`health${tree.health}`] ?? '';

  return (
    <Marker
      position={[tree.latitude, tree.longitude]}
      icon={createMarker(tree.species)}
      eventHandlers={{ click: () => onSelect(tree) }}
    >
      <Popup className={styles.popupWrapper}>
        <div className={styles.popup}>
          <div
            className={styles.colorBar}
            style={{ background: getSpeciesColor(tree.species) }}
          />
          <div className={styles.body}>
            <h3 className={styles.name}>{tree.name}</h3>
            <p className={styles.species}>{tree.species}</p>
            <div className={styles.grid}>
              <span className={styles.key}>Age</span>
              <span className={styles.val}>{tree.age} yrs</span>

              <span className={styles.key}>Health</span>
              <span className={`${styles.val} ${healthClass}`}>{tree.health}</span>

              <span className={styles.key}>Height</span>
              <span className={styles.val}>{tree.height} m</span>

              <span className={styles.key}>Diameter</span>
              <span className={styles.val}>{tree.diameter} cm</span>

              <span className={styles.key}>Coords</span>
              <span className={styles.val}>
                {tree.latitude.toFixed(4)}°N,&nbsp;{tree.longitude.toFixed(4)}°E
              </span>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
