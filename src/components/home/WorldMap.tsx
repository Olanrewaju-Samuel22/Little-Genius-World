import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Star, 
  Settings, 
  ShieldCheck, 
  User, 
  Volume2, 
  VolumeX, 
  Globe2 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldId } from '../../types';
import { audio } from '../../utils/audio';
import { MascotAvatar } from '../mascots/MascotAvatar';

interface WorldCardData {
  id: WorldId;
  titleKey: WorldId;
  emoji: string;
  badge: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  tagline: string;
}

const WORLDS_CONFIG: WorldCardData[] = [
  {
    id: 'abc-adventure',
    titleKey: 'abc-adventure',
    emoji: '🔤',
    badge: 'Alphabet & Phonics',
    bgColor: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    textColor: 'text-indigo-950',
    tagline: 'Letters A–Z, Sounds & First Words'
  },
  {
    id: 'number-kingdom',
    titleKey: 'number-kingdom',
    emoji: '🔢',
    badge: 'Numbers 1–20',
    bgColor: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-950',
    tagline: 'Counting Stars & Fun Math Garden'
  },
  {
    id: 'animal-world',
    titleKey: 'animal-world',
    emoji: '🦁',
    badge: 'Animal Sounds',
    bgColor: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-950',
    tagline: 'Farm, Wild, Ocean & Bird Friends'
  },
  {
    id: 'colour-garden',
    titleKey: 'colour-garden',
    emoji: '🎨',
    badge: 'Colours & Shapes',
    bgColor: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    textColor: 'text-pink-950',
    tagline: 'Bright Blossoms & Basket Sorting'
  },
  {
    id: 'puzzle-planet',
    titleKey: 'puzzle-planet',
    emoji: '🧩',
    badge: 'Memory & Patterns',
    bgColor: 'from-purple-400 to-violet-600',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-950',
    tagline: 'Card Matching & Jigsaw Puzzles'
  },
  {
    id: 'creative-corner',
    titleKey: 'creative-corner',
    emoji: '🖌️',
    badge: 'Digital Art',
    bgColor: 'from-rose-400 to-amber-500',
    borderColor: 'border-rose-300',
    textColor: 'text-rose-950',
    tagline: 'Drawing Canvas & Mascot Colouring'
  },
  {
    id: 'story-castle',
    titleKey: 'story-castle',
    emoji: '🏰',
    badge: 'Illustrated Stories',
    bgColor: 'from-blue-400 to-indigo-600',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-950',
    tagline: 'Bedtime Stories & Kind Morals'
  },
  {
    id: 'music-village',
    titleKey: 'music-village',
    emoji: '🎶',
    badge: 'Xylophone & Songs',
    bgColor: 'from-teal-400 to-cyan-600',
    borderColor: 'border-teal-300',
    textColor: 'text-teal-950',
    tagline: 'Rainbow Notes, Drums & Sing-Alongs'
  },
  {
    id: 'everyday-heroes',
    titleKey: 'everyday-heroes',
    emoji: '🦸',
    badge: 'Daily Routines',
    bgColor: 'from-sky-400 to-emerald-500',
    borderColor: 'border-sky-300',
    textColor: 'text-sky-950',
    tagline: 'Soap Bubbles, Clean Teeth & Safety'
  }
];

interface Props {
  onBackToHome: () => void;
  onOpenAgeModal: () => void;
}

export const WorldMap: React.FC<Props> = ({ onBackToHome, onOpenAgeModal }) => {
  const {
    setCurrentWorld,
    currentProfile,
    setIsParentGateOpen,
    setIsSettingsModalOpen,
    settings,
    updateSettings,
    t
  } = useGame();

  const handleSelectWorld = (worldId: WorldId) => {
    audio.playPop(1.1);
    setCurrentWorld(worldId);
  };

  const toggleSound = () => {
    updateSettings({ isMuted: !settings.isMuted });
    audio.playPop(1.0);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-200 via-sky-100 to-emerald-100 flex flex-col relative overflow-hidden">
      {/* Playful Floating Sky Clouds */}
      <div className="absolute top-10 left-10 text-white/70 text-6xl animate-float pointer-events-none select-none">
        ☁️
      </div>
      <div className="absolute top-24 right-16 text-white/60 text-7xl animate-float pointer-events-none select-none [animation-delay:1.5s]">
        ☁️
      </div>
      <div className="absolute bottom-20 left-20 text-white/50 text-5xl animate-float pointer-events-none select-none [animation-delay:2s]">
        🌈
      </div>

      {/* Top Interactive Island Navigation Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3 bg-white/85 backdrop-blur-md border-b-2 border-amber-200 shadow-xs">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold px-3.5 py-2 text-xs sm:text-sm border border-amber-300 shadow-xs transition-transform active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </button>

        {/* Center Title & Current Profile Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAgeModal}
            className="flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 border-2 border-amber-500 shadow-xs transition-transform active:scale-95"
            title="Change Age Group"
          >
            <MascotAvatar mascot={currentProfile.avatar} size="sm" />
            <div className="text-left">
              <span className="text-xs font-black text-amber-950 block -mb-0.5">{currentProfile.name}</span>
              <span className="text-[10px] font-bold text-amber-900/80">{t.ageGroups[currentProfile.ageGroup].title}</span>
            </div>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 rounded-full bg-amber-400 border-2 border-amber-500 px-3 py-1 font-black text-amber-950 text-xs sm:text-sm shadow-xs">
            <Star className="w-4 h-4 fill-amber-300 text-amber-900" />
            <span>{currentProfile.stars}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="rounded-full bg-white hover:bg-slate-100 p-2 text-slate-700 border border-slate-200 shadow-xs transition-transform active:scale-95"
            title={settings.isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {settings.isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Settings */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="rounded-full bg-white hover:bg-slate-100 p-2 text-slate-700 border border-slate-200 shadow-xs transition-transform active:scale-95"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Parent Gate */}
          <button
            onClick={() => setIsParentGateOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-white hover:bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 border border-slate-200 shadow-xs transition-transform active:scale-95"
            title="Parent Area"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="hidden md:inline">{t.parentArea}</span>
          </button>
        </div>
      </header>

      {/* Main Map Canvas with Floating Worlds */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300 shadow-xs text-xs font-black text-amber-950 mb-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>Little Genius World Map</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Where would you like to explore today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
            Tap any magical world to start playing fun games!
          </p>
        </div>

        {/* 9 Interactive World Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {WORLDS_CONFIG.map((world) => {
            const worldInfo = t.worlds[world.id];

            return (
              <button
                key={world.id}
                onClick={() => handleSelectWorld(world.id)}
                className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-4 border-white hover:border-amber-300 text-left transition-all duration-300 transform active:scale-95 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative top color glow */}
                <div className={`absolute top-0 left-0 right-0 h-3 bg-linear-to-r ${world.bgColor}`} />

                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl group-hover:scale-115 transition-transform duration-300 filter drop-shadow-xs">
                      {world.emoji}
                    </div>
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                      {world.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
                    {worldInfo.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {worldInfo.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                    Tap to Play →
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-400 group-hover:bg-amber-300 flex items-center justify-center text-amber-950 font-bold shadow-xs">
                    ▶
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};
