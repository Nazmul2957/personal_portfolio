"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ExternalLink,
  Github,
  Star,
  Eye,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  useEffect(() => {
    setSelectedImgIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Gather all available image sources (cover + images array)
  const allImages: string[] = [];
  if (project.coverImage) allImages.push(project.coverImage);
  if (Array.isArray(project.images)) {
    project.images.forEach((img: any) => {
      const src = img.image_data || img.url || img;
      if (src && !allImages.includes(src)) {
        allImages.push(src);
      }
    });
  }

  const currentImg = allImages[selectedImgIndex] || project.coverImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
              {project.category}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Case Study & Systems Breakdown
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Showcase Image & Carousel */}
          <div className="space-y-4">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
              <img
                src={currentImg}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImgIndex(
                        (prev) => (prev - 1 + allImages.length) % allImages.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImgIndex((prev) => (prev + 1) % allImages.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all backdrop-blur-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Row */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {allImages.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImgIndex === idx
                        ? "border-indigo-500 scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Action Links Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="text-sm text-indigo-400 font-medium mt-1">
                  {project.subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Repo</span>
                </a>
              )}
            </div>
          </div>

          {/* Description & Markdown Overview */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Project Architecture & Overview
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>

            {project.contentMarkdown && project.contentMarkdown !== project.description && (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 text-slate-300 text-sm whitespace-pre-line leading-relaxed font-sans">
                {project.contentMarkdown}
              </div>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-200 bg-white/5 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-6 text-xs text-slate-300">
              {project.metrics.stars ? (
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <strong>{project.metrics.stars}</strong> GitHub Stars
                </span>
              ) : null}
              {project.metrics.views ? (
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <strong>{project.metrics.views}</strong> Verified Pageviews
                </span>
              ) : null}
              {project.createdAt && (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Deployed: {formatDate(project.createdAt)}
                </span>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
