// GeoJSON layers — Ahmedabad region (~23.00–23.08 N, 72.50–72.58 E)

export const BOUNDARY_GEOJSON = {
  type: 'Feature' as const,
  properties: { name: 'Ahmedabad East Division', area: '5,840 ha', district: 'Ahmedabad', state: 'Gujarat' },
  geometry: {
    type: 'Polygon' as const,
    coordinates: [[
      [72.5020, 23.0080], [72.5060, 23.0040], [72.5150, 23.0010],
      [72.5280, 23.0005], [72.5420, 23.0020], [72.5550, 23.0060],
      [72.5640, 23.0120], [72.5720, 23.0220], [72.5760, 23.0350],
      [72.5750, 23.0500], [72.5720, 23.0620], [72.5660, 23.0720],
      [72.5560, 23.0780], [72.5420, 23.0810], [72.5280, 23.0800],
      [72.5140, 23.0770], [72.5040, 23.0710], [72.4980, 23.0610],
      [72.4970, 23.0480], [72.4990, 23.0330], [72.5020, 23.0200],
      [72.5020, 23.0080],
    ]],
  },
};

export const FOREST_GEOJSON = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: { name: 'Central Forest Block', area: '1,240 ha', type: 'Reserved Forest', density: 'Dense' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [72.5200, 23.0200], [72.5300, 23.0180], [72.5420, 23.0200],
          [72.5500, 23.0280], [72.5520, 23.0400], [72.5490, 23.0500],
          [72.5400, 23.0560], [72.5280, 23.0570], [72.5160, 23.0520],
          [72.5100, 23.0420], [72.5110, 23.0300], [72.5200, 23.0200],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Northern Plantation Zone', area: '680 ha', type: 'Protected Forest', density: 'Moderate' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [72.5100, 23.0580], [72.5200, 23.0560], [72.5350, 23.0580],
          [72.5440, 23.0630], [72.5430, 23.0720], [72.5320, 23.0760],
          [72.5180, 23.0750], [72.5090, 23.0700], [72.5060, 23.0640],
          [72.5100, 23.0580],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Southern Buffer Zone', area: '420 ha', type: 'Buffer Zone', density: 'Sparse' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [72.5300, 23.0080], [72.5450, 23.0070], [72.5560, 23.0100],
          [72.5580, 23.0180], [72.5500, 23.0220], [72.5360, 23.0220],
          [72.5260, 23.0190], [72.5230, 23.0130], [72.5300, 23.0080],
        ]],
      },
    },
  ],
};

export const ROADS_GEOJSON = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: { name: 'NH-48 Corridor', type: 'National Highway', lanes: 6, speedKph: 120 },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [72.5020, 23.0400], [72.5150, 23.0390], [72.5300, 23.0380],
          [72.5450, 23.0370], [72.5600, 23.0380], [72.5750, 23.0400],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'State Highway 41', type: 'State Highway', lanes: 4, speedKph: 80 },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [72.5280, 23.0050], [72.5290, 23.0200], [72.5300, 23.0380],
          [72.5310, 23.0550], [72.5320, 23.0700], [72.5330, 23.0800],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'District Road 12', type: 'District Road', lanes: 2, speedKph: 60 },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [72.5020, 23.0600], [72.5100, 23.0580], [72.5200, 23.0560],
          [72.5290, 23.0550], [72.5380, 23.0530], [72.5460, 23.0510],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Forest Access Road', type: 'Forest Road', lanes: 1, speedKph: 30 },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [72.5300, 23.0380], [72.5280, 23.0340], [72.5260, 23.0300],
          [72.5240, 23.0260], [72.5220, 23.0220], [72.5210, 23.0180],
        ],
      },
    },
  ],
};

