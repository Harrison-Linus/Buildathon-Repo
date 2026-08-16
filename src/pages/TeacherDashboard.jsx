import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Calendar,
  ChevronRight,
  Edit3,
  Sparkles,
  ShieldAlert,
  ArrowUpDown,
  UserCheck,
  Award,
} from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';
import EditStudentRecordModal from '../components/teacher/EditStudentRecordModal';

export default function TeacherDashboard() {
  const { students, teacherInfo } = useAcademic();

  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All'); // 'All' | 'High' | 'Medium' | 'Low'
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'attendance' | 'performance' | 'risk'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute Class Overview Metrics
  const totalStudentsCount = teacherInfo.totalStudents || 68;
  const activeStudentsCount = students.length;

  const avgAttendance = Math.round(
    students.reduce((acc, s) => acc + s.metrics.attendance, 0) / (students.length || 1)
  );

  const avgPerformance = Math.round(
    students.reduce((acc, s) => acc + s.metrics.overallPerformance, 0) / (students.length || 1)
  );

  const highRiskCount = students.filter((s) => s.academicRisk.level === 'High').length;
  const mediumRiskCount = students.filter((s) => s.academicRisk.level === 'Medium').length;
  const totalRiskCount = highRiskCount + mediumRiskCount;

  // Filter & Sort Students
  const filteredStudents = students
    .filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk =
        riskFilter === 'All' ? true : s.academicRisk.level === riskFilter;

      return matchesSearch && matchesRisk;
    })
    .sort((a, b) => {
      if (sortBy === 'attendance') return b.metrics.attendance - a.metrics.attendance;
      if (sortBy === 'performance') return b.metrics.overallPerformance - a.metrics.overallPerformance;
      if (sortBy === 'risk') return b.academicRisk.score - a.academicRisk.score;
      return a.name.localeCompare(b.name);
    });

  const handleOpenEditModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/60 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Faculty Academic Management
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Teacher Control Dashboard</h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage class performance, edit student attendance and internal test scores, and monitor academic risk alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-2xl text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Academic Term</span>
            <span className="text-xs font-bold text-white">{teacherInfo.assignedClass}</span>
          </div>
        </div>
      </div>

      {/* Overview Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-slate-800/70 border border-slate-700/70 p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-slate-600 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Enrolled</p>
              <h3 className="text-2xl font-black text-white mt-1">{totalStudentsCount}</h3>
              <p className="text-xs text-indigo-400 font-medium mt-1">
                {activeStudentsCount} Active Roster Profiles
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-800/70 border border-slate-700/70 p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-slate-600 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Class Attendance Avg</p>
              <h3 className={`text-2xl font-black mt-1 ${avgAttendance >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {avgAttendance}%
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Target Threshold: <span className="font-bold text-white">85%</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-800/70 border border-slate-700/70 p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-slate-600 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Class Score Avg</p>
              <h3 className="text-2xl font-black text-indigo-400 mt-1">{avgPerformance}%</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Assignments + Internals combined</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-800/70 border border-slate-700/70 p-5 rounded-2xl shadow-lg relative overflow-hidden group hover:border-slate-600 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">At-Risk Students</p>
              <h3 className="text-2xl font-black text-rose-400 mt-1">{totalRiskCount}</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">
                <span className="text-rose-400 font-bold">{highRiskCount} High</span> •{' '}
                <span className="text-amber-400 font-bold">{mediumRiskCount} Medium</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Student List Controls (Search, Risk Filters, Sorting) */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student by name, roll number, or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 text-sm text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
            />
          </div>

          {/* Risk Level Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Risk Filter:
            </span>
            {['All', 'High', 'Medium', 'Low'].map((level) => (
              <button
                key={level}
                onClick={() => setRiskFilter(level)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
                  riskFilter === level
                    ? level === 'High'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : level === 'Medium'
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                      : level === 'Low'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {level} {level !== 'All' && 'Risk'}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 text-xs font-medium text-slate-200 border border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="name">Sort by Student Name</option>
              <option value="attendance">Sort by Attendance (High to Low)</option>
              <option value="performance">Sort by Overall Performance</option>
              <option value="risk">Sort by Risk Severity</option>
            </select>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700/80">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-700">
                <th className="py-4 px-5">Student Information</th>
                <th className="py-4 px-5">Attendance</th>
                <th className="py-4 px-5">Assignment Avg</th>
                <th className="py-4 px-5">Exam Avg</th>
                <th className="py-4 px-5">Overall Score</th>
                <th className="py-4 px-5">Academic Risk</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400">
                    No student records found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((stu) => {
                  const isHigh = stu.academicRisk.level === 'High';
                  const isMedium = stu.academicRisk.level === 'Medium';

                  return (
                    <tr
                      key={stu.id}
                      className="hover:bg-slate-700/40 transition group"
                    >
                      {/* Student Info */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={stu.avatar}
                            alt={stu.name}
                            className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-600"
                          />
                          <div>
                            <div className="font-bold text-white group-hover:text-indigo-300 transition">
                              {stu.name}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-2">
                              <span>{stu.id}</span> • <span>{stu.section}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Attendance */}
                      <td className="py-4 px-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-bold text-sm ${
                                stu.metrics.attendance < 85 ? 'text-rose-400' : 'text-emerald-400'
                              }`}
                            >
                              {stu.metrics.attendance}%
                            </span>
                            {stu.metrics.attendance < 85 && (
                              <span className="text-[10px] px-1.5 py-0.2 bg-rose-500/20 text-rose-300 rounded font-semibold border border-rose-500/30">
                                &lt; 85%
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {stu.metrics.attendanceClassesPresent} / {stu.metrics.attendanceTotalClasses} periods
                          </p>
                        </div>
                      </td>

                      {/* Assignment Avg */}
                      <td className="py-4 px-5">
                        <span className="font-semibold text-slate-200">
                          {stu.metrics.assignmentAverage}%
                        </span>
                      </td>

                      {/* Exam Avg */}
                      <td className="py-4 px-5">
                        <span className="font-semibold text-slate-200">
                          {stu.metrics.examinationAverage}%
                        </span>
                      </td>

                      {/* Overall Score */}
                      <td className="py-4 px-5">
                        <div className="space-y-1.5 w-32">
                          <div className="flex justify-between text-xs font-bold text-white">
                            <span>{stu.metrics.overallPerformance}%</span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              GPA {stu.metrics.gpa.split('/')[0]}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                              style={{ width: `${stu.metrics.overallPerformance}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Risk Badge */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                            isHigh
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              : isMedium
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}
                        >
                          {isHigh ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                          ) : isMedium ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                          {stu.academicRisk.level} Risk
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => handleOpenEditModal(stu)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Record</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Student Academic Record Modal */}
      <EditStudentRecordModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
