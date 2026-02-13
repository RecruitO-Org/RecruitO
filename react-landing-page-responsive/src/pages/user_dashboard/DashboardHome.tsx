import { Button } from "@/components/ui/button";

export default function DashboardHome() {
  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back, Shrey 👋
        </h1>
        <p className="text-white/50 mt-2">
          Track your job applications, interviews and profile growth.
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Profile Strength */}
        <div className="p-8 rounded-3xl 
        bg-gradient-to-br from-violet-600/20 to-blue-600/10 
        border border-white/10 backdrop-blur-xl shadow-2xl
        transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-2 
        hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]
        hover:ring-1 hover:ring-violet-500/30">

          <p className="text-white/60">Profile Strength</p>
          <h2 className="text-4xl font-bold mt-2">78%</h2>

          <div className="mt-4 w-full bg-white/10 rounded-full h-3">
            <div className="h-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 w-[78%]" />
          </div>
        </div>

        {/* AI Match Score */}
        <div className="p-8 rounded-3xl 
        bg-gradient-to-br from-blue-600/20 to-cyan-500/10 
        border border-white/10 backdrop-blur-xl shadow-2xl
        transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]
        hover:ring-1 hover:ring-blue-400/30">

          <p className="text-white/60">AI Match Score</p>
          <h2 className="text-4xl font-bold mt-2 text-blue-400">65%</h2>

          <p className="text-sm text-white/50 mt-3">
            Improve your skills to increase job matches.
          </p>
        </div>

        {/* Interviews */}
        <div className="p-8 rounded-3xl 
        bg-gradient-to-br from-green-500/20 to-emerald-500/10 
        border border-white/10 backdrop-blur-xl shadow-2xl
        transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(34,197,94,0.25)]
        hover:ring-1 hover:ring-green-400/30">

          <p className="text-white/60">Upcoming Interviews</p>
          <h2 className="text-4xl font-bold mt-2">1</h2>

          <p className="text-sm text-white/50 mt-3">
            Next: TechNova - 18 Feb, 11:00 AM
          </p>
        </div>
      </div>

      {/* ================= APPLICATION OVERVIEW ================= */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Recent Applications */}
        <div className="p-8 rounded-3xl 
        bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl
        transition-all duration-300 ease-out
        hover:scale-[1.03] hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(255,255,255,0.08)]
        hover:ring-1 hover:ring-white/20">

          <h2 className="text-xl font-semibold mb-6">
            Recent Applications
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 transition-all hover:bg-white/10">
              <div>
                <p className="font-medium">Frontend Developer</p>
                <p className="text-sm text-white/50">TechNova</p>
              </div>
              <span className="text-yellow-400 text-sm">
                Under Review
              </span>
            </div>

            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 transition-all hover:bg-white/10">
              <div>
                <p className="font-medium">React Developer</p>
                <p className="text-sm text-white/50">CodeCraft</p>
              </div>
              <span className="text-green-400 text-sm">
                Shortlisted
              </span>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="p-8 rounded-3xl 
        bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl
        transition-all duration-300 ease-out
        hover:scale-[1.03] hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(255,255,255,0.08)]
        hover:ring-1 hover:ring-white/20">

          <h2 className="text-xl font-semibold mb-6">
            Insights & Suggestions
          </h2>

          <ul className="space-y-4 text-white/70 text-sm">
            <li>• Add 2 more projects to improve profile strength.</li>
            <li>• Update resume for React 18 keywords.</li>
            <li>• Complete skill assessment for 12% more matches.</li>
          </ul>

          <Button className="mt-6">
            Improve Profile
          </Button>
        </div>
      </div>

    </div>
  );
}