import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const linkBase =
"block px-3 py-2 rounded-md text-sm transition";

export default function AdminLayout(): JSX.Element {
const [dark, setDark] = useState<boolean>(true);

useEffect(() => {
const saved = localStorage.getItem("theme");
const isDark = saved !== "light";
setDark(isDark);
document.documentElement.classList.toggle("dark", isDark);
}, []);

const toggleTheme = () => {
setDark((prev) => {
const next = !prev;
document.documentElement.classList.toggle("dark", next);
localStorage.setItem("theme", next ? "dark" : "light");
return next;
});
};

return ( <div className="flex min-h-screen transition-colors
 bg-slate-100 text-slate-900
 dark:bg-[#0f172a] dark:text-white">

  {/* Sidebar */}
  <aside className="w-64 p-6 border-r
  bg-white border-slate-200
  dark:bg-black/40 dark:border-white/10">

    <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

    <nav className="space-y-2">
      {[
        "","users","companies","jobs","applications",
        "interviews","ai-insights","reports","notifications","settings"
      ].map((path, i) => (
        <NavLink
          key={i}
          to={`/admin${path ? `/${path}` : ""}`}
          end={!path}
          className={({ isActive }) =>
            `${linkBase}
            ${isActive
              ? "bg-violet-500 text-white"
              : "hover:bg-slate-100 dark:hover:bg-white/10"}`
          }
        >
          {path || "Dashboard"}
        </NavLink>
      ))}
    </nav>

    {/* Toggle */}
    <div className="mt-10 flex items-center justify-between">
      <span className="text-sm opacity-70">Theme</span>

      <button
        onClick={toggleTheme}
        className="relative w-14 h-7 rounded-full
        bg-slate-300 dark:bg-violet-500 transition"
      >
        <motion.div
          layout
          className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow"
          animate={{ x: dark ? 26 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  </aside>

  {/* Content */}
  <main className="flex-1 p-10">
    <Outlet />
  </main>
</div>


);
}
