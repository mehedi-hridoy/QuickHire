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

  return (
    <div>
      <TopBar title="All Applications" />
      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">Loading applications...</div>
      ) : (
        <ApplicationTable items={items} />
      )}
    </div>
  );
}
