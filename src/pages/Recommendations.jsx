import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Clock,
  FileCode,
  CalendarCheck,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Calculator,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { studentData } from '../data/mockData';
import ProgressBar from '../components/common/ProgressBar';

export default function Recommendations() {
  const { aiRecommendations, examMistakes, practiceQuestions, metrics } = studentData;

  // State for interactive checkboxes
  const [completedItems, setCompletedItems] = useState({});

  // State for 45-min Pomodoro Timer
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(45 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // State for solution reveals in Practice Problems
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleSolution = (id) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTaskCompleted = (id) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Interactive Attendance Simulator
  const [additionalClassesToAttend, setAdditionalClassesToAttend] = useState(8);
  const totalClasses = metrics.attendanceTotalClasses + additionalClassesToAttend;
  const attendedClasses = metrics.attendanceClassesPresent + additionalClassesToAttend;
  const projectedAttendance = Math.round((attendedClasses / totalClasses) * 100);

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / aiRecommendations.length) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-indigo-700/50">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Personalized Study Remediation Plan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              AI Recommendations & Study Hub
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/90 max-w-xl">
              Curated action items tailored for <strong>{studentData.name}</strong> to eliminate academic risk and achieve &ge;85% overall score.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-left min-w-[200px]">
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              <span className="text-indigo-200">Plan Completion</span>
              <span className="font-bold text-white">{completedCount} / {aiRecommendations.length} Done</span>
            </div>
            <ProgressBar value={progressPercent} variant="emerald" size="sm" />
          </div>
        </div>
      </div>

      {/* 4 Main Actionable Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiRecommendations.map((rec) => {
          const isDone = completedItems[rec.id];
          return (
            <div
              key={rec.id}
              className={`rounded-2xl p-5 border transition-all duration-200 ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-300 text-slate-800'
                  : 'bg-white border-slate-200/80 hover:border-indigo-300 shadow-card'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTaskCompleted(rec.id)}
                    className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition cursor-pointer shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-indigo-500 bg-white text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide">
                        {rec.category}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                        {rec.recommendedSchedule}
                      </span>
                    </div>
                    <h3 className={`font-bold text-sm ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {rec.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Tool #1: 45-Minute Daily Math Focus Timer */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">45-Minute Mathematics Study Session</h3>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                  Recommendation #1
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Focus on: Eigenvalues, Characteristic Polynomials, and Matrix Diagonalisation
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            Target Frequency: <strong className="text-indigo-600">Daily 6:00 PM</strong>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-around gap-6 bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60">
          {/* Timer Display */}
          <div className="text-center">
            <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-wider font-heading">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {isTimerRunning ? '🔥 Focus session in progress...' : 'Ready to start 45m block'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTimer}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-md ${
                isTimerRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isTimerRunning ? 'Pause Session' : 'Start Focus Timer'}</span>
            </button>

            <button
              onClick={resetTimer}
              className="p-2.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl transition cursor-pointer shadow-xs"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Tool #2: Practice Problems from Weak Topics */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">AI Weak-Topic Practice Problems</h3>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  Recommendation #2
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Solve these 3 targeted questions generated to fix conceptual gaps
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {practiceQuestions.map((q, idx) => {
            const isRevealed = revealedSolutions[q.id];
            return (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{q.subject}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {q.topic}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        q.difficulty === 'Hard'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? 'Hide Solution' : 'Reveal Solution'}</span>
                  </button>
                </div>

                <p className="text-xs font-semibold text-slate-800 mt-2.5 leading-relaxed">
                  {q.question}
                </p>

                <div className="mt-2 text-[11px] text-indigo-700 bg-indigo-50/60 p-2 rounded-lg border border-indigo-100">
                  <strong>💡 Hint:</strong> {q.hint}
                </div>

                {isRevealed && (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 animate-in fade-in">
                    <p className="font-bold text-emerald-800 mb-1">Step-by-Step Solution:</p>
                    <p className="font-mono text-[11px] leading-relaxed">{q.solution}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Tool #3: Attendance Simulator */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">Attendance Target Simulator (85% Goal)</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Recommendation #3
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulate how many consecutive classes you need to attend without missing
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Consecutive upcoming class periods to attend: <strong className="text-indigo-600 text-sm font-bold">{additionalClassesToAttend} periods</strong>
            </label>
            <input
              type="range"
              min="0"
              max="25"
              value={additionalClassesToAttend}
              onChange={(e) => setAdditionalClassesToAttend(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>0 periods (+0%)</span>
              <span>8 periods (Reaches 85%)</span>
              <span>25 periods (Reaches 88%)</span>
            </div>

            <div className="mt-4 text-xs text-slate-600 space-y-1">
              <p>Current: <strong>{metrics.attendanceClassesPresent} / {metrics.attendanceTotalClasses} ({metrics.attendance}%)</strong></p>
              <p>Projected: <strong>{attendedClasses} / {totalClasses} ({projectedAttendance}%)</strong></p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Projected Attendance</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">{projectedAttendance}%</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  projectedAttendance >= 85 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                }`}>
                  {projectedAttendance >= 85 ? 'Eligible for Exams (>=85%)' : 'Shortage Warning (<85%)'}
                </span>
              </div>
              <ProgressBar value={projectedAttendance} variant={projectedAttendance >= 85 ? 'emerald' : 'amber'} size="sm" className="mt-3" />
            </div>

            <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-100">
              💡 {projectedAttendance >= 85 ? 'Great! Attending 8 more classes satisfies the university compliance policy.' : 'Attend at least 8 more classes consecutively to clear attendance shortage.'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool #4: Past Examination Mistake Review Log */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900">Exam Mistake Diagnostic Log</h3>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                Recommendation #4
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review specific question errors from Internal Tests 1 & 2 to avoid repeating mistakes
            </p>
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-100">
          {examMistakes.map((mistake) => (
            <div key={mistake.id} className="py-3.5 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{mistake.subject}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                      {mistake.exam}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-900 mt-1">{mistake.question}</p>
                  <p className="text-slate-500 mt-0.5">
                    <strong>Error:</strong> {mistake.errorType}
                  </p>
                  <div className="mt-1.5 p-2 bg-indigo-50/70 border border-indigo-100 rounded-lg text-indigo-900 text-[11px]">
                    <strong>AI Remedial Advice:</strong> {mistake.aiRemedy}
                  </div>
                </div>

                <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg shrink-0">
                  -{mistake.lostMarks} Marks
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
