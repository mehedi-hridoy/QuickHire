'use client';

import { useState, useEffect } from 'react';
import { jobService } from '@/services/jobService';
import JobForm from '@/features/jobs/JobForm';
import JobList from '@/features/jobs/JobList';
import type { Job } from '@/types/job';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobService.getAll().then(setJobs).finally(() => setLoading(false));
  }, []);

  const handleCreated = (job: Job) => {
    setJobs((prev) => [job, ...prev]);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await jobService.remove(id);
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {loading ? '...' : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} posted`}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Post New Job
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm">Loading jobs...</div>
        ) : (
          <JobList jobs={jobs} onDelete={handleDelete} />
        )}
      </div>

      {/* Modal */}
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
