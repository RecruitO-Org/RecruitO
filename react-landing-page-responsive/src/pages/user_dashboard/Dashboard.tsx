import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [isDark, setIsDark] = useState(true);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I'm RecruitO AI. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // Load theme
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
    setIsDark(!isDark);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
  };

  const sidebarItems = [
    "Dashboard",
    "Jobs",
    "Internships",
    "Resume",
    "AI Analysis",
    "Tests",
    "Interviews",
    "Applications",
    "AI Chatbot",
    "Settings",
  ];

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", text: input },
      { role: "ai", text: "This will connect to backend AI soon 🤖" },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-300">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-100 dark:bg-[#0b1120] border-r border-black/10 dark:border-white/5 p-6 flex flex-col transition-colors duration-300">

        <h2 className="text-xl font-semibold mb-10 tracking-wide">
          RecruitO
        </h2>

        <nav className="space-y-2 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item.toLowerCase())}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                active === item.toLowerCase()
                  ? "bg-gradient-to-r from-violet-600 to-blue-600"
                  : "hover:bg-white/5"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <Button
          variant="destructive"
          className="w-full mt-6"
          onClick={() => navigate("/signin")}
        >
          Logout
        </Button>
      </aside>

      {/* MAIN */}
      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold capitalize">
            {active}
          </h1>

          <Avatar>
            <AvatarFallback>SR</AvatarFallback>
          </Avatar>
        </div>

        {/* DASHBOARD */}
        {active === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 shadow-xl">
              <p className="text-sm text-white/60 mb-2">
                Profile Strength
              </p>
              <h2 className="text-3xl font-bold">78%</h2>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 shadow-xl">
              <p className="text-sm text-white/60 mb-2">
                AI Match Score
              </p>
              <h2 className="text-3xl font-bold text-blue-400">
                65%
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 shadow-xl">
              <p className="text-sm text-white/60 mb-2">
                Interviews
              </p>
              <h2 className="text-3xl font-bold">1 Upcoming</h2>
            </div>
          </motion.div>
        )}

        {/* RESUME */}
        {active === "resume" && (
          <div className="p-8 rounded-2xl bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 shadow-xl max-w-xl">
            <h2 className="text-xl font-semibold mb-4">
              Resume Management
            </h2>
            <p className="text-white/60 mb-4">
              Current Resume: resume_v2.pdf
            </p>
            <Button>Upload / Change Resume</Button>
          </div>
        )}

        {/* AI CHATBOT */}
        {active === "ai chatbot" && (
          <div className="max-w-3xl h-[500px] flex flex-col rounded-2xl bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 shadow-xl p-6">
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.role === "user"
                      ? "bg-blue-600 ml-auto"
                      : "bg-white/10"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 outline-none"
              />
              <Button onClick={sendMessage}>
                Send
              </Button>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {active === "settings" && (
          <div className="max-w-xl p-8 rounded-2xl bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 shadow-xl">
            <h2 className="text-xl font-semibold mb-6">
              Appearance Settings
            </h2>

            <div className="flex justify-between items-center">
              <span>Dark Mode</span>
              <Button onClick={toggleTheme}>
                {isDark ? "Switch to Light" : "Switch to Dark"}
              </Button>
            </div>
          </div>
        )}

        {/* OTHER TABS */}
        {!["dashboard", "resume", "ai chatbot", "settings"].includes(active) && (
          <div className="p-8 rounded-2xl bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 shadow-xl">
            <h2 className="text-xl font-semibold">
              {active} section coming soon...
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}