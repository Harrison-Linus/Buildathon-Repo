import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, GraduationCap, BookOpen, BarChart3, LogOut, ArrowRightLeft } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAcademic();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                EduPulse <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">Admin Portal</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Institution Academic Administration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sub Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6">
        <div className="max-w-7xl mx-auto flex space-x-1 overflow-x-auto">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
                isActive ? 'border-rose-500 text-rose-400 bg-slate-800/60' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/students"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
                isActive ? 'border-rose-500 text-rose-400 bg-slate-800/60' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <Users className="w-4 h-4" />
            <span>Manage Students</span>
          </NavLink>

          <NavLink
            to="/admin/teachers"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
                isActive ? 'border-rose-500 text-rose-400 bg-slate-800/60' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <GraduationCap className="w-4 h-4" />
            <span>Manage Faculty</span>
          </NavLink>

          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
                isActive ? 'border-rose-500 text-rose-400 bg-slate-800/60' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <BookOpen className="w-4 h-4" />
            <span>Manage Courses</span>
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
                isActive ? 'border-rose-500 text-rose-400 bg-slate-800/60' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics & Reports</span>
          </NavLink>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        EduPulse Administrative Control Suite • System Status: All Nodes Normal
      </footer>
    </div>
  );
}
