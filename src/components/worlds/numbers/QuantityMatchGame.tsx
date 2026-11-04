import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle } from 'lucide-react';
import { OBJECT_THEMES } from './numbersData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

interface OptionPlate {
  count: number;
  id: number;
}

export const QuantityMatchGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak
}) => {
  const [targetNumber, setTargetNumber] = useState<number>(3);
  const [currentTheme, setCurrentTheme] = useState(OBJECT_THEMES[0]);
  const [plates, setPlates] = useState<OptionPlate[]>([]);
  const [selectedPlateId, setSelectedPlateId] = useState<number | null>(null);
  const [wrongPlateId, setWrongPlateId] = useState<number | null>(null);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');

  const getDifficulty = (age: string): { maxNum: number; optionCount: number } => {
    switch (age) {
      case '0-1':
      case '1-2':
        return { maxNum: 3, optionCount: 2 };
      case '2-3':
        return { maxNum: 5, optionCount: 3 };
      case '3-4':
        return { maxNum: 10, optionCount: 3 };
      case '4-5':
      default:
        return { maxNum: 15, optionCount: 4 };
    }
  };

  const generateNewRound = () => {
    const { maxNum, optionCount } = getDifficulty(ageGroup);
    const target = Math.floor(Math.random() * maxNum) + 1;
    const theme = OBJECT_THEMES[Math.floor(Math.random() * OBJECT_THEMES.length)];

    // Generate unique distractor counts
    const distractors: number[] = [];
    while (distractors.length < optionCount - 1) {
      const candidate = Math.floor(Math.random() * maxNum) + 1;
      if (candidate !== target && !distractors.includes(candidate)) {
        distractors.push(candidate);
      }
    }

    const allCounts = [target, ...distractors].sort(() => 0.5 - Math.random());
    const newPlates = allCounts.map((count, index) => ({
      count,
      id: index,
    }));

    setTargetNumber(target);
    setCurrentTheme(theme);
    setPlates(newPlates);
    setSelectedPlateId(null);
    setWrongPlateId(null);
    setHintMessage('');
    setMascotMood('curious');

    setTimeout(() => {
      audio.playPop(1.1);
      audio.speak(`Which basket has ${target} ${target === 1 ? theme.singular : theme.plural}?`, currentLang);
    }, 200);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  const handleSelectPlate = (plate: OptionPlate) => {
    if (selectedPlateId !== null) return; // already solved

    if (plate.count === targetNumber) {
      // Correct!
      setSelectedPlateId(plate.id);
      setWrongPlateId(null);
      setMascotMood('celebrating');
      audio.playPop(1.3);
      audio.playStarDing();
      audio.speak(`Yes! ${targetNumber} ${currentTheme.plural}!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateNewRound();
      }, 1600);
    } else {
      // Wrong plate - gentle hint
      setWrongPlateId(plate.id);
      setMascotMood('curious');
      audio.playGentleTryAgain();
      const hint = `That basket has ${plate.count} ${plate.count === 1 ? currentTheme.singular : currentTheme.plural}. Find ${targetNumber}!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);

      setTimeout(() => {
        setWrongPlateId(null);
      }, 1200);
    }
  };

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    audio.speak(`Find the basket with ${targetNumber} ${currentTheme.plural}!`, currentLang);
  };

  const handleShowHint = () => {
    audio.playChime();
    setHintMessage(`Count the items inside each basket slowly!`);
    audio.speak(`Count the items inside each basket slowly to find ${targetNumber}!`, currentLang);
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
                Match Quantity: <span className="text-amber-600">{targetNumber} {currentTheme.plural}</span>
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
              Tap the basket that contains exactly <strong>{targetNumber}</strong> items
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

      {/* Target Number Display Banner */}
      <motion.div
        key={targetNumber}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 shadow-lg border-4 border-white flex items-center justify-center gap-4 text-white"
      >
        <span className="text-5xl sm:text-6xl font-black drop-shadow-md">
          {targetNumber}
        </span>
        <div className="text-left">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100">
            Target Quantity
          </span>
          <h3 className="text-2xl sm:text-3xl font-black drop-shadow-sm">
            {currentTheme.name}
          </h3>
        </div>
        <span className="text-4xl sm:text-5xl">{currentTheme.emoji}</span>
      </motion.div>

      {/* Basket Choices Grid */}
      <div className={`w-full grid gap-4 ${
        plates.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
        plates.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
      }`}>
        {plates.map((plate) => {
          const isSelected = selectedPlateId === plate.id;
          const isWrong = wrongPlateId === plate.id;

          return (
            <motion.button
              key={plate.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleSelectPlate(plate)}
              className={`min-h-[170px] sm:min-h-[200px] rounded-3xl p-4 flex flex-col items-center justify-between border-4 transition-all shadow-md relative overflow-hidden ${
                isSelected
                  ? 'bg-emerald-100 border-emerald-500 shadow-emerald-200 scale-105'
                  : isWrong
                  ? 'bg-rose-100 border-rose-400 shadow-rose-200 animate-wiggle'
                  : 'bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50/50'
              }`}
            >
              {/* Basket rim indicator */}
              <div className="w-full text-center pb-1 border-b border-dashed border-amber-200">
                <span className="text-xs font-black text-amber-800">
                  🧺 Basket
                </span>
              </div>

              {/* Items inside basket */}
              <div className="flex-1 flex flex-wrap items-center justify-center gap-1.5 py-3 max-w-[180px]">
                {Array.from({ length: plate.count }).map((_, i) => (
                  <motion.span
                    key={i}
                    animate={isSelected ? { y: [0, -6, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
                    className="text-2xl sm:text-3xl filter drop-shadow-xs"
                  >
                    {currentTheme.emoji}
                  </motion.span>
                ))}
              </div>

              {/* Status footer on plate */}
              <div className="w-full pt-1">
                {isSelected ? (
                  <div className="flex items-center justify-center gap-1 text-emerald-700 font-black text-sm">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{plate.count} {currentTheme.plural}!</span>
                  </div>
                ) : (
                  <div className="text-center text-xs font-bold text-slate-400">
                    Tap to check
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Hint Banner */}
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
