"use client";

import React from "react";
import {
  Code2,
  Github,
  Linkedin,
  Twitter,
  Heart,
  ArrowUp,
  Settings,
  ExternalLink,
} from "lucide-react";
import { UserProfile } from "@/types";

interface FooterProps {
  profile: UserProfile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">{profile.name}</p>
              <p className="text-xs text-slate-400">{profile.title}</p>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#blog" className="hover:text-white transition-colors">Blog</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Controls: Scroll to top & Admin Panel */}
          <div className="flex items-center gap-3">
            <a
              href="http://localhost:3001/dashboard"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
              title="Open Admin Control Panel"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Powered by Next.js 15 & Tailored Admin APIs</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1" />
          </p>
        </div>
      </div>
    </footer>
  );
}
