import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import JobsContent from '@/features/jobs/JobsContent';

export const metadata = { title: 'Browse Jobs — QuickHire' };

function JobsLoading() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] py-12">
      <div className="animate-pulse flex flex-col gap-8">
        <div className="h-10 w-64 bg-[#F0F4FF] rounded-lg" />
        <div className="h-14 bg-[#F0F4FF] rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 h-28" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface">
        <Suspense fallback={<JobsLoading />}>
          <JobsContent />
        </Suspense>
      </main>
    </>
  );
}
