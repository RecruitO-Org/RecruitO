import { Interview } from "./intervieww";

interface Props {
  interview: Interview;
  onClose: () => void;
}

export default function InterviewDetails({
  interview,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 w-[600px] rounded-2xl p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Interview Details
        </h2>

        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <p><strong>Candidate:</strong> {interview.candidateName}</p>
          <p><strong>Job:</strong> {interview.jobTitle}</p>
          <p><strong>Status:</strong> {interview.status}</p>
          <p><strong>Warnings:</strong> {interview.integrityWarnings}</p>

          {interview.aiScore !== undefined && (
            <p><strong>AI Score:</strong> {interview.aiScore}/10</p>
          )}
        </div>

        {interview.videoUrl && (
          <video
            src={interview.videoUrl}
            controls
            className="mt-4 rounded-xl w-full"
          />
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            HR Notes
          </label>

          <textarea
            className="
              w-full mt-2 p-3 rounded-xl border
              bg-white text-gray-900
              dark:bg-gray-800 dark:text-white dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
            placeholder="Write internal notes..."
          />
        </div>

        <div className="mt-4">
          <select
            className="
              w-full p-3 rounded-xl border
              bg-white text-gray-900
              dark:bg-gray-800 dark:text-white dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          >
            <option>Shortlist</option>
            <option>Reject</option>
            <option>Next Round</option>
          </select>
        </div>

      </div>
    </div>
  );
}
