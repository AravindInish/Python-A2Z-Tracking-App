import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
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
  resetToDefaults
} from './utils/storage';
import { calculateStreaks, logActivity, getTodayDateString } from './utils/streak';

export default function App() {
  // 1. Core State
  const [topics, setTopics] = useState<Topic[]>(() => loadTopics());
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>(() => loadActivityLog());

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

  // Save changes to localStorage
  useEffect(() => {
    saveTopics(topics);
  }, [topics]);

  useEffect(() => {
    saveActivityLog(activityLog);
  }, [activityLog]);

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

  // Trigger celebratory confetti on completion
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

  // Open resource URL
  const handleOpenResource = useCallback((url: string) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
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
    handleResetFilters();
    setCurrentTab('dashboard');
  }, [handleResetFilters]);

  // Handle JSON backup import
  const handleImportBackup = useCallback((newTopics: Topic[], newActivityLog: ActivityEntry[]) => {
    setTopics(newTopics);
    setActivityLog(newActivityLog);
    saveTopics(newTopics);
    saveActivityLog(newActivityLog);
    setCurrentTab('dashboard');
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col">
      {/* Left Sidebar (Desktop) */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setMobileMenuOpen(false);
        }}
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
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-2xs md:hidden"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
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
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {currentTab === 'dashboard' && (
            <DashboardView
              topics={topics}
              stats={stats}
              moduleStats={moduleStats}
              streakStats={streakStats}
              activityLog={activityLog}
              onSelectTopic={(t) => setSelectedTopic(t)}
              onUpdateStatus={handleUpdateStatus}
              onOpenResource={handleOpenResource}
              onNavigateToTracker={handleNavigateToTracker}
              onNavigateToCalendar={() => setCurrentTab('activity')}
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
              onOpenUpload={() => setIsUploadModalOpen(true)}
              onResetAll={handleResetAll}
              onImportBackup={handleImportBackup}
            />
          )}
        </main>
      </div>

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
