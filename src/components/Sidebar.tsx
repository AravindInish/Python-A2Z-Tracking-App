import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  BarChart3,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame
} from 'lucide-react';
import { OverallStats, StreakStats } from '../types/tracker';

export type NavTab = 'dashboard' | 'tracker' | 'modules' | 'progress' | 'activity' | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  stats: OverallStats;
  streakStats: StreakStats;
  onOpenUpload: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
  stats,
  streakStats,
  onOpenUpload
}) => {
  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tracker', label: 'Study Tracker', icon: BookOpen, badge: stats.total },
    { id: 'modules', label: 'Modules', icon: Layers },
    { id: 'progress', label: 'Progress & Stats', icon: BarChart3, badge: `${stats.percentage}%` },
    { id: 'activity', label: 'Study Calendar', icon: Calendar, badge: streakStats.currentStreak > 0 ? `${streakStats.currentStreak}d` : undefined },
    { id: 'settings', label: 'Settings & Data', icon: Settings },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
        {!collapsed ? (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white font-bold text-sm tracking-wider shadow-sm flex-shrink-0">
              <span className="font-mono">DS</span>
            </div>
            <div className="truncate">
              <h1 className="text-sm font-semibold text-slate-900 leading-tight truncate">
                Study Tracker
              </h1>
              <p className="text-xs text-slate-500 font-mono">DSA & Python</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white font-bold text-sm">
            <span className="font-mono">DS</span>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between text-left">
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                        isActive
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Streak & Quick Status Summary */}
      {!collapsed ? (
        <div className="p-3 mx-3 mb-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              Streak
            </span>
            <span className="font-semibold text-slate-800 font-mono">
              {streakStats.currentStreak} {streakStats.currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Overall Progress</span>
              <span className="font-mono font-medium">{stats.percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, stats.percentage))}%` }}
              />
            </div>
          </div>

          <button
            onClick={onOpenUpload}
            className="w-full mt-1 text-xs py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 font-medium border border-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Upload Custom Excel</span>
          </button>
        </div>
      ) : (
        <div className="p-2 flex flex-col items-center gap-2 mb-3">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-50 text-orange-600 border border-orange-100"
            title={`Current Streak: ${streakStats.currentStreak} days`}
          >
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
          </div>
        </div>
      )}
    </aside>
  );
};
