import Image from 'next/image';
import { SERVER_URL } from '@/lib/constants';
import type { Job } from '@/types/job';

const TAG_COLORS: Record<string, string> = {
  Marketing: 'bg-orange-50 text-orange-500',
  Design: 'bg-green-50 text-green-600',
  Business: 'bg-emerald-50 text-emerald-600',
  Technology: 'bg-blue-50 text-blue-600',
  Engineering: 'bg-purple-50 text-purple-600',
  Finance: 'bg-yellow-50 text-yellow-600',
};

interface Props {
  jobs: Job[];
  onDelete: (id: string) => void;
}

export default function JobList({ jobs, onDelete }: Props) {
  if (!jobs.length)
    return (
      <div className="text-center py-20 text-gray-400 text-sm">
        No jobs posted yet. Click <span className="font-medium text-blue-500">+ Post New Job</span> to get started.
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
              {job.logo ? (
                <Image
                  src={`${SERVER_URL}${job.logo}`}
                  alt={job.company}
                  width={44}
                  height={44}
                  className="object-contain"
                />
              ) : (
                <span className="text-base font-bold text-gray-300">{job.company?.[0] ?? 'C'}</span>
              )}
            </div>
            <span className="text-[11px] font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
              {job.type}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{job.title}</h3>
          <p className="text-xs text-gray-400 mb-2">
            {job.company} · {job.location}
          </p>
          <p className="text-xs text-gray-400 line-clamp-2 mb-3 flex-1">{job.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {job.category && (
              <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
                {job.category}
              </span>
            )}
            {(job.tags || []).map((tag) => (
              <span
                key={tag}
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-500'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => onDelete(job._id)}
            className="w-full text-xs text-red-400 hover:text-red-600 hover:bg-red-50 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
