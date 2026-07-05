import { useCallback, useEffect, useState } from 'react';
import { Circle, Marker, Polygon, Polyline, Popup, Rectangle, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useDrawStore, useMapStore } from '@/store';
import type { DrawShape, DrawnFeature, MapTool } from '@/types';
import { circleAreaM2, formatArea, formatDistance, haversineKm, lineLengthKm, polygonAreaM2 } from '@/utils/geo';

const ACCENT = '#34D399';
const MEASURE = '#FBBF24';

let seq = 0;
function nextId(): string {
  seq += 1;
  return `draw-${Date.now()}-${seq}`;
}

function toolShape(tool: MapTool): DrawShape | null {
  switch (tool) {
    case 'draw-polygon':
    case 'measure-area':
      return 'polygon';
    case 'draw-line':
    case 'measure-distance':
      return 'line';
    case 'draw-rectangle':
      return 'rectangle';
    case 'draw-circle':
      return 'circle';
    case 'marker':
      return 'marker';
    default:
      return null;
  }
}

function isMeasureTool(tool: MapTool): boolean {
  return tool === 'measure-distance' || tool === 'measure-area';
}

// Drop points the user clicked on top of an existing point (e.g. the second
// click of a double-click used to finish a line/polygon).
function dedupeClose(points: [number, number][]): [number, number][] {
  return points.filter((p, i) => {
    if (i === 0) return true;
    const prev = points[i - 1];
    return haversineKm(p[0], p[1], prev[0], prev[1]) > 0.0005;
  });
}

const markerIcon = L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;border-radius:50%;background:${ACCENT};border:2px solid #0B1220;box-shadow:0 0 0 3px rgba(52,211,153,0.35)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function featureStyle(measurement: boolean) {
  const color = measurement ? MEASURE : ACCENT;
  return { color, weight: 2.5, fillColor: color, fillOpacity: 0.15, dashArray: measurement ? '6, 5' : undefined };
}

