import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useLayerStore } from '@/store';
import { SURVEY_POINTS, VILLAGES } from '@/mock/geodata';

export function SurveyLayer() {
  const map = useMap();
  const layer = useLayerStore((s) => s.layers.find((l) => l.id === 'survey'));
  const groupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (groupRef.current) { map.removeLayer(groupRef.current); groupRef.current = null; }
    if (!layer?.visible) return;

    const group = L.layerGroup();
    SURVEY_POINTS.forEach((sp) => {
      const icon = L.divIcon({
        className: '',
        html: '<div class="survey-dot"></div>',
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });
      const m = L.marker([sp.lat, sp.lng], { icon });
      m.bindTooltip(
        `<div style="padding:8px;color:var(--text)">
          <strong>${sp.label}</strong><br/>
          Surveyed by ${sp.surveyedBy}<br/>
          <span style="color:var(--text-muted);font-size:11px">${sp.date} · ±${sp.accuracy.toFixed(1)}m</span>
        </div>`,
        { sticky: true }
      );
      group.addLayer(m);
    });

    map.addLayer(group);
    groupRef.current = group;
    return () => { if (groupRef.current) map.removeLayer(groupRef.current); };
  }, [map, layer?.visible]);

  return null;
}

export function VillagesLayer() {
  const map = useMap();
  const layer = useLayerStore((s) => s.layers.find((l) => l.id === 'villages'));
  const groupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (groupRef.current) { map.removeLayer(groupRef.current); groupRef.current = null; }
    if (!layer?.visible) return;

    const group = L.layerGroup();
    VILLAGES.forEach((v) => {
      const icon = L.divIcon({
        className: '',
        html: `<div class="village-label">${v.name}</div>`,
        iconAnchor: [0, 0],
      });
      const m = L.marker([v.lat, v.lng], { icon });
      m.bindTooltip(
        `<div style="padding:8px;color:var(--text)">
          <strong>${v.name}</strong><br/>
          Pop: ${v.population.toLocaleString()}<br/>
          Trees: ${v.trees.toLocaleString()}
        </div>`,
        { sticky: true }
      );
      group.addLayer(m);
    });

    map.addLayer(group);
    groupRef.current = group;
    return () => { if (groupRef.current) map.removeLayer(groupRef.current); };
  }, [map, layer?.visible]);

  return null;
}
