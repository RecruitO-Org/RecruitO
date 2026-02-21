import { motion } from "framer-motion";

export default function AdminHome() {
  const stats = [
    { title: "Total Users", value: 1248, color: "violet" },
    { title: "Total Companies", value: 86, color: "cyan" },
    { title: "Active Jobs", value: 312, color: "green" },
    { title: "Applications Today", value: 47, color: "orange" },
  ];

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Admin Dashboard
        </h1>
        <p className="text-white/50 mt-2">
          Monitor RecruitO platform performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
          >
            <p className="text-white/60">{stat.title}</p>
            <h2 className="text-4xl font-bold mt-2 text-white">
              {stat.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-6">
          Platform Activity
        </h2>

        <div className="space-y-4 text-white/70 text-sm">
          <p>• 3 new companies registered today</p>
          <p>• 14 new job postings</p>
          <p>• 2 reported job listings pending review</p>
        </div>
      </div>
    </div>
  );
}