import { motion } from 'framer-motion';
import { Trees, Heart, AlertTriangle, Wind, Droplets, Zap } from 'lucide-react';
import { TREE_STATS } from '@/mock/trees';
import { WATER_GEOJSON } from '@/mock/geodata';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  bg: string;
  sparkline?: number[];
}

const CARDS: StatCard[] = [
  {
    icon: <Trees size={14} />,
    label: 'Total Trees',
    value: TREE_STATS.total,
    sub: `${TREE_STATS.speciesCount} species`,
    color: '#34D399',
    bg: 'rgba(52,211,153,0.1)',
    sparkline: [180, 200, 220, 210, 240, 260, 300],
  },
  {
    icon: <Heart size={14} />,
    label: 'Healthy',
    value: TREE_STATS.healthy,
    sub: `${Math.round((TREE_STATS.healthy / TREE_STATS.total) * 100)}% of inventory`,
    color: '#4ADE80',
    bg: 'rgba(74,222,128,0.1)',
    sparkline: [120, 130, 125, 135, 140, 148, TREE_STATS.healthy],
  },
  {
    icon: <AlertTriangle size={14} />,
    label: 'Critical',
    value: TREE_STATS.critical,
    sub: 'Needs attention',
    color: '#F87171',
    bg: 'rgba(248,113,113,0.1)',
    sparkline: [8, 10, 9, 11, 10, 12, TREE_STATS.critical],
  },
  {
    icon: <Zap size={14} />,
    label: 'Carbon Stored',
    value: `${(TREE_STATS.totalCarbonKg / 1000).toFixed(1)} t`,
    sub: `${TREE_STATS.avgHeightM}m avg height`,
    color: '#34D399',
    bg: 'rgba(52,211,153,0.08)',
    sparkline: [800, 900, 1000, 1100, 1200, 1300, TREE_STATS.totalCarbonKg / 1000],
  },
  {
    icon: <Droplets size={14} />,
    label: 'Water Bodies',
    value: WATER_GEOJSON.features.length,
    sub: 'Lakes & reservoirs',
    color: '#38BDF8',
    bg: 'rgba(56,189,248,0.1)',
    sparkline: [3, 3, 3, 3, 3, 3, 3],
  },
  {
    icon: <Wind size={14} />,
    label: 'Rainfall',
    value: '782 mm',
    sub: 'Annual average',
    color: '#818CF8',
    bg: 'rgba(129,140,248,0.1)',
    sparkline: [600, 650, 720, 680, 750, 800, 782],
  },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 24;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });

  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      {/* End dot */}
      <circle
        cx={w}
        cy={h - ((data[data.length - 1] - min) / range) * h}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

export function StatsPanel() {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-16 left-4 z-[800] flex flex-col gap-1.5"
    >
      {CARDS.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 px-3 py-2 rounded-xl"
          style={{
            background: 'rgba(15,23,40,0.82)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            minWidth: 200,
          }}
        >
          <div
            className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: card.bg, color: card.color }}
          >
            {card.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide font-semibold leading-tight">
              {card.label}
            </p>
            <p className="text-[15px] font-bold font-mono leading-tight" style={{ color: card.color }}>
              {card.value}
            </p>
            {card.sub && (
              <p className="text-[9px] text-[var(--text-muted)] leading-tight">{card.sub}</p>
            )}
          </div>
          {card.sparkline && <Sparkline data={card.sparkline} color={card.color} />}
        </motion.div>
      ))}
    </motion.div>
  );
}
