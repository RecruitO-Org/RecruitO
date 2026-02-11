import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Internships() {
  const [search, setSearch] = useState("");

  const internships = [
    {
      title: "Frontend Intern",
      company: "TechNova",
      location: "Remote",
      stipend: "₹12,000 / month",
      duration: "3 Months",
      match: 85,
      skills: ["React", "HTML", "CSS"],
    },
    {
      title: "AI/ML Intern",
      company: "FutureMind AI",
      location: "Hyderabad",
      stipend: "₹18,000 / month",
      duration: "6 Months",
      match: 72,
      skills: ["Python", "Machine Learning", "Data Analysis"],
    },
    {
      title: "Backend Intern",
      company: "CodeCraft",
      location: "Bangalore",
      stipend: "₹15,000 / month",
      duration: "4 Months",
      match: 78,
      skills: ["Node.js", "MongoDB", "APIs"],
    },
  ];

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Explore Internships
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          AI-matched internships based on your skills & resume
        </p>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search internships..."
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

      {/* ================= INTERNSHIP CARDS ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {internships.map((intern, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
          >

            {/* Top Section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {intern.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {intern.company} • {intern.location}
                </p>
              </div>

              <div className="text-sm font-semibold text-violet-500">
                {intern.match}% Match
              </div>
            </div>

            {/* Stipend + Duration */}
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              💰 {intern.stipend}
            </p>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              ⏳ {intern.duration}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {intern.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-300"
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