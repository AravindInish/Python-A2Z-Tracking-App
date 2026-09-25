import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Clock,
  Circle,
  Flame,
  Trophy,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Sparkles,
  Calendar,
  Layers,
  RotateCcw,
  Play,
  Pause,
  Plus,
  Target,
  Settings,
  Timer,
  Volume2,
  VolumeX,
  Coffee,
  Bell
} from 'lucide-react';
import { Topic, OverallStats, ModuleStats, StreakStats, TopicStatus, ActivityEntry } from '../types/tracker';
import { StatCard } from './StatCard';
import { ProgressBar } from './ProgressBar';
import { StatusDropdown } from './StatusDropdown';
import { sendPomodoroCompletedNotification } from '../utils/notifications';

interface DashboardViewProps {
  topics: Topic[];
  stats: OverallStats;
  moduleStats: ModuleStats[];
  streakStats: StreakStats;
  activityLog: ActivityEntry[];
  dailyGoalMinutes: number;
  todayStudyMinutes: number;
  onAddStudyMinutes: (minutes: number) => void;
  onSelectTopic: (topic: Topic) => void;
  onUpdateStatus: (id: string, status: TopicStatus) => void;
  onOpenResource: (url: string) => void;
  onNavigateToTracker: (moduleFilter?: string) => void;
  onNavigateToCalendar: () => void;
  onNavigateToSettings: () => void;
}

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak' | 'stopwatch';
const POMODORO_DURATION = 25 * 60; // 25 minutes = 1500 seconds
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes = 300 seconds
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes = 900 seconds

