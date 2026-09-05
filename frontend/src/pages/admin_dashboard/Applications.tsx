import { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { api } from "../../lib/api";

interface Application {
  id: number;
  job_title: string | null;
  applicant_name: string | null;
  status: string;
  match_score: number | null;
  created_at: string;
}

export default function Applications() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Application[]>("/admin/applications")
      .then(setApplications)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load applications")
      )
      .finally(() => setLoading(false));
  }, []);

  // ================= FILTER LOGIC =================
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        (app.applicant_name || "").toLowerCase().includes(search.toLowerCase()) ||
        (app.job_title || "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || app.status === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, status]);

  const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === "shortlisted" || s === "accepted" || s === "interviewed")
      return "bg-green-500/20 text-green-400";
    if (s === "rejected" || s === "withdrawn")
      return "bg-red-500/20 text-red-400";
    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">
          Candidate Applications
        </h1>
        <p className="text-gray-400">
          Review and manage all incoming job applications
        </p>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search candidate or role..."
          className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder:text-gray-400"
        />

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[200px] rounded-xl bg-white/5 border border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-[#0f172a] border border-white/10 text-white">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Shortlisted">Shortlisted</SelectItem>
            <SelectItem value="Interviewed">Interviewed</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Withdrawn">Withdrawn</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading applications...</p>
      ) : (
      /* ================= APPLICATION CARDS ================= */
      <div className="grid md:grid-cols-2 gap-6">

        {filteredApplications.length === 0 && (
          <p className="text-gray-400">No applications found.</p>
        )}

        {filteredApplications.map((app, index) => (
          <motion.div
            key={app.id ?? index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all backdrop-blur-md"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {app.applicant_name || "Candidate"}
                </h2>
                <p className="text-gray-400">
                  {app.job_title || "Unknown role"}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Applied {new Date(app.created_at).toLocaleDateString()}
                </p>
              </div>

              <div
                className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${statusColor(
                  app.status
                )}`}
              >
                {app.status}
              </div>
            </div>

            {/* Match Score */}
            <p className="mb-4 text-sm text-violet-400 font-semibold">
              {app.match_score != null
                ? `${app.match_score}% AI Match`
                : "Match score not computed yet"}
            </p>
          </motion.div>
        ))}
      </div>
      )}

    </div>
  );
}