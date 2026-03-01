import Link from "next/link";
import JobLogoImage from "@/components/ui/JobLogoImage";
import type { Job } from "@/types/job";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

/* ── Tag colour map ── */
const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  design:           { bg: "#D6F5E3", text: "#2E9B5F" },
  marketing:        { bg: "#FFE7D6", text: "#FF6B35" },
  business:         { bg: "#E8E8FF", text: "#4640DE" },
  technology:       { bg: "#FFE0E0", text: "#E05858" },
  finance:          { bg: "#D6EEFF", text: "#3B82F6" },
  engineering:      { bg: "#D6FAF5", text: "#14B8A6" },
  sales:            { bg: "#FFF3D6", text: "#F59E0B" },
  "human resource": { bg: "#FFE7D6", text: "#FF6B35" },
  product:          { bg: "#E8E8FF", text: "#4640DE" },
};

function tagStyle(tag: string) {
  return TAG_STYLES[tag.toLowerCase()] ?? { bg: "#F0F4FF", text: "#4640DE" };
}

/* ── Single job card (vertical 4-col layout) ── */
function JobCard({ job }: { job: Job }) {
  const logoSrc = job.logo ? `${API_BASE}${job.logo}` : null;

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group bg-white border border-[#D6DDEB] rounded p-6 flex flex-col gap-4 hover:border-brand hover:shadow-[0_4px_20px_rgba(70,64,222,0.10)] transition-all duration-200"
    >
      {/* Top row: logo + type badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-12 h-12 rounded overflow-hidden border border-[#F0F0F0] bg-[#FAFAFA] flex items-center justify-center shrink-0">
          <JobLogoImage
            src={logoSrc}
            alt={`${job.company} logo`}
            company={job.company}
            size={48}
            className="rounded"
          />
        </div>
        <span className="shrink-0 border border-brand text-brand text-xs font-semibold px-3 py-1 rounded-sm whitespace-nowrap">
          {job.type}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="text-base font-bold text-[#25324B] group-hover:text-brand transition-colors line-clamp-1">
          {job.title}
        </h3>
        <p className="mt-1 text-sm text-[#515B6F]">
          {job.company}
          <span className="mx-2 text-[#D6DDEB]">•</span>
          {job.location}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-[#7C8493] leading-relaxed line-clamp-2">
        {job.description}
      </p>

      {/* Tags */}
      {(job.tags ?? []).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {(job.tags ?? []).slice(0, 3).map((tag) => {
            const { bg, text } = tagStyle(tag);
            return (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: bg, color: text }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}
    </Link>
  );
}

/* ── Skeleton loader ── */
function SkeletonCard() {
  return (
    <div className="bg-white border border-[#D6DDEB] rounded p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded bg-[#F0F4FF]" />
        <div className="w-20 h-6 rounded bg-[#F0F4FF]" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-[#F0F4FF] rounded w-3/4" />
        <div className="h-3 bg-[#F0F4FF] rounded w-1/2" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 bg-[#F0F4FF] rounded" />
        <div className="h-3 bg-[#F0F4FF] rounded w-5/6" />
      </div>
      <div className="flex gap-2 mt-auto pt-2">
        <div className="h-6 w-20 rounded-full bg-[#F0F4FF]" />
        <div className="h-6 w-16 rounded-full bg-[#F0F4FF]" />
      </div>
    </div>
  );
}

/* ── Data fetcher ── */
async function fetchFeaturedJobs(): Promise<Job[]> {
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

/* ── Main server component ── */
export default async function FeaturedJobs() {
  const jobs = await fetchFeaturedJobs();

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-12">
          <h2 className="text-[32px] lg:text-[40px] font-bold text-[#25324B] leading-tight">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline underline-offset-4"
          >
            Show all jobs
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="lg:hidden -mx-6 px-6">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-none">
            {jobs.length > 0
              ? jobs.map((job) => (
                  <div key={job._id} className="snap-start shrink-0 w-[280px]">
                    <JobCard job={job} />
                  </div>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="snap-start shrink-0 w-[280px]">
                    <SkeletonCard />
                  </div>
                ))
            }
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/jobs" className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline underline-offset-4">
              Show all jobs
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden lg:grid grid-cols-4 gap-5">
          {jobs.length > 0
            ? jobs.map((job) => <JobCard key={job._id} job={job} />)
            : Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          }
        </div>

      </div>
    </section>
  );
}
