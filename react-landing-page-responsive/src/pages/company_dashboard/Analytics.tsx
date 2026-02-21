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

export default function Analytics() {
  const applicationTrend = [
    { month: "Jan", applications: 40 },
    { month: "Feb", applications: 65 },
    { month: "Mar", applications: 90 },
    { month: "Apr", applications: 70 },
    { month: "May", applications: 120 },
    { month: "Jun", applications: 150 },
  ];

  const jobPerformance = [
    { job: "Frontend", applicants: 120 },
    { job: "Backend", applicants: 95 },
    { job: "AI Engineer", applicants: 60 },
  ];

  const matchDistribution = [
    { name: "80-100%", value: 120 },
    { name: "60-79%", value: 80 },
    { name: "Below 60%", value: 50 },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

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

        {/* ================= Applications Trend ================= */}
        <Card>
          <SectionHeader
            title="Applications Over Time"
            desc="Track monthly growth in candidate applications to identify hiring trends."
          />

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={applicationTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="month"
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
            📈 Applications have steadily increased over the last 3 months,
            indicating rising interest in open roles.
          </InsightBox>
        </Card>

        {/* ================= Job Performance ================= */}
        <Card>
          <SectionHeader
            title="Applicants Per Job Role"
            desc="Compare demand across different job positions."
          />

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobPerformance}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="job"
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
            💼 Frontend roles are currently attracting the highest number of applicants.
          </InsightBox>
        </Card>

        {/* ================= Match Distribution ================= */}
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
                  {matchDistribution.map((entry, index) => (
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
            ✅ A majority of applicants fall in the high-match category,
            improving hiring efficiency.
          </InsightBox>
        </Card>

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
