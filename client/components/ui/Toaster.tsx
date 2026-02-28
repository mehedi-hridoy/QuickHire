'use client';

import { useEffect, useState } from 'react';
import { toast } from '@/lib/toast';

type ToastType = 'success' | 'error' | 'info';

interface Item {
  id: number;
  msg: string;
  type: ToastType;
  exiting: boolean;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3.5 9.5L7 13L14.5 5.5" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 5L13 13M13 5L5 13" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="#3B82F6" strokeWidth="1.5"/>
      <path d="M9 8.5V12.5M9 6.5V6" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const STYLE: Record<ToastType, { accent: string; iconBg: string; label: string; labelText: string }> = {
  success: { accent: 'border-l-4 border-emerald-500', iconBg: 'bg-emerald-100', label: 'Success!',   labelText: 'text-emerald-700' },
  error:   { accent: 'border-l-4 border-red-500',     iconBg: 'bg-red-100',     label: 'Error',      labelText: 'text-red-700'     },
  info:    { accent: 'border-l-4 border-blue-500',    iconBg: 'bg-blue-100',    label: 'Notice',     labelText: 'text-blue-700'    },
};

export default function Toaster() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    return toast._on((msg, type) => {
      const id = Date.now();
      setItems(prev => [...prev, { id, msg, type, exiting: false }]);
      // Start exit animation after 3.5s, remove after 3.85s
      setTimeout(() => setItems(prev => prev.map(i => i.id === id ? { ...i, exiting: true } : i)), 3500);
      setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), 3850);
    });
  }, []);

  if (!items.length) return null;

  return (
    <div
      className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {items.map(item => {
        const s = STYLE[item.type];
        return (
          <div
            key={item.id}
            style={{ transition: 'opacity 350ms ease, transform 350ms ease' }}
            className={`
              pointer-events-auto flex items-start gap-3 min-w-[320px] max-w-[400px]
              bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.13)] px-5 py-4
              ${s.accent}
              ${item.exiting ? 'opacity-0 translate-x-3' : 'opacity-100 translate-x-0'}
            `}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${s.iconBg}`}>
              {ICONS[item.type]}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className={`text-sm font-bold ${s.labelText}`}>{s.label}</p>
              <p className="text-sm text-gray-600 mt-0.5 leading-snug">{item.msg}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
