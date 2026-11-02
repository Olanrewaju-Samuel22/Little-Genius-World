import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Star, 
  Settings, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Play,
  Compass
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldId } from '../../types';
import { audio } from '../../utils/audio';
import { MascotAvatar, MascotExpression } from '../mascots/MascotAvatar';
import { WorldIllustration } from './WorldIllustrations';

interface WorldCardData {
  id: WorldId;
  badge: string;
  accentColor: string;
  btnClass: string;
  tagline: string;
}

const WORLDS_CONFIG: WorldCardData[] = [
  {
    id: 'abc-adventure',
    badge: 'Alphabet & Phonics',
    accentColor: 'border-indigo-400 bg-indigo-50/70 text-indigo-900',
    btnClass: 'btn-3d-sky',
    tagline: 'Letters A–Z, Sounds & First Words'
  },
  {
    id: 'number-kingdom',
    badge: 'Numbers 1–20',
    accentColor: 'border-amber-400 bg-amber-50/70 text-amber-900',
    btnClass: 'btn-3d-amber',
    tagline: 'Counting Stars & Fun Math Garden'
  },
  {
    id: 'animal-world',
    badge: 'Animal Sounds',
    accentColor: 'border-emerald-400 bg-emerald-50/70 text-emerald-900',
    btnClass: 'btn-3d-emerald',
    tagline: 'Farm, Wild, Ocean & Bird Friends'
  },
  {
    id: 'colour-garden',
    badge: 'Colours & Shapes',
    accentColor: 'border-pink-400 bg-pink-50/70 text-pink-900',
    btnClass: 'btn-3d-amber',
    tagline: 'Bright Blossoms & Basket Sorting'
  },
  {
    id: 'puzzle-planet',
    badge: 'Memory & Patterns',
    accentColor: 'border-purple-400 bg-purple-50/70 text-purple-900',
    btnClass: 'btn-3d-sky',
    tagline: 'Card Matching & Jigsaw Puzzles'
  },
  {
    id: 'creative-corner',
    badge: 'Digital Art',
    accentColor: 'border-rose-400 bg-rose-50/70 text-rose-900',
    btnClass: 'btn-3d-amber',
    tagline: 'Drawing Canvas & Mascot Colouring'
  },
  {
    id: 'story-castle',
    badge: 'Illustrated Stories',
    accentColor: 'border-blue-400 bg-blue-50/70 text-blue-900',
    btnClass: 'btn-3d-sky',
    tagline: 'Bedtime Stories & Kind Morals'
  },
  {
    id: 'music-village',
    badge: 'Xylophone & Songs',
    accentColor: 'border-teal-400 bg-teal-50/70 text-teal-900',
    btnClass: 'btn-3d-emerald',
    tagline: 'Rainbow Notes, Drums & Sing-Alongs'
  },
  {
    id: 'everyday-heroes',
    badge: 'Daily Routines',
    accentColor: 'border-sky-400 bg-sky-50/70 text-sky-900',
    btnClass: 'btn-3d-emerald',
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
    t,
    currentLang
  } = useGame();

  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');

  const handleSelectWorld = (worldId: WorldId) => {
    audio.playPop(1.1);
    setCurrentWorld(worldId);
  };

  const toggleSound = () => {
    updateSettings({ isMuted: !settings.isMuted });
    audio.playPop(1.0);
  };

  const handleHearGuide = () => {
    setMascotMood('excited');
    audio.playChime();
    audio.speak("Where would you like to explore today? Tap any magical world to play!", currentLang);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-200 via-sky-100 to-emerald-100 flex flex-col relative overflow-hidden">
      {/* Soft Animated Cartoon Clouds in Sky Background */}
      <div className="absolute top-10 left-12 opacity-40 animate-cloud-drift pointer-events-none select-none">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="#FFFFFF">
          <circle cx="35" cy="40" r="20" />
          <circle cx="60" cy="30" r="25" />
          <circle cx="85" cy="40" r="18" />
          <rect x="25" y="35" width="70" height="20" rx="10" />
        </svg>
      </div>
      <div className="absolute top-28 right-16 opacity-30 animate-cloud-drift pointer-events-none select-none [animation-delay:8s]">
        <svg width="150" height="70" viewBox="0 0 150 70" fill="#FFFFFF">
          <circle cx="45" cy="45" r="25" />
          <circle cx="78" cy="35" r="32" />
          <circle cx="110" cy="45" r="22" />
          <rect x="30" y="42" width="90" height="24" rx="12" />
        </svg>
      </div>

      {/* Top Interactive Island Navigation Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 bg-white/90 backdrop-blur-md border-b-2 border-amber-200 shadow-sm">
        {/* Back to Home Button */}
        <button
          onClick={onBackToHome}
          className="btn-3d-white flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-black text-slate-800"
          title="Back to Home"
        >
          <ArrowLeft className="w-4 h-4 text-amber-600" />
          <span className="hidden sm:inline">Home</span>
        </button>

        {/* Center Title & Current Profile Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAgeModal}
            className="btn-3d-amber flex items-center gap-2 px-3 sm:px-4 py-1.5"
            title="Change Age Group"
          >
            <MascotAvatar mascot={currentProfile.avatar} size="sm" expression="happy" />
            <div className="text-left leading-tight">
              <span className="text-xs font-black text-amber-950 block">{currentProfile.name}</span>
              <span className="text-[10px] font-bold text-amber-900/80">
                {t.ageGroups[currentProfile.ageGroup].title}
              </span>
            </div>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 rounded-full bg-amber-400 border-2 border-amber-500 px-3 py-1 font-black text-amber-950 text-xs sm:text-sm shadow-xs">
            <Star className="w-4 h-4 fill-amber-300 text-amber-900" />
            <span>{currentProfile.stars}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="rounded-full bg-white hover:bg-slate-100 p-2 text-slate-700 border-2 border-slate-200 shadow-xs transition-transform active:scale-95"
            title={settings.isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {settings.isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Settings */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="rounded-full bg-white hover:bg-slate-100 p-2 text-slate-700 border-2 border-slate-200 shadow-xs transition-transform active:scale-95"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Parent Gate */}
          <button
            onClick={() => setIsParentGateOpen(true)}
            className="btn-3d-white flex items-center gap-1.5 px-3 py-2 text-xs font-black text-slate-700"
            title="Parent Area"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="hidden md:inline">{t.parentArea}</span>
          </button>
        </div>
      </header>

      {/* Main Map Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center z-10">
        {/* Banner with Friendly Mascot & Voice Prompt */}
        <div className="w-full bg-white/85 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border-3 border-amber-200 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5 text-center sm:text-left">
            <div 
              onClick={() => {
                setMascotMood(mascotMood === 'excited' ? 'happy' : 'excited');
                audio.playPop(1.2);
              }}
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95 shrink-0"
              title="Tap Leo!"
            >
              <MascotAvatar mascot="lion" size="md" expression={mascotMood} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black mb-1">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                <span>MAGICAL WORLD MAP</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Where would you like to explore today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                Tap any learning kingdom to discover games and earn gold stars!
              </p>
            </div>
          </div>

          {/* Hear Guide Voice Button for Young Children */}
          <button
            onClick={handleHearGuide}
            className="btn-3d-white flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-black text-sky-800 shrink-0"
            title="Listen to instruction"
          >
            <Volume2 className="w-4 h-4 text-sky-500" />
            <span>Hear Leo</span>
          </button>
        </div>

        {/* 9 Interactive World Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {WORLDS_CONFIG.map((world) => {
            const worldInfo = t.worlds[world.id];

            return (
              <div
                key={world.id}
                onClick={() => handleSelectWorld(world.id)}
                className="group relative bg-white rounded-3xl p-4 sm:p-5 shadow-md hover:shadow-xl border-3 border-white hover:border-amber-400 text-left transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Visual Scene Illustration */}
                  <div className="overflow-hidden rounded-2xl mb-4 border-2 border-slate-100 shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                    <WorldIllustration worldId={world.id} className="w-full h-36 object-cover" />
                  </div>

                  {/* World Specialty Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${world.accentColor}`}>
                      {world.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Free Play
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-1 group-hover:text-amber-600 transition-colors">
                    {worldInfo.title}
                  </h3>

                  {/* Tagline / Subtitle */}
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-2">
                    {world.tagline}
                  </p>
                </div>

                {/* Tactile 3D Play Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-amber-600 group-hover:translate-x-1 transition-transform">
                    Tap to Enter →
                  </span>
                  <button
                    type="button"
                    className={`${world.btnClass} flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
