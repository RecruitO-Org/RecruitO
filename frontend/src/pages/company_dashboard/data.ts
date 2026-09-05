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
  company_id?: number;
  description?: string;
}

/**
 * Shape returned by the backend /jobs endpoints (JobOut).
 */
export interface ApiJob {
  id: number;
  title: string;
  department?: string | null;
  location?: string | null;
  type?: string | null;
  experience?: string | null;
  salary?: string | null;
  skills?: string[] | null;
  vacancies: number;
  description?: string | null;
  deadline?: string | null;
  status: "Open" | "Closed";
  posted_on: string;
  company_id?: number;
  company_name?: string | null;
  applicant_count?: number;
}

/**
 * Map a backend JobOut into the frontend Job shape used by the UI.
 */
export function toUIFrontJob(apiJob: ApiJob): Job {
  return {
    id: apiJob.id,
    title: apiJob.title,
    department: apiJob.department || "General",
    location: apiJob.location || "Not specified",
    type: apiJob.type || "Full-time",
    experience: apiJob.experience || "",
    salary: apiJob.salary || "Not specified",
    skills: apiJob.skills || [],
    vacancies: apiJob.vacancies ?? 1,
    applicants: apiJob.applicant_count ?? 0,
    shortlisted: 0,
    interviews: 0,
    avgMatch: 0,
    postedOn: apiJob.posted_on ? new Date(apiJob.posted_on).toLocaleDateString() : "",
    deadline: apiJob.deadline || "Not Set",
    status: apiJob.status,
    company_id: apiJob.company_id,
    description: apiJob.description || "",
  };
}

export interface ApiJobInput {
  title: string;
  department?: string;
  location?: string;
  type?: string;
  experience?: string;
  salary?: string;
  skills?: string[];
  vacancies?: number;
  description?: string;
  deadline?: string | null;
  status?: "Open" | "Closed";
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
