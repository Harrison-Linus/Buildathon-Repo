import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Award,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronDown,
  Filter,
  BarChart2
} from 'lucide-react';
import { studentData } from '../data/mockData';
import { useAcademic } from '../context/AcademicContext';
import ProgressBar from '../components/common/ProgressBar';

export default function Performance() {
  const { currentStudent } = useAcademic();
  const studentInfo = currentStudent || studentData;
  const subjects = studentInfo.subjects || studentData.subjects;
  const metrics = studentInfo.metrics || studentData.metrics;
  const semesterHistory = studentInfo.semesterHistory || studentData.semesterHistory;

  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || studentData.subjects[0]);


  // Radar data for Subject Mastery
  const radarData = subjects.map((s) => ({
    subject: s.name,
    Score: s.score,
    Benchmark: 75,
    fullMark: 100,
  }));

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
              <BarChart2 className="w-4 h-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Performance Analysis
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive diagnostic of subject marks, internal exams, and semester trends
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-xl font-semibold text-slate-700 shadow-xs">
            Academic Term: <strong className="text-indigo-600">Sem 6 (Spring 2026)</strong>
          </span>
        </div>
      </div>

      {/* 4 Subject Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map((sub) => {
          const isSelected = selectedSubject.code === sub.code;
          return (
            <div
              key={sub.code}
              onClick={() => setSelectedSubject(sub)}
              className={`rounded-2xl p-5 border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-900 text-white border-indigo-700 shadow-lg scale-[1.02]'
                  : 'bg-white text-slate-800 border-slate-200/80 hover:border-indigo-300 hover:shadow-card'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isSelected
                      ? 'bg-indigo-800 text-indigo-200 border border-indigo-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {sub.code} • {sub.credits} Credits
                </span>

                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    sub.status === 'Weak'
                      ? 'bg-rose-100 text-rose-700'
                      : sub.status === 'Strong'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  Grade {sub.grade}
                </span>
              </div>

              <h3 className={`font-bold text-base ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {sub.name}
              </h3>
              <p className={`text-xs mt-0.5 ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                {sub.faculty}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-200/30 flex items-baseline justify-between">
                <div>
                  <span className={`text-2xl font-extrabold font-heading ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {sub.score}%
                  </span>
                  <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`}>
                    Attendance: {sub.attendance}%
                  </span>
                </div>

                <div className="text-right text-[11px]">
                  <span className={`block ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                    Exam: <strong>{sub.examScore}%</strong>
                  </span>
                  <span className={`block ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                    Assign: <strong>{sub.assignmentScore}%</strong>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Row: Radar Mastery & Historical Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart: Subject Mastery vs Benchmark */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Subject Mastery Radar</h3>
              <p className="text-xs text-slate-500">Current scores vs 75% target benchmark</p>
            </div>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-full">
              Multi-Axis
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Student Score" dataKey="Score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Radar name="Benchmark (75%)" dataKey="Benchmark" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeDasharray="3 3" />
                <Tooltip />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Semester GPA Progression */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Historical Semester GPA & Attendance Trend</h3>
              <p className="text-xs text-slate-500">Semester 1 to Semester 6 Progression (Target GPA: &gt; 8.0)</p>
            </div>
            <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              Cumulative: {metrics.gpa}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={semesterHistory} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="semester" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis domain={[5, 10]} ticks={[5, 6, 7, 8, 9, 10]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
                <Tooltip
                  formatter={(value, name) => [value, name === 'gpa' ? 'GPA / 10' : 'Attendance %']}
                  contentStyle={{ borderRadius: '12px', background: '#0f172a', color: '#fff', border: 'none' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="gpa" stroke="#4f46e5" strokeWidth={3} name="GPA" dot={{ r: 4, fill: '#4f46e5' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Drill-down on Selected Subject */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                Detailed Diagnostic
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedSubject.name} ({selectedSubject.code})
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Faculty: <strong>{selectedSubject.faculty}</strong> • Status:{' '}
              <strong className={selectedSubject.status === 'Weak' ? 'text-rose-600' : 'text-emerald-600'}>
                {selectedSubject.status}
              </strong>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Internal Exam Average</span>
              <span className="font-bold text-slate-800">{selectedSubject.examScore}%</span>
            </div>
            <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Assignment Score</span>
              <span className="font-bold text-slate-800">{selectedSubject.assignmentScore}%</span>
            </div>
            <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Subject Attendance</span>
              <span className={`font-bold ${selectedSubject.attendance < 85 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {selectedSubject.attendance}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exam History Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Assessment Test Scores
            </h4>
            <div className="space-y-2.5">
              {selectedSubject.recentExams.map((test, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800">{test.test}</span>
                  <div className="flex items-center gap-3">
                    <ProgressBar
                      value={test.score}
                      variant={test.score >= 75 ? 'emerald' : test.score >= 60 ? 'amber' : 'rose'}
                      size="sm"
                      className="w-28 hidden sm:block"
                    />
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border text-xs">
                      {test.score} / {test.max}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Topics Mastery & Weak Areas */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Topic Breakdown & Diagnostics
            </h4>
            <div className="space-y-3">
              {/* Weak Topics */}
              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Topics Needing Practice</span>
                </div>
                <ul className="text-xs text-rose-900 space-y-1 pl-5 list-disc">
                  {selectedSubject.weakTopics.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>

              {/* Strong Topics */}
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Strong Competencies</span>
                </div>
                <ul className="text-xs text-emerald-900 space-y-1 pl-5 list-disc">
                  {selectedSubject.strengths.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
