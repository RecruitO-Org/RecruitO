import { Info } from "../cards/Info";
import { Container } from "../shared/Container";
import { Paragraph } from "../shared/Paragraph";
import { Title } from "../shared/Title";
import { motion } from "framer-motion";

export const AboutUs = () => {
  return (
    <section
      id="about-us"
      className="relative py-24 scroll-mt-24"
    >
      <Container className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">

        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-5/12 lg:w-1/2 relative group"
        >
          {/* Glow behind image */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-violet-500/10 to-blue-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div
            className="
              relative w-full h-80 sm:h-96
              rounded-3xl overflow-hidden
              border border-zinc-200 dark:border-zinc-800
              shadow-xl
              transition-all duration-500 ease-out
              group-hover:-translate-y-2
              group-hover:shadow-2xl
              dark:group-hover:shadow-violet-500/20
            "
          >
            <img
              src="https://etimg.etb2bimg.com/photo/123358134.cms"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="About Our Mission"
            />
          </div>
        </motion.div>

        {/* CONTENT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-7/12 lg:w-1/2 flex flex-col"
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Title>
              About{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                RecruitO
              </span>
            </Title>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 space-y-5"
          >
            <Paragraph className="text-zinc-600 dark:text-zinc-400">
              RecruitO is an AI-powered hiring platform designed to simplify and
              improve the recruitment process for both job seekers and companies.
            </Paragraph>

            <Paragraph className="text-zinc-600 dark:text-zinc-400">
              Our system analyzes resumes, matches candidates with job requirements,
              identifies skill gaps, conducts AI-based assessments, and enables secure
              online interviews — all within a single intelligent platform.
            </Paragraph>
          </motion.div>

          {/* INFO CARDS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-violet-500/20 rounded-2xl"
            >
              <Info
                title="Mission"
                description="To make hiring fair, efficient, and transparent using AI-driven resume analysis, skill evaluation, and structured interviews."
              >
                <span className="text-violet-600 dark:text-violet-400 text-lg">
                  ⚡
                </span>
              </Info>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-blue-500/20 rounded-2xl"
            >
              <Info
                title="Vision"
                description="To build a reliable recruitment platform where candidates are evaluated based on skills and potential — not just resumes."
              >
                <span className="text-blue-600 dark:text-blue-400 text-lg">
                  🎯
                </span>
              </Info>
            </motion.div>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
};
