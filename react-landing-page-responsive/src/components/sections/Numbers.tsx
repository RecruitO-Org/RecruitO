import { Container } from "../shared/Container";

export const Numbers = () => {
  return (
    <section className="relative mt-12 md:mt-16">
      <Container className="flex justify-center align-center">
        <div
          className="mx-auto lg:mx-0 p-5 sm:p-6 sm:py-8 max-w-5xl rounded-3xl bg-box-bg
                        border border-box-border shadow-lg shadow-box-shadow md:divide-x divide-box-border
                        grid grid-cols-2 md:grid-cols-4"
        >
          <div className="text-center px-4">
            <h2 className="font-semibold text-l sm:text-xl md:text-2xl text-heading-1">
              {" "}
              AI-Driven Resume Matching{" "}
            </h2>
            <p className="mt-2 text-heading-3"> </p>
          </div>
          <div className="text-center px-5">
            <h2 className="font-semibold text-l sm:text-xl md:text-2xl text-heading-1">
              {" "}
              Skill Gap Detection{" "}
            </h2>
            <p className="mt-2 text-heading-3"> </p>
          </div>
          <div className="text-center px-5">
            <h2 className="font-semibold text-l sm:text-xl md:text-2xl text-heading-1">
              {" "}
              Secure Online Interviews{" "}
            </h2>
            <p className="mt-2 text-heading-3"> </p>
          </div>
          <div className="text-center px-5">
            <h2 className="font-semibold text-l sm:text-xl md:text-2xl text-heading-1">
              {" "}
              Real-Time Vacancy Tracking{" "}
            </h2>
            <p className="mt-2 text-heading-3"> </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
