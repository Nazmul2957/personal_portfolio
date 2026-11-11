"use client";

import React, { useState, useMemo } from "react";
import {
  Award,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles,
  Copy,
  Check,
  Building2,
  FileBadge2,
  Maximize2,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Achievement } from "@/types";
import AchievementModal from "@/components/AchievementModal";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({
  achievements,
}: AchievementsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    achievements.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ["All", ...Array.from(set)];
  }, [achievements]);

  // Filter achievements
  const filteredAchievements = useMemo(() => {
    return achievements.filter((ach) => {
      // Category filter
      if (
        selectedCategory !== "All" &&
        ach.category?.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Featured filter
      if (featuredOnly && !ach.isFeatured) {
        return false;
      }

      // Search keyword filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ach.title?.toLowerCase().includes(q);
        const matchOrg = ach.organization?.toLowerCase().includes(q);
        const matchDesc = ach.description?.toLowerCase().includes(q);
        const matchCred = ach.credentialId?.toLowerCase().includes(q);
        if (!matchTitle && !matchOrg && !matchDesc && !matchCred) {
          return false;
        }
      }

      return true;
    });
  }, [achievements, selectedCategory, featuredOnly, searchQuery]);

  const handleCopy = (idText: string, cardId: string | number) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(cardId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryColor = (cat: string) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("cert")) {
      return {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        border: "hover:border-emerald-500/40",
        glow: "from-emerald-500/15 via-teal-500/5 to-transparent",
        icon: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      };
    }
    if (c.includes("award")) {
      return {
        badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        border: "hover:border-amber-500/40",
        glow: "from-amber-500/15 via-orange-500/5 to-transparent",
        icon: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      };
    }
    if (c.includes("honor")) {
      return {
        badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        border: "hover:border-purple-500/40",
        glow: "from-purple-500/15 via-pink-500/5 to-transparent",
        icon: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      };
    }
    return {
      badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      border: "hover:border-indigo-500/40",
      glow: "from-indigo-500/15 via-purple-500/5 to-transparent",
      icon: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    };
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-slate-950/60">
      {/* Ambient background glows */}
      <div className="ambient-glow w-[500px] h-[500px] bg-indigo-600/10 top-1/3 -left-40" />
      <div className="ambient-glow w-[500px] h-[500px] bg-emerald-600/10 bottom-20 -right-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>HONORS & CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Achievements & <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-indigo-400 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Verified industry certifications, recognized competitive honors, and architectural credentials.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 p-4 rounded-2xl glass border border-white/10">
          
          {/* Categories Tab */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Tools: Search & Featured Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search credentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Featured Only Toggle Button */}
            <button
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                featuredOnly
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-white/5 text-slate-400 border-white/10 hover:text-slate-200"
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${featuredOnly ? "fill-amber-400 text-amber-400" : ""}`} />
              <span>Featured Only</span>
            </button>
          </div>

        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 ? (
          <div className="glass rounded-3xl p-12 sm:p-16 text-center space-y-4 border border-white/10 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
              <FileBadge2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No Achievements Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                {searchQuery || selectedCategory !== "All" || featuredOnly
                  ? "No certifications or awards matched your filter criteria. Try clearing the search or category filters."
                  : "Certifications and honors pushed from your Admin Panel will appear dynamically here."}
              </p>
            </div>
            {(searchQuery || selectedCategory !== "All" || featuredOnly) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setFeaturedOnly(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          /* Achievements Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((ach) => {
              const theme = getCategoryColor(ach.category);
              return (
                <div
                  key={ach.id}
                  className={`group relative glass rounded-3xl border border-white/10 ${theme.border} flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40`}
                >
                  {/* Subtle top ambient glow inside card */}
                  <div
                    className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${theme.glow} opacity-60 pointer-events-none`}
                  />

                  {/* Card Content Top */}
                  <div className="p-6 space-y-4 relative z-10 flex-1">
                    
                    {/* Top Row: Category Pill & Featured Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${theme.badge}`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{ach.category || "Certification"}</span>
                      </span>

                      {ach.isFeatured && (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20"
                          title="Featured Credential"
                        >
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    {/* Image Thumbnail if available */}
                    {ach.imageUrl && (
                      <div
                        onClick={() => setSelectedAchievement(ach)}
                        className="cursor-pointer relative h-36 w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900 group-hover:border-white/20 transition-all"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ach.imageUrl}
                          alt={ach.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="p-2 rounded-xl bg-black/60 text-white backdrop-blur-sm border border-white/10">
                            <Maximize2 className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Title & Organization */}
                    <div className="space-y-1.5">
                      <h3
                        onClick={() => setSelectedAchievement(ach)}
                        className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug cursor-pointer"
                      >
                        {ach.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                        <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate">{ach.organization}</span>
                        <span title="Verified Issuer">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </span>
                      </div>
                    </div>

                    {/* Dates Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400 pt-1">
                      {ach.issueDate && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>Issued: {ach.issueDate}</span>
                        </span>
                      )}
                      {ach.expiryDate ? (
                        <span className="text-slate-400">
                          • Exp: {ach.expiryDate}
                        </span>
                      ) : (
                        <span className="text-emerald-400/90 font-medium">
                          • Lifetime
                        </span>
                      )}
                    </div>

                    {/* Description Paragraph */}
                    {ach.description && (
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {ach.description}
                      </p>
                    )}

                    {/* Credential ID pill */}
                    {ach.credentialId && (
                      <div className="pt-2 flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] font-mono">
                        <span className="text-slate-400 truncate mr-2">
                          ID: <span className="text-indigo-300">{ach.credentialId}</span>
                        </span>
                        <button
                          onClick={() => handleCopy(ach.credentialId!, ach.id)}
                          className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                          title="Copy Credential ID"
                        >
                          {copiedId === ach.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}

                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="p-6 pt-3 border-t border-white/5 flex items-center justify-between gap-2 relative z-10">
                    <button
                      onClick={() => setSelectedAchievement(ach)}
                      className="text-xs font-semibold text-slate-300 hover:text-white hover:underline flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <Maximize2 className="w-3 h-3" />
                    </button>

                    {ach.credentialUrl ? (
                      <a
                        href={ach.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <AchievementModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
}
