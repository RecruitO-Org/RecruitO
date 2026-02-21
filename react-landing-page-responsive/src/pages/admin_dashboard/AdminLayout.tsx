import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">

      {/* Sidebar */}
      <div className="w-64 bg-black/40 border-r border-white/10 p-6 space-y-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>

        <nav className="space-y-3 text-sm">
          <Link to="/admin" className="block hover:text-violet-400">
            Dashboard
          </Link>
          <Link to="/admin/users" className="block hover:text-violet-400">
            Manage Users
          </Link>
          <Link to="/admin/companies" className="block hover:text-violet-400">
            Manage Companies
          </Link>
          <Link to="/admin/jobs" className="block hover:text-violet-400">
            Manage Jobs
          </Link>
          <Link to="/admin/reports" className="block hover:text-violet-400">
            Reports
          </Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}