import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

export default function ManageCourses() {
  const courses = [
    { code: 'CS601', name: 'Advanced Java Programming', credits: 4, sem: 'Semester 6', dept: 'CSE' },
    { code: 'MA602', name: 'Applied Discrete Mathematics', credits: 4, sem: 'Semester 6', dept: 'CSE' },
    { code: 'CS603', name: 'Database Management Systems', credits: 3, sem: 'Semester 6', dept: 'CSE' },
    { code: 'CS604', name: 'Operating Systems Core', credits: 3, sem: 'Semester 6', dept: 'CSE' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Manage Curriculum Courses</h2>
          <p className="text-xs text-slate-400 mt-1">Add or update course codes, credit allocations, and semester requirements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {courses.map((c) => (
          <div key={c.code} className="glass-card p-5 rounded-3xl space-y-3">
            <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-lg border border-rose-500/30">
              {c.code}
            </span>
            <h3 className="font-bold text-sm text-white">{c.name}</h3>
            <p className="text-xs text-slate-400">{c.dept} • {c.sem}</p>
            <div className="text-xs font-bold text-indigo-400">{c.credits} Credits</div>
          </div>
        ))}
      </div>
    </div>
  );
}
