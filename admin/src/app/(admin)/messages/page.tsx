import { MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
        <MessageSquare size={28} className="text-indigo-500" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-1.5 max-w-xs">
          Your inbox is empty right now. Candidate messages will appear here.
        </p>
      </div>
      <span className="px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full tracking-wide uppercase">
        Coming soon
      </span>
    </div>
  );
}
