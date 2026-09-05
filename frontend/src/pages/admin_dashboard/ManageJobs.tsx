import { useState, useEffect } from "react";
import { api } from "../../lib/api";

interface Job {
  id: number;
  title: string;
  company_name: string | null;
  applicants: number;
  status: "Open" | "Closed" | string;
  posted_on?: string;
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<
        {
          id: number;
          title: string;
          company_name: string | null;
          status: string;
          applicants: number;
          posted_on?: string;
        }[]
      >("/admin/jobs")
      .then((data) => {
        setJobs(
          data.map((j) => ({
            ...j,
            status: j.status === "open" ? "Open" : "Closed",
            applicants: j.applicants ?? 0,
          }))
        );
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load jobs")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Jobs</h1>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-white/50">Loading jobs...</p>
      ) : (
      <div className="space-y-4">

        {jobs.length === 0 ? (
          <p className="text-white/50">No job postings yet.</p>
        ) : (
          jobs.map((job, index) => (
            <div
              key={job.id ?? index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-white/60">
                  {job.company_name || "Unknown company"} • {job.applicants}{" "}
                  Applicant{job.applicants === 1 ? "" : "s"}
                </p>
                {job.posted_on && (
                  <p className="text-white/40 text-sm mt-1">
                    Posted {new Date(job.posted_on).toLocaleDateString()}
                  </p>
                )}
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  job.status === "Open"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {job.status}
              </span>
            </div>
          ))
        )}

      </div>
      )}

    </div>
  );
}