import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles, BookOpen, ShieldAlert, ArrowRight, CheckCircle2, Users, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans animate-slide-up">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-xl text-white font-heading tracking-tight">
              EduPulse <span className="text-indigo-400 text-xs px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <Link to="/" className="text-white">Home</Link>
            <Link to="/courses" className="hover:text-white transition">Courses</Link>
            <Link to="/contact" className="hover:text-white transition">Contact & Support</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <span>Portal Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Next-Generation AI Education & Risk Remediation Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white max-w-4xl mx-auto leading-tight font-heading">
          Empowering Academic Excellence with <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Real-Time AI Analytics</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Monitor attendance clearance, predict exam performance, eliminate subject credit backlogs, and receive tailored AI study co-pilot guidance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/courses"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm font-bold shadow-xl shadow-indigo-600/40 transition flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Courses</span>
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-2xl text-sm font-semibold transition"
          >
            <span>Student & Faculty Portal</span>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">AI Academic Co-Pilot</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Deterministic risk engine analyzes your actual exam history, lab submissions, and attendance to generate daily study plans.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Academic Risk Detection</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instant alerts when attendance drops below the 85% requirement or when internal test marks indicate potential subject backlogs.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Faculty Control Suite</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Teachers can edit student records, grade lab assignments, monitor class pass percentages, and export CSV reports.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500">
        Buildathon EduPulse AI Platform • Powered by Express REST & Supabase PostgreSQL
      </footer>
    </div>
  );
}
