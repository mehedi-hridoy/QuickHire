import type { Application } from '@/types/application';

export default function ApplicationTable({ items }: { items: Application[] }) {
  if (!items.length)
    return <div className="text-center py-20 text-gray-400 text-sm">No applications yet</div>;

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="text-left font-medium px-4 py-3">Applicant</th>
            <th className="text-left font-medium px-4 py-3">Job</th>
            <th className="text-left font-medium px-4 py-3">Email</th>
            <th className="text-left font-medium px-4 py-3">Resume</th>
            <th className="text-left font-medium px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a._id} className="border-t border-gray-100">
              <td className="px-4 py-3 text-gray-900">{a.name}</td>
              <td className="px-4 py-3 text-gray-500">{a.jobTitle ?? '-'}</td>
              <td className="px-4 py-3 text-gray-500">{a.email}</td>
              <td className="px-4 py-3">
                <a className="text-blue-600 hover:underline" href={a.resumeLink} target="_blank" rel="noreferrer">
                  Open
                </a>
              </td>
              <td className="px-4 py-3 text-gray-400">{a.createdAt.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
