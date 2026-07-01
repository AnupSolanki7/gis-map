import styles from './LoadingSkeleton.module.css';

export function LoadingSkeleton() {
  return (
    <div className={styles.overlay} role="status" aria-label="Loading map">
      <div className={styles.pulse} />
      <p className={styles.text}>Loading Tree GIS…</p>
    </div>
  );
}
