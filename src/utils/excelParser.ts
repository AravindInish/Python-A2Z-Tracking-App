import * as XLSX from 'xlsx';
import { Topic, TopicStatus, Difficulty, ExcelColumnMapping } from '../types/tracker';

export interface ParseResult {
  topics: Topic[];
  modulesFound: string[];
  totalTopics: number;
  detectedHeaders: string[];
  mapping: ExcelColumnMapping;
  sheetNames: string[];
  selectedSheet: string;
}

// Clean and normalize status string
export function normalizeStatus(rawStatus?: unknown): TopicStatus {
  if (!rawStatus) return 'Not Started';
  const val = String(rawStatus).trim().toLowerCase();
  if (val.includes('comp') || val === 'done' || val === 'yes' || val === '1' || val === 'true' || val === 'finished') {
    return 'Completed';
  }
  if (val.includes('prog') || val.includes('doing') || val.includes('started') || val.includes('ongoing')) {
    return 'In Progress';
  }
  if (val.includes('rev') || val.includes('repeat')) {
    return 'Review';
  }
  return 'Not Started';
}

// Clean and normalize difficulty string
export function normalizeDifficulty(rawDiff?: unknown): Difficulty | undefined {
  if (!rawDiff) return undefined;
  const val = String(rawDiff).trim().toLowerCase();
  if (val.includes('easy')) return 'Easy';
  if (val.includes('med')) return 'Medium';
  if (val.includes('hard')) return 'Hard';
  if (val.includes('basic') || val.includes('fund') || val.includes('intro')) return 'Basic';
  return undefined;
}

export function autoDetectColumnMapping(headers: string[]): ExcelColumnMapping {
  const mapping: ExcelColumnMapping = {};
  const lowerHeaders = headers.map(h => ({ original: h, lower: h.trim().toLowerCase() }));

  const findMatch = (candidates: string[]): string | undefined => {
    for (const cand of candidates) {
      const match = lowerHeaders.find(h => h.lower === cand || h.lower.includes(cand));
      if (match) return match.original;
    }
    return undefined;
  };

  mapping.topicCol = findMatch([
    'topic',
    'topic name',
    'problem',
    'title',
    'question',
    'problem name',
    'concept',
    'item',
    'task'
  ]) || headers[0];

  mapping.moduleCol = findMatch([
    'module',
    'module name',
    'chapter',
    'section',
    'category',
    'domain',
    'step'
  ]);

  mapping.submoduleCol = findMatch([
    'submodule',
    'sub-module',
    'sub module',
    'sub category',
    'sub-category',
    'sub topic',
    'subtopic',
    'topic group',
    'part'
  ]);

  mapping.urlCol = findMatch([
    'link',
    'url',
    'resource link',
    'resource url',
    'problem link',
    'article',
    'video',
    'website',
    'source'
  ]);

  mapping.resourceCol = findMatch([
    'resource',
    'resource name',
    'platform',
    'source name',
    'site',
    'provider'
  ]);

  mapping.statusCol = findMatch([
    'status',
    'state',
    'progress',
    'done',
    'completed'
  ]);

  mapping.notesCol = findMatch([
    'notes',
    'note',
    'comments',
    'comment',
    'remarks',
    'description'
  ]);

  mapping.dateCol = findMatch([
    'date',
    'last studied',
    'studied date',
    'completion date',
    'completed at',
    'timestamp'
  ]);

  mapping.difficultyCol = findMatch([
    'difficulty',
    'level',
    'diff',
    'tier'
  ]);

  return mapping;
}

