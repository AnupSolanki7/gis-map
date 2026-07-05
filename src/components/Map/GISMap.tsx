import { MapContainer, TileLayer, ZoomControl, ScaleControl } from 'react-leaflet';
import { MapController } from './MapController';
import { BoundaryLayer, ForestLayer, WaterLayer, StreamsLayer, RoadsLayer } from './layers/VectorLayers';
import { TreesLayer } from './layers/TreesLayer';
import { SurveyLayer, VillagesLayer } from './layers/PointLayers';
import { DrawingLayer } from './layers/DrawingLayer';
import { useMapStore } from '@/store';

const BASEMAP_URLS: Record<string, string> = {
  dark:      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  topo:      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  osm:       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

const BASEMAP_ATTR = '&copy; <a href="https://carto.com">CartoDB</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>';

export function GISMap() {
  const { center, zoom, basemap } = useMapStore();

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url={BASEMAP_URLS[basemap]}
        attribution={BASEMAP_ATTR}
        maxZoom={19}
        key={basemap}
      />

      {/* Label overlay for satellite mode */}
      {basemap === 'satellite' && (
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          attribution=""
          maxZoom={19}
          pane="shadowPane"
        />
      )}

      <ZoomControl position="bottomright" />
      <ScaleControl position="bottomleft" imperial={false} />
      <MapController />

      {/* GIS Layers */}
      <BoundaryLayer />
      <ForestLayer />
      <WaterLayer />
      <StreamsLayer />
      <RoadsLayer />
      <TreesLayer />
      <SurveyLayer />
      <VillagesLayer />
      <DrawingLayer />
    </MapContainer>
  );
}
