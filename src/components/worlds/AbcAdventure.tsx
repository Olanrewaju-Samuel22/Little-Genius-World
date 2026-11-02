import React, { useState } from 'react';
import { Volume2, Sparkles, RefreshCw, Star } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

const ALPHABET_DATA = [
  { letter: 'A', lower: 'a', word: 'Apple', emoji: '🍎', sound: 'ah', yo: 'Ápùlù', ha: 'Afal', ig: 'Apụl' },
  { letter: 'B', lower: 'b', word: 'Butterfly', emoji: '🦋', sound: 'buh', yo: 'Labalaba', ha: 'Malam buɗe mana littafi', ig: 'Urukwu' },
  { letter: 'C', lower: 'c', word: 'Cat', emoji: '🐱', sound: 'kuh', yo: 'Ológbò', ha: 'Kyanwa', ig: 'Nwamba' },
  { letter: 'D', lower: 'd', word: 'Dolphin', emoji: '🐬', sound: 'duh', yo: 'Ẹja Dọ́fínì', ha: 'Kifin Dolphin', ig: 'Azụ Dọlfin' },
  { letter: 'E', lower: 'e', word: 'Elephant', emoji: '🐘', sound: 'eh', yo: 'Erin', ha: 'Giwa', ig: 'Enyí' },
  { letter: 'F', lower: 'f', word: 'Fish', emoji: '🐠', sound: 'fuh', yo: 'Ẹja', ha: 'Kifi', ig: 'Azụ' },
  { letter: 'G', lower: 'g', word: 'Giraffe', emoji: '🦒', sound: 'guh', yo: 'Àgùnfọn', ha: 'Rakumin dawa', ig: 'Ezì' },
  { letter: 'H', lower: 'h', word: 'Hat', emoji: '👒', sound: 'huh', yo: 'Fìlà', ha: 'Hula', ig: 'Okpu' },
  { letter: 'I', lower: 'i', word: 'Ice cream', emoji: '🍦', sound: 'ih', yo: 'Aísì Kírímù', ha: 'Ais kirim', ig: 'Aịs krịm' },
  { letter: 'J', lower: 'j', word: 'Jellyfish', emoji: '🪼', sound: 'juh', yo: 'Ẹja Jẹ́lì', ha: 'Kifin Jelly', ig: 'Azụ Jelly' },
  { letter: 'K', lower: 'k', word: 'Kangaroo', emoji: '🦘', sound: 'kuh', yo: 'Kàngarúù', ha: 'Kangaroo', ig: 'Kangarù' },
  { letter: 'L', lower: 'l', word: 'Lion', emoji: '🦁', sound: 'luh', yo: 'Kìnìún', ha: 'Zaki', ig: 'Ọdụm' },
  { letter: 'M', lower: 'm', word: 'Monkey', emoji: '🐒', sound: 'muh', yo: 'Ọ̀bọ', ha: 'Biri', ig: 'Enwe' },
  { letter: 'N', lower: 'n', word: 'Nest', emoji: '🪹', sound: 'nuh', yo: 'Tẹ́kùkù', ha: 'Sheƙa', ig: 'Akwụ' },
  { letter: 'O', lower: 'o', word: 'Owl', emoji: '🦉', sound: 'oh', yo: 'Òwìwí', ha: 'Mujiya', ig: 'Ikwikwi' },
  { letter: 'P', lower: 'p', word: 'Penguin', emoji: '🐧', sound: 'puh', yo: 'Pẹ́ngúìnì', ha: 'Penguin', ig: 'Penguịn' },
  { letter: 'Q', lower: 'q', word: 'Queen', emoji: '👑', sound: 'kwuh', yo: 'Ayaba', ha: 'Sarauniya', ig: 'Eze nwanyị' },
  { letter: 'R', lower: 'r', word: 'Rabbit', emoji: '🐰', sound: 'ruh', yo: 'Ehoro', ha: 'Zomo', ig: 'Rabitị' },
  { letter: 'S', lower: 's', word: 'Sun', emoji: '☀️', sound: 'suh', yo: 'Oòrùn', ha: 'Rana', ig: 'Anyanwụ' },
  { letter: 'T', lower: 't', word: 'Tiger', emoji: '🐯', sound: 'tuh', yo: 'Ẹkùn', ha: 'Damisa', ig: 'Agu' },
  { letter: 'U', lower: 'u', word: 'Umbrella', emoji: '☂️', sound: 'uh', yo: 'Agboòrùn', ha: 'Laima', ig: 'Nche anwụ' },
  { letter: 'V', lower: 'v', word: 'Violin', emoji: '🎻', sound: 'vuh', yo: 'Fáyólíìnì', ha: 'Goge', ig: 'Vayọlịn' },
  { letter: 'W', lower: 'w', word: 'Whale', emoji: '🐳', sound: 'wuh', yo: 'Ẹja Àbùkè', ha: 'Kifin kunkuru', ig: 'Nnukwu azụ' },
  { letter: 'X', lower: 'x', word: 'Xylophone', emoji: '🎵', sound: 'ks', yo: 'Zílófóònù', ha: 'Zylophone', ig: 'Zaelofon' },
  { letter: 'Y', lower: 'y', word: 'Yak', emoji: '🐂', sound: 'yuh', yo: 'Malu Yak', ha: 'Yak', ig: 'Yak' },
  { letter: 'Z', lower: 'z', word: 'Zebra', emoji: '🦓', sound: 'zuh', yo: 'Kẹ́tẹ́kẹ́tẹ́ abilà', ha: 'Jaki na dawa', ig: 'Zebra' }
];

