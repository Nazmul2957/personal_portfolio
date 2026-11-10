import { portfolioApi } from "@/lib/api";
import PortfolioClient from "@/components/PortfolioClient";
import { defaultProfile } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch live data directly from the backend API
  const [
    apiStatusRes,
    profileRes,
    skillsRes,
    projectsRes,
    experiencesRes,
    referencesRes,
    testimonialsRes,
    articlesRes,
  ] = await Promise.allSettled([
    portfolioApi.checkHealth(),
    portfolioApi.getProfile(),
    portfolioApi.getSkills(),
    portfolioApi.getProjects(),
    portfolioApi.getExperiences(),
    portfolioApi.getReferences(),
    portfolioApi.getTestimonials(),
    portfolioApi.getArticles(),
  ]);

  const apiStatus =
    apiStatusRes.status === "fulfilled"
      ? apiStatusRes.value
      : {
          isConnected: false,
          source: "cache-fallback" as const,
          backendUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
          adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001",
          lastChecked: new Date().toLocaleTimeString(),
        };

  const profile =
    profileRes.status === "fulfilled" && profileRes.value
      ? profileRes.value
      : defaultProfile;

  // Show ONLY live data from API - NEVER fallback to dummy data!
  const skills =
    skillsRes.status === "fulfilled" && Array.isArray(skillsRes.value)
      ? skillsRes.value
      : [];

  const projects =
    projectsRes.status === "fulfilled" && Array.isArray(projectsRes.value)
      ? projectsRes.value
      : [];

  const experiences =
    experiencesRes.status === "fulfilled" && Array.isArray(experiencesRes.value)
      ? experiencesRes.value
      : [];

  const references =
    referencesRes.status === "fulfilled" && Array.isArray(referencesRes.value)
      ? referencesRes.value
      : [];

  const testimonials =
    testimonialsRes.status === "fulfilled" && Array.isArray(testimonialsRes.value)
      ? testimonialsRes.value
      : [];

  const articles =
    articlesRes.status === "fulfilled" && Array.isArray(articlesRes.value)
      ? articlesRes.value
      : [];

  return (
    <PortfolioClient
      initialProfile={profile}
      initialSkills={skills}
      initialProjects={projects}
      initialExperiences={experiences}
      initialReferences={references}
      initialTestimonials={testimonials}
      initialArticles={articles}
      initialApiStatus={apiStatus}
    />
  );
}
