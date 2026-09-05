import { useState, useEffect, useMemo } from "react";
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

export default function AIInsights() {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Application[]>("/admin/applications")
      .then(setApplications)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load candidates")
      )
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return applications.filter(
      (candidate) =>
        (candidate.applicant_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (candidate.job_title || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [applications, search]);

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          AI Candidate Insights
        </h1>
        <p className="text-gray-400">
          AI-powered resume analysis and hiring recommendations
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search candidate or role..."
        className="w-full md:w-1/2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder:text-gray-400"
      />

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading candidates...</p>
      ) : (
      <div className="grid md:grid-cols-2 gap-6">

        {filtered.length === 0 && (
          <p className="text-gray-400">No candidates found.</p>
        )}

        {filtered.map((candidate, index) => (
          <motion.div
            key={candidate.id ?? index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md hover:scale-[1.02] transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {candidate.applicant_name || "Candidate"}
                </h2>
                <p className="text-gray-400">{candidate.job_title || "Unknown role"}</p>
              </div>

              <div className="text-right">
                <div className="text-sm capitalize text-green-400">
                  {candidate.status}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(candidate.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm font-semibold text-violet-400 mb-1">
                AI Match Score
              </p>
              <p className="text-sm text-gray-300">
                {candidate.match_score != null
                  ? `${candidate.match_score}%`
                  : "AI scoring not available yet. Resume analysis is coming soon."}
              </p>
            </div>

            <p className="text-sm text-gray-400">
              {candidate.match_score != null
                ? "AI insights and recommendations will appear here."
                : "Once AI resume analysis is enabled, strengths, weaknesses, and recommendations will be generated for each candidate."}
            </p>
          </motion.div>
        ))}
      </div>
      )}

    </div>
  );
}