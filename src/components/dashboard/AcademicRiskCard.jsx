import React from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AcademicRiskCard({ riskData }) {
  const isMedium = riskData.level === 'Medium';
  const isHigh = riskData.level === 'High';
  const isLow = riskData.level === 'Low';

  const riskColor = isHigh
    ? 'border-rose-300 bg-rose-50/50'
    : isMedium
    ? 'border-amber-300 bg-amber-50/40'
    : 'border-emerald-300 bg-emerald-50/40';

  const badgeColor = isHigh
    ? 'bg-rose-500 text-white shadow-rose-200'
    : isMedium
    ? 'bg-amber-500 text-white shadow-amber-200'
    : 'bg-emerald-500 text-white shadow-emerald-200';

  return (
    <div className={`bg-white rounded-2xl p-6 border shadow-card transition-all ${riskColor}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner">
            <ShieldAlert className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Academic Risk Assessment</h3>
              <span className={`text-xs font-bold px-3 py-0.5 rounded-full shadow-sm ${badgeColor}`}>
                {riskData.level} Risk
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              AI Early Warning & Progression Indicator
            </p>
          </div>
        </div>

        <Link
          to="/recommendations"
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition py-1 px-3 bg-indigo-50 hover:bg-indigo-100/80 rounded-xl self-start sm:self-auto"
        >
          <span>View Remediation Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Risk meter & summary */}
        <div className="lg:col-span-1 bg-white/80 rounded-xl p-4 border border-amber-200/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <span>Risk Probability Index</span>
              <span className="text-amber-700 font-bold">{riskData.score}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-500"
                style={{ width: `${riskData.score}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>Low (0-30%)</span>
              <span>Medium (31-70%)</span>
              <span>High (71-100%)</span>
            </div>
          </div>

          <div className="mt-4 p-2.5 bg-amber-50 rounded-lg border border-amber-200/80 text-xs text-amber-900">
            <p className="font-semibold flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              Primary Risk Trigger
            </p>
            <p className="text-[11px] leading-relaxed text-amber-800">
              {riskData.primaryFactor}
            </p>
          </div>
        </div>

        {/* Breakdown of specific factors */}
        <div className="lg:col-span-2 space-y-2.5">
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Risk Factor Diagnosis
          </p>
          <div className="space-y-2">
            {riskData.factors.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/90 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      item.status === 'Warning' ? 'bg-amber-500' : 'bg-sky-500'
                    }`}
                  />
                  <div>
                    <span className="font-semibold text-slate-800">{item.factor}</span>
                    <p className="text-[11px] text-slate-500">{item.description}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-md text-xs">
                    {item.value}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">
                    Impact: {item.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
