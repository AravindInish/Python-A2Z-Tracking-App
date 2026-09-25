import React from 'react';
import {
  Menu,
  Search,
  UploadCloud,
  Flame,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { NavTab } from './Sidebar';
import { StreakStats, OverallStats } from '../types/tracker';

interface HeaderProps {
  currentTab: NavTab;
  onOpenMobileMenu: () => void;
  onOpenUpload: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onFocusSearchTab: () => void;
  streakStats: StreakStats;
  stats: OverallStats;
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenMobileMenu,
  onOpenUpload,
  searchQuery,
  onSearchChange,
  onFocusSearchTab,
  streakStats,
  stats,
  sidebarCollapsed
}) => {
  const getPageInfo = (tab: NavTab) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Study Dashboard',
          description: 'Overview of your DSA and Python learning progression, streaks, and upcoming topics.'
        };
      case 'tracker':
        return {
          title: 'Study Tracker',
          description: 'Comprehensive curriculum ordered exactly as your spreadsheet. Mark topics and track resources.'
        };
      case 'modules':
        return {
          title: 'Module Breakdown',
          description: 'Track mastery across individual chapters, submodules, and algorithmic domains.'
        };
      case 'progress':
        return {
          title: 'Progress & Analytics',
          description: 'Visual breakdown of completed, in-progress, and review status across topics.'
        };
      case 'activity':
        return {
          title: 'Activity & Study Calendar',
          description: 'Daily consistency log, active streak count, and study heatmap.'
        };
      case 'settings':
        return {
          title: 'Settings & Data Management',
          description: 'Upload your custom Excel spreadsheet, export data, and configure tracker preferences.'
        };
    }
  };

  const pageInfo = getPageInfo(currentTab);

  return (
    <header
      className={`sticky top-0 z-20 bg-white/95 backdrop-blur-xs border-b border-slate-200 transition-all duration-300 ${
        sidebarCollapsed ? 'md:pl-18' : 'md:pl-64'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Mobile menu trigger + Page title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
              {pageInfo.title}
            </h1>
            <p className="hidden sm:block text-xs text-slate-500 truncate max-w-md">
              {pageInfo.description}
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics, modules, resources..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentTab !== 'tracker') {
                  onFocusSearchTab();
                }
              }}
              onFocus={() => {
                if (currentTab !== 'tracker' && searchQuery) {
                  onFocusSearchTab();
                }
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg transition-colors placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Quick stats and Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Streak pill */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-lg text-amber-900 text-xs font-semibold"
            title={`${streakStats.currentStreak} day current streak`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span className="font-mono">{streakStats.currentStreak}d streak</span>
          </div>

          {/* Completed badge */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
            title={`${stats.completed} of ${stats.total} topics completed`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono">
              {stats.completed}/{stats.total}
            </span>
          </div>

          {/* Upload Excel Button */}
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-medium rounded-lg shadow-2xs transition-colors"
            title="Import Excel or CSV spreadsheet"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Excel</span>
          </button>
        </div>
      </div>
    </header>
  );
};
