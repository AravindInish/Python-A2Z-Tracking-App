import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Circle,
  RotateCcw,
  Layers,
  Award,
  TrendingUp,
  Percent
} from 'lucide-react';
import { OverallStats, ModuleStats, Topic } from '../types/tracker';
import { ProgressBar } from './ProgressBar';

interface ProgressAnalyticsViewProps {
  stats: OverallStats;
  moduleStats: ModuleStats[];
  topics: Topic[];
  onSelectModule: (moduleName: string) => void;
}

export const ProgressAnalyticsView: React.FC<ProgressAnalyticsViewProps> = ({
  stats,
  moduleStats,
  topics,
  onSelectModule
}) => {
  // Difficulty statistics
  const difficultyStats = React.useMemo(() => {
    const diffs: Record<string, { total: number; completed: number }> = {
      Basic: { total: 0, completed: 0 },
      Easy: { total: 0, completed: 0 },
      Medium: { total: 0, completed: 0 },
      Hard: { total: 0, completed: 0 }
    };

    topics.forEach(t => {
      const d = t.difficulty || 'Easy';
      if (!diffs[d]) {
        diffs[d] = { total: 0, completed: 0 };
      }
      diffs[d].total++;
      if (t.status === 'Completed') {
        diffs[d].completed++;
      }
    });

    return diffs;
  }, [topics]);

  return (
    <div className="space-y-6">
      {/* 1. Overall Completion Card */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Curriculum Progress Overview</h2>
            <p className="text-xs text-slate-500">
              High-level breakdown of your current mastery across all {stats.total} topics
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900">{stats.percentage}%</span>
            <span className="text-xs text-slate-400 font-medium">COMPLETED</span>
          </div>
        </div>

        {/* Status Distribution Bars */}
        <div className="space-y-4">
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden flex border border-slate-200">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
              title={`Completed: ${stats.completed}`}
            />
            <div
              className="bg-amber-400 h-full transition-all duration-500"
              style={{ width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%` }}
              title={`In Progress: ${stats.inProgress}`}
            />
            {stats.review > 0 && (
              <div
                className="bg-indigo-500 h-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (stats.review / stats.total) * 100 : 0}%` }}
                title={`Review: ${stats.review}`}
              />
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-emerald-50/50 border border-emerald-200/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-emerald-800 font-medium">
                <span>Completed</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold font-mono text-emerald-950">{stats.completed}</span>
                <span className="text-xs font-mono text-emerald-700">{stats.percentage}%</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50/50 border border-amber-200/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-amber-800 font-medium">
                <span>In Progress</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold font-mono text-amber-950">{stats.inProgress}</span>
                <span className="text-xs font-mono text-amber-700">
                  {stats.total > 0 ? ((stats.inProgress / stats.total) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/50 border border-indigo-200/80 rounded-xl">
              <div className="flex items-center justify-between text-xs text-indigo-800 font-medium">
                <span>Review</span>
                <RotateCcw className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold font-mono text-indigo-950">{stats.review}</span>
                <span className="text-xs font-mono text-indigo-700">
                  {stats.total > 0 ? ((stats.review / stats.total) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Not Started</span>
                <Circle className="w-4 h-4 text-slate-400" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold font-mono text-slate-900">{stats.notStarted}</span>
                <span className="text-xs font-mono text-slate-500">
                  {stats.total > 0 ? ((stats.notStarted / stats.total) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Difficulty Breakdown */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">Difficulty Breakdown</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {Object.entries(difficultyStats).map(([diff, data]) => {
            const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
            return (
              <div key={diff} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">{diff}</span>
                  <span className="text-xs font-mono text-slate-500">
                    {data.completed}/{data.total}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-500 block text-right">{pct}% done</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Module Performance Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Module Completion Matrix</h3>
          <span className="text-xs text-slate-400 font-mono">{moduleStats.length} modules</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50/90 text-slate-500 font-semibold border-b border-slate-200 text-[11px] uppercase">
              <tr>
                <th className="px-4 py-3">Module</th>
                <th className="px-4 py-3 w-48">Progress</th>
                <th className="px-4 py-3 text-center">Completed</th>
                <th className="px-4 py-3 text-center">In Progress</th>
                <th className="px-4 py-3 text-center">Not Started</th>
                <th className="px-4 py-3 text-right">Submodules</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {moduleStats.map((mod) => (
                <tr
                  key={mod.module}
                  onClick={() => onSelectModule(mod.module)}
                  className="hover:bg-slate-50/60 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-slate-900 truncate max-w-xs">
                    {mod.module}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200/60">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${mod.percentage}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-700 min-w-8 text-right font-medium">
                        {mod.percentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-emerald-600 font-semibold">
                    {mod.completed}
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-amber-600 font-semibold">
                    {mod.inProgress}
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-slate-500">
                    {mod.notStarted}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-500">
                    {mod.submodules.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
