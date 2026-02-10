import Sidebar from "./Sidebar";

import StatCard from "./StatCard";
import Applicants from "./Applicants";
export default function CompanyDashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Greeting */}
        <div className="bg-indigo-600 text-white p-6 rounded-xl flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Hello Katie!</h2>
            <p>You have 16 new applications today.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          <StatCard title="Content Designers" count="3" percent="75" />
          <StatCard title="Node.js Developers" count="9" percent="25" />
          <StatCard title="Senior UI Designer" count="1" percent="0" />
          <StatCard title="Marketing Managers" count="2" percent="45" />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Recruitment Table */}
          <div className="col-span-2 bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Recruitment Progress</h3>

            <table className="w-full text-left text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td>John Doe</td>
                  <td>UI Designer</td>
                  <td className="text-indigo-600">Tech Interview</td>
                </tr>
                <tr className="border-t">
                  <td>Ella Clinton</td>
                  <td>Content Designer</td>
                  <td className="text-yellow-600">Task</td>
                </tr>
                <tr className="border-t">
                  <td>Mike Tyler</td>
                  <td>Node.js Developer</td>
                  <td className="text-green-600">Resume Review</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Applicants */}
          <Applicants />
        </div>
      </div>
    </div>
  );
}
