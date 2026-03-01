'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASS = 'admin';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  // Already logged in → skip to dashboard
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('qh_admin_auth')) {
      router.replace('/dashboard');
    }
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Small fake delay so it feels real
    await new Promise((r) => setTimeout(r, 500));

    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASS) {
      localStorage.setItem('qh_admin_auth', '1');
      router.push('/dashboard');
    } else {
      setError('Invalid email or password. Use the credentials shown above.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">

        {/* Logo + brand */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <svg width="52" height="52" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#4F46E5" />
            <path d="M18.5 5L10.5 18H15.5L13.5 27L21.5 14H16.5Z" fill="white" />
          </svg>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Quick<span className="text-indigo-600">Hire</span>
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Admin Portal</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Sign in to your account</h2>
          <p className="text-sm text-gray-500 mb-6">
            Use the demo credentials below to log in.
          </p>

          {/* Credential hint */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-6 text-sm">
            <p className="text-indigo-700 font-medium mb-1">Demo credentials</p>
            <p className="text-indigo-600">Email: <span className="font-mono font-semibold">admin@gmail.com</span></p>
            <p className="text-indigo-600">Password: <span className="font-mono font-semibold">admin</span></p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          QuickHire Admin — for internal use only
        </p>
      </div>
    </div>
  );
}
