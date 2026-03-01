"use client";

import Link from "next/link";
import { useState } from "react";

function QuickHireLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="9" fill="#4640DE" />
      {/* Lightning bolt — represents "Quick" */}
      <path d="M21 5L12 20H18L15 30L24 16H18Z" fill="white" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] h-20 flex items-center justify-between gap-6">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <QuickHireLogo />
          <span
            className="text-xl font-semibold text-dark tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            QuickHire
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/jobs"
            className="text-base font-medium text-muted hover:text-brand transition-colors"
          >
            Find Jobs
          </Link>
          <Link
            href="/companies"
            className="text-base font-medium text-muted hover:text-brand transition-colors"
          >
            Browse Companies
          </Link>
        </nav>

        {/* ── Desktop auth ── */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <Link
            href="/login"
            className="text-base font-semibold text-dark hover:text-brand transition-colors px-2"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-5 py-3 bg-brand text-white text-base font-semibold rounded hover:bg-[#3730c4] transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-dark transition-all duration-200 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-dark transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-dark transition-all duration-200 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-5 flex flex-col gap-3 shadow-lg">
          <Link
            href="/jobs"
            className="text-base font-medium text-muted py-2 hover:text-brand transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Find Jobs
          </Link>
          <Link
            href="/companies"
            className="text-base font-medium text-muted py-2 hover:text-brand transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Browse Companies
          </Link>
          <hr className="border-border my-1" />
          <Link
            href="/login"
            className="text-base font-semibold text-dark py-2 hover:text-brand transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="mt-1 px-5 py-3 bg-brand text-white text-base font-semibold rounded text-center hover:bg-[#3730c4] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
