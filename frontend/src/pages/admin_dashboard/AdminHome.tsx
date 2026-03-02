import { Button } from "@/components/ui/button";

export default function AdminHome() {
  return (
    <div className="space-y-12">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Overview
          </h1>
          <p className="text-white/50 mt-2">
            Monitor hiring pipeline and system performance.
          </p>
        </div>

        <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
          + Create Job
        </Button>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid md:grid-cols-4 gap-6">

        {[
          { label: "Active Jobs", value: "12" },
          { label: "Total Applications", value: "248" },
          { label: "Interviews Scheduled", value: "32" },
          { label: "Candidates Hired", value: "18" },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl 
            bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl
            transition-all duration-300 ease-out
            hover:scale-[1.05] hover:-translate-y-2
            hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]
            hover:ring-1 hover:ring-violet-500/20"
          >
            <p className="text-white/50">{stat.label}</p>
            <h2 className="text-4xl font-bold mt-3">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* ================= MAIN PANELS ================= */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* AI Health Panel */}
        <div className="p-8 rounded-3xl 
        bg-gradient-to-br from-violet-600/10 to-blue-600/5
        border border-white/10 backdrop-blur-xl shadow-xl
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)]
        hover:ring-1 hover:ring-violet-500/20">

          <h2 className="text-xl font-semibold mb-6">
            AI Hiring Health
          </h2>

          {[
            { name: "Candidate Quality", value: 85 },
            { name: "Interview Conversion", value: 72 },
            { name: "Hiring Efficiency", value: 63 },
          ].map((metric, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>{metric.name}</span>
                <span>{metric.value}%</span>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="p-8 rounded-3xl 
        bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(255,255,255,0.08)]
        hover:ring-1 hover:ring-white/20">

          <h2 className="text-xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4 text-sm text-white/70">

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              Rahul shortlisted for Frontend role
            </div>

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              New AI Engineer application received
            </div>

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              Interview scheduled with Priya
            </div>

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              Backend Developer position closed
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}