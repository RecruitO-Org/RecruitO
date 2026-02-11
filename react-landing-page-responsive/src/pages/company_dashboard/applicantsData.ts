export interface Applicant {
  name: string;
  role: string;
  match: number;
  status: string;
  strengths?: string[];
  gaps?: string[];
}

export const applicants: Applicant[] = [
  {
    name: "Aarav Sharma",
    role: "Frontend Developer",
    match: 82,
    status: "Shortlisted",
  },
  {
    name: "Priya Verma",
    role: "Backend Developer",
    match: 65,
    status: "Test Pending",
  },
  {
    name: "Rohan Patel",
    role: "AI Engineer",
    match: 91,
    status: "Interview",
  },
  {
    name: "Sneha Kulkarni",
    role: "Full Stack Developer",
    match: 48,
    status: "Rejected",
  },
];
