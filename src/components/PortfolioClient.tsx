"use client";

import React, { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import ArticleModal from "@/components/ArticleModal";
import ApiStatusModal from "@/components/ApiStatusModal";

import {
  UserProfile,
  Skill,
  Project,
  Experience,
  Education,
  Reference,
  Testimonial,
  BlogPost,
  ApiStatusInfo,
} from "@/types";

import { portfolioApi } from "@/lib/api";

interface PortfolioClientProps {
  initialProfile: UserProfile;
  initialSkills: Skill[];
  initialProjects: Project[];
  initialExperiences: Experience[];
  initialReferences: Reference[];
  initialTestimonials: Testimonial[];
  initialArticles: BlogPost[];
  initialEducation?: Education[];
  initialApiStatus: ApiStatusInfo;
}

export default function PortfolioClient({
  initialProfile,
  initialSkills,
  initialProjects,
  initialExperiences,
  initialReferences,
  initialTestimonials,
  initialArticles,
  initialEducation = [],
  initialApiStatus,
}: PortfolioClientProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [references, setReferences] = useState<Reference[]>(initialReferences);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [articles, setArticles] = useState<BlogPost[]>(initialArticles);
  const [education, setEducation] = useState<Education[]>(initialEducation);
  const [apiStatus, setApiStatus] = useState<ApiStatusInfo>(initialApiStatus);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const refreshAllData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const status = await portfolioApi.checkHealth();
      setApiStatus(status);

      const [
        fetchedProfile,
        fetchedSkills,
        fetchedProjects,
        fetchedExperiences,
        fetchedReferences,
        fetchedTestimonials,
        fetchedArticles,
        fetchedEducation,
      ] = await Promise.allSettled([
        portfolioApi.getProfile(),
        portfolioApi.getSkills(),
        portfolioApi.getProjects(),
        portfolioApi.getExperiences(),
        portfolioApi.getReferences(),
        portfolioApi.getTestimonials(),
        portfolioApi.getArticles(),
        portfolioApi.getEducation(),
      ]);

      if (fetchedProfile.status === "fulfilled" && fetchedProfile.value) {
        setProfile(fetchedProfile.value);
      }
      if (fetchedSkills.status === "fulfilled" && fetchedSkills.value) {
        setSkills(fetchedSkills.value);
      }
      if (fetchedProjects.status === "fulfilled" && fetchedProjects.value) {
        setProjects(fetchedProjects.value);
      }
      if (fetchedExperiences.status === "fulfilled" && fetchedExperiences.value) {
        setExperiences(fetchedExperiences.value);
      }
      if (fetchedReferences.status === "fulfilled" && fetchedReferences.value) {
        setReferences(fetchedReferences.value);
      }
      if (fetchedTestimonials.status === "fulfilled" && fetchedTestimonials.value) {
        setTestimonials(fetchedTestimonials.value);
      }
      if (fetchedArticles.status === "fulfilled" && fetchedArticles.value) {
        setArticles(fetchedArticles.value);
      }
      if (fetchedEducation.status === "fulfilled" && fetchedEducation.value) {
        setEducation(fetchedEducation.value);
      }
    } catch (err) {
      console.warn("Portfolio data refresh error:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const handleToggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <main className="min-h-screen relative bg-slate-950 text-slate-100 transition-colors">
      {/* Navigation */}
      <Navbar
        profile={profile}
        skills={skills}
        projects={projects}
        experiences={experiences}
        education={education}
        apiStatus={apiStatus}
        onRefresh={refreshAllData}
        isRefreshing={isRefreshing}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenApiModal={() => setApiModalOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        profile={profile}
        skills={skills}
        projects={projects}
        experiences={experiences}
        education={education}
        references={references}
        testimonials={testimonials}
      />

      {/* About Section */}
      <AboutSection profile={profile} education={education} />

      {/* Skills Matrix Section */}
      <SkillsSection skills={skills} />

      {/* Featured Projects Section */}
      <ProjectsSection
        projects={projects}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Career Experience Timeline */}
      <ExperienceSection experiences={experiences} />

      {/* Testimonials & Endorsements */}
      <TestimonialsSection
        testimonials={testimonials}
        references={references}
      />

      {/* Technical Blog / Articles CMS */}
      <BlogSection
        posts={articles}
        onSelectPost={(post) => setSelectedPost(post)}
      />

      {/* Direct Contact Inbound Form */}
      <ContactSection profile={profile} />

      {/* Footer */}
      <Footer profile={profile} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ArticleModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <ApiStatusModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        apiStatus={apiStatus}
        onRefresh={refreshAllData}
        isRefreshing={isRefreshing}
        counts={{
          skills: skills.length,
          projects: projects.length,
          experiences: experiences.length,
          testimonials: testimonials.length,
          references: references.length,
          articles: articles.length,
        }}
      />
    </main>
  );
}
