// All 45 trees surveyed within the campus boundary
// Coordinates in lat/lng, spread across the campus area
export const TREES = [
  // ── Neem ─────────────────────────────────────────────────────
  { id:  1, name: 'Neem', species: 'Azadirachta indica', age: 18, health: 'Healthy',   height: 12.5, diameter: 45,  latitude: 23.0362, longitude: 72.5258 },
  { id:  2, name: 'Neem', species: 'Azadirachta indica', age: 30, health: 'Poor',      height: 10.0, diameter: 68,  latitude: 23.0342, longitude: 72.5248 },
  { id:  3, name: 'Neem', species: 'Azadirachta indica', age: 25, health: 'Healthy',   height: 13.0, diameter: 55,  latitude: 23.0332, longitude: 72.5285 },
  { id:  4, name: 'Neem', species: 'Azadirachta indica', age: 14, health: 'Good',      height: 9.0,  diameter: 38,  latitude: 23.0348, longitude: 72.5295 },
  { id:  5, name: 'Neem', species: 'Azadirachta indica', age: 22, health: 'Average',   height: 11.5, diameter: 60,  latitude: 23.0365, longitude: 72.5270 },
  { id:  6, name: 'Neem', species: 'Azadirachta indica', age: 11, health: 'Good',      height: 8.5,  diameter: 32,  latitude: 23.0322, longitude: 72.5258 },

  // ── Banyan ───────────────────────────────────────────────────
  { id:  7, name: 'Banyan', species: 'Ficus benghalensis', age: 55, health: 'Healthy',   height: 22.0, diameter: 130, latitude: 23.0372, longitude: 72.5260 },
  { id:  8, name: 'Banyan', species: 'Ficus benghalensis', age: 42, health: 'Excellent', height: 18.0, diameter: 110, latitude: 23.0352, longitude: 72.5272 },
  { id:  9, name: 'Banyan', species: 'Ficus benghalensis', age: 60, health: 'Excellent', height: 25.0, diameter: 145, latitude: 23.0338, longitude: 72.5302 },
  { id: 10, name: 'Banyan', species: 'Ficus benghalensis', age: 38, health: 'Healthy',   height: 16.5, diameter:  95, latitude: 23.0325, longitude: 72.5268 },
  { id: 11, name: 'Banyan', species: 'Ficus benghalensis', age: 48, health: 'Excellent', height: 21.0, diameter: 120, latitude: 23.0358, longitude: 72.5305 },
  { id: 12, name: 'Banyan', species: 'Ficus benghalensis', age: 70, health: 'Healthy',   height: 24.0, diameter: 155, latitude: 23.0372, longitude: 72.5290 },
  { id: 13, name: 'Banyan', species: 'Ficus benghalensis', age: 33, health: 'Good',      height: 14.5, diameter:  80, latitude: 23.0318, longitude: 72.5278 },

  // ── Mango ────────────────────────────────────────────────────
  { id: 14, name: 'Mango', species: 'Mangifera indica', age: 15, health: 'Average',   height:  9.0, diameter: 38,  latitude: 23.0368, longitude: 72.5248 },
  { id: 15, name: 'Mango', species: 'Mangifera indica', age: 20, health: 'Good',      height: 10.5, diameter: 44,  latitude: 23.0350, longitude: 72.5262 },
  { id: 16, name: 'Mango', species: 'Mangifera indica', age: 18, health: 'Poor',      height:  8.0, diameter: 42,  latitude: 23.0335, longitude: 72.5248 },
  { id: 17, name: 'Mango', species: 'Mangifera indica', age: 24, health: 'Good',      height:  9.5, diameter: 50,  latitude: 23.0345, longitude: 72.5312 },
  { id: 18, name: 'Mango', species: 'Mangifera indica', age: 12, health: 'Healthy',   height:  7.5, diameter: 30,  latitude: 23.0328, longitude: 72.5295 },
  { id: 19, name: 'Mango', species: 'Mangifera indica', age: 22, health: 'Average',   height: 10.0, diameter: 48,  latitude: 23.0318, longitude: 72.5282 },
  { id: 20, name: 'Mango', species: 'Mangifera indica', age: 16, health: 'Good',      height:  8.5, diameter: 40,  latitude: 23.0362, longitude: 72.5282 },

  // ── Ashoka ───────────────────────────────────────────────────
  { id: 21, name: 'Ashoka', species: 'Saraca asoca', age:  8, health: 'Healthy',   height:  7.0, diameter: 22,  latitude: 23.0375, longitude: 72.5265 },
  { id: 22, name: 'Ashoka', species: 'Saraca asoca', age: 11, health: 'Good',      height:  8.5, diameter: 28,  latitude: 23.0355, longitude: 72.5252 },
  { id: 23, name: 'Ashoka', species: 'Saraca asoca', age: 14, health: 'Excellent', height:  9.5, diameter: 35,  latitude: 23.0340, longitude: 72.5275 },
  { id: 24, name: 'Ashoka', species: 'Saraca asoca', age:  9, health: 'Healthy',   height:  7.5, diameter: 25,  latitude: 23.0330, longitude: 72.5262 },
  { id: 25, name: 'Ashoka', species: 'Saraca asoca', age:  7, health: 'Average',   height:  6.0, diameter: 18,  latitude: 23.0322, longitude: 72.5252 },
  { id: 26, name: 'Ashoka', species: 'Saraca asoca', age: 12, health: 'Good',      height:  8.0, diameter: 30,  latitude: 23.0365, longitude: 72.5298 },

  // ── Gulmohar ─────────────────────────────────────────────────
  { id: 27, name: 'Gulmohar', species: 'Delonix regia', age: 22, health: 'Excellent', height: 11.0, diameter: 52,  latitude: 23.0370, longitude: 72.5278 },
  { id: 28, name: 'Gulmohar', species: 'Delonix regia', age: 17, health: 'Healthy',   height:  9.5, diameter: 44,  latitude: 23.0358, longitude: 72.5265 },
  { id: 29, name: 'Gulmohar', species: 'Delonix regia', age: 14, health: 'Good',      height:  9.0, diameter: 40,  latitude: 23.0342, longitude: 72.5262 },
  { id: 30, name: 'Gulmohar', species: 'Delonix regia', age: 19, health: 'Excellent', height: 10.5, diameter: 48,  latitude: 23.0348, longitude: 72.5308 },
  { id: 31, name: 'Gulmohar', species: 'Delonix regia', age: 12, health: 'Healthy',   height:  8.0, diameter: 35,  latitude: 23.0328, longitude: 72.5272 },
  { id: 32, name: 'Gulmohar', species: 'Delonix regia', age:  9, health: 'Average',   height:  7.5, diameter: 28,  latitude: 23.0315, longitude: 72.5262 },

  // ── Peepal ───────────────────────────────────────────────────
  { id: 33, name: 'Peepal', species: 'Ficus religiosa', age: 45, health: 'Excellent', height: 17.0, diameter: 88,  latitude: 23.0368, longitude: 72.5255 },
  { id: 34, name: 'Peepal', species: 'Ficus religiosa', age: 28, health: 'Healthy',   height: 14.0, diameter: 62,  latitude: 23.0355, longitude: 72.5278 },
  { id: 35, name: 'Peepal', species: 'Ficus religiosa', age: 35, health: 'Good',      height: 15.0, diameter: 75,  latitude: 23.0340, longitude: 72.5290 },
  { id: 36, name: 'Peepal', species: 'Ficus religiosa', age: 50, health: 'Healthy',   height: 19.0, diameter: 98,  latitude: 23.0332, longitude: 72.5305 },
  { id: 37, name: 'Peepal', species: 'Ficus religiosa', age: 40, health: 'Good',      height: 15.5, diameter: 80,  latitude: 23.0352, longitude: 72.5285 },
  { id: 38, name: 'Peepal', species: 'Ficus religiosa', age: 20, health: 'Average',   height: 11.0, diameter: 55,  latitude: 23.0322, longitude: 72.5270 },
  { id: 39, name: 'Peepal', species: 'Ficus religiosa', age: 15, health: 'Healthy',   height: 10.0, diameter: 45,  latitude: 23.0318, longitude: 72.5248 },

  // ── Coconut ──────────────────────────────────────────────────
  { id: 40, name: 'Coconut', species: 'Cocos nucifera', age: 16, health: 'Good',      height: 20.0, diameter: 35,  latitude: 23.0375, longitude: 72.5252 },
  { id: 41, name: 'Coconut', species: 'Cocos nucifera', age: 13, health: 'Healthy',   height: 17.5, diameter: 32,  latitude: 23.0362, longitude: 72.5290 },
  { id: 42, name: 'Coconut', species: 'Cocos nucifera', age: 10, health: 'Average',   height: 14.0, diameter: 28,  latitude: 23.0345, longitude: 72.5268 },
  { id: 43, name: 'Coconut', species: 'Cocos nucifera', age: 18, health: 'Good',      height: 21.0, diameter: 36,  latitude: 23.0335, longitude: 72.5252 },
  { id: 44, name: 'Coconut', species: 'Cocos nucifera', age: 12, health: 'Healthy',   height: 16.0, diameter: 30,  latitude: 23.0325, longitude: 72.5280 },
  { id: 45, name: 'Coconut', species: 'Cocos nucifera', age: 20, health: 'Poor',      height: 19.0, diameter: 34,  latitude: 23.0312, longitude: 72.5268 },
];
