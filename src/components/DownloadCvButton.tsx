"use client";

import React, { useState } from "react";
import { Download, Loader2, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import {
  UserProfile,
  Skill,
  Project,
  Experience,
  Education,
  Reference,
  Testimonial,
} from "@/types";
import { generatePdfCv, CvData } from "@/lib/generatePdfCv";
import { portfolioApi } from "@/lib/api";

interface DownloadCvButtonProps {
  profile?: UserProfile;
  skills?: Skill[];
  projects?: Project[];
  experiences?: Experience[];
  education?: Education[];
  references?: Reference[];
  testimonials?: Testimonial[];
  variant?: "hero" | "navbar" | "about" | "outline" | "compact";
  className?: string;
  showIcon?: boolean;
}

export default function DownloadCvButton({
  profile,
  skills,
  projects,
  experiences,
  education,
  references,
  testimonials,
  variant = "hero",
  className = "",
  showIcon = true,
}: DownloadCvButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setStatusMessage("Collecting from API...");

    try {
      // 1. Fetch fresh, live comprehensive data from the portfolio API
      // to guarantee all sections are collected from the API
      setStatusMessage("Fetching latest data...");
      const apiData = await portfolioApi.getAllCvData();

      // Merge provided props (if user updated them in client state) with API data
      const cvPayload: CvData = {
        profile: profile || apiData.profile,
        skills: skills && skills.length > 0 ? skills : apiData.skills,
        experiences: experiences && experiences.length > 0 ? experiences : apiData.experiences,
        projects: projects && projects.length > 0 ? projects : apiData.projects,
        education: education && education.length > 0 ? education : apiData.education,
        references: references && references.length > 0 ? references : apiData.references,
        testimonials: testimonials && testimonials.length > 0 ? testimonials : apiData.testimonials,
      };

      // 2. Generate and trigger PDF CV download
      setStatusMessage("Compiling PDF...");
      await generatePdfCv(cvPayload);

      // 3. Success state
      setStatus("success");
      setStatusMessage("Downloaded!");
      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 3000);
    } catch (error) {
      console.error("Failed to download CV PDF:", error);
      setStatus("error");
      setStatusMessage("Failed. Try again");
      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 3500);
    }
  };

  // Variant Styling
  let baseClasses = "";
  if (variant === "hero") {
    baseClasses =
      "group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all border border-emerald-400/30";
  } else if (variant === "navbar") {
    baseClasses =
      "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 hover:border-emerald-400/50 transition-all shadow-sm";
  } else if (variant === "about") {
    baseClasses =
      "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 hover:scale-[1.02] transition-all";
  } else if (variant === "compact") {
    baseClasses =
      "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all";
  } else {
    // outline
    baseClasses =
      "inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 hover:text-white glass glass-hover rounded-xl border border-white/10 transition-all";
  }

  return (
    <button
      onClick={handleDownload}
      disabled={status === "loading"}
      title="Download Resume / Curriculum Vitae as PDF (Compiled from Live API Data)"
      className={`${baseClasses} ${className} cursor-pointer disabled:cursor-wait`}
    >
      {/* Icon based on status */}
      {status === "loading" && (
        <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
      )}
      {status === "success" && (
        <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
      )}
      {status === "error" && (
        <AlertCircle className="w-4 h-4 text-rose-300" />
      )}
      {status === "idle" && showIcon && (
        <Download className="w-4 h-4 text-emerald-200 group-hover:-translate-y-0.5 transition-transform" />
      )}

      {/* Button Text */}
      <span className="font-semibold tracking-wide">
        {status === "loading"
          ? statusMessage || "Generating CV..."
          : status === "success"
          ? "CV Downloaded!"
          : status === "error"
          ? statusMessage
          : "Download CV"}
      </span>

      {/* PDF format pill indicator for Hero variant */}
      {variant === "hero" && status === "idle" && (
        <span className="ml-1 inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-200 border border-emerald-400/30">
          PDF
        </span>
      )}
    </button>
  );
}
