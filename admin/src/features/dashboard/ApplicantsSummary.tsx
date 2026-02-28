interface TypeCount {
  label: string;
  count: number;
  color: string;
}

interface Props {
  total: number;
  breakdown: TypeCount[];
}

export default function ApplicantsSummary({ total, breakdown }: Props) {
  const sum = breakdown.reduce((s, b) => s + b.count, 0) || 1;

  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Applicants Summary</h3>
      <div>
        <p className="text-5xl font-extrabold text-gray-900">{total}</p>
        <p className="text-sm text-gray-400 mt-1">Applicants</p>
      </div>

      <div className="flex h-2 rounded-full overflow-hidden mt-5 gap-0.5">
        {breakdown.map((b) => (
          <div
            key={b.label}
            className={`${b.color} rounded-full`}
            style={{ width: `${Math.round((b.count / sum) * 100)}%` }}
          />
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {breakdown.map((b) => (
          <div key={b.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <span className={`w-2 h-2 rounded-full ${b.color} inline-block`} />
              {b.label}
            </span>
            <span className="font-semibold text-gray-800">{b.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
