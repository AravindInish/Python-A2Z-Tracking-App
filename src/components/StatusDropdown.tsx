import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Circle, Clock, RotateCcw } from 'lucide-react';
import { TopicStatus } from '../types/tracker';

interface StatusDropdownProps {
  status: TopicStatus;
  onChange: (newStatus: TopicStatus) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

const STATUS_CONFIG: Record<
  TopicStatus,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    icon: React.FC<{ className?: string }>;
  }
> = {
  'Not Started': {
    label: 'Not Started',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
    icon: Circle
  },
  'In Progress': {
    label: 'In Progress',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    icon: Clock
  },
  'Completed': {
    label: 'Completed',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    icon: Check
  },
  'Review': {
    label: 'Review',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    icon: RotateCcw
  }
};

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  status,
  onChange,
  size = 'sm',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = STATUS_CONFIG[status] || STATUS_CONFIG['Not Started'];
  const CurrentIcon = current.icon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (newStatus: TopicStatus, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(newStatus);
    setIsOpen(false);
  };

  const pyClass = size === 'sm' ? 'py-1 px-2.5 text-xs' : 'py-1.5 px-3 text-sm';

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`inline-flex items-center justify-between gap-1.5 font-medium rounded-md border transition-all ${pyClass} ${current.bg} ${current.text} ${current.border} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
      >
        <span className="flex items-center gap-1.5 truncate">
          <CurrentIcon className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{current.label}</span>
        </span>
        <ChevronDown className="w-3 h-3 opacity-60 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-36 origin-top-right rounded-lg bg-white border border-slate-200 shadow-lg py-1 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          {(Object.keys(STATUS_CONFIG) as TopicStatus[]).map((statusOption) => {
            const config = STATUS_CONFIG[statusOption];
            const OptionIcon = config.icon;
            const isSelected = status === statusOption;

            return (
              <button
                key={statusOption}
                type="button"
                onClick={(e) => handleSelect(statusOption, e)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                  isSelected ? 'bg-slate-50 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <OptionIcon className={`w-3.5 h-3.5 ${config.text}`} />
                  <span>{config.label}</span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-blue-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
