import CompanyLayout from "./CompanyLayout";
import {
  Briefcase,
  Users,
  Video,
  CheckCircle,
} from "lucide-react";
import StatCard from "./StatCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

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
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-800 dark:text-gray-400 mb-6">
          Hiring Overview
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Active Job Postings"
              value={12}
              icon={<Briefcase size={22} />}
              color="from-indigo-500 to-indigo-600"
            />

            <StatCard
              title="Total Applicants"
              value={348}
              icon={<Users size={22} />}
              color="from-blue-500 to-blue-600"
            />

            <StatCard
              title="Interviews Scheduled"
              value={24}
              icon={<Video size={22} />}
              color="from-yellow-500 to-orange-500"
            />

            <StatCard
              title="Candidates Selected"
              value={8}
              icon={<CheckCircle size={22} />}
              color="from-green-500 to-emerald-600"
            />
          </div>
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
              onClick={() => navigate("/company/interviews")}
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
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            No recent activity
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            New applications, interviews, and insights will appear here.
          </p>
        </div>

      </div>
    </CompanyLayout>
  );
}
