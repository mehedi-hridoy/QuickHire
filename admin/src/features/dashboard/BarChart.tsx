"use client";

import { useState } from 'react';

interface Point {
  date: string;
  count: number;
}

interface Props {
  jobsByDay: Point[];
  applicationsByDay: Point[];
}

const PERIOD_TABS = ['Week', 'Month', 'Year'] as const;
const VIEW_TABS = ['Overview', 'Job View', 'Jobs Applied'] as const;

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function BarChart({ jobsByDay, applicationsByDay }: Props) {
  const [period, setPeriod] = useState<(typeof PERIOD_TABS)[number]>('Week');
  const [view, setView] = useState<(typeof VIEW_TABS)[number]>('Overview');

  const jobMax = Math.max(1, ...jobsByDay.map((d) => d.count));
  const appMax = Math.max(1, ...applicationsByDay.map((d) => d.count));
  const max = Math.max(jobMax, appMax);

  const pairs = jobsByDay.map((j, i) => ({
    label: DAY_LABELS[i] ?? j.date.slice(5),
    jobs: j.count,
    apps: applicationsByDay[i]?.count ?? 0,
  }));

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-base font-bold text-gray-900">Job statistics</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Showing Job statistic{' '}
            {jobsByDay[0]?.date?.slice(5).replace('-', ' ') ?? ''} –{' '}
            {jobsByDay[jobsByDay.length - 1]?.date?.slice(5).replace('-', ' ') ?? ''}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {PERIOD_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setPeriod(t)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                period === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 mb-5 border-b border-gray-100">
        {VIEW_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setView(t)}
            className={`pb-2 text-sm font-medium transition-colors ${
              view === t
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {pairs.length ? (
        <div className="flex items-end gap-3 h-44">
          {pairs.map(({ label, jobs, apps }) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-end gap-0.5 w-full" style={{ height: '152px' }}>
                <div
                  className="flex-1 rounded-t-sm bg-amber-400"
                  style={{ height: `${Math.round((jobs / max) * 100)}%` }}
                />
                <div
                  className="flex-1 rounded-t-sm bg-indigo-500"
                  style={{ height: `${Math.round((apps / max) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-44 flex items-center justify-center text-xs text-gray-400">No data</div>
      )}

      <div className="flex items-center gap-5 mt-4">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
          Job View
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
          Job Applied
        </span>
      </div>
    </div>
  );
}

