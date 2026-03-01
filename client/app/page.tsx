import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import HeroSearch from "@/features/jobs/HeroSearch";
import heroImg from "@/assets/hero.png";
import vodaphoneIconImg from "@/assets/vodaphone.png";
import vodaphoneImg from "@/assets/vodaphone2.png";
import intelImg from "@/assets/intel.png";
import teslaImg from "@/assets/tesla.png";
import amdImg from "@/assets/amd.png";
import talkitImg from "@/assets/talkit.png";
import dashboardImg from "@/assets/dashboard.png";
import FeaturedJobs from "@/features/jobs/FeaturedJobs";
import LatestJobs from "@/features/jobs/LatestJobs";
import NewsletterForm from "@/components/ui/NewsletterForm";

function DesignIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M4 28L12 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M14 6L26 18L20 24L8 12L14 6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M20 6L26 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="6.5" cy="25.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function SalesIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="18" width="5" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="13.5" y="12" width="5" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="23" y="6" width="5" height="22" rx="1" stroke="currentColor" strokeWidth="2"/>
      <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M7.5 9H9V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function MarketingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M8 13H6C4.895 13 4 13.895 4 15V17C4 18.105 4.895 19 6 19H8L15 24V8L8 13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M21 12C22.5 13.3 23.5 14.55 23.5 16C23.5 17.45 22.5 18.7 21 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 9C27.5 11.2 29 13.5 29 16C29 18.5 27.5 20.8 25 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function FinanceIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="9" width="26" height="17" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 15H29" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 21H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 21H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 6H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function TechnologyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M11 10L5 16L11 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 10L27 16L21 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 7L14 25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}
function EngineeringIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M12.5 4L11 8H7L4.5 12L8 14.5L7 16L8 17.5L4.5 20L7 24H11L12.5 28H19.5L21 24H25L27.5 20L24 17.5L25 16L24 14.5L27.5 12L25 8H21L19.5 4H12.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function BusinessIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="13" width="26" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M11 13V10C11 8.343 12.343 7 14 7H18C19.657 7 21 8.343 21 10V13" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 20H29" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="20" r="2" fill="currentColor"/>
    </svg>
  );
}
function HRIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 27C4 22.029 7.582 18 12 18C16.418 18 20 22.029 20 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="22" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M22 18C25.314 18 28 21.134 28 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const categories = [
  { id: 1, name: "Design",         jobCount: 235, iconBg: "bg-[#ECFDF5]", iconColor: "text-[#34D399]", Icon: DesignIcon },
  { id: 2, name: "Sales",          jobCount: 756, iconBg: "bg-[#FFFBEB]", iconColor: "text-[#F59E0B]", Icon: SalesIcon },
  { id: 3, name: "Marketing",      jobCount: 140, iconBg: "bg-[#FFF1F2]", iconColor: "text-[#FB7185]", Icon: MarketingIcon },
  { id: 4, name: "Finance",        jobCount: 325, iconBg: "bg-[#EFF6FF]", iconColor: "text-[#3B82F6]", Icon: FinanceIcon },
  { id: 5, name: "Technology",     jobCount: 436, iconBg: "bg-[#F0F4FF]", iconColor: "text-[#4640DE]", Icon: TechnologyIcon },
  { id: 6, name: "Engineering",    jobCount: 542, iconBg: "bg-[#F0FDFA]", iconColor: "text-[#14B8A6]", Icon: EngineeringIcon },
  { id: 7, name: "Business",       jobCount: 211, iconBg: "bg-[#F5F3FF]", iconColor: "text-[#8B5CF6]", Icon: BusinessIcon },
  { id: 8, name: "Human Resource", jobCount: 346, iconBg: "bg-[#FFF7ED]", iconColor: "text-[#F97316]", Icon: HRIcon },
];

