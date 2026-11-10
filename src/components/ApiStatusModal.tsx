"use client";

import React from "react";
import {
  X,
  Server,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Code,
  SlidersHorizontal,
  Layers,
  Send,
} from "lucide-react";
import { ApiStatusInfo } from "@/types";

interface ApiStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiStatus: ApiStatusInfo;
  onRefresh: () => void;
  isRefreshing: boolean;
  counts: {
    skills: number;
    projects: number;
    experiences: number;
    testimonials: number;
    references: number;
    articles: number;
  };
}

export default function ApiStatusModal({
  isOpen,
  onClose,
  apiStatus,
  onRefresh,
  isRefreshing,
  counts,
}: ApiStatusModalProps) {
  if (!isOpen) return null;

  const endpoints = [
    {
      method: "GET",
      path: "/profile",
      description: "Admin User Profile, Bio, Tagline & Social Accounts",
      activeCount: "Loaded",
    },
    {
      method: "GET",
      path: "/skills",
      description: "Technical Matrix, Proficiency %, Category & Experience",
      activeCount: `${counts.skills} skills`,
    },
    {
      method: "GET",
      path: "/projects",
      description: "Projects Showcase with Base64 Image Galleries & Tech Stack",
      activeCount: `${counts.projects} projects`,
    },
    {
      method: "GET",
      path: "/experiences",
      description: "Work Experience Timeline, Positions & Accomplishments",
      activeCount: `${counts.experiences} roles`,
    },
    {
      method: "GET",
      path: "/references",
      description: "Verified Executive Endorsements & Peer Mentors",
      activeCount: `${counts.references} references`,
    },
    {
      method: "GET",
      path: "/testimonials/public",
      description: "Client Recommendations, Ratings & LinkedIn Badges",
      activeCount: `${counts.testimonials} testimonials`,
    },
    {
      method: "GET",
      path: "/articles/public",
      description: "CMS Technical Articles, Reading Times, Views & Likes",
      activeCount: `${counts.articles} articles`,
    },
    {
      method: "POST",
      path: "/inquiries/public",
      description: "Public Contact Form submissions routed to Admin Inbox",
      activeCount: "Live Ready",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl bg-slate-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Admin Panel API Integration</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    apiStatus.isConnected
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {apiStatus.isConnected ? "CONNECTED" : "FALLBACK ACTIVE"}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Connected GET endpoints controlling this portfolio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Health info banner */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-white flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    apiStatus.isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }`}
                />
                Active Source:{" "}
                <span className="font-mono text-indigo-400">{apiStatus.source}</span>
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                Backend: {apiStatus.backendUrl}
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                Admin Panel: {apiStatus.adminUrl}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Re-sync Now</span>
              </button>

              <a
                href={`${apiStatus.adminUrl}/dashboard`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
              >
                <span>Admin</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Endpoints Table / List */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Discovered GET Endpoints & Status
            </h4>

            <div className="space-y-2">
              {endpoints.map((ep, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          ep.method === "GET"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="font-mono text-xs font-semibold text-white">
                        {ep.path}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{ep.description}</p>
                  </div>

                  <span className="text-[11px] font-mono text-slate-300 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5 shrink-0 self-start sm:self-center">
                    {ep.activeCount}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
