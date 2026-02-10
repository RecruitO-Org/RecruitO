export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">
        impozitions
      </h1>

      <ul className="space-y-4 text-gray-600">
        <li className="font-semibold text-indigo-600">Dashboard</li>
        <li>Recruitment</li>
        <li>Onboarding</li>
        <li>Recruitment Tasks</li>
        <li>Calendar</li>
        <li>Settings</li>
      </ul>

      <div className="mt-10 p-4 bg-indigo-50 rounded-xl text-center">
        <p className="text-sm font-medium">Support 24/7</p>
        <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Start chat
        </button>
      </div>
    </div>
  );
}
