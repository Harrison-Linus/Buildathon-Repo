import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { studentData } from '../data/mockData';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('CSE2023-084');
  const [password, setPassword] = useState('student@123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  const handleDemoLogin = () => {
    setIdentifier('CSE2023-084');
    setPassword('student@123');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800/50">
        
        {/* Left Brand Showcase Column */}
        <div className="lg:col-span-6 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative background circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-white">
                  EduPulse <span className="text-xs uppercase font-bold tracking-widest px-2 py-0.5 bg-white/20 rounded-full ml-1">AI</span>
                </h1>
                <p className="text-xs text-indigo-200">Next-Gen Academic Performance Suite</p>
              </div>
            </div>

            <div className="mt-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-100 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Member 1 Scope • Student Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 leading-tight font-heading">
                Transforming student performance through actionable AI insights.
              </h2>
              <p className="text-sm text-indigo-100/90 mt-3 leading-relaxed">
                Real-time tracking of attendance, examination trends, early academic risk indicators, and customized study remediation plans.
              </p>
            </div>
          </div>

          {/* Quick Feature Pills */}
          <div className="mt-8 pt-6 border-t border-white/15 space-y-2.5 text-xs text-indigo-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Personalized Subject Performance & Weak Topic Diagnostics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Early Risk Warning System & Attendance Simulators</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>AI Tailored 45-Min Focused Study Schedules</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Student Sign In</h3>
                <p className="text-xs text-slate-500 mt-0.5">Enter your student ID and credentials</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                Student Access
              </span>
            </div>

            {/* Quick Demo Login Preset Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    KV
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{studentData.name}</p>
                    <p className="text-[11px] text-slate-500">{studentData.department} • {studentData.year}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Demo Login</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Roll Number / Student ID
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. CSE2023-084"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition text-slate-800"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <span className="text-xs text-indigo-600 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition text-slate-800"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                  <span>Remember my session</span>
                </label>
                <span className="text-slate-400">Academic Year 2025-2026</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-slate-900 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Student Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
            <p>Protected Student Authentication • Hackathon Build</p>
          </div>
        </div>

      </div>
    </div>
  );
}
