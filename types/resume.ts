// types/resume.ts
export interface Experience {
  title: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  degree: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface StructuredResume {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  linkedinUsername?: string;
  portfolioUrl?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}
