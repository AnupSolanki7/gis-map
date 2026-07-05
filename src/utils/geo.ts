import { area as turfArea, length as turfLength, polygon as turfPolygon, lineString as turfLineString } from '@turf/turf';
import type { Tree, HealthLevel } from '@/types';

export const HEALTH_COLOR: Record<HealthLevel, string> = {
  Healthy:  '#4ADE80',
  Medium:   '#FBBF24',
  Critical: '#F87171',
  Dead:     '#64748B',
};

export const SPECIES_COLOR: Record<string, string> = {
  'Tectona grandis':    '#34D399',
  'Azadirachta indica': '#4ADE80',
  'Ficus benghalensis': '#A3E635',
  'Mangifera indica':   '#F59E0B',
  'Dalbergia sissoo':   '#22D3EE',
  'Acacia nilotica':    '#818CF8',
  'Eucalyptus globulus':'#2DD4BF',
  'Cassia fistula':     '#FCD34D',
  'Pongamia pinnata':   '#86EFAC',
  'Terminalia arjuna':  '#67E8F9',
};

export function getTreeColor(tree: Tree, colorBy: 'health' | 'species' = 'health'): string {
  if (colorBy === 'species') return SPECIES_COLOR[tree.species] ?? '#94A3B8';
  return HEALTH_COLOR[tree.health];
}

export function formatCoord(val: number, axis: 'lat' | 'lng'): string {
  const dir = axis === 'lat' ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');
  return `${Math.abs(val).toFixed(5)}° ${dir}`;
}

export function formatScale(zoom: number): string {
  const scales = [
    591657527, 295828764, 147914382, 73957191, 36978595,
    18489298,  9244649,   4622324,   2311162,  1155581,
    577791,    288895,    144448,    72224,    36112,
    18056,     9028,      4514,      2257,     1128,
  ];
  const scale = scales[Math.max(0, Math.min(19, Math.round(zoom)))];
  return scale >= 1000000
    ? `1:${(scale / 1000000).toFixed(1)}M`
    : scale >= 1000
    ? `1:${(scale / 1000).toFixed(0)}K`
    : `1:${scale}`;
}

export function formatDistance(km: number): string {
  return km < 1 ? `${(km * 1000).toFixed(0)} m` : `${km.toFixed(2)} km`;
}

export function formatArea(m2: number): string {
  if (m2 < 10000) return `${m2.toFixed(0)} m²`;
  const ha = m2 / 10000;
  return ha < 100 ? `${ha.toFixed(2)} ha` : `${(m2 / 1_000_000).toFixed(2)} km²`;
}

export function lineLengthKm(positions: [number, number][]): number {
  if (positions.length < 2) return 0;
  const coords = positions.map(([lat, lng]) => [lng, lat]);
  return turfLength(turfLineString(coords), { units: 'kilometers' });
}

export function polygonAreaM2(positions: [number, number][]): number {
  if (positions.length < 3) return 0;
  const ring = positions.map(([lat, lng]) => [lng, lat]);
  ring.push(ring[0]);
  return turfArea(turfPolygon([ring]));
}

export function circleAreaM2(radiusM: number): number {
  return Math.PI * radiusM * radiusM;
}

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
