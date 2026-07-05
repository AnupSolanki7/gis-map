import { useEffect, useRef, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import { useLayerStore, useUIStore } from '@/store';
import { TREES } from '@/mock/trees';
import { getTreeColor } from '@/utils/geo';
import type { Tree } from '@/types';

export function TreesLayer() {
  const map = useMap();
  const layerDef = useLayerStore((s) => s.layers.find((l) => l.id === 'trees'));
  const treeColorBy = useUIStore((s) => s.treeColorBy);
  const filter = useUIStore((s) => s.filter);
  const setInspectorTarget = useUIStore((s) => s.setInspectorTarget);
  const groupRef = useRef<L.MarkerClusterGroup | null>(null);

  const filteredTrees = useMemo(() => {
    return TREES.filter((t) => {
      if (filter.species && t.species !== filter.species) return false;
      if (filter.health  && t.health  !== filter.health)  return false;
      if (filter.village && t.village !== filter.village) return false;
      if (t.heightM < filter.minHeight || t.heightM > filter.maxHeight) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        if (!t.commonName.toLowerCase().includes(q) &&
            !t.species.toLowerCase().includes(q) &&
            !t.village.toLowerCase().includes(q) &&
            !t.id.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [filter]);

  useEffect(() => {
    if (!layerDef?.visible) {
      if (groupRef.current) {
        map.removeLayer(groupRef.current);
        groupRef.current = null;
      }
      return;
    }

    if (groupRef.current) {
      map.removeLayer(groupRef.current);
      groupRef.current = null;
    }

    const group = L.markerClusterGroup({
      maxClusterRadius: 40,
      disableClusteringAtZoom: 16,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        const sz = count < 10 ? 'small' : count < 50 ? 'medium' : 'large';
        return L.divIcon({
          html: `<div><span>${count}</span></div>`,
          className: `marker-cluster marker-cluster-${sz}`,
          iconSize: [40, 40],
        });
      },
    });

    filteredTrees.forEach((tree: Tree) => {
      const color = getTreeColor(tree, treeColorBy);
      const icon = L.divIcon({
        className: '',
        html: `<div class="tree-dot" style="width:10px;height:10px;background:${color};"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        popupAnchor: [0, -8],
      });

      const marker = L.marker([tree.lat, tree.lng], { icon });

      marker.bindPopup(
        `<div style="padding:12px;min-width:200px;">
          <div style="font-size:11px;color:var(--text-muted);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Tree ${tree.id}</div>
          <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:2px;">${tree.commonName}</div>
          <div style="font-size:11px;color:var(--text-sub);font-style:italic;margin-bottom:10px;">${tree.species}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <div style="background:var(--bg-hover);border-radius:6px;padding:6px 8px;">
              <div style="font-size:10px;color:var(--text-muted)">Health</div>
              <div style="font-size:13px;font-weight:600;color:${color}">${tree.health}</div>
            </div>
            <div style="background:var(--bg-hover);border-radius:6px;padding:6px 8px;">
              <div style="font-size:10px;color:var(--text-muted)">Height</div>
              <div style="font-size:13px;font-weight:600;color:var(--text)">${tree.heightM}m</div>
            </div>
            <div style="background:var(--bg-hover);border-radius:6px;padding:6px 8px;">
              <div style="font-size:10px;color:var(--text-muted)">Carbon</div>
              <div style="font-size:13px;font-weight:600;color:var(--accent)">${tree.carbonKg} kg</div>
            </div>
            <div style="background:var(--bg-hover);border-radius:6px;padding:6px 8px;">
              <div style="font-size:10px;color:var(--text-muted)">Age</div>
              <div style="font-size:13px;font-weight:600;color:var(--text)">${tree.agYears} yr</div>
            </div>
          </div>
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-size:10px;color:var(--text-muted)">
            Click marker to open full details →
          </div>
        </div>`,
        { maxWidth: 260 }
      );

      marker.on('click', () => {
        setInspectorTarget({ type: 'tree', data: tree });
      });

      group.addLayer(marker);
    });

    map.addLayer(group);
    groupRef.current = group;

    return () => {
      if (groupRef.current) {
        map.removeLayer(groupRef.current);
        groupRef.current = null;
      }
    };
  }, [map, layerDef?.visible, filteredTrees, treeColorBy, setInspectorTarget]);

  return null;
}
