import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check } from 'lucide-react';
import { ABC_DATA, AbcItem } from './abcData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const CaseMatchGame: React.FC<Props> = ({
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

  const getOptionCount = (age: string) => {
    if (age === '0-1' || age === '1-2') return 2;
    if (age === '2-3') return 3;
    return 4;
  };

  const generateRound = () => {
    const nextTarget = ABC_DATA[Math.floor(Math.random() * ABC_DATA.length)];
    const count = getOptionCount(ageGroup);
    const pool = ABC_DATA.filter(i => i.letter !== nextTarget.letter);
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const choices = [nextTarget, ...shuffledPool.slice(0, count - 1)].sort(() => 0.5 - Math.random());

    setTargetItem(nextTarget);
    setOptions(choices);
    setWrongClicked(null);
    setMascotMood('curious');
    setHintMessage('');

    setTimeout(() => {
      audio.playPop(1.1);
      audio.speak(`Find the lowercase partner for uppercase ${nextTarget.letter}!`, currentLang);
    }, 150);
  };

  useEffect(() => {
    generateRound();
  }, [ageGroup]);

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    audio.speak(`Find the lowercase partner for uppercase ${targetItem.letter}!`, currentLang);
  };

  const handleChoiceClick = (choice: AbcItem) => {
    if (choice.letter === targetItem.letter) {
      setMascotMood('celebrating');
      setHintMessage(`Awesome! Big ${targetItem.letter} and little ${targetItem.lower} match!`);
      audio.playStarDing();
      audio.speak(`Big ${targetItem.letter} and small ${targetItem.lower}! Perfect!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateRound();
      }, 1200);
    } else {
      setWrongClicked(choice.lower);
      setMascotMood('winking');
      setHintMessage(`That's lowercase "${choice.lower}" for ${choice.letter}. Look for "${targetItem.lower}"!`);
      audio.playGentleTryAgain();
      audio.speak(`That's little ${choice.lower}. Try finding little ${targetItem.lower}!`, currentLang);

      setTimeout(() => {
        setWrongClicked(null);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full p-2 sm:p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-purple-200 w-full text-center relative overflow-hidden">
        {/* Top purple accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400" />

        {/* Header Streak Badge & Refresh */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-black text-xs border border-amber-300 shadow-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
            <span>Streak: {streak} correct</span>
          </div>

          <button
            onClick={generateRound}
            className="btn-3d-white p-2 text-slate-700 flex items-center gap-1.5 text-xs font-black"
            title="Try another pair"
          >
            <RefreshCw className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">New Pair</span>
          </button>
        </div>

        {/* Mascot & Challenge Prompt */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-2">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} />
          
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Match Uppercase & Lowercase
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Find the little letter partner for Big &ldquo;{targetItem.letter}&rdquo;!
            </p>
          </div>
        </div>

        {/* Target Big Uppercase Letter Display */}
        <div className="my-5 flex flex-col items-center">
          <button
            onClick={handleReplayPrompt}
            className="btn-3d-amber inline-flex items-center gap-4 px-8 py-3.5 rounded-3xl text-4xl sm:text-5xl font-black text-amber-950 shadow-md group"
            title="Replay Prompt"
          >
            <Volume2 className="w-7 h-7 text-amber-900 group-hover:scale-115 transition-transform" />
            <span>Big &ldquo;{targetItem.letter}&rdquo;</span>
            <span className="text-3xl filter drop-shadow-xs">{targetItem.emoji}</span>
          </button>

          {hintMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs sm:text-sm font-bold text-purple-900 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200"
            >
              {hintMessage}
            </motion.div>
          )}
        </div>

        {/* Lowercase Option Choices */}
        <div className={`grid ${options.length === 2 ? 'grid-cols-2' : options.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'} gap-4 mt-6`}>
          {options.map((choice) => {
            const isWrong = wrongClicked === choice.lower;

            return (
              <motion.button
                key={choice.letter}
                onClick={() => handleChoiceClick(choice)}
                animate={isWrong ? { x: [-10, 10, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`relative h-24 sm:h-28 rounded-3xl border-4 font-black transition-all active:scale-95 flex flex-col items-center justify-center p-2 shadow-md cursor-pointer ${
                  isWrong
                    ? 'bg-rose-50 border-rose-400 text-rose-800'
                    : 'bg-white hover:bg-purple-50/70 border-purple-200 hover:border-purple-400 text-purple-950 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <span className="text-4xl sm:text-5xl text-purple-900 font-black">
                  {choice.lower}
                </span>
                <span className="text-xs font-bold text-slate-400 mt-0.5">
                  small {choice.lower}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
