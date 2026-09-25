import React, { useMemo, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Flame,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ActivityEntry, StreakStats, Topic } from '../types/tracker';
import { StatCard } from './StatCard';
import { formatDateDisplay } from '../utils/streak';

interface ActivityCalendarViewProps {
  activityLog: ActivityEntry[];
  streakStats: StreakStats;
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
}

export const ActivityCalendarView: React.FC<ActivityCalendarViewProps> = ({
  activityLog,
  streakStats,
  topics,
  onSelectTopic
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Map of date string -> count
  const activityMap = useMemo(() => {
    const map = new Map<string, ActivityEntry>();
    activityLog.forEach(entry => {
      map.set(entry.date, entry);
    });
    return map;
  }, [activityLog]);

  // Generate last 24 weeks (approx 6 months) for GitHub-style heatmap
  const heatmapData = useMemo(() => {
    const weeks: { date: string; count: number; active: boolean; dayOfWeek: number }[][] = [];
    const today = new Date();
    // Normalize to end of day
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // We want 24 weeks ending at the upcoming Saturday or current week
    const currentDayOfWeek = endDate.getDay(); // 0 is Sunday, 6 is Saturday
    const daysToAddToReachEndOfWeek = 6 - currentDayOfWeek;
    const calendarEnd = new Date(endDate);
    calendarEnd.setDate(endDate.getDate() + daysToAddToReachEndOfWeek);

    const totalDays = 24 * 7;
    const calendarStart = new Date(calendarEnd);
    calendarStart.setDate(calendarEnd.getDate() - totalDays + 1);

    const days: { date: string; count: number; active: boolean; dayOfWeek: number }[] = [];
    const curr = new Date(calendarStart);

    while (curr <= calendarEnd) {
      const year = curr.getFullYear();
      const month = String(curr.getMonth() + 1).padStart(2, '0');
      const day = String(curr.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const entry = activityMap.get(dateStr);
      const count = entry ? entry.count : 0;

      days.push({
        date: dateStr,
        count,
        active: count > 0,
        dayOfWeek: curr.getDay()
      });

      curr.setDate(curr.getDate() + 1);
    }

    // Chunk into 7 days per week column
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }, [activityMap]);

  // Color intensity for heatmap squares
  const getCellColor = (count: number) => {
    if (count === 0) return 'bg-slate-100 hover:bg-slate-200 border-slate-200/50';
    if (count === 1) return 'bg-emerald-200 hover:bg-emerald-300 border-emerald-300';
    if (count === 2) return 'bg-emerald-300 hover:bg-emerald-400 border-emerald-400';
    if (count <= 4) return 'bg-emerald-500 hover:bg-emerald-600 border-emerald-600';
    return 'bg-emerald-600 hover:bg-emerald-700 border-emerald-700';
  };

  // Find topics for selected date
  const selectedDateTopics = useMemo(() => {
    if (!selectedDate) return [];
    return topics.filter(t => t.lastStudied === selectedDate);
  }, [selectedDate, topics]);

  return (
    <div className="space-y-6">
      {/* Top Streak & Consistency Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Current Streak"
          value={`${streakStats.currentStreak} Days`}
          subtitle={
            streakStats.currentStreak > 0
              ? 'Keep the momentum alive today!'
              : 'Complete a topic today to ignite your streak'
          }
          icon={<Flame className="w-5 h-5 text-orange-500 fill-orange-500" />}
          highlight={streakStats.currentStreak > 0}
        />

        <StatCard
          title="Longest Streak"
          value={`${streakStats.longestStreak} Days`}
          subtitle="Your personal best study streak"
          icon={<Trophy className="w-5 h-5 text-amber-500" />}
        />

        <StatCard
          title="Total Active Days"
          value={`${streakStats.totalActiveDays} Days`}
          subtitle="Days with verified topic completion"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
        />
      </div>

      {/* GitHub-Style Activity Heatmap */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-slate-500" />
              Daily Study Activity (Past 6 Months)
            </h3>
            <p className="text-xs text-slate-500">
              Each square represents daily topics studied or marked completed
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <span>Less</span>
            <div className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-200/60" />
            <div className="w-3 h-3 rounded-xs bg-emerald-200 border border-emerald-300" />
            <div className="w-3 h-3 rounded-xs bg-emerald-300 border border-emerald-400" />
            <div className="w-3 h-3 rounded-xs bg-emerald-500 border border-emerald-600" />
            <div className="w-3 h-3 rounded-xs bg-emerald-600 border border-emerald-700" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="inline-flex gap-1.5 min-w-[700px]">
            {/* Day of week labels */}
            <div className="flex flex-col justify-between text-[10px] text-slate-400 font-mono py-0.5 pr-1 select-none">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Weeks */}
            {heatmapData.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((day) => {
                  const isSelected = selectedDate === day.date;
                  return (
                    <button
                      key={day.date}
                      type="button"
                      onClick={() => setSelectedDate(day.date)}
                      className={`w-3.5 h-3.5 rounded-xs border transition-transform ${getCellColor(
                        day.count
                      )} ${isSelected ? 'ring-2 ring-blue-600 scale-125 z-10' : ''}`}
                      title={`${formatDateDisplay(day.date)}: ${day.count} topics studied`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Day Details */}
        {selectedDate && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                Activity on {formatDateDisplay(selectedDate)}
              </span>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>

            {selectedDateTopics.length > 0 ? (
              <div className="divide-y divide-slate-200/60 max-h-48 overflow-y-auto">
                {selectedDateTopics.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => onSelectTopic(t)}
                    className="py-2 flex items-center justify-between gap-3 text-xs hover:bg-slate-100/60 px-2 rounded-lg cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 font-mono">
                        {t.module} › {t.submodule}
                      </div>
                      <div className="font-medium text-slate-900 truncate">{t.topic}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-800 font-mono">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-1">
                No specific topics logged with this completion timestamp.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Verified Study Dates History */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Recent Study Activity Log
        </h3>

        <div className="divide-y divide-slate-100">
          {activityLog.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">
              No study activity recorded yet. Change any topic status to Completed or In Progress to log study days.
            </p>
          ) : (
            [...activityLog]
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 10)
              .map((entry) => (
                <div
                  key={entry.date}
                  onClick={() => setSelectedDate(entry.date)}
                  className="py-3 flex items-center justify-between text-xs hover:bg-slate-50 px-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <div>
                      <span className="font-semibold text-slate-800 font-mono">
                        {formatDateDisplay(entry.date)}
                      </span>
                      <p className="text-slate-400 text-[11px]">
                        {entry.count} {entry.count === 1 ? 'topic completed/studied' : 'topics completed/studied'}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-slate-500 text-xs">
                    {entry.topicIds.length} recorded
                  </span>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};
