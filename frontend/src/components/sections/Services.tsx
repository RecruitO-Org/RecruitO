import { services } from "../../utils/services-data";
import { Service } from "../cards/Service";
import { Container } from "../shared/Container";
import { Paragraph } from "../shared/Paragraph";
import { Title } from "../shared/Title";

export const Services = () => {
  return (
    <section id="services" className="py-20 scroll-mt-24">
      <Container className="space-y-10 md:space-y-12">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Title>How RecruitO Works</Title>
          <Paragraph>
            RecruitO uses AI to analyze resumes, match candidates with job requirements,
            identify skill gaps, and enable secure hiring — all in one intelligent platform.
          </Paragraph>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, key) => (
            <Service
              key={key}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};