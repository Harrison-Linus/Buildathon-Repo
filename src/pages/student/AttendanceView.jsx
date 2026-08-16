import React from 'react';
import { Calendar, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function AttendanceView() {
  const { currentStudent, recordStudentAttendance } = useAcademic();
  const { metrics, subjects, id: studentId } = currentStudent;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Calendar className="w-4 h-4" /> Academic Clearance Tracking
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Attendance Breakdown & Clearance</h2>
          <p className="text-xs text-slate-400 mt-1">Monitor mandatory 85% attendance requirement to ensure End-Sem exam eligibility.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Overall Attendance</span>
            <span className={`text-2xl font-black ${metrics.attendance >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {metrics.attendance}%
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => recordStudentAttendance(studentId, true)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow transition"
            >
              + Mark Present
            </button>
            <button
              onClick={() => recordStudentAttendance(studentId, false)}
              className="px-3 py-1.5 bg-rose-600/40 hover:bg-rose-600/60 text-rose-200 border border-rose-500/30 rounded-xl text-xs font-semibold transition"
            >
              + Mark Absent
            </button>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => (
          <div key={sub.id || sub.code} className="glass-card p-6 rounded-3xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-indigo-400">{sub.code}</span>
              <span className="text-xs font-semibold text-emerald-400">88% Subject Attendance</span>
            </div>
            <h3 className="font-bold text-base text-white">{sub.name}</h3>
            <p className="text-xs text-slate-400">Faculty: {sub.professor}</p>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
