import { useState } from "react";
import InterviewDetails from "./InterviewDetails";
import { Interview } from "./intervieww";

import CompanyLayout from "./CompanyLayout";

export default function Interviews() {
  const [selected, setSelected] = useState<Interview| null>(null);

  const interviews: Interview[] = [
    {
      id: "1",
      candidateName: "Ananya Sharma",
      jobTitle: "Frontend Developer",
      scheduledDate: "12 Feb 2026",
      status: "Completed",
      integrityWarnings: 1,
      videoUrl: "/sample-video.mp4",
      aiScore: 8,
    },
    {
      id: "2",
      candidateName: "Rahul Mehta",
      jobTitle: "Backend Developer",
      scheduledDate: "10 Feb 2026",
      status: "Flagged",
      integrityWarnings: 4,
      aiScore: 6,
    },
  ];

  return (
    <CompanyLayout>
      <div className="p-6">

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Interview Management
        </h1>

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
                    {interview.candidateName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {interview.jobTitle}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    interview.status === "Completed"
                      ? "bg-green-500/10 text-green-500"
                      : interview.status === "Flagged"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {interview.status}
                </span>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
                  📅 {interview.scheduledDate}
                </div>

                <div
                  className={`px-3 py-2 rounded-lg text-xs font-medium w-fit ${
                    interview.integrityWarnings > 2
                      ? "bg-red-500/10 text-red-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  ⚠ {interview.integrityWarnings} Warning
                  {interview.integrityWarnings !== 1 && "s"}
                </div>
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
          />
        )}

      </div>
    </CompanyLayout>
  );
}
