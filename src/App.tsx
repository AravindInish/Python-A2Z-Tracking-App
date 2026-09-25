import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  BarChart3,
  Menu
} from 'lucide-react';
import {
  Sidebar,
  NavTab
} from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { StudyTrackerView } from './components/StudyTrackerView';
import { ModulesView } from './components/ModulesView';
import { ProgressAnalyticsView } from './components/ProgressAnalyticsView';
import { ActivityCalendarView } from './components/ActivityCalendarView';
import { SettingsView } from './components/SettingsView';
import { TopicDetailModal } from './components/TopicDetailModal';
import { ExcelUploadModal } from './components/ExcelUploadModal';

import {
  Topic,
  TopicStatus,
  TrackerFilter,
  ActivityEntry
} from './types/tracker';
import {
  loadTopics,
  saveTopics,
  loadActivityLog,
  saveActivityLog,
  calculateOverallStats,
  calculateModuleStats,
  resetToDefaults,
  loadDailyStudyGoal,
  saveDailyStudyGoal,
  loadDailyStudyTime,
  saveDailyStudyTime
} from './utils/storage';
import { calculateStreaks, logActivity, getTodayDateString } from './utils/streak';

export default function App() {
  // 1. Core State
  const [topics, setTopics] = useState<Topic[]>(() => loadTopics());
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>(() => loadActivityLog());
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(() => loadDailyStudyGoal());
  const [dailyStudyTime, setDailyStudyTime] = useState<Record<string, number>>(() => loadDailyStudyTime());

  // 2. Navigation & UI State
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 3. Filter & Search State
  const [filter, setFilter] = useState<TrackerFilter>({
    search: '',
    status: 'All',
    module: 'All',
    sortBy: 'order',
    sortOrder: 'asc',
    viewMode: 'hierarchical'
  });

  // 4. Modals State
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Prevent background scroll and allow Escape key when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Save changes to localStorage
  useEffect(() => {
    saveTopics(topics);
  }, [topics]);

  useEffect(() => {
    saveActivityLog(activityLog);
  }, [activityLog]);

  useEffect(() => {
    saveDailyStudyGoal(dailyGoalMinutes);
  }, [dailyGoalMinutes]);

  useEffect(() => {
    saveDailyStudyTime(dailyStudyTime);
  }, [dailyStudyTime]);

  const todayDateStr = getTodayDateString();
  const todayStudyMinutes = dailyStudyTime[todayDateStr] || 0;

  // Trigger celebratory confetti on completion or goal achievement
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#2563eb', '#10b981', '#f59e0b', '#6366f1']
      });
    } catch {
      // ignore
    }
  }, []);

  const handleAddStudyMinutes = useCallback((mins: number) => {
    if (mins <= 0) return;
    const today = getTodayDateString();
    setDailyStudyTime(prev => {
      const current = prev[today] || 0;
      const updated = current + mins;
      if (current < dailyGoalMinutes && updated >= dailyGoalMinutes) {
        triggerConfetti();
      }
      return {
        ...prev,
        [today]: updated
      };
    });
  }, [dailyGoalMinutes, triggerConfetti]);

  const handleUpdateDailyGoal = useCallback((minutes: number) => {
    setDailyGoalMinutes(minutes);
    saveDailyStudyGoal(minutes);
  }, []);

  // Dynamic calculations (Strictly no hardcoding)
  const stats = useMemo(() => calculateOverallStats(topics), [topics]);
  const moduleStats = useMemo(() => calculateModuleStats(topics), [topics]);
  const streakStats = useMemo(() => calculateStreaks(activityLog), [activityLog]);

  // Unique module names list for filter
  const modulesList = useMemo(() => {
    const set = new Set<string>();
    topics.forEach(t => {
      if (t.module) set.add(t.module);
    });
    return Array.from(set);
  }, [topics]);

  // Update Status handler
  const handleUpdateStatus = useCallback((topicId: string, newStatus: TopicStatus) => {
    const todayStr = getTodayDateString();

    setTopics(prev => {
      return prev.map(t => {
        if (t.id === topicId) {
          const wasCompleted = t.status === 'Completed';
          const isNowCompleted = newStatus === 'Completed';

          if (isNowCompleted && !wasCompleted) {
            triggerConfetti();
          }

          return {
            ...t,
            status: newStatus,
            lastStudied: newStatus !== 'Not Started' ? todayStr : t.lastStudied
          };
        }
        return t;
      });
    });

    // Also update selected topic modal if open
    setSelectedTopic(prev => {
      if (prev && prev.id === topicId) {
        return {
          ...prev,
          status: newStatus,
          lastStudied: newStatus !== 'Not Started' ? todayStr : prev.lastStudied
        };
      }
      return prev;
    });

    // Register activity log for today
    if (newStatus !== 'Not Started') {
      setActivityLog(prev => logActivity(prev, topicId, todayStr));
    }
  }, [triggerConfetti]);

  // Checkbox toggle handler (1-click completion)
  const handleToggleCheckbox = useCallback((topicId: string, currentStatus: TopicStatus) => {
    const targetStatus: TopicStatus = currentStatus === 'Completed' ? 'Not Started' : 'Completed';
    handleUpdateStatus(topicId, targetStatus);
  }, [handleUpdateStatus]);

  // Update Topic Notes
  const handleUpdateNotes = useCallback((topicId: string, notes: string) => {
    setTopics(prev => {
      return prev.map(t => {
        if (t.id === topicId) {
          return { ...t, notes };
        }
        return t;
      });
    });

    setSelectedTopic(prev => {
      if (prev && prev.id === topicId) {
        return { ...prev, notes };
      }
      return prev;
    });
  }, []);

  // Open resource URL safely without popup blocker / iframe restriction errors
  const handleOpenResource = useCallback((url: string) => {
    if (!url) return;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.location.assign(url);
    }
  }, []);

  // Reset filters
  const handleResetFilters = useCallback(() => {
    setFilter(prev => ({
      ...prev,
      search: '',
      status: 'All',
      module: 'All',
      sortBy: 'order',
      sortOrder: 'asc'
    }));
  }, []);

  // Navigate to tracker filtered by module
  const handleNavigateToTracker = useCallback((moduleName?: string) => {
    if (moduleName) {
      setFilter(prev => ({ ...prev, module: moduleName, search: '' }));
    }
    setCurrentTab('tracker');
  }, []);

  // Handle uploaded spreadsheet load
  const handleUploadSuccess = useCallback((newTopics: Topic[]) => {
    setTopics(newTopics);
    saveTopics(newTopics);
    // Reset filters to show full new sheet
    setFilter({
      search: '',
      status: 'All',
      module: 'All',
      sortBy: 'order',
      sortOrder: 'asc',
      viewMode: 'hierarchical'
    });
    setCurrentTab('tracker');
    triggerConfetti();
  }, [triggerConfetti]);

  // Handle application reset
  const handleResetAll = useCallback(() => {
    const defaults = resetToDefaults();
    setTopics(defaults.topics);
    setActivityLog(defaults.activityLog);
    setDailyGoalMinutes(defaults.dailyGoalMinutes);
    setDailyStudyTime(defaults.dailyStudyTime);
    handleResetFilters();
    setCurrentTab('dashboard');
  }, [handleResetFilters]);

  // Handle JSON backup import
  const handleImportBackup = useCallback((newTopics: Topic[], newActivityLog: ActivityEntry[]) => {
    setTopics(newTopics);
    setActivityLog(newActivityLog);
    saveTopics(newTopics);
    saveActivityLog(newActivityLog);
    setDailyGoalMinutes(loadDailyStudyGoal());
    setDailyStudyTime(loadDailyStudyTime());
    setCurrentTab('dashboard');
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col">
      {/* Left Sidebar (Desktop) */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        stats={stats}
        streakStats={streakStats}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
      >
        <Sidebar
          isMobile
          onCloseMobile={() => setMobileMenuOpen(false)}
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            setMobileMenuOpen(false);
          }}
          collapsed={false}
          onToggleCollapse={() => setMobileMenuOpen(false)}
          stats={stats}
          streakStats={streakStats}
          onOpenUpload={() => {
            setMobileMenuOpen(false);
            setIsUploadModalOpen(true);
          }}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'md:pl-18' : 'md:pl-64'
        }`}
      >
        {/* Sticky Header */}
        <Header
          currentTab={currentTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenUpload={() => setIsUploadModalOpen(true)}
          searchQuery={filter.search}
          onSearchChange={(q) => setFilter(prev => ({ ...prev, search: q }))}
          onFocusSearchTab={() => setCurrentTab('tracker')}
          streakStats={streakStats}
          stats={stats}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* View Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 pb-24 md:pb-6">
          {currentTab === 'dashboard' && (
            <DashboardView
              topics={topics}
              stats={stats}
              moduleStats={moduleStats}
              streakStats={streakStats}
              activityLog={activityLog}
              dailyGoalMinutes={dailyGoalMinutes}
              todayStudyMinutes={todayStudyMinutes}
              onAddStudyMinutes={handleAddStudyMinutes}
              onSelectTopic={(t) => setSelectedTopic(t)}
              onUpdateStatus={handleUpdateStatus}
              onOpenResource={handleOpenResource}
              onNavigateToTracker={handleNavigateToTracker}
              onNavigateToCalendar={() => setCurrentTab('activity')}
              onNavigateToSettings={() => setCurrentTab('settings')}
            />
          )}

          {currentTab === 'tracker' && (
            <StudyTrackerView
              topics={topics}
              modulesList={modulesList}
              filter={filter}
              onFilterChange={(newF) => setFilter(prev => ({ ...prev, ...newF }))}
              onResetFilters={handleResetFilters}
              onSelectTopic={(t) => setSelectedTopic(t)}
              onUpdateStatus={handleUpdateStatus}
              onToggleCheckbox={handleToggleCheckbox}
              onOpenResource={handleOpenResource}
            />
          )}

          {currentTab === 'modules' && (
            <ModulesView
              moduleStats={moduleStats}
              onSelectModule={handleNavigateToTracker}
            />
          )}

          {currentTab === 'progress' && (
            <ProgressAnalyticsView
              stats={stats}
              moduleStats={moduleStats}
              topics={topics}
              onSelectModule={handleNavigateToTracker}
            />
          )}

          {currentTab === 'activity' && (
            <ActivityCalendarView
              activityLog={activityLog}
              streakStats={streakStats}
              topics={topics}
              onSelectTopic={(t) => setSelectedTopic(t)}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              topics={topics}
              activityLog={activityLog}
              stats={stats}
              dailyGoalMinutes={dailyGoalMinutes}
              onUpdateDailyGoal={handleUpdateDailyGoal}
              onOpenUpload={() => setIsUploadModalOpen(true)}
              onResetAll={handleResetAll}
              onImportBackup={handleImportBackup}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 md:hidden flex items-stretch h-14 px-1 safe-bottom shadow-lg"
        aria-label="Mobile primary navigation"
      >
        <button
          type="button"
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
            currentTab === 'dashboard' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('tracker')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
            currentTab === 'tracker' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Tracker</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('modules')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
            currentTab === 'modules' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>Modules</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab('progress')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
            currentTab === 'progress' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 mb-0.5" />
          <span>Progress</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Open full menu"
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span>Menu</span>
        </button>
      </nav>

      {/* Topic Detail Modal */}
      <TopicDetailModal
        topic={selectedTopic}
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
        onOpenResource={handleOpenResource}
      />

      {/* Excel Upload Modal */}
      <ExcelUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
