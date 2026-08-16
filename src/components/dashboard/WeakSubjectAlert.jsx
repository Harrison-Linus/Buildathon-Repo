import React from 'react';
import { AlertCircle, ChevronRight, BookOpen, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WeakSubjectAlert({ weakSubject }) {
  if (!weakSubject) return null;

  return (
    <div className="bg-gradient-to-br from-rose-50/90 via-white to-orange-50/50 rounded-2xl p-6 border border-rose-200/80 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Identified Weak Subject
              </span>
              <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
                Score: {weakSubject.score}% (Requires &ge; 60%)
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mt-0.5">
              {weakSubject.name} ({weakSubject.code})
            </h4>
          </div>
        </div>

        <Link
          to="/recommendations"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Launch Math Practice</span>
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Critical Weak Topics */}
        <div>
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Priority Focus Sub-Topics
          </p>
          <div className="space-y-1.5">
            {weakSubject.weakTopics?.map((topic, i) => (
              <div
                key={i}
                className="bg-white/80 border border-rose-200/60 rounded-xl px-3 py-2 text-xs flex items-center justify-between text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[10px]">
                    {i + 1}
                  </span>
                  <span className="font-medium text-slate-800">{topic}</span>
                </div>
                <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-md">
                  High Error Rate
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Remediation Recommendations */}
        <div className="bg-white/90 rounded-xl p-4 border border-rose-200/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span className="flex items-center gap-1.5 text-indigo-700">
                <Clock className="w-4 h-4 text-indigo-600" />
                AI Daily Recovery Plan
              </span>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                +17% Est. Boost
              </span>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <span><strong>45 mins/day</strong> dedicated practice on Eigenvalues and matrix diagonalisation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <span>Review <strong>Internal Test 1 & Model Exam</strong> calculation sign errors.</span>
              </li>
            </ul>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Course Faculty: <strong>{weakSubject.faculty}</strong></span>
            <span>Attendance: <strong className="text-rose-600">{weakSubject.attendance}%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
