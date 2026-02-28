'use client';

import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import StatCard from '@/features/dashboard/StatCard';
import BarChart from '@/features/dashboard/BarChart';
import JobOpenCard from '@/features/dashboard/JobOpenCard';
import ApplicantsSummary from '@/features/dashboard/ApplicantsSummary';
import JobMetricsCard from '@/features/dashboard/JobMetricsCard';
import { statsService } from '@/services/statsService';
import type { Stats } from '@/types/stats';

const TYPE_COLORS: Record<string, string> = {
  'Full Time': 'bg-indigo-500',
  'Part Time': 'bg-emerald-400',
  Remote: 'bg-amber-400',
  Internship: 'bg-rose-400',
  Contract: 'bg-purple-400',
};

const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

const emptyStats: Stats = {
  totalJobs: 0,
  totalApplications: 0,
  jobsThisWeek: 0,
  applicationsThisWeek: 0,
  jobsByDay: [],
  applicationsByDay: [],
  applicationsByType: [],
  recentJobs: [],
  recentApplications: [],
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 6);

  useEffect(() => {
    statsService.get().then(setStats).finally(() => setLoading(false));
  }, []);

  const breakdown = stats.applicationsByType.map((b) => ({
    label: b.type,
    count: b.count,
    color: TYPE_COLORS[b.type] ?? 'bg-gray-300',
  }));

  const metrics = [
    {
      label: 'Job Views',
      value: stats.jobsByDay.reduce((s, d) => s + d.count, 0) * 100,
      weekCount: stats.jobsThisWeek,
      trend: 'up' as const,
      percent: '6.4%↑',
    },
    {
      label: 'Job Applied',
      value: stats.totalApplications,
      weekCount: stats.applicationsThisWeek,
      trend: 'down' as const,
      percent: '0.5%↓',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good morning, Maria 👋</h1>
          <p className="text-sm text-gray-400 mt-1">
            Here is your job listings statistic report from{' '}
            {fmtDate(weekAgo)} – {fmtDate(today)}
          </p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          <CalendarDays size={15} className="text-gray-400" />
          {fmtDate(weekAgo)} – {fmtDate(today)}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="New candidates to review"
          value={stats.totalApplications}
          gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
        />
        <StatCard
          label="Schedule for today"
          value={stats.jobsThisWeek}
          gradient="bg-gradient-to-br from-emerald-400 to-emerald-600"
        />
        <StatCard
          label="Messages received"
          value={stats.applicationsThisWeek}
          gradient="bg-gradient-to-br from-sky-400 to-sky-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <BarChart jobsByDay={stats.jobsByDay} applicationsByDay={stats.applicationsByDay} />
        </div>
        <div className="flex flex-col gap-4">
          <JobOpenCard count={stats.totalJobs} />
          <ApplicantsSummary total={stats.totalApplications} breakdown={breakdown} />
          <JobMetricsCard metrics={metrics} />
        </div>
      </div>
    </div>
  );
}

