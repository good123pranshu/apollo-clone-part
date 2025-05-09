export type Doctor = {
  id: string;
  name: string;
  image?: string | null;
  specialty: string; // Changed from `speciality` to `specialty`
  qualification: string;
  experience: number;
  consultationFee: number; // Changed from `fees` to `consultationFee`
  languages: string[];
  rating?: number | null;
  totalRatings: number;
  hospital?: string | null;
  location: string;
  state: string;
  consultationMode: string[];
  availableSlots: number;
};


export type DoctorFilters = {
  consultationMode?: string[];
  experience?: string[];
  fees?: string[];
  languages?: string[];
  page?: number;
  limit?: number;
};

export type DoctorListResponse = {
  doctors: Doctor[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

export const experienceRanges = [
  { label: '0-5', min: 0, max: 5 },
  { label: '6-10', min: 6, max: 10 },
  { label: '11-16', min: 11, max: 16 },
];

export const feeRanges = [
  { label: '100-500', min: 100, max: 500 },
  { label: '500-1000', min: 500, max: 1000 },
  { label: '1000+', min: 1000, max: 10000 },
];

export const languageOptions = [
  'English',
  'Hindi',
  'Telugu',
  'Tamil',
  'Kannada',
  'Malayalam',
  'Bengali',
  'Marathi',
  'Gujarati',
  'Punjabi',
];