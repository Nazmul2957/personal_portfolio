"use client";

import React, { useState, useMemo } from "react";
import {
  Code,
  Search,
  Sparkles,
  CheckCircle,
  Cpu,
  Server,
  Cloud,
  Database,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Skill } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    skills.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return ["All", ...Array.from(set)];
  }, [skills]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.level.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [skills, selectedCategory, searchQuery]);

  // Counts
  const expertCount = skills.filter((s) => s.level === "Expert").length;
  const avgExp = (
    skills.reduce((acc, curr) => acc + (curr.yearsOfExperience || 1), 0) /
    (skills.length || 1)
  ).toFixed(1);

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "frontend":
        return Code;
      case "backend":
        return Server;
      case "cloud & devops":
        return Cloud;
      case "database":
        return Database;
      case "mobile":
        return Smartphone;
      case "ai & ml":
        return Cpu;
      default:
        return Wrench;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Curated proficiency across the modern full-stack development spectrum.
          </p>
        </div>

        {/* If no skills in API at all */}
        {skills.length === 0 ? (
          <div className="glass rounded-3xl p-12 sm:p-16 text-center space-y-3 border border-white/10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Skills Found in API</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Your API currently has 0 skills. When you add skills through your Admin Panel, they will appear here dynamically.
            </p>
          </div>
        ) : (
          <>
            {/* Filter Controls Bar */}
            <div className="glass rounded-3xl p-4 sm:p-6 border border-white/10 mb-8 space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]"
                          : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search tech or level..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

              </div>

              {/* Quick Metrics Bar */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  Showing <strong>{filteredSkills.length}</strong> of {skills.length} skills
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <strong>{expertCount}</strong> Expert-grade technologies
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <strong>{avgExp} yrs</strong> average experience per tool
                </span>
              </div>
            </div>

            {/* Skills Grid */}
            {filteredSkills.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center text-slate-400">
                <p className="text-sm">No skills found matching your filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSkills.map((skill) => {
                  const IconComponent = getCategoryIcon(skill.category);
                  const isExpert = skill.level === "Expert";
                  
                  return (
                    <div
                      key={skill.id}
                      className="glass glass-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4 group"
                    >
                      {/* Top Row: Name, Category & Level */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-indigo-400 group-hover:scale-110 transition-transform">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                              {skill.name}
                            </h4>
                            <p className="text-[11px] text-slate-400">{skill.category}</p>
                          </div>
                        </div>

                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                            isExpert
                              ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                              : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {/* Progress Bar & Percentage */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-400 font-mono">
                            {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? "year" : "years"} exp
                          </span>
                          <span className="text-xs font-mono font-bold text-white">
                            {skill.proficiency}%
                          </span>
                        </div>

                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 shadow-sm"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
