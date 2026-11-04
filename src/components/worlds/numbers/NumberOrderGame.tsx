import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const NumberOrderGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak
}) => {
  const [targetSequence, setTargetSequence] = useState<number[]>([]);
  const [pool, setPool] = useState<number[]>([]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [wrongNumber, setWrongNumber] = useState<number | null>(null);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const getDifficulty = (age: string) => {
    switch (age) {
      case '0-1':
      case '1-2':
      case '2-3':
        return { count: 3, maxVal: 5 };
      case '3-4':
        return { count: 4, maxVal: 10 };
      case '4-5':
      default:
        return { count: 5, maxVal: 20 };
    }
  };

  const generateNewRound = () => {
    const { count, maxVal } = getDifficulty(ageGroup);
    const start = Math.floor(Math.random() * (maxVal - count + 1)) + 1;
    const seq = Array.from({ length: count }, (_, i) => start + i);

    // Scramble for the pool
    let scrambled = [...seq].sort(() => 0.5 - Math.random());
    // Ensure not accidentally already sorted
    if (JSON.stringify(scrambled) === JSON.stringify(seq)) {
      scrambled = scrambled.reverse();
    }

    setTargetSequence(seq);
    setPool(scrambled);
    setPlaced([]);
    setIsCompleted(false);
    setWrongNumber(null);
    setHintMessage('');
    setMascotMood('curious');

    setTimeout(() => {
      audio.playPop(1.1);
      audio.speak(`Put the numbers in order from smallest to biggest!`, currentLang);
    }, 200);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  const handleTapPoolNumber = (num: number) => {
    if (isCompleted) return;

    const nextRequired = targetSequence[placed.length];

    if (num === nextRequired) {
      // Correct number in sequence!
      const nextPlaced = [...placed, num];
      const nextPool = pool.filter((n, idx) => !(n === num && pool.indexOf(n) === idx));
      setPlaced(nextPlaced);
      setPool(nextPool);
      setWrongNumber(null);

      // Pitch rises with each step
      audio.playPop(0.9 + nextPlaced.length * 0.12);
      audio.speak(`${num}`, currentLang);

      if (nextPlaced.length === targetSequence.length) {
        setIsCompleted(true);
        setMascotMood('celebrating');
        audio.playCelebrationFanfare();
        onCorrectAnswer();
      } else {
        setMascotMood('excited');
      }
    } else {
      // Out of order
      setWrongNumber(num);
      setMascotMood('curious');
      audio.playGentleTryAgain();
      const hint = `Not quite! We need ${nextRequired} next!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);

      setTimeout(() => {
        setWrongNumber(null);
      }, 1000);
    }
  };

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    const nextRequired = targetSequence[placed.length];
    audio.speak(`Order from smallest to biggest. Look for number ${nextRequired}!`, currentLang);
  };

  const handleShowHint = () => {
    audio.playChime();
    const nextRequired = targetSequence[placed.length];
    const hint = `The next number is ${nextRequired}!`;
    setHintMessage(hint);
    audio.speak(hint, currentLang);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-5">
      {/* Top Header Card */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-amber-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} isAnimated />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Number Order Train
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
              Arrange numbers in order: Smallest &rarr; Largest
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
            title="New puzzle"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Number Track Slots (Where ordered numbers are placed) */}
      <div className="w-full bg-gradient-to-r from-amber-100/70 via-yellow-100/70 to-orange-100/70 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-md">
        <div className="text-xs sm:text-sm font-black text-amber-900 flex items-center justify-center gap-1.5 mb-4 uppercase tracking-wider">
          <span>Number Bridge</span>
          <ArrowRight className="w-4 h-4" />
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
          {targetSequence.map((_, idx) => {
            const hasPlaced = placed[idx] !== undefined;
            const placedVal = placed[idx];
            const isNextTargetSlot = idx === placed.length && !isCompleted;

            return (
              <motion.div
                key={idx}
                animate={isNextTargetSlot ? { scale: [1, 1.06, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl flex flex-col items-center justify-center font-black text-2xl sm:text-3xl border-3 transition-all relative ${
                  hasPlaced
                    ? 'bg-gradient-to-b from-amber-400 to-orange-400 text-white border-amber-600 shadow-md scale-105'
                    : isNextTargetSlot
                    ? 'bg-amber-200/80 border-dashed border-amber-500 text-amber-700 animate-pulse'
                    : 'bg-white/60 border-dashed border-amber-200 text-slate-300'
                }`}
              >
                {hasPlaced ? (
                  <span>{placedVal}</span>
                ) : (
                  <span className="text-sm font-bold text-slate-400">#{idx + 1}</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Success message */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-emerald-500 text-white rounded-2xl flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-200" />
                <span className="font-black text-sm sm:text-base">
                  Amazing! The Number Bridge is complete!
                </span>
              </div>
              <button
                onClick={generateNewRound}
                className="px-4 py-1.5 rounded-xl bg-white text-emerald-800 font-black text-xs sm:text-sm hover:bg-emerald-50 active:scale-95 shadow-xs"
              >
                Next Level &rarr;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Available Number Blocks (Scrambled) */}
      {!isCompleted && (
        <div className="w-full flex flex-col items-center gap-3">
          <span className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-wider">
            Tap the next number in order:
          </span>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {pool.map((num, idx) => {
              const isWrong = wrongNumber === num;
              return (
                <motion.button
                  key={`${num}-${idx}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleTapPoolNumber(num)}
                  className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl border-3 shadow-md transition-all ${
                    isWrong
                      ? 'bg-rose-100 border-rose-400 text-rose-700 animate-wiggle'
                      : 'bg-white hover:bg-amber-50 border-amber-300 text-amber-950 active:bg-amber-100'
                  }`}
                >
                  {num}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Hint */}
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
