import { Container } from "../shared/Container";

const features = [
  {
    title: "AI-Driven Resume Matching",
    desc: "Automatically match resumes with job requirements using AI.",
  },
  {
    title: "Skill Gap Detection",
    desc: "Identify missing skills and areas for improvement instantly.",
  },
  {
    title: "Secure Online Interviews",
    desc: "Conduct monitored interviews with screen sharing and proctoring.",
  },
  {
    title: "Real-Time Vacancy Tracking",
    desc: "Track openings and applicants live across the platform.",
  },
];

export const Numbers = () => {
  return (
    <section className="relative mt-20 md:mt-28">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 text-left">
          {features.map((item, i) => (
            <div key={i} className="space-y-4">
              {/* title */}
              <h3 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                {item.title}
              </h3>

              {/* subtle divider */}
              <div className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />

              {/* description */}
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
