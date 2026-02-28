import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import JobLogoImage from '@/components/ui/JobLogoImage';
import JobApplyForm from '@/features/jobs/JobApplyForm';
import type { Job } from '@/types/job';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  design:           { bg: '#D6F5E3', text: '#2E9B5F' },
  marketing:        { bg: '#FFE7D6', text: '#FF6B35' },
  business:         { bg: '#E8E8FF', text: '#4640DE' },
  technology:       { bg: '#FFE0E0', text: '#E05858' },
  finance:          { bg: '#D6EEFF', text: '#3B82F6' },
  engineering:      { bg: '#D6FAF5', text: '#14B8A6' },
  sales:            { bg: '#FFF3D6', text: '#F59E0B' },
  'human resource': { bg: '#FFE7D6', text: '#FF6B35' },
  product:          { bg: '#E8E8FF', text: '#4640DE' },
};

function tagStyle(tag: string) {
  return TAG_STYLES[tag.toLowerCase()] ?? { bg: '#F0F4FF', text: '#4640DE' };
}

async function fetchJob(id: string): Promise<Job | null> {
  try {
    const res = await fetch(`${API_BASE}/api/jobs/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch {
    return null;
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await fetchJob(id);
  if (!job) notFound();

  const logoSrc = job.logo ? `${API_BASE}${job.logo}` : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pb-20">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span className="text-border mx-1">/</span>
            <span className="text-dark font-medium truncate max-w-[240px]">{job.title}</span>
          </div>
        </div>

        {/* Job header */}
        <section className="bg-white border-b border-border">
          <div className="max-w-[1200px] mx-auto px-6 py-10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Logo */}
              <div className="w-[80px] h-[80px] rounded-xl border border-border bg-[#FAFAFA] flex items-center justify-center overflow-hidden shrink-0">
                <JobLogoImage
                  src={logoSrc}
                  alt={`${job.company} logo`}
                  company={job.company}
                  size={80}
                  className="rounded-xl"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl lg:text-[32px] font-[700] text-dark leading-tight">
                  {job.title}
                </h1>
                <p className="text-muted mt-1 text-sm">
                  <span className="font-semibold text-dark">{job.company}</span>
                  <span className="mx-2 text-border">·</span>
                  {job.location}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="border border-brand text-brand text-xs font-semibold px-3 py-1 rounded-sm">
                    {job.type}
                  </span>
                  {job.category && (
                    <span className="bg-[#E9EBFD] text-brand text-xs font-medium px-3 py-1 rounded-sm">
                      {job.category}
                    </span>
                  )}
                  {(job.tags ?? []).map((tag) => {
                    const { bg, text } = tagStyle(tag);
                    return (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ backgroundColor: bg, color: text }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content grid */}
        <div className="max-w-[1200px] mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* Left — description */}
          <div className="bg-white rounded-xl border border-border p-8">
            <h2 className="text-lg font-bold text-dark mb-5">About this role</h2>
            <div className="text-[#515B6F] leading-[175%] text-sm whitespace-pre-line">
              {job.description}
            </div>

            {/* Meta grid */}
            <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-x-6 gap-y-5">
              {[
                { label: 'Company',  value: job.company },
                { label: 'Location', value: job.location },
                { label: 'Job Type', value: job.type },
                ...(job.category ? [{ label: 'Category', value: job.category }] : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[11px] text-subtle uppercase tracking-widest font-semibold mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-dark">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — apply form */}
          <JobApplyForm jobId={job._id} jobTitle={job.title} company={job.company} />
        </div>
      </main>
    </>
  );
}
