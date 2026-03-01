"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  Users,
  Briefcase,
  CalendarDays,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const mainNav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Messages', href: '/messages', icon: MessageSquare, badge: 1 },
  { label: 'Company Profile', href: '/company', icon: Building2 },
  { label: 'All Applicants', href: '/applications', icon: Users },
  { label: 'Job Listing', href: '/jobs', icon: Briefcase },
  { label: 'My Schedule', href: '/schedule', icon: CalendarDays },
];

const settingsNav = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Help Center', href: '/help', icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="w-60 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col">
      <div className="px-5 py-6 flex items-center gap-2.5">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
          <rect width="32" height="32" rx="8" fill="#4F46E5" />
          <path d="M18.5 5L10.5 18H15.5L13.5 27L21.5 14H16.5Z" fill="white" />
        </svg>
        <span className="text-lg font-bold text-gray-900 tracking-tight">
          Quick<span className="text-indigo-600">Hire</span>
        </span>
      </div>

      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="space-y-0.5">
          {mainNav.map(({ label, href, icon: Icon, badge }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} />
                  {label}
                </span>
                {badge ? (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      active ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-600'
                    }`}
                  >
                    {badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="mt-6">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Settings
          </p>
          <div className="space-y-0.5">
            {settingsNav.map(({ label, href, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3">
        <button
          onClick={() => {
            localStorage.removeItem('qh_admin_auth');
            window.location.href = '/login';
          }}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
