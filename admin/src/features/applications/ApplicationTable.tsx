'use client';

import { useState } from 'react';
import type { Application } from '@/types/application';

interface Props {
  items: Application[];
  onDelete: (id: string) => void;
}

function CoverNoteModal({ note, onClose }: { note: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Cover Note</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{note}</p>
      </div>
    </div>
  );
}

export default function ApplicationTable({ items, onDelete }: Props) {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this application?')) return;
    setDeletingId(id);
    try { await onDelete(id); } finally { setDeletingId(null); }
  };

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-40">
          <rect x="8" y="14" width="32" height="26" rx="3" stroke="#9CA3AF" strokeWidth="2"/>
          <path d="M16 14V11a2 2 0 012-2h12a2 2 0 012 2v3M20 24h8M20 30h5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className="text-sm font-medium">No applications yet</p>
        <p className="text-xs">Applications submitted by job seekers will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{items.length}</span> application{items.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Applicant', 'Applied For', 'Email', 'Resume', 'Cover Note', 'Date', ''].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-indigo-600">{a.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="font-medium text-gray-900">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">{a.jobTitle ?? '—'}</p>
                    {a.company && <p className="text-xs text-gray-400 mt-0.5">{a.company}</p>}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{a.email}</td>
                  <td className="px-5 py-4">
                    <a href={a.resumeLink} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 11L11 2M11 2H6M11 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Open
                    </a>
                  </td>
                  <td className="px-5 py-4">
                    {a.coverNote ? (
                      <button onClick={() => setSelectedNote(a.coverNote)}
                        className="text-xs text-gray-500 hover:text-indigo-600 max-w-[160px] truncate block transition-colors"
                        title="Click to read">
                        {a.coverNote}
                      </button>
                    ) : <span className="text-xs text-gray-300">—</span>}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleDelete(a._id)} disabled={deletingId === a._id}
                      className="text-gray-300 hover:text-red-500 transition-colors disabled:opacity-40" title="Delete">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M2 4h11M5 4V2.5h5V4M6 7v4M9 7v4M3 4l.8 9h7.4L12 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedNote && <CoverNoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />}
    </>
  );
}
