"use client";

import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Experience & <span className="bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Track record of driving velocity and shipping robust architectures.
          </p>
        </div>

        {/* Timeline or Empty State */}
        {experiences.length === 0 ? (
          <div className="glass rounded-3xl p-12 sm:p-16 text-center space-y-3 border border-white/10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Experience Records Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Career milestones and work experience added via your Admin Panel will appear here dynamically.
            </p>
          </div>
        ) : (
          <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-6 sm:pl-10 group">
                
                {/* Timeline node */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                    exp.isCurrent
                      ? "bg-emerald-400 border-slate-950 shadow-md shadow-emerald-400/50"
                      : "bg-slate-800 border-indigo-500 group-hover:bg-indigo-400"
                  }`}
                />

                {/* Timeline Card */}
                <div className="glass glass-hover rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
                  
                  {/* Top Bar: Role & Company */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-indigo-400 font-medium">
                        <span>{exp.company}</span>
                        {exp.companyUrl && (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Employment Tag & Current Pill */}
                    <div className="flex items-center gap-2">
                      {exp.isCurrent && (
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Present</span>
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono text-slate-400 bg-white/5 border border-white/5">
                        {exp.employmentType}
                      </span>
                    </div>
                  </div>

                  {/* Date & Location Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>
                        {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate || "N/A"}
                      </span>
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{exp.location}</span>
                      </span>
                    )}
                  </div>

                  {/* Description Paragraph */}
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {/* Bullet achievements if any */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Key Deliverables:
                      </p>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack pills */}
                  {exp.techUsed && exp.techUsed.length > 0 && (
                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                      {exp.techUsed.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
