import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Star, 
  ArrowRight,
  Crown,
  Grid,
  CheckCircle2
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

import { NumberExplorer } from './numbers/NumberExplorer';
import { TapToCountGame } from './numbers/TapToCountGame';
import { QuantityMatchGame } from './numbers/QuantityMatchGame';
import { MissingNumberGame } from './numbers/MissingNumberGame';
import { NumberOrderGame } from './numbers/NumberOrderGame';
import { MathGardenGame } from './numbers/MathGardenGame';

type NumberTab = 'explorer' | 'count' | 'match' | 'missing' | 'order' | 'math';

interface TabConfig {
  id: NumberTab;
  title: string;
  icon: string;
  recommendedFor: string[];
}

const TABS: TabConfig[] = [
  { id: 'explorer', title: '1–20 Numbers', icon: '👑', recommendedFor: ['0-1', '1-2', '2-3', '3-4', '4-5'] },
  { id: 'count', title: 'Tap & Count', icon: '⭐', recommendedFor: ['1-2', '2-3', '3-4'] },
  { id: 'match', title: 'Match Quantity', icon: '🧺', recommendedFor: ['1-2', '2-3', '3-4', '4-5'] },
  { id: 'missing', title: 'Missing Number', icon: '🚂', recommendedFor: ['2-3', '3-4', '4-5'] },
  { id: 'order', title: 'Number Order', icon: '🔢', recommendedFor: ['3-4', '4-5'] },
  { id: 'math', title: 'Math Garden', icon: '➕', recommendedFor: ['3-4', '4-5'] },
];

export const NumberKingdom: React.FC = () => {
  const { currentProfile, addStar, celebrate, playPositiveFeedback, currentLang, t } = useGame();

  // Pick initial tab based on child's age group
  const getInitialTab = (): NumberTab => {
    if (currentProfile.ageGroup === '4-5') return 'math';
    if (currentProfile.ageGroup === '3-4') return 'missing';
    if (currentProfile.ageGroup === '2-3') return 'match';
    if (currentProfile.ageGroup === '1-2') return 'count';
    return 'explorer';
  };

  const [activeTab, setActiveTab] = useState<NumberTab>(getInitialTab);
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [sessionStars, setSessionStars] = useState<number>(0);

  // Track discovered numbers for milestones
  const [discoveredNumbers, setDiscoveredNumbers] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(`lgw_explored_numbers_${currentProfile.id}`);
      return saved ? JSON.parse(saved) : [1, 2, 3];
    } catch {
      return [1, 2, 3];
    }
  });

  const handleDiscoveredNumber = (num: number) => {
    if (!discoveredNumbers.includes(num)) {
      const updated = [...discoveredNumbers, num];
      setDiscoveredNumbers(updated);
      try {
        localStorage.setItem(`lgw_explored_numbers_${currentProfile.id}`, JSON.stringify(updated));
      } catch {
        // storage fallback
      }

      // Check milestones
      if (updated.length === 5) {
        addStar(1);
        celebrate({
          title: '5 Numbers Discovered!',
          subtitle: 'You are on your way to becoming a Number Royalty!',
          stars: 1,
        });
      } else if (updated.length === 10) {
        addStar(2);
        celebrate({
          title: '10 Numbers Mastered!',
          subtitle: 'Incredible! You know numbers 1 through 10!',
          stars: 2,
        });
      } else if (updated.length === 20) {
        addStar(3);
        celebrate({
          title: 'Number Kingdom Champion!',
          subtitle: 'All 20 magical numbers unlocked! Long live the Little Genius!',
          stars: 3,
        });
      }
    }
  };

  const handleCorrectAnswer = () => {
    addStar(1);
    setSessionStars((prev) => prev + 1);
    playPositiveFeedback();

    const newStreak = streak + 1;
    setStreak(newStreak);

    // Milestone streak celebrations (3, 6, 9...)
    if (newStreak > 0 && newStreak % 3 === 0) {
      celebrate({
        title: 'Number Genius Streak!',
        subtitle: `Fantastic! ${newStreak} math challenges in a row!`,
        stars: 2,
      });
    }
  };

  const handleNextActivity = () => {
    const currentIndex = TABS.findIndex((t) => t.id === activeTab);
    const nextIndex = (currentIndex + 1) % TABS.length;
    setActiveTab(TABS[nextIndex].id);
    audio.playPop(1.1);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-yellow-50 to-orange-50 flex flex-col">
      {/* World Navigation Header */}
      <WorldHeader
        title={t.worlds['number-kingdom'].title}
        instructionText="Welcome to Number Kingdom! Tap numbers 1 to 20, count playful objects, and solve math adventures!"
        accentColor="bg-amber-400"
      />

      {/* Interactive Activity Mode Switcher Tabs */}
      <div className="bg-white/90 backdrop-blur-xs border-b-2 border-amber-200 shadow-xs px-2 sm:px-4 py-2 sticky top-[57px] z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const isRecommended = tab.recommendedFor.includes(currentProfile.ageGroup);

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    audio.playPop(1.05);
                  }}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-300 scale-105'
                      : 'bg-white hover:bg-amber-50 text-slate-700 border border-amber-200'
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.title}</span>
                  {isRecommended && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Recommended for your age" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Next Activity Button */}
          <div className="hidden sm:flex items-center gap-2 shrink-0 pl-2 border-l border-amber-200">
            <button
              onClick={handleNextActivity}
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black flex items-center gap-1 transition-transform active:scale-95"
            >
              <span>Next Game</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Educational Arena */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center">
        {activeTab === 'explorer' && (
          <NumberExplorer
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            selectedNumber={selectedNumber}
            onSelectNumber={setSelectedNumber}
            onDiscoveredNumber={handleDiscoveredNumber}
            onCorrectAnswer={handleCorrectAnswer}
          />
        )}

        {activeTab === 'count' && (
          <TapToCountGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'match' && (
          <QuantityMatchGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'missing' && (
          <MissingNumberGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'order' && (
          <NumberOrderGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'math' && (
          <MathGardenGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}
      </main>

      {/* Footer Progress & Status Bar */}
      <footer className="w-full bg-white/80 border-t border-amber-200 py-3 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold text-amber-950">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 rounded-lg text-amber-700">👑</span>
            <span>Numbers Discovered: <strong className="text-amber-600">{discoveredNumbers.length}</strong> / 20</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Session Stars: <strong className="text-amber-600">{sessionStars}</strong></span>
            </div>
            {streak > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black">
                🔥 Streak {streak}
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
