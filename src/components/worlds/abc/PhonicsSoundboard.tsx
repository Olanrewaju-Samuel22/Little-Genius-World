import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  Sparkles, 
  Star, 
  Check, 
  HelpCircle, 
  RotateCcw, 
  Trophy, 
  Heart,
  Lightbulb,
  Music,
  Smile,
  VolumeX,
  Play
} from 'lucide-react';
import { PHONICS_DATA, PhonicsDetail } from './phonicsData';
import { audio } from '../../../utils/audio';
import { MascotAvatar } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer?: () => void;
  streak?: number;
}

export const PhonicsSoundboard: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak = 0
}) => {
  // Selected letter for detailed phonics spotlight
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  // Sound playback mode
  const [soundMode, setSoundMode] = useState<'short' | 'intro' | 'chant'>('short');
  // Playback speed
  const [isSlowMode, setIsSlowMode] = useState(false);
  // Filter: All vs Vowels vs Consonants
  const [filterType, setFilterType] = useState<'all' | 'vowels' | 'consonants'>('all');
  // Explored sounds set (persisted)
  const [exploredSounds, setExploredSounds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lgw_explored_phonics');
      return saved ? JSON.parse(saved) : ['A', 'B', 'C'];
    } catch {
      return ['A', 'B', 'C'];
    }
  });

  // Sound Detective Challenge Mode state
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizTarget, setQuizTarget] = useState<PhonicsDetail>(PHONICS_DATA[0]);
  const [quizChoices, setQuizChoices] = useState<PhonicsDetail[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [wrongLetterChoice, setWrongLetterChoice] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Active item
  const currentItem = PHONICS_DATA.find(item => item.letter === selectedLetter) || PHONICS_DATA[0];

  // Play short sound when clicking any letter
  const playLetterSound = (
    item: PhonicsDetail, 
    modeOverride?: 'short' | 'intro' | 'chant',
    slowOverride?: boolean
  ) => {
    const mode = modeOverride || soundMode;
    const slow = slowOverride !== undefined ? slowOverride : isSlowMode;

    audio.playPhonicSound(
      item.letter,
      item.shortSoundSpoken,
      item.word,
      mode,
      slow
    );

    // Track explored sound
    if (!exploredSounds.includes(item.letter)) {
      const updated = [...exploredSounds, item.letter];
      setExploredSounds(updated);
      try {
        localStorage.setItem('lgw_explored_phonics', JSON.stringify(updated));
      } catch {
        // silent
      }
    }
  };

  const handleSelectLetter = (item: PhonicsDetail) => {
    setSelectedLetter(item.letter);
    playLetterSound(item);
  };

  // Filtered letters list
  const displayedLetters = PHONICS_DATA.filter(item => {
    if (filterType === 'vowels') return item.isVowel;
    if (filterType === 'consonants') return !item.isVowel;
    return true;
  });

  // Generate new Quiz Question
  const startNewQuizQuestion = () => {
    setQuizFeedback('idle');
    setWrongLetterChoice(null);

    // Pick a random target letter
    const targetIdx = Math.floor(Math.random() * PHONICS_DATA.length);
    const target = PHONICS_DATA[targetIdx];
    setQuizTarget(target);

    // Pick 3 random distractors (or 2 for toddlers)
    const choiceCount = (ageGroup === '0-1' || ageGroup === '1-2') ? 2 : 4;
    const others = PHONICS_DATA.filter(item => item.letter !== target.letter);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, choiceCount - 1);
    const allChoices = [target, ...distractors].sort(() => 0.5 - Math.random());

    setQuizChoices(allChoices);

    // Play target sound after brief delay
    setTimeout(() => {
      audio.playPhonicSound(target.letter, target.shortSoundSpoken, target.word, 'short', isSlowMode);
    }, 250);
  };

  // Handle quiz answer
  const handleQuizChoice = (choice: PhonicsDetail) => {
    if (quizFeedback === 'correct') return;

    if (choice.letter === quizTarget.letter) {
      setQuizFeedback('correct');
      setQuizScore(prev => prev + 1);
      audio.playChime();
      playLetterSound(choice, 'intro');

      if (onCorrectAnswer) {
        onCorrectAnswer();
      }

      setTimeout(() => {
        startNewQuizQuestion();
      }, 2000);
    } else {
      setQuizFeedback('wrong');
      setWrongLetterChoice(choice.letter);
      audio.playGentleTryAgain();

      // Help toddler by explaining which sound was just clicked
      audio.speak(`That is ${choice.letter}, which says ${choice.soundDisplay}! Let's find ${quizTarget.soundDisplay}!`);
    }
  };

  // Play sound when entering quiz mode
  useEffect(() => {
    if (isQuizMode) {
      startNewQuizQuestion();
    }
  }, [isQuizMode]);

  return (
    <div className="w-full flex flex-col gap-5 items-stretch">
      {/* Top Banner & Mode Toggle */}
      <div className="bg-white/95 rounded-3xl p-4 sm:p-5 shadow-lg border-4 border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md text-2xl">
            🔊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Interactive Phonics Soundboard
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs">
                A to Z
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              Click any letter to instantly hear its short phonetic sound!
            </p>
          </div>
        </div>

        {/* Mode & Quiz Switcher */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              setIsQuizMode(!isQuizMode);
              audio.playPop(1.1);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              isQuizMode 
                ? 'btn-3d-amber text-amber-950 scale-105' 
                : 'btn-3d-sky text-sky-950'
            }`}
          >
            {isQuizMode ? <Sparkles className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
            <span>{isQuizMode ? 'Exit Sound Quiz' : '🎯 Sound Detective Quiz'}</span>
          </button>
        </div>
      </div>

      {/* QUIZ MODE: Sound Detective */}
      {isQuizMode ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Top Score & Prompt */}
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black">
              <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
              <span>Score: {quizScore} Stars</span>
            </div>
            <div className="text-xs font-bold text-slate-500">
              Listen carefully & tap the letter
            </div>
          </div>

          {/* Central Mystery Sound Speaker Button */}
          <div className="my-3 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                audio.playPop(1.2);
                audio.playPhonicSound(
                  quizTarget.letter,
                  quizTarget.shortSoundSpoken,
                  quizTarget.word,
                  'short',
                  isSlowMode
                );
              }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 border-4 border-amber-500 shadow-xl flex flex-col items-center justify-center text-amber-950 cursor-pointer active:scale-95 transition-transform"
            >
              <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-wider mt-1">
                Hear Sound
              </span>
            </motion.button>

            <h3 className="text-lg sm:text-xl font-black text-slate-800 mt-4">
              &ldquo;Which letter makes the <span className="text-amber-600 underline">&ldquo;{quizTarget.soundDisplay}&rdquo;</span> sound?&rdquo;
            </h3>
            <p className="text-xs font-bold text-slate-500 mt-1">
              Tap the speaker above to listen again!
            </p>
          </div>

          {/* Quiz Letter Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-xl my-4">
            {quizChoices.map((choice) => {
              const isWrong = wrongLetterChoice === choice.letter;
              const isCorrectTarget = quizFeedback === 'correct' && choice.letter === quizTarget.letter;

              return (
                <motion.button
                  key={choice.letter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuizChoice(choice)}
                  className={`h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center font-black transition-all cursor-pointer border-4 ${
                    isCorrectTarget
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105 animate-pulse'
                      : isWrong
                      ? 'bg-rose-100 text-rose-700 border-rose-400 opacity-60 shake'
                      : 'bg-white hover:bg-amber-50 text-slate-900 border-amber-200 shadow-md hover:border-amber-400'
                  }`}
                >
                  <div className="text-3xl sm:text-4xl font-black">
                    {choice.letter}
                    <span className="text-xl sm:text-2xl text-slate-400 ml-1">{choice.lower}</span>
                  </div>
                  <span className="text-sm font-extrabold text-amber-700 mt-1">
                    /{choice.soundDisplay}/
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback banner */}
          <AnimatePresence>
            {quizFeedback === 'correct' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-sm"
              >
                <MascotAvatar mascot="lion" size="sm" expression="celebrating" />
                <span>Superstar! {quizTarget.letter} makes the &ldquo;{quizTarget.soundDisplay}&rdquo; sound as in {quizTarget.word}!</span>
              </motion.div>
            )}
            {quizFeedback === 'wrong' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-100 border border-rose-300 text-rose-950 font-bold text-xs sm:text-sm"
              >
                <MascotAvatar mascot="lion" size="sm" expression="curious" />
                <span>Nice try! Listen to the sound again and tap the matching letter!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* STANDARD SOUNDBOARD MODE: Letter Grid + Phonics Spotlight */
        <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full">
          {/* LEFT: Featured Letter Phonics Spotlight & Mouth Guide */}
          <div className="w-full lg:w-[380px] shrink-0 flex flex-col">
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border-4 border-indigo-200 flex flex-col justify-between overflow-hidden flex-1 relative">
              {/* Colorful gradient top accent */}
              <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${currentItem.bgGradient}`} />

              {/* Header inside spotlight */}
              <div className="flex items-center justify-between mt-1 mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Phonics Spotlight</span>
                </div>

                {currentItem.isVowel && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-black text-[11px] flex items-center gap-1">
                    ⭐ Magic Vowel
                  </span>
                )}
              </div>

              {/* Big Animated Letter & Sound Showcase */}
              <div className="flex flex-col items-center text-center my-2">
                <motion.div
                  key={currentItem.letter}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="flex flex-col items-center"
                >
                  {/* Uppercase and Lowercase */}
                  <div className="flex items-baseline gap-3">
                    <span 
                      className="text-7xl sm:text-8xl font-black tracking-tight"
                      style={{ color: currentItem.color }}
                    >
                      {currentItem.letter}
                    </span>
                    <span className="text-5xl sm:text-6xl font-extrabold text-indigo-400">
                      {currentItem.lower}
                    </span>
                  </div>

                  {/* Sound Notation Badge */}
                  <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-950 font-black text-sm shadow-xs">
                    <span>Sound:</span>
                    <span className="text-base text-amber-900 font-black">
                      &ldquo;{currentItem.soundDisplay}&rdquo;
                    </span>
                    <span className="text-xs text-amber-700">({currentItem.ipa})</span>
                  </div>

                  {/* Giant Tap to Play Sound Button */}
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => playLetterSound(currentItem)}
                    className="mt-4 btn-3d-amber w-full flex items-center justify-center gap-2.5 py-3 px-5 text-sm sm:text-base font-black text-amber-950 cursor-pointer shadow-md"
                  >
                    <Volume2 className="w-5 h-5 text-amber-950 animate-pulse" />
                    <span>Play &ldquo;{currentItem.soundDisplay}&rdquo; Sound</span>
                  </motion.button>
                </motion.div>

                {/* Sound Mode Selector Buttons */}
                <div className="grid grid-cols-3 gap-1.5 w-full mt-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 text-xs font-black">
                  <button
                    onClick={() => {
                      setSoundMode('short');
                      playLetterSound(currentItem, 'short');
                    }}
                    className={`py-1.5 px-2 rounded-xl transition-all ${
                      soundMode === 'short' 
                        ? 'bg-indigo-600 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Short Sound
                  </button>
                  <button
                    onClick={() => {
                      setSoundMode('intro');
                      playLetterSound(currentItem, 'intro');
                    }}
                    className={`py-1.5 px-2 rounded-xl transition-all ${
                      soundMode === 'intro' 
                        ? 'bg-indigo-600 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Letter & Sound
                  </button>
                  <button
                    onClick={() => {
                      setSoundMode('chant');
                      playLetterSound(currentItem, 'chant');
                    }}
                    className={`py-1.5 px-2 rounded-xl transition-all ${
                      soundMode === 'chant' 
                        ? 'bg-indigo-600 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sound Chant
                  </button>
                </div>

                {/* Toddler Slow Speed Toggle */}
                <div className="flex items-center justify-between w-full mt-2 px-1 text-xs font-bold text-slate-600">
                  <span>Playback Pace:</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsSlowMode(false)}
                      className={`px-2 py-0.5 rounded-lg border font-black transition-all ${
                        !isSlowMode ? 'bg-amber-400 text-amber-950 border-amber-500' : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      🐰 Normal
                    </button>
                    <button
                      onClick={() => setIsSlowMode(true)}
                      className={`px-2 py-0.5 rounded-lg border font-black transition-all ${
                        isSlowMode ? 'bg-amber-400 text-amber-950 border-amber-500' : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      🐢 Toddler Slow
                    </button>
                  </div>
                </div>

                {/* Montessori / Phonics Physical Mouth Guide */}
                <div className="w-full mt-4 bg-sky-50 rounded-2xl p-3 border-2 border-sky-200 text-left flex items-start gap-2.5">
                  <div className="text-xl shrink-0 mt-0.5">👄</div>
                  <div>
                    <div className="text-xs font-black text-sky-950 uppercase tracking-wider">
                      How to make the sound:
                    </div>
                    <p className="text-xs font-bold text-sky-900 mt-0.5 leading-snug">
                      {currentItem.mouthGuide}
                    </p>
                  </div>
                </div>

                {/* 3 Clickable Example Words */}
                <div className="w-full mt-3 pt-3 border-t border-slate-100">
                  <div className="text-xs font-black text-slate-700 text-left mb-2 flex items-center justify-between">
                    <span>Words that begin with &ldquo;{currentItem.soundDisplay}&rdquo;:</span>
                    <span className="text-[10px] text-slate-400 font-bold">Tap to hear</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 w-full">
                    {currentItem.exampleWords.map((item) => (
                      <button
                        key={item.word}
                        onClick={() => {
                          audio.playPop(1.1);
                          audio.speak(`${currentItem.soundDisplay}, ${item.word}!`);
                        }}
                        className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95"
                      >
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-[11px] font-black text-slate-800 mt-1 truncate max-w-full">
                          {item.word}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Complete 26-Letter Interactive Grid */}
          <div className="flex-1 bg-white/95 rounded-3xl p-4 sm:p-6 shadow-xl border-4 border-indigo-100 flex flex-col justify-between">
            <div>
              {/* Category Filter Chips & Sound Counter */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-indigo-50">
                {/* Filters */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setFilterType('all');
                      audio.playPop();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      filterType === 'all'
                        ? 'btn-3d-amber text-amber-950'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    All Letters (26)
                  </button>
                  <button
                    onClick={() => {
                      setFilterType('vowels');
                      audio.playPop();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      filterType === 'vowels'
                        ? 'btn-3d-amber text-amber-950'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    ⭐ Vowels (5)
                  </button>
                  <button
                    onClick={() => {
                      setFilterType('consonants');
                      audio.playPop();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      filterType === 'consonants'
                        ? 'btn-3d-amber text-amber-950'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Consonants (21)
                  </button>
                </div>

                {/* Explored sounds progress tracker */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-black">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{exploredSounds.length} / 26 Sounds Discovered</span>
                </div>
              </div>

              {/* 26 Letter Interactive Sound Tiles */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2 sm:gap-3">
                {displayedLetters.map((item) => {
                  const isSelected = selectedLetter === item.letter;
                  const isExplored = exploredSounds.includes(item.letter);

                  return (
                    <motion.button
                      key={item.letter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleSelectLetter(item)}
                      className={`relative min-h-[76px] sm:min-h-[84px] p-2 rounded-2xl flex flex-col items-center justify-between font-black transition-all border-3 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-indigo-700 shadow-lg scale-105 z-10'
                          : item.isVowel
                          ? 'bg-amber-50 hover:bg-amber-100/80 text-slate-900 border-amber-300 shadow-xs'
                          : 'bg-white hover:bg-indigo-50/70 text-slate-900 border-indigo-100 shadow-xs hover:border-indigo-300'
                      }`}
                    >
                      {/* Explored check mark */}
                      {isExplored && !isSelected && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-black">
                          ✓
                        </div>
                      )}

                      {/* Vowel star badge */}
                      {item.isVowel && !isSelected && (
                        <div className="absolute top-1 left-1 text-[9px]">
                          ⭐
                        </div>
                      )}

                      {/* Letter Pair */}
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className={`text-xl sm:text-2xl font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {item.letter}
                        </span>
                        <span className={`text-sm sm:text-base font-extrabold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {item.lower}
                        </span>
                      </div>

                      {/* Phonetic Short Sound Pill */}
                      <div className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-tight ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : item.isVowel 
                          ? 'bg-amber-200 text-amber-950' 
                          : 'bg-indigo-50 text-indigo-800'
                      }`}>
                        /{item.soundDisplay}/
                      </div>

                      {/* Cute associated emoji */}
                      <div className="text-base sm:text-lg select-none filter drop-shadow-xs -mb-0.5">
                        {item.emoji}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Leo Mascot Learning Tip Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3 bg-amber-50/70 rounded-2xl p-3 border border-amber-200">
              <MascotAvatar mascot="lion" size="sm" expression="happy" />
              <div className="text-xs font-bold text-amber-950 leading-tight">
                <p>
                  <strong>Leo&apos;s Phonics Secret:</strong> Every letter has a special short sound! Click on any letter above to hear it, or switch to the <strong>🎯 Sound Detective Quiz</strong> to test your ears!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
