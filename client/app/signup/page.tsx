import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

export const metadata = { title: 'Sign Up — QuickHire' };

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 gap-6">
        <div className="w-16 h-16 rounded-2xl bg-[#F0F4FF] flex items-center justify-center">
          <UserPlus size={28} className="text-brand" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#25324B]">Create Account</h1>
          <p className="text-[#515B6F] mt-2 max-w-md text-base">
            Candidate registration is on its way. You&apos;ll be able to build a profile, save jobs, and track your applications.
          </p>
        </div>
        <span className="px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full tracking-wide uppercase">
          Coming soon
        </span>
        <Link href="/" className="text-sm font-semibold text-brand hover:underline mt-2">
          ← Back to home
        </Link>
      </main>
    </>
  );
}
