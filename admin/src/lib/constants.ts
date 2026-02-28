export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:5000';

export const JOB_TYPES = ['Full Time', 'Part Time', 'Remote', 'Internship', 'Contract'] as const;

export const JOB_TAGS = [
  'Marketing',
  'Design',
  'Business',
  'Technology',
  'Engineering',
  'Finance',
] as const;

export const JOB_CATEGORIES = [
  'Design',
  'Marketing',
  'Product',
  'Engineering',
  'Business',
  'Finance',
] as const;

export const JOB_LOCATIONS = [
  'Remote',
  'San Francisco, US',
  'Berlin, Germany',
  'Madrid, Spain',
] as const;

export const INPUT_CLASS =
  'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition';
