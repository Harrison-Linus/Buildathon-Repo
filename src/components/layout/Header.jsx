import React, { useState } from 'react';

import { Bell, Search, GraduationCap, CheckCircle2, AlertTriangle, X, Database, ChevronDown, UserCheck, Plus, UserPlus } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function Header() {
  const { students, currentStudent, currentStudentId, setCurrentStudentId, role, isBackendConnected, addNewStudent } = useAcademic();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStudentMenu, setShowStudentMenu] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');

  const handleCreateStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    addNewStudent({
      name: newStudentName,
      email: newStudentEmail || `${newStudentName.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
    });
    setNewStudentName('');
    setNewStudentEmail('');
    setShowAddStudentModal(false);
    setShowStudentMenu(false);
  };


  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Mathematics Score Recalculated',
      time: 'Just now',
      desc: `Current score: ${currentStudent.subjects[1]?.score || 58}%. Faculty updated internal test marks.`,
    },
    {
      id: 2,
      type: 'critical',
      title: 'Attendance Target Alert',
      time: 'Today',
      desc: `Overall attendance is ${currentStudent.metrics?.attendance}%. Needs 85% for End-Sem clearance.`,
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
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects, topics, recommendations..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-950 text-slate-100 placeholder-slate-400 rounded-xl border border-slate-700/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
            />
          </div>
        </div>

        {/* Action Controls & Badges */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Backend Connection Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 border border-slate-700/80 rounded-full text-xs font-medium text-slate-300">
            <Database className={`w-3.5 h-3.5 ${isBackendConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>{isBackendConnected ? 'Supabase API Connected' : 'Express Server Active'}</span>
            <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`} />
          </div>

          {/* Student Selector Dropdown (Quick Switch) */}
          <div className="relative">
            <button
              onClick={() => setShowStudentMenu(!showStudentMenu)}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/30 rounded-xl text-xs font-semibold text-indigo-300 transition"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Switch Student</span>
              <ChevronDown className="w-3 h-3 text-indigo-400" />
            </button>

            {showStudentMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-slide-up">
                <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                  Select Student Account
                </div>
                <div className="space-y-1 mt-1">
                  {students.map((stu) => (
                    <button
                      key={stu.id}
                      onClick={() => {
                        setCurrentStudentId(stu.id);
                        setShowStudentMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                        stu.id === currentStudentId
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={stu.avatar} alt={stu.name} className="w-6 h-6 rounded-full object-cover" />
                        <div className="text-left">
                          <div>{stu.name}</div>
                          <div className="text-[10px] opacity-75">{stu.id}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${stu.academicRisk?.level === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                        {stu.academicRisk?.level || 'Low'} Risk
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setShowAddStudentModal(true);
                      setShowStudentMenu(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 rounded-xl text-xs font-semibold transition"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Add New Student</span>
                  </button>
                </div>
              </div>
            )}
          </div>


          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-4 z-50 animate-slide-up">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-100 text-sm">Academic Alerts</h4>
                    <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full font-medium border border-indigo-500/30">
                      {notifications.length} new
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-200 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-slate-800/80 max-h-72 overflow-y-auto mt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-3 hover:bg-slate-800/60 rounded-xl px-2 transition">
                      <div className="flex items-start gap-2.5">
                        {n.type === 'critical' ? (
                          <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                        ) : n.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                          <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Profile Info */}
          <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-800">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/30"
            />
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold text-slate-100 leading-tight">
                {currentStudent.name}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {currentStudent.id}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <UserPlus className="w-5 h-5 text-indigo-400" />
                <span>Create New Student Profile</span>
              </div>
              <button onClick={() => setShowAddStudentModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudentSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Student Email</label>
                <input
                  type="email"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  placeholder="e.g. ramesh.cse@university.edu"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
              >
                Save & Add Student
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}


