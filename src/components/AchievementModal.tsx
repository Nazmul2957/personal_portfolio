"use client";

import React, { useState } from "react";
import {
  X,
  Award,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { Achievement } from "@/types";

interface AchievementModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementModal({
  achievement,
  onClose,
}: AchievementModalProps) {
  const [copied, setCopied] = useState(false);

  if (!achievement) return null;

  const handleCopyId = () => {
    if (achievement.credentialId) {
      navigator.clipboard.writeText(achievement.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryTheme = (cat: string) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("cert")) {
      return {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: "text-emerald-400",
        border: "from-emerald-500/30 via-teal-500/10 to-transparent",
      };
    }
    if (c.includes("award")) {
      return {
        badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        icon: "text-amber-400",
        border: "from-amber-500/30 via-orange-500/10 to-transparent",
      };
    }
    if (c.includes("honor")) {
      return {
        badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        icon: "text-purple-400",
        border: "from-purple-500/30 via-pink-500/10 to-transparent",
      };
    }
    return {
      badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      icon: "text-indigo-400",
      border: "from-indigo-500/30 via-purple-500/10 to-transparent",
    };
  };

  const theme = getCategoryTheme(achievement.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className={`relative z-10 w-full max-w-2xl bg-slate-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-gradient-to-b ${theme.border}`}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <Award className={`w-5 h-5 ${theme.icon}`} />
            </div>
            <div>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${theme.badge}`}
              >
                {achievement.category || "Achievement"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Certificate Image if available */}
          {achievement.imageUrl && (
            <div className="relative w-full max-h-64 rounded-2xl overflow-hidden border border-white/10 bg-slate-900 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={achievement.imageUrl}
                alt={achievement.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          {/* Title & Organization */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {achievement.title}
              </h3>
              {achievement.isFeatured && (
                <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20" title="Featured Credential">
                  <Sparkles className="w-4 h-4" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm sm:text-base">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>{achievement.organization}</span>
              <span title="Verified Authority">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </span>
            </div>
          </div>

          {/* Dates & Credential ID Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-mono">
            {achievement.issueDate && (
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>
                  Issued:{" "}
                  <strong className="text-white">{achievement.issueDate}</strong>
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                Expires:{" "}
                <strong className="text-white">
                  {achievement.expiryDate || "Lifetime / No Expiry"}
                </strong>
              </span>
            </div>

            {achievement.credentialId && (
              <div className="sm:col-span-2 flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                <span className="text-slate-400 truncate">
                  Credential ID:{" "}
                  <span className="text-indigo-300 font-bold">
                    {achievement.credentialId}
                  </span>
                </span>
                <button
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs border border-white/10 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          {achievement.description && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Credential Overview & Scope
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {achievement.description}
              </p>
            </div>
          )}

          {/* Verification CTA */}
          {achievement.credentialUrl && (
            <div className="pt-2">
              <a
                href={achievement.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01]"
              >
                <span>Verify Credential on Issuer Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
