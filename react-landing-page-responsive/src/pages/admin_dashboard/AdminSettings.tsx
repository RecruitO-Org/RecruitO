import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Tab = "profile" | "company" | "notifications" | "security";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Admin Settings
        </h1>
        <p className="text-gray-400">
          Manage platform preferences and account configuration
        </p>
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* LEFT TAB NAVIGATION */}
        <div className="md:w-1/4 space-y-2">
          {[
            { key: "profile", label: "Profile" },
            { key: "company", label: "Company" },
            { key: "notifications", label: "Notifications" },
            { key: "security", label: "Security" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Tab)}
              className={`w-full text-left px-4 py-3 rounded-xl transition
                ${
                  activeTab === tab.key
                    ? "bg-violet-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT PANEL */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
        >
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">
                Profile Settings
              </h2>

              <input
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white"
              />

              <input
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white"
              />

              <Button className="bg-gradient-to-r from-violet-600 to-blue-600">
                Save Changes
              </Button>
            </div>
          )}

          {activeTab === "company" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">
                Company Settings
              </h2>

              <input
                placeholder="Company Name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white"
              />

              <input
                placeholder="Company Website"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white"
              />

              <Button className="bg-gradient-to-r from-violet-600 to-blue-600">
                Update Company Info
              </Button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">
                Notification Preferences
              </h2>

              <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
                <span className="text-gray-300">
                  Email Notifications
                </span>
                <input type="checkbox" className="w-5 h-5" />
              </div>

              <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
                <span className="text-gray-300">
                  SMS Alerts
                </span>
                <input type="checkbox" className="w-5 h-5" />
              </div>

              <Button className="bg-gradient-to-r from-violet-600 to-blue-600">
                Save Preferences
              </Button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">
                Security Settings
              </h2>

              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white"
              />

              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white"
              />

              <Button className="bg-gradient-to-r from-violet-600 to-blue-600">
                Change Password
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}