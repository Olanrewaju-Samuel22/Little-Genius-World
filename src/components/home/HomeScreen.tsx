import React from 'react';
import { 
  Play, 
  Sparkles, 
  ShieldCheck, 
  Settings, 
  Star, 
  Globe2, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { LanguageCode } from '../../types';
import { MascotAvatar } from '../mascots/MascotAvatar';
import { PWAInstallButton } from '../pwa/PWAInstallButton';
import { audio } from '../../utils/audio';

interface Props {
  onStartPlaying: () => void;
  onOpenAgeModal: () => void;
}

export const HomeScreen: React.FC<Props> = ({ onStartPlaying, onOpenAgeModal }) => {
  const { 
    currentProfile, 
    setIsParentGateOpen, 
    setIsSettingsModalOpen, 
    settings, 
    updateSettings, 
    t, 
    currentLang, 
    setLanguage 
  } = useGame();

  const handleStart = () => {
    audio.playSuccess();
    onStartPlaying();
  };

  const toggleSound = () => {
    updateSettings({ isMuted: !settings.isMuted });
    audio.playPop(1.0);
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-sky-400 via-sky-300 to-emerald-200 flex flex-col justify-between overflow-hidden select-none">
      {/* Decorative Illustrated Wonderland Elements */}
      <div className="absolute top-8 left-6 sm:left-12 text-5xl sm:text-7xl animate-float opacity-80 pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-16 right-8 sm:right-20 text-6xl sm:text-8xl animate-float opacity-75 pointer-events-none [animation-delay:1.2s]">
        ☁️
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl animate-pulse opacity-90 pointer-events-none">
        ☀️
      </div>
      <div className="absolute bottom-6 left-8 text-4xl sm:text-5xl animate-bounce-gentle opacity-75 pointer-events-none">
        🌸
      </div>
      <div className="absolute bottom-10 right-10 text-4xl sm:text-5xl animate-bounce-gentle opacity-75 pointer-events-none [animation-delay:0.8s]">
        🌻
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4">
        {/* Language Quick Switcher */}
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full p-1 border-2 border-amber-300 shadow-sm">
          <Globe2 className="w-4 h-4 text-amber-600 ml-2 mr-1" />
          {[
            { code: 'en', label: 'EN' },
            { code: 'yo', label: 'YO' },
            { code: 'ha', label: 'HA' },
            { code: 'ig', label: 'IG' },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as LanguageCode)}
              className={`px-2.5 py-1 rounded-full text-xs font-black transition-all ${
                currentLang === lang.code
                  ? 'bg-amber-400 text-amber-950 shadow-xs scale-105'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Right Action Icons: Sound, Settings, PWA, Parent Area */}
        <div className="flex items-center gap-2">
          <PWAInstallButton />

          <button
            onClick={toggleSound}
            className="rounded-full bg-white/85 hover:bg-white p-2.5 text-slate-800 shadow-md border-2 border-amber-300 transition-transform active:scale-95"
            title={settings.isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {settings.isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="rounded-full bg-white/85 hover:bg-white p-2.5 text-slate-800 shadow-md border-2 border-amber-300 transition-transform active:scale-95"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-slate-700" />
          </button>

          <button
            onClick={() => setIsParentGateOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-white/85 hover:bg-white px-3.5 py-2 text-xs sm:text-sm font-extrabold text-slate-800 shadow-md border-2 border-amber-300 transition-transform active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>{t.parentArea}</span>
          </button>
        </div>
      </header>

      {/* Hero Mascot & Main Logo Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto my-2">
        {/* Animated Friendly Character Mascot */}
        <div className="relative mb-2 cursor-pointer transform hover:scale-105 transition-transform" onClick={() => audio.playAnimalSound('lion')}>
          <MascotAvatar mascot="lion" size="hero" isAnimated />
          <div className="absolute -bottom-2 right-4 bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full border-2 border-amber-500 shadow-md animate-bounce-gentle">
            Tap Me! Roar!
          </div>
        </div>

        {/* Brand Logo & Tagline */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-6xl font-black text-amber-300 tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.35)] stroke-amber-700">
            LITTLE GENIUS WORLD
          </h1>
          <p className="text-lg sm:text-2xl font-black text-white drop-shadow-md mt-1 tracking-wide">
            {t.tagline}
          </p>
        </div>

        {/* Big Tactile CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
          {/* Main "Start Playing" Button */}
          <button
            onClick={handleStart}
            className="group w-full sm:w-auto flex-1 flex items-center justify-center gap-3 rounded-3xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xl sm:text-2xl py-4 sm:py-5 px-8 shadow-2xl border-4 border-amber-500 transition-all transform active:scale-95 hover:scale-102"
          >
            <Play className="w-7 h-7 fill-amber-950 text-amber-950 group-hover:scale-110 transition-transform" />
            <span>{t.startPlaying}</span>
          </button>

          {/* Age Selection Badge Button */}
          <button
            onClick={onOpenAgeModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-3xl bg-white hover:bg-amber-50 text-slate-800 font-extrabold text-sm sm:text-base py-3.5 px-6 shadow-xl border-4 border-white transition-all transform active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block -mb-1">{t.chooseAge}</span>
              <span className="font-black text-amber-900">{t.ageGroups[currentProfile.ageGroup].title}</span>
            </div>
          </button>
        </div>

        {/* Active Child Profile Card */}
        <div className="mt-6 flex items-center gap-3 bg-white/80 backdrop-blur-xs px-4 py-2 rounded-full border-2 border-white/60 shadow-sm">
          <MascotAvatar mascot={currentProfile.avatar} size="sm" />
          <span className="text-xs font-black text-slate-800">Playing as {currentProfile.name}</span>
          <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{currentProfile.stars}</span>
          </div>
        </div>
      </main>

      {/* Gentle Soft Bottom Hills Wave */}
      <footer className="relative z-10 w-full py-4 text-center text-xs font-bold text-emerald-900/80">
        <div className="flex items-center justify-center gap-4">
          <span>🌟 Safe & Kid-Friendly</span>
          <span>•</span>
          <span>🔒 100% Ad-Free</span>
          <span>•</span>
          <span>Offline Ready</span>
        </div>
      </footer>
    </div>
  );
};
