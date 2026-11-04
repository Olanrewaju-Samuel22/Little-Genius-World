import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle, HelpCircle as QuestionIcon } from 'lucide-react';
import { ANIMALS_DATA, AnimalItem, getLocalizedAnimalName } from './animalsData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const WhoAmIGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak,
}) => {
  const [targetAnimal, setTargetAnimal] = useState<AnimalItem>(() => ANIMALS_DATA[0]);
  const [choices, setChoices] = useState<AnimalItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');

  const getOptionCount = (age: string) => {
    if (age === '0-1' || age === '1-2') return 2;
    if (age === '2-3') return 3;
    return 4;
  };

  const generateNewRound = () => {
    const pool = ANIMALS_DATA;
    const target = pool[Math.floor(Math.random() * pool.length)];
    const count = getOptionCount(ageGroup);

    const distractors = pool
      .filter((a) => a.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, count - 1);

    const allChoices = [target, ...distractors].sort(() => 0.5 - Math.random());

    setTargetAnimal(target);
    setChoices(allChoices);
    setSelectedId(null);
    setWrongId(null);
    setHintMessage('');
    setMascotMood('curious');

    setTimeout(() => {
      audio.playPop(1.1);
      audio.speak(`Riddle time! ${target.clue}`, currentLang);
    }, 200);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  const handleSelect = (choice: AnimalItem) => {
    if (selectedId !== null) return;

    if (choice.id === targetAnimal.id) {
      setSelectedId(choice.id);
      setWrongId(null);
      setMascotMood('celebrating');
      audio.playPop(1.3);
      audio.playAnimalSound(choice.soundKey);
      audio.playStarDing();
      const locName = getLocalizedAnimalName(choice, currentLang);
      audio.speak(`You guessed it! I am the ${locName}!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateNewRound();
      }, 1800);
    } else {
      setWrongId(choice.id);
      setMascotMood('curious');
      audio.playGentleTryAgain();
      const locWrong = getLocalizedAnimalName(choice, currentLang);
      const hint = `Not the ${locWrong}. Read the riddle again!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);

      setTimeout(() => {
        setWrongId(null);
      }, 1200);
    }
  };

  const handleReplayClue = () => {
    audio.playPop(1.0);
    audio.speak(`Listen to the clue: ${targetAnimal.clue}`, currentLang);
  };

  const handleShowHint = () => {
    audio.playChime();
    audio.playAnimalSound(targetAnimal.soundKey);
    const hint = `Listen to my sound! I say ${targetAnimal.soundPrompt}!`;
    setHintMessage(hint);
    audio.speak(hint, currentLang);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-5">
      {/* Top Header Card */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-emerald-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} isAnimated />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Who Am I? Mystery Riddle
              </h2>
              <button
                onClick={handleReplayClue}
                className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center transition-transform active:scale-90"
                aria-label="Repeat riddle"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Listen to the clues and guess the mystery animal friend!
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
            className="p-2.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-transform active:scale-90"
            title="New riddle"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Riddle Presentation Box */}
      <motion.div
        key={targetAnimal.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-white flex flex-col items-center text-center text-white relative overflow-hidden"
      >
        <span className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl font-black mb-3 border-2 border-white/40">
          ❓
        </span>

        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-100 mb-1">
          Animal Riddle:
        </span>
        <h3 className="text-xl sm:text-2xl font-black max-w-xl leading-relaxed drop-shadow-sm">
          "{targetAnimal.clue}"
        </h3>

        <button
          onClick={handleReplayClue}
          className="mt-4 px-5 py-2 rounded-2xl bg-white text-amber-900 font-black text-xs sm:text-sm hover:bg-amber-50 transition-transform active:scale-95 shadow-md flex items-center gap-2"
        >
          <Volume2 className="w-4 h-4 text-amber-600" />
          <span>Read Riddle Again</span>
        </button>
      </motion.div>

      {/* Choices Grid */}
      <div className={`w-full grid gap-4 ${
        choices.length === 2 ? 'grid-cols-2' :
        choices.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
      }`}>
        {choices.map((animal) => {
          const isSelected = selectedId === animal.id;
          const isWrong = wrongId === animal.id;
          const locName = getLocalizedAnimalName(animal, currentLang);

          return (
            <motion.button
              key={animal.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(animal)}
              className={`min-h-[170px] rounded-3xl p-4 flex flex-col items-center justify-center border-4 transition-all shadow-md relative overflow-hidden ${
                isSelected
                  ? 'bg-emerald-100 border-emerald-500 shadow-emerald-200 scale-105'
                  : isWrong
                  ? 'bg-rose-100 border-rose-400 shadow-rose-200 animate-wiggle'
                  : 'bg-white border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/50'
              }`}
            >
              <div className="text-6xl sm:text-7xl mb-2">
                {animal.emoji}
              </div>

              <div className="text-sm sm:text-base font-black text-slate-800">
                {locName}
              </div>

              {isSelected && (
                <div className="mt-1 flex items-center gap-1 text-emerald-700 font-black text-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>It's me!</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="w-full flex items-center justify-between text-xs sm:text-sm">
        <button
          onClick={handleShowHint}
          className="flex items-center gap-1.5 text-emerald-700 font-bold hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200"
        >
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Need a hint?</span>
        </button>

        {hintMessage && (
          <span className="font-extrabold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-xl">
            {hintMessage}
          </span>
        )}
      </div>
    </div>
  );
};
