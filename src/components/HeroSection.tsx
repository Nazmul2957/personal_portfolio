"use client";

import React from "react";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Sparkles,
  Terminal,
  CheckCircle2,
  Cpu,
  Layers,
  Star,
  ShieldCheck,
} from "lucide-react";
import { UserProfile } from "@/types";

interface HeroSectionProps {
  profile: UserProfile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="ambient-glow w-[550px] h-[550px] bg-indigo-600/15 top-1/4 -left-48" />
      <div className="ambient-glow w-[600px] h-[600px] bg-purple-600/15 top-1/3 -right-48" />
      <div className="ambient-glow w-[400px] h-[400px] bg-emerald-600/10 bottom-10 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-emerald-500/20 text-xs font-medium text-emerald-400 shadow-sm animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile.availability}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Crafting <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Digital Brilliance</span> with Modern Architecture.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0">
                Hi, I&apos;m <span className="text-white font-semibold underline decoration-indigo-500 decoration-2 underline-offset-4">{profile.name}</span> — {profile.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {profile.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] transition-all"
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white glass glass-hover rounded-xl transition-all"
              >
                <span>Get In Touch</span>
              </a>

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl border border-white/5 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Resume</span>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-2">
                Connect:
              </span>
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass glass-hover text-slate-400 hover:text-white transition-all"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass glass-hover text-slate-400 hover:text-white transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass glass-hover text-slate-400 hover:text-white transition-all"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {profile.socialLinks.website && (
                <a
                  href={profile.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass glass-hover text-slate-400 hover:text-white transition-all"
                  title="Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Quick Metrics Bar */}
            {profile.metrics && (
              (profile.metrics.yearsExperience || 0) > 0 ||
              (profile.metrics.completedProjects || 0) > 0 ||
              (profile.metrics.openSourceStars || 0) > 0 ||
              (profile.metrics.happyClients || 0) > 0
            ) && (
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
                {(profile.metrics.yearsExperience || 0) > 0 && (
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white">
                      {profile.metrics.yearsExperience}+
                    </p>
                    <p className="text-xs text-slate-400">Years Experience</p>
                  </div>
                )}
                {(profile.metrics.completedProjects || 0) > 0 && (
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
                      {profile.metrics.completedProjects}+
                    </p>
                    <p className="text-xs text-slate-400">Projects Shipped</p>
                  </div>
                )}
                {(profile.metrics.openSourceStars || 0) > 0 && (
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-purple-400">
                      {profile.metrics.openSourceStars}+
                    </p>
                    <p className="text-xs text-slate-400">GitHub Stars</p>
                  </div>
                )}
                {(profile.metrics.happyClients || 0) > 0 && (
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                      {profile.metrics.happyClients}+
                    </p>
                    <p className="text-xs text-slate-400">Happy Clients</p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Lucrative Interactive Glass Terminal / Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame with gradient border */}
              <div className="p-1 rounded-3xl bg-gradient-to-b from-indigo-500/40 via-purple-500/20 to-transparent shadow-2xl">
                <div className="rounded-[22px] bg-slate-950/90 backdrop-blur-xl border border-white/10 p-6 space-y-6">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-2">arch-telemetry.ts</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      <Terminal className="w-3 h-3" />
                      <span>LIVE</span>
                    </div>
                  </div>

                  {/* Code / Architecture Snippet */}
                  <div className="font-mono text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-white/5">
                    <p className="text-purple-400 font-semibold">// Continuous Innovation Engine</p>
                    <p>
                      <span className="text-indigo-400">const</span> engineer = &#123;
                    </p>
                    <p className="pl-4">
                      name: <span className="text-emerald-300">&quot;{profile.name}&quot;</span>,
                    </p>
                    <p className="pl-4">
                      status: <span className="text-amber-300">&quot;Shipping Production Systems&quot;</span>,
                    </p>
                    <p className="pl-4">
                      architecture: [<span className="text-emerald-300">&quot;Next.js 15&quot;</span>, <span className="text-emerald-300">&quot;Rust Tokio&quot;</span>, <span className="text-emerald-300">&quot;Microservices&quot;</span>],
                    </p>
                    <p className="pl-4">
                      ai_pipelines: <span className="text-indigo-400">true</span>,
                    </p>
                    <p className="pl-4">
                      performance_score: <span className="text-pink-400">99.8</span>
                    </p>
                    <p>&#125;;</p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                      <Cpu className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-white">Low Latency</p>
                        <p className="text-[11px] text-slate-400">&lt;50ms API endpoints</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-white">Robust Security</p>
                        <p className="text-[11px] text-slate-400">RBAC, JWT, OAuth2</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                      <Layers className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-white">Full Stack</p>
                        <p className="text-[11px] text-slate-400">Frontend to Cloud Ops</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                      <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-white">AI Automation</p>
                        <p className="text-[11px] text-slate-400">LLMs & Agentic Chains</p>
                      </div>
                    </div>
                  </div>

                  {/* Location & Availability Footer */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-indigo-400" />
                      {profile.location}
                    </span>
                    <span className="text-emerald-400 font-medium">Ready for deployment</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
