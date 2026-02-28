"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const POPULAR_TAGS = ["UI Designer", "UX Researcher", "Android", "Admin"];

const LOCATIONS = [
  "Florence, Italy",
  "New York, USA",
  "London, UK",
  "Berlin, Germany",
  "Toronto, Canada",
  "Remote",
];

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="7" stroke="#7C8493" strokeWidth="1.6" />
      <path
        d="M14.5 14.5L18 18"
        stroke="#7C8493"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 18 7 18C7 18 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z"
        fill="#7C8493"
      />
    </svg>
  );
}

export default function HeroSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Florence, Italy");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/jobs?search=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="mt-8 md:mt-10 w-full">
      {/* ── Search form ── */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-stretch bg-white rounded shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-2 gap-2 sm:gap-0"
      >
        {/* Keyword input */}
        <div className="flex items-center gap-3 flex-1 px-4 py-3">
          <SearchIcon />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title or keyword"
            className="flex-1 text-base text-dark placeholder:text-subtle outline-none bg-transparent min-w-0"
          />
        </div>

        {/* Vertical divider (desktop) */}
        <div className="hidden sm:block w-px bg-border self-center h-8 shrink-0" />

        {/* Location selector */}
        <div className="flex items-center gap-3 px-4 py-3 shrink-0">
          <LocationPinIcon />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-base text-dark outline-none bg-transparent cursor-pointer"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="sm:ml-2 px-6 py-4 bg-brand text-white text-base font-semibold rounded hover:bg-[#3730c4] active:bg-[#2e29a8] transition-colors whitespace-nowrap cursor-pointer"
        >
          Search my job
        </button>
      </form>

      {/* ── Popular tags ── */}
      <div className="flex flex-wrap items-center gap-3 mt-5">
        <span className="text-sm font-medium text-muted">Popular:</span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className="px-4 py-1.5 border border-border rounded-full text-sm text-dark hover:border-brand hover:text-brand transition-colors cursor-pointer bg-transparent"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
