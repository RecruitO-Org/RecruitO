import { useState } from "react";
import { api } from "../../lib/api";

interface ApiInterview {
  id: number;
  application_id: number;
  job_id: number;
  user_id: number;
  scheduled_at: string | null;
  status: string;
  notes: string | null;
  score: number | null;
  created_at: string;
  job_title: string | null;
  company_name: string | null;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
}

interface Props {
  interview: ApiInterview;
  onClose: () => void;
  onUpdated: () => void;
}

export default function InterviewDetails({
  interview,
  onClose,
  onUpdated,
}: Props) {
  const [notes, setNotes] = useState(interview.notes || "");
  const [status, setStatus] = useState(interview.status);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await api.put(`/interviews/${interview.id}`, {
        notes,
        status,
      });
      setMessage({ type: "success", text: "Interview updated!" });
      setTimeout(() => {
        onUpdated();
      }, 800);
    } catch (e) {
      setMessage({
        type: "error",
        text: e instanceof Error ? e.message : "Failed to update",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await api.put(`/interviews/${interview.id}`, {
        status: "cancelled",
      });
      setMessage({ type: "success", text: "Interview cancelled." });
      setTimeout(() => onUpdated(), 800);
    } catch (e) {
      setMessage({
        type: "error",
        text: e instanceof Error ? e.message : "Failed to cancel",
      });
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (d: string | null) => {
    if (!d) return "Not scheduled";
    const date = new Date(d);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          Close
        </button>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Interview Details
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-xl text-sm ${
              message.type === "success"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <p>
            <strong>Candidate:</strong>{" "}
            {interview.applicant_name || "Unknown"}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {interview.applicant_email || "Not provided"}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {interview.applicant_phone || "Not provided"}
          </p>
          <p>
            <strong>Job:</strong> {interview.job_title || "Untitled Job"}
          </p>
          <p>
            <strong>Scheduled:</strong> {formatDate(interview.scheduled_at)}
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              w-full mt-2 p-3 rounded-xl border
              bg-white text-gray-900
              dark:bg-gray-800 dark:text-white dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            HR Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="
              w-full mt-2 p-3 rounded-xl border
              bg-white text-gray-900
              dark:bg-gray-800 dark:text-white dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
            placeholder="Write internal notes..."
            rows={4}
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="
              flex-1 bg-indigo-600 hover:bg-indigo-700
              text-white py-2.5 rounded-xl
              font-medium transition disabled:opacity-50
            "
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={handleCancel}
            disabled={saving || status === "cancelled"}
            className="
              bg-red-600 hover:bg-red-700
              text-white px-6 py-2.5 rounded-xl
              font-medium transition disabled:opacity-50
            "
          >
            Cancel Interview
          </button>
        </div>
      </div>
    </div>
  );
}
