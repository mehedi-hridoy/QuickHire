import axios from 'axios';
import type { Job } from '@/types/job';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api' });

export const jobService = {
  getAll: (): Promise<Job[]> => api.get('/jobs').then((r) => r.data.data),
  create: (data: FormData): Promise<Job> => api.post('/jobs', data).then((r) => r.data.data),
  update: (id: string, data: FormData): Promise<Job> => api.put(`/jobs/${id}`, data).then((r) => r.data.data),
  remove: (id: string): Promise<void> => api.delete(`/jobs/${id}`),
};
