import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, BookOpen, AlertTriangle, TrendingUp, ShieldCheck, Award, Download } from 'lucide-react';
import { apiService } from '../../services/api';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminStats() {
      try {
        const res = await apiService.getAdminAnalytics();
        if (res.success && res.data) {
          setAnalytics(res.data);
        }
      } catch (err) {
        console.warn('Failed loading admin analytics');
      } finally {
        setLoading(false);
      }
    }
    loadAdminStats();
  }, []);

  const stats = analytics || {
    totalStudents: 68,
    totalTeachers: 12,
    totalCourses: 16,
    averageClassAttendance: 86,
    overallPassPercentage: 92,
    atRiskCount: 4,
    departmentPerformance: [
      { department: 'Computer Science', passPercentage: 94, avgGpa: 8.4 },
      { department: 'Electronics & Comm.', passPercentage: 88, avgGpa: 7.9 },
      { department: 'Information Tech.', passPercentage: 91, avgGpa: 8.1 },
      { department: 'Mechanical Eng.', passPercentage: 85, avgGpa: 7.5 },
    ],
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Institutional Oversight & Monitoring</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-2">
              System Admin Dashboard
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Cross-departmental performance monitoring, academic risk tracking, faculty load, and institutional pass rates.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">
            <span>Enrolled Students</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">{stats.totalStudents}</div>
          <span className="text-[11px] text-emerald-400 font-medium">● Active Profiles</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">
            <span>Faculty Count</span>
            <GraduationCap className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">{stats.totalTeachers}</div>
          <span className="text-[11px] text-slate-400 font-medium">Assigned Professors</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">
            <span>Pass Rate</span>
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{stats.overallPassPercentage}%</div>
          <span className="text-[11px] text-slate-400 font-medium">+2% vs Last Academic Year</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">
            <span>At-Risk Students</span>
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400">{stats.atRiskCount}</div>
          <span className="text-[11px] text-rose-300 font-medium">Intervention Recommended</span>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <h3 className="font-bold text-base text-white">Departmental Performance & Pass Rates</h3>
        <div className="divide-y divide-slate-800">
          {stats.departmentPerformance.map((dept, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block">{dept.department}</span>
                <span className="text-[11px] text-slate-400">Avg Cumulative GPA: {dept.avgGpa} / 10</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-400 block">{dept.passPercentage}% Pass Rate</span>
                <div className="w-32 bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${dept.passPercentage}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
