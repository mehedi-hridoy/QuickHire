import { ChevronRight } from 'lucide-react';

interface Props {
  label: string;
  value: number | string;
  gradient: string;
  href?: string;
}

export default function StatCard({ label, value, gradient }: Props) {
  return (
    <div className={`${gradient} rounded-2xl p-6 flex items-center justify-between`}>
      <div>
        <p className="text-4xl font-bold text-white">{value}</p>
        <p className="text-sm text-white/80 mt-1.5 max-w-35 leading-snug">{label}</p>
      </div>
      <button className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shrink-0">
        <ChevronRight size={18} className="text-white" />
      </button>
    </div>
  );
}

