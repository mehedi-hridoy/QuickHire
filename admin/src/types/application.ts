export interface Application {
  _id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
  jobTitle?: string;
  company?: string;
}
