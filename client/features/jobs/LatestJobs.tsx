import Link from "next/link";
import JobLogoImage from "@/components/ui/JobLogoImage";
import type { Job } from "@/types/job";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

/* ── Tag styles ── */
const TAG_STYLES: Record<string, string> = {
  design:           "border border-[#7B61FF] text-[#7B61FF]",
  marketing:        "border border-[#FFB836] text-[#FFB836]",
  business:         "border border-[#4640DE] text-[#4640DE]",
  technology:       "border border-[#4640DE] text-[#4640DE]",
  engineering:      "border border-[#56CDAD] text-[#56CDAD]",
  finance:          "border border-[#3B82F6] text-[#3B82F6]",
  sales:            "border border-[#FFB836] text-[#FFB836]",
  "human resource": "border border-[#FF6B35] text-[#FF6B35]",
  product:          "border border-[#4640DE] text-[#4640DE]",
};

function tagClass(tag: string) {
  return TAG_STYLES[tag.toLowerCase()] ?? "border border-[#7B61FF] text-[#7B61FF]";
}

/* ── Single job card (horizontal layout) ── */
function JobCard({ job }: { job: Job }) {
  const logoSrc = job.logo ? `${API_BASE}${job.logo}` : null;

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group bg-white rounded-2xl p-5 flex items-start gap-4 hover:shadow-[0_8px_30px_rgba(70,64,222,0.10)] transition-all duration-200"
    >
      {/* Logo */}
      <div className="shrink-0 w-[68px] h-[68px] rounded-xl overflow-hidden border border-[#F0F0F0] bg-[#FAFAFA] flex items-center justify-center">
        <JobLogoImage
          src={logoSrc}
          alt={`${job.company} logo`}
          company={job.company}
          size={68}
          className="rounded-xl"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <h3 className="text-base font-bold text-[#25324B] group-hover:text-brand transition-colors truncate">
          {job.title}
        </h3>
        <p className="text-sm text-[#515B6F]">
          {job.company}
          <span className="mx-2 text-[#D6DDEB]">•</span>
          {job.location}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {/* Job type — filled teal pill */}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F9F5] text-[#56CDAD]">
            {job.type}
          </span>
          {/* Other tags — outlined colored pills */}
          {(job.tags ?? []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${tagClass(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ── Skeleton loader ── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-start gap-4 animate-pulse">
      <div className="shrink-0 w-[68px] h-[68px] rounded-xl bg-[#F0F4FF]" />
      <div className="flex flex-col gap-3 flex-1">
        <div className="h-4 bg-[#F0F4FF] rounded w-3/4" />
        <div className="h-3 bg-[#F0F4FF] rounded w-1/2" />
        <div className="flex gap-2 mt-1">
          <div className="h-6 w-20 rounded-full bg-[#F0F4FF]" />
          <div className="h-6 w-16 rounded-full bg-[#F0F4FF]" />
        </div>
      </div>
    </div>
  );
}

/* ── Data fetcher ── */
async function fetchLatestJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_BASE}/api/jobs?sort=desc&limit=8`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const jobs: Job[] = Array.isArray(json) ? json : (json.data ?? []);
    return jobs.slice(0, 8);
  } catch {
    return [];
  }
}

/* ── Decorative diagonal lines (top-right corner) ── */
function DecoLines() {
  return (
    <svg
      className="absolute top-0 right-0 w-72 h-56 pointer-events-none"
      viewBox="0 0 290 224"
      fill="none"
      aria-hidden="true"
    >
      <line x1="80"  y1="0" x2="290" y2="210" stroke="#C8C6E8" strokeWidth="1" opacity="0.5"/>
      <line x1="120" y1="0" x2="290" y2="170" stroke="#C8C6E8" strokeWidth="1" opacity="0.5"/>
      <line x1="160" y1="0" x2="290" y2="130" stroke="#C8C6E8" strokeWidth="1" opacity="0.5"/>
      <line x1="200" y1="0" x2="290" y2="90"  stroke="#C8C6E8" strokeWidth="1" opacity="0.5"/>
      <line x1="240" y1="0" x2="290" y2="50"  stroke="#C8C6E8" strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

/* ── Main server component ── */
export default async function LatestJobs() {
  const jobs = await fetchLatestJobs();

  return (
    <section className="relative py-20 lg:py-24 bg-[#F8F8FD] overflow-hidden">
      <DecoLines />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[32px] lg:text-[40px] font-bold text-[#25324B] leading-tight">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-brand hover:underline underline-offset-4"
          >
            Show all jobs
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.length > 0
            ? jobs.map((job) => <JobCard key={job._id} job={job} />)
            : Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          }
        </div>

        {/* Mobile "show all" */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            Show all jobs
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
