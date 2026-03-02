import CompanyLayout from "./CompanyLayout";
import { useNavigate } from "react-router-dom";

import { applicants } from "./applicantsData";

export default function Applicants() {
  const navigate = useNavigate();

  return (
    <CompanyLayout>
      <div className="p-6">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Applicants
        </h2>

        {/* Table Card */}
        <div
          className="
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            rounded-2xl overflow-hidden
            shadow-sm
          "
        >
          <table className="w-full text-left">
            
            {/* Table Head */}
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

            {/* Table Body */}
            <tbody>
              {applicants.map((applicant, index) => (
                <tr
                  key={index}
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
                        navigate(`/company/applicants/${index}`)
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
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </CompanyLayout>
  );
}
