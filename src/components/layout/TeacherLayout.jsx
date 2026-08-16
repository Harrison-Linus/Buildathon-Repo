import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  LayoutDashboard,
  LogOut,
  UserCheck,
  Award,
  ArrowRightLeft,
  BookOpen,
  Bell,
  Search,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function TeacherLayout() {
  const { teacherInfo, notificationMessage, logout } = useAcademic();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Dynamic Toast Notification Banner */}
      {notificationMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl font-semibold text-sm flex items-center gap-3 animate-in slide-in-from-top border border-white/20">
          <UserCheck className="w-5 h-5" />
          <span>{notificationMessage}</span>
        </div>
      )}

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                EduPulse <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">Faculty Suite</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Department of Computer Science & Engineering</p>
            </div>
          </div>

          {/* Center Class Badge & Role Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-3.5 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-xs font-semibold text-indigo-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Assigned Class: {teacherInfo.assignedClass}</span>
            </div>
          </div>

          {/* Faculty Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
              <img
                src={teacherInfo.avatar}
                alt={teacherInfo.name}
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/50"
              />
              <div className="hidden sm:block text-left">
                <div className="text-sm font-bold text-white leading-tight">{teacherInfo.name}</div>
                <div className="text-[11px] text-slate-400 font-medium">{teacherInfo.designation}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Header Navigation Tabs */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex space-x-1">
            <NavLink
              to="/teacher/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition ${
                  isActive
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Teacher Dashboard</span>
            </NavLink>

            <NavLink
              to="/teacher/students"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition ${
                  isActive
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Users className="w-4 h-4" />
              <span>Student Roster & Marks</span>
            </NavLink>
          </nav>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 px-6 text-center text-xs text-slate-400">
        EduPulse Faculty Management Suite • CSE Department • Academic Term Semester 6
      </footer>
    </div>
  );
}
