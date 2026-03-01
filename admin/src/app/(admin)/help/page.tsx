import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    { q: 'How do I post a new job?', a: 'Click the "Post a job" button in the top bar, fill in the job details, and publish.' },
    { q: 'How do I review applications?', a: 'Navigate to All Applicants in the sidebar to see every candidate who applied.' },
    { q: 'Can I edit a job after posting?', a: 'Yes — open Job Listing, click the edit icon next to any job, update, and save.' },
    { q: 'How do I delete an application?', a: 'In All Applicants, click the trash icon on the row you want to remove.' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
          <HelpCircle size={24} className="text-indigo-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
          <p className="text-sm text-gray-500 mt-0.5">Frequently asked questions</p>
        </div>
      </div>

      {/* FAQ list */}
      <div className="flex flex-col gap-4">
        {faqs.map(({ q, a }) => (
          <div key={q} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
            <p className="font-semibold text-gray-900 text-sm mb-1">{q}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-indigo-50 rounded-xl text-center">
        <p className="text-sm text-indigo-700 font-medium">Need more help?</p>
        <p className="text-xs text-indigo-600 mt-1">More documentation is coming soon.</p>
      </div>
    </div>
  );
}
