import React from 'react';
import ProgressBar from '../common/ProgressBar';

export default function MetricCard({
  title,
  value,
  unit = '',
  subtitle,
  icon: Icon,
  trend,
  trendDirection = 'up', // 'up' | 'down' | 'neutral'
  color = 'indigo', // 'indigo' | 'emerald' | 'amber' | 'rose'
  progressValue,
  target,
  className = '',
}) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50/80',
      iconBg: 'bg-indigo-600 text-white',
      border: 'hover:border-indigo-200',
      text: 'text-indigo-600',
      barColor: 'indigo',
    },
    emerald: {
      bg: 'bg-emerald-50/80',
      iconBg: 'bg-emerald-600 text-white',
      border: 'hover:border-emerald-200',
      text: 'text-emerald-600',
      barColor: 'emerald',
    },
    amber: {
      bg: 'bg-amber-50/80',
      iconBg: 'bg-amber-500 text-white',
      border: 'hover:border-amber-200',
      text: 'text-amber-600',
      barColor: 'amber',
    },
    rose: {
      bg: 'bg-rose-50/80',
      iconBg: 'bg-rose-600 text-white',
      border: 'hover:border-rose-200',
      text: 'text-rose-600',
      barColor: 'rose',
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between ${scheme.border} ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          {Icon && (
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${scheme.iconBg}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            {value}
          </span>
          {unit && <span className="text-lg font-bold text-slate-600">{unit}</span>}
          {trend && (
            <span
              className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
                trendDirection === 'up'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : trendDirection === 'down'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {trend}
            </span>
          )}
        </div>

        {target && (
          <div className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1.5">
            <span>Target: <strong className="text-slate-700">{target}</strong></span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        {progressValue !== undefined && (
          <div className="mb-2">
            <ProgressBar value={progressValue} variant={scheme.barColor} size="sm" />
          </div>
        )}
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium truncate">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
