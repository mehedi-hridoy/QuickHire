interface Props {
  count: number;
  loading: boolean;
  onNew: () => void;
}

export default function JobsHeader({ count, loading, onNew }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Job Listing</h2>
        <p className="text-sm text-gray-400 mt-1">
          {loading ? '...' : `${count} job${count !== 1 ? 's' : ''} posted`}
        </p>
      </div>
      <button
        onClick={onNew}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        + Post Job
      </button>
    </div>
  );
}
