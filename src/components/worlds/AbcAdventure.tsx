import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Star, 
  ArrowRight,
  Compass,
  BookOpen,
  Search,
  CheckCircle2,
  Boxes
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';
import { LetterExplorer } from './abc/LetterExplorer';
import { PhonicsSoundboard } from './abc/PhonicsSoundboard';
import { FindLetterGame } from './abc/FindLetterGame';
import { MatchObjectGame } from './abc/MatchObjectGame';
import { CaseMatchGame } from './abc/CaseMatchGame';
import { WordBuilderGame } from './abc/WordBuilderGame';
import { LetterTracingGame } from './abc/LetterTracingGame';

type AbcTab = 'explorer' | 'tracing' | 'phonics' | 'find' | 'match-object' | 'case-match' | 'word-builder';

interface TabConfig {
  id: AbcTab;
  title: string;
  icon: string;
  recommendedFor: string[];
}

const TABS: TabConfig[] = [
  { id: 'explorer', title: 'A–Z Letters', icon: '🔤', recommendedFor: ['0-1', '1-2', '2-3', '3-4', '4-5'] },
  { id: 'tracing', title: 'Letter Tracing', icon: '✍️', recommendedFor: ['2-3', '3-4', '4-5'] },
  { id: 'phonics', title: 'Phonics Sounds', icon: '🔊', recommendedFor: ['1-2', '2-3', '3-4', '4-5'] },
  { id: 'find', title: 'Find Letter', icon: '🎯', recommendedFor: ['1-2', '2-3', '3-4'] },
  { id: 'match-object', title: 'Match Objects', icon: '🍎', recommendedFor: ['2-3', '3-4', '4-5'] },
  { id: 'case-match', title: 'Upper & Lower', icon: '🔠', recommendedFor: ['3-4', '4-5'] },
  { id: 'word-builder', title: 'Word Builder', icon: '🧩', recommendedFor: ['4-5'] },
];

export const AbcAdventure: React.FC = () => {
  const { currentProfile, addStar, celebrate, playPositiveFeedback, currentLang, t } = useGame();

  // Pick initial tab based on child's age group
  const getInitialTab = (): AbcTab => {
    if (currentProfile.ageGroup === '4-5') return 'word-builder';
    if (currentProfile.ageGroup === '3-4') return 'phonics';
    if (currentProfile.ageGroup === '2-3') return 'find';
    return 'explorer';
  };

  const [activeTab, setActiveTab] = useState<AbcTab>(getInitialTab);
  const [streak, setStreak] = useState(0);
  const [sessionStars, setSessionStars] = useState(0);
  const [tracingTargetLetter, setTracingTargetLetter] = useState<string>('A');

  const handleGoToTracing = (letter: string) => {
    setTracingTargetLetter(letter);
    setActiveTab('tracing');
    audio.playPop(1.1);
  };
  const [exploredLetters, setExploredLetters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`lgw_explored_letters_${currentProfile.id}`);
      return saved ? JSON.parse(saved) : ['A', 'B', 'C'];
    } catch {
      return ['A', 'B', 'C'];
    }
  });

  // Save explored letters
  const handleExploredLetter = (letter: string) => {
    if (!exploredLetters.includes(letter)) {
      const updated = [...exploredLetters, letter];
      setExploredLetters(updated);
      try {
        localStorage.setItem(`lgw_explored_letters_${currentProfile.id}`, JSON.stringify(updated));
      } catch {
        // storage fallback
      }

      // Check milestones
      if (updated.length === 10) {
        addStar(1);
        celebrate({
          title: '10 Letters Explored!',
          subtitle: 'You are an Alphabet Explorer Superstar!',
          stars: 1
        });
      } else if (updated.length === 26) {
        addStar(3);
        celebrate({
          title: 'All 26 Letters Unlocked!',
          subtitle: 'Incredible! You discovered every letter from A to Z!',
          stars: 3
        });
      }
    }
  };

  const handleCorrectAnswer = () => {
    addStar(1);
    setSessionStars(prev => prev + 1);
    playPositiveFeedback();

    const newStreak = streak + 1;
    setStreak(newStreak);

    // Streak celebration milestones (3, 6, 9)
    if (newStreak > 0 && newStreak % 3 === 0) {
      celebrate({
        title: 'ABC Explorer Champion!',
        subtitle: `Incredible! Streak of ${newStreak} answers in a row!`,
        stars: 2
      });
    }
  };

  const handleNextActivity = () => {
    const currentIndex = TABS.findIndex(t => t.id === activeTab);
    const nextIndex = (currentIndex + 1) % TABS.length;
    setActiveTab(TABS[nextIndex].id);
    audio.playPop(1.1);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 via-sky-50 to-pink-50 flex flex-col">
      {/* World Navigation Header */}
      <WorldHeader
        title={t.worlds['abc-adventure'].title}
        instructionText="Welcome to ABC Adventure! Explore letters A to Z, match familiar friends, and spell words!"
        accentColor="bg-indigo-500"
      />

      {/* Interactive Activity Mode Switcher Tabs */}
      <div className="bg-white/90 backdrop-blur-xs border-b-2 border-indigo-100 shadow-xs px-2 sm:px-4 py-2 sticky top-[57px] z-20">
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
                    audio.playPop(1.0);
                  }}
                  className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'btn-3d-amber text-amber-950 scale-105'
                      : 'bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-950 border border-indigo-200'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.title}</span>

                  {isRecommended && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Recommended for your age" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Next Activity CTA */}
          <button
            onClick={handleNextActivity}
            className="btn-3d-white hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-indigo-900 shrink-0"
            title="Next Activity"
          >
            <span>Next Activity</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
          </button>
        </div>
      </div>

      {/* Main Learning Playground Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 flex flex-col items-center">
        {activeTab === 'explorer' && (
          <LetterExplorer
            currentLang={currentLang}
            ageGroup={currentProfile.ageGroup}
            onExploredLetter={handleExploredLetter}
            exploredLetters={exploredLetters}
            onGoToTracing={handleGoToTracing}
          />
        )}

        {activeTab === 'tracing' && (
          <LetterTracingGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
            initialLetter={tracingTargetLetter}
          />
        )}

        {activeTab === 'phonics' && (
          <PhonicsSoundboard
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'find' && (
          <FindLetterGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'match-object' && (
          <MatchObjectGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'case-match' && (
          <CaseMatchGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'word-builder' && (
          <WordBuilderGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}
      </main>
    </div>
  );
};
