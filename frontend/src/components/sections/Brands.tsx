import { Container } from "../shared/Container";
import { Title } from "../shared/Title";

const designedFor = [
  { label: "Startups", icon: "🚀" },
  { label: "Tech Companies", icon: "🏢" },
  { label: "Recruitment Agencies", icon: "📋" },
  { label: "Fresh Graduates", icon: "🎓" },
  { label: "Hiring Managers", icon: "👔" },
];

export const Brands = () => {
  return (
    <section className="relative py-20">
      <Container className="space-y-14">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Title>Designed for Real-World Hiring</Title>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            RecruitO is designed to support hiring workflows for companies of all
            sizes and job seekers across domains.
          </p>
        </div>

        {/* Items */}
        <div className="flex justify-center flex-wrap gap-10 sm:gap-14">
          {designedFor.map((item, key) => (
            <div
              key={key}
              className="
                group
                flex flex-col items-center
                cursor-pointer
                px-6 py-6
                rounded-2xl
                border border-zinc-200 dark:border-zinc-800
                bg-transparent
                transition-all duration-300 ease-out
                hover:scale-105
                hover:shadow-xl
                dark:hover:shadow-violet-500/20
              "
            >
              {/* Emoji */}
              <span
                className="
                  text-5xl mb-4 select-none
                  transition-all duration-300
                  group-hover:scale-110
                "
              >
                {item.icon}
              </span>

              {/* Label */}
              <p
                className="
                  text-base sm:text-lg font-semibold
                  text-zinc-700 dark:text-zinc-300
                  transition-colors duration-300
                  group-hover:text-violet-600
                  dark:group-hover:text-violet-400
                "
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};
