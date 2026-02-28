import { TrendingUp, TrendingDown } from 'lucide-react';

interface Metric {
  label: string;
  value: number;
  weekCount: number;
  trend: 'up' | 'down';
  percent: string;
}

interface Props {
  metrics: Metric[];
}

export default function JobMetricsCard({ metrics }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">{m.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {m.value.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">This Week</p>
            <div
              className={`flex items-center justify-end gap-1 mt-0.5 text-xs font-semibold ${
                m.trend === 'up' ? 'text-emerald-500' : 'text-red-400'
              }`}
            >
              {m.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {m.percent}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
