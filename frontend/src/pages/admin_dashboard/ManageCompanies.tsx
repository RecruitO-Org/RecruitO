import { Button } from "@/components/ui/button";

interface Company {
  name: string;
  location: string;
  employees: number;
  jobs: number;
}

export default function Companies() {
  const companies: Company[] = [
    { name: "TechNova", location: "Bangalore", employees: 120, jobs: 4 },
    { name: "CodeCraft", location: "Hyderabad", employees: 80, jobs: 2 },
    { name: "FutureMind AI", location: "Remote", employees: 60, jobs: 3 },
  ];

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Companies</h1>
        <Button>Add Company</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {companies.map((company, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <h2 className="text-xl font-semibold">{company.name}</h2>

            <p className="text-white/60 mt-2">📍 {company.location}</p>
            <p className="text-white/60 mt-2">
              👥 {company.employees} Employees
            </p>
            <p className="text-white/60 mt-2">
              💼 {company.jobs} Active Jobs
            </p>

            <Button size="sm" className="mt-4">
              Manage
            </Button>
          </div>
        ))}

      </div>

    </div>
  );
}