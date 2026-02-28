"use client";

import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, Plus } from 'lucide-react';

export default function AdminTopBar() {
  const router = useRouter();

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">N</span>
        </div>
        <span className="text-sm font-semibold text-gray-800">Nomad</span>
        <ChevronDown size={14} className="text-gray-400" />
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <button
          onClick={() => router.push('/jobs?new=1')}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} />
          Post a job
        </button>
      </div>
    </header>
  );
}
