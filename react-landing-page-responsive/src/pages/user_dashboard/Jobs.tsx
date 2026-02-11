import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Jobs() {
  const [search, setSearch] = useState("");

  const jobs = [
    {
      title: "Frontend Developer",
      company: "TechNova",
      location: "Remote",
      salary: "₹6-10 LPA",
      match: 82,
      skills: ["React", "Tailwind", "API Integration"],
    },
    {
      title: "React Developer",
      company: "CodeCraft",
      location: "Bangalore",
      salary: "₹5-8 LPA",
      match: 75,
      skills: ["React", "Redux", "System Design"],
    },
    {
      title: "AI Engineer",
      company: "FutureMind AI",
      location: "Hyderabad",
      salary: "₹10-18 LPA",
      match: 68,
      skills: ["Python", "ML", "TensorFlow"],
    },
  ];

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Find Your Next Job</h1>
        <p className="text-gray-500 dark:text-gray-400">
          AI-curated opportunities based on your resume
        </p>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by role, company, skill..."
          className="flex-1 px-5 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <select className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/10">
          <option>All Locations</option>
          <option>Remote</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
        </select>

        <Button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600">
          Filter
        </Button>
      </div>

      {/* ================= JOB CARDS ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {jobs.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
          >

            {/* Top */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {job.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {job.company} • {job.location}
                </p>
              </div>

              <div className="text-sm font-semibold text-violet-500">
                {job.match}% Match
              </div>
            </div>

            {/* Salary */}
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              💰 {job.salary}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-violet-100 dark:bg-violet-600/20 text-violet-600 dark:text-violet-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center">
              <Button variant="outline">
                View Details
              </Button>

              <Button className="bg-gradient-to-r from-violet-600 to-blue-600">
                Apply Now
              </Button>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}