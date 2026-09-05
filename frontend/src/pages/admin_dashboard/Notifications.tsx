import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "../../lib/api";

interface Notification {
  id: number;
  title: string;
  description: string;
  type: "application" | "interview" | "system";
  time: string;
  read: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api
        .get<{
          id: number;
          applicant_name: string | null;
          job_title: string | null;
          status: string;
          created_at: string;
        }[]>("/admin/applications")
        .catch(() => []),
      api
        .get<{
          id: number;
          applicant_name: string | null;
          job_title: string | null;
          status: string;
          scheduled_at: string | null;
        }[]>("/interviews")
        .catch(() => []),
    ])
      .then(([apps, intervs]) => {
        if (!mounted) return;
        const appNotes: Notification[] = apps.slice(0, 10).map((a) => ({
          id: a.id,
          title: "New Application Received",
          description: `${a.applicant_name || "A candidate"} applied for ${
            a.job_title || "a role"
          }`,
          type: "application",
          time: new Date(a.created_at).toLocaleString(),
          read: false,
        }));
        const interviewNotes: Notification[] = intervs
          .slice(0, 10)
          .map((i) => ({
            id: i.id + 100000,
            title: `Interview ${i.status === "completed" ? "Completed" : "Scheduled"}`,
            description: `${i.applicant_name || "A candidate"} ${
              i.status === "completed" ? "completed" : "has"
            } an interview for ${i.job_title || "a role"}${
              i.scheduled_at
                ? ` on ${new Date(i.scheduled_at).toLocaleString()}`
                : ""
            }`,
            type: "interview",
            time: i.scheduled_at
              ? new Date(i.scheduled_at).toLocaleString()
              : "Scheduled",
            read: false,
          }));
        setNotifications([...appNotes, ...interviewNotes].slice(0, 15));
      })
      .catch((e) => {
        if (mounted)
          setError(
            e instanceof Error ? e.message : "Failed to load notifications"
          );
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const typeColor = (type: string) => {
    if (type === "application") return "bg-blue-500";
    if (type === "interview") return "bg-green-500";
    return "bg-violet-500";
  };

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Notifications
          </h1>
          <p className="text-gray-400">
            Recent recruitment activity
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-violet-600/20 text-violet-400 font-semibold">
          {unreadCount} Unread
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-400">No notifications yet.</p>
      ) : (
      <div className="relative border-l border-white/10 ml-4 space-y-8">

        {notifications.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative pl-6"
          >
            {/* Dot Indicator */}
            <div
              className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full ${typeColor(
                note.type
              )}`}
            />

            {/* Card */}
            <div
              className={`p-5 rounded-2xl backdrop-blur-md border shadow-lg transition 
              ${
                note.read
                  ? "bg-white/5 border-white/10"
                  : "bg-white/10 border-violet-500/30"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-white">
                  {note.title}
                </h2>

                {!note.read && (
                  <span className="text-xs text-violet-400 font-semibold">
                    New
                  </span>
                )}
              </div>

              <p className="text-gray-300 text-sm mb-3">
                {note.description}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{note.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}

    </div>
  );
}