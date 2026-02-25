import { useState } from "react";
import { Button } from "@/components/ui/button";

interface User {
  name: string;
  email: string;
  role: "Candidate" | "Recruiter";
  status: "Active" | "Blocked";
}

export default function Users() {
  const [search, setSearch] = useState("");

  const users: User[] = [
    { name: "Rahul Mehta", email: "rahul@gmail.com", role: "Candidate", status: "Active" },
    { name: "Priya Sharma", email: "priya@gmail.com", role: "Candidate", status: "Active" },
    { name: "Aman Verma", email: "aman@gmail.com", role: "Recruiter", status: "Blocked" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Users</h1>
        <Button>Add User</Button>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
      />

      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/10 text-white/70 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4 text-white/60">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      user.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <Button size="sm" variant="outline">
                    View
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