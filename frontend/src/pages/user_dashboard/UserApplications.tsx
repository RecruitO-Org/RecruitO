import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../lib/api";

interface ApplicationData {
  id: number;
  job_id: number;
  status: string;
  match_score: number | null;
  created_at: string;
  job_title: string | null;
  company_name: string | null;
}

interface SkillGapItem {
  skill: string;
  recommendation: string;
}

interface SkillGapReport {
  application_id: number;
  job_id: number;
  job_title: string | null;
  company_name: string | null;
  required_skills: string[];
  matched_skills: string[];
  missing_skills: SkillGapItem[];
  matched_count: number;
  missing_count: number;
  coverage_percent: number;
  summary: string;
}

export default function UserApplications() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [skipGaps, setSkillGaps] = useState<Record<number, SkillGapReport | null>>({});
  const [gapErrors, setGapErrors] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<ApplicationData[]>("/applications")
      .then(async (apps) => {
        setApplications(apps);
        // Fetch the skill-gap report for each application alongside the list.
        const results = await Promise.all(
          apps.map(async (app) => {
            const id = app.id;
            try {
              const report = await api.get<SkillGapReport>(
                `/applications/${id}/skill-gap`
              );
              return { id, report, gapError: null };
            } catch (e) {
              return {
                id,
                report: null,
                gapError: e instanceof Error ? e.message : "No analysis available",
              };
            }
          })
        );
        const gaps: Record<number, SkillGapReport | null> = {};
        const errs: Record<number, string> = {};
        results.forEach((r) => {
          gaps[r.id] = r.report;
          if (r.gapError) errs[r.id] = r.gapError;
        });
        setSkillGaps(gaps);
        setGapErrors(errs);
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load applications")
      )
      .finally(() => setLoading(false));
  }, []);

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const gapColor = (coverage: number) => {
    if (coverage >= 80) return "text-green-400";
    if (coverage >= 50) return "text-yellow-400";
    return "text-orange-400";
  };

  const gapBarColor = (coverage: number) => {
    if (coverage >= 80) return "bg-green-500";
    if (coverage >= 50) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">My Applications</h1>
        <p className="text-white/50 mt-2">
          Track the roles you've applied for and your ATS match score
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && <p className="text-white/50">Loading applications...</p>}

      {!loading && applications.length === 0 && (
        <p className="text-white/50">
          You haven't applied to any jobs yet. Browse jobs to get started.
        </p>
      )}

      {!loading && applications.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((app, index) => {
            const gap = skipGaps[app.id];
            const gapError =
              gapErrors[app.id] ?? (app.match_score == null ? undefined : null);

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {app.job_title || "Role"}
                    </h2>
                    <p className="text-white/60 text-sm">
                      {app.company_name || "Company"}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 capitalize">
                    {app.status}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-white/50 text-sm">
                    Applied{" "}
                    {new Date(app.created_at).toLocaleDateString()}
                  </span>

                  <div className="text-right">
                    <span className="text-white/50 text-sm block">
                      ATS Match
                    </span>
                    <span className={`text-2xl font-bold ${scoreColor(app.match_score ?? 0)}`}>
                      {app.match_score != null ? `${app.match_score}%` : "N/A"}
                    </span>
                    {app.match_score == null && (
                      <p className="text-white/40 text-xs mt-1">
                        Upload a resume to get scored.
                      </p>
                    )}
                  </div>
                </div>

                {app.match_score != null && (
                  <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${
                        (app.match_score ?? 0) >= 80
                          ? "bg-green-500"
                          : (app.match_score ?? 0) >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${app.match_score ?? 0}%` }}
                    />
                  </div>
                )}

                {/* SKILL GAP ANALYSIS */}
                {gap ? (
                  <div className="mt-5 p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-violet-300">
                        Skill Gap Analysis
                      </h3>
                      <span className={`text-lg font-bold ${gapColor(gap.coverage_percent)}`}>
                        {gap.coverage_percent}%
                      </span>
                    </div>

                    <p className="text-white/60 text-xs mb-3">{gap.summary}</p>

                    {/* Coverage bar */}
                    <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${gapBarColor(gap.coverage_percent)}`}
                        style={{ width: `${gap.coverage_percent}%` }}
                      />
                    </div>

                    {/* Matched skills */}
                    <div className="mb-3">
                      <p className="text-xs text-green-400 font-medium mb-1">
                        Matched Skills ({gap.matched_count})
                      </p>
                      {gap.matched_skills.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {gap.matched_skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 text-xs rounded-full bg-green-500/15 text-green-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white/40 text-xs">
                          No required skills matched yet.
                        </p>
                      )}
                    </div>

                    {/* Missing skills */}
                    {gap.missing_skills.length > 0 && (
                      <div>
                        <p className="text-xs text-orange-400 font-medium mb-1">
                          Missing Skills ({gap.missing_count})
                        </p>
                        <ul className="space-y-1.5">
                          {gap.missing_skills.map((item, i) => (
                            <li
                              key={i}
                              className="text-xs text-white/70 bg-orange-500/10 border border-orange-500/20 rounded-lg px-2.5 py-1.5"
                            >
                              <span className="font-semibold text-orange-300">
                                {item.skill}
                              </span>
                              <span className="block text-white/50 mt-0.5">
                                {item.recommendation}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : gapError ? (
                  <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs">
                    {gapError}
                  </div>
                ) : (
                  <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs">
                    Loading skill gap analysis...
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
}
