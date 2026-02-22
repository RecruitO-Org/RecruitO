import { Button } from "@/components/ui/button";

export default function ManageUsers(): JSX.Element {
const users = [
{ name: "Shrey Ruparel", email: "[shrey@mail.com](mailto:shrey@mail.com)", role: "User", status: "Active" },
{ name: "TechNova HR", email: "[hr@technova.com](mailto:hr@technova.com)", role: "Company", status: "Active" },
{ name: "John Admin", email: "[admin@recruito.com](mailto:admin@recruito.com)", role: "Admin", status: "Suspended" },
];

return ( <div className="space-y-8">

  {/* Header */}
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold">Manage Users</h1>

    <div className="flex gap-3">
      <input
        placeholder="Search users..."
        className="px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm
        dark:bg-white/5 dark:border-white/10 outline-none text-sm"
      />
      <Button>Add User</Button>
    </div>
  </div>

  {/* Table Container */}
  <div className="rounded-3xl overflow-hidden border
  bg-white shadow-lg border-slate-200
  dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl">

    <table className="w-full text-sm">

      {/* Head */}
      <thead className="bg-slate-50 text-slate-500 uppercase text-xs
      dark:bg-white/10 dark:text-white/60">
        <tr>
          <th className="p-4 text-left">User</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th className="text-right pr-6">Actions</th>
        </tr>
      </thead>

      {/* Body */}
      <tbody>
        {users.map((user, index) => (
          <tr
            key={index}
            className="border-t border-slate-200 hover:bg-slate-50
            dark:border-white/10 dark:hover:bg-white/5 transition"
          >
            {/* User identity */}
            <td className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-violet-500 text-white flex items-center justify-center text-xs font-semibold">
                {user.name[0]}
              </div>
              <span className="font-medium">{user.name}</span>
            </td>

            <td className="opacity-70">{user.email}</td>

            {/* Role badge */}
            <td>
              <span className="px-2 py-1 rounded-full text-xs
              bg-violet-100 text-violet-700
              dark:bg-violet-500/20 dark:text-violet-300">
                {user.role}
              </span>
            </td>

            {/* Status badge */}
            <td>
              <span
                className={`px-2 py-1 rounded-full text-xs
                ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                }`}
              >
                {user.status}
              </span>
            </td>

            {/* Actions */}
            <td className="text-right pr-6 space-x-2">
              <Button size="sm" variant="outline">
                View
              </Button>

              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Suspend
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


);
}
