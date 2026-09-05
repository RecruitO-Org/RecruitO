import { useEffect, useState } from "react";
import CompanyLayout from "./CompanyLayout";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { ApiApplication, toUIApplicant } from "./applicantsData";

export default function Applicants() {
  const navigate = useNavigate();

  const [apps, setApps] = useState<ApiApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<ApiApplication[]>("/applications")
      .then(setApps)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load applicants")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <CompanyLayout>
      <div className="p-6">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Applicants
        </h2>

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">Loading applicants...</p>
        )}

        {!loading && error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {!loading && !error && apps.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No applications received yet.
          </p>
        )}

        {!loading && !error && apps.length > 0 && (
          <div
            className="
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              rounded-2xl overflow-hidden
              shadow-sm
            "
          >
            <table className="w-full text-left">
              <thead
                className="
                  bg-gray-50 dark:bg-gray-800
                  text-gray-600 dark:text-gray-400
                  text-sm
                "
              >
                <tr>
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Match %</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {apps.map((app) => {
                  const applicant = toUIApplicant(app);
                  return (
                    <tr
                      key={app.id}
                      className="
                        border-t border-gray-200 dark:border-gray-800
                        hover:bg-gray-50 dark:hover:bg-gray-800/50
                        transition
                      "
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {applicant.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {applicant.role}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            applicant.match >= 80
                              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                              : applicant.match >= 60
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                          }`}
                        >
                          {applicant.match}%
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {applicant.status}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            navigate(`/company/applicants/${app.id}`)
                          }
                          className="
                            bg-indigo-600 hover:bg-indigo-700
                            text-white px-4 py-2 rounded-lg text-sm
                            transition shadow-sm hover:shadow-md
                          "
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CompanyLayout>
  );
}
