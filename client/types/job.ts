export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type: "Full Time" | "Part Time" | "Remote" | "Internship" | "Contract";
  tags: string[];
  logo: string | null;
  createdAt: string;
}
