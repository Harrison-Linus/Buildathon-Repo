import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';

export default function SubjectPerformanceChart({ subjects }) {
  const [viewMode, setViewMode] = useState('overall'); // 'overall' | 'breakdown'

  const data = subjects.map((s) => ({
    name: s.name,
    code: s.code,
    Score: s.score,
    Exam: s.examScore,
    Assignment: s.assignmentScore,
    Attendance: s.attendance,
    status: s.status,
  }));

  const getBarColor = (score) => {
    if (score >= 80) return '#10b981'; // Emerald
    if (score >= 65) return '#6366f1'; // Indigo
    if (score >= 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red (below 60%)
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs">
          <p className="font-bold text-sm text-indigo-300">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Current Score:</span>
              <span className="font-bold">{dataItem.Score}%</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Exam Average:</span>
              <span>{dataItem.Exam}%</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Assignment Avg:</span>
              <span>{dataItem.Assignment}%</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Attendance:</span>
              <span>{dataItem.Attendance}%</span>
            </p>
            <div className="pt-1.5 border-t border-slate-800 flex justify-between gap-4">
              <span className="text-slate-400">Status:</span>
              <span
                className={`font-semibold ${
                  dataItem.status === 'Weak'
                    ? 'text-rose-400'
                    : dataItem.status === 'Strong'
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}
              >
                {dataItem.status}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Subject-Wise Performance</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Current course scores vs academic benchmarks (Pass: 60%, Target: 75%)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('overall')}
              className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                viewMode === 'overall'
                  ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overall Score
            </button>
            <button
              onClick={() => setViewMode('breakdown')}
              className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                viewMode === 'breakdown'
                  ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Exam vs Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'overall' ? (
            <BarChart
              data={data}
              margin={{ top: 15, right: 20, left: -10, bottom: 20 }}
              barCategoryGap="25%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={60}
                stroke="#f43f5e"
                strokeDasharray="4 4"
                label={{
                  value: 'Pass Mark (60%)',
                  fill: '#f43f5e',
                  fontSize: 10,
                  position: 'right',
                }}
              />
              <ReferenceLine
                y={75}
                stroke="#10b981"
                strokeDasharray="4 4"
                label={{
                  value: 'Target (75%)',
                  fill: '#10b981',
                  fontSize: 10,
                  position: 'right',
                }}
              />
              <Bar dataKey="Score" radius={[8, 8, 0, 0]} maxBarSize={55}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.Score)} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 15, right: 20, left: -10, bottom: 20 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Exam" fill="#6366f1" radius={[6, 6, 0, 0]} name="Exam Score" maxBarSize={30} />
              <Bar dataKey="Assignment" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Assignment Score" maxBarSize={30} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend & Summary chips */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" />
            <span>Strong (&ge;80%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-indigo-500 inline-block" />
            <span>Good (65-79%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-rose-500 inline-block" />
            <span>Weak (&lt;60%)</span>
          </div>
        </div>

        <div className="text-slate-500 text-[11px]">
          Class Ranking: <strong className="text-slate-800">24th</strong> of 68 students
        </div>
      </div>
    </div>
  );
}
