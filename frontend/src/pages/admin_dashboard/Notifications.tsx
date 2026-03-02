import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  title: string;
  description: string;
  type: "application" | "interview" | "system";
  time: string;
  read: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Application Received",
      description: "Rahul Mehta applied for Frontend Developer",
      type: "application",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Interview Completed",
      description: "Priya Sharma completed Technical Round",
      type: "interview",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "System Update",
      description: "AI scoring engine upgraded to v2.1",
      type: "system",
      time: "Yesterday",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const typeColor = (type: string) => {
    if (type === "application")
      return "bg-blue-500";
    if (type === "interview")
      return "bg-green-500";
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
            Real-time recruitment updates
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-violet-600/20 text-violet-400 font-semibold">
          {unreadCount} Unread
        </div>
      </div>

      {/* ================= TIMELINE ================= */}
      <div className="relative border-l border-white/10 ml-4 space-y-8">

        {notifications.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
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

                {!note.read && (
                  <Button
                    variant="outline"
                    onClick={() => markAsRead(note.id)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}