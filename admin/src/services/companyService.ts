import apiClient from '@/lib/apiClient';
import type { CompanyProfile } from '@/types/company';

export const companyService = {
  get: (): Promise<CompanyProfile | null> => apiClient.get('/company').then((r) => r.data.data),
  upsert: (data: FormData): Promise<CompanyProfile> =>
    apiClient.put('/company', data).then((r) => r.data.data),
};
