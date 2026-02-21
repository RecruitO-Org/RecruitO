import { useParams, useNavigate } from "react-router-dom";
import CompanyLayout from "./CompanyLayout";
import { useJobs } from "./JobsContext";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Job } from "./data";

export default function JobDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, setJobs } = useJobs();

  const jobId = Number(id);
  const job = jobs.find((j) => j.id === jobId);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  if (!job) {
    return (
      <CompanyLayout>
        <div className="max-w-5xl mx-auto py-10">
          <p className="text-gray-900 dark:text-white text-lg">
            Job not found.
          </p>
        </div>
      </CompanyLayout>
    );
  }

  const updateJob = (updatedJob: Job): void => {
    setJobs(jobs.map((j) => (j.id === job.id ? updatedJob : j)));
  };

  const toggleStatus = (): void => {
    updateJob({
      ...job,
      status: job.status === "Open" ? "Closed" : "Open",
    });
  };

  const deleteJob = (): void => {
    setJobs(jobs.filter((j) => j.id !== job.id));
    navigate("/company/job-postings");
  };

  return (
    <CompanyLayout>
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Job Postings
        </button>

        {/* Header */}
        <div className="flex justify-between items-start">

          <div>
            {isEditing ? (
              <input
                value={job.title}
                onChange={(e) =>
                  updateJob({ ...job, title: e.target.value })
                }
                className="
                  text-3xl font-bold p-2 rounded-lg
                  bg-gray-100 dark:bg-gray-800
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-700
                  outline-none focus:ring-2 focus:ring-indigo-500
                "
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {job.title}
              </h2>
            )}

            <span
              className={`mt-3 inline-block px-4 py-2 rounded-full text-sm font-medium ${
                job.status === "Open"
                  ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
              }`}
            >
              {job.status}
            </span>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition"
            >
              <Pencil size={16} />
              {isEditing ? "Save" : "Edit"}
            </button>

            <button
              onClick={toggleStatus}
              className="
                bg-yellow-100 text-yellow-700 hover:bg-yellow-200
                dark:bg-yellow-600/20 dark:text-yellow-400
                dark:hover:bg-yellow-600/30
                px-4 py-2 rounded-lg text-sm transition
              "
            >
              {job.status === "Open" ? "Close Job" : "Reopen Job"}
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="
                bg-red-100 text-red-700 hover:bg-red-200
                dark:bg-red-600/20 dark:text-red-400
                dark:hover:bg-red-600/30
                px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition
              "
            >
              <Trash2 size={16} />
              Delete
            </button>

          </div>
        </div>

        {/* Main Card */}
        <div
          className="
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            rounded-2xl p-8 shadow-sm
          "
        >
          <div className="grid md:grid-cols-2 gap-6 text-sm">

            <Info label="Location" value={job.location} />
            <Info label="Employment Type" value={job.type} />
            <Info label="Experience" value={job.experience} />
            <Info label="Salary" value={job.salary} />
            <Info label="Posted On" value={job.postedOn} />

            <div>
              <p className="text-gray-500 dark:text-gray-400">
                Vacancies
              </p>
              {isEditing ? (
                <input
                  type="number"
                  value={job.vacancies}
                  onChange={(e) =>
                    updateJob({
                      ...job,
                      vacancies: Number(e.target.value),
                    })
                  }
                  className="
                    mt-1 w-24 p-2 rounded-lg
                    bg-gray-100 dark:bg-gray-800
                    text-gray-900 dark:text-white
                    border border-gray-300 dark:border-gray-700
                  "
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium mt-1">
                  {job.vacancies}
                </p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
              Required Skills
            </p>

            {isEditing ? (
              <input
                value={job.skills.join(", ")}
                onChange={(e) =>
                  updateJob({
                    ...job,
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim()),
                  })
                }
                className="
                  w-full p-2 rounded-lg
                  bg-gray-100 dark:bg-gray-800
                  text-gray-900 dark:text-white
                  border border-gray-300 dark:border-gray-700
                "
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="
                      bg-gray-100 text-gray-700
                      dark:bg-gray-800 dark:text-gray-300
                      px-3 py-1 rounded-full text-xs
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            p-6 rounded-2xl w-full max-w-sm shadow-xl
          ">
            <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
              Delete Job?
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="
                  px-4 py-2 rounded-lg
                  bg-gray-100 text-gray-700
                  hover:bg-gray-200
                  dark:bg-gray-800 dark:text-gray-300
                "
              >
                Cancel
              </button>

              <button
                onClick={deleteJob}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </CompanyLayout>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <div>
      <p className="text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-gray-900 dark:text-white font-medium mt-1">
        {value}
      </p>
    </div>
  );
}
