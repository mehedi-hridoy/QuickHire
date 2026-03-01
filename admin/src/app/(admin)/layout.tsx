import type { ReactNode } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';
import AuthGuard from '@/components/admin/AuthGuard';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f6f7fb] flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <AdminTopBar />
          <main className="flex-1 px-8 py-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
