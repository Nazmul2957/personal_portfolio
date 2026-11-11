// --- Portfolio Types ---

export interface UserProfile {
  id?: number;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  avatarUrl: string;
  resumeUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    discord?: string;
    dribbble?: string;
    website?: string;
  };
  metrics?: {
    yearsExperience?: number;
    completedProjects?: number;
    happyClients?: number;
    openSourceStars?: number;
  };
}

export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  id: string | number;
  name: string;
  category: "Frontend" | "Backend" | "Cloud & DevOps" | "Database" | "Mobile" | "Tools & Others" | string;
  proficiency: number; // 0 - 100
  level: ProficiencyLevel;
  featured: boolean;
  yearsOfExperience: number;
}

export interface ProjectImage {
  id?: number;
  image_data: string; // Base64 data URI or URL
  created_at?: string;
}

export interface Project {
  id: string | number;
  title: string;
  slug?: string;
  subtitle?: string;
  description: string;
  contentMarkdown?: string;
  category: "AI & ML" | "Full Stack" | "Frontend" | "Mobile App" | "Open Source" | string;
  coverImage: string;
  images?: ProjectImage[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order?: number;
  status?: "published" | "draft" | "archived";
  metrics?: {
    stars?: number;
    views?: number;
  };
  createdAt?: string;
}

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship" | "Freelance";

export interface Experience {
  id: string | number;
  role: string;
  company: string;
  location: string;
  employmentType: EmploymentType | string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  techUsed: string[];
  companyUrl?: string;
}

export interface Education {
  id: string | number;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
  activities?: string;
  description?: string;
}

export interface Testimonial {
  id: string | number;
  authorName: string;
  authorRole: string;
  company: string;
  authorAvatar?: string;
  quote: string;
  rating: number;
  linkedInUrl?: string;
  featured: boolean;
  approved: boolean;
  date?: string;
}

export interface Reference {
  id: string | number;
  name: string;
  position?: string;
  company?: string;
  email?: string;
  phone?: string;
  relationship?: string;
  description?: string;
}

export interface BlogPost {
  id: string | number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  readTime: string;
  views: number;
  likes: number;
  publishedAt?: string;
  createdAt?: string;
  authorUsername?: string;
  authorAvatar?: string;
}

export interface Achievement {
  id: string | number;
  userId?: number;
  title: string;
  organization: string;
  category: "Award" | "Certification" | "Honor" | string;
  description?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  interestType?: string;
  projectBudget?: string;
}

export interface ApiStatusInfo {
  isConnected: boolean;
  source: "live-backend" | "admin-proxy" | "cache-fallback";
  backendUrl: string;
  adminUrl: string;
  lastChecked: string;
}
