import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export const metadata = { title: 'Login — QuickHire' };

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 gap-6">
        <div className="w-16 h-16 rounded-2xl bg-[#F0F4FF] flex items-center justify-center">
          <LogIn size={28} className="text-brand" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#25324B]">Login</h1>
          <p className="text-[#515B6F] mt-2 max-w-md text-base">
            Candidate login is on its way. Want to manage job postings?{' '}
            <Link href="http://localhost:3000/login" target="_blank" className="text-brand font-semibold hover:underline">
              Open the Admin Portal →
            </Link>
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
