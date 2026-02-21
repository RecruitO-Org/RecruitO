import { Button } from "@/components/ui/button";

export default function ManageUsers() {
  const users = [
    { name: "Shrey Ruparel", email: "shrey@mail.com", role: "User", status: "Active" },
    { name: "TechNova HR", email: "hr@technova.com", role: "Company", status: "Active" },
    { name: "John Admin", email: "admin@recruito.com", role: "Admin", status: "Active" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Users</h1>

      <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-white/60 uppercase text-xs">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-4">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className="text-green-400">
                    {user.status}
                  </span>
                </td>
                <td className="text-right pr-6 space-x-2">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600">
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