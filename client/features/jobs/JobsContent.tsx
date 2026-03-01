'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Briefcase, X } from 'lucide-react';
import JobLogoImage from '@/components/ui/JobLogoImage';
import type { Job } from '@/types/job';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

const JOB_TYPES = ['Full Time', 'Part Time', 'Remote', 'Internship', 'Contract'];

const TAG_STYLES: Record<string, string> = {
  design:           'border border-[#7B61FF] text-[#7B61FF]',
  marketing:        'border border-[#FFB836] text-[#FFB836]',
  business:         'border border-[#4640DE] text-[#4640DE]',
  technology:       'border border-[#4640DE] text-[#4640DE]',
  engineering:      'border border-[#56CDAD] text-[#56CDAD]',
  finance:          'border border-[#3B82F6] text-[#3B82F6]',
  sales:            'border border-[#FFB836] text-[#FFB836]',
  'human resource': 'border border-[#FF6B35] text-[#FF6B35]',
  product:          'border border-[#4640DE] text-[#4640DE]',
};
function tagClass(tag: string) {
  return TAG_STYLES[tag.toLowerCase()] ?? 'border border-[#7B61FF] text-[#7B61FF]';
}

/* ── Single job card ── */
function JobCard({ job }: { job: Job }) {
  const logoSrc = job.logo ? `${API_BASE}${job.logo}` : null;
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group bg-white rounded-2xl p-5 flex items-start gap-4 hover:shadow-[0_8px_30px_rgba(70,64,222,0.10)] transition-all duration-200 border border-transparent hover:border-[#E9EBFD]"
    >
      <div className="shrink-0 w-[64px] h-[64px] rounded-xl overflow-hidden border border-[#F0F0F0] bg-[#FAFAFA] flex items-center justify-center">
        <JobLogoImage src={logoSrc} alt={`${job.company} logo`} company={job.company} size={64} className="rounded-xl" />
      </div>
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <h3 className="text-base font-bold text-[#25324B] group-hover:text-brand transition-colors truncate">{job.title}</h3>
        <p className="text-sm text-[#515B6F]">
          {job.company}
          <span className="mx-2 text-[#D6DDEB]">•</span>
          {job.location}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F9F5] text-[#56CDAD]">{job.type}</span>
          {(job.tags ?? []).slice(0, 2).map((tag) => (
            <span key={tag} className={`px-3 py-1 rounded-full text-xs font-semibold ${tagClass(tag)}`}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ── Empty state ── */
function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-[#F0F4FF] flex items-center justify-center">
        <Briefcase size={28} className="text-brand" />
      </div>
      <div>
        <p className="text-lg font-bold text-[#25324B]">No jobs found</p>
        <p className="text-sm text-[#515B6F] mt-1 max-w-xs">
          {query
            ? `We couldn't find any jobs matching "${query}". Try a different search.`
            : 'No jobs are currently listed. Check back soon!'}
        </p>
      </div>
      <Link href="/" className="text-sm font-semibold text-brand hover:underline">← Back to home</Link>
    </div>
  );
}

/* ── Main jobs listing ── */
export default function JobsContent() {
  const searchParams  = useSearchParams();
  const router        = useRouter();

  const [allJobs, setAllJobs]   = useState<Job[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState(searchParams.get('search') ?? '');
  const [location, setLocation] = useState(searchParams.get('location') ?? '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') ?? '');

  /* Fetch all jobs once */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/jobs`);
        const json = await res.json();
        const payload = Array.isArray(json) ? json : json.data ?? json.jobs ?? [];
        setAllJobs(Array.isArray(payload) ? payload : []);
      } catch {
        setAllJobs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* Sync filters to URL */
  const syncURL = useCallback((s: string, l: string, t: string) => {
    const params = new URLSearchParams();
    if (s) params.set('search', s);
    if (l) params.set('location', l);
    if (t) params.set('type', t);
    router.replace(`/jobs${params.toString() ? `?${params}` : ''}`, { scroll: false });
  }, [router]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    syncURL(search, location, typeFilter);
  }

  function handleTypeToggle(t: string) {
    const next = typeFilter === t ? '' : t;
    setTypeFilter(next);
    syncURL(search, location, next);
  }

  function clearAll() {
    setSearch(''); setLocation(''); setTypeFilter('');
    router.replace('/jobs', { scroll: false });
  }

  /* Filter client-side */
  const filtered = allJobs.filter((job) => {
    const q = search.toLowerCase();
    const matchSearch = !q || job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || (job.category ?? '').toLowerCase().includes(q);
    const matchLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchType = !typeFilter || job.type === typeFilter;
    return matchSearch && matchLocation && matchType;
  });

  const hasFilters = search || location || typeFilter;

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] py-10">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#25324B]">Browse Jobs</h1>
        <p className="text-[#515B6F] mt-1">
          {loading ? 'Loading…' : `${filtered.length} job${filtered.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-[#E9EBFD] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-0 mb-6 overflow-hidden">
        {/* Title search */}
        <label className="flex items-center gap-2.5 px-4 py-3.5 flex-1 border-b sm:border-b-0 sm:border-r border-[#E9EBFD]">
          <Search size={18} className="text-[#4640DE] shrink-0" />
          <input
            type="text"
            placeholder="Job title or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm text-[#25324B] placeholder-[#A8B3C5] outline-none bg-transparent"
          />
        </label>
        {/* Location */}
        <label className="flex items-center gap-2.5 px-4 py-3.5 flex-1 border-b sm:border-b-0 sm:border-r border-[#E9EBFD]">
          <MapPin size={18} className="text-[#4640DE] shrink-0" />
          <input
            type="text"
            placeholder="City or country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 text-sm text-[#25324B] placeholder-[#A8B3C5] outline-none bg-transparent"
          />
        </label>
        <button type="submit" className="px-6 py-3.5 bg-brand text-white text-sm font-semibold hover:bg-[#3730c4] transition-colors shrink-0">
          Search
        </button>
      </form>

      {/* Type filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {JOB_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => handleTypeToggle(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              typeFilter === t
                ? 'bg-brand text-white border-brand'
                : 'bg-white text-[#515B6F] border-[#D6DDEB] hover:border-brand hover:text-brand'
            }`}
          >
            {t}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-300 transition-colors bg-white"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 h-28 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState query={search} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((job) => <JobCard key={job._id} job={job} />)}
        </div>
      )}
    </div>
  );
}
