// ── Tree / feature types ─────────────────────────────────
export type HealthLevel = 'Healthy' | 'Medium' | 'Critical' | 'Dead';

export type TreeSpecies =
  | 'Tectona grandis'
  | 'Azadirachta indica'
  | 'Ficus benghalensis'
  | 'Mangifera indica'
  | 'Dalbergia sissoo'
  | 'Acacia nilotica'
  | 'Eucalyptus globulus'
  | 'Cassia fistula'
  | 'Pongamia pinnata'
  | 'Terminalia arjuna';

export interface Tree {
  id: string;
  lat: number;
  lng: number;
  species: TreeSpecies;
  commonName: string;
  health: HealthLevel;
  heightM: number;
  agYears: number;
  carbonKg: number;
  surveyDate: string;
  village: string;
  district: string;
  plantationYear: number;
  owner: string;
  gps: string;
  photos: string[];
  notes: string;
}

export interface SurveyPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  surveyedBy: string;
  date: string;
  accuracy: number;
}

export interface Village {
  id: string;
  name: string;
  lat: number;
  lng: number;
  population: number;
  trees: number;
}

// ── Layer system ─────────────────────────────────────────
export type LayerCategory =
  | 'Administrative'
  | 'Hydrology'
  | 'Forest'
  | 'Infrastructure'
  | 'Agriculture'
  | 'Survey'
  | 'Trees';

export interface LayerDef {
  id: string;
  label: string;
  category: LayerCategory;
  color: string;
  type: 'polygon' | 'polyline' | 'point' | 'cluster';
  visible: boolean;
  opacity: number;
  description: string;
  featureCount: number;
}

// ── Map state ────────────────────────────────────────────
export type MapTool =
  | 'pan'
  | 'zoom-rect'
  | 'measure-distance'
  | 'measure-area'
  | 'draw-polygon'
  | 'draw-line'
  | 'draw-rectangle'
  | 'draw-circle'
  | 'marker';

export type Basemap = 'dark' | 'satellite' | 'topo' | 'osm';

export interface MapView {
  center: [number, number];
  zoom: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

// ── Inspector ────────────────────────────────────────────
export type InspectorTarget =
  | { type: 'tree'; data: Tree }
  | { type: 'survey'; data: SurveyPoint }
  | null;

// ── Filter ───────────────────────────────────────────────
export interface TreeFilter {
  species: TreeSpecies | null;
  health: HealthLevel | null;
  minHeight: number;
  maxHeight: number;
  village: string | null;
  search: string;
}

// ── Drawing / measurement ────────────────────────────────
export type DrawShape = 'polygon' | 'line' | 'rectangle' | 'circle' | 'marker';

export interface DrawnFeature {
  id: string;
  shape: DrawShape;
  positions: [number, number][];
  radiusM?: number;
  label: string;
  isMeasurement: boolean;
  createdAt: number;
}
