const applicants = [
  { name: "Lewis S. Cunningham", role: "iOS Developer" },
  { name: "Danny Nelson", role: "Node.js Developer" },
  { name: "Jennifer Patterson", role: "Marketing Manager" },
  { name: "Timothy Watson", role: "iOS Developer" },
];

export default function Applicants() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h3 className="font-semibold mb-4">New Applicants</h3>

      <ul className="space-y-4">
        {applicants.map((a, i) => (
          <li key={i} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{a.name}</p>
              <p className="text-sm text-gray-500">
                Applied for {a.role}
              </p>
            </div>
            <button className="text-indigo-600 text-sm">View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
