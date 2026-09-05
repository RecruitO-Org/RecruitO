import { useEffect, useState } from "react";
import CompanyLayout from "./CompanyLayout";
import {
  Briefcase,
  Users,
  Video,
  CheckCircle,
} from "lucide-react";
import StatCard from "./StatCard";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

interface JobData {
  id: number;
  title: string;
  status: string;
  applicant_count?: number;
}

interface ApplicationData {
  id: number;
  status: string;
  job_title: string | null;
  created_at: string;
}

interface InterviewData {
  id: number;
  status: string;
  job_title: string | null;
  scheduled_at: string | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeJobs, setActiveJobs] = useState<number>(0);
  const [totalApplicants, setTotalApplicants] = useState<number>(0);
  const [interviews, setInterviews] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);
  const [approved, setApproved] = useState<boolean | null>(null);
  const [recentActivity, setRecentActivity] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.get<JobData[]>("/jobs").catch(() => []),
      api.get<ApplicationData[]>("/applications").catch(() => []),
      api.get<InterviewData[]>("/interviews").catch(() => []),
      api.get<{ approved: boolean }>("/companies/me").catch(() => null),
    ])
      .then(([jobs, apps, intervs, company]) => {
        if (!mounted) return;
        setActiveJobs(jobs.filter((j) => j.status === "open").length);
        setTotalApplicants(apps.length);
        setInterviews(intervs.length);
        setSelected(
          apps.filter(
            (a) => a.status === "accepted" || a.status === "interviewed"
          ).length
        );
        setRecentActivity(apps.slice(0, 5));
        setApproved(company ? company.approved : null);
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
    <CompanyLayout>
      <div className="p-6">

        {/* Hero Section */}
        <div
          className="
            mb-12 rounded-2xl p-8
            bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600
            dark:from-indigo-700 dark:via-blue-700 dark:to-purple-700
            text-white shadow-xl
          "
        >
          <h2 className="text-3xl font-bold">
            Welcome back 👋
          </h2>

          <p className="mt-3 text-white/90 max-w-xl text-sm sm:text-base">
            Manage jobs, applicants, interviews, and hiring insights — all from one place.
          </p>

          {approved === false && (
            <p className="mt-4 inline-block px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-400/30 text-yellow-200 text-sm">
              ⏳ Your company is pending approval. You will be able to post jobs
              and schedule interviews once an admin approves your profile.
            </p>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Stats Section */}
        <div className="mb-12">
          <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-800 dark:text-gray-400 mb-6">
          Hiring Overview
          </h3>

          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading stats...</p>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Active Job Postings"
              value={activeJobs}
              icon={<Briefcase size={22} />}
              color="from-indigo-500 to-indigo-600"
            />

            <StatCard
              title="Total Applicants"
              value={totalApplicants}
              icon={<Users size={22} />}
              color="from-blue-500 to-blue-600"
            />

            <StatCard
              title="Interviews Scheduled"
              value={interviews}
              icon={<Video size={22} />}
              color="from-yellow-500 to-orange-500"
            />

            <StatCard
              title="Candidates Advanced"
              value={selected}
              icon={<CheckCircle size={22} />}
              color="from-green-500 to-emerald-600"
            />
          </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-800 dark:text-gray-400 mb-6">
          Quick Actions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/company/job-postings")}
              className="
                bg-gradient-to-r from-indigo-600 to-purple-600
                hover:from-indigo-500 hover:to-purple-500
                text-white py-3 rounded-xl font-medium
                shadow-md hover:shadow-lg transition
              "
            >
              + Post New Job
            </button>

            <button
              onClick={() => navigate("/company/applicants")}
              className="
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-800 dark:text-white
                py-3 rounded-xl font-medium
                shadow-sm hover:shadow-md transition
              "
            >
              View Applicants
            </button>

            <button
              onClick={() => navigate("/company/interview")}
              className="
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-800 dark:text-white
                py-3 rounded-xl font-medium
                shadow-sm hover:shadow-md transition
              "
            >
              Schedule Interview
            </button>
          </div>
        </div>

        {/* Activity Section */}
        <div
          className="
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            rounded-2xl p-10 text-center
            shadow-sm
          "
        >
          {recentActivity.length === 0 ? (
            <>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                No recent activity
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                New applications, interviews, and insights will appear here.
              </p>
            </>
          ) : (
            <div className="text-left space-y-3">
              {recentActivity.map((app) => (
                <div
                  key={app.id}
                  className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {app.job_title || "Application"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm capitalize text-indigo-600 dark:text-indigo-400">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </CompanyLayout>
  );
}
