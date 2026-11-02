import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  ShieldCheck, 
  Settings, 
  Star, 
  Globe2, 
  Volume2, 
  VolumeX,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { LanguageCode } from '../../types';
import { MascotAvatar, MascotExpression } from '../mascots/MascotAvatar';
import { PWAInstallButton } from '../pwa/PWAInstallButton';
import { IllustratedBackground } from './IllustratedBackground';
import { audio } from '../../utils/audio';

interface Props {
  onStartPlaying: () => void;
  onOpenAgeModal: () => void;
}

const LION_PHRASES = [
  "Roar! I'm Leo! Ready to play and discover?",
  "You're a brilliant little superstar!",
  "Let's count, sing, and read wonderful stories!",
  "Tap 'Start Playing' to visit the magical worlds!",
];

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

  const [lionExpression, setLionExpression] = useState<MascotExpression>('happy');
  const [speechBubbleText, setSpeechBubbleText] = useState(LION_PHRASES[0]);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);

  const handleStart = () => {
    setLionExpression('excited');
    audio.playSuccess();
    onStartPlaying();
  };

  const handleTapMascot = () => {
    const expressions: MascotExpression[] = ['winking', 'excited', 'celebrating', 'curious', 'happy'];
    const nextExpr = expressions[Math.floor(Math.random() * expressions.length)];
    setLionExpression(nextExpr);

    const nextPhrase = LION_PHRASES[Math.floor(Math.random() * LION_PHRASES.length)];
    setSpeechBubbleText(nextPhrase);
    setShowSpeechBubble(true);

    audio.playAnimalSound('lion');
    audio.playPop(1.2);
  };

  const toggleSound = () => {
    updateSettings({ isMuted: !settings.isMuted });
    audio.playPop(1.0);
  };

  return (
    <IllustratedBackground>
      {/* 1. Top Navigation Bar */}
      <header className="w-full flex items-center justify-between px-4 sm:px-8 py-3.5 z-20">
        {/* Language Quick Selector Pills */}
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-2xl p-1.5 border-2 border-amber-300 shadow-md">
          <Globe2 className="w-4 h-4 text-amber-600 ml-1.5 mr-0.5" />
          {[
            { code: 'en', label: 'EN' },
            { code: 'yo', label: 'YO' },
            { code: 'ha', label: 'HA' },
            { code: 'ig', label: 'IG' },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as LanguageCode)}
              className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                currentLang === lang.code
                  ? 'bg-amber-400 text-amber-950 shadow-xs scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'
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
            className="w-11 h-11 rounded-2xl bg-white/95 hover:bg-white text-slate-800 shadow-md border-2 border-amber-300 flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            title={settings.isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {settings.isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="w-11 h-11 rounded-2xl bg-white/95 hover:bg-white text-slate-800 shadow-md border-2 border-amber-300 flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-slate-700" />
          </button>

          <button
            onClick={() => setIsParentGateOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-white/95 hover:bg-white px-3.5 py-2.5 text-xs sm:text-sm font-black text-slate-800 shadow-md border-2 border-amber-300 transition-transform active:scale-95 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">{t.parentArea}</span>
          </button>
        </div>
      </header>

      {/* 2. Main Hero Stage */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto my-2 z-10 w-full">
        {/* Playful Interactive Lion Mascot Stage */}
        <div className="relative mb-3 flex flex-col items-center">
          {/* Interactive Speech Bubble */}
          {showSpeechBubble && (
            <div className="relative mb-2 max-w-xs sm:max-w-sm bg-white rounded-2xl px-4 py-2.5 shadow-lg border-3 border-amber-300 text-xs sm:text-sm font-bold text-slate-800 animate-pop">
              <span>{speechBubbleText}</span>
              {/* Bubble Triangle tail pointing down */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-amber-300" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-white" />
            </div>
          )}

          {/* Leo The Lion Mascot Avatar */}
          <div
            onClick={handleTapMascot}
            className="cursor-pointer transform hover:scale-105 active:scale-95 transition-all select-none"
            title="Tap Leo to roar and play!"
          >
            <MascotAvatar
              mascot="lion"
              size="hero"
              isAnimated
              expression={lionExpression}
            />
            {/* Interactive Tap Pill badge */}
            <div className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black px-3.5 py-1 rounded-full border-2 border-amber-500 shadow-md -mt-4 relative z-10 animate-bounce-gentle">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tap Leo to Play!</span>
            </div>
          </div>
        </div>

        {/* Brand Logo & Tagline Title Emblem */}
        <div className="mb-5">
          <div className="inline-block relative">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-amber-300 drop-shadow-[0_5px_0_#92400E] stroke-amber-900" style={{ textShadow: '0 4px 12px rgba(120,53,15,0.4)' }}>
              LITTLE GENIUS WORLD
            </h1>
          </div>
          <p className="text-base sm:text-xl font-black text-amber-950 mt-1 drop-shadow-xs tracking-wide">
            {t.tagline}
          </p>
        </div>

        {/* Juicy 3D Tactile Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full justify-center max-w-lg">
          {/* Main "Start Playing" Primary 3D Button */}
          <button
            onClick={handleStart}
            className="w-full sm:w-auto flex-1 btn-3d-amber py-4 sm:py-4.5 px-8 text-xl sm:text-2xl flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-7 h-7 fill-amber-950 text-amber-950" />
            <span>{t.startPlaying}</span>
          </button>

          {/* Age Selection 3D Button */}
          <button
            onClick={onOpenAgeModal}
            className="w-full sm:w-auto btn-3d-white py-3 px-5 text-sm sm:text-base flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block -mb-0.5">{t.chooseAge}</span>
              <span className="font-black text-amber-900">{t.ageGroups[currentProfile.ageGroup].title}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-1" />
          </button>
        </div>

        {/* Active Child Profile & Streak Ribbon */}
        <div className="mt-5 flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-2xl border-2 border-amber-200 shadow-md">
          <MascotAvatar mascot={currentProfile.avatar} size="sm" />
          <span className="text-xs sm:text-sm font-black text-slate-800">
            Playing as {currentProfile.name}
          </span>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{currentProfile.stars}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-black text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>{currentProfile.currentStreak || 1}d Streak</span>
          </div>
        </div>
      </main>

      {/* 3. Safe Children Footer Status */}
      <footer className="w-full py-3.5 text-center text-xs font-black text-emerald-950 bg-white/40 backdrop-blur-xs border-t border-white/50 z-20">
        <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap px-4">
          <span>🌟 Safe & Kid-Friendly</span>
          <span>•</span>
          <span>🔒 100% Ad-Free</span>
          <span>•</span>
          <span>🛡️ Verified COPPA Safe</span>
          <span>•</span>
          <span>📶 Offline Ready PWA</span>
        </div>
      </footer>
    </IllustratedBackground>
  );
};
