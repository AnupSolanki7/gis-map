import { Sidebar } from '@/components/Sidebar/Sidebar';
import { GISMap } from '@/components/Map/GISMap';
import { MapToolbar } from '@/components/Toolbar/MapToolbar';
import { StatsPanel } from '@/components/widgets/StatsPanel';
import { Inspector } from '@/components/inspector/Inspector';
import { Legend } from '@/components/widgets/Legend';

export function MapPage() {
  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* Left sidebar */}
      <Sidebar />

      {/* Map area */}
      <div className="relative flex-1 overflow-hidden">
        <GISMap />

        {/* Floating UI layers — rendered inside map area, above map */}
        <MapToolbar />
        <StatsPanel />
        <Inspector />
        <Legend />
      </div>
    </div>
  );
}
