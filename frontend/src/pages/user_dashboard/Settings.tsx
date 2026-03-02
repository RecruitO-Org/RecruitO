import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const [isDark, setIsDark] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [profilePublic, setProfilePublic] = useState(true);

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  const Toggle = ({
    value,
    onChange,
  }: {
    value: boolean;
    onChange: (val: boolean) => void;
  }) => (
    <div
      onClick={() => onChange(!value)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
        value
          ? "bg-gradient-to-r from-violet-600 to-blue-600"
          : "bg-gray-400"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          value ? "translate-x-6" : ""
        }`}
      />
    </div>
  );

  return (
    <div className="max-w-5xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-white/50">
          Manage your account, preferences and privacy
        </p>
      </div>

      {/* APPEARANCE */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-6">Appearance</h2>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-white/50">
              Switch between light and dark theme
            </p>
          </div>

          <Toggle value={isDark} onChange={toggleTheme} />
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-6">Notifications</h2>

        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-white/50">
                Receive job updates via email
              </p>
            </div>
            <Toggle value={emailNotif} onChange={setEmailNotif} />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Job Alerts</p>
              <p className="text-sm text-white/50">
                Get notified when jobs match your profile
              </p>
            </div>
            <Toggle value={jobAlerts} onChange={setJobAlerts} />
          </div>

        </div>
      </div>

      {/* PRIVACY */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-6">Privacy</h2>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Public Profile</p>
            <p className="text-sm text-white/50">
              Allow recruiters to view your profile
            </p>
          </div>

          <Toggle value={profilePublic} onChange={setProfilePublic} />
        </div>
      </div>

      {/* DANGER ZONE */}
      <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/20 shadow-xl">
        <h2 className="text-xl font-semibold mb-6 text-red-400">
          Danger Zone
        </h2>

        <Button variant="destructive">
          Delete Account
        </Button>
      </div>

    </div>
  );
}