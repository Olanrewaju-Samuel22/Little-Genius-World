import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { HomeScreen } from './components/home/HomeScreen';
import { WorldMap } from './components/home/WorldMap';
import { AbcAdventure } from './components/worlds/AbcAdventure';
import { NumberKingdom } from './components/worlds/NumberKingdom';
import { AnimalWorld } from './components/worlds/AnimalWorld';
import { ColourGarden } from './components/worlds/ColourGarden';
import { PuzzlePlanet } from './components/worlds/PuzzlePlanet';
import { CreativeCorner } from './components/worlds/CreativeCorner';
import { StoryCastle } from './components/worlds/StoryCastle';
import { MusicVillage } from './components/worlds/MusicVillage';
import { EverydayHeroes } from './components/worlds/EverydayHeroes';
import { ParentGateModal } from './components/parent/ParentGateModal';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { ScreenTimeLockModal } from './components/parent/ScreenTimeLockModal';
import { AgeSelectModal } from './components/modals/AgeSelectModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

function MainApp() {
  const {
    currentWorld,
    setCurrentWorld,
    isParentGateOpen,
    setIsParentGateOpen,
    setIsParentDashboardOpen,
    isSettingsModalOpen,
    setIsSettingsModalOpen
  } = useGame();

  const [isInWorldMap, setIsInWorldMap] = useState(false);
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);

  // Router for current game world
  const renderCurrentView = () => {
    if (currentWorld === 'abc-adventure') {
      return <AbcAdventure />;
    }
    if (currentWorld === 'number-kingdom') {
      return <NumberKingdom />;
    }
    if (currentWorld === 'animal-world') {
      return <AnimalWorld />;
    }
    if (currentWorld === 'colour-garden') {
      return <ColourGarden />;
    }
    if (currentWorld === 'puzzle-planet') {
      return <PuzzlePlanet />;
    }
    if (currentWorld === 'creative-corner') {
      return <CreativeCorner />;
    }
    if (currentWorld === 'story-castle') {
      return <StoryCastle />;
    }
    if (currentWorld === 'music-village') {
      return <MusicVillage />;
    }
    if (currentWorld === 'everyday-heroes') {
      return <EverydayHeroes />;
    }

    // If no active world, check if exploring map or on home welcome screen
    if (isInWorldMap) {
      return (
        <WorldMap
          onBackToHome={() => setIsInWorldMap(false)}
          onOpenAgeModal={() => setIsAgeModalOpen(true)}
        />
      );
    }

    return (
      <HomeScreen
        onStartPlaying={() => setIsInWorldMap(true)}
        onOpenAgeModal={() => setIsAgeModalOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden font-['Fredoka',sans-serif]">
      {renderCurrentView()}

      {/* Parental Gate Modal */}
      <ParentGateModal
        isOpen={isParentGateOpen}
        onClose={() => setIsParentGateOpen(false)}
        onSuccess={() => {
          setIsParentGateOpen(false);
          setIsParentDashboardOpen(true);
        }}
      />

      {/* Parent & Educator Dashboard */}
      <ParentDashboard />

      {/* Age Adaptive Selector Modal */}
      <AgeSelectModal
        isOpen={isAgeModalOpen}
        onClose={() => setIsAgeModalOpen(false)}
      />

      {/* Quick Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      {/* Screen Time Rest Break Modal */}
      <ScreenTimeLockModal />

      {/* Offline Status Badge */}
      <OfflineIndicator />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}
