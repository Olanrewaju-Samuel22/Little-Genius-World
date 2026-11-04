import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle } from 'lucide-react';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const MissingNumberGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak
}) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [missingIndex, setMissingIndex] = useState<number>(2);
  const [missingValue, setMissingValue] = useState<number>(3);
  const [options, setOptions] = useState<number[]>([]);
  const [solved, setSolved] = useState<boolean>(false);
  const [wrongOption, setWrongOption] = useState<number | null>(null);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');

  const getDifficulty = (age: string) => {
    switch (age) {
      case '0-1':
      case '1-2':
      case '2-3':
        return { length: 4, maxStart: 2, optionCount: 3 };
      case '3-4':
        return { length: 4, maxStart: 6, optionCount: 3 };
      case '4-5':
      default:
        return { length: 5, maxStart: 15, optionCount: 4 };
    }
  };

  const generateNewRound = () => {
    const { length, maxStart, optionCount } = getDifficulty(ageGroup);
    const start = Math.floor(Math.random() * maxStart) + 1;
    const seq = Array.from({ length }, (_, i) => start + i);

    // Pick missing index (avoid the first one occasionally so toddlers have an anchor)
    const mIdx = Math.floor(Math.random() * (length - 1)) + 1;
    const mVal = seq[mIdx];

    // Generate distractor options
    const pool = new Set<number>();
    pool.add(mVal);

    while (pool.size < optionCount) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      const candidate = mVal + offset;
      if (candidate > 0 && candidate <= 25 && candidate !== mVal) {
        pool.add(candidate);
      }
    }

    const shuffledOptions = Array.from(pool).sort(() => 0.5 - Math.random());

    setSequence(seq);
    setMissingIndex(mIdx);
    setMissingValue(mVal);
    setOptions(shuffledOptions);
    setSolved(false);
    setWrongOption(null);
    setHintMessage('');
    setMascotMood('curious');

    setTimeout(() => {
      audio.playPop(1.1);
      audio.speak(`What number is missing from the train?`, currentLang);
    }, 200);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  const handleSelectOption = (opt: number) => {
    if (solved) return;

    if (opt === missingValue) {
      // Solved!
      setSolved(true);
      setWrongOption(null);
      setMascotMood('celebrating');
      audio.playPop(1.4);
      audio.playStarDing();
      audio.speak(`Choo choo! ${missingValue} completes the train!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateNewRound();
      }, 1600);
    } else {
      setWrongOption(opt);
      setMascotMood('curious');
      audio.playGentleTryAgain();
      const hint = `Try counting along: ${sequence.slice(0, missingIndex).join(', ')}... what comes next?`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);

      setTimeout(() => {
        setWrongOption(null);
      }, 1200);
    }
  };

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    audio.speak(`Find the missing number to help the train go!`, currentLang);
  };

  const handleShowHint = () => {
    audio.playChime();
    const prevNum = sequence[missingIndex - 1];
    const hint = `Count up from ${prevNum}! What comes right after ${prevNum}?`;
    setHintMessage(hint);
    audio.speak(hint, currentLang);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-5">
      {/* Top Bar */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-amber-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} isAnimated />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Number Train: Missing Number
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
              Which number belongs in the glowing mystery train wagon?
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

      {/* The Number Train Track */}
      <div className="w-full bg-gradient-to-b from-sky-100 to-amber-50 rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 relative overflow-hidden text-center">
        {/* Soft background railway tracks */}
        <div className="absolute bottom-6 left-0 right-0 h-4 bg-amber-700/20 border-t-2 border-b-2 border-amber-800/40" />

        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-6 relative z-10">
          {/* Locomotive Engine */}
          <div className="flex flex-col items-center shrink-0">
            <span className="text-4xl sm:text-5xl filter drop-shadow-md">🚂</span>
            <div className="flex gap-1 mt-1">
              <span className="w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-900" />
              <span className="w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-900" />
            </div>
          </div>

          {/* Wagons */}
          {sequence.map((num, idx) => {
            const isMissing = idx === missingIndex;
            return (
              <div key={idx} className="flex flex-col items-center shrink-0">
                <motion.div
                  animate={
                    isMissing && solved
                      ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }
                      : isMissing
                      ? { y: [0, -4, 0] }
                      : {}
                  }
                  transition={{ repeat: isMissing && !solved ? Infinity : 0, duration: 2 }}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl flex flex-col items-center justify-center font-black text-2xl sm:text-3xl border-3 shadow-md relative ${
                    isMissing
                      ? solved
                        ? 'bg-emerald-400 border-emerald-600 text-white shadow-emerald-300'
                        : 'bg-amber-200/80 border-dashed border-amber-500 text-amber-800 animate-pulse'
                      : 'bg-white border-amber-400 text-slate-800 shadow-sm'
                  }`}
                >
                  {isMissing ? (
                    solved ? (
                      <span>{missingValue}</span>
                    ) : (
                      <span className="text-3xl font-black text-amber-600">❓</span>
                    )
                  ) : (
                    <span>{num}</span>
                  )}

                  {/* Wagon Roof stripe */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-amber-400/50 rounded-t-xl" />
                </motion.div>

                {/* Wagon Wheels */}
                <div className="flex gap-3 mt-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-amber-400" />
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-amber-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Celebration Banner */}
        <AnimatePresence>
          {solved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full font-black text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>Choo Choo! Train is ready to roll!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Choice Balloons */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-wider">
          Tap the missing number balloon:
        </span>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {options.map((opt) => {
            const isWrong = wrongOption === opt;
            const isCorrect = solved && opt === missingValue;

            return (
              <motion.button
                key={opt}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSelectOption(opt)}
                className={`w-18 h-22 sm:w-22 sm:h-26 rounded-3xl flex flex-col items-center justify-center font-black text-3xl sm:text-4xl shadow-lg border-4 transition-all relative ${
                  isCorrect
                    ? 'bg-emerald-500 border-white text-white scale-110 shadow-emerald-300'
                    : isWrong
                    ? 'bg-rose-100 border-rose-400 text-rose-700 animate-wiggle'
                    : 'bg-gradient-to-b from-amber-300 via-amber-400 to-orange-400 border-white text-amber-950 hover:brightness-105'
                }`}
              >
                <span>{opt}</span>
                {/* Balloon knot string */}
                <span className="text-xs opacity-70 mt-1">🎈</span>
              </motion.button>
            );
          })}
        </div>
      </div>

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
