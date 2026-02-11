export interface Interview {
  id: string;
  candidateName: string;
  jobTitle: string;
  scheduledDate: string;
  status: string;
  integrityWarnings: number;
  videoUrl?: string;
  aiScore?: number;
}
