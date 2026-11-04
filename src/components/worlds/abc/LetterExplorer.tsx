import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  Check, 
  Star,
  RotateCcw
} from 'lucide-react';
import { ABC_DATA, AbcItem } from './abcData';
import { audio } from '../../../utils/audio';
import { MascotAvatar } from '../../mascots/MascotAvatar';

interface Props {
  currentLang: string;
  ageGroup: string;
  onExploredLetter: (letter: string) => void;
  exploredLetters: string[];
  onGoToTracing?: (letter: string) => void;
}

export const LetterExplorer: React.FC<Props> = ({
  currentLang,
  ageGroup,
  onExploredLetter,
  exploredLetters,
  onGoToTracing
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [caseView, setCaseView] = useState<'both' | 'upper' | 'lower'>('both');
  const [isAutoplay, setIsAutoplay] = useState(false);
  const autoplayTimerRef = useRef<number | null>(null);

  const currentItem = ABC_DATA[selectedIndex];
  const isExplored = exploredLetters.includes(currentItem.letter);

  // Play letter pronunciation
  const speakCurrentLetter = (item: AbcItem = currentItem) => {
    audio.playPop(1.1);
    onExploredLetter(item.letter);

    const langWord =
      currentLang === 'yo'
        ? item.yo
        : currentLang === 'ha'
        ? item.ha
        : currentLang === 'ig'
        ? item.ig
        : item.word;

    // Speak letter name, phonetic sound, and object
    if (ageGroup === '0-1') {
      audio.speak(`${item.letter}. ${langWord}`, currentLang);
    } else {
      audio.speak(`${item.letter}. ${item.sound}. ${item.letter} is for ${langWord}!`, currentLang);
    }
  };

  const handleSelectLetter = (index: number) => {
    setSelectedIndex(index);
    speakCurrentLetter(ABC_DATA[index]);
  };

  const handlePrev = () => {
    const nextIdx = (selectedIndex - 1 + ABC_DATA.length) % ABC_DATA.length;
    handleSelectLetter(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % ABC_DATA.length;
    handleSelectLetter(nextIdx);
  };

  // Autoplay mode for infants and hands-free sensory learning
  useEffect(() => {
    if (isAutoplay) {
      autoplayTimerRef.current = window.setInterval(() => {
        setSelectedIndex(prev => {
          const next = (prev + 1) % ABC_DATA.length;
          const nextItem = ABC_DATA[next];
          speakCurrentLetter(nextItem);
          return next;
        });
      }, 4000);
    } else if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplay, currentLang, ageGroup]);

  // Initial letter voice prompt when mounting
  useEffect(() => {
    speakCurrentLetter(ABC_DATA[0]);
  }, []);

  const localizedWord =
    currentLang === 'yo'
      ? currentItem.yo
      : currentLang === 'ha'
      ? currentItem.ha
      : currentLang === 'ig'
      ? currentItem.ig
      : currentItem.word;

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-6 items-stretch w-full">
      {/* LEFT: Spotlight Showcase Card */}
      <div className="w-full lg:w-[380px] shrink-0 flex flex-col">
        <div className="relative bg-white rounded-3xl p-6 shadow-xl border-4 border-indigo-200 flex flex-col items-center text-center overflow-hidden flex-1 justify-between">
          {/* Subtle colorful top gradient */}
          <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${currentItem.bgGradient}`} />

          {/* Top Controls: Case view selector + Autoplay */}
          <div className="w-full flex items-center justify-between gap-2 mb-2">
            {/* Case Selector */}
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => { setCaseView('both'); audio.playPop(); }}
                className={`px-2.5 py-1 text-xs font-black rounded-xl transition-all ${
                  caseView === 'both' ? 'bg-indigo-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Aa
              </button>
              <button
                onClick={() => { setCaseView('upper'); audio.playPop(); }}
                className={`px-2.5 py-1 text-xs font-black rounded-xl transition-all ${
                  caseView === 'upper' ? 'bg-indigo-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                A
              </button>
              <button
                onClick={() => { setCaseView('lower'); audio.playPop(); }}
                className={`px-2.5 py-1 text-xs font-black rounded-xl transition-all ${
                  caseView === 'lower' ? 'bg-indigo-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                a
              </button>
            </div>

            {/* Autoplay button (especially helpful for 0-1 Baby Explorer) */}
            <button
              onClick={() => {
                setIsAutoplay(!isAutoplay);
                audio.playPop(1.2);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border transition-all ${
                isAutoplay 
                  ? 'bg-emerald-500 text-white border-emerald-600 animate-pulse' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              title="Auto Slideshow"
            >
              {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoplay ? 'Playing' : 'Auto Play'}</span>
            </button>
          </div>

          {/* Big Animated Letter */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.letter}
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="flex flex-col items-center my-1"
            >
              <div className="flex items-baseline gap-3">
                {(caseView === 'both' || caseView === 'upper') && (
                  <span 
                    className="text-7xl sm:text-8xl font-black tracking-tight"
                    style={{ color: currentItem.color }}
                  >
                    {currentItem.letter}
                  </span>
                )}
                {(caseView === 'both' || caseView === 'lower') && (
                  <span className="text-5xl sm:text-6xl font-extrabold text-indigo-400">
                    {currentItem.lower}
                  </span>
                )}
              </div>

              {/* Big 2D Cartoon Object Icon */}
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => speakCurrentLetter()}
                className="text-7xl sm:text-8xl my-3 filter drop-shadow-md cursor-pointer transition-transform select-none"
              >
                {currentItem.emoji}
              </motion.div>

              {/* Associated Object Word */}
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {localizedWord}
              </div>

              {/* Interactive Phonics Sound Bubble */}
              <button
                onClick={() => {
                  audio.playPhonicSound(currentItem.letter, currentItem.sound, currentItem.word, 'short');
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black cursor-pointer transition-all active:scale-95"
                title="Tap to hear short sound"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Short Sound: &ldquo;/{currentItem.sound}/&rdquo; (Tap to hear)</span>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Action Row: Listen letter, Listen phonics sound + Previous/Next navigation */}
          <div className="w-full mt-3 flex flex-col gap-2 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="btn-3d-white p-2.5 text-slate-700"
                title="Previous letter"
              >
                <ChevronLeft className="w-5 h-5 text-indigo-600" />
              </button>

              <button
                onClick={() => speakCurrentLetter()}
                className="btn-3d-amber flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-black"
                title="Hear letter & word"
              >
                <Volume2 className="w-4 h-4 text-amber-950" />
                <span>Hear &ldquo;{currentItem.letter}&rdquo;</span>
              </button>

              <button
                onClick={() => {
                  audio.playPhonicSound(currentItem.letter, currentItem.sound, currentItem.word, 'short');
                }}
                className="btn-3d-sky flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-black text-sky-950"
                title="Hear short sound"
              >
                <span>🔊 &ldquo;/{currentItem.sound}/&rdquo;</span>
              </button>

              {onGoToTracing && (
                <button
                  onClick={() => {
                    audio.playPop(1.1);
                    onGoToTracing(currentItem.letter);
                  }}
                  className="btn-3d-emerald flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-black text-emerald-950"
                  title="Practice tracing this letter"
                >
                  <span>✍️ Trace</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="btn-3d-white p-2.5 text-slate-700"
                title="Next letter"
              >
                <ChevronRight className="w-5 h-5 text-indigo-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Full 26 Letters A-Z Grid */}
      <div className="flex-1 bg-white/95 rounded-3xl p-4 sm:p-6 shadow-xl border-4 border-indigo-100 flex flex-col justify-between">
        <div>
          {/* Header & Explored Counter */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black text-slate-900">
                Tap Any Letter to Learn:
              </span>
              <span className="text-xs font-bold text-slate-500">
                (A to Z)
              </span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
              <span>{exploredLetters.length} / 26 Explored</span>
            </div>
          </div>

          {/* The 26 Letters Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2 sm:gap-3">
            {ABC_DATA.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const hasExplored = exploredLetters.includes(item.letter);

              return (
                <button
                  key={item.letter}
                  onClick={() => handleSelectLetter(idx)}
                  className={`relative h-16 sm:h-20 rounded-2xl flex flex-col items-center justify-center font-black transition-all active:scale-95 border-3 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-indigo-700 shadow-lg scale-105 z-10'
                      : 'bg-white hover:bg-indigo-50/70 text-slate-800 border-indigo-100 shadow-xs hover:border-indigo-300'
                  }`}
                >
                  {/* Explored check indicator */}
                  {hasExplored && !isSelected && (
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px]">
                      ✓
                    </div>
                  )}

                  {/* Letter Text */}
                  <span className={`text-xl sm:text-2xl ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                    {caseView === 'lower' ? item.lower : item.letter}
                  </span>

                  {/* Cute object thumbnail */}
                  <span className="text-sm sm:text-base filter drop-shadow-xs -mt-1 select-none">
                    {item.emoji}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mascot encouraging footer tip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3 bg-amber-50/60 rounded-2xl p-2.5 border border-amber-200">
          <MascotAvatar mascot="lion" size="sm" expression="happy" />
          <p className="text-xs font-bold text-amber-950 leading-tight">
            Leo says: &ldquo;Tap all 26 letters to hear their sounds and unlock your Alphabet Master star!&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
