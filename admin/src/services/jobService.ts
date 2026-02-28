import apiClient from '@/lib/apiClient';
import type { Job } from '@/types/job';

export const jobService = {
  getAll: (params?: Record<string, string>): Promise<Job[]> =>
    apiClient.get('/jobs', { params }).then((r) => r.data.data),
  create: (data: FormData): Promise<Job> => apiClient.post('/jobs', data).then((r) => r.data.data),
  update: (id: string, data: FormData): Promise<Job> =>
    apiClient.put(`/jobs/${id}`, data).then((r) => r.data.data),
  remove: (id: string): Promise<void> => apiClient.delete(`/jobs/${id}`),
};
