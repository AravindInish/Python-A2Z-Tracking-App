import { ActivityEntry, StreakStats } from '../types/tracker';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateDisplay(dateStr?: string): string {
  if (!dateStr) return '-';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  } catch {
    // fallback
  }
  return dateStr;
}

export function calculateStreaks(activityLog: ActivityEntry[]): StreakStats {
  if (!activityLog || activityLog.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
      lastActiveDate: null
    };
  }

  // Filter out dates with count > 0 and get unique sorted dates (ascending)
  const activeDateSet = new Set<string>();
  activityLog.forEach(entry => {
    if (entry.count > 0 && entry.date) {
      activeDateSet.add(entry.date);
    }
  });

  const sortedDates = Array.from(activeDateSet).sort();
  const totalActiveDays = sortedDates.length;

  if (totalActiveDays === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
      lastActiveDate: null
    };
  }

  const lastActiveDate = sortedDates[sortedDates.length - 1];

  // Helper to parse date string into epoch day
  const toEpochDay = (dateStr: string): number => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  };

  const epochDays = sortedDates.map(toEpochDay);

  // Calculate longest streak
  let longestStreak = 1;
  let tempStreak = 1;

  for (let i = 1; i < epochDays.length; i++) {
    if (epochDays[i] === epochDays[i - 1] + 1) {
      tempStreak++;
    } else if (epochDays[i] > epochDays[i - 1] + 1) {
      tempStreak = 1;
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
  }

  // Calculate current streak
  const todayStr = getTodayDateString();
  const todayEpoch = toEpochDay(todayStr);
  const lastActiveEpoch = epochDays[epochDays.length - 1];

  let currentStreak = 0;

  // Streak is alive if last active date is today or yesterday
  if (lastActiveEpoch === todayEpoch || lastActiveEpoch === todayEpoch - 1) {
    currentStreak = 1;
    let expectedPrev = lastActiveEpoch - 1;

    for (let i = epochDays.length - 2; i >= 0; i--) {
      if (epochDays[i] === expectedPrev) {
        currentStreak++;
        expectedPrev--;
      } else if (epochDays[i] < expectedPrev) {
        break;
      }
    }
  }

  return {
    currentStreak,
    longestStreak,
    totalActiveDays,
    lastActiveDate
  };
}

export function logActivity(
  prevLogs: ActivityEntry[],
  topicId: string,
  targetDate: string = getTodayDateString()
): ActivityEntry[] {
  const existingIndex = prevLogs.findIndex(e => e.date === targetDate);
  const newLogs = [...prevLogs];

  if (existingIndex >= 0) {
    const entry = newLogs[existingIndex];
    if (!entry.topicIds.includes(topicId)) {
      newLogs[existingIndex] = {
        ...entry,
        count: entry.count + 1,
        topicIds: [...entry.topicIds, topicId]
      };
    }
  } else {
    newLogs.push({
      date: targetDate,
      count: 1,
      topicIds: [topicId]
    });
  }

  return newLogs;
}
