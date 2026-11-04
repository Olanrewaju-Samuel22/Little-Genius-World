import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Sparkles, Star, RefreshCw, Music, Check, Trophy, HelpCircle, Heart } from 'lucide-react';
import { ANIMALS_DATA, AnimalItem, getLocalizedAnimalName } from './animalsData';
import { audio } from '../../../utils/audio';
import { useGame } from '../../../context/GameContext';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
}

export const AnimalSoundsChallenge: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak,
}) => {
  const { celebrate, t } = useGame();

  // Challenge game state
  const [targetAnimal, setTargetAnimal] = useState<AnimalItem>(() => ANIMALS_DATA[0]);
  const [options, setOptions] = useState<AnimalItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [hintMessage, setHintMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [roundNumber, setRoundNumber] = useState<number>(1);

  // Initialize and generate a challenge round with 1 target and exactly 3 distractors (4 cards total)
  const generateNewRound = () => {
    const pool = ANIMALS_DATA;
    const target = pool[Math.floor(Math.random() * pool.length)];

    // Pick 3 unique distractors
    const distractors = pool
      .filter((a) => a.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Shuffle all 4 cards
    const fourCards = [target, ...distractors].sort(() => 0.5 - Math.random());

    setTargetAnimal(target);
    setOptions(fourCards);
    setSelectedId(null);
    setWrongId(null);
    setHintMessage('');
    setMascotMood('curious');

    // Play the mystery animal sound
    playSound(target);
  };

  const playSound = (animal: AnimalItem) => {
    setIsPlayingAudio(true);
    audio.playAnimalSound(animal.soundKey);

    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1000);
  };

  const handlePlaySoundAgain = () => {
    playSound(targetAnimal);
    setMascotMood('excited');
    audio.speak('Listen carefully! Which animal friend makes this sound?', currentLang);
  };

  useEffect(() => {
    generateNewRound();
  }, [ageGroup]);

  // Handle card selection
  const handleSelectAnimal = (animal: AnimalItem) => {
    if (selectedId !== null) return; // Prevent double taps during celebration transition

    if (animal.id === targetAnimal.id) {
      // CORRECT SELECTION!
      setSelectedId(animal.id);
      setWrongId(null);
      setMascotMood('celebrating');
      setScore((prev) => prev + 1);

      // 1. Audio and fanfare
      audio.playPop(1.3);
      audio.playAnimalSound(animal.soundKey);
      audio.playStarDing();

      // 2. Existing Celebration modal & confetti explosion
      const locName = getLocalizedAnimalName(animal, currentLang);
      celebrate({
        title: 'Animal Sounds Champion!',
        subtitle: `Fantastic! The ${locName} says "${animal.soundPrompt}"!`,
        stars: 1,
      });

      // 3. Existing Progress tracking & stars
      onCorrectAnswer();

      // 4. Voice praise
      setTimeout(() => {
        audio.speak(`Hooray! The ${locName} says ${animal.soundPrompt}!`, currentLang);
      }, 400);

      // 5. Advance to next challenge round after celebration
      setTimeout(() => {
        setRoundNumber((prev) => prev + 1);
        generateNewRound();
      }, 2000);
    } else {
      // INCORRECT SELECTION - Gentle non-punitive guidance
      setWrongId(animal.id);
      setMascotMood('curious');
      audio.playGentleTryAgain();

      const locWrong = getLocalizedAnimalName(animal, currentLang);
      const hint = `That's the ${locWrong} (${animal.soundPrompt}). Listen again to find the mystery sound!`;
      setHintMessage(hint);
      audio.speak(hint, currentLang);

      setTimeout(() => {
        setWrongId(null);
      }, 1300);
    }
  };

  const handleShowHint = () => {
    audio.playChime();
    playSound(targetAnimal);
    const hint = `Clue: This friend lives in the ${targetAnimal.habitat} and says "${targetAnimal.soundPrompt}"!`;
    setHintMessage(hint);
    audio.speak(hint, currentLang);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-5">
      {/* Top Header Card */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <MascotAvatar mascot="lion" size="md" expression={mascotMood} isAnimated />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Animal Sounds Challenge
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                Round {roundNumber}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Listen to the sound and choose the correct animal friend!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {score > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Solved: {score}</span>
            </div>
          )}

          {streak > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span>Streak: {streak}</span>
            </div>
          )}

          <button
            onClick={generateNewRound}
            className="p-2.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-transform active:scale-90"
            title="Next mystery animal"
            aria-label="Skip to next animal"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Mystery Sound Stage */}
      <div className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-white flex flex-col items-center justify-center text-white text-center relative overflow-hidden">
        {/* Decorative background sound rings */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        {/* Pulsing Speaker Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={isPlayingAudio ? { scale: [1, 1.15, 1], rotate: [0, -4, 4, 0] } : { scale: [1, 1.04, 1] }}
          transition={{ repeat: isPlayingAudio ? Infinity : 0, duration: 0.6 }}
          onClick={handlePlaySoundAgain}
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white text-emerald-600 shadow-xl flex items-center justify-center mb-3 border-4 transition-all ${
            isPlayingAudio ? 'border-amber-300 ring-8 ring-amber-300/40 text-amber-600' : 'border-emerald-200'
          }`}
          aria-label="Play animal sound again"
        >
          <Volume2 className="w-12 h-12 stroke-[2.5]" />
        </motion.button>

        <h3 className="text-xl sm:text-2xl font-black drop-shadow-sm mb-1">
          {isPlayingAudio ? '🔊 Playing Mystery Sound...' : 'Tap to Hear the Mystery Sound!'}
        </h3>
        <p className="text-xs sm:text-sm font-bold text-emerald-100">
          Which animal made that sound? Choose from the 4 cards below!
        </p>

        {/* Action Button */}
        <button
          onClick={handlePlaySoundAgain}
          className="mt-3 px-5 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs sm:text-sm transition-transform active:scale-95 border border-white/40 flex items-center gap-1.5 backdrop-blur-xs"
        >
          <Music className="w-4 h-4" />
          <span>Play Sound Again</span>
        </button>
      </div>

      {/* Four Animal Cards Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
        {options.map((animal) => {
          const isSelected = selectedId === animal.id;
          const isWrong = wrongId === animal.id;
          const locName = getLocalizedAnimalName(animal, currentLang);

          return (
            <motion.button
              key={animal.id}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleSelectAnimal(animal)}
              className={`min-h-[190px] rounded-3xl p-4 flex flex-col items-center justify-between border-4 transition-all shadow-md relative overflow-hidden group ${
                isSelected
                  ? 'bg-emerald-100 border-emerald-500 shadow-emerald-300 ring-4 ring-emerald-300 scale-105'
                  : isWrong
                  ? 'bg-rose-100 border-rose-400 shadow-rose-200 animate-wiggle'
                  : 'bg-white border-emerald-200 hover:border-emerald-400 hover:shadow-lg hover:bg-emerald-50/40'
              }`}
            >
              {/* Category mini pill */}
              <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-400 px-1">
                <span className="capitalize">{animal.category}</span>
                <span className="text-xs">
                  {animal.category === 'farm' ? '🚜' :
                   animal.category === 'wild' ? '🌴' :
                   animal.category === 'sea' ? '🌊' : '🪶'}
                </span>
              </div>

              {/* Large Cartoon Animal Illustration */}
              <div className="text-6xl sm:text-7xl my-2 filter drop-shadow-sm group-hover:scale-110 transition-transform">
                {animal.emoji}
              </div>

              {/* Name & Sound */}
              <div className="w-full text-center">
                <div className="text-base sm:text-lg font-black text-slate-800 truncate">
                  {locName}
                </div>
                {currentLang !== 'en' && (
                  <div className="text-[11px] font-bold text-slate-400 truncate">
                    ({animal.name})
                  </div>
                )}

                {/* Status indicator on card */}
                {isSelected ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-1 flex items-center justify-center gap-1 text-emerald-700 font-black text-xs bg-emerald-200/80 py-1 rounded-xl"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{animal.soundPrompt}!</span>
                  </motion.div>
                ) : (
                  <div className="mt-1 text-xs text-emerald-600 font-extrabold truncate">
                    {animal.soundPrompt}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Controls: Hint & Instruction */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <button
          onClick={handleShowHint}
          className="flex items-center gap-1.5 text-emerald-700 font-bold hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Need a hint?</span>
        </button>

        {hintMessage && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-extrabold text-emerald-950 bg-emerald-100 px-4 py-1.5 rounded-xl border border-emerald-200 text-center"
          >
            {hintMessage}
          </motion.div>
        )}
      </div>
    </div>
  );
};
