'use client';

import { useEffect, useMemo, useState } from 'react';
import TopBar from '@/components/admin/TopBar';
import JobForm from '@/features/jobs/JobForm';
import JobList from '@/features/jobs/JobList';
import JobsHeader from '@/features/jobs/JobsHeader';
import JobsFilters from '@/features/jobs/JobsFilters';
import useDebounce from '@/hooks/useDebounce';
import { jobService } from '@/services/jobService';
import type { Job } from '@/types/job';

const initialFilters = { search: '', location: '', category: '', from: '', to: '', sort: 'desc' };

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  const debounced = useDebounce(filters, 350);

  const params = useMemo(() => {
    const { search, location, category, from, to, sort } = debounced;
    return Object.fromEntries(Object.entries({ search, location, category, from, to, sort }).filter(([, v]) => v));
  }, [debounced]);

  useEffect(() => {
    jobService.getAll(params).then(setJobs).finally(() => setLoading(false));
  }, [params]);

  const handleCreated = (job: Job) => {
    setJobs((prev) => [job, ...prev]);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await jobService.remove(id);
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  const handleFilters = (next: typeof initialFilters) => {
    setLoading(true);
    setFilters(next);
  };

  return (
    <div>
      <TopBar title="Job Listing" />
      <JobsHeader count={jobs.length} loading={loading} onNew={() => setShowForm(true)} />
      <JobsFilters value={filters} onChange={handleFilters} />
      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">Loading jobs...</div>
      ) : (
        <JobList jobs={jobs} onDelete={handleDelete} />
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Post a New Job</h2>
            <JobForm onSuccess={handleCreated} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
