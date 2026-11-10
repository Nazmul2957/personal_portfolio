"use client";

import React from "react";
import {
  MessageSquareQuote,
  Star,
  Linkedin,
  ShieldCheck,
} from "lucide-react";
import { Testimonial, Reference } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  references?: Reference[];
}

export default function TestimonialsSection({
  testimonials,
  references,
}: TestimonialsSectionProps) {
  const approvedTestimonials = testimonials.filter((t) => t.approved !== false);
  const hasReferences = references && references.length > 0;
  const hasTestimonials = approvedTestimonials.length > 0;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>ENDORSEMENTS & CREDIBILITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Client & Peer <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">Recommendations</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            What leaders and engineering peers say about my technical collaboration.
          </p>
        </div>

        {/* Empty State if neither testimonials nor references */}
        {!hasTestimonials && !hasReferences ? (
          <div className="glass rounded-3xl p-12 sm:p-16 text-center space-y-3 border border-white/10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Recommendations Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Client testimonials and executive endorsements added via your Admin Panel will appear here dynamically.
            </p>
          </div>
        ) : (
          <>
            {/* Testimonials Grid */}
            {hasTestimonials && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {approvedTestimonials.map((item) => (
                  <div
                    key={item.id}
                    className="glass glass-hover rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6"
                  >
                    {/* Stars & Verification */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-700"
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="text-sm text-slate-300 leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    {/* Author Footer */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.authorAvatar ? (
                          <img
                            src={item.authorAvatar}
                            alt={item.authorName}
                            className="w-10 h-10 rounded-full object-cover border border-white/15"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-sm">
                            {item.authorName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-white leading-tight">
                            {item.authorName}
                          </h4>
                          {(item.authorRole || item.company) && (
                            <p className="text-[11px] text-slate-400">
                              {item.authorRole}
                              {item.authorRole && item.company && " • "}
                              {item.company && <span className="text-slate-300">{item.company}</span>}
                            </p>
                          )}
                        </div>
                      </div>

                      {item.linkedInUrl && (
                        <a
                          href={item.linkedInUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                          title="LinkedIn Verification"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* References Subsection if available */}
            {hasReferences && (
              <div className="glass rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Executive References</h3>
                    <p className="text-xs text-slate-400">Available for formal leadership verification upon request</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {references.map((ref) => (
                    <div
                      key={ref.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start justify-between"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white">{ref.name}</h4>
                        {(ref.position || ref.company) && (
                          <p className="text-xs text-indigo-400">
                            {[ref.position, ref.company].filter(Boolean).join(" — ")}
                          </p>
                        )}
                        {ref.relationship && (
                          <p className="text-[11px] text-slate-400">{ref.relationship}</p>
                        )}
                        {ref.description && (
                          <p className="text-xs text-slate-300 pt-1 leading-relaxed">{ref.description}</p>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded shrink-0">
                        Active Ref
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
