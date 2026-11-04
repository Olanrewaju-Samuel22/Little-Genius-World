import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  Star,
  CheckCircle2,
  Heart,
  Music,
  Compass,
  X
} from 'lucide-react';
import { ANIMALS_DATA, AnimalItem, AnimalCategory, getLocalizedAnimalName } from './animalsData';
import { audio } from '../../../utils/audio';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onDiscoveredAnimal: (id: string) => void;
  onCorrectAnswer: () => void;
  discoveredList: string[];
}

export const AnimalExplorer: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onDiscoveredAnimal,
  onCorrectAnswer,
  discoveredList,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | AnimalCategory>('all');
  const [focusedAnimal, setFocusedAnimal] = useState<AnimalItem | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [mascotMood, setMascotMood] = useState<MascotExpression>('happy');
  const [interactionHop, setInteractionHop] = useState<number>(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const filteredAnimals = selectedCategory === 'all'
    ? ANIMALS_DATA
    : ANIMALS_DATA.filter((a) => a.category === selectedCategory);

  // Auto-play slideshow for 0-1 baby explorers
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setFocusedAnimal((current) => {
          const list = filteredAnimals;
          if (!current) return list[0];
          const currentIndex = list.findIndex((a) => a.id === current.id);
          const nextIndex = (currentIndex + 1) % list.length;
          const nextAnimal = list[nextIndex];
          playAnimalExperience(nextAnimal);
          return nextAnimal;
        });
      }, 5000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, filteredAnimals]);

  const playAnimalExperience = (animal: AnimalItem) => {
    onDiscoveredAnimal(animal.id);
    audio.playAnimalSound(animal.soundKey);
    const langName = getLocalizedAnimalName(animal, currentLang);
    setTimeout(() => {
      audio.speak(`${langName}! ${animal.soundPrompt}! ${animal.fact}`, currentLang);
    }, 600);
  };

  const handleSelectAnimal = (animal: AnimalItem) => {
    setIsAutoPlaying(false);
    setFocusedAnimal(animal);
    setMascotMood('excited');
    playAnimalExperience(animal);
  };

  const handleCloseModal = () => {
    setFocusedAnimal(null);
    setIsAutoPlaying(false);
    audio.playPop(0.9);
  };

  const handleNextAnimal = () => {
    if (!focusedAnimal) return;
    const list = filteredAnimals;
    const currentIndex = list.findIndex((a) => a.id === focusedAnimal.id);
    const nextIndex = (currentIndex + 1) % list.length;
    const nextAnimal = list[nextIndex];
    setFocusedAnimal(nextAnimal);
    playAnimalExperience(nextAnimal);
  };

  const handlePrevAnimal = () => {
    if (!focusedAnimal) return;
    const list = filteredAnimals;
    const currentIndex = list.findIndex((a) => a.id === focusedAnimal.id);
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    const prevAnimal = list[prevIndex];
    setFocusedAnimal(prevAnimal);
    playAnimalExperience(prevAnimal);
  };

  const handleInteractWithAnimal = () => {
    if (!focusedAnimal) return;
    setInteractionHop((prev) => prev + 1);
    audio.playAnimalSound(focusedAnimal.soundKey);
    setMascotMood('celebrating');
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* 1. Category Environments Ribbon */}
      <div className="w-full bg-white/90 backdrop-blur-xs p-3 rounded-3xl shadow-sm border-2 border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', title: 'All Friends', icon: '🐾', count: ANIMALS_DATA.length },
            { id: 'farm', title: 'Farm', icon: '🚜', count: 9 },
            { id: 'wild', title: 'Wild Safari', icon: '🌴', count: 9 },
            { id: 'sea', title: 'Sea Ocean', icon: '🌊', count: 8 },
            { id: 'birds', title: 'Bird Paradise', icon: '🪶', count: 6 },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as typeof selectedCategory);
                  audio.playPop(1.05);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 shadow-xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-105'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border border-emerald-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/30 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Baby Explorer Sensory Mode Toggle */}
        {(ageGroup === '0-1' || ageGroup === '1-2') && (
          <button
            onClick={() => {
              const nextState = !isAutoPlaying;
              setIsAutoPlaying(nextState);
              if (nextState && !focusedAnimal) {
                setFocusedAnimal(filteredAnimals[0]);
                playAnimalExperience(filteredAnimals[0]);
              }
              audio.playPop();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all shadow-xs ${
              isAutoPlaying
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
            }`}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoPlaying ? 'Pause Baby Tour' : 'Baby Sensory Tour'}</span>
          </button>
        )}
      </div>

      {/* 2. Environment Visual Canvas & Animal Grid */}
      <div className={`w-full rounded-3xl p-5 sm:p-6 border-4 shadow-lg transition-colors ${
        selectedCategory === 'farm' ? 'bg-gradient-to-b from-amber-50 via-emerald-50 to-emerald-100 border-amber-300' :
        selectedCategory === 'wild' ? 'bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-100 border-amber-400' :
        selectedCategory === 'sea' ? 'bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100 border-sky-300' :
        selectedCategory === 'birds' ? 'bg-gradient-to-b from-indigo-50 via-pink-50 to-purple-100 border-indigo-300' :
        'bg-gradient-to-b from-emerald-50 via-teal-50 to-sky-100 border-emerald-300'
      }`}>
        {/* Environment Banner Description */}
        <div className="flex items-center justify-between gap-2 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {selectedCategory === 'farm' ? '🚜' :
               selectedCategory === 'wild' ? '🌴' :
               selectedCategory === 'sea' ? '🌊' :
               selectedCategory === 'birds' ? '🪶' : '🐾'}
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-800">
                {selectedCategory === 'farm' ? 'Sunny Farm Friends' :
                 selectedCategory === 'wild' ? 'Wild Safari Explorer' :
                 selectedCategory === 'sea' ? 'Deep Ocean Wonders' :
                 selectedCategory === 'birds' ? 'Bird Paradise Aviary' : 'All Animal Friends'}
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Tap any friend to hear their voice and learn fun facts!
              </p>
            </div>
          </div>

          <div className="text-xs font-extrabold text-emerald-800 bg-white/80 px-3 py-1 rounded-full border border-emerald-200">
            {discoveredList.filter(id => filteredAnimals.some(a => a.id === id)).length} / {filteredAnimals.length} Discovered
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredAnimals.map((animal) => {
            const isDiscovered = discoveredList.includes(animal.id);
            const localizedName = getLocalizedAnimalName(animal, currentLang);

            return (
              <motion.button
                key={animal.id}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSelectAnimal(animal)}
                className="bg-white/95 rounded-3xl p-4 shadow-md border-3 border-emerald-200 hover:border-emerald-400 hover:shadow-lg flex flex-col items-center text-center transition-all relative overflow-hidden group"
              >
                {/* Discovered Star Badge */}
                {isDiscovered && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs">
                    <Star className="w-3 h-3 fill-amber-950 text-amber-950" />
                  </div>
                )}

                {/* Big Cartoon Emoji Illustration */}
                <div className="text-5xl sm:text-6xl my-2 transform group-hover:scale-110 transition-transform">
                  {animal.emoji}
                </div>

                <div className="w-full">
                  <div className="text-base sm:text-lg font-black text-slate-800 truncate">
                    {localizedName}
                  </div>
                  {currentLang !== 'en' && (
                    <div className="text-[11px] font-bold text-slate-400">
                      ({animal.name})
                    </div>
                  )}

                  <div className="mt-1 text-xs text-emerald-600 font-extrabold flex items-center justify-center gap-1">
                    <Music className="w-3 h-3" />
                    <span>{animal.soundPrompt}</span>
                  </div>

                  <div className="mt-2 text-[10px] text-slate-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 truncate">
                    {animal.habitat}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. Interactive Animal Showcase Stage / Modal */}
      <AnimatePresence>
        {focusedAnimal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-emerald-400 relative overflow-hidden flex flex-col items-center text-center"
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition-transform active:scale-90"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Left / Right */}
              <button
                onClick={handlePrevAnimal}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold transition-transform active:scale-90 shadow-sm"
                aria-label="Previous animal"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={handleNextAnimal}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 flex items-center justify-center font-bold transition-transform active:scale-90 shadow-sm"
                aria-label="Next animal"
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              {/* Animal Hero Stage */}
              <motion.div
                key={`${focusedAnimal.id}-${interactionHop}`}
                animate={{ scale: [1, 1.18, 1], rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.4 }}
                onClick={handleInteractWithAnimal}
                className="cursor-pointer select-none my-2 group"
                title="Tap to make me hop and make sound!"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-emerald-100 via-amber-50 to-sky-100 border-4 border-emerald-300 shadow-xl flex items-center justify-center text-7xl sm:text-8xl relative">
                  <span>{focusedAnimal.emoji}</span>
                  <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-black text-xs shadow-md">
                    Tap Me!
                  </div>
                </div>
              </motion.div>

              {/* Title & Pronunciation */}
              <div className="flex items-center gap-3 mt-3">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
                  {getLocalizedAnimalName(focusedAnimal, currentLang)}
                </h2>
                <button
                  onClick={() => playAnimalExperience(focusedAnimal)}
                  className="w-10 h-10 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center shadow-xs transition-transform active:scale-90"
                  aria-label="Pronounce animal"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {currentLang !== 'en' && (
                <p className="text-sm font-bold text-slate-500">
                  English name: {focusedAnimal.name}
                </p>
              )}

              {/* Sound Action Pill */}
              <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-black text-sm border border-amber-300">
                <Music className="w-4 h-4 text-amber-600" />
                <span>Sound: {focusedAnimal.soundPrompt}</span>
              </div>

              {/* Fact Box */}
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 max-w-lg w-full text-left">
                <p className="text-sm sm:text-base font-bold text-slate-700">
                  🌱 <strong>Fun Fact:</strong> {focusedAnimal.fact}
                </p>
                <div className="mt-2 pt-2 border-t border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                  <span>🏡 <strong>Home:</strong> {focusedAnimal.habitat}</span>
                  <span>🐣 <strong>Baby Animal:</strong> {focusedAnimal.babyName}</span>
                </div>
              </div>

              {/* Mascot Guidance */}
              <div className="mt-4 flex items-center gap-3">
                <MascotAvatar mascot="lion" size="sm" expression={mascotMood} isAnimated />
                <p className="text-xs sm:text-sm font-bold text-emerald-950">
                  Leo says: "Tap {getLocalizedAnimalName(focusedAnimal, currentLang)} to hear {focusedAnimal.funAction}!"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
