import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

export default function Applications() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const applications = [
    {
      name: "Rahul Mehta",
      role: "Frontend Developer",
      experience: "2 Years",
      status: "Pending",
      match: 82,
    },
    {
      name: "Priya Sharma",
      role: "React Developer",
      experience: "3 Years",
      status: "Shortlisted",
      match: 88,
    },
    {
      name: "Aman Verma",
      role: "AI Engineer",
      experience: "1.5 Years",
      status: "Rejected",
      match: 65,
    },
  ];

  // ================= FILTER LOGIC =================
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.role.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || app.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const statusColor = (status: string) => {
    if (status === "Shortlisted")
      return "bg-green-500/20 text-green-400";
    if (status === "Rejected")
      return "bg-red-500/20 text-red-400";
    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">
          Candidate Applications
        </h1>
        <p className="text-gray-400">
          Review and manage all incoming job applications
        </p>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search candidate or role..."
          className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder:text-gray-400"
        />

        {/* Status Filter */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[200px] rounded-xl bg-white/5 border border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-[#0f172a] border border-white/10 text-white">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Shortlisted">Shortlisted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
          Filter
        </Button>
      </div>

      {/* ================= APPLICATION CARDS ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {filteredApplications.length === 0 && (
          <p className="text-gray-400">No applications found.</p>
        )}

        {filteredApplications.map((app, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all backdrop-blur-md"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {app.name}
                </h2>
                <p className="text-gray-400">
                  {app.role} • {app.experience}
                </p>
              </div>

              <div
                className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor(
                  app.status
                )}`}
              >
                {app.status}
              </div>
            </div>

            {/* Match Score */}
            <p className="mb-4 text-sm text-violet-400 font-semibold">
              {app.match}% AI Match
            </p>

            {/* Buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                View Resume
              </Button>

              <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
                Schedule Interview
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}