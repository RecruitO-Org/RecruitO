import { useEffect, useState } from "react";
import CompanyLayout from "./CompanyLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { api } from "../../lib/api";

interface ApplicationData {
  id: number;
  job_title: string | null;
  status: string;
  match_score: number | null;
  created_at: string;
}

interface JobData {
  id: number;
  title: string;
  applicant_count?: number;
}

interface ChartPoint {
  label: string;
  value: number;
}

export default function Analytics() {
  const [applicationTrend, setApplicationTrend] = useState<ChartPoint[]>([]);
  const [jobPerformance, setJobPerformance] = useState<ChartPoint[]>([]);
  const [matchDistribution, setMatchDistribution] = useState<
    { name: string; value: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [insightText, setInsightText] = useState("");
  const [jobInsightText, setJobInsightText] = useState("");

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.get<ApplicationData[]>("/applications").catch(() => []),
      api.get<JobData[]>("/jobs").catch(() => []),
    ])
      .then(([apps, jobs]) => {
        if (!mounted) return;

        // Applications trend by month (last 6 months)
        const byMonth = new Map<string, number>();
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = d.toLocaleString("en", { month: "short" });
          byMonth.set(key, 0);
        }
        apps.forEach((app) => {
          const d = new Date(app.created_at);
          const key = d.toLocaleString("en", { month: "short" });
          if (byMonth.has(key)) byMonth.set(key, (byMonth.get(key) || 0) + 1);
        });
        setApplicationTrend(
          Array.from(byMonth.entries()).map(([label, value]) => ({
            label,
            value,
          }))
        );

        // Applicants per job
        setJobPerformance(
          jobs.map((job) => ({
            label: job.title,
            value: job.applicant_count ?? 0,
          }))
        );

        // Match score distribution
        const scored = apps.filter((a) => a.match_score != null);
        const high = scored.filter((a) => (a.match_score || 0) >= 80).length;
        const mid = scored.filter(
          (a) => (a.match_score || 0) >= 60 && (a.match_score || 0) < 80
        ).length;
        const low = scored.filter((a) => (a.match_score || 0) < 60).length;
        setMatchDistribution([
          { name: "80-100%", value: high },
          { name: "60-79%", value: mid },
          { name: "Below 60%", value: low },
        ]);

        const total = apps.length;
        if (total === 0) {
          setInsightText("No application data yet. Applications will appear here once candidates start applying.");
          setJobInsightText("Post your first job to start tracking demand across roles.");
        } else {
          setInsightText(
            `Your team has received ${total} application${total === 1 ? "" : "s"} across the tracked period.`
          );
          const topJob = jobPerformance.length
            ? jobPerformance.reduce((a, b) => (b.value > a.value ? b : a))
            : null;
          setJobInsightText(
            topJob && topJob.value > 0
              ? `${topJob.label} is attracting the most applicants (${topJob.value}).`
              : "Job-level demand will appear here as candidates apply."
          );
        }
      })
      .catch((e) => {
        if (mounted)
          setError(e instanceof Error ? e.message : "Failed to load analytics");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const hasNoData =
    applicationTrend.every((p) => p.value === 0) &&
    matchDistribution.every((p) => p.value === 0);

  return (
    <CompanyLayout>
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Page Title */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Recruitment Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor hiring trends, candidate quality, and role demand.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        {loading && (
          <p className="text-gray-500 dark:text-gray-400">
            Loading analytics...
          </p>
        )}

        {!loading && hasNoData && (
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400">
            No analytics data yet. Once candidates apply to your jobs, trends
            will appear here.
          </div>
        )}

        {/* ================= Applications Trend ================= */}
        {!loading && (
        <Card>
          <SectionHeader
            title="Applications Over Time"
            desc="Track monthly growth in candidate applications to identify hiring trends."
          />

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={applicationTrend.map((p) => ({ name: p.label, applications: p.value }))}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="name"
                  stroke="#6B7280"
                  className="dark:stroke-gray-400"
                />
                <YAxis
                  stroke="#6B7280"
                  className="dark:stroke-gray-400"
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#6366F1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <InsightBox color="indigo">
            📈 {insightText}
          </InsightBox>
        </Card>
        )}

        {/* ================= Job Performance ================= */}
        {!loading && (
        <Card>
          <SectionHeader
            title="Applicants Per Job Role"
            desc="Compare demand across different job positions."
          />

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobPerformance.map((p) => ({ name: p.label, applicants: p.value }))}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="name"
                  stroke="#6B7280"
                  className="dark:stroke-gray-400"
                />
                <YAxis
                  stroke="#6B7280"
                  className="dark:stroke-gray-400"
                />
                <Tooltip />
                <Bar
                  dataKey="applicants"
                  fill="#3B82F6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <InsightBox color="blue">
            💼 {jobInsightText}
          </InsightBox>
        </Card>
        )}

        {/* ================= Match Distribution ================= */}
        {!loading && (
        <Card>
          <SectionHeader
            title="Candidate Match Score Distribution"
            desc="Breakdown of applicants based on how well they match job requirements."
          />

          <div className="h-80 flex justify-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={matchDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {matchDistribution.map((_entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-8 text-sm">
            <Legend color="green" text="80–100% (Highly Matched)" />
            <Legend color="yellow" text="60–79% (Moderate Match)" />
            <Legend color="red" text="Below 60% (Low Match)" />
          </div>

          <InsightBox color="green">
            ✅ Match scores appear once candidate-resume scoring is implemented.
          </InsightBox>
        </Card>
        )}

      </div>
    </CompanyLayout>
  );
}

/* ================= Reusable Components ================= */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-6 shadow-sm">
      {children}
    </div>
  );
}

function SectionHeader({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div>
      <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
        {desc}
      </p>
    </div>
  );
}

function InsightBox({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "indigo" | "blue" | "green";
}) {
  const base =
    "rounded-lg p-4 text-sm border";

  const styles = {
    indigo:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-600/10 dark:text-indigo-300 dark:border-indigo-500/20",
    blue:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-300 dark:border-blue-500/20",
    green:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-300 dark:border-green-500/20",
  };

  return <div className={`${base} ${styles[color]}`}>{children}</div>;
}

function Legend({
  color,
  text,
}: {
  color: "green" | "yellow" | "red";
  text: string;
}) {
  const colors = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
      <span className={`w-3 h-3 rounded-full ${colors[color]}`} />
      {text}
    </div>
  );
}
