import L from 'leaflet';

export const SPECIES_COLORS = {
  'Azadirachta indica': '#2E7D32',  // Neem        — dark green
  'Ficus benghalensis': '#795548',  // Banyan       — brown
  'Mangifera indica':   '#E65100',  // Mango        — deep orange
  'Saraca asoca':       '#6A1B9A',  // Ashoka       — purple
  'Delonix regia':      '#C62828',  // Gulmohar     — red
  'Ficus religiosa':    '#00695C',  // Peepal       — dark teal
  'Cocos nucifera':     '#F9A825',  // Coconut      — amber
};

export function getSpeciesColor(species) {
  return SPECIES_COLORS[species] ?? '#1565C0';
}

// Cache one icon per species to avoid recreating on every render
const _cache = {};

export function createMarker(species) {
  if (!_cache[species]) {
    const color = getSpeciesColor(species);
    _cache[species] = L.divIcon({
      className: 'custom-tree-marker',
      html: `<div class="tree-marker-dot" style="background:${color};border-color:#fff"></div>`,
      iconSize:     [22, 22],
      iconAnchor:   [11, 11],
      popupAnchor:  [0, -13],
    });
  }
  return _cache[species];
}
