import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Star, 
  ArrowRight,
  Compass,
  Trophy
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

import { AnimalExplorer } from './animals/AnimalExplorer';
import { GuessSoundGame } from './animals/GuessSoundGame';
import { MatchNameGame } from './animals/MatchNameGame';
import { AnimalHomesGame } from './animals/AnimalHomesGame';
import { WhoAmIGame } from './animals/WhoAmIGame';
import { AnimalFamiliesGame } from './animals/AnimalFamiliesGame';
import { AnimalSoundsChallenge } from './animals/AnimalSoundsChallenge';
import { ANIMALS_DATA } from './animals/animalsData';

type AnimalTab = 'explorer' | 'guess' | 'match' | 'homes' | 'whoami' | 'families' | 'sounds';

interface TabConfig {
  id: AnimalTab;
  title: string;
  icon: string;
  recommendedFor: string[];
}

const TABS: TabConfig[] = [
  { id: 'explorer', title: 'Animal Safari', icon: '🐾', recommendedFor: ['0-1', '1-2', '2-3', '3-4', '4-5'] },
  { id: 'guess', title: 'Guess Sound', icon: '🔊', recommendedFor: ['0-1', '1-2', '2-3'] },
  { id: 'match', title: 'Match Name', icon: '🏷️', recommendedFor: ['1-2', '2-3', '3-4'] },
  { id: 'homes', title: 'Animal Homes', icon: '🏡', recommendedFor: ['2-3', '3-4', '4-5'] },
  { id: 'whoami', title: 'Who Am I?', icon: '❓', recommendedFor: ['3-4', '4-5'] },
  { id: 'families', title: 'Animal Families', icon: '🐣', recommendedFor: ['3-4', '4-5'] },
  { id: 'sounds', title: 'Sound Challenge', icon: '🎵', recommendedFor: ['2-3', '3-4', '4-5'] },
];

export const AnimalWorld: React.FC = () => {
  const { currentProfile, addStar, celebrate, playPositiveFeedback, currentLang, t } = useGame();

  // Pick initial tab based on child's age group
  const getInitialTab = (): AnimalTab => {
    if (currentProfile.ageGroup === '4-5') return 'whoami';
    if (currentProfile.ageGroup === '3-4') return 'homes';
    if (currentProfile.ageGroup === '2-3') return 'match';
    if (currentProfile.ageGroup === '1-2') return 'guess';
    return 'explorer';
  };

  const [activeTab, setActiveTab] = useState<AnimalTab>(getInitialTab);
  const [streak, setStreak] = useState<number>(0);
  const [sessionStars, setSessionStars] = useState<number>(0);

  // Track discovered animals for milestones
  const [discoveredAnimals, setDiscoveredAnimals] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`lgw_discovered_animals_${currentProfile.id}`);
      return saved ? JSON.parse(saved) : ['cow', 'lion', 'dolphin', 'parrot'];
    } catch {
      return ['cow', 'lion', 'dolphin', 'parrot'];
    }
  });

  const handleDiscoveredAnimal = (animalId: string) => {
    if (!discoveredAnimals.includes(animalId)) {
      const updated = [...discoveredAnimals, animalId];
      setDiscoveredAnimals(updated);
      try {
        localStorage.setItem(`lgw_discovered_animals_${currentProfile.id}`, JSON.stringify(updated));
      } catch {
        // fallback
      }

      // Check milestones
      if (updated.length === 5) {
        addStar(1);
        celebrate({
          title: '5 Animals Discovered!',
          subtitle: 'You are an Official Animal Safari Explorer!',
          stars: 1,
        });
      } else if (updated.length === 15) {
        addStar(2);
        celebrate({
          title: '15 Animal Friends Discovered!',
          subtitle: 'Incredible! You know creatures of the Farm, Jungle, and Sea!',
          stars: 2,
        });
      } else if (updated.length === ANIMALS_DATA.length) {
        addStar(3);
        celebrate({
          title: 'Animal Kingdom Champion!',
          subtitle: 'All 32 magnificent animals discovered across the world!',
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
        title: 'Animal Expert Streak!',
        subtitle: `Fantastic! ${newStreak} animal challenges in a row!`,
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
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-teal-50 to-sky-50 flex flex-col">
      {/* World Navigation Header */}
      <WorldHeader
        title={t.worlds['animal-world'].title}
        instructionText="Welcome to Animal World! Meet 32 friendly animals, hear real sounds, and explore their homes!"
        accentColor="bg-emerald-500"
      />

      {/* Interactive Activity Mode Switcher Tabs */}
      <div className="bg-white/90 backdrop-blur-xs border-b-2 border-emerald-200 shadow-xs px-2 sm:px-4 py-2 sticky top-[57px] z-20">
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
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-300 scale-105'
                      : 'bg-white hover:bg-emerald-50 text-slate-700 border border-emerald-200'
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
          <div className="hidden sm:flex items-center gap-2 shrink-0 pl-2 border-l border-emerald-200">
            <button
              onClick={handleNextActivity}
              className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-black flex items-center gap-1 transition-transform active:scale-95"
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
          <AnimalExplorer
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onDiscoveredAnimal={handleDiscoveredAnimal}
            onCorrectAnswer={handleCorrectAnswer}
            discoveredList={discoveredAnimals}
          />
        )}

        {activeTab === 'guess' && (
          <GuessSoundGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'match' && (
          <MatchNameGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'homes' && (
          <AnimalHomesGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'whoami' && (
          <WhoAmIGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'families' && (
          <AnimalFamiliesGame
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}

        {activeTab === 'sounds' && (
          <AnimalSoundsChallenge
            ageGroup={currentProfile.ageGroup}
            currentLang={currentLang}
            onCorrectAnswer={handleCorrectAnswer}
            streak={streak}
          />
        )}
      </main>

      {/* Footer Progress & Status Bar */}
      <footer className="w-full bg-white/80 border-t border-emerald-200 py-3 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold text-emerald-950">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-700">🐾</span>
            <span>Animals Discovered: <strong className="text-emerald-700">{discoveredAnimals.length}</strong> / {ANIMALS_DATA.length}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Session Stars: <strong className="text-emerald-700">{sessionStars}</strong></span>
            </div>
            {streak > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-black">
                🔥 Streak {streak}
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
