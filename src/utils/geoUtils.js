const HEALTH_SCORES = { Excellent: 5, Healthy: 4, Good: 3, Average: 2, Poor: 1 };

export function computeStats(trees) {
  if (!trees.length) {
    return { total: 0, healthy: 0, avgHealth: '—', speciesCount: 0 };
  }

  const total        = trees.length;
  const healthy      = trees.filter((t) => t.health === 'Excellent' || t.health === 'Healthy').length;
  const totalScore   = trees.reduce((s, t) => s + (HEALTH_SCORES[t.health] ?? 2), 0);
  const avgHealth    = (totalScore / total).toFixed(1);
  const speciesCount = new Set(trees.map((t) => t.species)).size;

  return { total, healthy, avgHealth, speciesCount };
}
