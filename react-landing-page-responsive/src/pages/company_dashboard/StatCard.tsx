export default function StatCard({ title, count, percent }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm w-full">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-2xl font-bold">{count}</span>
        <span className="text-sm text-indigo-600">{percent}%</span>
      </div>
    </div>
  );
}
