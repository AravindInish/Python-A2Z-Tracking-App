import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Clock,
  RotateCcw,
  Calendar,
  FileText,
  Tag,
  Save,
  Layers,
  CircleDot
} from 'lucide-react';
import { Topic, TopicStatus } from '../types/tracker';
import { StatusDropdown } from './StatusDropdown';
import { formatDateDisplay } from '../utils/streak';

interface TopicDetailModalProps {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: TopicStatus) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onOpenResource: (url: string) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onOpenResource
}) => {
  const [notesText, setNotesText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (topic) {
      setNotesText(topic.notes || '');
      setIsSaved(false);
    }
  }, [topic]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !topic) return null;

  const handleSaveNotes = () => {
    onUpdateNotes(topic.id, notesText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="topic-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="font-mono text-slate-400">#{topic.order}</span>
              <span>•</span>
              <span className="truncate">{topic.module}</span>
              <span>›</span>
              <span className="truncate text-slate-600 font-semibold">{topic.submodule}</span>
            </div>
            <h2 id="topic-title" className="text-lg font-semibold text-slate-900 leading-snug">
              {topic.topic}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Quick Status Bar */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Status:</span>
              <StatusDropdown
                status={topic.status}
                onChange={(s) => onUpdateStatus(topic.id, s)}
                size="md"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {topic.status !== 'Completed' && (
                <button
                  onClick={() => onUpdateStatus(topic.id, 'Completed')}
                  className="px-2.5 py-1 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-md flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mark Completed
                </button>
              )}
              {topic.status !== 'In Progress' && (
                <button
                  onClick={() => onUpdateStatus(topic.id, 'In Progress')}
                  className="px-2.5 py-1 text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-md flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <Clock className="w-3.5 h-3.5" />
                  Start
                </button>
              )}
              {topic.status !== 'Not Started' && (
                <button
                  onClick={() => onUpdateStatus(topic.id, 'Not Started')}
                  className="px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
                  title="Reset to Not Started"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Resource & Metadata Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 border border-slate-200/80 rounded-xl space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Learning Resource
              </span>
              <div className="flex items-center justify-between pt-1">
                <span className="font-medium text-slate-800 truncate">
                  {topic.resourceName || 'Resource'}
                </span>
                {topic.resourceUrl ? (
                  <button
                    onClick={() => onOpenResource(topic.resourceUrl!)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">No link provided</span>
                )}
              </div>
            </div>

            <div className="p-3 border border-slate-200/80 rounded-xl space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Last Studied
              </span>
              <div className="flex items-center gap-2 pt-1 text-slate-700 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-xs">{formatDateDisplay(topic.lastStudied)}</span>
              </div>
            </div>
          </div>

          {/* Difficulty & Tags if present */}
          {(topic.difficulty || (topic.tags && topic.tags.length > 0)) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {topic.difficulty && (
                <span
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                    topic.difficulty === 'Easy'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : topic.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : topic.difficulty === 'Hard'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {topic.difficulty}
                </span>
              )}
              {topic.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-md"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Custom Fields (from uploaded Excel) */}
          {topic.customFields && Object.keys(topic.customFields).length > 0 && (
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Additional Spreadsheet Columns
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(topic.customFields).map(([k, v]) => (
                  <div key={k} className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                    <div className="text-slate-400 font-medium truncate">{k}</div>
                    <div className="text-slate-800 font-mono mt-0.5 truncate">{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Notes Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="topic-notes" className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Personal Study Notes & Key Takeaways
              </label>
              {isSaved && (
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
            </div>
            <textarea
              id="topic-notes"
              rows={4}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Jot down important edge cases, optimal time/space complexity, core algorithmic ideas, or review reminders..."
              className="w-full p-3 text-xs sm:text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 font-sans transition-colors resize-y"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveNotes}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-2xs"
              >
                <Save className="w-3.5 h-3.5" />
                Save Notes
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">Esc</kbd> to close</span>
          <button
            onClick={onClose}
            className="px-3 py-1 text-slate-600 hover:text-slate-900 font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
