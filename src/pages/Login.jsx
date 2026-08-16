import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  UserCheck,
  Users,
} from 'lucide-react';
import { studentData, teacherInfo } from '../data/mockData';
import { useAcademic } from '../context/AcademicContext';

export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useAcademic();
  const [identifier, setIdentifier] = useState('CSE2023-084');
  const [password, setPassword] = useState('student@123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRole('student');
      navigate('/dashboard');
    }, 400);
  };

  const handleStudentDemoLogin = () => {
    setRole('student');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 300);
  };

  const handleTeacherDemoLogin = () => {
    setRole('teacher');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/teacher/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800/50">
        {/* Left Brand Showcase Column */}
        <div className="lg:col-span-6 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-white">
                  EduPulse{' '}
                  <span className="text-xs uppercase font-bold tracking-widest px-2 py-0.5 bg-white/20 rounded-full ml-1">
                    AI
                  </span>
                </h1>
                <p className="text-xs text-indigo-200">
                  Student & Teacher Academic Portal
                </p>
              </div>
            </div>

            <div className="mt-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-100 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Member 1 & Member 2 Enabled
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 leading-tight font-heading">
                Transforming academic management for students & faculty.
              </h2>
              <p className="text-sm text-indigo-100/90 mt-3 leading-relaxed">
                Real-time performance tracking, attendance management, internal score editing, and automated risk detection.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 space-y-2.5 text-xs text-indigo-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Student Portal: Attendance & Weak Subject Diagnostics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Teacher Dashboard: Class Roster, Score & Attendance Editor</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Live Recalculation & Automated Risk Flagging</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-white flex flex-col justify-between space-y-6">
          <div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Portal Login</h3>
              <p className="text-xs text-slate-500 mt-0.5">Select a demo portal or enter credentials</p>
            </div>

            {/* Quick Demo Login Preset Banners */}
            <div className="mt-6 space-y-3">
              {/* Teacher Demo Login */}
              <div className="p-3.5 rounded-2xl bg-indigo-900 text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-indigo-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{teacherInfo.name}</p>
                    <p className="text-[10px] text-indigo-200">Teacher / HOD • {teacherInfo.assignedClass}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleTeacherDemoLogin}
                  disabled={isLoading}
                  className="px-3.5 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1 shadow"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Teacher Login</span>
                </button>
              </div>

              {/* Student Demo Login */}
              <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    KV
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{studentData.name}</p>
                    <p className="text-[10px] text-slate-500">Student • {studentData.department}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleStudentDemoLogin}
                  disabled={isLoading}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1 shadow"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Student Login</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  User ID / Email
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. CSE2023-084 or teacher@university.edu"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
            <p>EduPulse Buildathon Suite • Teacher & Student Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
