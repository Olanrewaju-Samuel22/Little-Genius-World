import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Star,
  CheckCircle2,
  Crown
} from 'lucide-react';
import { NUMBERS_DATA, NumberItem, OBJECT_THEMES, getLocalizedNumberName } from './numbersData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  selectedNumber: number;
  onSelectNumber: (num: number) => void;
  onDiscoveredNumber: (num: number) => void;
  onCorrectAnswer: () => void;
}

export const NumberExplorer: React.FC<Props> = ({
  ageGroup,
  currentLang,
  selectedNumber,
  onSelectNumber,
  onDiscoveredNumber,
  onCorrectAnswer
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('stars');
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('happy');
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Maximum number visible in ribbon based on age group
  const maxNumberAllowed = 
    ageGroup === '0-1' || ageGroup === '1-2' ? 5 :
    ageGroup === '2-3' ? 10 : 20;

  const currentItem = NUMBERS_DATA.find(n => n.number === selectedNumber) || NUMBERS_DATA[0];
  const activeTheme = OBJECT_THEMES.find(t => t.id === selectedThemeId) || OBJECT_THEMES[1];
  const isAllTapped = tappedIndices.length === currentItem.number;

  // Speak number on change
  useEffect(() => {
    setTappedIndices([]);
    setMascotMood('curious');
    onDiscoveredNumber(currentItem.number);

    const timer = setTimeout(() => {
      speakNumberDetails();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedNumber, currentLang]);

  // Slideshow auto-advance for baby explorer mode
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        const next = selectedNumber >= maxNumberAllowed ? 1 : selectedNumber + 1;
        onSelectNumber(next);
      }, 4500);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, selectedNumber, maxNumberAllowed, onSelectNumber]);

  const speakNumberDetails = () => {
    const locName = getLocalizedNumberName(currentItem, currentLang);
    audio.playPop(1.0 + (currentItem.number * 0.03));
    audio.speak(`${currentItem.number}! ${locName}! ${currentItem.number} ${activeTheme.plural}!`, currentLang);
  };

  const handleTapObject = (index: number) => {
    if (!tappedIndices.includes(index)) {
      const next = [...tappedIndices, index];
      setTappedIndices(next);
      const count = next.length;

      // Play rising audio pitch for each counted item
      audio.playPop(0.9 + (count * 0.08));
      audio.speak(`${count}`, currentLang);

      if (count === currentItem.number) {
        setMascotMood('celebrating');
        audio.playStarDing();
        onCorrectAnswer();
      } else {
        setMascotMood('excited');
      }
    }
  };

  const handlePrev = () => {
    const prev = selectedNumber <= 1 ? maxNumberAllowed : selectedNumber - 1;
    onSelectNumber(prev);
    audio.playPop(0.95);
  };

  const handleNext = () => {
    const next = selectedNumber >= maxNumberAllowed ? 1 : selectedNumber + 1;
    onSelectNumber(next);
    audio.playPop(1.05);
  };

  const handleResetCount = () => {
    setTappedIndices([]);
    setMascotMood('curious');
    audio.playPop(1.0);
    speakNumberDetails();
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* 1. Number Selector Track */}
      <div className="w-full bg-white/80 backdrop-blur-xs p-3 rounded-3xl shadow-sm border-2 border-amber-200">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-xs sm:text-sm font-black text-amber-900 flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-amber-500" />
            Pick a Number (1 to {maxNumberAllowed}):
          </span>

          {/* Baby Explorer Sensory Slideshow Button */}
          {(ageGroup === '0-1' || ageGroup === '1-2') && (
            <button
              onClick={() => {
                setIsAutoPlaying(!isAutoPlaying);
                audio.playPop();
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                isAutoPlaying
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? 'Pause Sensory Mode' : 'Baby Sensory Tour'}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {NUMBERS_DATA.slice(0, maxNumberAllowed).map((item) => {
            const isSelected = item.number === selectedNumber;
            return (
              <motion.button
                key={item.number}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  setIsAutoPlaying(false);
                  onSelectNumber(item.number);
                }}
                className={`min-w-12 h-12 sm:min-w-14 sm:h-14 rounded-2xl font-black text-lg sm:text-2xl flex flex-col items-center justify-center shrink-0 border-2 transition-all shadow-xs ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white border-amber-600 scale-105 shadow-md shadow-amber-300'
                    : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span>{item.number}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Interactive Stage */}
      <div className="w-full max-w-3xl bg-white rounded-3xl p-5 sm:p-8 shadow-xl border-4 border-amber-300 relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-yellow-100/50 rounded-full blur-2xl pointer-events-none" />

        {/* Top Control Bar: Previous, Main Number Badge, Next */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold transition-transform active:scale-90 shadow-sm"
            aria-label="Previous number"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Central Hero Number Display */}
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              key={currentItem.number}
              initial={{ scale: 0.7, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br ${currentItem.bgGradient} flex flex-col items-center justify-center shadow-lg border-4 border-white text-white font-black`}
            >
              <span className="text-5xl sm:text-6xl drop-shadow-md leading-none">
                {currentItem.number}
              </span>
            </motion.div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
                  {currentItem.word}
                </h2>
                <button
                  onClick={speakNumberDetails}
                  className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center shadow-xs transition-transform active:scale-90"
                  aria-label="Pronounce number"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {currentLang !== 'en' && (
                <p className="text-base sm:text-lg font-bold text-amber-600">
                  {getLocalizedNumberName(currentItem, currentLang)}
                </p>
              )}

              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                {currentItem.fact}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold transition-transform active:scale-90 shadow-sm"
            aria-label="Next number"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>

        {/* 3. Object Theme Bar (Apples, Stars, Puppies, Cupcakes...) */}
        <div className="my-4 p-2 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-center justify-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-amber-900 shrink-0 hidden sm:inline">
            Count with:
          </span>
          {OBJECT_THEMES.map((theme) => {
            const isSelected = theme.id === selectedThemeId;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedThemeId(theme.id);
                  setTappedIndices([]);
                  audio.playPop(1.1);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-xs scale-105'
                    : 'bg-white text-slate-700 hover:bg-amber-100'
                }`}
              >
                <span>{theme.emoji}</span>
                <span className="hidden md:inline">{theme.name}</span>
              </button>
            );
          })}
        </div>

        {/* 4. Interactive Tap-to-Count Objects Field */}
        <div className="bg-gradient-to-b from-amber-50/50 to-orange-50/30 rounded-3xl p-4 sm:p-6 border-2 border-dashed border-amber-200 my-4 text-center">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-sm sm:text-base font-extrabold text-slate-700">
              Tap each {activeTheme.singular} to count up to {currentItem.number}!
            </span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-400 text-amber-950 rounded-full font-black text-sm">
                {tappedIndices.length} / {currentItem.number}
              </span>
              {tappedIndices.length > 0 && (
                <button
                  onClick={handleResetCount}
                  className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-transform active:scale-90"
                  title="Reset count"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Grid of animated objects */}
          <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 py-2 min-h-[160px]">
            {Array.from({ length: currentItem.number }).map((_, index) => {
              const isTapped = tappedIndices.includes(index);
              const tapOrder = tappedIndices.indexOf(index) + 1;

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleTapObject(index)}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all shadow-sm ${
                    isTapped
                      ? 'bg-gradient-to-br from-amber-300 to-yellow-400 border-3 border-amber-500 shadow-amber-300 scale-105'
                      : 'bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50/50'
                  }`}
                  aria-label={`${activeTheme.singular} ${index + 1}`}
                >
                  <motion.span
                    animate={isTapped ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTheme.emoji}
                  </motion.span>

                  {/* Number Badge appears upon tap */}
                  <AnimatePresence>
                    {isTapped && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center shadow-md border-2 border-white"
                      >
                        {tapOrder}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Celebration Banner when all items are counted */}
          <AnimatePresence>
            {isAllTapped && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-2xl flex items-center justify-between shadow-md"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 animate-spin text-yellow-200" />
                  <span className="font-black text-sm sm:text-base">
                    Hooray! You counted all {currentItem.number} {activeTheme.plural}!
                  </span>
                </div>
                <button
                  onClick={handleNext}
                  className="px-3.5 py-1.5 rounded-xl bg-white text-emerald-800 font-black text-xs sm:text-sm hover:bg-emerald-50 active:scale-95 shadow-sm"
                >
                  Next Number &rarr;
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. Friendly Mascot cheering at the bottom */}
        <div className="flex items-center justify-between pt-2 border-t border-amber-100">
          <div className="flex items-center gap-3">
            <MascotAvatar
              mascot="lion"
              size="md"
              expression={mascotMood}
              isAnimated
            />
            <p className="text-xs sm:text-sm font-bold text-amber-950">
              {isAllTapped
                ? `You're a counting star! Leo the Lion is so proud of you!`
                : `Tap every ${activeTheme.singular} to count up to ${currentItem.number}!`}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black text-amber-700 bg-amber-100/70 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Number {currentItem.number} of 20</span>
          </div>
        </div>
      </div>
    </div>
  );
};
