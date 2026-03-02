import { Container } from "../shared/Container";
import { Paragraph } from "../shared/Paragraph";

export const CTA = () => {
  return (
    <section className="pb-20 relative">
      {" "}
      <Container>
        <div className="relative rounded-2xl overflow-hidden">
          <div className="relative z-10 mx-auto text-center max-w-xl md:max-w-2xl py-8 md:py-10 px-6 md:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading-1">
              {" "}
              Start Your Hiring Journey with {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                RecruitO
              </span>{" "}
              
            </h1>
            <Paragraph className="pt-10">
              RecruitO helps job seekers find the right opportunities and enables
              companies to hire smarter using AI-powered resume analysis,
              skill-based assessments, and secure online interviews.

            </Paragraph>
            
          </div>
        </div>
      </Container>
    </section>
  );
};
