'use client';

import { useEffect, useState } from 'react';
import TopBar from '@/components/admin/TopBar';
import CompanyForm from '@/features/company/CompanyForm';
import { companyService } from '@/services/companyService';
import type { CompanyProfile } from '@/types/company';

export default function CompanyPage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    companyService.get().then(setProfile).finally(() => setLoading(false));
  }, []);

  const handleSave = async (data: FormData) => {
    const saved = await companyService.upsert(data);
    setProfile(saved);
  };

  return (
    <div>
      <TopBar title="Company Profile" />
      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">Loading profile...</div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <CompanyForm initial={profile} onSave={handleSave} />
        </div>
      )}
    </div>
  );
}
