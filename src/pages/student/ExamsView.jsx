import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function ExamsView() {
  const { currentStudent } = useAcademic();
  const { subjects } = currentStudent;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <h2 className="text-2xl font-bold text-white font-heading">Internal Tests & Exam Results</h2>
        <p className="text-xs text-slate-400 mt-1">Continuous internal assessment scores, Unit Tests, and Mid-Sem evaluations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => (
          <div key={sub.id || sub.code} className="glass-card p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-indigo-400">{sub.code}</span>
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${sub.score >= 80 ? 'bg-emerald-500/20 text-emerald-300' : sub.score >= 60 ? 'bg-indigo-500/20 text-indigo-300' : 'bg-rose-500/20 text-rose-300'}`}>
                Grade {sub.grade} ({sub.score}%)
              </span>
            </div>

            <h3 className="font-bold text-base text-white">{sub.name}</h3>

            <div className="bg-slate-950 p-3 rounded-2xl space-y-2 text-xs divide-y divide-slate-800">
              {(sub.recentExams || [{ name: 'Unit Test 1', score: sub.examScore }]).map((ex, idx) => (
                <div key={idx} className="flex justify-between pt-1 text-slate-300">
                  <span>{ex.name}</span>
                  <span className="font-bold text-white">{ex.score} / 100</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
