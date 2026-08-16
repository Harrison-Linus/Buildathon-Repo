import React, { useState } from 'react';
import {
  Calendar,
  Award,
  FileCheck,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  Calculator,
  Download,
  Bot,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useAcademic } from '../context/AcademicContext';
import MetricCard from '../components/dashboard/MetricCard';
import AcademicRiskCard from '../components/dashboard/AcademicRiskCard';
import SubjectPerformanceChart from '../components/dashboard/SubjectPerformanceChart';
import WeakSubjectAlert from '../components/dashboard/WeakSubjectAlert';
import AIRecommendationCard from '../components/dashboard/AIRecommendationCard';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentStudent } = useAcademic();
  const { name, department, year, semester, metrics, academicRisk, subjects, aiRecommendations } = currentStudent;

  const [showGpaSimulator, setShowGpaSimulator] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);
  const [targetGpa, setTargetGpa] = useState(8.5);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${name}! I've analyzed your academic records. Your current GPA is ${metrics.gpa}. How can I assist you with your study plan today?`,
    },
  ]);

  const weakSubject = subjects.find((s) => s.status === 'Weak') || subjects[0];

  // Quick download transcript function
  const handleDownloadTranscript = () => {
    const content = `================================================
EDUPULSE ACADEMIC TRANSCRIPT & RISK DIAGNOSTIC
================================================
Student Name: ${name}
ID: ${currentStudent.id}
Department: ${department} (${year}, ${semester})
Batch: ${currentStudent.batch}
Advisor: ${currentStudent.advisor}

ACADEMIC METRICS:
-----------------
Cumulative GPA: ${metrics.gpa}
Overall Attendance: ${metrics.attendance}% (${metrics.attendanceClassesPresent}/${metrics.attendanceTotalClasses} periods)
Assignment Avg: ${metrics.assignmentAverage}%
Exam Avg: ${metrics.examinationAverage}%
Class Rank: #${metrics.rankInClass} out of ${metrics.totalStudents}

RISK ASSESSMENT:
----------------
Risk Level: ${academicRisk.level} (Score: ${academicRisk.score}/100)
Primary Risk Factor: ${academicRisk.primaryFactor}
Summary: ${academicRisk.summary}

SUBJECT SCORES:
---------------
${subjects.map((s) => `- ${s.code} ${s.name}: ${s.score}% (Grade ${s.grade}, ${s.status})`).join('\n')}

Generated at: ${new Date().toLocaleString()}
================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/\s+/g, '_')}_Academic_Report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSendAiMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let reply = `Based on your current ${weakSubject.name} score (${weakSubject.score}%), focusing 45 mins daily on past year papers can improve your GPA by +0.4 points!`;
      if (userMsg.toLowerCase().includes('attendance')) {
        reply = `Your attendance is currently ${metrics.attendance}%. Attending the next 6 scheduled classes will bring you back up to the 85% eligibility threshold!`;
      } else if (userMsg.toLowerCase().includes('math') || userMsg.toLowerCase().includes('exam')) {
        reply = `For Mathematics, target at least 72% in your next Unit Test to convert your grade from U to B+.`;
      }
      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12 animate-slide-up">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        {/* Glow decoration */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AI Academic Co-Pilot Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Welcome back, {name}! 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              {department} • <span className="text-indigo-200 font-semibold">{year}</span> ({semester})
            </p>
          </div>

          {/* Quick Action Badges & Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowGpaSimulator(true)}
              className="bg-indigo-600/30 hover:bg-indigo-600/50 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-indigo-500/40 text-xs font-semibold text-indigo-200 flex items-center gap-2 transition"
            >
              <Calculator className="w-4 h-4 text-indigo-300" />
              <span>Target GPA Simulator</span>
            </button>

            <button
              onClick={handleDownloadTranscript}
              className="bg-slate-800/80 hover:bg-slate-800 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <MetricCard
          title="Overall Attendance"
          value={metrics.attendance}
          unit="%"
          target="85%"
          subtitle={`${metrics.attendanceClassesPresent} / ${metrics.attendanceTotalClasses} periods attended`}
          icon={Calendar}
          color={metrics.attendance >= 85 ? 'emerald' : 'amber'}
          progressValue={metrics.attendance}
          trend={metrics.attendance >= 85 ? 'On Track' : 'Needs +3%'}
          trendDirection={metrics.attendance >= 85 ? 'up' : 'down'}
        />

        <MetricCard
          title="Assignment Average"
          value={metrics.assignmentAverage}
          unit="%"
          target="80%"
          subtitle="Evaluated across internal assignments"
          icon={FileCheck}
          color="indigo"
          progressValue={metrics.assignmentAverage}
          trend="+5% vs Last Sem"
          trendDirection="up"
        />

        <MetricCard
          title="Examination Average"
          value={metrics.examinationAverage}
          unit="%"
          target="75%"
          subtitle="Based on Internal Tests 1, 2 & Model"
          icon={GraduationCap}
          color="rose"
          progressValue={metrics.examinationAverage}
          trend="Gap in Maths"
          trendDirection="down"
        />

        <MetricCard
          title="Overall Performance"
          value={metrics.overallPerformance}
          unit="%"
          target="80%"
          subtitle="Weighted score calculation"
          icon={Award}
          color="emerald"
          progressValue={metrics.overallPerformance}
          trend="Tier B+ Standing"
          trendDirection="up"
        />
      </div>

      {/* Academic Risk Level Section */}
      <AcademicRiskCard riskData={academicRisk} />

      {/* Subject Performance & Weak Subject Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject Chart (7 cols) */}
        <div className="lg:col-span-7">
          <SubjectPerformanceChart subjects={subjects} />
        </div>

        {/* Weak Subject Spotlight (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <WeakSubjectAlert weakSubject={weakSubject} />
        </div>
      </div>

      {/* AI Recommendations Hub Card */}
      <AIRecommendationCard recommendations={aiRecommendations || []} />

      {/* Quick AI Assistant Footer Bar */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Ask AI Academic Assistant</h4>
            <p className="text-xs text-slate-300">Get personalized tips on weak subjects, attendance, and exam prep</p>
          </div>
        </div>

        <button
          onClick={() => setShowAiChat(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Bot className="w-4 h-4" />
          <span>Launch AI Co-Pilot</span>
        </button>
      </div>

      {/* Target GPA Simulator Modal */}
      {showGpaSimulator && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-lg text-white">GPA Goal Calculator</h3>
              </div>
              <button onClick={() => setShowGpaSimulator(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Target Cumulative GPA</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="7.0"
                    max="10.0"
                    step="0.1"
                    value={targetGpa}
                    onChange={(e) => setTargetGpa(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                  <span className="text-lg font-bold text-indigo-400">{targetGpa.toFixed(1)}</span>
                </div>
              </div>

              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Current GPA:</span>
                  <span className="font-bold text-white">{metrics.gpa}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Required End-Sem Average:</span>
                  <span className="font-bold text-emerald-400">
                    {Math.min(100, Math.round(targetGpa * 10))}%
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Maths Needed Score:</span>
                  <span className="font-bold text-amber-400">
                    {Math.max(60, Math.round(targetGpa * 9.5))}%
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                💡 To hit <strong className="text-indigo-300">{targetGpa.toFixed(1)} GPA</strong>, focus on raising your Mathematics exam score from {weakSubject.score}% to {Math.max(65, Math.round(targetGpa * 9.5))}%.
              </p>
            </div>

            <button
              onClick={() => setShowGpaSimulator(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition"
            >
              Close Simulator
            </button>
          </div>
        </div>
      )}

      {/* AI Assistant Chat Modal */}
      {showAiChat && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full h-[500px] flex flex-col shadow-2xl animate-slide-up overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">EduPulse AI Co-Pilot</h4>
                  <span className="text-[10px] text-emerald-400 font-medium">● Online • Analyzing {name}</span>
                </div>
              </div>
              <button onClick={() => setShowAiChat(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900/50 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendAiMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about your marks, attendance, or study plan..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

