import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans animate-slide-up">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white font-heading">EduPulse Support</span>
          </Link>
          <div className="flex gap-4 text-xs font-semibold">
            <Link to="/" className="text-slate-400 hover:text-white">Home</Link>
            <Link to="/courses" className="text-slate-400 hover:text-white">Courses</Link>
            <Link to="/login" className="text-indigo-400">Portal Sign In</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto w-full p-6 sm:p-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-white font-heading">Contact Academic Administration</h1>
          <p className="text-xs text-slate-400">Have questions about course credits, attendance condonation, or portal access? Send us a message.</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Message Delivered</h3>
            <p className="text-xs text-slate-300">Your query has been logged. An academic advisor will reach out to your registered email shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Your Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Email Address</label>
                <input required type="email" placeholder="student@university.edu" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Subject / Department</label>
              <input required type="text" placeholder="Computer Science - Semester 6" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500" />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Message Description</label>
              <textarea required rows={4} placeholder="Describe your question or issue in detail..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"></textarea>
            </div>

            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>Submit Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
