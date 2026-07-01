import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  ZoomControl,
  ScaleControl,
  useMapEvents,
} from 'react-leaflet';
import { TreeMarker } from '../TreeMarker/TreeMarker';
import {
  CAMPUS_CENTER,
  CAMPUS_ZOOM,
  BOUNDARY_LATLNGS,
  INNER_BOUNDARY_LATLNGS,
} from '../../data/boundary';
import styles from './MapView.module.css';

const BOUNDARY_STYLE = {
  color:       '#ff3333',
  weight:       3,
  fillColor:   '#ff6666',
  fillOpacity:  0.06,
  dashArray:   '8, 5',
};

const INNER_STYLE = {
  color:       '#ff3333',
  weight:       2.5,
  fillColor:   '#ff6666',
  fillOpacity:  0.06,
  dashArray:   '6, 4',
};

function MouseTracker({ onMouseMove }) {
  useMapEvents({
    mousemove: (e) => onMouseMove(e.latlng),
    mouseout:  () => onMouseMove(null),
  });
  return null;
}

// Hide leaflet-draw default toolbar in case it's still imported elsewhere
function HideDrawToolbar() {
  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = '.leaflet-draw-toolbar { display:none!important; }';
    document.head.appendChild(s);
    return () => s.remove();
  }, []);
  return null;
}

export function MapView({ visibleTrees, onTreeSelect, onMouseMove }) {
  return (
    <div className={styles.wrapper}>
      <MapContainer
        center={CAMPUS_CENTER}
        zoom={CAMPUS_ZOOM}
        className={styles.map}
        zoomControl={false}
      >
        {/* Esri World Imagery — free, no API key */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics"
          maxZoom={19}
        />

        {/* Leaflet labels layer on top of satellite */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          opacity={0.35}
          maxZoom={19}
        />

        <ZoomControl position="bottomright" />
        <ScaleControl position="bottomleft" imperial={false} />

        {/* Campus boundary polygons */}
        <Polygon positions={BOUNDARY_LATLNGS}       pathOptions={BOUNDARY_STYLE} />
        <Polygon positions={INNER_BOUNDARY_LATLNGS} pathOptions={INNER_STYLE}    />

        <HideDrawToolbar />
        <MouseTracker onMouseMove={onMouseMove} />

        {/* Filtered tree markers */}
        {visibleTrees.map((tree) => (
          <TreeMarker key={tree.id} tree={tree} onSelect={onTreeSelect} />
        ))}
      </MapContainer>
    </div>
  );
}
