import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  CalendarCheck,
  Award,
  ShieldAlert,
  Percent,
  Sliders,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function EditStudentRecordModal({ student, isOpen, onClose }) {
  const { updateStudentAcademicRecord } = useAcademic();

  // Local draft state for editing
  const [attendanceClassesPresent, setAttendanceClassesPresent] = useState(200);
  const [attendanceTotalClasses, setAttendanceTotalClasses] = useState(200);
  const [subjectsData, setSubjectsData] = useState([]);
  const [activeTab, setActiveTab] = useState('attendance'); // 'attendance' | 'assignments' | 'exams'
  const [isSaved, setIsSaved] = useState(false);

  // Sync draft state when student changes or modal opens
  useEffect(() => {
    if (student) {
      setAttendanceClassesPresent(student.metrics.attendanceClassesPresent || 164);
      setAttendanceTotalClasses(student.metrics.attendanceTotalClasses || 200);
      setSubjectsData(
        student.subjects.map((sub) => ({
          code: sub.code,
          name: sub.name,
          assignmentScore: sub.assignmentScore,
          recentExams: (sub.recentExams || []).map((ex) => ({ ...ex })),
        }))
      );
      setIsSaved(false);
    }
  }, [student, isOpen]);

  if (!isOpen || !student) return null;

  // Live calculations for preview
  const calcAttendance = Math.min(
    100,
    Math.round((Number(attendanceClassesPresent) / (Number(attendanceTotalClasses) || 1)) * 100)
  );

  const previewSubjects = subjectsData.map((sub) => {
    const assignmentScore = Number(sub.assignmentScore) || 0;
    const examSum = sub.recentExams.reduce((acc, ex) => acc + (Number(ex.score) || 0), 0);
    const examScore = sub.recentExams.length ? Math.round(examSum / sub.recentExams.length) : 0;
    const score = Math.min(100, Math.max(0, Math.round(0.4 * assignmentScore + 0.6 * examScore)));

    let status = score >= 80 ? 'Strong' : score >= 70 ? 'Good' : score >= 60 ? 'Moderate' : 'Weak';
    return { ...sub, assignmentScore, examScore, score, status };
  });

  const previewOverall = Math.round(
    previewSubjects.reduce((acc, s) => acc + s.score, 0) / (previewSubjects.length || 1)
  );

  const weakCount = previewSubjects.filter((s) => s.score < 60).length;
  let previewRiskLevel = 'Low';
  if (calcAttendance < 75 || weakCount >= 2) previewRiskLevel = 'High';
  else if (calcAttendance < 85 || weakCount >= 1) previewRiskLevel = 'Medium';

  // Handle Attendance changes
  const handleAttendancePresentChange = (val) => {
    const num = Math.max(0, Math.min(Number(attendanceTotalClasses), Number(val)));
    setAttendanceClassesPresent(num);
  };

  const handleAttendanceTotalChange = (val) => {
    const num = Math.max(1, Number(val));
    setAttendanceTotalClasses(num);
    if (attendanceClassesPresent > num) {
      setAttendanceClassesPresent(num);
    }
  };

  // Handle Assignment score changes
  const handleAssignmentChange = (code, val) => {
    const num = Math.max(0, Math.min(100, Number(val)));
    setSubjectsData((prev) =>
      prev.map((s) => (s.code === code ? { ...s, assignmentScore: num } : s))
    );
  };

  // Handle Exam score changes
  const handleExamChange = (code, testName, val) => {
    const num = Math.max(0, Math.min(100, Number(val)));
    setSubjectsData((prev) =>
      prev.map((s) => {
        if (s.code !== code) return s;
        const updatedExams = s.recentExams.map((ex) =>
          ex.test === testName ? { ...ex, score: num } : ex
        );
        return { ...s, recentExams: updatedExams };
      })
    );
  };

  // Save changes
  const handleSave = () => {
    updateStudentAcademicRecord(student.id, {
      attendanceClassesPresent,
      attendanceTotalClasses,
      subjects: subjectsData,
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  // Reset changes
  const handleReset = () => {
    setAttendanceClassesPresent(student.metrics.attendanceClassesPresent || 164);
    setAttendanceTotalClasses(student.metrics.attendanceTotalClasses || 200);
    setSubjectsData(
      student.subjects.map((sub) => ({
        code: sub.code,
        name: sub.name,
        assignmentScore: sub.assignmentScore,
        recentExams: (sub.recentExams || []).map((ex) => ({ ...ex })),
      }))
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{student.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {student.id}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {student.department} • {student.section} ({student.semester})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Toast Alert */}
        {isSaved && (
          <div className="bg-emerald-500 text-white px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold animate-in slide-in-from-top">
            <CheckCircle className="w-5 h-5" />
            <span>Academic record successfully saved and recalculated!</span>
          </div>
        )}

        {/* Quick Live Performance Summary Banner */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Attendance</span>
            <span
              className={`text-base font-bold ${
                calcAttendance < 85 ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {calcAttendance}%
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Overall Score</span>
            <span className="text-base font-bold text-indigo-600">{previewOverall}%</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Weak Subjects</span>
            <span className={`text-base font-bold ${weakCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {weakCount} Subject{weakCount === 1 ? '' : 's'}
            </span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Calculated Risk</span>
            <span
              className={`text-base font-bold ${
                previewRiskLevel === 'High'
                  ? 'text-rose-600'
                  : previewRiskLevel === 'Medium'
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}
            >
              {previewRiskLevel} Risk
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-medium border-b-2 transition cursor-pointer ${
              activeTab === 'attendance'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Attendance</span>
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-medium border-b-2 transition cursor-pointer ${
              activeTab === 'assignments'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Assignment Marks</span>
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-medium border-b-2 transition cursor-pointer ${
              activeTab === 'exams'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Exam Marks (Internals)</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-indigo-900 flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-indigo-600" />
                  Edit Attendance Log
                </h4>
                <p className="text-xs text-indigo-700 mt-1">
                  Update class periods present out of total conduct periods. 85% attendance is required for End-Semester exam clearance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Periods Attended
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max={attendanceTotalClasses}
                      value={attendanceClassesPresent}
                      onChange={(e) => handleAttendancePresentChange(e.target.value)}
                      className="w-full px-4 py-2.5 text-base font-bold text-slate-800 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                      / {attendanceTotalClasses} periods
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Conducted Periods
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={attendanceTotalClasses}
                    onChange={(e) => handleAttendanceTotalChange(e.target.value)}
                    className="w-full px-4 py-2.5 text-base font-bold text-slate-800 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Attendance Meter */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Calculated Attendance Percentage</span>
                  <span className={calcAttendance < 85 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                    {calcAttendance}% ({attendanceClassesPresent} / {attendanceTotalClasses} periods)
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      calcAttendance < 75
                        ? 'bg-rose-500'
                        : calcAttendance < 85
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${calcAttendance}%` }}
                  />
                </div>
              </div>

              {calcAttendance < 85 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-amber-800">Attendance Warning Triggered</h5>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Student is {85 - calcAttendance}% below the mandatory 85% requirement. Academic risk will automatically flag as Medium or High.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ASSIGNMENT MARKS */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-indigo-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  Edit Assignment Marks (40% Weightage)
                </h4>
                <p className="text-xs text-indigo-700 mt-1">
                  Set per-subject internal assignment averages out of 100 marks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subjectsData.map((sub) => (
                  <div
                    key={sub.code}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 hover:border-indigo-300 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {sub.code}
                        </span>
                        <h5 className="text-sm font-bold text-slate-800 mt-1">{sub.name}</h5>
                      </div>
                      <span className="text-xs font-bold text-slate-500">Max 100</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={sub.assignmentScore}
                        onChange={(e) => handleAssignmentChange(sub.code, e.target.value)}
                        className="w-full px-3.5 py-2 text-base font-bold text-slate-800 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                      <span className="text-xs font-semibold text-slate-600">/ 100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXAM MARKS */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-indigo-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  Edit Examination Marks (60% Weightage)
                </h4>
                <p className="text-xs text-indigo-700 mt-1">
                  Enter scores for Internal Test 1, Internal Test 2, and Model Examination out of 100.
                </p>
              </div>

              <div className="space-y-4">
                {subjectsData.map((sub) => (
                  <div
                    key={sub.code}
                    className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3"
                  >
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {sub.code}
                        </span>
                        <h5 className="text-sm font-bold text-slate-800">{sub.name}</h5>
                      </div>

                      {/* Computed Exam Average */}
                      <div className="text-xs text-slate-600">
                        Exam Avg:{' '}
                        <span className="font-bold text-indigo-600">
                          {sub.recentExams.length
                            ? Math.round(
                                sub.recentExams.reduce((acc, x) => acc + (Number(x.score) || 0), 0) /
                                  sub.recentExams.length
                              )
                            : 0}
                          %
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {sub.recentExams.map((ex) => (
                        <div key={ex.test} className="bg-white p-3 rounded-xl border border-slate-200">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            {ex.test}
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={ex.score}
                              onChange={(e) => handleExamChange(sub.code, ex.test, e.target.value)}
                              className="w-full px-3 py-1.5 text-sm font-bold text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <span className="text-xs text-slate-400 font-medium">/ 100</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Draft</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/80 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
