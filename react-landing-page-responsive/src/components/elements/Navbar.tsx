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

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        fixed inset-x-0 top-0 z-50
        backdrop-blur-md bg-black/60
        border-b border-white/10
      "
    >
      <Container>
        <nav className="w-full flex justify-between gap-6 relative py-4">

          {/* LOGO */}
          <div className="min-w-max inline-flex relative">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="RecruitO Logo"
                className="w-10 h-10 transition-transform duration-300
                           group-hover:rotate-6 group-hover:scale-110"
              />
              <span className="text-lg font-semibold text-heading-1">
                RecruitO
              </span>
            </a>
          </div>

          {/* NAV LINKS */}
          <div
            className="
              flex flex-col lg:flex-row w-full lg:justify-between lg:items-center
              absolute top-full left-0 lg:static
              bg-body/95 lg:bg-transparent
              border-x border-box-border lg:border-0
              lg:h-auto h-0 overflow-hidden
            "
          >
            <ul
              className="
                border-t border-box-border lg:border-0
                px-6 lg:px-0 pt-6 lg:pt-0
                flex flex-col lg:flex-row
                gap-y-4 gap-x-6
                text-lg text-heading-2
                w-full lg:justify-center lg:items-center
              "
            >
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

            {/* AUTH BUTTONS */}
            <div
              className="
                lg:min-w-max flex items-center gap-3
                sm:w-max w-full
                pb-6 lg:pb-0
                border-b border-box-border lg:border-0
                px-6 lg:px-0
              "
            >
              {/* Sign In */}
              <a
                href="/signin"
                className="
                  text-sm font-medium
                  text-zinc-300
                  hover:text-white
                  transition-colors duration-300
                "
              >
                Sign In
              </a>

              {/* Sign Up */}
              <a
                href="/signup"
                className="
                  text-sm font-semibold text-white
                  px-5 py-2 rounded-full
                  bg-gradient-to-r from-violet-600 to-blue-600
                  shadow-lg shadow-violet-600/30
                  transition-all duration-300
                  hover:scale-105 hover:shadow-violet-600/50
                  active:scale-95
                "
              >
                Sign Up
              </a>
            </div>
          </div>

          {/* THEME TOGGLE */}
          <div className="min-w-max flex items-center gap-x-3">
            <button
              onClick={toggleTheme}
              className="
                rounded-full p-2 lg:p-3
                border border-white/20
                bg-white/5 text-white
                transition-all duration-300
                hover:bg-white/15 hover:rotate-12
                active:scale-95
              "
            >
              {theme === "dark" ? (
                /* Moon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
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
                /* Sun */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
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