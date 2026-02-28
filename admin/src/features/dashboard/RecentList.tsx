interface Item {
  title: string;
  subtitle: string;
  date: string;
}

interface Props {
  title: string;
  items: Item[];
}

export default function RecentList({ title, items }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {items.length ? (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={`${item.title}-${item.date}`} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-400">{item.subtitle}</p>
              </div>
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400">No data</p>
      )}
    </div>
  );
}
