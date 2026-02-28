import apiClient from '@/lib/apiClient';
import type { Stats } from '@/types/stats';

export const statsService = {
  get: (): Promise<Stats> => apiClient.get('/stats').then((r) => r.data.data),
};
