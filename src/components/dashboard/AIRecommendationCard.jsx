import React from 'react';
import { Sparkles, Clock, FileCode, CalendarCheck, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIRecommendationCard({ recommendations }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Clock':
        return Clock;
      case 'FileCode':
        return FileCode;
      case 'CalendarCheck':
        return CalendarCheck;
      case 'AlertCircle':
      default:
        return AlertCircle;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-sky-100 text-sky-700 border-sky-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              AI Personalized Recommendations
              <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                {recommendations.length} Action Items
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted study interventions to elevate overall performance from 73% to 85%+
            </p>
          </div>
        </div>

        <Link
          to="/recommendations"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition py-1 px-3 bg-indigo-50 hover:bg-indigo-100 rounded-xl self-start sm:self-auto"
        >
          <span>Open Interactive Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List of recommendations */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {recommendations.map((rec) => {
          const IconComponent = getIcon(rec.icon);
          return (
            <div
              key={rec.id}
              className="p-4 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-indigo-600">
                      {rec.category}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                      rec.priority
                    )}`}
                  >
                    {rec.priority}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                  {rec.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-400">
                  Target: {rec.subject}
                </span>
                <Link
                  to="/recommendations"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:translate-x-0.5 transition"
                >
                  <span>{rec.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
