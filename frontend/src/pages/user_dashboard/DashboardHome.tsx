import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { api } from "../../lib/api";

interface ProfileData {
  name: string;
  phone: string | null;
  category: string | null;
  skills: string[] | null;
}

interface ApplicationData {
  id: number;
  job_title: string | null;
  company_name: string | null;
  status: string;
  created_at: string;
}

function profileStrength(p: ProfileData): number {
  let score = 0;
  if (p.name) score += 25;
  if (p.phone) score += 25;
  if (p.category) score += 25;
  if (p.skills && p.skills.length > 0) score += 25;
  return score;
}

export default function DashboardHome() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<ProfileData>("/profile"),
      api.get<ApplicationData[]>("/applications").catch(() => []),
    ])
      .then(([profileData, appData]) => {
        setProfile(profileData);
        setApplications(appData);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const name = profile?.name || "there";
  const strength = profile ? profileStrength(profile) : 0;
  const totalApps = applications.length;
  const recentApps = applications.slice(0, 3);

  const statusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "text-yellow-400";
      case "shortlisted":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      case "interviewed":
        return "text-blue-400";
      case "accepted":
        return "text-green-400";
      default:
        return "text-white/50";
    }
  };

  if (loading) {
    return (
      <div className="space-y-10">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="text-white/50">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Welcome Back, {name} 👋</h1>
        <p className="text-white/50 mt-2">
          Track your job applications, interviews and profile growth.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Profile Strength */}
        <div
          className="p-8 rounded-3xl 
          bg-gradient-to-br from-violet-600/20 to-blue-600/10 
          border border-white/10 backdrop-blur-xl shadow-2xl
          transition-all duration-300 ease-out
          hover:scale-105 hover:-translate-y-2 
          hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]
          hover:ring-1 hover:ring-violet-500/30"
        >
          <p className="text-white/60">Profile Strength</p>
          <h2 className="text-4xl font-bold mt-2">{strength}%</h2>

          <div className="mt-4 w-full bg-white/10 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
              style={{ width: `${strength}%` }}
            />
          </div>
        </div>

        {/* Applications */}
        <div
          className="p-8 rounded-3xl 
          bg-gradient-to-br from-blue-600/20 to-cyan-500/10 
          border border-white/10 backdrop-blur-xl shadow-2xl
          transition-all duration-300 ease-out
          hover:scale-105 hover:-translate-y-2
          hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]
          hover:ring-1 hover:ring-blue-400/30"
        >
          <p className="text-white/60">Total Applications</p>
          <h2 className="text-4xl font-bold mt-2 text-blue-400">
            {totalApps}
          </h2>

          <p className="text-sm text-white/50 mt-3">
            Browse jobs to find more opportunities.
          </p>
        </div>

        {/* Quick Actions */}
        <div
          className="p-8 rounded-3xl 
          bg-gradient-to-br from-green-500/20 to-emerald-500/10 
          border border-white/10 backdrop-blur-xl shadow-2xl
          transition-all duration-300 ease-out
          hover:scale-105 hover:-translate-y-2
          hover:shadow-[0_20px_60px_rgba(34,197,94,0.25)]
          hover:ring-1 hover:ring-green-400/30"
        >
          <p className="text-white/60">Quick Actions</p>
          <div className="mt-4 space-y-3">
            <button
              onClick={() => navigate("/dashboard/jobs")}
              className="w-full text-left text-sm text-white/70 hover:text-white transition"
            >
              → Browse Jobs
            </button>
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="w-full text-left text-sm text-white/70 hover:text-white transition"
            >
              → Edit Profile
            </button>
            <button
              onClick={() => navigate("/dashboard/resume")}
              className="w-full text-left text-sm text-white/70 hover:text-white transition"
            >
              → Upload Resume
            </button>
          </div>
        </div>
      </div>

      {/* APPLICATION OVERVIEW */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Recent Applications */}
        <div
          className="p-8 rounded-3xl 
          bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl
          transition-all duration-300 ease-out
          hover:scale-[1.03] hover:-translate-y-1
          hover:shadow-[0_20px_50px_rgba(255,255,255,0.08)]
          hover:ring-1 hover:ring-white/20"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Applications</h2>

          {recentApps.length === 0 ? (
            <p className="text-white/40 text-sm">
              No applications yet. Browse jobs to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {recentApps.map((app) => (
                <div
                  key={app.id}
                  className="flex justify-between items-center p-4 rounded-xl bg-white/5 transition-all hover:bg-white/10"
                >
                  <div>
                    <p className="font-medium">{app.job_title || "Unknown Role"}</p>
                    <p className="text-sm text-white/50">
                      {app.company_name || "Unknown Company"}
                    </p>
                  </div>
                  <span className={`text-sm capitalize ${statusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Insights */}
        <div
          className="p-8 rounded-3xl 
          bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl
          transition-all duration-300 ease-out
          hover:scale-[1.03] hover:-translate-y-1
          hover:shadow-[0_20px_50px_rgba(255,255,255,0.08)]
          hover:ring-1 hover:ring-white/20"
        >
          <h2 className="text-xl font-semibold mb-6">Profile Tips</h2>

          <ul className="space-y-4 text-white/70 text-sm">
            {!profile?.phone && (
              <li>• Add your phone number to complete your profile.</li>
            )}
            {!profile?.category && (
              <li>• Select a career category to get better job matches.</li>
            )}
            {(!profile?.skills || profile.skills.length === 0) && (
              <li>• Add your skills to improve job matching.</li>
            )}
            {totalApps === 0 && (
              <li>• Start applying to jobs to track your progress here.</li>
            )}
            {profile?.phone && profile?.category && profile?.skills && profile.skills.length > 0 && totalApps > 0 && (
              <>
                <li>• Your profile is looking good!</li>
                <li>• Keep applying to more jobs.</li>
              </>
            )}
          </ul>

          <Button
            className="mt-6"
            onClick={() => navigate("/dashboard/profile")}
          >
            Improve Profile
          </Button>
        </div>
      </div>

    </div>
  );
}
