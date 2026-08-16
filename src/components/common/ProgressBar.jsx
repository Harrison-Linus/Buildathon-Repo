import React from 'react';

export default function ProgressBar({
  value,
  max = 100,
  variant = 'indigo',
  size = 'md',
  showLabel = false,
  className = '',
}) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const variantColors = {
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    sky: 'bg-sky-500',
    auto:
      percentage >= 80
        ? 'bg-emerald-500'
        : percentage >= 65
        ? 'bg-amber-500'
        : 'bg-rose-500',
  };

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const activeColor = variant === 'auto' ? variantColors.auto : variantColors[variant] || 'bg-indigo-600';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs text-slate-600 font-medium">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightStyles[size] || heightStyles.md}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${activeColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
