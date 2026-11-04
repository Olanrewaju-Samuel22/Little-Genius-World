import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle, Plus, Minus } from 'lucide-react';
import { OBJECT_THEMES } from './numbersData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const MathGardenGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak
}) => {
  const [numA, setNumA] = useState<number>(2);
  const [numB, setNumB] = useState<number>(3);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [options, setOptions] = useState<number[]>([]);
  const [currentTheme, setCurrentTheme] = useState(OBJECT_THEMES[0]);
  const [wrongOption, setWrongOption] = useState<number | null>(null);
  const [solved, setSolved] = useState<boolean>(false);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');

  const generateNewRound = () => {
    const isSubtractionAllowed = ageGroup === '4-5' || ageGroup === '3-4';
    const chosenOp: '+' | '-' = isSubtractionAllowed && Math.random() > 0.5 ? '-' : '+';
    const theme = OBJECT_THEMES[Math.floor(Math.random() * OBJECT_THEMES.length)];

    let a = 1;
    let b = 1;
    let correct = 2;

    if (chosenOp === '+') {
      const maxVal = ageGroup === '4-5' ? 7 : ageGroup === '3-4' ? 5 : 3;
      a = Math.floor(Math.random() * maxVal) + 1;
      b = Math.floor(Math.random() * maxVal) + 1;
      correct = a + b;
    } else {
      // Subtraction: a must be > b
      const maxVal = ageGroup === '4-5' ? 10 : 6;
      a = Math.floor(Math.random() * (maxVal - 3)) + 3;
      b = Math.floor(Math.random() * (a - 1)) + 1;
      correct = a - b;
    }

    // Generate distractor options
    const pool = new Set<number>();
    pool.add(correct);

    while (pool.size < 3) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      const candidate = correct + offset;
      if (candidate >= 1 && candidate !== correct) {
        pool.add(candidate);
      }
    }

    const shuffled = Array.from(pool).sort(() => 0.5 - Math.random());

    setNumA(a);
    setNumB(b);
    setOperation(chosenOp);
    setCurrentTheme(theme);
    setOptions(shuffled);
    setSolved(false);
    setWrongOption(null);
    setHintMessage('');
    setMascotMood('curious');

    setTimeout(() => {
      audio.playPop(1.1);
      if (chosenOp === '+') {
        audio.speak(`${a} ${theme.plural} plus ${b} ${theme.plural}. How many in total?`, currentLang);
      } else {
        audio.speak(`${a} ${theme.plural} minus ${b} ${theme.plural}. How many are left?`, currentLang);
      }
    }, 200);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  const handleSelectOption = (val: number) => {
    if (solved) return;

    const correct = operation === '+' ? numA + numB : numA - numB;

    if (val === correct) {
      setSolved(true);
      setWrongOption(null);
      setMascotMood('celebrating');
      audio.playPop(1.4);
      audio.playStarDing();
      audio.speak(`Brilliant! ${numA} ${operation === '+' ? 'plus' : 'minus'} ${numB} equals ${correct}!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateNewRound();
      }, 1600);
    } else {
      setWrongOption(val);
      setMascotMood('curious');
      audio.playGentleTryAgain();
      const hint = `Try counting the ${currentTheme.plural} one by one!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);

      setTimeout(() => {
        setWrongOption(null);
      }, 1200);
    }
  };

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    const correct = operation === '+' ? numA + numB : numA - numB;
    if (operation === '+') {
      audio.speak(`Add them together: ${numA} plus ${numB}!`, currentLang);
    } else {
      audio.speak(`Take away: ${numA} minus ${numB}!`, currentLang);
    }
  };

  const handleShowHint = () => {
    audio.playChime();
    const correct = operation === '+' ? numA + numB : numA - numB;
    if (operation === '+') {
      const hint = `Count group 1 (${numA}), then continue counting group 2 (${numB})!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);
    } else {
      const hint = `Start with ${numA} and take away ${numB}!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);
    }
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
                Math Garden: {operation === '+' ? 'Addition (+)' : 'Subtraction (−)'}
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
              {operation === '+' ? 'Combine the groups together' : 'Take away the crossed items'}
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
            title="New math problem"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Visual Equation Card */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 flex flex-col items-center">
        {/* Visual blocks */}
        <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 border-2 border-amber-200 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-3xl sm:text-4xl font-black text-amber-950">
            {/* Group A */}
            <div className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-2xl border-2 border-amber-200 shadow-xs min-w-[90px]">
              <div className="flex flex-wrap justify-center gap-1 mb-2 max-w-[120px]">
                {Array.from({ length: numA }).map((_, i) => (
                  <span key={i} className="text-2xl sm:text-3xl">
                    {currentTheme.emoji}
                  </span>
                ))}
              </div>
              <span className="text-3xl sm:text-4xl font-black text-amber-600">{numA}</span>
            </div>

            {/* Operator */}
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center font-black text-3xl shadow-sm">
              {operation === '+' ? '+' : '−'}
            </div>

            {/* Group B */}
            <div className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-2xl border-2 border-amber-200 shadow-xs min-w-[90px]">
              <div className="flex flex-wrap justify-center gap-1 mb-2 max-w-[120px]">
                {Array.from({ length: numB }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl sm:text-3xl relative ${
                      operation === '-' ? 'opacity-40 grayscale' : ''
                    }`}
                  >
                    {currentTheme.emoji}
                    {operation === '-' && (
                      <span className="absolute inset-0 flex items-center justify-center text-rose-600 font-black text-xl">
                        ✕
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <span className="text-3xl sm:text-4xl font-black text-amber-600">{numB}</span>
            </div>

            {/* Equals */}
            <span className="text-slate-400 text-4xl font-black">=</span>

            {/* Result Box */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-100 border-3 border-dashed border-amber-400 flex items-center justify-center shadow-inner">
              {solved ? (
                <span className="text-4xl sm:text-5xl font-black text-emerald-600 animate-pop">
                  {operation === '+' ? numA + numB : numA - numB}
                </span>
              ) : (
                <span className="text-3xl sm:text-4xl font-black text-amber-600">❓</span>
              )}
            </div>
          </div>
        </div>

        {/* Choice buttons */}
        <div className="w-full flex flex-col items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-wider">
            Choose the answer:
          </span>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-md">
            {options.map((opt) => {
              const isWrong = wrongOption === opt;
              const isCorrect = solved && opt === (operation === '+' ? numA + numB : numA - numB);

              return (
                <motion.button
                  key={opt}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleSelectOption(opt)}
                  className={`h-18 sm:h-20 rounded-2xl font-black text-3xl sm:text-4xl shadow-md border-3 transition-all ${
                    isCorrect
                      ? 'bg-emerald-500 border-white text-white scale-105 shadow-emerald-300'
                      : isWrong
                      ? 'bg-rose-100 border-rose-400 text-rose-700 animate-wiggle'
                      : 'bg-gradient-to-b from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 border-amber-500 text-amber-950'
                  }`}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Solved celebration note */}
        <AnimatePresence>
          {solved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-emerald-100 border-2 border-emerald-300 text-emerald-900 rounded-2xl flex items-center justify-center gap-2 font-black text-base"
            >
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>
                Awesome job! {numA} {operation} {numB} = {operation === '+' ? numA + numB : numA - numB}!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
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
