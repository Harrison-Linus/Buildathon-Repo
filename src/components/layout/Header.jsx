import React, { useState } from 'react';
import { Bell, Search, GraduationCap, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function Header({ toggleSidebar, isSidebarOpen }) {
  const { currentStudent } = useAcademic();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Maths Internal Score Recalculated',
      time: 'Just now',
      desc: `Current score: ${currentStudent.subjects[0]?.score}%. Faculty updated test marks.`,
    },
    {
      id: 2,
      type: 'critical',
      title: 'Attendance Track',
      time: 'Today',
      desc: `Overall attendance is ${currentStudent.metrics.attendance}%. Needs 85% for End-Sem clearance.`,
    },
    {
      id: 3,
      type: 'success',
      title: 'Java Assignment Graded',
      time: '2 days ago',
      desc: 'Full score 10/10 awarded on Spring Boot Lab.',
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left Search / Breadcrumb */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects, topics, syllabus, recommendations..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
            />
          </div>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Semester Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/80 border border-indigo-100 rounded-full text-indigo-700 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>{currentStudent.semester} • {currentStudent.batch}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-800 text-sm">Academic Alerts</h4>
                    <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      {notifications.length} new
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-3 hover:bg-slate-50/80 rounded-lg px-2 transition">
                      <div className="flex items-start gap-2.5">
                        {n.type === 'critical' ? (
                          <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                        ) : n.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Quick View */}
          <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-100"
            />
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold text-slate-800 leading-tight">
                {currentStudent.name}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {currentStudent.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
