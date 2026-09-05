import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { api } from "../../lib/api";

interface JobData {
  id: number;
  title: string;
  company_name: string | null;
  location: string | null;
  type: string | null;
  experience: string | null;
  salary: string | null;
  skills: string[];
  vacancies: number;
  description: string | null;
  deadline: string | null;
  status: string;
  posted_on: string;
}

interface ApplicationData {
  job_id: number;
}

export default function Internships() {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get<JobData[]>("/jobs"),
      api.get<ApplicationData[]>("/applications").catch(() => []),
    ])
      .then(([jobsData, appsData]) => {
        const internships = jobsData.filter(
          (j) =>
            j.type?.toLowerCase().includes("intern") ||
            j.title.toLowerCase().includes("intern")
        );
        setJobs(internships.length > 0 ? internships : jobsData);
        setApplications(appsData);
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load internships")
      )
      .finally(() => setLoading(false));
  }, []);

  const appliedJobIds = useMemo(
    () => new Set(applications.map((a) => a.job_id)),
    [applications]
  );

  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [applyMessage, setApplyMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleApply = async (jobId: number) => {
    setApplyingId(jobId);
    setApplyMessage(null);
    try {
      const result = await api.post<ApplicationData>("/applications", {
        job_id: jobId,
      });
      setApplications((prev) => [...prev, result]);
      setApplyMessage({ type: "success", text: "Application submitted!" });
      setTimeout(() => setApplyMessage(null), 3000);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to apply";
      setApplyMessage({ type: "error", text: msg });
      setTimeout(() => setApplyMessage(null), 4000);
    } finally {
      setApplyingId(null);
    }
  };

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.state ||
            "Remote";
          setLocation(city);
        } catch {
          alert("Failed to detect location");
        } finally {
          setDetecting(false);
        }
      },
      () => {
        alert("Location access denied");
        setDetecting(false);
      }
    );
  };

  const locations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.location) set.add(j.location);
    });
    return Array.from(set).sort();
  }, [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        (job.company_name || "").toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));
      const matchesLocation =
        location === "All Locations" ||
        job.location === location ||
        job.location === "Remote";
      return matchesSearch && matchesLocation;
    });
  }, [search, location, jobs]);

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold mb-2 text-white">
          Explore Internships
        </h1>
        <p className="text-gray-400">Loading internships...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">
          Explore Internships
        </h1>
        <p className="text-gray-400">
          Browse internship and entry-level positions
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {applyMessage && (
        <div
          className={`p-4 rounded-xl text-sm ${
            applyMessage.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {applyMessage.text}
        </div>
      )}

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search internships..."
          className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder:text-gray-400"
        />

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger
            className={`w-[220px] rounded-xl bg-white/5 border border-white/10 text-white 
            ${location !== "All Locations" ? "ring-2 ring-violet-500/40" : ""}`}
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-[#0f172a] border border-white/10 text-white">
            <SelectItem value="All Locations" className="text-white focus:bg-white/10">
              All Locations
            </SelectItem>
            <SelectItem value="Remote" className="text-white focus:bg-white/10">
              Remote
            </SelectItem>
            {locations
              .filter((l) => l !== "Remote")
              .map((loc) => (
                <SelectItem key={loc} value={loc} className="text-white focus:bg-white/10">
                  {loc}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={detectLocation}
          disabled={detecting}
          className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
        >
          {detecting ? "Detecting..." : "Detect Location"}
        </Button>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.length === 0 && (
          <p className="text-gray-400">
            {jobs.length === 0
              ? "No internship listings available yet."
              : "No internships match your search."}
          </p>
        )}

        {filtered.map((job, index) => {
          const alreadyApplied = appliedJobIds.has(job.id);
          const isApplying = applyingId === job.id;

          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all backdrop-blur-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {job.title}
                  </h2>
                  <p className="text-gray-400">
                    {job.company_name || "Unknown Company"} •{" "}
                    {job.location || "Not specified"}
                  </p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                  {job.status}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-400">
                {job.salary && <p>Stipend/Salary: {job.salary}</p>}
                {job.type && <p>Type: {job.type}</p>}
                {job.experience && <p>Experience: {job.experience}</p>}
                {job.vacancies > 0 && <p>Openings: {job.vacancies}</p>}
              </div>

              {job.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-violet-600/20 text-violet-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {job.description && (
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {job.description}
                </p>
              )}

              <div className="text-xs text-gray-500 mb-4">
                Posted: {new Date(job.posted_on).toLocaleDateString()}
                {job.deadline &&
                  ` • Deadline: ${new Date(job.deadline).toLocaleDateString()}`}
              </div>

              <div className="flex justify-end">
                {alreadyApplied ? (
                  <span className="px-4 py-2 text-sm text-green-400">
                    Applied
                  </span>
                ) : (
                  <Button
                    onClick={() => handleApply(job.id)}
                    disabled={isApplying}
                    className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90"
                  >
                    {isApplying ? "Applying..." : "Apply Now"}
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
