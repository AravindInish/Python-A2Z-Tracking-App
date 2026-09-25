import { Topic, ActivityEntry, OverallStats, ModuleStats } from '../types/tracker';
import { INITIAL_TOPICS } from '../data/defaultCurriculum';

const STORAGE_KEY_TOPICS = 'dsa_tracker_topics_v5';
const STORAGE_KEY_ACTIVITY = 'dsa_tracker_activity_v5';
const STORAGE_KEY_SETTINGS = 'dsa_tracker_settings_v5';

export interface AppBackup {
  version: string;
  exportedAt: string;
  topics: Topic[];
  activityLog: ActivityEntry[];
  settings?: Record<string, unknown>;
}

export function loadTopics(): Topic[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TOPICS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= INITIAL_TOPICS.length) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load topics from localStorage:', err);
  }

  // Fallback / initial fresh load (all 216 topics starting cleanly as 'Not Started')
  saveTopics(INITIAL_TOPICS);
  return INITIAL_TOPICS;
}

export function saveTopics(topics: Topic[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_TOPICS, JSON.stringify(topics));
  } catch (err) {
    console.error('Failed to save topics to localStorage:', err);
  }
}

export function loadActivityLog(): ActivityEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACTIVITY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load activity log from localStorage:', err);
  }

  // Fresh initial activity log: starts with 0 active days so streak counts freshly
  return [];
}

export function saveActivityLog(logs: ActivityEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVITY, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed to save activity log to localStorage:', err);
  }
}

export function resetToDefaults(): { topics: Topic[]; activityLog: ActivityEntry[] } {
  localStorage.removeItem(STORAGE_KEY_TOPICS);
  localStorage.removeItem(STORAGE_KEY_ACTIVITY);
  return {
    topics: INITIAL_TOPICS,
    activityLog: []
  };
}

export function exportBackupJSON(topics: Topic[], activityLog: ActivityEntry[]): void {
  const backup: AppBackup = {
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    topics,
    activityLog
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dsa_tracker_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importBackupJSON(file: File): Promise<{ topics: Topic[]; activityLog: ActivityEntry[] }> {
  const text = await file.text();
  const parsed = JSON.parse(text) as AppBackup;

  if (!parsed.topics || !Array.isArray(parsed.topics)) {
    throw new Error('Invalid backup file: missing topics array.');
  }

  saveTopics(parsed.topics);
  if (parsed.activityLog && Array.isArray(parsed.activityLog)) {
    saveActivityLog(parsed.activityLog);
  }

  return {
    topics: parsed.topics,
    activityLog: parsed.activityLog || []
  };
}

// Compute statistics dynamically
export function calculateOverallStats(topics: Topic[]): OverallStats {
  const total = topics.length;
  if (total === 0) {
    return { total: 0, completed: 0, inProgress: 0, notStarted: 0, review: 0, percentage: 0 };
  }

  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  let review = 0;

  topics.forEach(t => {
    switch (t.status) {
      case 'Completed':
        completed++;
        break;
      case 'In Progress':
        inProgress++;
        break;
      case 'Review':
        review++;
        break;
      case 'Not Started':
      default:
        notStarted++;
        break;
    }
  });

  const percentage = Number(((completed / total) * 100).toFixed(1));

  return {
    total,
    completed,
    inProgress,
    notStarted,
    review,
    percentage
  };
}

export function calculateModuleStats(topics: Topic[]): ModuleStats[] {
  const moduleMap = new Map<string, {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
    review: number;
    submoduleMap: Map<string, { total: number; completed: number }>;
  }>();

  // Maintain initial module appearance order
  const moduleOrder: string[] = [];

  topics.forEach(t => {
    const mod = t.module || 'General';
    const sub = t.submodule || 'General';

    if (!moduleMap.has(mod)) {
      moduleOrder.push(mod);
      moduleMap.set(mod, {
        total: 0,
        completed: 0,
        inProgress: 0,
        notStarted: 0,
        review: 0,
        submoduleMap: new Map()
      });
    }

    const mData = moduleMap.get(mod)!;
    mData.total++;

    if (t.status === 'Completed') mData.completed++;
    else if (t.status === 'In Progress') mData.inProgress++;
    else if (t.status === 'Review') mData.review++;
    else mData.notStarted++;

    if (!mData.submoduleMap.has(sub)) {
      mData.submoduleMap.set(sub, { total: 0, completed: 0 });
    }
    const sData = mData.submoduleMap.get(sub)!;
    sData.total++;
    if (t.status === 'Completed') sData.completed++;
  });

  return moduleOrder.map(modName => {
    const data = moduleMap.get(modName)!;
    const percentage = data.total > 0 ? Number(((data.completed / data.total) * 100).toFixed(1)) : 0;
    const submodules = Array.from(data.submoduleMap.entries()).map(([name, s]) => ({
      name,
      total: s.total,
      completed: s.completed
    }));

    return {
      module: modName,
      total: data.total,
      completed: data.completed,
      inProgress: data.inProgress,
      notStarted: data.notStarted,
      review: data.review,
      percentage,
      submodules
    };
  });
}
