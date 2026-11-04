import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle, Trophy } from 'lucide-react';
import { OBJECT_THEMES } from './numbersData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

interface ScatteredItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export const TapToCountGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak
}) => {
  const [targetCount, setTargetCount] = useState<number>(3);
  const [currentTheme, setCurrentTheme] = useState(OBJECT_THEMES[0]);
  const [items, setItems] = useState<ScatteredItem[]>([]);
  const [tappedItemIds, setTappedItemIds] = useState<number[]>([]);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Determine target count range by age
  const getTargetRange = (age: string): { min: number; max: number } => {
    switch (age) {
      case '0-1':
      case '1-2':
        return { min: 1, max: 3 };
      case '2-3':
        return { min: 2, max: 5 };
      case '3-4':
        return { min: 3, max: 10 };
      case '4-5':
      default:
        return { min: 5, max: 15 };
    }
  };

  const generateNewRound = () => {
    const range = getTargetRange(ageGroup);
    const count = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    const theme = OBJECT_THEMES[Math.floor(Math.random() * OBJECT_THEMES.length)];

    // Generate balanced random positions
    const newItems: ScatteredItem[] = [];
    const cols = Math.ceil(Math.sqrt(count * 1.5));
    const rows = Math.ceil(count / cols);

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jitterX = (Math.random() - 0.5) * 8;
      const jitterY = (Math.random() - 0.5) * 8;
      const x = Math.min(88, Math.max(12, ((col + 0.5) / cols) * 100 + jitterX));
      const y = Math.min(85, Math.max(15, ((row + 0.5) / rows) * 100 + jitterY));

      newItems.push({
        id: i,
        x,
        y,
        rotation: (Math.random() - 0.5) * 20,
        scale: 0.95 + Math.random() * 0.15,
      });
    }

    setTargetCount(count);
    setCurrentTheme(theme);
    setItems(newItems);
    setTappedItemIds([]);
    setIsCompleted(false);
    setHintMessage('');
    setMascotMood('curious');

    setTimeout(() => {
      audio.playPop(1.1);
      audio.speak(`Can you tap and count ${count} ${count === 1 ? theme.singular : theme.plural}?`, currentLang);
    }, 200);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  const handleTap = (id: number) => {
    if (tappedItemIds.includes(id) || isCompleted) return;

    const nextTapped = [...tappedItemIds, id];
    setTappedItemIds(nextTapped);
    const countSoFar = nextTapped.length;

    // Rising chime and number vocalization
    audio.playPop(0.9 + countSoFar * 0.08);
    audio.speak(`${countSoFar}`, currentLang);

    if (countSoFar === targetCount) {
      setIsCompleted(true);
      setMascotMood('celebrating');
      audio.playCelebrationFanfare();
      onCorrectAnswer();
    } else {
      setMascotMood('excited');
    }
  };

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    audio.speak(
      `Count the ${currentTheme.plural}! Tap each one. You have counted ${tappedItemIds.length} out of ${targetCount}!`,
      currentLang
    );
  };

  const handleShowHint = () => {
    audio.playChime();
    setMascotMood('curious');
    const remaining = targetCount - tappedItemIds.length;
    setHintMessage(`Look for ${remaining} more ${remaining === 1 ? currentTheme.singular : currentTheme.plural} to tap!`);
    audio.speak(`Tap ${remaining} more to reach ${targetCount}!`, currentLang);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-4">
      {/* Top Game Bar */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-amber-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} isAnimated />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Tap and Count: <span className="text-amber-600">{targetCount} {currentTheme.plural}</span>
              </h2>
              <button
                onClick={handleReplayPrompt}
                className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center transition-transform active:scale-90"
                aria-label="Repeat instructions"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Counted: <strong className="text-amber-600 font-black">{tappedItemIds.length}</strong> of {targetCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {streak > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Streak: {streak}</span>
            </div>
          )}
          <button
            onClick={generateNewRound}
            className="p-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-transform active:scale-90"
            title="New challenge"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Play Area / Meadow */}
      <div className="w-full h-80 sm:h-96 bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 rounded-3xl shadow-lg border-4 border-amber-300 relative overflow-hidden select-none">
        {/* Soft background clouds & flowers */}
        <div className="absolute top-4 left-6 text-2xl opacity-60 pointer-events-none">☁️</div>
        <div className="absolute top-8 right-10 text-3xl opacity-60 pointer-events-none">☁️</div>
        <div className="absolute bottom-2 left-8 text-xl opacity-70 pointer-events-none">🌼</div>
        <div className="absolute bottom-3 right-12 text-xl opacity-70 pointer-events-none">🌷</div>

        {/* Scattered interactive objects */}
        {items.map((item) => {
          const isTapped = tappedItemIds.includes(item.id);
          const tapOrder = tappedItemIds.indexOf(item.id) + 1;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleTap(item.id)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              animate={isTapped ? { scale: [1, 1.2, 1] } : { y: [0, -4, 0] }}
              transition={
                isTapped
                  ? { duration: 0.3 }
                  : { repeat: Infinity, duration: 2.5 + (item.id % 3) * 0.4, ease: 'easeInOut' }
              }
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all shadow-md ${
                isTapped
                  ? 'bg-gradient-to-br from-amber-400 to-yellow-300 border-3 border-amber-500 scale-105'
                  : 'bg-white/95 border-2 border-amber-200 hover:border-amber-400 hover:bg-white'
              }`}
            >
              <span>{currentTheme.emoji}</span>

              {/* Number Badge */}
              {isTapped && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center shadow-md border-2 border-white"
                >
                  {tapOrder}
                </motion.div>
              )}
            </motion.button>
          );
        })}

        {/* Floating Success Overlay */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-10"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg border-4 border-white mb-3 text-4xl"
              >
                🏆
              </motion.div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1">
                Super Counter!
              </h3>
              <p className="text-base sm:text-lg font-bold text-emerald-600 mb-4">
                You tapped and counted all {targetCount} {currentTheme.plural}!
              </p>

              <button
                onClick={generateNewRound}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg shadow-lg shadow-amber-300 transition-transform active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-200" />
                <span>Next Counting Quest</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Hint / Action row */}
      <div className="w-full flex items-center justify-between text-xs sm:text-sm">
        <button
          onClick={handleShowHint}
          className="flex items-center gap-1.5 text-amber-700 font-bold hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200"
        >
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>Need a hint?</span>
        </button>

        {hintMessage && (
          <span className="font-extrabold text-amber-900 bg-amber-100 px-3 py-1 rounded-xl">
            {hintMessage}
          </span>
        )}
      </div>
    </div>
  );
};
