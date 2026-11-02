import React, { useState } from 'react';
import { Volume2, RefreshCw, Star, Plus, Minus, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

const NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

export const NumberKingdom: React.FC = () => {
  const { currentProfile, addStar, celebrate, playPositiveFeedback, currentLang, t } = useGame();
  const [activeTab, setActiveTab] = useState<'counting' | 'math' | 'train'>('counting');

  // Counting Mode state
  const [selectedNum, setSelectedNum] = useState(5);
  const [tappedItems, setTappedItems] = useState<number[]>([]);

  // Math Mode state
  const [mathA, setMathA] = useState(2);
  const [mathB, setMathB] = useState(3);
  const [mathOp, setMathOp] = useState<'+' | '-'>('+');
  const [mathOptions, setMathOptions] = useState<number[]>([4, 5, 6]);

  const maxNum = currentProfile.ageGroup === '0-1' || currentProfile.ageGroup === '1-2' ? 5 : currentProfile.ageGroup === '2-3' ? 10 : 20;

  const handleSelectNumber = (n: number) => {
    setSelectedNum(n);
    setTappedItems([]);
    audio.playPop(1.0 + n * 0.03);
    audio.speak(`${n}`, currentLang);
  };

  const handleTapObject = (idx: number) => {
    if (!tappedItems.includes(idx)) {
      const next = [...tappedItems, idx];
      setTappedItems(next);
      const count = next.length;
      audio.playPop(1.0 + count * 0.08);
      audio.speak(`${count}`, currentLang);

      if (count === selectedNum) {
        addStar(1);
        playPositiveFeedback();
        celebrate({
          title: 'Counting Champion!',
          subtitle: `Fantastic! You counted all ${selectedNum} stars!`,
          stars: 1
        });
      }
    }
  };

  const generateNewMath = () => {
    const isSubtraction = currentProfile.ageGroup === '4-5' && Math.random() > 0.5;
    if (isSubtraction) {
      const a = Math.floor(Math.random() * 5) + 3; // 3 to 7
      const b = Math.floor(Math.random() * (a - 1)) + 1; // 1 to a-1
      setMathA(a);
      setMathB(b);
      setMathOp('-');
      const correct = a - b;
      const wrong1 = correct + 1;
      const wrong2 = Math.max(1, correct - 1);
      setMathOptions([correct, wrong1, wrong2].sort(() => 0.5 - Math.random()));
    } else {
      const maxVal = currentProfile.ageGroup === '2-3' ? 3 : 5;
      const a = Math.floor(Math.random() * maxVal) + 1;
      const b = Math.floor(Math.random() * maxVal) + 1;
      setMathA(a);
      setMathB(b);
      setMathOp('+');
      const correct = a + b;
      const wrong1 = correct + 1;
      const wrong2 = Math.max(1, correct - 1);
      setMathOptions([correct, wrong1, wrong2].sort(() => 0.5 - Math.random()));
    }
  };

  const handleMathAnswer = (val: number) => {
    const correct = mathOp === '+' ? mathA + mathB : mathA - mathB;
    if (val === correct) {
      addStar(1);
      playPositiveFeedback();
      celebrate({
        title: 'Math Garden Master!',
        subtitle: `Brilliant! ${mathA} ${mathOp} ${mathB} = ${correct}!`,
        stars: 2
      });
      setTimeout(generateNewMath, 1200);
    } else {
      audio.playGentleTryAgain();
      audio.speak(t.tryAgain, currentLang);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-yellow-50 to-orange-50 flex flex-col">
      <WorldHeader
        title={t.worlds['number-kingdom'].title}
        instructionText="Tap numbers and count magical stars together!"
        accentColor="bg-amber-400"
      />

      {/* Tabs */}
      <div className="flex justify-center gap-2 p-3 bg-white/70 backdrop-blur-xs border-b border-amber-200">
        <button
          onClick={() => { setActiveTab('counting'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'counting'
              ? 'bg-amber-500 text-white shadow-md scale-105'
              : 'bg-white text-amber-900 hover:bg-amber-50'
          }`}
        >
          ⭐ Interactive Counting
        </button>

        <button
          onClick={() => {
            setActiveTab('math');
            audio.playPop();
            generateNewMath();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'math'
              ? 'bg-amber-500 text-white shadow-md scale-105'
              : 'bg-white text-amber-900 hover:bg-amber-50'
          }`}
        >
          ➕ Fun Math Garden
        </button>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center">
        {/* MODE 1: INTERACTIVE COUNTING */}
        {activeTab === 'counting' && (
          <div className="w-full flex flex-col items-center gap-6">
            {/* Number Selector Ribbon */}
            <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {NUMBERS.slice(0, maxNum).map((n) => (
                <button
                  key={n}
                  onClick={() => handleSelectNumber(n)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl font-black text-xl sm:text-2xl shrink-0 transition-transform active:scale-95 border-2 shadow-xs ${
                    selectedNum === n
                      ? 'bg-amber-500 text-white border-amber-600 scale-105 shadow-md'
                      : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Main Interactive Stage */}
            <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 text-center animate-pop">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-6xl sm:text-7xl font-black text-amber-600">{selectedNum}</span>
                <button
                  onClick={() => audio.speak(`Can you tap ${selectedNum} stars?`, currentLang)}
                  className="rounded-full bg-amber-100 p-2 text-amber-700 hover:bg-amber-200"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>

              <p className="text-sm sm:text-base font-bold text-slate-700 mb-6">
                Tap each star to count up to {selectedNum}! ({tappedItems.length} of {selectedNum})
              </p>

              {/* Objects to tap */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 my-4 min-h-[140px] items-center">
                {Array.from({ length: selectedNum }).map((_, idx) => {
                  const isTapped = tappedItems.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleTapObject(idx)}
                      className={`w-14 h-14 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all transform active:scale-90 ${
                        isTapped
                          ? 'bg-amber-400 border-3 border-amber-500 shadow-md scale-105 text-amber-950'
                          : 'bg-amber-50 border-2 border-dashed border-amber-300 hover:bg-amber-100 shadow-xs'
                      }`}
                    >
                      {isTapped ? '⭐' : '✨'}
                    </button>
                  );
                })}
              </div>

              {tappedItems.length === selectedNum && (
                <div className="mt-4 p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-extrabold text-lg flex items-center justify-center gap-2 animate-bounce-gentle">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>{t.youDidIt}! {selectedNum} Stars counted!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODE 2: FUN MATH GARDEN */}
        {activeTab === 'math' && (
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 text-center animate-pop">
            <h2 className="text-xl font-black text-slate-800 mb-4">
              Math Challenge
            </h2>

            {/* Visual Formula with Apple icons */}
            <div className="rounded-2xl bg-amber-50 p-6 border-2 border-amber-200 mb-6">
              <div className="flex items-center justify-center gap-4 text-3xl sm:text-4xl font-black text-amber-900">
                <div className="flex flex-col items-center">
                  <div className="flex gap-1 text-2xl mb-1">
                    {Array.from({ length: mathA }).map((_, i) => (
                      <span key={i}>🍎</span>
                    ))}
                  </div>
                  <span>{mathA}</span>
                </div>

                <span className="text-amber-500 font-extrabold text-4xl">
                  {mathOp === '+' ? '+' : '−'}
                </span>

                <div className="flex flex-col items-center">
                  <div className="flex gap-1 text-2xl mb-1">
                    {Array.from({ length: mathB }).map((_, i) => (
                      <span key={i}>🍎</span>
                    ))}
                  </div>
                  <span>{mathB}</span>
                </div>

                <span className="text-slate-400">=</span>

                <span className="w-16 h-16 rounded-2xl bg-amber-200/80 border-2 border-amber-400 flex items-center justify-center text-amber-800 font-black text-3xl">
                  ?
                </span>
              </div>
            </div>

            {/* Choice Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {mathOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleMathAnswer(opt)}
                  className="h-18 rounded-2xl bg-amber-400 hover:bg-amber-300 border-3 border-amber-500 text-amber-950 font-black text-3xl shadow-md transition-transform active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={generateNewMath}
              className="mt-6 inline-flex items-center gap-2 text-xs text-amber-700 font-bold hover:underline"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Math Challenge</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
