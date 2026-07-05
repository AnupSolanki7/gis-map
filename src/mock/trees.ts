import type { Tree, TreeSpecies, HealthLevel } from '@/types';

const SPECIES: { species: TreeSpecies; common: string }[] = [
  { species: 'Tectona grandis',    common: 'Teak' },
  { species: 'Azadirachta indica', common: 'Neem' },
  { species: 'Ficus benghalensis', common: 'Banyan' },
  { species: 'Mangifera indica',   common: 'Mango' },
  { species: 'Dalbergia sissoo',   common: 'Shisham' },
  { species: 'Acacia nilotica',    common: 'Babool' },
  { species: 'Eucalyptus globulus',common: 'Eucalyptus' },
  { species: 'Cassia fistula',     common: 'Amaltas' },
  { species: 'Pongamia pinnata',   common: 'Karanj' },
  { species: 'Terminalia arjuna',  common: 'Arjun' },
];

const HEALTH_LEVELS: HealthLevel[] = ['Healthy', 'Healthy', 'Healthy', 'Medium', 'Medium', 'Critical', 'Dead'];

const VILLAGES = [
  'Naroda', 'Vastral', 'Vatva', 'Odhav', 'Asarwa',
  'Sabarmati', 'Chandlodia', 'Motera', 'Bopal', 'Gota',
  'Ranip', 'Nikol', 'Thaltej', 'Vejalpur', 'Maninagar',
];

const OWNERS = [
  'Gujarat Forest Dept', 'Municipal Corp', 'Private', 'Revenue Dept',
  'AUDA', 'Railway Dept', 'State Highways', 'Panchayat',
];

// Seed-based pseudo-random for deterministic data
function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRand(42);

export const TREES: Tree[] = Array.from({ length: 300 }, (_, i) => {
  const sp = SPECIES[Math.floor(rand() * SPECIES.length)];
  const health = HEALTH_LEVELS[Math.floor(rand() * HEALTH_LEVELS.length)];
  const lat = 23.0050 + rand() * 0.0700;
  const lng = 72.5050 + rand() * 0.0800;
  const surveyYear = 2020 + Math.floor(rand() * 4);
  const surveyMonth = String(Math.floor(rand() * 12) + 1).padStart(2, '0');
  const surveyDay = String(Math.floor(rand() * 28) + 1).padStart(2, '0');
  return {
    id: `T${String(i + 1).padStart(4, '0')}`,
    lat,
    lng,
    species: sp.species,
    commonName: sp.common,
    health,
    heightM: +(4 + rand() * 28).toFixed(1),
    agYears: 2 + Math.floor(rand() * 65),
    carbonKg: +(5 + rand() * 95).toFixed(1),
    surveyDate: `${surveyYear}-${surveyMonth}-${surveyDay}`,
    village: VILLAGES[Math.floor(rand() * VILLAGES.length)],
    district: 'Ahmedabad',
    plantationYear: 1998 + Math.floor(rand() * 26),
    owner: OWNERS[Math.floor(rand() * OWNERS.length)],
    gps: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    photos: [],
    notes: health === 'Critical' ? 'Requires immediate attention' : health === 'Dead' ? 'Marked for removal' : '',
  };
});

export const TREE_STATS = {
  total: TREES.length,
  healthy: TREES.filter(t => t.health === 'Healthy').length,
  medium:  TREES.filter(t => t.health === 'Medium').length,
  critical: TREES.filter(t => t.health === 'Critical').length,
  dead:    TREES.filter(t => t.health === 'Dead').length,
  totalCarbonKg: +TREES.reduce((s, t) => s + t.carbonKg, 0).toFixed(0),
  avgHeightM: +(TREES.reduce((s, t) => s + t.heightM, 0) / TREES.length).toFixed(1),
  speciesCount: new Set(TREES.map(t => t.species)).size,
  villages: new Set(TREES.map(t => t.village)).size,
};
