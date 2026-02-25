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

export default function Interviews() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const interviews = [
    {
      name: "Rahul Mehta",
      role: "Frontend Developer",
      date: "28 Feb 2026",
      time: "10:00 AM",
      mode: "Online",
      type: "Technical",
      status: "Scheduled",
    },
    {
      name: "Priya Sharma",
      role: "React Developer",
      date: "1 Mar 2026",
      time: "2:00 PM",
      mode: "Offline",
      type: "HR",
      status: "Completed",
    },
    {
      name: "Aman Verma",
      role: "AI Engineer",
      date: "3 Mar 2026",
      time: "11:30 AM",
      mode: "Online",
      type: "Technical",
      status: "Cancelled",
    },
  ];

  // ================= FILTER =================
  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const matchesSearch =
        interview.name.toLowerCase().includes(search.toLowerCase()) ||
        interview.role.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        type === "All" || interview.type === type;

      return matchesSearch && matchesType;
    });
  }, [search, type]);

  const statusColor = (status: string) => {
    if (status === "Completed")
      return "bg-green-500/20 text-green-400";
    if (status === "Cancelled")
      return "bg-red-500/20 text-red-400";
    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">
          Scheduled Interviews
        </h1>
        <p className="text-gray-400">
          Manage and track all candidate interviews
        </p>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search candidate or role..."
          className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder:text-gray-400"
        />

        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[200px] rounded-xl bg-white/5 border border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-[#0f172a] border border-white/10 text-white">
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
          </SelectContent>
        </Select>

        <Button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
          Filter
        </Button>
      </div>

      {/* ================= INTERVIEW CARDS ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {filteredInterviews.length === 0 && (
          <p className="text-gray-400">No interviews found.</p>
        )}

        {filteredInterviews.map((interview, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all backdrop-blur-md"
          >
            {/* Top */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {interview.name}
                </h2>
                <p className="text-gray-400">
                  {interview.role} • {interview.type}
                </p>
              </div>

              <div
                className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor(
                  interview.status
                )}`}
              >
                {interview.status}
              </div>
            </div>

            {/* Details */}
            <p className="text-sm text-gray-400 mb-2">
              📅 {interview.date} • ⏰ {interview.time}
            </p>

            <p className="text-sm text-gray-400 mb-4">
              📍 Mode: {interview.mode}
            </p>

            {/* Buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Reschedule
              </Button>

              {interview.mode === "Online" && (
                <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
                  Join Meeting
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}