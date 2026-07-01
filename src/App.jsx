import { useState, useCallback, useEffect, useMemo } from 'react';
import { MapView }        from './components/Map/MapView';
import { TreeTypeFilter } from './components/TreeTypeFilter/TreeTypeFilter';
import { Statistics }     from './components/Statistics/Statistics';
import { Sidebar }        from './components/Sidebar/Sidebar';
import { LoadingSkeleton} from './components/LoadingSkeleton/LoadingSkeleton';
import { TREES }          from './data/trees';
import styles             from './App.module.css';

export default function App() {
  const [isLoading, setIsLoading]         = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState(null);   // null = all
  const [selectedTree, setSelectedTree]   = useState(null);
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [mouseCoords, setMouseCoords]     = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Derive visible trees from selected species
  const visibleTrees = useMemo(
    () =>
      selectedSpecies === null
        ? TREES
        : TREES.filter((t) => t.species === selectedSpecies),
    [selectedSpecies]
  );

  const handleTreeSelect = useCallback((tree) => {
    setSelectedTree(tree);
    setSidebarOpen(true);
  }, []);

  const handleSpeciesSelect = useCallback((species) => {
    setSelectedSpecies(species);
    // Close sidebar if open tree is now hidden
    if (species !== null) {
      setSelectedTree((prev) =>
        prev && prev.species !== species ? null : prev
      );
      setSidebarOpen((prev) =>
        selectedTree && selectedTree.species !== species ? false : prev
      );
    }
  }, [selectedTree]);

  return (
    <div className={styles.app}>
      {isLoading && <LoadingSkeleton />}

      <div className={styles.layout}>
        {/* ── Left panel ─────────────────────────────────── */}
        <TreeTypeFilter
          selectedSpecies={selectedSpecies}
          onSelect={handleSpeciesSelect}
        />

        {/* ── Map + overlays ─────────────────────────────── */}
        <div className={styles.mapArea}>
          <MapView
            visibleTrees={visibleTrees}
            onTreeSelect={handleTreeSelect}
            onMouseMove={setMouseCoords}
          />

          {/* Floating overlays inside map area */}
          <div className={styles.overlays}>
            {/* Stats — top right */}
            <div className={styles.topRight}>
              <Statistics
                visibleTrees={visibleTrees}
                selectedSpecies={selectedSpecies}
              />
            </div>

            {/* Mouse coordinates — bottom left (above scale) */}
            {mouseCoords && (
              <div className={styles.coords}>
                {mouseCoords.lat.toFixed(5)}°N&nbsp;&nbsp;
                {mouseCoords.lng.toFixed(5)}°E
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Detail sidebar ─────────────────────────────── */}
      <Sidebar
        tree={selectedTree}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}
