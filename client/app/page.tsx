import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import HeroSearch from "@/features/jobs/HeroSearch";
import heroImg from "@/assets/hero.png";
import vodaphoneImg from "@/assets/vodaphone.png";
import intelImg from "@/assets/intel.png";
import teslaImg from "@/assets/tesla.png";
import amdImg from "@/assets/amd.png";
import talkitImg from "@/assets/talkit.png";
import dashboardImg from "@/assets/dashboard.png";

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
  { name: "Vodafone", src: vodaphoneImg },
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
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] pt-16 lg:pt-24 pb-0 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-0">
          <div className="flex-1 pb-20 lg:pb-28 max-w-[600px]">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-brand" />
              <span className="text-sm font-semibold text-brand tracking-widest uppercase">No. 1 Job Hunt Website</span>
            </div>
            <h1 className="text-[48px] sm:text-[60px] lg:text-[72px] font-[600] leading-[110%] text-dark" style={{ fontFamily: "var(--font-heading)" }}>
              Discover more than
              <br />
              <span className="relative inline-block text-accent">
                5000+ Jobs
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 240 6" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d="M0 4 Q30 0.5 60 4 Q90 7.5 120 4 Q150 0.5 180 4 Q210 7.5 240 4" stroke="#26A4FF" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="mt-8 text-lg text-muted leading-[160%] max-w-[521px]">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>
            <HeroSearch />
          </div>

          <div className="relative flex-shrink-0 flex justify-center lg:justify-end lg:ml-16 w-full lg:w-auto">
            <div className="absolute bottom-0 right-0 w-[420px] lg:w-[480px] h-[520px] lg:h-[640px] bg-[#E9EBFD] rounded-t-[160px] rounded-b-none" />
            <div className="relative z-10 mt-auto">
              <Image src={heroImg} alt="Career professional" width={501} height={707} priority className="object-contain max-h-[580px] lg:max-h-none"/>
            </div>
            <div className="absolute top-10 left-0 lg:-left-6 z-20 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F0F4FF] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="5" width="16" height="12" rx="2" stroke="#4640DE" strokeWidth="1.6"/>
                  <path d="M7 5V4a3 3 0 016 0v1" stroke="#4640DE" strokeWidth="1.6"/>
                  <path d="M2 10h16" stroke="#4640DE" strokeWidth="1.6"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-subtle font-medium">Live jobs</p>
                <p className="text-lg font-bold text-dark" style={{ fontFamily: "var(--font-heading)" }}>5,000+</p>
              </div>
            </div>
            <div className="absolute bottom-24 right-4 lg:-right-4 z-20 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 17V8l8-5 8 5v9" stroke="#34D399" strokeWidth="1.6" strokeLinejoin="round"/>
                  <rect x="7" y="12" width="6" height="5" rx="1" stroke="#34D399" strokeWidth="1.6"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-subtle font-medium">Companies</p>
                <p className="text-lg font-bold text-dark" style={{ fontFamily: "var(--font-heading)" }}>2,000+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section className="border-y border-border bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] py-10 flex flex-col md:flex-row items-center gap-8">
          <p className="text-sm font-semibold text-muted whitespace-nowrap shrink-0 uppercase tracking-wider">
            Companies we helped grow
          </p>
          <div className="w-px h-10 bg-border hidden md:block shrink-0" />
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-10 md:gap-14">
            {companies.map((c) => (
              <div key={c.name} className="opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                <Image src={c.src} alt={c.name} height={32} width={120} className="h-8 w-auto object-contain"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-[36px] lg:text-[40px] font-[600] text-dark leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Explore by <span className="text-brand">category</span>
              </h2>
              <p className="mt-3 text-base text-muted max-w-[480px]">
                Find the job that perfectly matches your passion and skill set.
              </p>
            </div>
            <a href="/jobs" className="shrink-0 flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline underline-offset-4">
              Show all jobs
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white border border-border rounded-[4px] p-6 flex flex-col gap-5 hover:bg-[#4640DE] hover:border-[#4640DE] transition-all duration-200"
              >
                <div className={`w-14 h-14 rounded-[4px] flex items-center justify-center transition-all duration-200 ${cat.iconBg} group-hover:bg-white/20 ${cat.iconColor} group-hover:text-white`}>
                  <cat.Icon />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-dark group-hover:text-white transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted group-hover:text-white/70 transition-colors mt-0.5">
                    {cat.jobCount} jobs available
                  </p>
                </div>
                <div className="flex items-center text-muted group-hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — START POSTING */}
      <section className="py-20 lg:pt-28 lg:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px]">
          {/* clip-path creates the diagonal top-left & bottom-left corner cuts */}
          <div
            className="relative bg-[#4640DE] h-[380px] lg:h-[420px]"
            style={{
              clipPath:
                "polygon(4% 0%, 100% 0%, 100% 82%, 96% 100%, 0% 100%, 0% 0%)",
            }}
          >
            {/* Left copy — vertically centered */}
            <div className="absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-center pl-[9%] pr-6 w-[46%]">
              <h2
                className="text-[38px] lg:text-[52px] font-[600] leading-[110%] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Start posting<br />jobs today
              </h2>
              <p className="mt-4 text-base text-white/70">
                Start posting jobs for only $10.
              </p>
              <a
                href="/signup"
                className="mt-8 inline-block w-fit px-8 py-4 bg-white text-[#4640DE] text-base font-semibold rounded hover:bg-[#f0f0ff] transition-colors"
              >
                Sign Up For Free
              </a>
            </div>

            {/* Dashboard image — smaller, pushed down and left */}
            <div className="absolute right-[2%] top-24 w-[46%]">
              <Image
                src={dashboardImg}
                alt="QuickHire admin dashboard preview"
                width={580}
                height={390}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Decorative circles */}
            <div className="absolute top-[-60px] left-[-20px] w-[240px] h-[240px] rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute bottom-[-80px] left-[220px] w-[300px] h-[300px] rounded-full bg-white/5 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[124px] py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
              <circle cx="17" cy="17" r="17" fill="#4640DE"/>
              <circle cx="15.5" cy="15.5" r="6" stroke="white" strokeWidth="2.4"/>
              <path d="M20 20L24.5 24.5" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
            <span className="font-semibold text-dark" style={{ fontFamily: "var(--font-heading)" }}>QuickHire</span>
          </div>
          <p className="text-sm text-subtle text-center">\u00a9 2026 QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-subtle hover:text-dark transition-colors">Privacy</a>
            <a href="/terms" className="text-sm text-subtle hover:text-dark transition-colors">Terms</a>
            <a href="/contact" className="text-sm text-subtle hover:text-dark transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
