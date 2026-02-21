export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time / Internship / Contract
  experience: string;
  salary: string;
  skills: string[];
  vacancies: number;
  applicants: number;
  shortlisted: number;
  interviews: number;
  avgMatch: number;
  postedOn: string;
  deadline: string;
  status: "Open" | "Closed";
}

export const jobsData: Job[] = [
  {
    id: 0,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    salary: "8-12 LPA",
    skills: ["React", "TypeScript", "Tailwind"],
    vacancies: 3,
    applicants: 42,
    shortlisted: 8,
    interviews: 3,
    avgMatch: 76,
    postedOn: "10 Feb 2026",
    deadline: "28 Feb 2026",
    status: "Open",
  },
  {
    id: 1,
    title: "Backend Developer",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    experience: "3-5 years",
    salary: "10-15 LPA",
    skills: ["Node.js", "MongoDB", "REST APIs"],
    vacancies: 2,
    applicants: 31,
    shortlisted: 6,
    interviews: 2,
    avgMatch: 72,
    postedOn: "8 Feb 2026",
    deadline: "25 Feb 2026",
    status: "Open",
  },
  {
    id: 2,
    title: "AI Engineer",
    department: "AI Research",
    location: "On-site",
    type: "Full-time",
    experience: "1-3 years",
    salary: "12-18 LPA",
    skills: ["Python", "TensorFlow", "ML Models"],
    vacancies: 1,
    applicants: 18,
    shortlisted: 4,
    interviews: 1,
    avgMatch: 81,
    postedOn: "5 Feb 2026",
    deadline: "20 Feb 2026",
    status: "Closed",
  },
];
