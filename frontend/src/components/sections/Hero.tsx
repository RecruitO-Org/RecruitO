import { Button } from "../shared/Button";
import { Container } from "../shared/Container";
import { Paragraph } from "../shared/Paragraph";
import { Numbers } from "./Numbers";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
      relative pt-24 lg:pt-28
      bg-gradient-to-b from-white to-zinc-50
      dark:from-zinc-950 dark:to-zinc-950
      transition-colors duration-500
      "
    >
      <Container className="flex flex-col lg:flex-row gap-10 lg:gap-12">

        {/* Background Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0"
        >
          <span
            className="
            absolute -left-6 md:left-4 top-24 lg:top-28 
            w-32 h-32 rotate-90 skew-x-12 rounded-3xl
            bg-gradient-to-r from-blue-500 to-violet-500
            blur-2xl opacity-30
            dark:opacity-80
            lg:block hidden
            "
          />
          <span
            className="
            absolute right-4 bottom-12 
            w-32 h-32 rounded-3xl
            bg-primary blur-2xl opacity-20
            dark:opacity-70
            "
          />
        </motion.div>

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
          relative flex flex-col items-center text-center
          lg:text-left lg:py-8 lg:items-start
          lg:flex-1 lg:w-1/2 max-w-3xl mx-auto lg:mx-0
          "
        >
          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="
            text-3xl sm:text-4xl md:text-5xl xl:text-6xl
            font-bold leading-tight
            "
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              RecruitO
            </span>
            <br />
            <span className="text-zinc-900 dark:text-white">
              A Smarter Way to Hire and Get Hired
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <Paragraph className="mt-8 text-zinc-600 dark:text-zinc-400">
              An intelligent platform that matches resumes with job requirements,
              identifies skill gaps, conducts skill-based assessments, and enables
              secure interviews for job seekers and companies.
            </Paragraph>
          </motion.div>

          {/* CTA BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex gap-4 justify-center lg:justify-start"
          >
            <Button
              onClick={() => navigate("/signin")}
              className="
              px-8 py-4 
              text-white text-lg font-semibold
              rounded-full
              bg-gradient-to-r from-blue-600 to-violet-600
              transition-all duration-300 ease-out
              hover:scale-105
              hover:shadow-2xl hover:shadow-violet-500/40
              active:scale-95
              "
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:mx-0"
        >
          <motion.img
            src="/image.png"
            alt="RecruitO platform preview"
            className="
            lg:absolute lg:w-full lg:h-full
            rounded-3xl object-cover
            max-h-[420px] lg:max-h-none
            shadow-xl dark:shadow-none
            border border-zinc-200 dark:border-zinc-800
            "
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </Container>

      {/* FEATURE STRIP */}
      <Numbers />
    </section>
  );
};