// Synthesize pleasant completion chime using Web Audio API
const playPomodoroChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    // Harmonic progression: C5 (523.25) -> E5 (659.25) -> G5 (783.99) -> C6 (1046.50)
    const tones = [523.25, 659.25, 783.99, 1046.5];
    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.13);
      gain.gain.setValueAtTime(0, now + idx * 0.13);
      gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.13 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.13 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.13);
      osc.stop(now + idx * 0.13 + 0.5);
    });
  } catch {
    // Ignore audio context restrictions if blocked
  }
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  topics,
  stats,
  moduleStats,
  streakStats,
  activityLog,
  dailyGoalMinutes,
  todayStudyMinutes,
  onAddStudyMinutes,
  onSelectTopic,
  onUpdateStatus,
  onOpenResource,
  onNavigateToTracker,
  onNavigateToCalendar,
  onNavigateToSettings
}) => {
  // Pomodoro & Focus Timer state
  const [timerMode, setTimerMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState<number>(POMODORO_DURATION);
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dsa_tracker_pomodoro_count_v1');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMinutesInput, setCustomMinutesInput] = useState('');
  const [sessionToast, setSessionToast] = useState<string | null>(null);

  const flashToast = (msg: string) => {
    setSessionToast(msg);
    setTimeout(() => setSessionToast(null), 4500);
  };

  // Timer countdown / count-up effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        if (timerMode === 'stopwatch') {
          setStopwatchSeconds(prev => prev + 1);
        } else {
          setTimeLeft(prev => {
            if (prev <= 1) {
              handleTimerCompleted();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerMode]);

  // Session completion handler
  const handleTimerCompleted = () => {
    setIsTimerRunning(false);

    if (timerMode === 'pomodoro') {
      // 1. Automatically log 25 minutes to daily study total!
      onAddStudyMinutes(25);

      // 2. Play audio celebration chime
      if (soundEnabled) {
        playPomodoroChime();
      }

      // 3. Fire celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#2563eb', '#10b981', '#f59e0b', '#ec4899']
        });
      } catch {
        // ignore
      }

      // 4. Increment completed pomodoro sessions count and save
      setCompletedPomodoros(prev => {
        const next = prev + 1;
        try {
          localStorage.setItem('dsa_tracker_pomodoro_count_v1', String(next));
        } catch {}
        return next;
      });

      flashToast('🎉 25-minute Pomodoro focus session completed! 25 minutes automatically logged to your daily study total.');

      // Switch to short break ready for rest
      setTimerMode('shortBreak');
      setTimeLeft(SHORT_BREAK_DURATION);
    } else if (timerMode === 'shortBreak' || timerMode === 'longBreak') {
      if (soundEnabled) {
        playPomodoroChime();
      }
      flashToast('☕ Break completed! Ready for your next 25-minute Pomodoro focus session.');
      setTimerMode('pomodoro');
      setTimeLeft(POMODORO_DURATION);
    }
  };

  const handleModeChange = (mode: TimerMode) => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    if (mode === 'pomodoro') setTimeLeft(POMODORO_DURATION);
    else if (mode === 'shortBreak') setTimeLeft(SHORT_BREAK_DURATION);
    else if (mode === 'longBreak') setTimeLeft(LONG_BREAK_DURATION);
    else if (mode === 'stopwatch') setStopwatchSeconds(0);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    if (timerMode === 'pomodoro') setTimeLeft(POMODORO_DURATION);
    else if (timerMode === 'shortBreak') setTimeLeft(SHORT_BREAK_DURATION);
    else if (timerMode === 'longBreak') setTimeLeft(LONG_BREAK_DURATION);
    else if (timerMode === 'stopwatch') setStopwatchSeconds(0);
  };

  // Early log for partial focus session
  const elapsedPomodoroSeconds = timerMode === 'pomodoro' ? POMODORO_DURATION - timeLeft : 0;
  const elapsedPomodoroMinutes = Math.floor(elapsedPomodoroSeconds / 60);

  const handleLogEarly = () => {
    if (elapsedPomodoroMinutes >= 1) {
      onAddStudyMinutes(elapsedPomodoroMinutes);
      flashToast(`+${elapsedPomodoroMinutes} min logged from partial Pomodoro session!`);
      handleResetTimer();
    }
  };

  const handleLogStopwatch = () => {
    const minutesToLog = Math.max(1, Math.round(stopwatchSeconds / 60));
    onAddStudyMinutes(minutesToLog);
    setIsTimerRunning(false);
    setStopwatchSeconds(0);
    flashToast(`+${minutesToLog} min logged from stopwatch!`);
  };

  const handleQuickAdd = (mins: number) => {
    onAddStudyMinutes(mins);
    flashToast(`+${mins} min added to today's study progress!`);
  };

  const handleCustomAdd = () => {
    const val = parseInt(customMinutesInput, 10);
    if (!isNaN(val) && val > 0) {
      onAddStudyMinutes(val);
      setCustomMinutesInput('');
      setShowCustomInput(false);
      flashToast(`+${val} min added!`);
    }
  };

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Current session progress percentage
  const currentTotalDuration = timerMode === 'pomodoro' 
    ? POMODORO_DURATION 
    : timerMode === 'shortBreak' 
    ? SHORT_BREAK_DURATION 
    : timerMode === 'longBreak' 
    ? LONG_BREAK_DURATION 
    : 1;

  const currentElapsedSec = timerMode === 'stopwatch' 
    ? stopwatchSeconds 
    : currentTotalDuration - timeLeft;

  const sessionProgress = timerMode === 'stopwatch' 
    ? 100 
    : Math.min(100, Math.round((currentElapsedSec / currentTotalDuration) * 100));

  const goalPercentage = dailyGoalMinutes > 0 ? Math.min(999, Math.round((todayStudyMinutes / dailyGoalMinutes) * 100)) : 0;
  const isGoalAchieved = todayStudyMinutes >= dailyGoalMinutes;
  const remainingMinutes = Math.max(0, dailyGoalMinutes - todayStudyMinutes);

  // Find "Next Up" topic: first In Progress topic, or first Not Started topic
  const inProgressTopic = topics.find(t => t.status === 'In Progress');
  const nextNotStartedTopic = topics.find(t => t.status === 'Not Started');
  const nextUpTopic = inProgressTopic || nextNotStartedTopic || topics[0];

  // Recently completed topics (up to 4)
  const recentlyCompleted = topics
    .filter(t => t.status === 'Completed' && t.lastStudied)
    .slice(-4)
    .reverse();

  // Last 7 days activity strip
  const today = new Date();
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const entry = activityLog.find(e => e.date === dateStr);
    return {
      date: dateStr,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      count: entry ? entry.count : 0,
      active: entry ? entry.count > 0 : false,
      isToday: i === 6
    };
  });

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {sessionToast && (
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs font-medium flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>{sessionToast}</span>
          </div>
        </div>
      )}

      {/* 0. CURRICULUM ORIENTATION BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded bg-indigo-500/25 text-indigo-300 border border-indigo-400/30">
              Python Tutorial & DSA Roadmap
            </span>
            <span className="text-xs text-slate-300">
              {stats.total} Topics • {moduleStats.length} Modules
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Learn Python & Algorithms
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Python is a popular programming language that can be used on a server to create web applications, data pipelines, and machine learning models. Python is easy to learn — you will enjoy it!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateToTracker()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. TOP METRICS ROW (Strictly dynamic from spreadsheet and daily study logs) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        <StatCard
          title="Total Topics"
          value={stats.total}
          subtitle="From spreadsheet"
          icon={<BookOpen className="w-4 h-4" />}
          onClick={() => onNavigateToTracker()}
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          subtitle={`${stats.percentage}% finished`}
          trend={stats.total > 0 ? `${stats.percentage}%` : '0%'}
          trendPositive={true}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          highlight={stats.completed > 0}
          onClick={() => onNavigateToTracker()}
        />

        <StatCard
          title="In Progress"
          value={stats.inProgress}
          subtitle="Currently studying"
          icon={<Clock className="w-4 h-4 text-amber-500" />}
          onClick={() => onNavigateToTracker()}
        />

        <StatCard
          title="Not Started"
          value={stats.notStarted}
          subtitle="Remaining queue"
          icon={<Circle className="w-4 h-4 text-slate-400" />}
          onClick={() => onNavigateToTracker()}
        />

        <StatCard
          title="Progress"
          value={`${stats.percentage}%`}
          subtitle={`${stats.completed}/${stats.total} topics`}
          highlight={true}
        />

        {/* Daily Study Time Goal StatCard */}
        <StatCard
          title="Daily Goal"
          value={`${todayStudyMinutes}m`}
          subtitle={`${goalPercentage}% of ${dailyGoalMinutes}m target`}
          trend={isGoalAchieved ? '100% Met' : `${remainingMinutes}m left`}
          trendPositive={isGoalAchieved}
          icon={<Timer className={`w-4 h-4 ${isGoalAchieved ? 'text-emerald-500' : 'text-blue-500'}`} />}
          highlight={isGoalAchieved}
          onClick={onNavigateToSettings}
        />

        <StatCard
          title="Current Streak"
          value={`${streakStats.currentStreak}d`}
          subtitle={streakStats.currentStreak > 0 ? 'Study streak active' : 'Study today to start'}
          icon={<Flame className="w-4 h-4 text-orange-500 fill-orange-500" />}
          onClick={onNavigateToCalendar}
        />

        <StatCard
          title="Longest Streak"
          value={`${streakStats.longestStreak}d`}
          subtitle="All-time personal record"
          icon={<Trophy className="w-4 h-4 text-amber-500" />}
          onClick={onNavigateToCalendar}
        />
      </div>

      {/* 2. OVERALL CURRICULUM PROGRESS BAR */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Curriculum Completion</h3>
            <p className="text-xs text-slate-500">
              {stats.completed} of {stats.total} topics mastered across {moduleStats.length} modules
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              {stats.completed} Completed
            </span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              {stats.inProgress} In Progress
            </span>
            {stats.review > 0 && (
              <span className="flex items-center gap-1.5 text-indigo-700">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                {stats.review} Review
              </span>
            )}
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              {stats.notStarted} Not Started
            </span>
          </div>
        </div>

        {/* Stacked Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex border border-slate-200/70">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
            title={`Completed: ${stats.completed}`}
          />
          <div
            className="bg-amber-400 h-full transition-all duration-500"
            style={{ width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%` }}
            title={`In Progress: ${stats.inProgress}`}
          />
          {stats.review > 0 && (
            <div
              className="bg-indigo-500 h-full transition-all duration-500"
              style={{ width: `${stats.total > 0 ? (stats.review / stats.total) * 100 : 0}%` }}
              title={`Review: ${stats.review}`}
            />
          )}
        </div>
      </div>

      {/* 2.5 DAILY STUDY TIME GOAL VISUALIZATION & FOCUS TRACKER */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs space-y-5">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isGoalAchieved ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Daily Study Time Goal
                </h3>
                {isGoalAchieved ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Goal Achieved!
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    {remainingMinutes} min to reach target
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Target: {dailyGoalMinutes} minutes today • Real-time study session tracking
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigateToSettings}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200/80 transition-colors self-start sm:self-auto"
            title="Adjust daily study target in Settings"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Change Target in Settings</span>
          </button>
        </div>

        {/* Progress Display */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-slate-900">
                {todayStudyMinutes}
              </span>
              <span className="text-sm font-medium text-slate-500 font-mono">
                / {dailyGoalMinutes} min
              </span>
            </div>
            <span className="text-sm font-bold font-mono text-blue-600">
              {goalPercentage}%
            </span>
          </div>

          {/* Large Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200/60 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isGoalAchieved
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xs'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, (todayStudyMinutes / dailyGoalMinutes) * 100))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
            <span>
              {isGoalAchieved
                ? '🎉 Incredible dedication! You reached your daily study goal.'
                : todayStudyMinutes > 0
                ? `🔥 Keep going! Only ${remainingMinutes} more minutes to complete your daily goal.`
                : `💡 Ready to learn? Track your time with the stopwatch or quick-log below.`}
            </span>
            <span className="font-mono text-slate-400 text-[11px]">
              {todayStudyMinutes}m logged today
            </span>
          </div>
        </div>

        {/* Pomodoro Focus Station & Quick-Log Session Toolbar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-3 border-t border-slate-100">
          {/* Main Pomodoro Timer Card (8 cols on lg) */}
          <div className="lg:col-span-8 p-4 sm:p-5 bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
            {/* Top row: Mode Tabs + Sound Toggle + Completed Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
              {/* Mode Selectors */}
              <div className="inline-flex p-1 bg-slate-100/90 rounded-xl gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => handleModeChange('pomodoro')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                    timerMode === 'pomodoro'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span>🍅</span>
                  <span>25m Focus</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange('shortBreak')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                    timerMode === 'shortBreak'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>5m Break</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange('longBreak')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                    timerMode === 'longBreak'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span>🌿</span>
                  <span>15m Break</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange('stopwatch')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                    timerMode === 'stopwatch'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Timer className="w-3.5 h-3.5" />
                  <span>Stopwatch</span>
                </button>
              </div>

              {/* Sound toggle & Completed badge */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                    soundEnabled
                      ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                  title={soundEnabled ? 'Chime sound enabled' : 'Chime sound muted'}
                  aria-label="Toggle timer chime"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                  <span className="text-[11px] font-medium hidden sm:inline">
                    {soundEnabled ? 'Chime On' : 'Muted'}
                  </span>
                </button>

                {completedPomodoros > 0 && (
                  <span className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg text-xs font-mono font-semibold flex items-center gap-1">
                    <span>🍅</span>
                    <span>{completedPomodoros} done ({completedPomodoros * 25}m)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Timer Big Display & Controls Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-2">
              {/* Digital countdown & status */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight select-none">
                    {timerMode === 'stopwatch' ? formatTimer(stopwatchSeconds) : formatTimer(timeLeft)}
                  </span>
                  
                  {isTimerRunning && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">
                    {timerMode === 'pomodoro'
                      ? '25-Minute Focus Session'
                      : timerMode === 'shortBreak'
                      ? '5-Minute Short Break'
                      : timerMode === 'longBreak'
                      ? '15-Minute Long Break'
                      : 'Stopwatch Count-Up'}
                  </span>
                  <span>•</span>
                  <span>
                    {isTimerRunning
                      ? timerMode === 'pomodoro'
                        ? 'Deep focus mode active'
                        : 'Resting...'
                      : 'Ready to start'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {!isTimerRunning ? (
                  <button
                    type="button"
                    onClick={() => setIsTimerRunning(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>
                      {timerMode === 'pomodoro'
                        ? timeLeft < POMODORO_DURATION
                          ? 'Resume 25m Focus'
                          : 'Start 25m Focus'
                        : 'Start'}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsTimerRunning(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                  >
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Pause</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetTimer}
                  className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                  title="Reset timer"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Early log for partial focus session */}
                {timerMode === 'pomodoro' && elapsedPomodoroMinutes >= 1 && (
                  <button
                    type="button"
                    onClick={handleLogEarly}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold transition-colors"
                    title="Log elapsed focus minutes without waiting for timer to finish"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Log {elapsedPomodoroMinutes}m Early</span>
                  </button>
                )}

                {timerMode === 'stopwatch' && stopwatchSeconds >= 60 && (
                  <button
                    type="button"
                    onClick={handleLogStopwatch}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Log {Math.max(1, Math.round(stopwatchSeconds / 60))}m</span>
                  </button>
                )}
              </div>
            </div>

            {/* Session Progress Bar (when in countdown mode) */}
            {timerMode !== 'stopwatch' && (
              <div className="space-y-1 pt-1">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      timerMode === 'pomodoro'
                        ? 'bg-rose-500'
                        : timerMode === 'shortBreak'
                        ? 'bg-teal-500'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${sessionProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>
                    {timerMode === 'pomodoro'
                      ? 'Completing this 25m session automatically adds 25 mins to today’s study total'
                      : 'Take a breath and stretch!'}
                  </span>
                  <span>{sessionProgress}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick-Log Offline Study Time (4 cols on lg) */}
          <div className="lg:col-span-4 p-4 sm:p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5 mb-1">
                <Plus className="w-3.5 h-3.5 text-blue-600" />
                Quick Log Offline Study
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Add study time spent watching video tutorials, reading docs, or solving LeetCode problems offline.
              </p>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1.5">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => handleQuickAdd(mins)}
                    className="px-3 py-2 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-1"
                  >
                    <span>+{mins} min</span>
                  </button>
                ))}
              </div>

              {!showCustomInput ? (
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="w-full py-1.5 text-center text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50/80 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Custom Minutes</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 pt-1">
                  <input
                    type="number"
                    min={1}
                    max={720}
                    placeholder="e.g. 40"
                    value={customMinutesInput}
                    onChange={(e) => setCustomMinutesInput(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-blue-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleCustomAdd}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
                  >
                    Log
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="p-1.5 text-slate-400 text-xs hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. TWO COLUMN SECTION: NEXT UP TO STUDY & WEEKLY ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Up To Study (Primary focus area) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Recommended Next Topic
                </span>
              </div>
              <button
                onClick={() => onNavigateToTracker()}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View All Tracker Topics</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {nextUpTopic ? (
              <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono text-slate-400">#{nextUpTopic.order}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{nextUpTopic.module}</span>
                      <span>›</span>
                      <span className="text-slate-500">{nextUpTopic.submodule}</span>
                    </div>
                    <h4
                      onClick={() => onSelectTopic(nextUpTopic)}
                      className="text-base font-semibold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {nextUpTopic.topic}
                    </h4>
                  </div>

                  <StatusDropdown
                    status={nextUpTopic.status}
                    onChange={(st) => onUpdateStatus(nextUpTopic.id, st)}
                    size="sm"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    {nextUpTopic.resourceUrl ? (
                      <button
                        onClick={() => onOpenResource(nextUpTopic.resourceUrl!)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 rounded-lg text-xs font-medium transition-colors shadow-2xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                        <span>Open {nextUpTopic.resourceName || 'Resource Link'}</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">No external link</span>
                    )}

                    <button
                      onClick={() => onSelectTopic(nextUpTopic)}
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1"
                    >
                      Notes & Details
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {nextUpTopic.status !== 'Completed' ? (
                      <button
                        onClick={() => onUpdateStatus(nextUpTopic.id, 'Completed')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium shadow-2xs transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Done</span>
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                All topics completed! Amazing work!
              </div>
            )}
          </div>

          {/* Quick study tip */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Tip: Study 1-2 topics daily to maintain your streak</span>
            <span className="font-mono text-slate-600">{streakStats.totalActiveDays} total active days</span>
          </div>
        </div>

        {/* 7-Day Streak & Activity Strip */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                7-Day Activity
              </h3>
              <button
                onClick={onNavigateToCalendar}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Heatmap
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1.5 py-2 text-center">
              {past7Days.map((d) => (
                <div
                  key={d.date}
                  className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                    d.isToday ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-100'
                  } ${d.active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50/50'}`}
                >
                  <span className="text-[10px] font-medium text-slate-400 uppercase">
                    {d.dayName}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-800 my-1">
                    {d.dayNumber}
                  </span>
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      d.active ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                    title={`${d.date}: ${d.count} topics completed`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Current Streak:</span>
            <span className="font-mono font-bold text-amber-600 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              {streakStats.currentStreak} {streakStats.currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. MODULE-WISE PROGRESS BREAKDOWN */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Module Progress</h3>
            <p className="text-xs text-slate-500">
              Overview of all {moduleStats.length} modules extracted from your spreadsheet
            </p>
          </div>
          <button
            onClick={() => onNavigateToTracker()}
            className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Open Study Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleStats.map((mod) => (
            <div
              key={mod.module}
              onClick={() => onNavigateToTracker(mod.module)}
              className="p-3.5 bg-slate-50/60 hover:bg-slate-50 border border-slate-200/80 rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {mod.module}
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 ml-2">
                  {mod.percentage}%
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-2">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${mod.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{mod.completed} / {mod.total} completed</span>
                <span>{mod.submodules.length} submodules</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
