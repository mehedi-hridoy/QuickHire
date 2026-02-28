import { Briefcase } from 'lucide-react';

interface Props {
  count: number;
}

export default function JobOpenCard({ count }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Job Open</h3>
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
          <Briefcase size={16} className="text-indigo-600" />
        </div>
      </div>
      <div>
        <p className="text-5xl font-extrabold text-gray-900">{count}</p>
        <p className="text-sm text-gray-400 mt-1">Jobs Opened</p>
      </div>
    </div>
  );
}
