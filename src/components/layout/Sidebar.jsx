import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  Sparkles,
  LogOut,
  GraduationCap,
  BookOpen,
  ShieldAlert,
  ChevronRight,
  ArrowRightLeft,
  Users,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { currentStudent, setRole } = useAcademic();

  const navItems = [
    {
      label: 'Student Dashboard',
      to: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: 'Performance Analysis',
      to: '/performance',
      icon: LineChart,
      badge: 'Updated',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      label: 'AI Recommendations',
      to: '/recommendations',
      icon: Sparkles,
      badge: '4 Active',
      badgeColor: 'bg-indigo-100 text-indigo-700',
    },
  ];

  const handleSwitchToTeacher = () => {
    setRole('teacher');
    navigate('/teacher/dashboard');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-slate-900 text-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo */}
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                EduPulse <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">AI</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Student Academic Portal</p>
            </div>
          </div>
        </div>

        {/* Student Quick Profile Card */}
        <div className="p-4 mx-3 my-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl">
          <div className="flex items-center gap-3">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-indigo-500/50"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">{currentStudent.name}</h4>
              <p className="text-xs text-indigo-300 truncate">{currentStudent.department}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{currentStudent.year} • {currentStudent.section}</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-700/50 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-slate-900/60 rounded-lg py-1.5 px-2">
              <div className="text-[10px] text-slate-400">Attendance</div>
              <div className={`font-bold ${currentStudent.metrics.attendance < 85 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {currentStudent.metrics.attendance}%
              </div>
            </div>
            <div className="bg-slate-900/60 rounded-lg py-1.5 px-2">
              <div className="text-[10px] text-slate-400">Academic Risk</div>
              <div className={`font-bold ${currentStudent.academicRisk.level === 'High' ? 'text-rose-400' : currentStudent.academicRisk.level === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                {currentStudent.academicRisk.level}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Main Menu
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition ${isActive ? 'opacity-100' : ''}`} />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Role Switcher Link */}
          <button
            onClick={handleSwitchToTeacher}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm text-indigo-300 bg-indigo-900/30 border border-indigo-500/30 hover:bg-indigo-900/50 transition cursor-pointer mt-2"
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Teacher Dashboard</span>
            </div>
            <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
          </button>

          <div className="pt-4 px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Shortcuts
          </div>

          <NavLink
            to="/recommendations"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Math Practice (45m)</span>
          </NavLink>

          <NavLink
            to="/performance"
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Risk Diagnostics</span>
          </NavLink>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-rose-900/30 hover:text-rose-300 text-slate-300 rounded-xl text-sm font-medium transition cursor-pointer border border-slate-700/60"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            Buildathon v1.0 • Student Portal
          </p>
        </div>
      </aside>
    </>
  );
}
