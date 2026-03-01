import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 gap-6">

        {/* Big brand 404 */}
        <div className="relative select-none">
          <p className="text-[9rem] font-black leading-none text-[#F0F4FF]">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="64" height="64" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#4F46E5" />
              <path d="M18.5 5L10.5 18H15.5L13.5 27L21.5 14H16.5Z" fill="white" />
            </svg>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#25324B]">Oops — page not found</h1>
          <p className="text-[#515B6F] mt-2 max-w-sm text-base">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href="/"
            className="px-6 py-3 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-[#3730c4] transition-colors"
          >
            ← Back to home
          </Link>
          <Link
            href="/jobs"
            className="px-6 py-3 bg-white text-[#25324B] text-sm font-semibold rounded-lg border border-[#D6DDEB] hover:border-brand hover:text-brand transition-colors"
          >
            Browse jobs
          </Link>
        </div>
      </main>
    </>
  );
}