export const AbcAdventure: React.FC = () => {
  const { currentProfile, addStar, celebrate, playPositiveFeedback, currentLang, t } = useGame();
  const [activeTab, setActiveTab] = useState<'explorer' | 'quiz' | 'matcher'>('explorer');
  const [selectedLetter, setSelectedLetter] = useState(ALPHABET_DATA[0]);

  // Quiz state
  const [targetItem, setTargetItem] = useState(() => ALPHABET_DATA[Math.floor(Math.random() * 8)]);
  const [quizOptions, setQuizOptions] = useState(() => generateQuizOptions(ALPHABET_DATA[0], currentProfile.ageGroup));
  const [streak, setStreak] = useState(0);

  function generateQuizOptions(target: typeof ALPHABET_DATA[0], ageGroup: string) {
    const count = ageGroup === '0-1' || ageGroup === '1-2' ? 2 : ageGroup === '2-3' ? 3 : 4;
    const pool = ALPHABET_DATA.filter(i => i.letter !== target.letter);
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const choices = [target, ...shuffledPool.slice(0, count - 1)];
    return choices.sort(() => 0.5 - Math.random());
  }

  const handleNextQuiz = (nextTarget = ALPHABET_DATA[Math.floor(Math.random() * ALPHABET_DATA.length)]) => {
    setTargetItem(nextTarget);
    setQuizOptions(generateQuizOptions(nextTarget, currentProfile.ageGroup));
  };

  const handleLetterClick = (item: typeof ALPHABET_DATA[0]) => {
    setSelectedLetter(item);
    audio.playPop(1.1);

    // Speak letter & word in selected language
    const langWord = currentLang === 'yo' ? item.yo : currentLang === 'ha' ? item.ha : currentLang === 'ig' ? item.ig : item.word;
    audio.speak(`${item.letter}. ${item.letter} is for ${langWord}`, currentLang);
  };

  const handleQuizAnswer = (item: typeof ALPHABET_DATA[0]) => {
    if (item.letter === targetItem.letter) {
      addStar(1);
      playPositiveFeedback();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 3 === 0) {
        celebrate({
          title: 'ABC Explorer Champion!',
          subtitle: `Incredible! Streak of ${newStreak} letters found!`,
          stars: 2
        });
      }
      setTimeout(() => {
        handleNextQuiz();
      }, 900);
    } else {
      audio.playGentleTryAgain();
      audio.speak(t.tryAgain, currentLang);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 via-sky-50 to-pink-50 flex flex-col">
      <WorldHeader
        title={t.worlds['abc-adventure'].title}
        instructionText="Tap letters to hear their sounds and find the magic letters!"
        accentColor="bg-indigo-400"
      />

      {/* Sub-mode selector tabs */}
      <div className="flex justify-center gap-2 p-3 bg-white/70 backdrop-blur-xs border-b border-indigo-100">
        <button
          onClick={() => { setActiveTab('explorer'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'explorer'
              ? 'bg-indigo-500 text-white shadow-md scale-105'
              : 'bg-white text-indigo-900 hover:bg-indigo-50'
          }`}
        >
          🔤 Letter Explorer
        </button>

        <button
          onClick={() => {
            setActiveTab('quiz');
            audio.playPop();
            handleNextQuiz();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'quiz'
              ? 'bg-indigo-500 text-white shadow-md scale-105'
              : 'bg-white text-indigo-900 hover:bg-indigo-50'
          }`}
        >
          🎯 Find the Letter
        </button>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col">
        {/* MODE 1: EXPLORER */}
        {activeTab === 'explorer' && (
          <div className="flex-1 flex flex-col md:flex-row gap-6 items-center">
            {/* Spotlight Card */}
            <div className="w-full md:w-80 shrink-0 bg-white rounded-3xl p-6 shadow-xl border-4 border-indigo-200 flex flex-col items-center text-center animate-pop">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-black text-indigo-600">{selectedLetter.letter}</span>
                <span className="text-4xl font-extrabold text-indigo-400">{selectedLetter.lower}</span>
              </div>

              <div className="text-7xl my-3 filter drop-shadow-md animate-bounce-gentle">
                {selectedLetter.emoji}
              </div>

              <div className="text-xl font-bold text-slate-800">
                {currentLang === 'yo' ? selectedLetter.yo : currentLang === 'ha' ? selectedLetter.ha : currentLang === 'ig' ? selectedLetter.ig : selectedLetter.word}
              </div>

              <div className="text-xs text-indigo-500 font-semibold mt-1">
                Sound: &ldquo;{selectedLetter.sound}&rdquo;
              </div>

              <button
                onClick={() => handleLetterClick(selectedLetter)}
                className="mt-4 flex items-center gap-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-5 py-2.5 text-sm shadow-md transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Letter</span>
              </button>
            </div>

            {/* Letter Grid A-Z */}
            <div className="flex-1 w-full bg-white/90 rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-indigo-100">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2 sm:gap-3">
                {ALPHABET_DATA.map((item) => {
                  const isCurrent = selectedLetter.letter === item.letter;
                  return (
                    <button
                      key={item.letter}
                      onClick={() => handleLetterClick(item)}
                      className={`h-14 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-black transition-all active:scale-95 border-2 ${
                        isCurrent
                          ? 'bg-indigo-500 text-white border-indigo-600 shadow-md scale-105'
                          : 'bg-white hover:bg-indigo-50 text-indigo-900 border-indigo-100 shadow-xs'
                      }`}
                    >
                      <span className="text-lg sm:text-xl">{item.letter}</span>
                      <span className="text-xs opacity-70 -mt-1">{item.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: FIND THE LETTER QUIZ */}
        {activeTab === 'quiz' && (
          <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full text-center">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-indigo-300 w-full animate-pop">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-4">
                <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
                <span>Streak: {streak} correct</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
                Can you find the letter:
              </h2>

              {/* Big Audio Prompt Button */}
              <button
                onClick={() => {
                  audio.playPop();
                  audio.speak(`Find the letter ${targetItem.letter}`, currentLang);
                }}
                className="my-3 inline-flex items-center gap-3 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-extrabold px-6 py-3 text-lg shadow-sm border border-indigo-300 transition-transform active:scale-95"
              >
                <Volume2 className="w-6 h-6 text-indigo-600" />
                <span>Letter {targetItem.letter}</span>
              </button>

              <div className="text-5xl my-4 animate-float">
                {targetItem.emoji}
              </div>

              {/* Choices Buttons */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
                {quizOptions.map((choice) => (
                  <button
                    key={choice.letter}
                    onClick={() => handleQuizAnswer(choice)}
                    className="h-20 sm:h-24 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-3 border-indigo-200 hover:border-indigo-400 text-indigo-950 font-black text-3xl sm:text-4xl shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>{choice.letter}</span>
                    <span className="text-2xl text-indigo-400">{choice.lower}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleNextQuiz()}
                className="mt-6 inline-flex items-center gap-1.5 text-xs text-indigo-600 font-bold hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Another Letter</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
