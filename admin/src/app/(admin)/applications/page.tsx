'use client';

import { useEffect, useState } from 'react';
import TopBar from '@/components/admin/TopBar';
import ApplicationTable from '@/features/applications/ApplicationTable';
import { applicationService } from '@/services/applicationService';
import type { Application } from '@/types/application';

export default function ApplicationsPage() {
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getAll().then(setItems).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    await applicationService.deleteById(id);
    setItems(prev => prev.filter(a => a._id !== id));
  };

  return (
    <div>
      <TopBar title="All Applicants" />
      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">Loading applications...</div>
      ) : (
        <ApplicationTable items={items} onDelete={handleDelete} />
      )}
    </div>
  );
}
