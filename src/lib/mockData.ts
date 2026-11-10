import {
  UserProfile,
  Project,
  Skill,
  Experience,
  Education,
  BlogPost,
  Testimonial,
  Reference,
} from "@/types";

export const defaultProfile: UserProfile = {
  name: "Nazmul Hossain",
  title: "Software Engineer",
  tagline: "Software Engineer & Full-Stack Developer",
  bio: "Software Engineer dedicated to constructing modern, performant, and reliable web applications.",
  location: "Dhaka, Bangladesh",
  email: "nazmul1@gmail.com",
  phone: "01629668325",
  availability: "Available for New Opportunities",
  avatarUrl: "",
  resumeUrl: "#",
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  },
  metrics: {
    yearsExperience: 0,
    completedProjects: 0,
    happyClients: 0,
    openSourceStars: 0,
  },
};

export const defaultSkills: Skill[] = [];

export const defaultProjects: Project[] = [];

export const defaultExperiences: Experience[] = [];

export const defaultEducation: Education[] = [];

export const defaultTestimonials: Testimonial[] = [];

export const defaultReferences: Reference[] = [];

export const defaultBlogPosts: BlogPost[] = [];
