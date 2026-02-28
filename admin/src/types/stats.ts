export interface RecentJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  createdAt: string;
}

export interface RecentApplication {
  _id: string;
  name: string;
  jobTitle: string;
  createdAt: string;
}

export interface DayCount {
  date: string;
  count: number;
}

export interface TypeCount {
  type: string;
  count: number;
}

export interface Stats {
  totalJobs: number;
  totalApplications: number;
  jobsThisWeek: number;
  applicationsThisWeek: number;
  jobsByDay: DayCount[];
  applicationsByDay: DayCount[];
  applicationsByType: TypeCount[];
  recentJobs: RecentJob[];
  recentApplications: RecentApplication[];
}
