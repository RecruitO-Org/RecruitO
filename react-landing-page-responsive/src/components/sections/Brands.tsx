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
    <section className="relative">
      <Container className="space-y-14">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Title>Designed for Real-World Hiring</Title>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            RecruitO is designed to support hiring workflows for companies of all
            sizes and job seekers across domains.
          </p>
        </div>

        {/* Minimal interactive items */}
        <div className="flex justify-center flex-wrap gap-12">
          {designedFor.map((item, key) => (
            <div
              key={key}
              className="
                group
                flex flex-col items-center
                cursor-pointer
                transition-transform duration-300 ease-out
                hover:scale-110
              "
            >
              {/* Emoji */}
              <span
                className="
                  text-5xl mb-3 select-none
                  opacity-50 grayscale
                  transition-all duration-300
                  group-hover:opacity-100
                  group-hover:grayscale-0
                "
              >
                {item.icon}
              </span>

              {/* Label */}
              <p
                className="
                  text-base sm:text-lg font-semibold
                  text-zinc-400
                  transition-colors duration-300
                  group-hover:text-zinc-200
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