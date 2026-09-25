import React from 'react';
import {
  CheckCircle2,
  Clock,
  Circle,
  Flame,
  Trophy,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Sparkles,
  Calendar,
  Layers,
  RotateCcw
} from 'lucide-react';
import { Topic, OverallStats, ModuleStats, StreakStats, TopicStatus, ActivityEntry } from '../types/tracker';
import { StatCard } from './StatCard';
import { ProgressBar } from './ProgressBar';
import { StatusDropdown } from './StatusDropdown';

interface DashboardViewProps {
  topics: Topic[];
  stats: OverallStats;
  moduleStats: ModuleStats[];
  streakStats: StreakStats;
  activityLog: ActivityEntry[];
  onSelectTopic: (topic: Topic) => void;
  onUpdateStatus: (id: string, status: TopicStatus) => void;
  onOpenResource: (url: string) => void;
  onNavigateToTracker: (moduleFilter?: string) => void;
  onNavigateToCalendar: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  topics,
  stats,
  moduleStats,
  streakStats,
  activityLog,
  onSelectTopic,
  onUpdateStatus,
  onOpenResource,
  onNavigateToTracker,
  onNavigateToCalendar
}) => {
  // Find "Next Up" topic: first In Progress topic, or first Not Started topic
  const inProgressTopic = topics.find(t => t.status === 'In Progress');
  const nextNotStartedTopic = topics.find(t => t.status === 'Not Started');
  const nextUpTopic = inProgressTopic || nextNotStartedTopic || topics[0];

  // Recently completed topics (up to 4)
  const recentlyCompleted = topics
    .filter(t => t.status === 'Completed' && t.lastStudied)
    .slice(-4)
    .reverse();

  // Last 7 days activity strip
  const today = new Date();
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const entry = activityLog.find(e => e.date === dateStr);
    return {
      date: dateStr,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      count: entry ? entry.count : 0,
      active: entry ? entry.count > 0 : false,
      isToday: i === 6
    };
  });

  return (
    <div className="space-y-6">
      {/* 0. CURRICULUM ORIENTATION BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded bg-indigo-500/25 text-indigo-300 border border-indigo-400/30">
              Python Tutorial & DSA Roadmap
            </span>
            <span className="text-xs text-slate-300">
              {stats.total} Topics • {moduleStats.length} Modules
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Learn Python & Algorithms
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Python is a popular programming language that can be used on a server to create web applications, data pipelines, and machine learning models. Python is easy to learn — you will enjoy it!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateToTracker()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. TOP METRICS ROW (Strictly dynamic from spreadsheet) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        <StatCard
          title="Total Topics"
          value={stats.total}
          subtitle="From spreadsheet"
          icon={<BookOpen className="w-4 h-4" />}
          onClick={() => onNavigateToTracker()}
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          subtitle={`${stats.percentage}% finished`}
          trend={stats.total > 0 ? `${stats.percentage}%` : '0%'}
          trendPositive={true}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          highlight={stats.completed > 0}
          onClick={() => onNavigateToTracker()}
        />

        <StatCard
          title="In Progress"
          value={stats.inProgress}
          subtitle="Currently studying"
          icon={<Clock className="w-4 h-4 text-amber-500" />}
          onClick={() => onNavigateToTracker()}
        />

        <StatCard
          title="Not Started"
          value={stats.notStarted}
          subtitle="Remaining queue"
          icon={<Circle className="w-4 h-4 text-slate-400" />}
          onClick={() => onNavigateToTracker()}
        />

        <StatCard
          title="Progress"
          value={`${stats.percentage}%`}
          subtitle={`${stats.completed}/${stats.total} topics`}
          highlight={true}
        />

        <StatCard
          title="Current Streak"
          value={`${streakStats.currentStreak}d`}
          subtitle={streakStats.currentStreak > 0 ? 'Study streak active' : 'Study today to start'}
          icon={<Flame className="w-4 h-4 text-orange-500 fill-orange-500" />}
          onClick={onNavigateToCalendar}
        />

        <StatCard
          title="Longest Streak"
          value={`${streakStats.longestStreak}d`}
          subtitle="All-time personal record"
          icon={<Trophy className="w-4 h-4 text-amber-500" />}
          onClick={onNavigateToCalendar}
        />
      </div>

      {/* 2. OVERALL PROGRESS BAR */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Curriculum Completion</h3>
            <p className="text-xs text-slate-500">
              {stats.completed} of {stats.total} topics mastered across {moduleStats.length} modules
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              {stats.completed} Completed
            </span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              {stats.inProgress} In Progress
            </span>
            {stats.review > 0 && (
              <span className="flex items-center gap-1.5 text-indigo-700">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                {stats.review} Review
              </span>
            )}
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              {stats.notStarted} Not Started
            </span>
          </div>
        </div>

        {/* Stacked Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex border border-slate-200/70">
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
      </div>

      {/* 3. TWO COLUMN SECTION: NEXT UP TO STUDY & WEEKLY ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Up To Study (Primary focus area) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Recommended Next Topic
                </span>
              </div>
              <button
                onClick={() => onNavigateToTracker()}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View All Tracker Topics</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {nextUpTopic ? (
              <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono text-slate-400">#{nextUpTopic.order}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{nextUpTopic.module}</span>
                      <span>›</span>
                      <span className="text-slate-500">{nextUpTopic.submodule}</span>
                    </div>
                    <h4
                      onClick={() => onSelectTopic(nextUpTopic)}
                      className="text-base font-semibold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {nextUpTopic.topic}
                    </h4>
                  </div>

                  <StatusDropdown
                    status={nextUpTopic.status}
                    onChange={(st) => onUpdateStatus(nextUpTopic.id, st)}
                    size="sm"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    {nextUpTopic.resourceUrl ? (
                      <button
                        onClick={() => onOpenResource(nextUpTopic.resourceUrl!)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 rounded-lg text-xs font-medium transition-colors shadow-2xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                        <span>Open {nextUpTopic.resourceName || 'Resource Link'}</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">No external link</span>
                    )}

                    <button
                      onClick={() => onSelectTopic(nextUpTopic)}
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1"
                    >
                      Notes & Details
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {nextUpTopic.status !== 'Completed' ? (
                      <button
                        onClick={() => onUpdateStatus(nextUpTopic.id, 'Completed')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium shadow-2xs transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Done</span>
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                All topics completed! Amazing work!
              </div>
            )}
          </div>

          {/* Quick study tip */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Tip: Study 1-2 topics daily to maintain your streak</span>
            <span className="font-mono text-slate-600">{streakStats.totalActiveDays} total active days</span>
          </div>
        </div>

        {/* 7-Day Streak & Activity Strip */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                7-Day Activity
              </h3>
              <button
                onClick={onNavigateToCalendar}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Heatmap
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1.5 py-2 text-center">
              {past7Days.map((d) => (
                <div
                  key={d.date}
                  className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                    d.isToday ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-100'
                  } ${d.active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50/50'}`}
                >
                  <span className="text-[10px] font-medium text-slate-400 uppercase">
                    {d.dayName}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-800 my-1">
                    {d.dayNumber}
                  </span>
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      d.active ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                    title={`${d.date}: ${d.count} topics completed`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Current Streak:</span>
            <span className="font-mono font-bold text-amber-600 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              {streakStats.currentStreak} {streakStats.currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. MODULE-WISE PROGRESS BREAKDOWN */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Module Progress</h3>
            <p className="text-xs text-slate-500">
              Overview of all {moduleStats.length} modules extracted from your spreadsheet
            </p>
          </div>
          <button
            onClick={() => onNavigateToTracker()}
            className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Open Study Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleStats.map((mod) => (
            <div
              key={mod.module}
              onClick={() => onNavigateToTracker(mod.module)}
              className="p-3.5 bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {mod.module}
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 ml-2">
                  {mod.percentage}%
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-2">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${mod.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{mod.completed} / {mod.total} completed</span>
                <span>{mod.submodules.length} submodules</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
