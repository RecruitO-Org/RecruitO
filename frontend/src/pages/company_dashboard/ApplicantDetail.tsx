import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyLayout from "./CompanyLayout";
import { ArrowLeft } from "lucide-react";
import { api } from "../../lib/api";
import { ApiApplication, toUIApplicant } from "./applicantsData";

export default function ApplicantDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [app, setApp] = useState<ApiApplication | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Interview scheduling
  const [showSchedule, setShowSchedule] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [scheduling, setScheduling] = useState(false);
  const [scheduleMsg, setScheduleMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get<ApiApplication>(`/applications/${id}`)
      .then(setApp)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load applicant")
      )
      .finally(() => setLoading(false));
  }, [id]);

  const applicant = app ? toUIApplicant(app) : null;

  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!app || !interviewDate) return;
    setScheduling(true);
    setScheduleMsg(null);
    try {
      await api.post("/interviews", {
        application_id: app.id,
        scheduled_at: new Date(interviewDate).toISOString(),
        notes: interviewNotes || undefined,
      });
      setScheduleMsg({ type: "success", text: "Interview scheduled!" });
      setShowSchedule(false);
      // Refresh the application to show updated status
      const updated = await api.get<ApiApplication>(`/applications/${id}`);
      setApp(updated);
    } catch (e) {
      setScheduleMsg({
        type: "error",
        text: e instanceof Error ? e.message : "Failed to schedule",
      });
    } finally {
      setScheduling(false);
    }
  };

  if (loading) {
    return (
      <CompanyLayout>
        <div className="p-6 text-gray-900 dark:text-white">Loading...</div>
      </CompanyLayout>
    );
  }

  if (error || !applicant || !app) {
    return (
      <CompanyLayout>
        <div className="p-6 text-gray-900 dark:text-white">
          {error || "Applicant not found."}
        </div>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-10 text-gray-900 dark:text-white">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Applicants
        </button>

        {/* Candidate Header */}
        <div>
          <h2 className="text-3xl font-bold">
            {applicant.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Applied for {applicant.role}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {app.applicant_email || ""}
            {app.applicant_phone ? ` • ${app.applicant_phone}` : ""}
          </p>
        </div>

        {/* Schedule Interview Button */}
        {scheduleMsg && (
          <div
            className={`p-4 rounded-xl text-sm ${
              scheduleMsg.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            {scheduleMsg.text}
          </div>
        )}

        {!showSchedule ? (
          <button
            onClick={() => setShowSchedule(true)}
            className="
              bg-indigo-600 hover:bg-indigo-700
              text-white px-6 py-3 rounded-xl
              font-medium transition shadow-sm
            "
          >
            Schedule Interview
          </button>
        ) : (
          <form
            onSubmit={handleScheduleInterview}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm space-y-6"
          >
            <h3 className="text-lg font-semibold">Schedule Interview</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                required
                className="
                  w-full p-3 rounded-xl border
                  bg-white text-gray-900
                  dark:bg-gray-800 dark:text-white dark:border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes (optional)
              </label>
              <textarea
                value={interviewNotes}
                onChange={(e) => setInterviewNotes(e.target.value)}
                placeholder="Meeting link, instructions, etc."
                rows={3}
                className="
                  w-full p-3 rounded-xl border
                  bg-white text-gray-900
                  dark:bg-gray-800 dark:text-white dark:border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={scheduling}
                className="
                  flex-1 bg-indigo-600 hover:bg-indigo-700
                  text-white py-3 rounded-xl
                  font-medium transition disabled:opacity-50
                "
              >
                {scheduling ? "Scheduling..." : "Confirm Schedule"}
              </button>
              <button
                type="button"
                onClick={() => setShowSchedule(false)}
                className="
                  px-6 py-3 rounded-xl border
                  border-gray-300 dark:border-gray-700
                  text-gray-600 dark:text-gray-400
                  hover:bg-gray-50 dark:hover:bg-gray-800
                  transition
                "
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Match Score Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">
            Match Score
          </h3>

          <div className="flex items-center justify-between mb-5">
            <div
              className={`text-5xl font-bold ${
                applicant.match >= 80
                  ? "text-green-500"
                  : applicant.match >= 60
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {applicant.match}%
            </div>

            <span className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-sm font-medium capitalize">
              {applicant.status}
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-700 ${
                applicant.match >= 80
                  ? "bg-green-500"
                  : applicant.match >= 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${applicant.match}%` }}
            />
          </div>
        </div>

        {/* Candidate Skills */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Candidate Skills
          </h3>
          {app.applicant_skills && app.applicant_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {app.applicant_skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No skills listed on the candidate profile.
            </p>
          )}
        </div>
      </div>
    </CompanyLayout>
  );
}
