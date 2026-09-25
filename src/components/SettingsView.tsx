import React, { useRef, useState, useEffect } from 'react';
import {
  Download,
  Upload,
  RotateCcw,
  FileSpreadsheet,
  FileJson,
  Database,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Sparkles,
  Clock,
  Target,
  Flame,
  Bell,
  BellOff,
  Smartphone,
  Send,
  Check
} from 'lucide-react';
import { Topic, ActivityEntry, OverallStats } from '../types/tracker';
import { exportTopicsToExcel } from '../utils/excelParser';
import { exportBackupJSON, importBackupJSON } from '../utils/storage';
import {
  isNotificationSupported,
  getNotificationPermission,
  sendTestNotification
} from '../utils/notifications';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface SettingsViewProps {
  topics: Topic[];
  activityLog: ActivityEntry[];
  stats: OverallStats;
  onOpenUpload: () => void;
  onResetAll: () => void;
  onImportBackup: (topics: Topic[], activityLog: ActivityEntry[]) => void;
  dailyGoalMinutes: number;
  onUpdateDailyGoal: (minutes: number) => void;
  notificationsEnabled: boolean;
  onToggleNotifications: (enabled: boolean) => Promise<boolean>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  topics,
  activityLog,
  stats,
  onOpenUpload,
  onResetAll,
  onImportBackup,
  dailyGoalMinutes,
  onUpdateDailyGoal,
  notificationsEnabled,
  onToggleNotifications
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<string>(() => getNotificationPermission());
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [inputGoalMinutes, setInputGoalMinutes] = useState<number>(dailyGoalMinutes);
  const [goalSaved, setGoalSaved] = useState(false);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputGoalMinutes(dailyGoalMinutes);
  }, [dailyGoalMinutes]);

  const handleExportExcel = () => {
    exportTopicsToExcel(topics);
    flashMessage('Excel spreadsheet exported successfully!');
  };

  const handleExportJSON = () => {
    exportBackupJSON(topics, activityLog, dailyGoalMinutes);
    flashMessage('Full JSON application backup downloaded!');
  };

  const handleJSONFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const data = await importBackupJSON(file);
        onImportBackup(data.topics, data.activityLog);
        if (data.dailyGoalMinutes) {
          onUpdateDailyGoal(data.dailyGoalMinutes);
        }
        flashMessage(`Successfully imported ${data.topics.length} topics from backup!`);
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : 'Failed to import JSON backup.');
        setTimeout(() => setErrorMessage(null), 4000);
      }
    }
  };

  const flashMessage = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleSaveGoal = (target: number) => {
    const valid = Math.max(5, Math.min(720, Math.round(target)));
    setInputGoalMinutes(valid);
    onUpdateDailyGoal(valid);
    setGoalSaved(true);
    flashMessage(`Daily study time goal updated to ${valid} minutes!`);
    setTimeout(() => setGoalSaved(false), 2500);
  };

  const handleToggleNotificationSetting = async () => {
    if (!isNotificationSupported()) {
      setErrorMessage('Browser notifications are not supported by this browser.');
      setTimeout(() => setErrorMessage(null), 3500);
      return;
    }

    if (!notificationsEnabled) {
      const granted = await onToggleNotifications(true);
      setNotificationPermission(getNotificationPermission());
      if (granted) {
        flashMessage('Desktop browser notifications enabled! You will be alerted when Pomodoro timers finish.');
      } else {
        setErrorMessage('Notification permission was not granted by your browser.');
        setTimeout(() => setErrorMessage(null), 4000);
      }
    } else {
      await onToggleNotifications(false);
      flashMessage('Notifications disabled.');
    }
  };

  const handleTestNotificationClick = () => {
    const sent = sendTestNotification();
    if (sent) {
      flashMessage('Test notification sent! Check your desktop notification center.');
    } else {
      setErrorMessage('Unable to send notification. Please enable notifications and allow browser permission first.');
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  const goalPresets = [
    { label: '15 min', minutes: 15, tag: 'Brisk' },
    { label: '30 min', minutes: 30, tag: 'Standard' },
    { label: '45 min', minutes: 45, tag: 'Recommended' },
    { label: '60 min', minutes: 60, tag: 'Intensive' },
    { label: '90 min', minutes: 90, tag: 'Deep Focus' },
    { label: '120 min', minutes: 120, tag: 'Mastery' },
  ];

  const weeklyHours = ((inputGoalMinutes * 7) / 60).toFixed(1);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Notification */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-center gap-2 shadow-sm animate-in fade-in">
          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Daily Study Time Goal Section */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Daily Study Time Goal
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Set your target study duration in minutes per day. Your daily progress and streak pace will be tracked and visualized on the Dashboard.
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="font-mono text-lg font-bold text-blue-600">
              {dailyGoalMinutes}
            </span>
            <span className="text-xs text-slate-400 font-mono"> min/day</span>
          </div>
        </div>

        {/* Target input and Presets */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700">
            Choose a quick preset or enter custom minutes:
          </label>

          {/* Quick presets */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {goalPresets.map((preset) => {
              const isCurrent = inputGoalMinutes === preset.minutes;
              return (
                <button
                  key={preset.minutes}
                  type="button"
                  onClick={() => handleSaveGoal(preset.minutes)}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    isCurrent
                      ? 'bg-blue-50 border-blue-500 text-blue-800 font-semibold shadow-2xs ring-1 ring-blue-500'
                      : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <div className="text-xs font-bold">{preset.label}</div>
                  <div className="text-[10px] text-slate-500">{preset.tag}</div>
                </button>
              );
            })}
          </div>

          {/* Custom Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <div className="relative flex-1 max-w-xs">
              <input
                type="number"
                min={5}
                max={720}
                step={5}
                value={inputGoalMinutes}
                onChange={(e) => setInputGoalMinutes(Number(e.target.value))}
                className="w-full pl-3 pr-14 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-sm font-mono text-slate-900"
                placeholder="e.g. 45"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono pointer-events-none">
                minutes
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleSaveGoal(inputGoalMinutes)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
            >
              <Target className="w-3.5 h-3.5" />
              <span>{goalSaved ? 'Goal Saved!' : 'Save Target'}</span>
            </button>
          </div>
        </div>

        {/* Goal Projection & Impact Summary */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-600">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span>
              At <strong>{inputGoalMinutes} min/day</strong>, you will complete approximately{' '}
              <strong className="text-slate-900 font-mono">{weeklyHours} hours</strong> of focused learning each week.
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shrink-0">
            ~{Math.round((inputGoalMinutes * 30) / 60)} hrs / month
          </span>
        </div>
      </div>

      {/* 2. Desktop Browser & Web Notifications Section */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              Desktop & Browser Notifications (Web Notification API)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Receive native system notifications when your 25-minute Pomodoro study timer finishes, even if you are browsing another tab or application.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {notificationsEnabled && notificationPermission === 'granted' ? (
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold rounded-lg flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Enabled</span>
              </span>
            ) : notificationPermission === 'denied' ? (
              <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold rounded-lg">
                Blocked in Browser
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-semibold rounded-lg">
                Disabled
              </span>
            )}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-800">
              Pomodoro Session Finish Alert
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              When enabled, a gentle alert pops up upon completing 25 minutes of deep focus with your session stats and 5-minute break suggestion.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleToggleNotificationSetting}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs ${
                notificationsEnabled && notificationPermission === 'granted'
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {notificationsEnabled && notificationPermission === 'granted' ? (
                <>
                  <BellOff className="w-3.5 h-3.5" />
                  <span>Disable</span>
                </>
              ) : (
                <>
                  <Bell className="w-3.5 h-3.5" />
                  <span>Enable Notifications</span>
                </>
              )}
            </button>

            {notificationsEnabled && notificationPermission === 'granted' && (
              <button
                type="button"
                onClick={handleTestNotificationClick}
                className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 shadow-2xs"
                title="Send a sample notification to your desktop/mobile"
              >
                <Send className="w-3 h-3 text-blue-600" />
                <span>Test Alert</span>
              </button>
            )}
          </div>
        </div>

        {notificationPermission === 'denied' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Notifications are currently blocked by your browser settings. To enable, click the tune/lock icon in your address bar and toggle Notifications to &quot;Allow&quot;.
            </span>
          </div>
        )}
      </div>

      {/* 3. Android & Mobile App (PWA) Section */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              Android & Mobile App (PWA)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Install the curriculum tracker as a native Android or mobile app for offline access, full-screen study, and smooth 60fps gesture navigation.
            </p>
          </div>

          <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg shrink-0 ${
            isInstalled
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {isInstalled ? 'Installed Standalone' : isAndroid ? 'Android Ready' : 'Installable PWA'}
          </span>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-800">
              {isInstalled ? 'App Installed Successfully' : 'Add to Home Screen / App Drawer'}
            </h4>
            <p className="text-[11px] text-slate-500">
              {isInstalled
                ? 'You are running the application in native standalone mode.'
                : 'Experience zero-lag topic tracking, offline cached resources, and background study notifications.'}
            </p>
          </div>

          {!isInstalled && (
            <button
              type="button"
              onClick={install}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Spreadsheets & Custom Curriculum */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              Spreadsheet Management (Source of Truth)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload your own Excel or CSV file to replace or update the curriculum tracker.
            </p>
          </div>

          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New Excel</span>
          </button>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-2">
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>Spreadsheet Engine Capabilities:</span>
          </div>
          <ul className="list-disc list-inside text-slate-500 space-y-1 pl-1">
            <li>Strictly preserves the exact order of rows from your spreadsheet</li>
            <li>Retains your hierarchical Module and Submodule grouping</li>
            <li>Extracts original resource links (W3Schools, LeetCode, Striver, Docs)</li>
            <li>Maintains custom columns and allows dynamic column mapping</li>
          </ul>
        </div>
      </div>

      {/* 2. Export & Backup Section */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-600" />
            Export & Data Backup
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Download your current progress, notes, and activity history
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Export to Excel */}
          <div className="p-4 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Export to Excel (.xlsx)</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Generates a clean spreadsheet containing all {topics.length} topics with their latest statuses, notes, and dates.
              </p>
            </div>
            <button
              onClick={handleExportExcel}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .xlsx File</span>
            </button>
          </div>

          {/* Export / Import JSON */}
          <div className="p-4 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <FileJson className="w-4 h-4 text-amber-600" />
                <span>JSON App State Backup</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Complete application state including streaks, timestamps, and activity history for seamless device migration.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Backup JSON</span>
              </button>

              <button
                onClick={() => jsonFileInputRef.current?.click()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Restore JSON</span>
              </button>

              <input
                ref={jsonFileInputRef}
                type="file"
                accept=".json"
                onChange={handleJSONFileSelect}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Persistence & Local Storage Info */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Local Storage Persistence
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Your study status, daily streaks, and personal notes are automatically saved to your browser.
            </p>
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-mono font-medium rounded-md">
            Active & Persisted
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Topics Stored</span>
            <span className="text-slate-900 font-bold">{topics.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Completed</span>
            <span className="text-emerald-600 font-bold">{stats.completed}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Logged Days</span>
            <span className="text-slate-900 font-bold">{activityLog.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Storage Engine</span>
            <span className="text-slate-700 font-semibold">localStorage</span>
          </div>
        </div>
      </div>

      {/* 4. Danger Zone / Reset */}
      <div className="bg-rose-50/40 border border-rose-200/80 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-rose-950 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Reset Application Data
          </h3>
          <p className="text-xs text-rose-700 mt-0.5">
            Reset all topic statuses, clear notes, and restore the default DSA & Python curriculum.
          </p>
        </div>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3.5 py-2 bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
          >
            Reset to Initial Curriculum
          </button>
        ) : (
          <div className="p-4 bg-white border border-rose-300 rounded-xl space-y-3">
            <p className="text-xs text-slate-700 font-medium">
              Are you sure? This will reset all current progress and custom topic mappings back to default.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onResetAll();
                  setShowResetConfirm(false);
                  flashMessage('Curriculum reset to default state.');
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
