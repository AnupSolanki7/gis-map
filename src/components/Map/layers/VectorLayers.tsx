import { GeoJSON, Tooltip } from 'react-leaflet';
import type { Feature, GeoJsonObject } from 'geojson';
import type { PathOptions } from 'leaflet';
import { useLayerStore } from '@/store';
import {
  BOUNDARY_GEOJSON, FOREST_GEOJSON, ROADS_GEOJSON,
  STREAMS_GEOJSON, WATER_GEOJSON,
} from '@/mock/geodata';

function useLayer(id: string) {
  const layers = useLayerStore((s) => s.layers);
  return layers.find((l) => l.id === id);
}

// ── Boundary ─────────────────────────────────────────────
export function BoundaryLayer() {
  const layer = useLayer('boundary');
  if (!layer?.visible) return null;
  const style: PathOptions = {
    color: layer.color, weight: 2.5, fill: false,
    dashArray: '10, 6', opacity: layer.opacity,
  };
  return (
    <GeoJSON key="boundary" data={BOUNDARY_GEOJSON as GeoJsonObject} style={style}>
      <Tooltip sticky>
        <div style={{ color: '#E8EEF8', fontSize: 12, padding: '4px 0' }}>
          <strong>{BOUNDARY_GEOJSON.properties.name}</strong><br />
          {BOUNDARY_GEOJSON.properties.area}
        </div>
      </Tooltip>
    </GeoJSON>
  );
}

// ── Forest ───────────────────────────────────────────────
export function ForestLayer() {
  const layer = useLayer('forest');
  if (!layer?.visible) return null;

  function style(feature?: Feature): PathOptions {
    const density = (feature?.properties as { density?: string })?.density;
    const fillOp = density === 'Dense' ? 0.45 : density === 'Moderate' ? 0.30 : 0.18;
    return {
      color: layer!.color, weight: 1.5,
      fillColor: layer!.color, fillOpacity: fillOp * layer!.opacity,
      opacity: layer!.opacity,
    };
  }

  return (
    <GeoJSON
      key={`forest-${layer.opacity}`}
      data={FOREST_GEOJSON as unknown as GeoJsonObject}
      style={style}
      onEachFeature={(feature, lyr) => {
        lyr.bindTooltip(
          `<div style="color:#E8EEF8;font-size:12px;padding:4px 0">
            <strong>${feature.properties.name}</strong><br/>
            ${feature.properties.type} · ${feature.properties.area}
          </div>`,
          { sticky: true, className: '' }
        );
      }}
    />
  );
}

// ── Water ────────────────────────────────────────────────
export function WaterLayer() {
  const layer = useLayer('water');
  if (!layer?.visible) return null;
  const style: PathOptions = {
    color: layer.color, weight: 1.5,
    fillColor: layer.color, fillOpacity: 0.35 * layer.opacity,
    opacity: layer.opacity,
  };
  return (
    <GeoJSON
      key={`water-${layer.opacity}`}
      data={WATER_GEOJSON as unknown as GeoJsonObject}
      style={style}
      onEachFeature={(feature, lyr) => {
        lyr.bindTooltip(
          `<div style="color:#E8EEF8;font-size:12px;padding:4px 0">
            <strong>${feature.properties.name}</strong><br/>
            ${feature.properties.type} · ${feature.properties.areaHa} ha
          </div>`,
          { sticky: true }
        );
      }}
    />
  );
}

// ── Streams ──────────────────────────────────────────────
export function StreamsLayer() {
  const layer = useLayer('streams');
  if (!layer?.visible) return null;

  function style(feature?: Feature): PathOptions {
    const type = (feature?.properties as { type?: string })?.type;
    const w = type === 'River' ? 3 : type === 'Stream' ? 2 : 1.5;
    const dash = type === 'Canal' ? '6, 4' : undefined;
    return { color: layer!.color, weight: w, opacity: layer!.opacity, dashArray: dash };
  }

  return (
    <GeoJSON
      key={`streams-${layer.opacity}`}
      data={STREAMS_GEOJSON as unknown as GeoJsonObject}
      style={style}
      onEachFeature={(feature, lyr) => {
        lyr.bindTooltip(
          `<div style="color:#E8EEF8;font-size:12px;padding:4px 0">
            <strong>${feature.properties.name}</strong><br/>
            ${feature.properties.type} · ${feature.properties.flow}
          </div>`,
          { sticky: true }
        );
      }}
    />
  );
}

// ── Roads ────────────────────────────────────────────────
export function RoadsLayer() {
  const layer = useLayer('roads');
  if (!layer?.visible) return null;

  function style(feature?: Feature): PathOptions {
    const type = (feature?.properties as { type?: string })?.type;
    const w = type === 'National Highway' ? 3.5 : type === 'State Highway' ? 2.5 : type === 'District Road' ? 2 : 1.5;
    const dash = type === 'Forest Road' ? '4, 4' : undefined;
    return { color: layer!.color, weight: w, opacity: layer!.opacity, dashArray: dash };
  }

  return (
    <GeoJSON
      key={`roads-${layer.opacity}`}
      data={ROADS_GEOJSON as unknown as GeoJsonObject}
      style={style}
      onEachFeature={(feature, lyr) => {
        lyr.bindTooltip(
          `<div style="color:#E8EEF8;font-size:12px;padding:4px 0">
            <strong>${feature.properties.name}</strong><br/>
            ${feature.properties.type} · ${feature.properties.lanes} lanes
          </div>`,
          { sticky: true }
        );
      }}
    />
  );
}
