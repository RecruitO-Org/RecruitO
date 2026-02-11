import { useParams, useNavigate } from "react-router-dom";
import CompanyLayout from "./CompanyLayout";
import { applicants } from "./applicantsData";
import { ArrowLeft } from "lucide-react";

export default function ApplicantDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const index = Number(id);
  const applicant = applicants[index];

  if (!applicant) {
    return (
      <CompanyLayout>
        <div className="p-6 text-gray-900 dark:text-white">
          Applicant not found.
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
        </div>

        {/* Match Score Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">
            AI Match Score
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

            <span className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-sm font-medium">
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

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Resume alignment with job requirements.
          </p>
        </div>

        {/* Resume Preview */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Resume Preview
          </h3>

          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400">
            Resume Preview (Mock)
          </div>
        </div>

        {/* Strengths & Gaps */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Strengths */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-green-600 dark:text-green-400 text-lg font-semibold mb-4">
              Strengths
            </h3>

            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {applicant.strengths?.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Skill Gaps */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-yellow-600 dark:text-yellow-400 text-lg font-semibold mb-4">
              Skill Gaps
            </h3>

            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {applicant.gaps?.map((gap, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-yellow-500">⚠</span>
                  {gap}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* AI Summary */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            AI Analysis Summary
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            This candidate shows strong alignment with required skills.
            Based on resume comparison, they are a good fit for the role.
            Recommended for next interview round.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-sm hover:shadow-md">
            Schedule Interview
          </button>

          <button className="bg-red-100 hover:bg-red-200 dark:bg-red-600/20 dark:hover:bg-red-600/30 text-red-700 dark:text-red-400 px-6 py-3 rounded-xl font-medium transition">
            Reject Candidate
          </button>
        </div>

      </div>
    </CompanyLayout>
  );
}
