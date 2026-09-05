import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

interface DepartmentRow {
  name: string;
  jobs: number;
  applications: number;
}

export default function Reports() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [applications, setApplications] = useState<
    { status: string; job_title: string | null; id: number }[]
  >([]);
  const [jobs, setJobs] = useState<{ title: string; id: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.get<Stats>("/admin/stats").catch(() => null),
      api.get<{ status: string; job_title: string | null; id: number }[]>(
        "/admin/applications"
      ).catch(() => []),
      api.get<{ title: string; id: number }[]>("/admin/jobs").catch(() => []),
    ])
      .then(([statsData, apps, jobsData]) => {
        if (!mounted) return;
        setStats(statsData);
        setApplications(apps);
        setJobs(jobsData);
      })
      .catch((e) => {
        if (mounted)
          setError(e instanceof Error ? e.message : "Failed to load reports");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  // Completed stages: interviews conducted (interviews count) and accepted candidates.
  const interviewed = stats?.total_interviews ?? 0;
  const accepted = applications.filter((a) => a.status === "accepted").length;

  const totalJobs = stats?.total_jobs ?? 0;

  // Department breakdown derived from actual jobs.
  const jobsByTitle = new Map<string, number>();
  applications.forEach((a) => {
    if (a.job_title) {
      jobsByTitle.set(a.job_title, (jobsByTitle.get(a.job_title) || 0) + 1);
    }
  });

  const departments: DepartmentRow[] = Array.from(jobsByTitle.entries())
    .map(([title, count]) => {
      const jobTotal = jobs.filter((j) => j.title === title).length || 1;
      return {
        name: title,
        jobs: jobTotal,
        applications: count,
      };
    })
    .slice(0, 6);

  const statCards = [
    { title: "Total Applications", value: stats?.total_applications ?? 0 },
    { title: "Interviews Conducted", value: interviewed },
    { title: "Candidates Accepted", value: accepted },
    { title: "Active Jobs", value: stats?.open_jobs ?? 0 },
  ];

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Recruitment Reports
        </h1>
        <p className="text-gray-400">
          Overview of hiring performance and analytics
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading reports...</p>
      ) : (
      <>
      {/* ================= KPI STATS ================= */}
      <div className="grid md:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-xl backdrop-blur-md"
          >
            <p className="text-gray-400 text-sm">{stat.title}</p>
            <h2 className="text-2xl font-bold text-white mt-2">
              {stat.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* ================= APPLICATIONS BY ROLE ================= */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-6">
          Applications by Role
        </h2>

        {departments.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No applications received yet. Applications grouped by job role will
            appear here.
          </p>
        ) : (
        <div className="space-y-6">
          {departments.map((dept, index) => {
            const pct =
              totalJobs === 0
                ? 0
                : Math.min(100, Math.round((dept.applications / Math.max(totalJobs, 1)) * 100));
            return (
              <div key={dept.name}>
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>{dept.name}</span>
                  <span>{dept.applications} Applications</span>
                </div>

                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="h-full bg-gradient-to-r from-violet-600 to-blue-600 rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
      </>
      )}
    </div>
  );
}