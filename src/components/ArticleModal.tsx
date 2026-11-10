"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  Heart,
  Eye,
  Share2,
  Check,
  Tag,
  BookOpen,
} from "lucide-react";
import { BlogPost } from "@/types";
import { formatFullDate } from "@/lib/utils";
import { portfolioApi } from "@/lib/api";

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function ArticleModal({ post, onClose }: ArticleModalProps) {
  const [likes, setLikes] = useState<number>(post?.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
      setLikes(post.likes);
      setHasLiked(false);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [post]);

  if (!post) return null;

  const handleLike = async () => {
    if (hasLiked) return;
    setLikes((prev) => prev + 1);
    setHasLiked(true);
    try {
      await portfolioApi.likeArticle(post.id);
    } catch {}
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-slate-950 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                {formatFullDate(post.publishedAt || post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {post.views} views
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>

            {post.summary && (
              <p className="text-base text-slate-300 italic border-l-2 border-indigo-500 pl-4 py-1">
                {post.summary}
              </p>
            )}
          </div>

          {/* Cover Image if present */}
          {post.coverImage && (
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-white/10">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Markdown Body */}
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 leading-relaxed font-sans text-sm sm:text-base whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {post.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl text-xs font-mono text-slate-300 bg-white/5 border border-white/5"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Like Interaction Footer */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Enjoyed this technical breakdown?</p>
              <p className="text-sm font-semibold text-white">Leave an engineering endorsement</p>
            </div>

            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                hasLiked
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30 scale-105"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? "fill-white" : ""}`} />
              <span>{hasLiked ? "Applauded!" : "Applaud"}</span>
              <span className="font-mono bg-black/20 px-1.5 py-0.5 rounded text-[11px] ml-1">
                {likes}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