const companies = [
  { name: "Vodafone", src: vodaphoneImg, icon: vodaphoneIconImg },
  { name: "Intel",    src: intelImg },
  { name: "Tesla",    src: teslaImg },
  { name: "AMD",      src: amdImg },
  { name: "Talkit",   src: talkitImg },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-surface overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] pt-12 lg:pt-24 pb-0 flex flex-col lg:flex-row items-center gap-0 lg:gap-0">
          <div className="flex-1 pb-10 lg:pb-28 max-w-[600px] w-full">
            <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-[700] leading-[110%] text-dark" style={{ fontFamily: "var(--font-heading)" }}>
              Discover more than
              <br />
              <span className="relative inline-block text-accent">
                5000+ Jobs
                <svg className="absolute -bottom-3 left-0 w-full" height="10" viewBox="0 0 340 10" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d="M2 7.5 C40 2, 80 9, 120 5.5 C160 2, 200 8.5, 240 5 C280 1.5, 310 7, 338 5" stroke="#26A4FF" strokeWidth="3" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-base lg:text-lg text-muted leading-[160%] max-w-[521px]">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>
            <HeroSearch />
          </div>

          {/* Hero image — hidden on mobile */}
          <div className="hidden lg:flex relative flex-shrink-0 justify-end ml-16 w-auto">
            <div className="relative z-10 mt-auto">
              <Image src={heroImg} alt="Career professional" width={501} height={707} priority className="object-contain"/>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section className="border-y border-border bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] py-8 lg:py-10 flex flex-col gap-6">
          <p className="text-sm text-[#A8ADB7] font-normal">
            Companies we helped grow
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between gap-6">
            {companies.map((c) => (
              <div key={c.name} className="flex items-center gap-2" style={{ filter: "grayscale(1) brightness(0.72)" }}>
                {"icon" in c && c.icon && (
                  <Image src={c.icon} alt="" height={28} width={28} className="h-6 lg:h-7 w-auto object-contain" />
                )}
                <Image src={c.src} alt={c.name} height={28} width={120} className="h-6 lg:h-7 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 lg:mb-12">
            <div>
              <h2 className="text-[28px] lg:text-[40px] font-[700] text-dark leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Explore by <span className="text-[#26A4FF]">category</span>
              </h2>
            </div>
          </div>

          {/* Mobile: single-col list cards */}
          <div className="flex flex-col gap-3 lg:hidden">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="flex items-center gap-4 bg-white border border-border rounded-lg px-5 py-4 hover:border-brand transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cat.iconBg} ${cat.iconColor}`}>
                  <cat.Icon />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-dark">{cat.name}</p>
                  <p className="text-xs text-muted">{cat.jobCount} jobs available</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-muted">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>

          {/* Desktop: 4-col grid */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white border border-border rounded-[4px] p-6 flex flex-col gap-5 hover:bg-[#4640DE] hover:border-[#4640DE] transition-all duration-200"
              >
                <div className={`w-14 h-14 rounded-[4px] flex items-center justify-center transition-all duration-200 ${cat.iconBg} group-hover:bg-white/20 ${cat.iconColor} group-hover:text-white`}>
                  <cat.Icon />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-dark group-hover:text-white transition-colors">{cat.name}</h3>
                  <p className="text-sm text-muted group-hover:text-white/70 transition-colors mt-0.5">{cat.jobCount} jobs available</p>
                </div>
                <div className="flex items-center text-muted group-hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — START POSTING */}
      <section className="px-4 py-10 lg:py-20 lg:px-[124px]">
        <div className="max-w-[1440px] mx-auto">
          <div
            className="relative bg-[#4640DE] overflow-hidden rounded-2xl"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 82%, 96% 100%, 0% 100%)" }}
          >
            {/* Mobile layout — centered text */}
            <div className="lg:hidden flex flex-col items-center text-center px-6 py-14 gap-4">
              <h2 className="text-[32px] font-[700] leading-[110%] text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Start posting jobs today
              </h2>
              <p className="text-sm text-white/70">Start posting jobs for only $10.</p>
              <Link href="/signup" className="mt-2 w-full max-w-[280px] block text-center px-8 py-4 bg-white text-[#4640DE] text-base font-semibold rounded hover:bg-[#f0f0ff] transition-colors">
                Sign Up For Free
              </Link>
              <Image src={dashboardImg} alt="QuickHire admin dashboard preview" width={480} height={320} className="w-full h-auto object-contain mt-4 drop-shadow-2xl" />
            </div>

            {/* Desktop layout — side by side */}
            <div className="hidden lg:block h-[420px]">
              <div className="absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-center pl-[9%] pr-6 w-[46%]">
                <h2 className="text-[52px] font-[600] leading-[110%] text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  Start posting<br />jobs today
                </h2>
                <p className="mt-4 text-base text-white/70">Start posting jobs for only $10.</p>
                <Link href="/signup" className="mt-8 inline-block w-fit px-8 py-4 bg-white text-[#4640DE] text-base font-semibold rounded hover:bg-[#f0f0ff] transition-colors">
                  Sign Up For Free
                </Link>
              </div>
              <div className="absolute right-[2%] top-24 w-[46%]">
                <Image src={dashboardImg} alt="QuickHire admin dashboard preview" width={580} height={390} className="w-full h-auto object-contain drop-shadow-2xl" />
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-[-60px] left-[-20px] w-[240px] h-[240px] rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute bottom-[-80px] left-[220px] w-[300px] h-[300px] rounded-full bg-white/5 pointer-events-none" />
          </div>
        </div>
      </section>

      <FeaturedJobs />

      <LatestJobs />

      {/* FOOTER */}
      <footer className="bg-[#202430] text-white">
        {/* Main footer content */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] pt-16 pb-12">
          {/* Desktop grid */}
          <div className="hidden lg:grid lg:grid-cols-[2fr_1fr_1fr_2fr] gap-12">
            {/* Col 1 — Brand */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
                  <rect width="32" height="32" rx="8" fill="#4F46E5" />
                  <path d="M18.5 5L10.5 18H15.5L13.5 27L21.5 14H16.5Z" fill="white" />
                </svg>
                <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>QuickHire</span>
              </div>
              <p className="text-sm text-[#9199A3] leading-relaxed max-w-[260px]">
                Great platform for the job seeker that passionate about startups. Find your dream job easier.
              </p>
            </div>
            {/* Col 2 — About */}
            <div className="flex flex-col gap-5">
              <h4 className="text-base font-semibold text-white">About</h4>
              <ul className="flex flex-col gap-4">
                {["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"].map((item) => (
                  <li key={item}><Link href="#" className="text-sm text-[#9199A3] hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            {/* Col 3 — Resources */}
            <div className="flex flex-col gap-5">
              <h4 className="text-base font-semibold text-white">Resources</h4>
              <ul className="flex flex-col gap-4">
                {["Help Docs", "Guide", "Updates", "Contact Us"].map((item) => (
                  <li key={item}><Link href="#" className="text-sm text-[#9199A3] hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            {/* Col 4 — Newsletter */}
            <div className="flex flex-col gap-5">
              <h4 className="text-base font-semibold text-white">Get job notifications</h4>
              <p className="text-sm text-[#9199A3] leading-relaxed">The latest job news, articles, sent to your inbox weekly.</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col gap-10 lg:hidden">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
                  <rect width="32" height="32" rx="8" fill="#4F46E5" />
                  <path d="M18.5 5L10.5 18H15.5L13.5 27L21.5 14H16.5Z" fill="white" />
                </svg>
                <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>QuickHire</span>
              </div>
              <p className="text-sm text-[#9199A3] leading-relaxed max-w-[300px]">
                Great platform for the job seeker that passionate about startups. Find your dream job easier.
              </p>
            </div>

            {/* About + Resources — side by side */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <h4 className="text-base font-semibold text-white">About</h4>
                <ul className="flex flex-col gap-3">
                  {["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"].map((item) => (
                    <li key={item}><Link href="#" className="text-sm text-[#9199A3] hover:text-white transition-colors">{item}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-base font-semibold text-white">Resources</h4>
                <ul className="flex flex-col gap-3">
                  {["Help Docs", "Guide", "Updates", "Contact Us"].map((item) => (
                    <li key={item}><Link href="#" className="text-sm text-[#9199A3] hover:text-white transition-colors">{item}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-4">
              <h4 className="text-base font-semibold text-white">Get job notifications</h4>
              <p className="text-sm text-[#9199A3] leading-relaxed">The latest job news, articles, sent to your inbox weekly.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">
          <div className="h-px bg-[#2D3748]" />
        </div>

        {/* Bottom bar */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9199A3]">2026 @ QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#2D3748] hover:bg-[#4640DE] flex items-center justify-center transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#2D3748] hover:bg-[#4640DE] flex items-center justify-center transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
              </svg>
            </a>
            <a href="#" aria-label="Dribbble" className="w-9 h-9 rounded-full bg-[#2D3748] hover:bg-[#4640DE] flex items-center justify-center transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#2D3748] hover:bg-[#4640DE] flex items-center justify-center transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-[#2D3748] hover:bg-[#4640DE] flex items-center justify-center transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
