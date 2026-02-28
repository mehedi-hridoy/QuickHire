import apiClient from '@/lib/apiClient';
import type { Application } from '@/types/application';

export const applicationService = {
  getAll: (): Promise<Application[]> => apiClient.get('/applications').then((r) => r.data.data),
  deleteById: (id: string): Promise<void> => apiClient.delete(`/applications/${id}`),
};
