import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ABC_DATA, AbcItem } from './abcData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

// Select a curated set of clear, short words for preschoolers & kindergarteners
const PHONICS_WORDS: AbcItem[] = ABC_DATA.filter(item => 
  ['A', 'B', 'C', 'D', 'F', 'H', 'L', 'N', 'P', 'R', 'S', 'T', 'W', 'Z'].includes(item.letter)
);

export const WordBuilderGame: React.FC<Props> = ({
  currentLang,
  onCorrectAnswer,
  streak
}) => {
  const [targetItem, setTargetItem] = useState<AbcItem>(() => PHONICS_WORDS[2]); // C - CAT
  const [options, setOptions] = useState<AbcItem[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [wrongClicked, setWrongClicked] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');

  const generateRound = () => {
    const nextTarget = PHONICS_WORDS[Math.floor(Math.random() * PHONICS_WORDS.length)];
    const pool = ABC_DATA.filter(i => i.letter !== nextTarget.letter);
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const choices = [nextTarget, ...shuffledPool.slice(0, 3)].sort(() => 0.5 - Math.random());

    setTargetItem(nextTarget);
    setOptions(choices);
    setIsAnswered(false);
    setWrongClicked(null);
    setMascotMood('curious');
    setHintMessage('');

    setTimeout(() => {
      audio.playPop(1.1);
      audio.speak(`What is the first letter in ${nextTarget.word}?`, currentLang);
    }, 150);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    audio.speak(`What letter is missing in ${targetItem.word}? ${targetItem.word} starts with which letter?`, currentLang);
  };

  const handleChoiceClick = (choice: AbcItem) => {
    if (isAnswered) return;

    if (choice.letter === targetItem.letter) {
      setIsAnswered(true);
      setMascotMood('celebrating');
      setHintMessage(`Hooray! ${choice.letter} for ${targetItem.word}!`);
      audio.playStarDing();
      audio.speak(`Yes! ${choice.letter} is for ${targetItem.word}!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateRound();
      }, 1500);
    } else {
      setWrongClicked(choice.letter);
      setMascotMood('winking');
      setHintMessage(`"${choice.letter}" doesn't start ${targetItem.word}. Try letter ${targetItem.letter}!`);
      audio.playGentleTryAgain();
      audio.speak(`That's letter ${choice.letter}. What letter starts ${targetItem.word}?`, currentLang);

      setTimeout(() => {
        setWrongClicked(null);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full p-2 sm:p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-emerald-200 w-full text-center relative overflow-hidden">
        {/* Top green accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

        {/* Header Streak Badge & Refresh */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-black text-xs border border-amber-300 shadow-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
            <span>Streak: {streak} correct</span>
          </div>

          <button
            onClick={generateRound}
            className="btn-3d-white p-2 text-slate-700 flex items-center gap-1.5 text-xs font-black"
            title="Try another word"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">New Word</span>
          </button>
        </div>

        {/* Mascot & Challenge Prompt */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-2">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} />
          
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Phonics Word Builder
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Fill in the missing first letter to spell the word!
            </p>
          </div>
        </div>

        {/* Target Word Display with Missing Letter */}
        <div className="my-5 flex flex-col items-center">
          <button
            onClick={handleReplayPrompt}
            className="btn-3d-white inline-flex items-center gap-5 px-6 sm:px-8 py-4 rounded-3xl shadow-md border-emerald-300 group"
            title="Hear Word Prompt"
          >
            <span className="text-5xl sm:text-6xl filter drop-shadow-xs select-none">
              {targetItem.emoji}
            </span>

            {/* Word Letter Slots */}
            <div className="flex items-center gap-2">
              {/* Missing first letter slot */}
              <div className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl border-4 flex items-center justify-center text-3xl sm:text-4xl font-black transition-all ${
                isAnswered
                  ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                  : 'bg-emerald-50 border-dashed border-emerald-400 text-emerald-600 animate-pulse'
              }`}>
                {isAnswered ? targetItem.letter : '?'}
              </div>

              {/* Remainder of the word */}
              <div className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wider">
                {targetItem.fullWord.slice(1)}
              </div>

              <Volume2 className="w-6 h-6 text-emerald-600 ml-2 group-hover:scale-115 transition-transform" />
            </div>
          </button>

          {hintMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200"
            >
              {hintMessage}
            </motion.div>
          )}
        </div>

        {/* Choice Letter Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {options.map((choice) => {
            const isWrong = wrongClicked === choice.letter;
            const isTarget = isAnswered && choice.letter === targetItem.letter;

            return (
              <motion.button
                key={choice.letter}
                onClick={() => handleChoiceClick(choice)}
                animate={isWrong ? { x: [-10, 10, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                disabled={isAnswered}
                className={`relative h-24 sm:h-28 rounded-3xl border-4 font-black transition-all active:scale-95 flex flex-col items-center justify-center p-2 shadow-md cursor-pointer ${
                  isTarget
                    ? 'bg-emerald-500 border-emerald-600 text-white scale-105'
                    : isWrong
                    ? 'bg-rose-50 border-rose-400 text-rose-800'
                    : 'bg-white hover:bg-emerald-50/70 border-emerald-200 hover:border-emerald-400 text-slate-900 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-emerald-950">
                    {choice.letter}
                  </span>
                  <span className="text-2xl text-emerald-600 font-extrabold">
                    {choice.lower}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400 mt-1">
                  ({choice.sound})
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
