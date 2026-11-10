"use client";

import React, { useState } from "react";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { UserProfile, InquiryPayload } from "@/types";
import { portfolioApi } from "@/lib/api";

interface ContactSectionProps {
  profile: UserProfile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState<InquiryPayload>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    interestType: "Freelance Project",
    projectBudget: "$15k - $30k",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const interestTypes = [
    "Freelance Project",
    "Full-time Role",
    "Technical Advisory",
    "Speaking / Workshop",
    "General Inquiry",
  ];

  const budgetOptions = [
    "<$5k",
    "$5k - $15k",
    "$15k - $30k",
    "$30k+",
    "Not Applicable",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await portfolioApi.submitInquiry(formData);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(res.message || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET&apos;S COLLABORATE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Initiate a <span className="bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Conversation</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have an ambitious engineering challenge or an upcoming project? Send a note directly to my admin inbox.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Availability */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass rounded-3xl p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Channels</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you need a full-stack system built from the ground up, an architectural audit, or a senior technical lead, I respond within 24 business hours.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all text-slate-300 hover:text-white"
                >
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email Address</p>
                    <p className="text-sm font-semibold text-white">{profile.email}</p>
                  </div>
                </a>

                {profile.phone && (
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-300">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Direct Phone</p>
                      <p className="text-sm font-semibold text-white">{profile.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-300">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Base Location</p>
                    <p className="text-sm font-semibold text-white">{profile.location}</p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Rapid response SLA (&lt;24 hours guaranteed)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Strict NDA and confidential code protection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Form */}
          <div className="lg:col-span-7">
            <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Dispatched!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>! Your message has been routed directly into the Admin Panel Inbox. I will review your specifications and follow up promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                        interestType: "Freelance Project",
                        projectBudget: "$15k - $30k",
                      });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all mt-4"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Interest Type Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Nature of Collaboration
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interestTypes.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, interestType: type })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            formData.interestType === type
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                              : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jane Foster"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">Phone (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone || ""}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">Subject / Project Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Next-Gen Web Architecture"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Budget Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Estimated Budget Range
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((budget) => (
                        <button
                          type="button"
                          key={budget}
                          onClick={() => setFormData({ ...formData, projectBudget: budget })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            formData.projectBudget === budget
                              ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                              : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium">Project Scope & Details *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share project goals, timeline, tech requirements, or role specifics..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting to Inbox...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry to Admin Inbox</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
