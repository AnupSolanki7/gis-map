/**
 * Pre-defined campus boundary.
 * Positions in [lat, lng] order for Leaflet's Polygon component.
 * This polygon outlines the surveyed tree area in western Ahmedabad.
 */
export const CAMPUS_NAME = 'Green Valley Campus — Ahmedabad';

// Outer boundary (clockwise)
export const BOUNDARY_LATLNGS = [
  [23.0382, 72.5245],
  [23.0385, 72.5272],
  [23.0378, 72.5308],
  [23.0362, 72.5325],
  [23.0342, 72.5318],
  [23.0328, 72.5305],
  [23.0318, 72.5282],
  [23.0312, 72.5262],
  [23.0315, 72.5245],
  [23.0328, 72.5235],
  [23.0352, 72.5230],
  [23.0382, 72.5245],
];

// Inner sub-section boundary (south lot)
export const INNER_BOUNDARY_LATLNGS = [
  [23.0312, 72.5262],
  [23.0318, 72.5282],
  [23.0310, 72.5290],
  [23.0302, 72.5280],
  [23.0302, 72.5265],
  [23.0308, 72.5258],
  [23.0312, 72.5262],
];

export const CAMPUS_CENTER = [23.0348, 72.5278];
export const CAMPUS_ZOOM   = 16;
