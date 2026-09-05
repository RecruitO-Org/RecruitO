import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import CompanyLayout from "./CompanyLayout";
import InterviewDetails from "./InterviewDetails";

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
  const [selected, setSelected] = useState<ApiInterview | null>(null);

  const loadInterviews = () => {
    api
      .get<ApiInterview[]>("/interviews")
      .then(setInterviews)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load interviews")
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleUpdated = () => {
    setSelected(null);
    loadInterviews();
  };

  const formatDate = (d: string | null) => {
    if (!d) return "Not scheduled";
    const date = new Date(d);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      case "scheduled":
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  return (
    <CompanyLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Interview Management
        </h1>

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">Loading interviews...</p>
        )}

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
        )}

        {!loading && interviews.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No interviews scheduled yet. Schedule one from the Applicants page.
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                rounded-2xl p-6
                transition-all duration-300
                hover:shadow-xl hover:scale-[1.02]
              "
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {interview.applicant_name || "Candidate"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {interview.job_title || "Untitled Job"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium capitalize ${statusColor(interview.status)}`}
                >
                  {interview.status}
                </span>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
                  {formatDate(interview.scheduled_at)}
                </div>

                {interview.applicant_email && (
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    {interview.applicant_email}
                    {interview.applicant_phone && ` • ${interview.applicant_phone}`}
                  </div>
                )}

                {interview.notes && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2">
                    {interview.notes}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelected(interview)}
                className="
                  mt-6 w-full
                  bg-indigo-600 hover:bg-indigo-700
                  text-white py-2.5 rounded-xl
                  font-medium transition
                "
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {selected && (
          <InterviewDetails
            interview={selected}
            onClose={() => setSelected(null)}
            onUpdated={handleUpdated}
          />
        )}
      </div>
    </CompanyLayout>
  );
}
