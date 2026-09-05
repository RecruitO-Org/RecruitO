import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../lib/api";

interface ApplicationData {
  id: number;
  job_id: number;
  status: string;
  match_score: number | null;
  created_at: string;
  job_title: string | null;
  company_name: string | null;
}

export default function UserApplications() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<ApplicationData[]>("/applications")
      .then(setApplications)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load applications")
      )
      .finally(() => setLoading(false));
  }, []);

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">My Applications</h1>
        <p className="text-white/50 mt-2">
          Track the roles you've applied for and your ATS match score
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && <p className="text-white/50">Loading applications...</p>}

      {!loading && applications.length === 0 && (
        <p className="text-white/50">
          You haven't applied to any jobs yet. Browse jobs to get started.
        </p>
      )}

      {!loading && applications.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-xl font-semibold">
                    {app.job_title || "Role"}
                  </h2>
                  <p className="text-white/60 text-sm">
                    {app.company_name || "Company"}
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-white/10 capitalize">
                  {app.status}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-white/50 text-sm">
                  Applied{" "}
                  {new Date(app.created_at).toLocaleDateString()}
                </span>

                <div className="text-right">
                  <span className="text-white/50 text-sm block">
                    ATS Match
                  </span>
                  <span className={`text-2xl font-bold ${scoreColor(app.match_score ?? 0)}`}>
                    {app.match_score != null ? `${app.match_score}%` : "N/A"}
                  </span>
                  {app.match_score == null && (
                    <p className="text-white/40 text-xs mt-1">
                      Upload a resume to get scored.
                    </p>
                  )}
                </div>
              </div>

              {app.match_score != null && (
                <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${
                      (app.match_score ?? 0) >= 80
                        ? "bg-green-500"
                        : (app.match_score ?? 0) >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${app.match_score ?? 0}%` }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}