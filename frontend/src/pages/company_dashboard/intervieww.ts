/**
 * Re-export the API interview shape used across company dashboard pages.
 * The old mock Interview interface has been replaced by real API data.
 */
export interface Interview {
  id: number;
  application_id: number;
  job_id: number;
  user_id: number;
  scheduled_at: string | null;
  status: string;
  notes: string | null;
  score: number | null;
  created_at: string;
  job_title: string | null;
  company_name: string | null;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
}
