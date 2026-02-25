import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Insight {
  name: string;
  role: string;
  aiScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export default function AIInsights() {
  const [search, setSearch] = useState("");

  const insights: Insight[] = [
    {
      name: "Rahul Mehta",
      role: "Frontend Developer",
      aiScore: 88,
      strengths: ["Strong React fundamentals", "Clean UI logic"],
      weaknesses: ["Limited backend exposure"],
      recommendation: "Proceed to Technical Round 2",
    },
    {
      name: "Priya Sharma",
      role: "React Developer",
      aiScore: 76,
      strengths: ["Redux expertise", "System design clarity"],
      weaknesses: ["Performance optimization needed"],
      recommendation: "Schedule System Design Round",
    },
    {
      name: "Aman Verma",
      role: "AI Engineer",
      aiScore: 92,
      strengths: ["Strong ML concepts", "Model deployment experience"],
      weaknesses: ["Communication skills average"],
      recommendation: "Highly Recommended",
    },
  ];

  // ================= FILTER =================
  const filteredInsights = useMemo(() => {
    return insights.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const scoreColor = (score: number) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          AI Candidate Insights
        </h1>
        <p className="text-gray-400">
          AI-powered resume analysis and hiring recommendations
        </p>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search candidate or role..."
        className="w-full md:w-1/2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder:text-gray-400"
      />

      {/* ================= INSIGHT CARDS ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {filteredInsights.length === 0 && (
          <p className="text-gray-400">No insights found.</p>
        )}

        {filteredInsights.map((candidate, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md hover:scale-[1.02] transition-all"
          >
            {/* Top */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {candidate.name}
                </h2>
                <p className="text-gray-400">{candidate.role}</p>
              </div>

              <div
                className={`text-lg font-bold ${scoreColor(
                  candidate.aiScore
                )}`}
              >
                {candidate.aiScore}% Score
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-3">
              <p className="text-sm font-semibold text-green-400 mb-1">
                Strengths
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                {candidate.strengths.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-red-400 mb-1">
                Weaknesses
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                {candidate.weaknesses.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Recommendation */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-violet-400 font-semibold">
                {candidate.recommendation}
              </p>

              <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
                View Full Report
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}