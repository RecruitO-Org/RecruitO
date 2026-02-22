import { motion } from "framer-motion";

export default function AdminHome(): JSX.Element {
const stats = [
{ title: "Total Users", value: 1248 },
{ title: "Companies", value: 86 },
{ title: "Active Jobs", value: 312 },
{ title: "Applications Today", value: 47 },
];

const alerts = [
{ label: "Pending User Verification", value: 12 },
{ label: "Company Approvals", value: 5 },
{ label: "Reported Jobs", value: 3 },
{ label: "Cheating Alerts", value: 2 },
];

const activity = [
"User flagged for tab switching",
"Company awaiting approval",
"Low resume match detected",
"Interview completed successfully",
];

const card =
"rounded-3xl border backdrop-blur-xl transition";

return ( <div className="space-y-10">

  {/* Header */}
  <div>
    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
    <p className="opacity-60 mt-2">
      Monitor platform activity and moderation.
    </p>
  </div>

  {/* Stats */}
  <div className="grid md:grid-cols-4 gap-6">
    {stats.map((s, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -6 }}
        className={`${card}
        bg-white border-slate-200 shadow-lg
        dark:bg-white/5 dark:border-white/10 p-8`}
      >
        <p className="opacity-60">{s.title}</p>
        <h2 className="text-4xl font-bold mt-2">{s.value}</h2>
      </motion.div>
    ))}
  </div>

  {/* Alerts */}
  <div className="grid md:grid-cols-4 gap-6">
    {alerts.map((a, i) => (
      <div
        key={i}
        className="p-6 rounded-2xl bg-red-50 border border-red-200
        dark:bg-red-500/10 dark:border-red-400/20"
      >
        <p className="text-red-600 dark:text-red-300 text-sm">{a.label}</p>
        <p className="text-2xl font-bold">{a.value}</p>
      </div>
    ))}
  </div>

  {/* Activity + Actions */}
  <div className="grid md:grid-cols-2 gap-6">

    <div className={`${card}
    bg-white border-slate-200 shadow-lg
    dark:bg-white/5 dark:border-white/10 p-8`}>
      <h2 className="font-semibold mb-4">Live Activity</h2>
      <ul className="space-y-2 text-sm opacity-70">
        {activity.map((a, i) => (
          <li key={i}>• {a}</li>
        ))}
      </ul>
    </div>

    <div className={`${card}
    bg-white border-slate-200 shadow-lg
    dark:bg-white/5 dark:border-white/10 p-8`}>
      <h2 className="font-semibold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 rounded-xl bg-violet-500 text-white">
          Verify Users
        </button>
        <button className="p-4 rounded-xl bg-cyan-500 text-white">
          Review Companies
        </button>
        <button className="p-4 rounded-xl bg-green-500 text-white">
          Moderate Jobs
        </button>
        <button className="p-4 rounded-xl bg-orange-500 text-white">
          Interviews
        </button>
      </div>
    </div>
  </div>

  {/* AI Insight */}
  <div className={`${card}
  bg-gradient-to-r from-violet-100 to-cyan-100 border-slate-200 shadow-lg
  dark:from-violet-500/10 dark:to-cyan-500/10 dark:border-white/10 p-8`}>
    <h2 className="font-semibold mb-3">AI Skill Insight</h2>
    <p className="text-sm opacity-70">
      React and DSA are the most lacking skills among applicants.
    </p>
  </div>
</div>


);
}
