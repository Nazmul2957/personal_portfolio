"use client";

import React, { useState, useMemo } from "react";
import {
  FolderGit2,
  ExternalLink,
  Github,
  Star,
  Eye,
  Sparkles,
  Layers,
  ArrowUpRight,
  Maximize2,
} from "lucide-react";
import { Project } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const publishedProjects = useMemo(() => {
    return projects.filter((p) => p.status !== "draft" && p.status !== "archived");
  }, [projects]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [publishedProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return publishedProjects;
    return publishedProjects.filter((p) => p.category === selectedCategory);
  }, [publishedProjects, selectedCategory]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Works & Systems</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Architected for scalability, user engagement, and measurable business impact.
          </p>
        </div>

        {publishedProjects.length === 0 ? (
          <div className="glass rounded-3xl p-12 sm:p-16 text-center space-y-3 border border-white/10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Projects Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Showcase projects added via your Admin Panel will appear here dynamically.
            </p>
          </div>
        ) : (
          <>
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                      : "glass text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const hasMultipleImages = project.images && project.images.length > 1;

            return (
              <div
                key={project.id}
                className="glass glass-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group"
              >
                {/* Image Header with Hover Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md border border-white/15">
                      {project.category}
                    </span>
                  </div>

                  {/* Multi-image indicator */}
                  {hasMultipleImages && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-white bg-indigo-600/80 backdrop-blur-md">
                        +{project.images!.length} images
                      </span>
                    </div>
                  )}

                  {/* Hover Quick Overlay */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="p-3 rounded-xl bg-white text-slate-950 font-medium text-xs flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform"
                      title="View Case Study"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Case Study</span>
                    </button>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-xl bg-indigo-600 text-white font-medium text-xs flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
                      >
                        {project.title}
                      </h3>
                      {project.metrics?.stars ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full shrink-0">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {project.metrics.stars}
                        </span>
                      ) : null}
                    </div>

                    {project.subtitle && (
                      <p className="text-xs text-indigo-400 font-medium line-clamp-1">
                        {project.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 bg-white/5 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-mono text-slate-400 bg-white/5">
                          +{project.techStack.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <span>Inspect Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                            title="Live Preview"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </>
    )}

      </div>
    </section>
  );
}
