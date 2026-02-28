export type JobType = 'Full Time' | 'Part Time';

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  type: JobType;
  logo: string | null;
  createdAt: string;
}
