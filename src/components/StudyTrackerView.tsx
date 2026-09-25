import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Circle,
  FileText,
  RotateCcw,
  SlidersHorizontal,
  FolderOpen,
  Folder,
  Layers,
  ArrowUpDown,
  X,
  Plus,
  BookOpen
} from 'lucide-react';
import { Topic, TopicStatus, TrackerFilter } from '../types/tracker';
import { StatusDropdown } from './StatusDropdown';
import { formatDateDisplay } from '../utils/streak';

interface StudyTrackerViewProps {
  topics: Topic[];
  modulesList: string[];
  filter: TrackerFilter;
  onFilterChange: (newFilter: Partial<TrackerFilter>) => void;
  onResetFilters: () => void;
  onSelectTopic: (topic: Topic) => void;
  onUpdateStatus: (id: string, status: TopicStatus) => void;
  onToggleCheckbox: (id: string, currentStatus: TopicStatus) => void;
  onOpenResource: (url: string) => void;
}

export const StudyTrackerView: React.FC<StudyTrackerViewProps> = ({
  topics,
  modulesList,
  filter,
  onFilterChange,
  onResetFilters,
  onSelectTopic,
  onUpdateStatus,
  onToggleCheckbox,
  onOpenResource
}) => {
  // Collapsed modules and submodules state
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});
  const [collapsedSubmodules, setCollapsedSubmodules] = useState<Record<string, boolean>>({});

  const toggleModuleCollapse = (moduleName: string) => {
    setCollapsedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  const toggleSubmoduleCollapse = (key: string) => {
    setCollapsedSubmodules(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const expandAll = () => {
    setCollapsedModules({});
    setCollapsedSubmodules({});
  };

  const collapseAll = () => {
    const mods: Record<string, boolean> = {};
    const subs: Record<string, boolean> = {};
    modulesList.forEach(m => {
      mods[m] = true;
    });
    topics.forEach(t => {
      subs[`${t.module}::${t.submodule}`] = true;
    });
    setCollapsedModules(mods);
    setCollapsedSubmodules(subs);
  };

  // Filter & Search Topics
  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      // 1. Search Query
      if (filter.search.trim()) {
        const q = filter.search.toLowerCase();
        const inTopic = t.topic.toLowerCase().includes(q);
        const inModule = t.module.toLowerCase().includes(q);
        const inSubmodule = t.submodule.toLowerCase().includes(q);
        const inResource = (t.resourceName || '').toLowerCase().includes(q);
        const inNotes = (t.notes || '').toLowerCase().includes(q);
        const inTags = t.tags?.some(tag => tag.toLowerCase().includes(q));
        if (!inTopic && !inModule && !inSubmodule && !inResource && !inNotes && !inTags) {
          return false;
        }
      }

      // 2. Status Filter
      if (filter.status !== 'All' && t.status !== filter.status) {
        return false;
      }

      // 3. Module Filter
      if (filter.module !== 'All' && t.module !== filter.module) {
        return false;
      }

      return true;
    });
  }, [topics, filter.search, filter.status, filter.module]);

  // Sort Topics (Default is original spreadsheet order)
  const sortedTopics = useMemo(() => {
    const list = [...filteredTopics];
    if (filter.sortBy === 'order') {
      return list.sort((a, b) => (filter.sortOrder === 'asc' ? a.order - b.order : b.order - a.order));
    }
    if (filter.sortBy === 'topic') {
      return list.sort((a, b) =>
        filter.sortOrder === 'asc' ? a.topic.localeCompare(b.topic) : b.topic.localeCompare(a.topic)
      );
    }
    if (filter.sortBy === 'status') {
      const orderMap: Record<TopicStatus, number> = {
        'Completed': 1,
        'In Progress': 2,
        'Review': 3,
        'Not Started': 4
      };
      return list.sort((a, b) =>
        filter.sortOrder === 'asc'
          ? (orderMap[a.status] || 99) - (orderMap[b.status] || 99)
          : (orderMap[b.status] || 99) - (orderMap[a.status] || 99)
      );
    }
    if (filter.sortBy === 'lastStudied') {
      return list.sort((a, b) => {
        const dateA = a.lastStudied || '1970-01-01';
        const dateB = b.lastStudied || '1970-01-01';
        return filter.sortOrder === 'asc' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
      });
    }
    return list;
  }, [filteredTopics, filter.sortBy, filter.sortOrder]);

  // Group by Module -> Submodule for Hierarchical View
  const hierarchicalData = useMemo(() => {
    const map = new Map<string, Map<string, Topic[]>>();

    sortedTopics.forEach(t => {
      const mod = t.module || 'General';
      const sub = t.submodule || 'Core Topics';

      if (!map.has(mod)) {
        map.set(mod, new Map());
      }
      const subMap = map.get(mod)!;
      if (!subMap.has(sub)) {
        subMap.set(sub, []);
      }
      subMap.get(sub)!.push(t);
    });

    return map;
  }, [sortedTopics]);

  const hasActiveFilters = filter.search !== '' || filter.status !== 'All' || filter.module !== 'All';

  return (
    <div className="space-y-4">
      {/* FILTER & CONTROL BAR */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search across topics, modules, submodules, resources, notes..."
              value={filter.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg placeholder:text-slate-400"
            />
            {filter.search && (
              <button
                onClick={() => onFilterChange({ search: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">Status:</span>
              <select
                value={filter.status}
                onChange={(e) => onFilterChange({ status: e.target.value as TrackerFilter['status'] })}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
                <option value="Review">Review</option>
              </select>
            </div>

            {/* Module Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">Module:</span>
              <select
                value={filter.module}
                onChange={(e) => onFilterChange({ module: e.target.value })}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 max-w-[180px] truncate"
              >
                <option value="All">All Modules</option>
                {modulesList.map((m) => (
                  <option key={m} value={m} title={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={`${filter.sortBy}-${filter.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-') as [TrackerFilter['sortBy'], TrackerFilter['sortOrder']];
                  onFilterChange({ sortBy, sortOrder });
                }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="order-asc">Excel Original Order</option>
                <option value="order-desc">Reverse Original Order</option>
                <option value="topic-asc">Topic Name (A-Z)</option>
                <option value="status-asc">Status</option>
                <option value="lastStudied-desc">Recently Studied</option>
              </select>
            </div>

            {/* Reset Filter Button */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center gap-1"
                title="Clear all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* View Toggle & Count strip */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-800 font-semibold">
              Showing {sortedTopics.length} of {topics.length} topics
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 font-medium">
                Filtered view
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Hierarchical vs Flat */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
              <button
                type="button"
                onClick={() => onFilterChange({ viewMode: 'hierarchical' })}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  filter.viewMode === 'hierarchical'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Tree View
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ viewMode: 'flat' })}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  filter.viewMode === 'flat'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Table View
              </button>
            </div>

            {filter.viewMode === 'hierarchical' && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={expandAll}
                  className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                >
                  Expand All
                </button>
                <span className="text-slate-300">•</span>
                <button
                  onClick={collapseAll}
                  className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                >
                  Collapse All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOPICS CONTAINER */}
      {sortedTopics.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-xl p-12 text-center shadow-2xs space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">No topics found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              No topics match your current search query or active filter settings. Try clearing the filters.
            </p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      ) : filter.viewMode === 'hierarchical' ? (
        /* HIERARCHICAL TREE VIEW (Module -> Submodule -> Topics) */
        <div className="space-y-4">
          {Array.from(hierarchicalData.entries()).map(([moduleName, subMap]) => {
            const isModCollapsed = !!collapsedModules[moduleName];

            // Module completion stats
            let modTotal = 0;
            let modDone = 0;
            subMap.forEach(topicArr => {
              modTotal += topicArr.length;
              modDone += topicArr.filter(t => t.status === 'Completed').length;
            });
            const modPercentage = modTotal > 0 ? Math.round((modDone / modTotal) * 100) : 0;

            return (
              <div
                key={moduleName}
                className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                {/* Module Bar */}
                <div
                  onClick={() => toggleModuleCollapse(moduleName)}
                  className="px-4 py-3 bg-slate-50/90 hover:bg-slate-100/80 border-b border-slate-200/80 flex items-center justify-between cursor-pointer select-none transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      className="p-1 text-slate-400 hover:text-slate-600 rounded transition-transform"
                      aria-label="Toggle module"
                    >
                      {isModCollapsed ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <Folder className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <h3 className="text-sm font-bold text-slate-900 truncate">{moduleName}</h3>
                    <span className="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {modDone} / {modTotal} completed
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-24 sm:w-32 bg-slate-200 rounded-full h-1.5 overflow-hidden hidden sm:block">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${modPercentage}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-700 min-w-9 text-right">
                      {modPercentage}%
                    </span>
                  </div>
                </div>

                {/* Submodules & Topics */}
                {!isModCollapsed && (
                  <div className="divide-y divide-slate-100">
                    {Array.from(subMap.entries()).map(([subName, subTopics]) => {
                      const subKey = `${moduleName}::${subName}`;
                      const isSubCollapsed = !!collapsedSubmodules[subKey];
                      const subDone = subTopics.filter(t => t.status === 'Completed').length;

                      return (
                        <div key={subKey} className="bg-white">
                          {/* Submodule Bar */}
                          <div
                            onClick={() => toggleSubmoduleCollapse(subKey)}
                            className="px-6 py-2.5 bg-slate-50/40 hover:bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer select-none text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <button className="text-slate-400">
                                {isSubCollapsed ? (
                                  <ChevronRight className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <span className="font-semibold text-slate-700 truncate">{subName}</span>
                              <span className="text-[11px] font-mono text-slate-400">
                                ({subDone}/{subTopics.length})
                              </span>
                            </div>

                            <span className="text-[11px] font-mono text-slate-500">
                              {subTopics.length} {subTopics.length === 1 ? 'topic' : 'topics'}
                            </span>
                          </div>

                          {/* Topics List Table */}
                          {!isSubCollapsed && (
                            <div className="divide-y divide-slate-100/80">
                              {subTopics.map((topic) => (
                                <TopicRow
                                  key={topic.id}
                                  topic={topic}
                                  onSelectTopic={onSelectTopic}
                                  onUpdateStatus={onUpdateStatus}
                                  onToggleCheckbox={onToggleCheckbox}
                                  onOpenResource={onOpenResource}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* FLAT TABLE VIEW */
        <div className="bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50/90 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-3.5 py-3 w-10 text-center">Done</th>
                  <th className="px-3 py-3 w-12 text-center font-mono">#</th>
                  <th className="px-3 py-3">Topic</th>
                  <th className="px-3 py-3 hidden md:table-cell">Module</th>
                  <th className="px-3 py-3 hidden lg:table-cell">Sub-module</th>
                  <th className="px-3 py-3">Resource</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3 hidden sm:table-cell">Last Studied</th>
                  <th className="px-3.5 py-3 text-right">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedTopics.map((topic) => (
                  <tr
                    key={topic.id}
                    onClick={() => onSelectTopic(topic)}
                    className="hover:bg-slate-50/70 cursor-pointer transition-colors group"
                  >
                    {/* Checkbox */}
                    <td
                      className="px-3.5 py-2.5 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCheckbox(topic.id, topic.status);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={topic.status === 'Completed'}
                        onChange={() => {}}
                        aria-label={`Mark ${topic.topic} as completed`}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                      />
                    </td>

                    {/* Order */}
                    <td className="px-3 py-2.5 text-center font-mono text-slate-400">
                      {topic.order}
                    </td>

                    {/* Topic Name */}
                    <td className="px-3 py-2.5 font-medium text-slate-900 group-hover:text-blue-600">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate max-w-xs sm:max-w-md">{topic.topic}</span>
                        {topic.difficulty && (
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                              topic.difficulty === 'Easy'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : topic.difficulty === 'Medium'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {topic.difficulty}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Module */}
                    <td className="px-3 py-2.5 text-slate-600 hidden md:table-cell truncate max-w-[130px]">
                      {topic.module}
                    </td>

                    {/* Submodule */}
                    <td className="px-3 py-2.5 text-slate-500 hidden lg:table-cell truncate max-w-[130px]">
                      {topic.submodule}
                    </td>

                    {/* Resource Link */}
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => {
                        if (topic.resourceUrl) {
                          e.stopPropagation();
                          onOpenResource(topic.resourceUrl);
                        }
                      }}
                    >
                      {topic.resourceUrl ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline max-w-[120px] truncate"
                          title={`Open ${topic.resourceUrl}`}
                        >
                          <span className="truncate">{topic.resourceName || 'Resource'}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </button>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                      <StatusDropdown
                        status={topic.status}
                        onChange={(s) => onUpdateStatus(topic.id, s)}
                        size="sm"
                      />
                    </td>

                    {/* Last Studied */}
                    <td className="px-3 py-2.5 text-slate-500 font-mono hidden sm:table-cell whitespace-nowrap">
                      {formatDateDisplay(topic.lastStudied)}
                    </td>

                    {/* Notes preview */}
                    <td className="px-3.5 py-2.5 text-right">
                      {topic.notes ? (
                        <span
                          className="inline-flex items-center justify-center p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title={topic.notes}
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-slate-300 text-[11px]">•</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component: Clean Topic Row for Tree View with full responsive breakdown
const TopicRow: React.FC<{
  topic: Topic;
  onSelectTopic: (topic: Topic) => void;
  onUpdateStatus: (id: string, status: TopicStatus) => void;
  onToggleCheckbox: (id: string, currentStatus: TopicStatus) => void;
  onOpenResource: (url: string) => void;
}> = ({ topic, onSelectTopic, onUpdateStatus, onToggleCheckbox, onOpenResource }) => {
  const isCompleted = topic.status === 'Completed';

  return (
    <div
      onClick={() => onSelectTopic(topic)}
      className={`px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/70 cursor-pointer transition-colors text-xs ${
        isCompleted ? 'bg-slate-50/30' : ''
      }`}
    >
      {/* Left side: Checkbox + Topic Order & Name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleCheckbox(topic.id, topic.status);
          }}
          className="flex-shrink-0 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => {}}
            aria-label={`Mark ${topic.topic} as completed`}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
          />
        </div>

        <span className="font-mono text-slate-400 w-8 text-right flex-shrink-0">
          #{topic.order}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-medium ${
                isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'
              }`}
            >
              {topic.topic}
            </span>

            {topic.difficulty && (
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                  topic.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : topic.difficulty === 'Medium'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {topic.difficulty}
              </span>
            )}

            {topic.notes && (
              <span
                className="inline-flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded font-medium"
                title={topic.notes}
              >
                <FileText className="w-3 h-3" />
                Notes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Resource Link + Status Dropdown + Date */}
      <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 pl-7 sm:pl-0">
        {/* Resource link */}
        {topic.resourceUrl ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenResource(topic.resourceUrl!);
            }}
            className="inline-flex items-center gap-1 px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 rounded text-[11px] font-medium transition-colors shadow-2xs truncate max-w-[130px]"
            title={`Open ${topic.resourceUrl}`}
          >
            <span className="truncate">{topic.resourceName || 'Resource'}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0 text-blue-500" />
          </button>
        ) : (
          <span className="text-[11px] text-slate-400">No link</span>
        )}

        {/* Status Dropdown */}
        <div onClick={(e) => e.stopPropagation()}>
          <StatusDropdown
            status={topic.status}
            onChange={(newStatus) => onUpdateStatus(topic.id, newStatus)}
            size="sm"
          />
        </div>

        {/* Last Studied Date */}
        <span className="text-[11px] font-mono text-slate-400 min-w-16 text-right hidden md:inline">
          {formatDateDisplay(topic.lastStudied)}
        </span>
      </div>
    </div>
  );
};
