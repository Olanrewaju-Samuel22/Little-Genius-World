import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle, Music } from 'lucide-react';
import { ANIMALS_DATA, AnimalItem, getLocalizedAnimalName } from './animalsData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const GuessSoundGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak,
}) => {
  const [targetAnimal, setTargetAnimal] = useState<AnimalItem>(() => ANIMALS_DATA[0]);
  const [options, setOptions] = useState<AnimalItem[]>([]);
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

    const choices = [target, ...distractors].sort(() => 0.5 - Math.random());

    setTargetAnimal(target);
    setOptions(choices);
    setSelectedId(null);
    setWrongId(null);
    setHintMessage('');
    setMascotMood('curious');

    setTimeout(() => {
      audio.playAnimalSound(target.soundKey);
      audio.speak('Who makes this sound? Listen carefully and tap the animal friend!', currentLang);
    }, 200);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  const handlePlaySoundAgain = () => {
    audio.playAnimalSound(targetAnimal.soundKey);
    setMascotMood('excited');
  };

  const handleSelectAnimal = (animal: AnimalItem) => {
    if (selectedId !== null) return;

    if (animal.id === targetAnimal.id) {
      setSelectedId(animal.id);
      setWrongId(null);
      setMascotMood('celebrating');
      audio.playPop(1.3);
      audio.playStarDing();
      const locName = getLocalizedAnimalName(animal, currentLang);
      audio.speak(`Yes! That is the ${locName}! It says ${animal.soundPrompt}!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateNewRound();
      }, 1800);
    } else {
      setWrongId(animal.id);
      setMascotMood('curious');
      audio.playGentleTryAgain();
      const locWrong = getLocalizedAnimalName(animal, currentLang);
      const hint = `That is the ${locWrong} (${animal.soundPrompt}). Listen again!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);

      setTimeout(() => {
        setWrongId(null);
      }, 1200);
    }
  };

  const handleShowHint = () => {
    audio.playChime();
    const hint = `This animal lives in the ${targetAnimal.habitat} and says ${targetAnimal.soundPrompt}!`;
    setHintMessage(hint);
    audio.speak(hint, currentLang);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-5">
      {/* Header bar */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-emerald-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} isAnimated />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Guess the Animal Sound
              </h2>
              <button
                onClick={handlePlaySoundAgain}
                className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center transition-transform active:scale-90"
                aria-label="Repeat sound"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Listen to the voice and pick the right friend!
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
            title="New puzzle"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Sound Speaker Button */}
      <div className="w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-white flex flex-col items-center justify-center text-white text-center">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={handlePlaySoundAgain}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white text-emerald-600 shadow-xl flex items-center justify-center font-black text-4xl mb-3 border-4 border-emerald-200"
        >
          <Volume2 className="w-12 h-12 stroke-[2.5]" />
        </motion.button>

        <h3 className="text-xl sm:text-2xl font-black drop-shadow-sm mb-1">
          Tap to Play the Mystery Animal Sound!
        </h3>
        <p className="text-xs sm:text-sm font-bold text-emerald-100">
          Which animal friend makes this sound?
        </p>
      </div>

      {/* Candidate Choice Cards */}
      <div className={`w-full grid gap-4 ${
        options.length === 2 ? 'grid-cols-2' :
        options.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
      }`}>
        {options.map((animal) => {
          const isSelected = selectedId === animal.id;
          const isWrong = wrongId === animal.id;
          const localizedName = getLocalizedAnimalName(animal, currentLang);

          return (
            <motion.button
              key={animal.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectAnimal(animal)}
              className={`min-h-[160px] rounded-3xl p-4 flex flex-col items-center justify-center border-4 transition-all shadow-md relative overflow-hidden ${
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

              <div className="text-base sm:text-lg font-black text-slate-800">
                {localizedName}
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 flex items-center gap-1 text-emerald-700 font-black text-xs"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{animal.soundPrompt}</span>
                </motion.div>
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
