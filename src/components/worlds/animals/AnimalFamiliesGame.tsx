import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle, Heart } from 'lucide-react';
import { ANIMALS_DATA, AnimalItem, getLocalizedAnimalName } from './animalsData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const AnimalFamiliesGame: React.FC<Props> = ({
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
    // Pick animals with distinct well-known baby names
    const pool = ANIMALS_DATA.filter((a) =>
      ['Calf', 'Kid', 'Lamb', 'Foal', 'Piglet', 'Chick', 'Duckling', 'Puppy', 'Kitten', 'Cub', 'Fawn', 'Owlet', 'Eaglet'].includes(a.babyName)
    );
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
      audio.speak(`Who is the parent of this cute little ${target.babyName}?`, currentLang);
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
      audio.speak(`Aww! A ${targetAnimal.babyName} belongs to the ${locName} family!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateNewRound();
      }, 1800);
    } else {
      setWrongId(choice.id);
      setMascotMood('curious');
      audio.playGentleTryAgain();
      const locWrong = getLocalizedAnimalName(choice, currentLang);
      const hint = `A ${targetAnimal.babyName} is not a baby ${locWrong}. Let's look again!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);

      setTimeout(() => {
        setWrongId(null);
      }, 1200);
    }
  };

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    audio.speak(`Find the parent of the baby ${targetAnimal.babyName}!`, currentLang);
  };

  const handleShowHint = () => {
    audio.playChime();
    audio.playAnimalSound(targetAnimal.soundKey);
    const hint = `The parent says ${targetAnimal.soundPrompt}!`;
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
                Animal Families
              </h2>
              <button
                onClick={handleReplayPrompt}
                className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center transition-transform active:scale-90"
                aria-label="Repeat instructions"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Match the cute baby animal to its loving parent!
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

      {/* Baby Animal Card */}
      <motion.div
        key={targetAnimal.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 rounded-3xl p-6 shadow-xl border-4 border-white flex flex-col sm:flex-row items-center justify-center gap-6 text-white text-center sm:text-left"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -4, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/20 backdrop-blur-xs border-3 border-white/60 flex items-center justify-center text-6xl sm:text-7xl shadow-md shrink-0"
        >
          {targetAnimal.emoji}
        </motion.div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-black text-xs mb-1">
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>Baby Animal Friend</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black drop-shadow-sm">
            Baby {targetAnimal.babyName}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-white/90 mt-1">
            Who is the mother or father of this sweet {targetAnimal.babyName}?
          </p>
        </div>
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
                  ? 'bg-rose-100 border-rose-500 shadow-rose-200 scale-105'
                  : isWrong
                  ? 'bg-slate-100 border-slate-400 opacity-60 animate-wiggle'
                  : 'bg-white border-rose-200 hover:border-rose-400 hover:bg-rose-50/50'
              }`}
            >
              <div className="text-6xl sm:text-7xl mb-2">
                {animal.emoji}
              </div>

              <div className="text-base sm:text-lg font-black text-slate-800">
                {locName}
              </div>

              {isSelected && (
                <div className="mt-1 flex items-center gap-1 text-rose-700 font-black text-xs">
                  <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                  <span>Loving Parent!</span>
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
