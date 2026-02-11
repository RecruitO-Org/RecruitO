import { Interview } from "./interview";

interface Props {
  interview: Interview;
  onView: (interview: Interview) => void;
}

export default function InterviewCard({ interview, onView }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-5 border dark:border-gray-700 transition hover:shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {interview.candidateName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {interview.jobTitle}
          </p>
        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            interview.status === "Completed"
              ? "bg-green-100 text-green-600"
              : interview.status === "Flagged"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {interview.status}
        </span>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>📅 {interview.scheduledDate}</p>
        <p>⚠ Warnings: {interview.integrityWarnings}</p>
        {interview.aiScore && <p>📊 AI Score: {interview.aiScore}/10</p>}
      </div>

      <button
        onClick={() => onView(interview)}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
      >
        View Details
      </button>
    </div>
  );
}
