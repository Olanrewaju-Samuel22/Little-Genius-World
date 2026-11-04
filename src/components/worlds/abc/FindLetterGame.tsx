import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle } from 'lucide-react';
import { ABC_DATA, AbcItem } from './abcData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const FindLetterGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak
}) => {
  const [targetItem, setTargetItem] = useState<AbcItem>(() => ABC_DATA[0]);
  const [options, setOptions] = useState<AbcItem[]>([]);
  const [wrongClicked, setWrongClicked] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');

  // Number of options based on age group
  const getOptionCount = (age: string) => {
    if (age === '0-1' || age === '1-2') return 2;
    if (age === '2-3') return 3;
    return 4; // 3-4 & 4-5
  };

  const generateNewRound = () => {
    const nextTarget = ABC_DATA[Math.floor(Math.random() * ABC_DATA.length)];
    const count = getOptionCount(ageGroup);

    // Filter out target and pick (count - 1) distractor letters
    const pool = ABC_DATA.filter(i => i.letter !== nextTarget.letter);
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const choices = [nextTarget, ...shuffledPool.slice(0, count - 1)].sort(() => 0.5 - Math.random());

    setTargetItem(nextTarget);
    setOptions(choices);
    setWrongClicked(null);
    setMascotMood('curious');
    setHintMessage('');

    // Announce target
    setTimeout(() => {
      audio.playPop(1.1);
      audio.speak(`Find the letter ${nextTarget.letter}!`, currentLang);
    }, 150);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    audio.speak(`Find the letter ${targetItem.letter}!`, currentLang);
  };

  const handleChoiceClick = (choice: AbcItem) => {
    if (choice.letter === targetItem.letter) {
      // Correct!
      setMascotMood('celebrating');
      setHintMessage(`Superstar! That's ${choice.letter} for ${choice.word}!`);
      audio.playStarDing();
      onCorrectAnswer();

      // Advance to next after short delight animation
      setTimeout(() => {
        generateNewRound();
      }, 1200);
    } else {
      // Gentle hint, non-punitive
      setWrongClicked(choice.letter);
      setMascotMood('winking');
      setHintMessage(`That's letter ${choice.letter}! Look for ${targetItem.letter}.`);
      audio.playGentleTryAgain();
      audio.speak(`That's ${choice.letter}. Try finding ${targetItem.letter}!`, currentLang);

      setTimeout(() => {
        setWrongClicked(null);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full p-2 sm:p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-indigo-200 w-full text-center relative overflow-hidden">
        {/* Subtle top rainbow accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-indigo-400 via-sky-400 to-amber-400" />

        {/* Header Streak Badge & Refresh */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-black text-xs border border-amber-300 shadow-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
            <span>Streak: {streak} correct</span>
          </div>

          <button
            onClick={generateNewRound}
            className="btn-3d-white p-2 text-slate-700 flex items-center gap-1.5 text-xs font-black"
            title="Try another letter"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">New Letter</span>
          </button>
        </div>

        {/* Mascot & Question Prompt */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-2">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} />
          
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Can you find the letter:
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Tap the speaker to hear the letter sound again!
            </p>
          </div>
        </div>

        {/* Big Audio Prompt Target */}
        <div className="my-5 flex flex-col items-center">
          <button
            onClick={handleReplayPrompt}
            className="btn-3d-amber inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-xl sm:text-2xl font-black text-amber-950 shadow-md group"
            title="Replay Letter Sound"
          >
            <Volume2 className="w-6 h-6 text-amber-900 group-hover:scale-115 transition-transform" />
            <span>Letter &ldquo;{targetItem.letter}&rdquo;</span>
            <span className="text-2xl">{targetItem.emoji}</span>
          </button>

          {/* Gentle Hint Message if any */}
          {hintMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-200"
            >
              {hintMessage}
            </motion.div>
          )}
        </div>

        {/* Large Interactive Choice Buttons */}
        <div className={`grid ${options.length === 2 ? 'grid-cols-2' : options.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'} gap-4 mt-6`}>
          {options.map((choice) => {
            const isWrong = wrongClicked === choice.letter;

            return (
              <motion.button
                key={choice.letter}
                onClick={() => handleChoiceClick(choice)}
                animate={isWrong ? { x: [-10, 10, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`relative h-24 sm:h-28 rounded-3xl border-4 font-black transition-all active:scale-95 flex flex-col items-center justify-center shadow-md cursor-pointer ${
                  isWrong
                    ? 'bg-rose-50 border-rose-400 text-rose-800'
                    : 'bg-white hover:bg-indigo-50 border-indigo-200 hover:border-indigo-400 text-indigo-950 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl text-indigo-950 font-black">
                    {choice.letter}
                  </span>
                  <span className="text-xl sm:text-2xl text-indigo-400 font-extrabold">
                    {choice.lower}
                  </span>
                </div>

                {/* Object preview for toddlers */}
                <span className="text-base sm:text-lg filter drop-shadow-xs select-none">
                  {choice.emoji}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Footer encouragement */}
        <p className="mt-6 text-xs text-slate-400 font-semibold">
          Tap the big button above if you need Leo to repeat the sound!
        </p>
      </div>
    </div>
  );
};
