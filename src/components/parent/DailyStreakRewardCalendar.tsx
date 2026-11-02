import React, { useState } from 'react';
import { 
  Flame, 
  Trophy, 
  Star, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Lock,
  Plus
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audio } from '../../utils/audio';

const MILESTONES = [
  { days: 3, title: 'Little Explorer', icon: '🥉', perk: 'Bronze Star Badge', desc: '3 consecutive days of playful discovery' },
  { days: 7, title: 'Bright Mind', icon: '☀️', perk: 'Golden Sun Mascot Theme', desc: '1 full week of daily curiosity' },
  { days: 14, title: 'Knowledge Champion', icon: '👑', perk: 'Crown Avatar Accessory', desc: '2 continuous weeks of micro-learning' },
  { days: 30, title: 'Grand Genius Legend', icon: '🏆', perk: 'Trophy Hall of Fame', desc: '1 month of consistent early education' },
];

export const DailyStreakRewardCalendar: React.FC = () => {
  const { currentProfile, setProfiles, t } = useGame();

  // Calendar month state (default to current month: November 2026)
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 10, 1)); // Nov 2026

  const activeDates = currentProfile.activeDates || [];
  const currentStreak = currentProfile.currentStreak || 1;
  const bestStreak = currentProfile.bestStreak || Math.max(currentStreak, 1);

  // Month information
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  // Convert so Monday is 0
  const mondayFirstIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  // Helper to format date YYYY-MM-DD
  const formatYMD = (d: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const todayStr = '2026-11-02';

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    audio.playPop(0.9);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    audio.playPop(1.1);
  };

  const handleToggleDayPractice = (d: number) => {
    const dateStr = formatYMD(d);
    audio.playPop(1.2);

    setProfiles(prev =>
      prev.map(p => {
        if (p.id !== currentProfile.id) return p;
        const exists = p.activeDates?.includes(dateStr);
        let updatedDates: string[];

        if (exists) {
          updatedDates = p.activeDates.filter(x => x !== dateStr);
        } else {
          updatedDates = [...(p.activeDates || []), dateStr].sort();
        }

        // Recalculate streak
        const newStreak = updatedDates.includes(todayStr)
          ? Math.max(1, p.currentStreak || 1)
          : Math.max(0, (p.currentStreak || 1) - 1);

        return {
          ...p,
          activeDates: updatedDates,
          currentStreak: newStreak,
          bestStreak: Math.max(p.bestStreak || 0, newStreak)
        };
      })
    );
  };

  // Find next milestone
  const nextMilestone = MILESTONES.find(m => m.days > currentStreak) || MILESTONES[MILESTONES.length - 1];
  const daysUntilNext = Math.max(0, nextMilestone.days - currentStreak);

  return (
    <div className="space-y-6">
      {/* 1. Header Streak Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-7 text-white shadow-lg border-2 border-amber-300">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-md border border-white/30 shrink-0 animate-bounce-gentle">
              🔥
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/25 text-[11px] font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Learning Habit Tracker</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
                {currentStreak}-Day Active Streak!
              </h3>
              <p className="text-xs sm:text-sm text-amber-100 font-medium">
                {daysUntilNext > 0
                  ? `Only ${daysUntilNext} more daily session${daysUntilNext > 1 ? 's' : ''} to unlock the ${nextMilestone.title} reward!`
                  : `All major learning streak milestones mastered! Congratulations!`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/20 backdrop-blur-xs rounded-2xl px-4 py-2 border border-white/25 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-100 block">Personal Best</span>
              <span className="text-xl font-black text-white">{bestStreak} Days 🏆</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Seven-Day Quick Weekly Streak Ribbon */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-bold text-slate-800">This Week&apos;s Learning Momentum</h4>
          </div>
          <span className="text-xs text-slate-500 font-medium">Goal: 10–15 mins/day</span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {[
            { day: 'Mon', date: '2026-11-02', isToday: true },
            { day: 'Tue', date: '2026-11-03', isToday: false },
            { day: 'Wed', date: '2026-11-04', isToday: false },
            { day: 'Thu', date: '2026-11-05', isToday: false },
            { day: 'Fri', date: '2026-11-06', isToday: false },
            { day: 'Sat', date: '2026-11-07', isToday: false },
            { day: 'Sun', date: '2026-11-08', isToday: false },
          ].map((item, idx) => {
            const isCompleted = activeDates.includes(item.date);
            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                  isCompleted
                    ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-xs'
                    : item.isToday
                    ? 'bg-sky-50 border-sky-400 text-sky-950 font-bold ring-2 ring-sky-200'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <span className="text-[11px] font-bold uppercase">{item.day}</span>
                <div className="my-1.5 text-xl">
                  {isCompleted ? (
                    <span className="text-amber-500">⭐</span>
                  ) : item.isToday ? (
                    <span className="text-sky-500 animate-pulse">🎯</span>
                  ) : (
                    <span className="text-slate-300">○</span>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-slate-500">
                  {isCompleted ? 'Done' : item.isToday ? 'Today' : 'Upcoming'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Monthly Visual Reward Calendar Grid */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-800">
              {monthNames[month]} {year} Learning Calendar
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-700 min-w-[90px] text-center">
              {monthNames[month].slice(0, 3)} {year}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Day Labels */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-slate-400 mb-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        {/* Calendar Date Cells */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Empty cells before month start */}
          {Array.from({ length: mondayFirstIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10 sm:h-12 rounded-xl bg-slate-50/50" />
          ))}

          {/* Month days */}
          {Array.from({ length: totalDaysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const ymd = formatYMD(dayNum);
            const isCompleted = activeDates.includes(ymd);
            const isToday = ymd === todayStr;

            return (
              <button
                key={dayNum}
                onClick={() => handleToggleDayPractice(dayNum)}
                className={`relative h-10 sm:h-12 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${
                  isCompleted
                    ? 'bg-amber-100/80 border-amber-400 text-amber-950 font-black shadow-xs'
                    : isToday
                    ? 'bg-sky-50 border-sky-400 text-sky-950 font-bold ring-2 ring-sky-300'
                    : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
                }`}
                title={`Click to mark practice for ${ymd}`}
              >
                <span className="text-xs sm:text-sm">{dayNum}</span>
                {isCompleted && (
                  <span className="absolute bottom-0.5 text-[10px] text-amber-600 leading-none">
                    ⭐
                  </span>
                )}
                {isToday && !isCompleted && (
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-amber-200 border border-amber-400 inline-block" />
              <span>Practiced (⭐)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-sky-200 border border-sky-400 inline-block" />
              <span>Today</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Tap any date to toggle offline practice</span>
        </div>
      </div>

      {/* 4. Reward Milestones Progress Badges */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-amber-500" />
          <h4 className="text-sm font-bold text-slate-800">Streak Reward Milestones</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MILESTONES.map((m) => {
            const isUnlocked = currentStreak >= m.days;
            const progress = Math.min(100, Math.round((currentStreak / m.days) * 100));

            return (
              <div
                key={m.days}
                className={`rounded-2xl p-4 border-2 transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-400 text-amber-950 border border-amber-500'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isUnlocked ? m.icon : <Lock className="w-5 h-5 text-slate-400" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{m.title}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                      {m.days} Days
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5 leading-tight">{m.desc}</p>
                  <p className="text-[11px] font-bold text-amber-700 mt-1">🎁 Reward: {m.perk}</p>

                  {/* Progress bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full ${isUnlocked ? 'bg-amber-500' : 'bg-slate-400'} rounded-full`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 shrink-0">
                      {isUnlocked ? 'Unlocked!' : `${currentStreak}/${m.days}`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Pediatric Habit Tip */}
      <div className="rounded-2xl bg-sky-50 p-4 border border-sky-200 flex items-start gap-3 text-xs text-sky-950 leading-relaxed">
        <BookOpen className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <strong>Why Consistent Daily Practice Matters:</strong> Short 10–15 minute daily learning micro-sessions are proven to strengthen cognitive neural pathways in children aged 0–5 significantly more than longer, irregular sessions. Keeping a daily streak builds lifelong confidence and joy in learning!
        </div>
      </div>
    </div>
  );
};
