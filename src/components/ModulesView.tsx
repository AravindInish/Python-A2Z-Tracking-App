import React from 'react';
import { Layers, ArrowRight, CheckCircle2, Clock, Circle, BookOpen } from 'lucide-react';
import { ModuleStats } from '../types/tracker';
import { ProgressBar } from './ProgressBar';

interface ModulesViewProps {
  moduleStats: ModuleStats[];
  onSelectModule: (moduleName: string) => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({ moduleStats, onSelectModule }) => {
  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Module Progression</h2>
            <p className="text-xs text-slate-500">
              {moduleStats.length} modules extracted directly from your curriculum spreadsheet
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span>Total Modules: <strong className="text-slate-900">{moduleStats.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {moduleStats.map((mod) => {
          const isDone = mod.percentage === 100 && mod.total > 0;

          return (
            <div
              key={mod.module}
              onClick={() => onSelectModule(mod.module)}
              className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-xl p-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Module title and completion badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Module
                    </span>
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {mod.module}
                    </h3>
                  </div>

                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full border ${
                      isDone
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : mod.percentage > 0
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {mod.percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isDone ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${mod.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Topics breakdown stats */}
                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50/70 border border-slate-200/60 rounded-lg text-center text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Completed</span>
                    <span className="font-mono font-bold text-emerald-600">{mod.completed}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">In Progress</span>
                    <span className="font-mono font-bold text-amber-600">{mod.inProgress}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Not Started</span>
                    <span className="font-mono font-bold text-slate-500">{mod.notStarted}</span>
                  </div>
                </div>

                {/* Submodules list */}
                {mod.submodules.length > 0 && (
                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                      Submodules ({mod.submodules.length})
                    </span>
                    <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                      {mod.submodules.map((sub) => (
                        <div
                          key={sub.name}
                          className="flex items-center justify-between text-xs text-slate-600 hover:text-slate-900"
                        >
                          <span className="truncate pr-2">{sub.name}</span>
                          <span className="font-mono text-[11px] text-slate-400 flex-shrink-0">
                            {sub.completed}/{sub.total}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-medium group-hover:text-blue-700">
                <span>View module topics</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
