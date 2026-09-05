import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

interface Stats {
  total_users: number;
  total_companies: number;
  total_jobs: number;
  open_jobs: number;
  total_applications: number;
  total_resumes: number;
  total_interviews: number;
}

interface ActivityItem {
  id: number;
  job_title: string | null;
  applicant_name: string | null;
  status: string;
  created_at: string;
}

export default function AdminHome() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.get<Stats>("/admin/stats").catch(() => null),
      api.get<ActivityItem[]>("/admin/applications").catch(() => []),
    ])
      .then(([statsData, apps]) => {
        if (!mounted) return;
        setStats(statsData);
        setActivity(apps.slice(0, 5));
      })
      .catch((e) => {
        if (mounted)
          setError(e instanceof Error ? e.message : "Failed to load dashboard");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-12">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Overview
          </h1>
          <p className="text-white/50 mt-2">
            Monitor hiring pipeline and system performance.
          </p>
        </div>

        <Button
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90"
          onClick={() => navigate("/admin/jobs")}
        >
          + Create Job
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <p className="text-white/50">Loading dashboard...</p>
      )}

      {/* ================= KPI CARDS ================= */}
      {!loading && stats && (
      <div className="grid md:grid-cols-4 gap-6">

        {[
          { label: "Open Jobs", value: String(stats.open_jobs ?? 0) },
          { label: "Total Applications", value: String(stats.total_applications ?? 0) },
          { label: "Interviews Scheduled", value: String(stats.total_interviews ?? 0) },
          { label: "Registered Users", value: String(stats.total_users ?? 0) },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl 
            bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl
            transition-all duration-300 ease-out
            hover:scale-[1.05] hover:-translate-y-2
            hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]
            hover:ring-1 hover:ring-violet-500/20"
          >
            <p className="text-white/50">{stat.label}</p>
            <h2 className="text-4xl font-bold mt-3">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>
      )}

      {/* ================= MAIN PANELS ================= */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* System Status Panel */}
        <div className="p-8 rounded-3xl 
        bg-gradient-to-br from-violet-600/10 to-blue-600/5
        border border-white/10 backdrop-blur-xl shadow-xl">

          <h2 className="text-xl font-semibold mb-6">
            System Overview
          </h2>

          {!loading && stats && (
          <div className="space-y-4 text-sm text-white/70">
            <div className="flex justify-between">
              <span>Total Companies</span>
              <span className="font-semibold">{stats.total_companies}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Jobs</span>
              <span className="font-semibold">{stats.total_jobs}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Resumes Uploaded</span>
              <span className="font-semibold">{stats.total_resumes}</span>
            </div>
            <div className="flex justify-between">
              <span>System Status</span>
              <span className="font-semibold text-green-400">Healthy</span>
            </div>
          </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="p-8 rounded-3xl 
        bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">

          <h2 className="text-xl font-semibold mb-6">
            Recent Applications
          </h2>

          {activity.length === 0 ? (
            <p className="text-sm text-white/50">
              No applications received yet.
            </p>
          ) : (
          <div className="space-y-4 text-sm text-white/70">

            {activity.map((app) => (
              <div key={app.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition flex justify-between items-center">
                <span>
                  {app.applicant_name || "Candidate"} for {app.job_title || "a role"}
                </span>
                <span className="capitalize text-xs px-2 py-1 rounded-full bg-white/10">
                  {app.status}
                </span>
              </div>
            ))}

          </div>
          )}
        </div>

      </div>

    </div>
  );
}