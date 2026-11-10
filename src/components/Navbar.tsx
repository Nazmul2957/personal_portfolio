"use client";

import React, { useState, useEffect } from "react";
import {
  Code2,
  Moon,
  Sun,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { ApiStatusInfo, UserProfile } from "@/types";

interface NavbarProps {
  profile: UserProfile;
  apiStatus: ApiStatusInfo;
  onRefresh: () => void;
  isRefreshing: boolean;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onOpenApiModal: () => void;
}

export default function Navbar({
  profile,
  apiStatus,
  onRefresh,
  isRefreshing,
  theme,
  onToggleTheme,
  onOpenApiModal,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 glass shadow-xl shadow-black/10 border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <span>{profile.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-wider uppercase">
              {profile.title.split("&")[0]?.trim() || "Full Stack & AI"}
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/40 dark:bg-slate-950/40 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Controls & CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* API Status Button */}
          <button
            onClick={onOpenApiModal}
            title={`API: ${apiStatus.source} (Click to inspect GET APIs)`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-white/10 bg-slate-900/60 hover:bg-slate-800 transition-all text-slate-300"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                apiStatus.isConnected ? "bg-emerald-400 shadow-sm shadow-emerald-400" : "bg-amber-400"
              }`}
            />
            <span className="hidden md:inline">
              {apiStatus.isConnected ? "Admin API Active" : "Fallback Data"}
            </span>
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Quick Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Fetch latest updates from Admin Panel"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-indigo-400" : ""}`} />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Let&apos;s Connect
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenApiModal}
            className="p-2 rounded-lg text-slate-300 border border-white/5 bg-slate-900"
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full ${
                apiStatus.isConnected ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass border-b border-white/10 px-6 py-6 animate-fade-in">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-indigo-400 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onRefresh}
                className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 px-3 py-2 rounded-lg"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                Sync with Admin
              </button>
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg bg-white/5 text-slate-300"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
