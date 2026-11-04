import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles } from 'lucide-react';
import { ABC_DATA, AbcItem } from './abcData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const MatchObjectGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak
}) => {
  // Mode can alternate between:
  // 'letter-to-object' (Given letter -> pick object)
  // 'object-to-letter' (Given object -> pick letter)
  const [mode, setMode] = useState<'letter-to-object' | 'object-to-letter'>('letter-to-object');
  const [targetItem, setTargetItem] = useState<AbcItem>(() => ABC_DATA[2]); // C - Cat
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

    // Alternate question style occasionally
    const nextMode = Math.random() > 0.5 ? 'letter-to-object' : 'object-to-letter';

    setMode(nextMode);
    setTargetItem(nextTarget);
    setOptions(choices);
    setWrongClicked(null);
    setMascotMood('curious');
    setHintMessage('');

    const targetWord =
      currentLang === 'yo'
        ? nextTarget.yo
        : currentLang === 'ha'
        ? nextTarget.ha
        : currentLang === 'ig'
        ? nextTarget.ig
        : nextTarget.word;

    setTimeout(() => {
      audio.playPop(1.1);
      if (nextMode === 'letter-to-object') {
        audio.speak(`${nextTarget.letter} is for what? Find the picture for ${nextTarget.letter}!`, currentLang);
      } else {
        audio.speak(`What letter does ${targetWord} start with?`, currentLang);
      }
    }, 150);
  };

  useEffect(() => {
    generateRound();
  }, [ageGroup]);

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    const targetWord =
      currentLang === 'yo'
        ? targetItem.yo
        : currentLang === 'ha'
        ? targetItem.ha
        : currentLang === 'ig'
        ? targetItem.ig
        : targetItem.word;

    if (mode === 'letter-to-object') {
      audio.speak(`Find the object that starts with letter ${targetItem.letter}!`, currentLang);
    } else {
      audio.speak(`What letter does ${targetWord} start with?`, currentLang);
    }
  };

  const handleChoiceClick = (choice: AbcItem) => {
    if (choice.letter === targetItem.letter) {
      setMascotMood('celebrating');
      const targetWord =
        currentLang === 'yo'
          ? targetItem.yo
          : currentLang === 'ha'
          ? targetItem.ha
          : currentLang === 'ig'
          ? targetItem.ig
          : targetItem.word;

      setHintMessage(`Brilliant! ${targetItem.letter} is for ${targetWord}!`);
      audio.playStarDing();
      audio.speak(`Yes! ${targetItem.letter} is for ${targetWord}!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateRound();
      }, 1300);
    } else {
      setWrongClicked(choice.letter);
      setMascotMood('winking');
      const choiceWord =
        currentLang === 'yo'
          ? choice.yo
          : currentLang === 'ha'
          ? choice.ha
          : currentLang === 'ig'
          ? choice.ig
          : choice.word;

      setHintMessage(`${choice.emoji} ${choiceWord} starts with ${choice.letter}. Try again!`);
      audio.playGentleTryAgain();
      audio.speak(`That's ${choiceWord}, starting with ${choice.letter}. Try again!`, currentLang);

      setTimeout(() => {
        setWrongClicked(null);
      }, 1500);
    }
  };

  const localizedTargetWord =
    currentLang === 'yo'
      ? targetItem.yo
      : currentLang === 'ha'
      ? targetItem.ha
      : currentLang === 'ig'
      ? targetItem.ig
      : targetItem.word;

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full p-2 sm:p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-200 w-full text-center relative overflow-hidden">
        {/* Top amber accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

        {/* Header Streak Badge & Refresh */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-black text-xs border border-amber-300 shadow-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
            <span>Streak: {streak} correct</span>
          </div>

          <button
            onClick={generateRound}
            className="btn-3d-white p-2 text-slate-700 flex items-center gap-1.5 text-xs font-black"
            title="Try another challenge"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Shuffle</span>
          </button>
        </div>

        {/* Mascot & Challenge Prompt */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-2">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} />
          
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'letter-to-object'
                ? `Which object starts with "${targetItem.letter}"?`
                : `What letter does this start with?`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Match the magic letter to the right friend!
            </p>
          </div>
        </div>

        {/* Big Spotlight Display for Prompt */}
        <div className="my-5 flex flex-col items-center">
          {mode === 'letter-to-object' ? (
            <button
              onClick={handleReplayPrompt}
              className="btn-3d-amber inline-flex items-center gap-3 px-8 py-3 rounded-3xl text-3xl sm:text-4xl font-black text-amber-950 shadow-md group"
              title="Hear Letter"
            >
              <Volume2 className="w-7 h-7 text-amber-900 group-hover:scale-115 transition-transform" />
              <span>{targetItem.letter}</span>
              <span className="text-2xl text-amber-800 font-extrabold">{targetItem.lower}</span>
            </button>
          ) : (
            <button
              onClick={handleReplayPrompt}
              className="btn-3d-white inline-flex items-center gap-4 px-8 py-3 rounded-3xl text-2xl sm:text-3xl font-black text-slate-900 shadow-md group border-amber-300"
              title="Hear Object"
            >
              <span className="text-5xl filter drop-shadow-xs">{targetItem.emoji}</span>
              <div className="text-left">
                <span className="block text-xl sm:text-2xl">{localizedTargetWord}</span>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" /> Tap to hear
                </span>
              </div>
            </button>
          )}

          {hintMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs sm:text-sm font-bold text-amber-900 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200"
            >
              {hintMessage}
            </motion.div>
          )}
        </div>

        {/* Choice Cards */}
        <div className={`grid ${options.length === 2 ? 'grid-cols-2' : options.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'} gap-4 mt-6`}>
          {options.map((choice) => {
            const isWrong = wrongClicked === choice.letter;
            const choiceWord =
              currentLang === 'yo'
                ? choice.yo
                : currentLang === 'ha'
                ? choice.ha
                : currentLang === 'ig'
                ? choice.ig
                : choice.word;

            return (
              <motion.button
                key={choice.letter}
                onClick={() => handleChoiceClick(choice)}
                animate={isWrong ? { x: [-10, 10, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`relative h-28 sm:h-32 rounded-3xl border-4 font-black transition-all active:scale-95 flex flex-col items-center justify-center p-2 shadow-md cursor-pointer ${
                  isWrong
                    ? 'bg-rose-50 border-rose-400 text-rose-800'
                    : 'bg-white hover:bg-amber-50/70 border-amber-200 hover:border-amber-400 text-slate-900 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {mode === 'letter-to-object' ? (
                  <>
                    <span className="text-4xl sm:text-5xl my-1 filter drop-shadow-xs select-none">
                      {choice.emoji}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-800 line-clamp-1">
                      {choiceWord}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl text-amber-950 font-black">
                        {choice.letter}
                      </span>
                      <span className="text-2xl text-amber-600 font-extrabold">
                        {choice.lower}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 mt-1">
                      ({choice.sound})
                    </span>
                  </>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
