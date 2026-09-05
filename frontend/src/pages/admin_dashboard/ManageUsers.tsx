import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "../../lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Candidate" | "Company" | "Admin" | string;
  is_active?: boolean;
}

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [togglingId, setTogglingId] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<User[]>("/admin/users")
      .then((data) => {
        setUsers(
          data.map((u) => ({
            ...u,
            role:
              u.role === "user"
                ? "Candidate"
                : u.role === "company"
                ? "Recruiter"
                : u.role === "admin"
                ? "Admin"
                : u.role,
            is_active: u.is_active ?? true,
          }))
        );
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load users")
      )
      .finally(() => setLoading(false));
  }, []);

  const toggleActive = async (user: User) => {
    setTogglingId(user.id);
    setError("");
    try {
      const updated = await api.put<User>(`/admin/users/${user.id}`, {
        is_active: !user.is_active,
      });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_active: updated.is_active ?? !user.is_active } : u
        )
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update user");
    } finally {
      setTogglingId(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Users</h1>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
      />

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-white/50">Loading users...</p>
      ) : (
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
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-white/50 text-sm">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id ?? index}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4">{user.name}</td>
                  <td className="p-4 text-white/60">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        user.is_active
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.is_active ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={togglingId === user.id}
                      onClick={() => toggleActive(user)}
                    >
                      {togglingId === user.id
                        ? "..."
                        : user.is_active
                        ? "Block"
                        : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      )}

    </div>
  );
}