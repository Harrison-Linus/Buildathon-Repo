import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function ManageStudents() {
  const { students } = useAcademic();
  const [search, setSearch] = useState('');

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Manage Student Profiles</h2>
          <p className="text-xs text-slate-400 mt-1">Enroll new students, inspect academic risk records, and update details.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student name or ID..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-800 text-white rounded-xl border border-slate-700 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Roll Number</th>
                <th className="p-4">Department & Year</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Risk Tier</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-white block">{s.name}</span>
                      <span className="text-[10px] text-slate-400">{s.email}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono">{s.rollNumber || s.roll_number || s.id}</td>
                  <td className="p-4">{s.department} • {s.year}</td>
                  <td className="p-4 font-bold text-emerald-400">{s.metrics?.attendance}%</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.academicRisk?.level === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                      {s.academicRisk?.level || 'Low'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-white p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
