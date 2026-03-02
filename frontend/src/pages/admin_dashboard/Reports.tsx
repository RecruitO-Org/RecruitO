import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Reports() {
  const stats = [
    { title: "Total Applications", value: 248 },
    { title: "Interviews Conducted", value: 76 },
    { title: "Candidates Hired", value: 18 },
    { title: "Avg. Hiring Time", value: "12 Days" },
  ];

  const departments = [
    { name: "Frontend", hires: 8, percentage: 80 },
    { name: "Backend", hires: 5, percentage: 60 },
    { name: "AI / ML", hires: 3, percentage: 40 },
    { name: "HR", hires: 2, percentage: 50 },
  ];

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Recruitment Reports
        </h1>
        <p className="text-gray-400">
          Overview of hiring performance and analytics
        </p>
      </div>

      {/* ================= KPI STATS ================= */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-xl backdrop-blur-md"
          >
            <p className="text-gray-400 text-sm">{stat.title}</p>
            <h2 className="text-2xl font-bold text-white mt-2">
              {stat.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* ================= HIRING BY DEPARTMENT ================= */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-6">
          Hiring by Department
        </h2>

        <div className="space-y-6">
          {departments.map((dept, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>{dept.name}</span>
                <span>{dept.hires} Hires</span>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dept.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="h-full bg-gradient-to-r from-violet-600 to-blue-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= EXPORT SECTION ================= */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-violet-600/20 to-blue-600/20 border border-white/10 rounded-2xl p-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Export Detailed Reports
          </h3>
          <p className="text-gray-400 text-sm">
            Download analytics in PDF or CSV format
          </p>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Download CSV
          </Button>

          <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}