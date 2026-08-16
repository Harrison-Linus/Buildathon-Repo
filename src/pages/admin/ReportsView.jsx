import React from 'react';
import { BarChart3, Download, Printer, ShieldAlert } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function ReportsView() {
  const { students } = useAcademic();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Institutional Academic Performance Report</h2>
          <p className="text-xs text-slate-400 mt-1">Printable diagnostic report covering class pass rates, attendance, and risk summaries.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6 text-slate-200">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white">Semester 6 Academic Monitoring Summary</h3>
          <p className="text-xs text-slate-400 mt-1">Generated on: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block font-semibold">Total Audited Students</span>
            <span className="text-xl font-bold text-white mt-1 block">{students.length}</span>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block font-semibold">Average Attendance Rate</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">
              {Math.round(students.reduce((acc, s) => acc + (s.metrics?.attendance || s.metrics?.attendance_percentage || 0), 0) / (students.length || 1))}%
            </span>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block font-semibold">High/Medium Risk Students</span>
            <span className="text-xl font-bold text-rose-400 mt-1 block">
              {students.filter((s) => s.academicRisk?.level && s.academicRisk.level !== 'Low').length}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white">Student Academic Risk Roster</h4>
          <div className="divide-y divide-slate-800 text-xs">
            {students.map((s) => (
              <div key={s.id} className="py-3 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">{s.name} ({s.rollNumber || s.roll_number || s.id})</span>
                  <span className="text-[11px] text-slate-400">{s.academicRisk?.primaryFactor || 'N/A'}</span>
                </div>
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${s.academicRisk?.level === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                  {s.academicRisk?.level || 'Low'} Risk ({s.academicRisk?.score || 0}/100)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
