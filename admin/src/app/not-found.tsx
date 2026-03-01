import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <rect width="36" height="36" rx="9" fill="#4640DE" />
          <path d="M21 5L12 20H18L15 30L24 16H18Z" fill="white" />
        </svg>
      </div>
      <div>
        <p className="text-6xl font-black text-indigo-600 mb-2">404</p>
        <h1 className="text-xl font-bold text-gray-900">Page not found</h1>
        <p className="text-gray-500 mt-1.5 max-w-xs text-sm">
          This admin page doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
