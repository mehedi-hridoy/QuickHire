import { INPUT_CLASS, JOB_CATEGORIES, JOB_LOCATIONS } from '@/lib/constants';

interface Filters {
  search: string;
  location: string;
  category: string;
  from: string;
  to: string;
  sort: string;
}

interface Props {
  value: Filters;
  onChange: (next: Filters) => void;
}

const ALL_LOCATIONS: { label: string; value: string }[] = [
  { label: 'All Locations', value: '' },
  ...JOB_LOCATIONS.map((l) => ({ label: l, value: l })),
];

const ALL_CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Categories', value: '' },
  ...JOB_CATEGORIES.map((c) => ({ label: c, value: c })),
];

export default function JobsFilters({ value, onChange }: Props) {
  const set = (field: keyof Filters) => (v: string) => onChange({ ...value, [field]: v });

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-6 gap-3">
      <input
        className={INPUT_CLASS}
        placeholder="Search job title"
        value={value.search}
        onChange={(e) => set('search')(e.target.value)}
      />
      <select className={INPUT_CLASS} value={value.location} onChange={(e) => set('location')(e.target.value)}>
        {ALL_LOCATIONS.map((l) => (
          <option key={l.value} value={l.value}>{l.label}</option>
        ))}
      </select>
      <select className={INPUT_CLASS} value={value.category} onChange={(e) => set('category')(e.target.value)}>
        {ALL_CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
      <select className={INPUT_CLASS} value={value.sort} onChange={(e) => set('sort')(e.target.value)}>
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
      <input type="date" className={INPUT_CLASS} value={value.from} onChange={(e) => set('from')(e.target.value)} />
      <input type="date" className={INPUT_CLASS} value={value.to} onChange={(e) => set('to')(e.target.value)} />
    </div>
  );
}
