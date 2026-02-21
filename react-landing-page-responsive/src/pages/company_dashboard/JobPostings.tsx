import CompanyLayout from "./CompanyLayout";
import { useNavigate } from "react-router-dom";
import { Plus, Briefcase, X } from "lucide-react";
import { useState } from "react";
import { useJobs } from "./JobsContext";
import { Job } from "./data";

/* ---------------- TYPES ---------------- */

type NewJob = {
  title: string;
  skills: string;
  vacancies: number;
  location: string;
  type: string;
  experience: string;
  salary: string;
};

/* ---------------- COMPONENT ---------------- */

export default function JobPostings(): JSX.Element {
  const navigate = useNavigate();
  const { jobs, setJobs } = useJobs();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [newJob, setNewJob] = useState<NewJob>({
    title: "",
    skills: "",
    vacancies: 1,
    location: "",
    type: "",
    experience: "",
    salary: "",
  });

  /* ---------------- CREATE JOB ---------------- */

  const handleCreateJob = (): void => {
    if (!newJob.title || !newJob.skills) return;

    const formattedJob: Job = {
      id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
      title: newJob.title,
      department: "Engineering",
      location: newJob.location,
      type: newJob.type,
      experience: newJob.experience,
      salary: newJob.salary,
      skills: newJob.skills.split(",").map(s => s.trim()),
      vacancies: Number(newJob.vacancies),
      applicants: 0,
      shortlisted: 0,
      interviews: 0,
      avgMatch: 0,
      postedOn: new Date().toLocaleDateString(),
      deadline: "Not Set",
      status: "Open",
    };

    setJobs([...jobs, formattedJob]);
    setShowModal(false);

    setNewJob({
      title: "",
      skills: "",
      vacancies: 1,
      location: "",
      type: "",
      experience: "",
      salary: "",
    });
  };

  /* ---------------- FIELD CONFIG ---------------- */

  const fields: { placeholder: string; key: keyof NewJob }[] = [
    { placeholder: "Job Title", key: "title" },
    { placeholder: "Location", key: "location" },
    { placeholder: "Employment Type (Full-time / Internship)", key: "type" },
    { placeholder: "Experience (e.g. 2-4 years)", key: "experience" },
    { placeholder: "Salary Range", key: "salary" },
    { placeholder: "Skills (comma separated)", key: "skills" },
  ];

  /* ---------------- UI ---------------- */

  return (
    <CompanyLayout>
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Job Postings
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            Create Job
          </button>
        </div>

        {/* Job Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() =>
                navigate(`/company/job-postings/${job.id}`)
              }
              className="
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                rounded-2xl p-6 cursor-pointer
                hover:border-indigo-500 hover:shadow-lg
                transition-all
              "
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="text-indigo-500 dark:text-indigo-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {job.location} • {job.type}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === "Open"
                      ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Required Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="
                        bg-gray-100 text-gray-700
                        dark:bg-gray-800 dark:text-gray-300
                        text-xs px-3 py-1 rounded-full
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vacancies:
                <span className="text-gray-900 dark:text-white font-medium ml-2">
                  {job.vacancies}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="
              bg-white dark:bg-gray-900
              w-full max-w-md
              rounded-2xl p-6
              border border-gray-200 dark:border-gray-800
              shadow-xl space-y-4
            ">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
                  Create New Job
                </h3>
                <button onClick={() => setShowModal(false)}>
                  <X className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
                </button>
              </div>

              {fields.map((field) => (
                <input
                  key={field.key}
                  type="text"
                  placeholder={field.placeholder}
                  value={newJob[field.key]}
                  onChange={(e) =>
                    setNewJob({ ...newJob, [field.key]: e.target.value })
                  }
                  className="
                    w-full p-3 rounded-lg
                    bg-gray-100 text-gray-900
                    dark:bg-gray-800 dark:text-white
                    border border-gray-300 dark:border-gray-700
                    outline-none focus:ring-2 focus:ring-indigo-500
                  "
                />
              ))}

              <input
                type="number"
                placeholder="Vacancies"
                value={newJob.vacancies}
                onChange={(e) =>
                  setNewJob({ ...newJob, vacancies: Number(e.target.value) })
                }
                className="
                  w-full p-3 rounded-lg
                  bg-gray-100 text-gray-900
                  dark:bg-gray-800 dark:text-white
                  border border-gray-300 dark:border-gray-700
                  outline-none focus:ring-2 focus:ring-indigo-500
                "
              />

              <button
                onClick={handleCreateJob}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition"
              >
                Create Job
              </button>
            </div>
          </div>
        )}

      </div>
    </CompanyLayout>
  );
}