export async function parseExcelFile(
  file: File,
  targetSheetName?: string,
  customMapping?: ExcelColumnMapping
): Promise<ParseResult> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

  const sheetNames = workbook.SheetNames;
  if (sheetNames.length === 0) {
    throw new Error('The uploaded Excel file contains no worksheets.');
  }

  const selectedSheet = targetSheetName && sheetNames.includes(targetSheetName)
    ? targetSheetName
    : sheetNames[0];

  const worksheet = workbook.Sheets[selectedSheet];
  const rawRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet, {
    defval: '',
    raw: false,
    blankrows: false
  });

  if (rawRows.length === 0) {
    throw new Error('The worksheet contains no data rows.');
  }

  const detectedHeaders = Object.keys(rawRows[0]);
  const mapping = customMapping || autoDetectColumnMapping(detectedHeaders);

  const topics: Topic[] = [];
  const moduleSet = new Set<string>();

  rawRows.forEach((row, index) => {
    // Topic title
    const topicRaw = mapping.topicCol ? String(row[mapping.topicCol] || '').trim() : '';
    if (!topicRaw && Object.values(row).every(v => !v)) {
      // Empty row
      return;
    }

    const topicName = topicRaw || `Topic #${index + 1}`;

    // Module & Submodule
    let moduleName = mapping.moduleCol ? String(row[mapping.moduleCol] || '').trim() : '';
    if (!moduleName) {
      moduleName = 'General';
    }
    moduleSet.add(moduleName);

    let submoduleName = mapping.submoduleCol ? String(row[mapping.submoduleCol] || '').trim() : '';
    if (!submoduleName) {
      submoduleName = 'Core Topics';
    }

    // Resource & URL
    let resourceUrl = mapping.urlCol ? String(row[mapping.urlCol] || '').trim() : undefined;
    let resourceName = mapping.resourceCol ? String(row[mapping.resourceCol] || '').trim() : undefined;

    // If resourceUrl looks like a name and resourceName looks like a url, swap
    if (resourceUrl && !resourceUrl.startsWith('http') && resourceName && resourceName.startsWith('http')) {
      const temp = resourceUrl;
      resourceUrl = resourceName;
      resourceName = temp;
    }

    // Auto deduce resource name from URL if missing
    if (resourceUrl && !resourceName) {
      try {
        const parsedUrl = new URL(resourceUrl);
        const host = parsedUrl.hostname.toLowerCase();
        if (host.includes('leetcode')) resourceName = 'LeetCode';
        else if (host.includes('w3schools')) resourceName = 'W3Schools';
        else if (host.includes('geeksforgeeks')) resourceName = 'GeeksforGeeks';
        else if (host.includes('takeuforward')) resourceName = 'Striver A2Z';
        else if (host.includes('youtube') || host.includes('youtu.be')) resourceName = 'YouTube';
        else if (host.includes('python.org')) resourceName = 'Python Docs';
        else if (host.includes('hackerrank')) resourceName = 'HackerRank';
        else resourceName = host.replace(/^www\./, '');
      } catch {
        resourceName = 'Resource';
      }
    }

    // Status
    const statusVal = mapping.statusCol ? row[mapping.statusCol] : undefined;
    const status = normalizeStatus(statusVal);

    // Notes
    const notesVal = mapping.notesCol ? String(row[mapping.notesCol] || '').trim() : undefined;

    // Date
    let dateVal: string | undefined = mapping.dateCol ? String(row[mapping.dateCol] || '').trim() : undefined;
    if (dateVal && dateVal.length > 10 && dateVal.includes('T')) {
      dateVal = dateVal.split('T')[0];
    }

    // Difficulty
    const diffVal = mapping.difficultyCol ? normalizeDifficulty(row[mapping.difficultyCol]) : undefined;

    // Collect custom columns that weren't mapped
    const mappedValues = new Set(Object.values(mapping));
    const customFields: Record<string, string | number | boolean> = {};
    for (const [col, val] of Object.entries(row)) {
      if (!mappedValues.has(col) && val !== undefined && val !== '') {
        customFields[col] = String(val);
      }
    }

    topics.push({
      id: `topic-${index + 1}-${Date.now().toString(36)}`,
      order: index + 1,
      module: moduleName,
      submodule: submoduleName,
      topic: topicName,
      resourceName: resourceName || 'Reference',
      resourceUrl: resourceUrl || undefined,
      status,
      lastStudied: dateVal,
      notes: notesVal || undefined,
      difficulty: diffVal,
      customFields: Object.keys(customFields).length > 0 ? customFields : undefined
    });
  });

  return {
    topics,
    modulesFound: Array.from(moduleSet),
    totalTopics: topics.length,
    detectedHeaders,
    mapping,
    sheetNames,
    selectedSheet
  };
}

export function exportTopicsToExcel(topics: Topic[], filename = 'dsa_python_study_tracker.xlsx') {
  const exportRows = topics.map(t => ({
    '#': t.order,
    'Module': t.module,
    'Sub-module': t.submodule,
    'Topic': t.topic,
    'Resource Name': t.resourceName || '',
    'Resource URL': t.resourceUrl || '',
    'Status': t.status,
    'Difficulty': t.difficulty || '',
    'Last Studied': t.lastStudied || '',
    'Notes': t.notes || '',
    ...(t.customFields || {})
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'DSA & Python Tracker');
  XLSX.writeFile(workbook, filename);
}
