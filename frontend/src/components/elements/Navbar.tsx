import { useState } from "react";
import { Container } from "../shared/Container";
import logo from "/assets/icon.svg";
import { NavItem } from "../shared/NavItem";
import { useThemeStore } from "../../store/ThemeStore";
import { motion } from "framer-motion";

export const navItems = [
  { href: "#", text: "Home" },
  { href: "#services", text: "Services" },
  { href: "#about-us", text: "About Us" },
  { href: "#pricing", text: "Pricing" },
];

export const Navbar = () => {
  const { toggleTheme, theme } = useThemeStore();
  const [activeAuth, setActiveAuth] = useState<"signin" | "signup">("signup");

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        fixed inset-x-0 top-0 z-50
        bg-white dark:bg-black
        border-b border-zinc-200 dark:border-zinc-800
        transition-colors duration-500
      "
    >
      <Container>
        <nav className="w-full flex items-center justify-between py-4">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="RecruitO Logo"
              className="w-10 h-10 transition-transform duration-300
                         group-hover:rotate-6 group-hover:scale-110"
            />
            <span className="text-lg font-semibold text-zinc-900 dark:text-white">
              RecruitO
            </span>
          </a>

          {/* NAV LINKS */}
          <ul className="hidden lg:flex items-center gap-8 text-lg text-zinc-700 dark:text-zinc-300">
            {navItems.map((item, key) => (
              <li
                key={key}
                className="
                  relative group
                  after:content-['']
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0
                  after:bg-violet-500
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                <NavItem href={item.href} text={item.text} />
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* AUTH TOGGLE */}
            <div
              onMouseLeave={() => setActiveAuth("signup")}
              className="
                relative flex items-center
                bg-zinc-100 dark:bg-zinc-800
                rounded-full p-1
                w-44
              "
            >
              {/* Sliding Background */}
              <div
                className={`
                  absolute top-1 bottom-1 w-1/2 rounded-full
                  bg-gradient-to-r from-violet-600 to-blue-600
                  transition-all duration-300 ease-in-out
                  ${activeAuth === "signin" ? "left-1" : "left-1/2"}
                `}
              />

              {/* Sign In */}
              <a
                href="/signin"
                onMouseEnter={() => setActiveAuth("signin")}
                className={`
                  relative z-10 w-1/2 text-center py-2 text-sm font-medium
                  transition-colors duration-300
                  ${
                    activeAuth === "signin"
                      ? "text-white"
                      : "text-zinc-700 dark:text-zinc-300"
                  }
                `}
              >
                Sign In
              </a>

              {/* Sign Up */}
              <a
                href="/signup"
                onMouseEnter={() => setActiveAuth("signup")}
                className={`
                  relative z-10 w-1/2 text-center py-2 text-sm font-medium
                  transition-colors duration-300
                  ${
                    activeAuth === "signup"
                      ? "text-white"
                      : "text-zinc-700 dark:text-zinc-300"
                  }
                `}
              >
                Sign Up
              </a>
            </div>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="
                rounded-full p-2
                border border-zinc-300 dark:border-white/20
                bg-zinc-100 dark:bg-zinc-800
                text-zinc-800 dark:text-white
                transition-all duration-300
                hover:bg-zinc-200 dark:hover:bg-zinc-700
                hover:rotate-12
                active:scale-95
              "
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75
                       c-5.385 0-9.75-4.365-9.75-9.75
                       0-1.33.266-2.597.748-3.752
                       A9.753 9.753 0 003 11.25
                       C3 16.635 7.365 21 12.75 21
                       a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591
                       M21 12h-2.25m-.386 6.364l-1.591-1.591
                       M12 18.75V21m-4.773-4.227l-1.591 1.591
                       M5.25 12H3m4.227-4.773L5.636 5.636
                       M15.75 12a3.75 3.75 0 11-7.5 0
                       3.75 3.75 0 017.5 0z"
                  />
                </svg>
              )}
            </button>

          </div>

        </nav>
      </Container>
    </motion.header>
  );
};

