import { useState } from "react";
import { Button } from "@/components/ui/button";
import JobDrawer, { Job } from "./JobDrawer";

export default function ManageJobs(): JSX.Element {
const jobs: Job[] = [
{
title: "Frontend Developer",
company: "TechNova",
applications: 42,
status: "Active",
description: "Build responsive UI using React and Tailwind.",
skills: ["React", "TypeScript", "Tailwind"],
},
{
title: "AI Engineer",
company: "NextGen Labs",
applications: 18,
status: "Flagged",
description: "Develop ML models and deploy APIs.",
skills: ["Python", "TensorFlow", "FastAPI"],
},
{
title: "Backend Developer",
company: "ByteCraft",
applications: 25,
status: "Closed",
description: "Create scalable backend services and REST APIs.",
skills: ["Node.js", "PostgreSQL", "Docker"],
},
];

const [selected, setSelected] = useState<Job | null>(null);

return ( <div className="space-y-8">

  {/* Header */}
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold">Manage Jobs</h1>

    <input
      placeholder="Search jobs..."
      className="px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm
      dark:bg-white/5 dark:border-white/10 outline-none text-sm"
    />
  </div>

  {/* Table */}
  <div className="rounded-3xl overflow-hidden border
  bg-white shadow-lg border-slate-200
  dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl">

    <table className="w-full text-sm">
      <thead className="bg-slate-50 text-slate-500 uppercase text-xs
      dark:bg-white/10 dark:text-white/60">
        <tr>
          <th className="p-4 text-left">Job</th>
          <th>Company</th>
          <th>Applications</th>
          <th>Status</th>
          <th className="text-right pr-6">Actions</th>
        </tr>
      </thead>

      <tbody>
        {jobs.map((job, index) => (
          <tr
            key={index}
            className="border-t border-slate-200 hover:bg-slate-50
            dark:border-white/10 dark:hover:bg-white/5 transition"
          >
            {/* Job identity */}
            <td className="p-4 font-medium">{job.title}</td>

            <td className="opacity-70">{job.company}</td>

            <td>{job.applications}</td>

            {/* Status badge */}
            <td>
              <span
                className={`px-2 py-1 rounded-full text-xs
                ${
                  job.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                    : job.status === "Closed"
                    ? "bg-gray-200 text-gray-700 dark:bg-white/10 dark:text-white/70"
                    : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                }`}
              >
                {job.status}
              </span>
            </td>

            {/* Actions */}
            <td className="text-right pr-6 space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelected(job)}
              >
                View
              </Button>

              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Flag
              </Button>

              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Drawer */}
  <JobDrawer job={selected} onClose={() => setSelected(null)} />
</div>


);
}
