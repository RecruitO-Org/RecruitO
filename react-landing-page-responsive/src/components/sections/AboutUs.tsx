import { Info } from "../cards/Info";
import { Container } from "../shared/Container";
import { Paragraph } from "../shared/Paragraph";
import { Title } from "../shared/Title";
import { motion } from "framer-motion";

export const AboutUs = () => {
  return (
    <section id="about-us" className="py-20">
      <Container className="flex flex-col md:flex-row gap-10 lg:gap-14 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-5/12 lg:w-1/2"
        >
          <div className="w-full h-80 sm:h-96 relative">
            <img
              src="https://etimg.etb2bimg.com/photo/123358134.cms"
              className="w-full h-full object-cover rounded-3xl shadow-lg relative z-10"
              alt="About Our Mission"
            />
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-7/12 lg:w-1/2 flex flex-col"
        >
          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Title>About RecruitO</Title>
          </motion.div>

          {/* GAP + DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-5 space-y-4"
          >
            <Paragraph>
              RecruitO is an AI-powered hiring platform designed to simplify and
              improve the recruitment process for both job seekers and companies.
            </Paragraph>

            <Paragraph>
              Our system analyzes resumes, matches candidates with job requirements,
              identifies skill gaps, conducts AI-based assessments, and enables secure
              online interviews — all within a single platform.
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
            className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Info
                title="Mission"
                description="To make hiring fair, efficient, and transparent by using AI-driven
                resume analysis, skill evaluation, and structured interviews."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </Info>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Info
                title="Vision"
                description="To build a reliable recruitment platform where candidates are evaluated
                based on skills and potential, not just resumes."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </Info>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
