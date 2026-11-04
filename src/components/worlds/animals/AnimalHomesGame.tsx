import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RefreshCw, Star, Sparkles, Check, HelpCircle } from 'lucide-react';
import { ANIMALS_DATA, AnimalItem, ANIMAL_HABITATS, getLocalizedAnimalName } from './animalsData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const AnimalHomesGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak,
}) => {
  const [currentAnimal, setCurrentAnimal] = useState<AnimalItem>(() => ANIMALS_DATA[0]);
  const [habitatChoices, setHabitatChoices] = useState<typeof ANIMAL_HABITATS>([]);
  const [selectedHabitatId, setSelectedHabitatId] = useState<string | null>(null);
  const [wrongHabitatId, setWrongHabitatId] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');

  const getHabitatChoiceCount = (age: string) => {
    if (age === '0-1' || age === '1-2') return 2;
    if (age === '2-3') return 3;
    return 4;
  };

  const generateNewRound = () => {
    const pool = ANIMALS_DATA;
    const target = pool[Math.floor(Math.random() * pool.length)];
    const count = getHabitatChoiceCount(ageGroup);

    // Target habitat
    const targetHab = ANIMAL_HABITATS.find((h) => h.id === target.habitatId) || ANIMAL_HABITATS[0];
    const otherHabs = ANIMAL_HABITATS.filter((h) => h.id !== target.habitatId)
      .sort(() => 0.5 - Math.random())
      .slice(0, count - 1);

    const shuffled = [targetHab, ...otherHabs].sort(() => 0.5 - Math.random());

    setCurrentAnimal(target);
    setHabitatChoices(shuffled);
    setSelectedHabitatId(null);
    setWrongHabitatId(null);
    setHintMessage('');
    setMascotMood('curious');

    setTimeout(() => {
      audio.playAnimalSound(target.soundKey);
      const locName = getLocalizedAnimalName(target, currentLang);
      audio.speak(`Where does the ${locName} live? Choose its home!`, currentLang);
    }, 200);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  const handleSelectHabitat = (habitat: (typeof ANIMAL_HABITATS)[0]) => {
    if (selectedHabitatId !== null) return;

    if (habitat.id === currentAnimal.habitatId) {
      setSelectedHabitatId(habitat.id);
      setWrongHabitatId(null);
      setMascotMood('celebrating');
      audio.playPop(1.3);
      audio.playAnimalSound(currentAnimal.soundKey);
      audio.playStarDing();
      const locName = getLocalizedAnimalName(currentAnimal, currentLang);
      audio.speak(`Yes! The ${locName} lives in the ${habitat.name}!`, currentLang);
      onCorrectAnswer();

      setTimeout(() => {
        generateNewRound();
      }, 1800);
    } else {
      setWrongHabitatId(habitat.id);
      setMascotMood('curious');
      audio.playGentleTryAgain();
      const locName = getLocalizedAnimalName(currentAnimal, currentLang);
      const hint = `Not quite! Does the ${locName} live in the ${habitat.name}? Let's check another home!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);

      setTimeout(() => {
        setWrongHabitatId(null);
      }, 1200);
    }
  };

  const handleReplayPrompt = () => {
    audio.playPop(1.0);
    const locName = getLocalizedAnimalName(currentAnimal, currentLang);
    audio.speak(`Find the home for the ${locName}!`, currentLang);
  };

  const handleShowHint = () => {
    audio.playChime();
    const hint = `Think about where ${currentAnimal.name} finds food and sleeps: ${currentAnimal.habitat}!`;
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
                Animal Homes & Habitats
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
              Help our friend find where they live!
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

      {/* Target Animal Card */}
      <motion.div
        key={currentAnimal.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full bg-white rounded-3xl p-6 shadow-xl border-4 border-emerald-300 flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-emerald-50 border-3 border-emerald-200 flex items-center justify-center text-6xl sm:text-7xl shadow-md shrink-0"
        >
          {currentAnimal.emoji}
        </motion.div>

        <div className="text-center sm:text-left">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
            Animal Traveler
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
            Where does the {getLocalizedAnimalName(currentAnimal, currentLang)} live?
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            "{currentAnimal.fact}"
          </p>
        </div>
      </motion.div>

      {/* Habitat Options Grid */}
      <div className={`w-full grid gap-4 ${
        habitatChoices.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
        habitatChoices.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
      }`}>
        {habitatChoices.map((hab) => {
          const isSelected = selectedHabitatId === hab.id;
          const isWrong = wrongHabitatId === hab.id;

          return (
            <motion.button
              key={hab.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleSelectHabitat(hab)}
              className={`min-h-[160px] rounded-3xl p-4 flex flex-col items-center justify-between border-4 transition-all shadow-md relative overflow-hidden bg-gradient-to-b ${hab.bg} ${
                isSelected
                  ? 'border-emerald-500 ring-4 ring-emerald-300 scale-105'
                  : isWrong
                  ? 'border-rose-400 ring-4 ring-rose-200 animate-wiggle'
                  : 'border-white/80 hover:border-emerald-300 hover:shadow-lg'
              }`}
            >
              <div className="text-4xl sm:text-5xl mt-1">
                {hab.icon}
              </div>

              <div className="text-center my-2">
                <div className="text-sm sm:text-base font-black text-slate-800">
                  {hab.name}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 mt-0.5">
                  {hab.desc}
                </div>
              </div>

              <div className="w-full pt-1">
                {isSelected ? (
                  <div className="flex items-center justify-center gap-1 text-emerald-800 font-black text-xs bg-white/80 py-1 rounded-xl">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Home Sweet Home!</span>
                  </div>
                ) : (
                  <div className="text-center text-[11px] font-bold text-slate-500 bg-white/60 py-0.5 rounded-xl">
                    Tap to Choose
                  </div>
                )}
              </div>
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
