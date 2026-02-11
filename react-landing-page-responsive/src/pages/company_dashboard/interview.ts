export interface Interview {
  id: string;
  candidateName: string;
  jobTitle: string;
  scheduledDate: string;
  status: "Not Started" | "In Progress" | "Completed" | "Flagged";
  aiScore?: number;
  integrityWarnings: number;
  videoUrl?: string;
}
