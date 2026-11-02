import React, { useState } from 'react';
import { RefreshCw, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

const MEMORY_ICONS = ['🦁', '🐧', '🐰', '🦉', '🐘', '🦄', '⭐', '🌈'];

export const PuzzlePlanet: React.FC = () => {
  const { currentProfile, addStar, celebrate, playPositiveFeedback, t } = useGame();
  const [activeTab, setActiveTab] = useState<'memory' | 'pattern'>('memory');

  // Memory Game State
  const pairCount = currentProfile.ageGroup === '0-1' || currentProfile.ageGroup === '1-2' ? 2 : currentProfile.ageGroup === '2-3' ? 3 : 4;

  const [cards, setCards] = useState(() => initMemoryCards(pairCount));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  function initMemoryCards(pairs: number) {
    const selected = MEMORY_ICONS.slice(0, pairs);
    const deck = [...selected, ...selected].map((icon, id) => ({
      id,
      icon,
    }));
    return deck.sort(() => 0.5 - Math.random());
  }

  const resetMemoryGame = () => {
    setCards(initMemoryCards(pairCount));
    setFlippedIndices([]);
    setMatchedPairs([]);
    audio.playPop(1.1);
  };

  const handleCardClick = (idx: number) => {
    // Prevent clicking already matched or flipped cards or clicking 2 while processing
    if (flippedIndices.length >= 2 || flippedIndices.includes(idx)) return;
    const card = cards[idx];
    if (matchedPairs.includes(card.icon)) return;

    audio.playPop(1.2);
    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first.icon === second.icon) {
        // Matched!
        setTimeout(() => {
          audio.playSuccess();
          const nextMatched = [...matchedPairs, first.icon];
          setMatchedPairs(nextMatched);
          setFlippedIndices([]);
          addStar(1);

          if (nextMatched.length === pairCount) {
            playPositiveFeedback();
            celebrate({
              title: 'Memory Planet Master!',
              subtitle: `Super brain power! All ${pairCount} matching pairs found!`,
              stars: 3
            });
          }
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          audio.playGentleTryAgain();
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  // Pattern Detective State
  const PATTERNS = [
    { seq: ['🍎', '🍌', '🍎', '🍌'], answer: '🍎', choices: ['🍎', '🍌', '🍇'] },
    { seq: ['⭐', '🌙', '⭐', '🌙'], answer: '⭐', choices: ['☀️', '⭐', '🌙'] },
    { seq: ['🔴', '🔵', '🔴', '🔵'], answer: '🔴', choices: ['🔴', '🔵', '🟢'] },
    { seq: ['🐱', '🐶', '🐱', '🐶'], answer: '🐱', choices: ['🐱', '🐶', '🐰'] },
  ];
  const [patternIdx, setPatternIdx] = useState(0);

  const currentPattern = PATTERNS[patternIdx];

  const handlePatternChoice = (choice: string) => {
    if (choice === currentPattern.answer) {
      addStar(1);
      playPositiveFeedback();
      celebrate({
        title: 'Pattern Detective Master!',
        subtitle: 'Great thinking! You found the next pattern item!',
        stars: 2
      });
      setTimeout(() => {
        setPatternIdx((patternIdx + 1) % PATTERNS.length);
      }, 1200);
    } else {
      audio.playGentleTryAgain();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-indigo-50 to-pink-50 flex flex-col">
      <WorldHeader
        title={t.worlds['puzzle-planet'].title}
        instructionText="Solve friendly memory cards and pattern puzzles to win stars!"
        accentColor="bg-purple-400"
      />

      <div className="flex justify-center gap-2 p-3 bg-white/70 backdrop-blur-xs border-b border-purple-200">
        <button
          onClick={() => { setActiveTab('memory'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'memory'
              ? 'bg-purple-600 text-white shadow-md scale-105'
              : 'bg-white text-purple-900 hover:bg-purple-50'
          }`}
        >
          🃏 Memory Match
        </button>

        <button
          onClick={() => { setActiveTab('pattern'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'pattern'
              ? 'bg-purple-600 text-white shadow-md scale-105'
              : 'bg-white text-purple-900 hover:bg-purple-50'
          }`}
        >
          🧩 Pattern Detective
        </button>
      </div>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center">
        {/* MODE 1: MEMORY MATCH */}
        {activeTab === 'memory' && (
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-purple-300 text-center animate-pop">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-slate-800">
                Find the Matching Pairs!
              </h2>
              <button
                onClick={resetMemoryGame}
                className="flex items-center gap-1 text-xs text-purple-600 font-bold hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
            </div>

            {/* Memory Card Grid */}
            <div className={`grid gap-3 sm:gap-4 my-4 ${pairCount <= 2 ? 'grid-cols-2' : 'grid-cols-3 sm:grid-cols-4'}`}>
              {cards.map((card, idx) => {
                const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(card.icon);
                const isMatched = matchedPairs.includes(card.icon);

                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(idx)}
                    className={`aspect-square rounded-2xl flex items-center justify-center text-4xl sm:text-5xl transition-all duration-300 transform active:scale-95 border-3 shadow-md ${
                      isMatched
                        ? 'bg-emerald-100 border-emerald-400 scale-95 opacity-80'
                        : isFlipped
                        ? 'bg-purple-100 border-purple-400 shadow-lg scale-102'
                        : 'bg-linear-to-br from-purple-500 to-indigo-600 border-purple-700 text-transparent hover:scale-102'
                    }`}
                  >
                    {isFlipped ? (
                      card.icon
                    ) : (
                      <span className="text-2xl text-white/90">❓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {matchedPairs.length === pairCount && (
              <div className="mt-4 p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-base flex items-center justify-center gap-2 animate-bounce-gentle">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Super Memory Master! All Pairs Found!</span>
              </div>
            )}
          </div>
        )}

        {/* MODE 2: PATTERN DETECTIVE */}
        {activeTab === 'pattern' && (
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-purple-300 text-center animate-pop">
            <h2 className="text-xl font-black text-slate-800 mb-2">
              What Comes Next?
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Follow the fun pattern and tap the missing piece!
            </p>

            {/* Pattern Train */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 p-4 rounded-2xl bg-purple-50 border-2 border-purple-200 mb-6">
              {currentPattern.seq.map((item, i) => (
                <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-purple-200 flex items-center justify-center text-2xl sm:text-3xl shadow-xs">
                  {item}
                </div>
              ))}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-200/70 border-2 border-dashed border-purple-400 flex items-center justify-center text-xl font-bold text-purple-700 animate-pulse">
                ?
              </div>
            </div>

            {/* Choices */}
            <div className="grid grid-cols-3 gap-3">
              {currentPattern.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handlePatternChoice(choice)}
                  className="h-16 sm:h-20 rounded-2xl bg-white hover:bg-purple-100 border-3 border-purple-200 hover:border-purple-400 text-3xl sm:text-4xl flex items-center justify-center shadow-md transition-transform active:scale-95"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
