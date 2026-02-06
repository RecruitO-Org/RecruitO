import { Button } from "../shared/Button";
import { Container } from "../shared/Container";
import { Paragraph } from "../shared/Paragraph";
import { Numbers } from "./Numbers";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative pt-32 lg:pt-36">
      <Container className="flex flex-col lg:flex-row gap-10 lg:gap-12">

        {/* Background glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0"
        >
          <span
            className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 
            skew-x-12 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600
            blur-xl opacity-60 lg:opacity-95 lg:block hidden"
          />
          <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-primary blur-xl opacity-80" />
        </motion.div>

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col items-center text-center lg:text-left lg:py-8
          lg:items-start lg:flex-1 lg:w-1/2 max-w-3xl mx-auto lg:mx-0"
        >
          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-heading-1 text-3xl sm:text-4xl md:text-5xl xl:text-6xl
            font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              RecruitO
            </span>
            <br />
            <span className="text-zinc-300">
              A Smarter Way to Hire and Get Hired
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <Paragraph className="mt-8">
              An intelligent platform that matches resumes with job requirements,
              identifies skill gaps, conducts skill-based assessments, and enables
              secure interviews for job seekers and companies.
            </Paragraph>
          </motion.div>

          {/* EMAIL CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 w-full max-w-md mx-auto lg:mx-0"
          >
            <form
              action="#"
              className="py-1 pl-6 pr-1 flex gap-3 items-center
              shadow-lg shadow-box-shadow border border-box-border
              bg-box-bg rounded-full focus-within:border-primary"
            >
              <span className="min-w-max pr-2 border-r border-box-border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-5 h-5 text-zinc-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488
                    M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488
                    m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0
                    l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25
                    h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98
                    l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                  />
                </svg>
              </span>

              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full py-3 bg-transparent outline-none
                text-white placeholder:text-zinc-400"
              />

              <Button className="min-w-max text-white">
                Get Started
              </Button>
            </form>
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
            className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover max-h-96 lg:max-h-none"
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