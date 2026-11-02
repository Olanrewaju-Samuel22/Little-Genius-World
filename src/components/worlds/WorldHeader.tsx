import React from 'react';
import { ArrowLeft, Star, Volume2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audio } from '../../utils/audio';

interface Props {
  title: string;
  instructionText?: string;
  onBack?: () => void;
  accentColor?: string; // e.g. 'bg-indigo-500'
}

export const WorldHeader: React.FC<Props> = ({
  title,
  instructionText,
  onBack,
  accentColor = 'bg-amber-400'
}) => {
  const { setCurrentWorld, currentProfile, t, currentLang } = useGame();

  const handleBack = () => {
    audio.playPop(0.9);
    if (onBack) {
      onBack();
    } else {
      setCurrentWorld(null);
    }
  };

  const handleHearInstruction = () => {
    if (instructionText) {
      audio.playChime();
      audio.speak(instructionText, currentLang);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 bg-white/90 backdrop-blur-md border-b-2 border-amber-200 shadow-xs">
      {/* Back to Map Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold px-3 sm:px-4 py-2 text-xs sm:text-sm border border-amber-300 shadow-xs transition-transform active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">{t.backToWorldMap}</span>
      </button>

      {/* Center World Title & Audio Prompt */}
      <div className="flex items-center gap-2 text-center">
        <h1 className="text-base sm:text-xl font-extrabold text-slate-800 tracking-tight">
          {title}
        </h1>
        {instructionText && (
          <button
            onClick={handleHearInstruction}
            className="rounded-full bg-sky-100 hover:bg-sky-200 p-1.5 text-sky-700 shadow-xs transition-transform active:scale-90"
            title="Hear instructions"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Stars & Age Badge */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-full bg-amber-400/90 border-2 border-amber-500 px-3 py-1 shadow-xs font-black text-amber-950 text-xs sm:text-sm">
          <Star className="w-4 h-4 fill-amber-300 text-amber-900" />
          <span>{currentProfile.stars}</span>
        </div>
      </div>
    </header>
  );
};
