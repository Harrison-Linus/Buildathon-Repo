import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Search, Filter, BookOpen, Star, Clock, ArrowRight } from 'lucide-react';
import { apiService } from '../../services/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await apiService.getCourses();
        if (res.success && res.data) {
          setCourses(res.data);
        }
      } catch (err) {
        console.warn('Using default course catalogue.');
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const filteredCourses = courses.filter(
    (c) =>
      c.course_name.toLowerCase().includes(search.toLowerCase()) ||
      c.course_code.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans animate-slide-up">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white font-heading">EduPulse Courses</span>
          </Link>
          <div className="flex gap-4 text-xs font-semibold">
            <Link to="/" className="text-slate-400 hover:text-white">Home</Link>
            <Link to="/courses" className="text-indigo-400">Courses</Link>
            <Link to="/login" className="text-slate-400 hover:text-white">Portal Sign In</Link>
          </div>
        </div>
      </header>

      {/* Catalogue Content */}
      <div className="max-w-7xl mx-auto w-full p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl">
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">Course Catalogue</h1>
            <p className="text-xs text-slate-400 mt-1">Browse core curriculum courses across Computer Science and Engineering.</p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code, subject name..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-800 text-white rounded-xl border border-slate-700 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">Loading Course Catalogue...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((c) => (
              <div key={c.id || c.course_code} className="glass-card p-5 rounded-3xl space-y-4 flex flex-col">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded-lg border border-indigo-500/30">
                    {c.course_code}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{c.credits} Credits</span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-white leading-snug">{c.course_name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{c.description}</p>
                </div>

                <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">{c.semester}</span>
                  <Link
                    to={`/courses/${c.id || c.course_code}`}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
