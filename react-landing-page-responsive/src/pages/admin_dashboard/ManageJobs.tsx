import { Button } from "@/components/ui/button";

interface Job {
  title: string;
  company: string;
  applicants: number;
  status: "Open" | "Closed";
}

export default function AdminJobs() {
  const jobs: Job[] = [
    { title: "Frontend Developer", company: "TechNova", applicants: 34, status: "Open" },
    { title: "React Developer", company: "CodeCraft", applicants: 21, status: "Open" },
    { title: "AI Engineer", company: "FutureMind AI", applicants: 12, status: "Closed" },
  ];

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Jobs</h1>
        <Button>Create Job</Button>
      </div>

      <div className="space-y-4">

        {jobs.map((job, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-white/60">
                {job.company} • {job.applicants} Applicants
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  job.status === "Open"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {job.status}
              </span>

              <Button size="sm" variant="outline">
                Manage
              </Button>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}