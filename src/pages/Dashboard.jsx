import React from 'react';
import {
  Calendar,
  Award,
  FileCheck,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { studentData } from '../data/mockData';
import MetricCard from '../components/dashboard/MetricCard';
import AcademicRiskCard from '../components/dashboard/AcademicRiskCard';
import SubjectPerformanceChart from '../components/dashboard/SubjectPerformanceChart';
import WeakSubjectAlert from '../components/dashboard/WeakSubjectAlert';
import AIRecommendationCard from '../components/dashboard/AIRecommendationCard';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { name, department, year, semester, metrics, academicRisk, subjects, aiRecommendations } = studentData;

  const weakSubject = subjects.find((s) => s.status === 'Weak') || subjects[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        {/* Glow decoration */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Academic Co-Pilot Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Welcome back, {name}! 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              {department} • <span className="text-indigo-200 font-semibold">{year}</span> ({semester})
            </p>
          </div>

          {/* Quick Snapshot Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-left">
              <div className="text-[11px] text-slate-300 font-medium">Cumulative GPA</div>
              <div className="text-lg font-bold text-white">{metrics.gpa}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-left">
              <div className="text-[11px] text-slate-300 font-medium">Class Standing</div>
              <div className="text-lg font-bold text-indigo-300">#{metrics.rankInClass} <span className="text-xs font-normal text-slate-300">/ {metrics.totalStudents}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <MetricCard
          title="Overall Attendance"
          value={metrics.attendance}
          unit="%"
          target="85%"
          subtitle={`${metrics.attendanceClassesPresent} / ${metrics.attendanceTotalClasses} periods attended`}
          icon={Calendar}
          color={metrics.attendance >= 85 ? 'emerald' : 'amber'}
          progressValue={metrics.attendance}
          trend={metrics.attendance >= 85 ? 'On Track' : 'Needs +3%'}
          trendDirection={metrics.attendance >= 85 ? 'up' : 'down'}
        />

        <MetricCard
          title="Assignment Average"
          value={metrics.assignmentAverage}
          unit="%"
          target="80%"
          subtitle="Evaluated across 8 submitted tasks"
          icon={FileCheck}
          color="indigo"
          progressValue={metrics.assignmentAverage}
          trend="+5% vs Last Sem"
          trendDirection="up"
        />

        <MetricCard
          title="Examination Average"
          value={metrics.examinationAverage}
          unit="%"
          target="75%"
          subtitle="Based on Internal Tests 1 & 2"
          icon={GraduationCap}
          color="rose"
          progressValue={metrics.examinationAverage}
          trend="Gap in Maths"
          trendDirection="down"
        />

        <MetricCard
          title="Overall Performance"
          value={metrics.overallPerformance}
          unit="%"
          target="80%"
          subtitle="Weighted score calculation"
          icon={Award}
          color="emerald"
          progressValue={metrics.overallPerformance}
          trend="Tier B+ Standing"
          trendDirection="up"
        />
      </div>

      {/* Academic Risk Level Section */}
      <AcademicRiskCard riskData={academicRisk} />

      {/* Subject Performance & Weak Subject Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject Chart (7 cols) */}
        <div className="lg:col-span-7">
          <SubjectPerformanceChart subjects={subjects} />
        </div>

        {/* Weak Subject Spotlight (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <WeakSubjectAlert weakSubject={weakSubject} />
        </div>
      </div>

      {/* AI Recommendations Hub Card */}
      <AIRecommendationCard recommendations={aiRecommendations} />

      {/* Quick Action Footer Bar */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Daily Mathematics Focus Session Ready</h4>
            <p className="text-xs text-slate-400">Timer set for 45 minutes on Linear Algebra & Eigenvalues</p>
          </div>
        </div>

        <Link
          to="/recommendations"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition flex items-center gap-1.5 shrink-0"
        >
          <span>Start Math Session</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
