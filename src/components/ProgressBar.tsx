import React from 'react';

interface ProgressBarProps {
  value: number; // 0 - 100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'emerald' | 'amber' | 'indigo';
  countLabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercentage = true,
  size = 'md',
  color = 'blue',
  countLabel
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }[size];

  const colorClasses = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-500',
    indigo: 'bg-indigo-600'
  }[color];

  return (
    <div className="w-full">
      {(label || showPercentage || countLabel) && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-slate-700">
          <div className="flex items-center gap-2 truncate">
            {label && <span className="truncate">{label}</span>}
            {countLabel && <span className="text-slate-400 font-mono text-[11px]">({countLabel})</span>}
          </div>
          {showPercentage && (
            <span className="font-mono text-slate-900 font-semibold ml-2">
              {clampedValue.toFixed(1)}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full bg-slate-100 border border-slate-200/60 rounded-full overflow-hidden ${heightClasses}`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${colorClasses} ${heightClasses} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
