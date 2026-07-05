import { create } from 'zustand';
import type { MapTool, Basemap, InspectorTarget, LayerDef, TreeFilter, LatLng, DrawnFeature } from '@/types';

// ── Layer definitions ────────────────────────────────────
const INITIAL_LAYERS: LayerDef[] = [
  { id: 'boundary', label: 'Administrative Boundary', category: 'Administrative', color: '#E879F9', type: 'polygon',  visible: true,  opacity: 0.8, description: 'Division administrative boundary',  featureCount: 1   },
  { id: 'forest',   label: 'Forest Areas',            category: 'Forest',         color: '#4ADE80', type: 'polygon',  visible: true,  opacity: 0.5, description: 'Reserved & protected forest zones', featureCount: 3   },
  { id: 'water',    label: 'Water Bodies',             category: 'Hydrology',      color: '#38BDF8', type: 'polygon',  visible: true,  opacity: 0.6, description: 'Lakes, reservoirs & wetlands',     featureCount: 3   },
  { id: 'streams',  label: 'Streams & Canals',         category: 'Hydrology',      color: '#22D3EE', type: 'polyline', visible: true,  opacity: 1.0, description: 'Rivers, streams & irrigation canals',featureCount: 3  },
  { id: 'roads',    label: 'Road Network',             category: 'Infrastructure', color: '#94A3B8', type: 'polyline', visible: true,  opacity: 0.9, description: 'National & state highway network',  featureCount: 4   },
  { id: 'trees',    label: 'Tree Inventory',           category: 'Trees',          color: '#34D399', type: 'cluster',  visible: true,  opacity: 1.0, description: '300 surveyed trees with health data', featureCount: 300 },
  { id: 'survey',   label: 'Survey Points',            category: 'Survey',         color: '#FBBF24', type: 'point',    visible: false, opacity: 1.0, description: 'GPS benchmark & survey stations',   featureCount: 40  },
  { id: 'villages', label: 'Village Locations',        category: 'Administrative', color: '#FB923C', type: 'point',    visible: false, opacity: 1.0, description: 'Revenue village boundaries',         featureCount: 8   },
];

// ── Map store ────────────────────────────────────────────
interface MapState {
  center: [number, number];
  zoom: number;
  basemap: Basemap;
  tool: MapTool;
  mousePos: LatLng | null;
  setCenter: (c: [number, number]) => void;
  setZoom: (z: number) => void;
  setBasemap: (b: Basemap) => void;
  setTool: (t: MapTool) => void;
  setMousePos: (p: LatLng | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center:    [23.0400, 72.5350],
  zoom:      12,
  basemap:   'dark',
  tool:      'pan',
  mousePos:  null,
  setCenter:   (center)   => set({ center }),
  setZoom:     (zoom)     => set({ zoom }),
  setBasemap:  (basemap)  => set({ basemap }),
  setTool:     (tool)     => set({ tool }),
  setMousePos: (mousePos) => set({ mousePos }),
}));

// ── Layer store ──────────────────────────────────────────
interface LayerState {
  layers: LayerDef[];
  toggleLayer: (id: string) => void;
  setOpacity: (id: string, opacity: number) => void;
}

export const useLayerStore = create<LayerState>((set) => ({
  layers: INITIAL_LAYERS,
  toggleLayer: (id) =>
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)),
    })),
  setOpacity: (id, opacity) =>
    set((s) => ({
      layers: s.layers.map((l) => (l.id === id ? { ...l, opacity } : l)),
    })),
}));

// ── Draw store ───────────────────────────────────────────
interface DrawState {
  features: DrawnFeature[];
  history: DrawnFeature[][];
  future: DrawnFeature[][];
  addFeature: (f: DrawnFeature) => void;
  removeFeature: (id: string) => void;
  clearAll: () => void;
  undo: () => void;
  redo: () => void;
}

export const useDrawStore = create<DrawState>((set) => ({
  features: [],
  history: [],
  future: [],
  addFeature: (f) =>
    set((s) => ({ features: [...s.features, f], history: [...s.history, s.features], future: [] })),
  removeFeature: (id) =>
    set((s) => ({
      features: s.features.filter((x) => x.id !== id),
      history: [...s.history, s.features],
      future: [],
    })),
  clearAll: () =>
    set((s) => (s.features.length ? { features: [], history: [...s.history, s.features], future: [] } : {})),
  undo: () =>
    set((s) => {
      if (!s.history.length) return {};
      const prev = s.history[s.history.length - 1];
      return { features: prev, history: s.history.slice(0, -1), future: [s.features, ...s.future] };
    }),
  redo: () =>
    set((s) => {
      if (!s.future.length) return {};
      const [next, ...rest] = s.future;
      return { features: next, history: [...s.history, s.features], future: rest };
    }),
}));

// ── UI store ─────────────────────────────────────────────
interface UIState {
  sidebarOpen: boolean;
  inspectorTarget: InspectorTarget;
  filterOpen: boolean;
  treeColorBy: 'health' | 'species';
  filter: TreeFilter;
  setSidebarOpen: (v: boolean) => void;
  toggleSidebar: () => void;
  setInspectorTarget: (t: InspectorTarget) => void;
  closeInspector: () => void;
  setFilterOpen: (v: boolean) => void;
  setTreeColorBy: (v: 'health' | 'species') => void;
  setFilter: (f: Partial<TreeFilter>) => void;
  resetFilter: () => void;
}

const DEFAULT_FILTER: TreeFilter = {
  species: null,
  health: null,
  minHeight: 0,
  maxHeight: 40,
  village: null,
  search: '',
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen:      true,
  inspectorTarget:  null,
  filterOpen:       false,
  treeColorBy:      'health',
  filter:           DEFAULT_FILTER,
  setSidebarOpen:   (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar:    () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setInspectorTarget: (inspectorTarget) => set({ inspectorTarget }),
  closeInspector:   () => set({ inspectorTarget: null }),
  setFilterOpen:    (filterOpen) => set({ filterOpen }),
  setTreeColorBy:   (treeColorBy) => set({ treeColorBy }),
  setFilter:        (f) => set((s) => ({ filter: { ...s.filter, ...f } })),
  resetFilter:      () => set({ filter: DEFAULT_FILTER }),
}));
