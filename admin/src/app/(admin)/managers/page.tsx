import TopBar from '@/components/admin/TopBar';

const managers = [
  { name: 'Marlin Ros', role: 'Super Admin', email: 'marlin@quickhire.com' },
  { name: 'Samantha Lee', role: 'Content Manager', email: 'samantha@quickhire.com' },
  { name: 'Michael Chen', role: 'Recruiter', email: 'michael@quickhire.com' },
];

export default function ManagersPage() {
  return (
    <div>
      <TopBar title="Managers" />
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left font-medium px-4 py-3">Name</th>
              <th className="text-left font-medium px-4 py-3">Role</th>
              <th className="text-left font-medium px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((m) => (
              <tr key={m.email} className="border-t border-gray-100">
                <td className="px-4 py-3 text-gray-900">{m.name}</td>
                <td className="px-4 py-3 text-gray-500">{m.role}</td>
                <td className="px-4 py-3 text-gray-500">{m.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