export const STREAMS_GEOJSON = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: { name: 'Khari River', type: 'River', widthM: 45, flow: 'Perennial' },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [72.5050, 23.0750], [72.5080, 23.0680], [72.5130, 23.0600],
          [72.5180, 23.0520], [72.5220, 23.0450], [72.5250, 23.0360],
          [72.5270, 23.0280], [72.5290, 23.0200], [72.5310, 23.0120],
          [72.5330, 23.0060],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Vatrak Tributary', type: 'Stream', widthM: 12, flow: 'Seasonal' },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [72.5600, 23.0700], [72.5560, 23.0640], [72.5520, 23.0580],
          [72.5480, 23.0510], [72.5440, 23.0440], [72.5400, 23.0380],
          [72.5360, 23.0330], [72.5330, 23.0260],
        ],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Irrigation Canal', type: 'Canal', widthM: 8, flow: 'Regulated' },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          [72.5100, 23.0420], [72.5160, 23.0410], [72.5220, 23.0400],
          [72.5290, 23.0390], [72.5360, 23.0390], [72.5440, 23.0400],
          [72.5520, 23.0410], [72.5600, 23.0420],
        ],
      },
    },
  ],
};

export const WATER_GEOJSON = {
  type: 'FeatureCollection' as const,
  features: [
    {
      type: 'Feature' as const,
      properties: { name: 'Chandola Lake', type: 'Lake', areaHa: 320, depth: 'Perennial' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [72.5560, 23.0180], [72.5600, 23.0170], [72.5640, 23.0190],
          [72.5660, 23.0230], [72.5650, 23.0270], [72.5610, 23.0290],
          [72.5560, 23.0280], [72.5530, 23.0250], [72.5540, 23.0210],
          [72.5560, 23.0180],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Vasna Reservoir', type: 'Reservoir', areaHa: 180, depth: 'Seasonal' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [72.5080, 23.0500], [72.5120, 23.0490], [72.5150, 23.0510],
          [72.5160, 23.0540], [72.5140, 23.0560], [72.5100, 23.0560],
          [72.5070, 23.0545], [72.5065, 23.0520], [72.5080, 23.0500],
        ]],
      },
    },
    {
      type: 'Feature' as const,
      properties: { name: 'Odhav Wetland', type: 'Wetland', areaHa: 95, depth: 'Monsoon' },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [[
          [72.5380, 23.0620], [72.5430, 23.0610], [72.5460, 23.0640],
          [72.5450, 23.0680], [72.5400, 23.0690], [72.5360, 23.0670],
          [72.5360, 23.0640], [72.5380, 23.0620],
        ]],
      },
    },
  ],
};

export const SURVEY_POINTS = Array.from({ length: 40 }, (_, i) => ({
  id: `SP${String(i + 1).padStart(3, '0')}`,
  lat: 23.0060 + (i * 17 % 73) * 0.001,
  lng: 72.5060 + (i * 19 % 71) * 0.001,
  label: `BM-${i + 1}`,
  surveyedBy: ['J. Patel', 'R. Shah', 'K. Mehta', 'D. Joshi'][i % 4],
  date: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  accuracy: 0.3 + (i % 7) * 0.1,
}));

export const VILLAGES = [
  { id: 'V01', name: 'Naroda',     lat: 23.0632, lng: 72.5640, population: 28000, trees: 1240 },
  { id: 'V02', name: 'Vastral',    lat: 23.0420, lng: 72.5720, population: 19500, trees: 880 },
  { id: 'V03', name: 'Vatva',      lat: 23.0280, lng: 72.5600, population: 31000, trees: 1650 },
  { id: 'V04', name: 'Odhav',      lat: 23.0380, lng: 72.5400, population: 24000, trees: 1120 },
  { id: 'V05', name: 'Asarwa',     lat: 23.0480, lng: 72.5180, population: 15000, trees: 640 },
  { id: 'V06', name: 'Chandlodia', lat: 23.0680, lng: 72.5280, population: 12000, trees: 540 },
  { id: 'V07', name: 'Ranip',      lat: 23.0580, lng: 72.5080, population: 18000, trees: 780 },
  { id: 'V08', name: 'Nikol',      lat: 23.0220, lng: 72.5480, population: 22000, trees: 960 },
];
