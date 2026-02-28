export type JobType = 'Full Time' | 'Part Time' | 'Remote' | 'Internship' | 'Contract';

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  tags: string[];
  type: JobType;
  logo: string | null;
  createdAt: string;
}
