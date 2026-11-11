"use client";

import React from "react";
import {
  User,
  GraduationCap,
  Award,
  Zap,
  Shield,
  Layers,
  MapPin,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { UserProfile, Education } from "@/types";
import DownloadCvButton from "@/components/DownloadCvButton";

interface AboutSectionProps {
  profile: UserProfile;
  education?: Education[];
}

export default function AboutSection({ profile, education }: AboutSectionProps) {
  const principles = [
    {
      icon: Zap,
      title: "Sub-Second Performance",
      description: "Optimized server streaming, edge caching, and lean client bundles to achieve sub-second load times.",
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    },
    {
      icon: Shield,
      title: "Resilient System Design",
      description: "Fault-tolerant microservices, automated recovery loops, and strict TypeScript types across the stack.",
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    },
    {
      icon: Sparkles,
      title: "Design System Craftsmanship",
      description: "Obsessive focus on fluid micro-interactions, responsive accessibility, and cohesive design tokens.",
      color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    },
    {
      icon: Layers,
      title: "Agentic AI Integration",
      description: "Chaining multimodal LLM models, vector embeddings, and webhooks into reliable production workflows.",
      color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & VISION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering with <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Purpose & Rigor</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Bridging high-level product design with robust distributed system architectures.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Bio & Quick Facts */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass rounded-3xl p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>The Engineering Philosophy</span>
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>{profile.bio}</p>
                {profile.tagline && (
                  <p className="text-slate-400 text-sm">{profile.tagline}</p>
                )}
              </div>

              {/* Direct Info Badges */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Phone className="w-4 h-4 text-indigo-400" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Verified Top Contributor</span>
                </div>
              </div>

              {/* Direct PDF CV Download */}
              <div className="pt-2">
                <DownloadCvButton
                  profile={profile}
                  education={education}
                  variant="outline"
                  className="w-full justify-center bg-white/5 hover:bg-white/10"
                />
              </div>
            </div>

            {/* Academic Credentials if available */}
            {education && education.length > 0 && (
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="glass rounded-3xl p-6 border border-white/10 space-y-4">
                    <div className="flex items-center gap-2.5 text-white font-bold text-base">
                      <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4>{edu.degree}</h4>
                        <p className="text-xs font-normal text-slate-400">
                          {edu.institution} {edu.grade ? `• ${edu.grade}` : ""}
                        </p>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-xs text-slate-400 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right: Core Engineering Principles Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass glass-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between space-y-4"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
