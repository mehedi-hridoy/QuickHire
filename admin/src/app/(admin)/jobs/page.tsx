'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  const debounced = useDebounce(filters, 350);

  // Auto-open the new-job modal when navigated here with ?new=1
  useEffect(() => {
    if (searchParams.get('new') === '1') {
      setShowForm(true);
      router.replace('/jobs');
    }
  }, [searchParams, router]);

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

  const handleUpdated = (updated: Job) => {
    setJobs((prev) => prev.map((j) => (j._id === updated._id ? updated : j)));
    setEditingJob(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job?')) return;
    await jobService.remove(id);
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
  };

  const closeModal = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  const handleFilters = (next: typeof initialFilters) => {
    setLoading(true);
    setFilters(next);
  };

  const modalOpen = showForm || !!editingJob;

  return (
    <div>
      <TopBar title="Job Listing" />
      <JobsHeader count={jobs.length} loading={loading} onNew={() => { setEditingJob(null); setShowForm(true); }} />
      <JobsFilters value={filters} onChange={handleFilters} />
      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">Loading jobs...</div>
      ) : (
        <JobList jobs={jobs} onDelete={handleDelete} onEdit={handleEdit} />
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-semibold text-gray-900 mb-5">
              {editingJob ? 'Edit Job' : 'Post a New Job'}
            </h2>
            <JobForm
              initialData={editingJob ?? undefined}
              onSuccess={editingJob ? handleUpdated : handleCreated}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

