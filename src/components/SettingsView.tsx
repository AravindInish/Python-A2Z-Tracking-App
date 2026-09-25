import React, { useRef, useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { Topic, ActivityEntry, OverallStats } from '../types/tracker';
import { exportTopicsToExcel } from '../utils/excelParser';
import { exportBackupJSON, importBackupJSON } from '../utils/storage';

interface SettingsViewProps {
  topics: Topic[];
  activityLog: ActivityEntry[];
  stats: OverallStats;
  onOpenUpload: () => void;
  onResetAll: () => void;
  onImportBackup: (topics: Topic[], activityLog: ActivityEntry[]) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  topics,
  activityLog,
  stats,
  onOpenUpload,
  onResetAll,
  onImportBackup
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

  const handleExportExcel = () => {
    exportTopicsToExcel(topics);
    flashMessage('Excel spreadsheet exported successfully!');
  };

  const handleExportJSON = () => {
    exportBackupJSON(topics, activityLog);
    flashMessage('Full JSON application backup downloaded!');
  };

  const handleJSONFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const data = await importBackupJSON(file);
        onImportBackup(data.topics, data.activityLog);
        flashMessage(`Successfully imported ${data.topics.length} topics from backup!`);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Failed to import JSON backup.');
      }
    }
  };

  const flashMessage = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Notification */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 1. Spreadsheets & Custom Curriculum */}
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
