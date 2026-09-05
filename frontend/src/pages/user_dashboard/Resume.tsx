import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { api } from "../../lib/api";

interface ResumeData {
  id: number;
  user_id: number;
  original_filename: string;
  extension: string | null;
  uploaded_at: string;
}

export default function Resume() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api
      .get<ResumeData>("/resume")
      .then(setResume)
      .catch(() => setResume(null))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await api.upload<ResumeData>("/resume", formData);
      setResume(result);
      setMessage({ type: "success", text: "Resume uploaded successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setMessage({ type: "error", text: msg });
      setTimeout(() => setMessage(null), 4000);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const fileExt = resume?.extension?.toUpperCase() || "FILE";

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-14">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">
            Resume Management
          </h1>
          <p className="text-white/50 mt-3 text-lg">
            Upload your resume to apply for jobs
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* CURRENT RESUME CARD */}
      <div className="p-10 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#111827] border border-white/10 shadow-2xl">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Current Resume</h2>
            <p className="text-white/40 text-sm mt-1">
              {resume
                ? `Uploaded ${formatDate(resume.uploaded_at)}`
                : loading
                ? "Loading..."
                : "No resume uploaded yet"}
            </p>
          </div>

          {resume && (
            <span className="px-4 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              Uploaded
            </span>
          )}
        </div>

        {resume ? (
          <div className="flex justify-between items-center p-6 rounded-2xl bg-[#1f2937]">
            <div>
              <p className="text-lg font-medium">{resume.original_filename}</p>
              <p className="text-sm text-white/40">
                {fileExt} Format • Uploaded{" "}
                {new Date(resume.uploaded_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => fileRef.current?.click()}
                className="border-white/20 text-white hover:bg-white/10"
              >
                {uploading ? "Uploading..." : "Upload New"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-12 rounded-2xl bg-[#1f2937] border-2 border-dashed border-white/10">
            <p className="text-white/40 text-lg">No resume uploaded yet</p>
            <p className="text-white/30 text-sm">
              Upload a PDF, DOC, DOCX, or TXT file
            </p>
            <Button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg hover:scale-[1.03] transition-all"
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </Button>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {/* AI SECTIONS - Coming Soon */}
      <div className="p-10 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl text-center space-y-4">
        <h2 className="text-2xl font-semibold text-white/70">
          Resume Analysis
        </h2>
        <p className="text-white/40">
          ATS scoring, keyword analysis, and AI-powered suggestions coming soon.
        </p>
      </div>
    </div>
  );
}
