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
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <Briefcase size={16} className="text-white" />
        </div>
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
    </aside>
  );
}
