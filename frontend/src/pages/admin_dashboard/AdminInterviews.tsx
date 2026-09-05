import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { api } from "../../lib/api";

interface Interview {
  id: number;
  job_title: string | null;
  applicant_name: string | null;
  scheduled_at: string | null;
  status: string;
  score: number | null;
  notes: string | null;
}

export default function Interviews() {
  const [search, setSearch] = useState("");
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Interview[]>("/interviews")
      .then(setInterviews)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load interviews")
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const matchesSearch =
        (interview.applicant_name || "").toLowerCase().includes(search.toLowerCase()) ||
        (interview.job_title || "").toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [interviews, search]);

  const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === "completed") return "bg-green-500/20 text-green-400";
    if (s === "cancelled") return "bg-red-500/20 text-red-400";
    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">
          Scheduled Interviews
        </h1>
        <p className="text-gray-400">
          Manage and track all candidate interviews
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search candidate or role..."
          className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder:text-gray-400"
        />
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading interviews...</p>
      ) : (
      <div className="grid md:grid-cols-2 gap-6">

        {filteredInterviews.length === 0 && (
          <p className="text-gray-400">No interviews found.</p>
        )}

        {filteredInterviews.map((interview, index) => (
          <motion.div
            key={interview.id ?? index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all backdrop-blur-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {interview.applicant_name || "Candidate"}
                </h2>
                <p className="text-gray-400">
                  {interview.job_title || "Unknown role"}
                </p>
              </div>

              <div
                className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${statusColor(
                  interview.status
                )}`}
              >
                {interview.status}
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-2">
              📅{" "}
              {interview.scheduled_at
                ? new Date(interview.scheduled_at).toLocaleString()
                : "N/A"}
            </p>

            {interview.score != null && (
              <p className="text-sm text-violet-400 font-semibold">
                Score: {interview.score}
              </p>
            )}

            {interview.notes && (
              <p className="text-sm text-gray-400 mt-2 truncate">
                {interview.notes}
              </p>
            )}
          </motion.div>
        ))}
      </div>
      )}

    </div>
  );
}