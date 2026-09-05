import { useState, useEffect, useMemo } from "react";
import { api } from "../../lib/api";

interface ApiInterview {
  id: number;
  application_id: number;
  job_id: number;
  user_id: number;
  scheduled_at: string | null;
  status: string;
  notes: string | null;
  score: number | null;
  created_at: string;
  job_title: string | null;
  company_name: string | null;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
}

export default function Interviews() {
  const [interviews, setInterviews] = useState<ApiInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<ApiInterview[]>("/interviews")
      .then(setInterviews)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load interviews")
      )
      .finally(() => setLoading(false));
  }, []);

  const upcoming = useMemo(
    () => interviews.filter((i) => i.status === "scheduled"),
    [interviews]
  );

  const past = useMemo(
    () =>
      interviews.filter(
        (i) => i.status === "completed" || i.status === "cancelled"
      ),
    [interviews]
  );

  const statusColor = (s: string) => {
    switch (s) {
      case "completed":
        return "text-green-400";
      case "cancelled":
        return "text-red-400";
      case "scheduled":
      default:
        return "text-yellow-400";
    }
  };

  const formatDate = (d: string | null) => {
    if (!d) return "Not scheduled";
    const date = new Date(d);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  if (loading) {
    return (
      <div className="max-w-6xl space-y-8">
        <h1 className="text-4xl font-bold mb-2">Interviews</h1>
        <p className="text-white/50">Loading interviews...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Interviews</h1>
        <p className="text-white/50">
          Track your scheduled and completed interviews
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* UPCOMING INTERVIEWS */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-green-900/40 to-emerald-800/30 border border-white/10 shadow-2xl">
        <h2 className="text-xl font-semibold mb-6">Upcoming</h2>

        {upcoming.length === 0 ? (
          <p className="text-white/40 text-sm">
            No upcoming interviews.
          </p>
        ) : (
          <div className="space-y-4">
            {upcoming.map((interview) => (
              <div
                key={interview.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">
                    {interview.job_title || "Untitled Job"}
                  </p>
                  <p className="text-white/50">
                    {interview.company_name || "Company"}
                  </p>
                  <p className="text-sm text-white/40 mt-1">
                    {formatDate(interview.scheduled_at)}
                  </p>
                  {interview.notes && (
                    <p className="text-xs text-white/30 mt-1">
                      Note: {interview.notes}
                    </p>
                  )}
                </div>
                <span className={`font-medium capitalize ${statusColor(interview.status)}`}>
                  {interview.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PAST INTERVIEWS */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl">
        <h2 className="text-xl font-semibold mb-6">Past</h2>

        {past.length === 0 ? (
          <p className="text-white/40 text-sm">No past interviews yet.</p>
        ) : (
          <div className="space-y-4">
            {past.map((interview) => (
              <div
                key={interview.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between"
              >
                <div>
                  <p className="font-medium">
                    {interview.job_title || "Untitled Job"}
                  </p>
                  <p className="text-sm text-white/50">
                    {interview.company_name || "Company"}
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {formatDate(interview.scheduled_at)}
                  </p>
                </div>
                <span className={`font-medium capitalize ${statusColor(interview.status)}`}>
                  {interview.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