function FeaturePopup({ feature, onDelete }: { feature: DrawnFeature; onDelete: (id: string) => void }) {
  return (
    <Popup>
      <div style={{ fontSize: 12, color: '#0B1220', minWidth: 120 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{feature.label}</div>
        <button
          onClick={() => onDelete(feature.id)}
          style={{
            fontSize: 11, color: '#B91C1C', background: 'transparent', border: 'none',
            padding: 0, cursor: 'pointer', textDecoration: 'underline',
          }}
        >
          Delete
        </button>
      </div>
    </Popup>
  );
}

export function DrawingLayer() {
  const map = useMap();
  const tool = useMapStore((s) => s.tool);
  const setTool = useMapStore((s) => s.setTool);
  const features = useDrawStore((s) => s.features);
  const addFeature = useDrawStore((s) => s.addFeature);
  const removeFeature = useDrawStore((s) => s.removeFeature);

  const [draft, setDraft] = useState<[number, number][]>([]);
  const [cursor, setCursor] = useState<[number, number] | null>(null);
  const [zoomBoxStart, setZoomBoxStart] = useState<[number, number] | null>(null);

  const shape = toolShape(tool);

  useEffect(() => {
    setDraft([]);
    setZoomBoxStart(null);
  }, [tool]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setDraft([]);
        setZoomBoxStart(null);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const el = map.getContainer();
    if (tool === 'pan') {
      el.style.cursor = '';
    } else {
      el.style.cursor = 'crosshair';
    }
    if (tool === 'zoom-rect') map.dragging.disable();
    else map.dragging.enable();
    return () => {
      el.style.cursor = '';
      map.dragging.enable();
    };
  }, [tool, map]);

  const finalizeLineOrPolygon = useCallback(
    (pts: [number, number][]) => {
      if (!shape) return;
      const cleaned = dedupeClose(pts);
      if (shape === 'line' && cleaned.length >= 2) {
        addFeature({
          id: nextId(), shape: 'line', positions: cleaned,
          label: formatDistance(lineLengthKm(cleaned)), isMeasurement: isMeasureTool(tool), createdAt: Date.now(),
        });
      } else if (shape === 'polygon' && cleaned.length >= 3) {
        addFeature({
          id: nextId(), shape: 'polygon', positions: cleaned,
          label: formatArea(polygonAreaM2(cleaned)), isMeasurement: isMeasureTool(tool), createdAt: Date.now(),
        });
      }
      setDraft([]);
    },
    [shape, tool, addFeature]
  );

  useMapEvents({
    click(e) {
      const p: [number, number] = [e.latlng.lat, e.latlng.lng];

      if (shape === 'marker') {
        addFeature({ id: nextId(), shape: 'marker', positions: [p], label: 'Marker', isMeasurement: false, createdAt: Date.now() });
        return;
      }

      if (shape === 'rectangle') {
        if (draft.length === 0) {
          setDraft([p]);
          return;
        }
        const [a] = draft;
        const rectPts: [number, number][] = [[a[0], a[1]], [a[0], p[1]], [p[0], p[1]], [p[0], a[1]]];
        addFeature({
          id: nextId(), shape: 'rectangle', positions: rectPts,
          label: formatArea(polygonAreaM2(rectPts)), isMeasurement: false, createdAt: Date.now(),
        });
        setDraft([]);
        return;
      }

      if (shape === 'circle') {
        if (draft.length === 0) {
          setDraft([p]);
          return;
        }
        const [center] = draft;
        const radiusM = haversineKm(center[0], center[1], p[0], p[1]) * 1000;
        addFeature({
          id: nextId(), shape: 'circle', positions: [center], radiusM,
          label: formatArea(circleAreaM2(radiusM)), isMeasurement: false, createdAt: Date.now(),
        });
        setDraft([]);
        return;
      }

      if (shape === 'polygon' || shape === 'line') {
        setDraft((d) => [...d, p]);
      }
    },
    dblclick() {
      if (shape === 'polygon' || shape === 'line') finalizeLineOrPolygon(draft);
    },
    mousemove(e) {
      setCursor([e.latlng.lat, e.latlng.lng]);
    },
    mousedown(e) {
      if (tool === 'zoom-rect') setZoomBoxStart([e.latlng.lat, e.latlng.lng]);
    },
    mouseup(e) {
      if (tool === 'zoom-rect' && zoomBoxStart) {
        const bounds = L.latLngBounds([zoomBoxStart, [e.latlng.lat, e.latlng.lng]]);
        if (bounds.getNorthEast().distanceTo(bounds.getSouthWest()) > 20) {
          map.fitBounds(bounds, { padding: [24, 24] });
        }
        setZoomBoxStart(null);
        setTool('pan');
      }
    },
  });

  const previewPts = draft.length > 0 && cursor ? [...draft, cursor] : draft;
  const previewMeasurement = isMeasureTool(tool);
  const previewLabel =
    shape === 'line' && previewPts.length >= 2
      ? formatDistance(lineLengthKm(previewPts))
      : shape === 'polygon' && previewPts.length >= 3
      ? formatArea(polygonAreaM2(previewPts))
      : null;

  return (
    <>
      {/* In-progress polygon/line preview */}
      {(shape === 'polygon' || shape === 'line') && previewPts.length > 0 && (
        shape === 'polygon' && previewPts.length >= 3 ? (
          <Polygon positions={previewPts} pathOptions={{ ...featureStyle(previewMeasurement), dashArray: '4, 4' }}>
            {previewLabel && <Tooltip permanent direction="top">{previewLabel}</Tooltip>}
          </Polygon>
        ) : (
          <Polyline positions={previewPts} pathOptions={{ ...featureStyle(previewMeasurement), dashArray: '4, 4' }}>
            {previewLabel && <Tooltip permanent direction="top">{previewLabel}</Tooltip>}
          </Polyline>
        )
      )}

      {/* In-progress rectangle preview */}
      {shape === 'rectangle' && draft.length === 1 && cursor && (
        <Rectangle
          bounds={L.latLngBounds([draft[0], cursor])}
          pathOptions={{ ...featureStyle(false), dashArray: '4, 4' }}
        >
          <Tooltip permanent direction="top">{formatArea(polygonAreaM2([draft[0], [draft[0][0], cursor[1]], cursor, [cursor[0], draft[0][1]]]))}</Tooltip>
        </Rectangle>
      )}

      {/* In-progress circle preview */}
      {shape === 'circle' && draft.length === 1 && cursor && (
        <Circle
          center={draft[0]}
          radius={haversineKm(draft[0][0], draft[0][1], cursor[0], cursor[1]) * 1000}
          pathOptions={{ ...featureStyle(false), dashArray: '4, 4' }}
        >
          <Tooltip permanent direction="top">
            {formatArea(circleAreaM2(haversineKm(draft[0][0], draft[0][1], cursor[0], cursor[1]) * 1000))}
          </Tooltip>
        </Circle>
      )}

      {/* Zoom-to-rectangle preview */}
      {tool === 'zoom-rect' && zoomBoxStart && cursor && (
        <Rectangle bounds={L.latLngBounds([zoomBoxStart, cursor])} pathOptions={{ color: '#38BDF8', weight: 1.5, dashArray: '4, 4', fillOpacity: 0.08 }} />
      )}

      {/* Finalized drawn / measured features */}
      {features.map((f) => {
        if (f.shape === 'marker') {
          return (
            <Marker key={f.id} position={f.positions[0]} icon={markerIcon}>
              <FeaturePopup feature={f} onDelete={removeFeature} />
            </Marker>
          );
        }
        if (f.shape === 'circle') {
          return (
            <Circle key={f.id} center={f.positions[0]} radius={f.radiusM ?? 0} pathOptions={featureStyle(f.isMeasurement)}>
              <Tooltip sticky>{f.label}</Tooltip>
              <FeaturePopup feature={f} onDelete={removeFeature} />
            </Circle>
          );
        }
        if (f.shape === 'rectangle') {
          return (
            <Rectangle key={f.id} bounds={L.latLngBounds(f.positions)} pathOptions={featureStyle(f.isMeasurement)}>
              <Tooltip sticky>{f.label}</Tooltip>
              <FeaturePopup feature={f} onDelete={removeFeature} />
            </Rectangle>
          );
        }
        if (f.shape === 'polygon') {
          return (
            <Polygon key={f.id} positions={f.positions} pathOptions={featureStyle(f.isMeasurement)}>
              <Tooltip sticky>{f.label}</Tooltip>
              <FeaturePopup feature={f} onDelete={removeFeature} />
            </Polygon>
          );
        }
        return (
          <Polyline key={f.id} positions={f.positions} pathOptions={featureStyle(f.isMeasurement)}>
            <Tooltip sticky>{f.label}</Tooltip>
            <FeaturePopup feature={f} onDelete={removeFeature} />
          </Polyline>
        );
      })}
    </>
  );
}
