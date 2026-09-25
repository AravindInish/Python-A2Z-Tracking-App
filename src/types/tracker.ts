export type TopicStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Review';

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Basic';

export interface Topic {
  id: string;
  order: number;
  module: string;
  submodule: string;
  topic: string;
  resourceName?: string;
  resourceUrl?: string;
  status: TopicStatus;
  lastStudied?: string; // ISO date string or formatted date
  notes?: string;
  difficulty?: Difficulty;
  estimatedTime?: string;
  tags?: string[];
  customFields?: Record<string, string | number | boolean>;
}

export interface ActivityEntry {
  date: string; // YYYY-MM-DD
  count: number;
  topicIds: string[];
}

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  lastActiveDate: string | null;
}

export interface ModuleStats {
  module: string;
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  review: number;
  percentage: number;
  submodules: {
    name: string;
    total: number;
    completed: number;
  }[];
}

export interface OverallStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  review: number;
  percentage: number;
}

export interface TrackerFilter {
  search: string;
  status: 'All' | TopicStatus;
  module: string;
  submodule?: string;
  difficulty?: 'All' | Difficulty;
  sortBy: 'order' | 'topic' | 'status' | 'lastStudied';
  sortOrder: 'asc' | 'desc';
  viewMode: 'hierarchical' | 'flat';
}

export interface ExcelColumnMapping {
  moduleCol?: string;
  submoduleCol?: string;
  topicCol?: string;
  resourceCol?: string;
  urlCol?: string;
  statusCol?: string;
  notesCol?: string;
  dateCol?: string;
  difficultyCol?: string;
}
