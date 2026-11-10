"use client";

import React from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Heart,
  Eye,
  ArrowUpRight,
  Tag,
} from "lucide-react";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export default function BlogSection({ posts, onSelectPost }: BlogSectionProps) {
  const publishedPosts = posts.filter((p) => p.status === "published");

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-pink-400 bg-pink-500/10 border border-pink-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>TECHNICAL WRITING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Articles & <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Architecture Notes</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Deep dives into modern frontend patterns, systems engineering, and low-latency architectures.
          </p>
        </div>

        {/* Blog Grid or Empty State */}
        {publishedPosts.length === 0 ? (
          <div className="glass rounded-3xl p-12 sm:p-16 text-center space-y-3 border border-white/10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mx-auto border border-pink-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Articles Published Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Technical articles and architectural notes published from your Admin Panel will appear here dynamically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publishedPosts.map((post) => (
              <div
                key={post.id}
                className="glass glass-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group cursor-pointer"
                onClick={() => onSelectPost(post)}
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md border border-white/15">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Meta: Date & Read Time */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  {/* Footer: Tags & Metrics */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1 text-pink-400">
                        <Heart className="w-3.5 h-3.5 fill-pink-500/20" />
                        {post.likes}
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
