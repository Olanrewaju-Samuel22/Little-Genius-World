import React, { useState } from 'react';
import { Volume2, Sparkles, RefreshCw, Star } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

interface AnimalItem {
  name: string;
  emoji: string;
  soundKey: string;
  category: 'farm' | 'wild' | 'sea' | 'birds';
  habitat: string;
  soundPrompt: string;
  yo: string;
  ha: string;
  ig: string;
}

const ANIMALS: AnimalItem[] = [
  // Farm
  { name: 'Cow', emoji: '🐮', soundKey: 'cow', category: 'farm', habitat: 'Barn', soundPrompt: 'Moo Moo', yo: 'Malu', ha: 'Saniya', ig: 'Ehi' },
  { name: 'Duck', emoji: '🦆', soundKey: 'duck', category: 'farm', habitat: 'Pond', soundPrompt: 'Quack Quack', yo: 'Pẹpẹyẹ', ha: 'Agwagwa', ig: 'Ọbọgwụ' },
  { name: 'Dog', emoji: '🐶', soundKey: 'dog', category: 'farm', habitat: 'Yard', soundPrompt: 'Woof Woof', yo: 'Ajá', ha: 'Kare', ig: 'Nkịta' },
  { name: 'Cat', emoji: '🐱', soundKey: 'cat', category: 'farm', habitat: 'Home', soundPrompt: 'Meow Meow', yo: 'Ológbò', ha: 'Kyanwa', ig: 'Nwamba' },
  
  // Wild
  { name: 'Lion', emoji: '🦁', soundKey: 'lion', category: 'wild', habitat: 'Savanna', soundPrompt: 'Roaaar!', yo: 'Kìnìún', ha: 'Zaki', ig: 'Ọdụm' },
  { name: 'Frog', emoji: '🐸', soundKey: 'frog', category: 'wild', habitat: 'Swamp', soundPrompt: 'Ribbit Ribbit', yo: 'Ọ̀pọ̀lọ́', ha: 'Kwado', ig: 'Awọ' },
  { name: 'Elephant', emoji: '🐘', soundKey: 'elephant', category: 'wild', habitat: 'Jungle', soundPrompt: 'Pawoo!', yo: 'Erin', ha: 'Giwa', ig: 'Enyí' },
  { name: 'Monkey', emoji: '🐒', soundKey: 'monkey', category: 'wild', habitat: 'Trees', soundPrompt: 'Ooh ooh aah!', yo: 'Ọ̀bọ', ha: 'Biri', ig: 'Enwe' },

  // Sea
  { name: 'Whale', emoji: '🐳', soundKey: 'whale', category: 'sea', habitat: 'Deep Ocean', soundPrompt: 'Splash!', yo: 'Ẹja Àbùkè', ha: 'Kifin Kunkuru', ig: 'Nnukwu azụ' },
  { name: 'Dolphin', emoji: '🐬', soundKey: 'dolphin', category: 'sea', habitat: 'Coral Reef', soundPrompt: 'Click whistle!', yo: 'Ẹja Dọ́fínì', ha: 'Kifin Dolphin', ig: 'Azụ Dọlfin' },
  { name: 'Crab', emoji: '🦀', soundKey: 'crab', category: 'sea', habitat: 'Beach', soundPrompt: 'Snap snap!', yo: 'Akàn', ha: 'Kaguwa', ig: 'Nshịkọ' },

  // Birds
  { name: 'Little Bird', emoji: '🐦', soundKey: 'bird', category: 'birds', habitat: 'Sky', soundPrompt: 'Tweet Tweet', yo: 'Ẹyẹ', ha: 'Tsuntsu', ig: 'Nnụnụ' },
  { name: 'Owl', emoji: '🦉', soundKey: 'owl', category: 'birds', habitat: 'Tall Oak Tree', soundPrompt: 'Hoo Hoo!', yo: 'Òwìwí', ha: 'Mujiya', ig: 'Ikwikwi' },
  { name: 'Penguin', emoji: '🐧', soundKey: 'penguin', category: 'birds', habitat: 'Snow & Ice', soundPrompt: 'Waddle chirp!', yo: 'Pẹ́ngúìnì', ha: 'Penguin', ig: 'Penguịn' },
];

export const AnimalWorld: React.FC = () => {
  const { addStar, celebrate, playPositiveFeedback, currentLang, t } = useGame();
  const [activeCategory, setActiveCategory] = useState<'all' | 'farm' | 'wild' | 'sea' | 'birds'>('all');
  const [activeTab, setActiveTab] = useState<'safari' | 'quiz'>('safari');

  // Quiz state
  const [quizAnimal, setQuizAnimal] = useState(() => ANIMALS[0]);
  const [quizChoices, setQuizChoices] = useState<AnimalItem[]>(() => {
    return [ANIMALS[0], ANIMALS[1], ANIMALS[4]].sort(() => 0.5 - Math.random());
  });

  const nextQuiz = () => {
    const target = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const others = ANIMALS.filter(a => a.name !== target.name).sort(() => 0.5 - Math.random()).slice(0, 2);
    setQuizAnimal(target);
    setQuizChoices([target, ...others].sort(() => 0.5 - Math.random()));
    audio.playAnimalSound(target.soundKey);
  };

  const handleAnimalTap = (animal: AnimalItem) => {
    audio.playAnimalSound(animal.soundKey);
    const langName = currentLang === 'yo' ? animal.yo : currentLang === 'ha' ? animal.ha : currentLang === 'ig' ? animal.ig : animal.name;
    setTimeout(() => {
      audio.speak(`${langName}! ${animal.soundPrompt}`, currentLang);
    }, 400);
  };

  const handleQuizAnswer = (choice: AnimalItem) => {
    if (choice.name === quizAnimal.name) {
      addStar(1);
      playPositiveFeedback();
      celebrate();
      setTimeout(nextQuiz, 1200);
    } else {
      audio.playGentleTryAgain();
      audio.speak(t.tryAgain, currentLang);
    }
  };

  const filteredAnimals = activeCategory === 'all'
    ? ANIMALS
    : ANIMALS.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-teal-50 to-sky-50 flex flex-col">
      <WorldHeader
        title={t.worlds['animal-world'].title}
        instructionText="Tap friendly animals to hear their real sounds and guess who makes each sound!"
        accentColor="bg-emerald-400"
      />

      {/* Tabs */}
      <div className="flex justify-center gap-2 p-3 bg-white/70 backdrop-blur-xs border-b border-emerald-200">
        <button
          onClick={() => { setActiveTab('safari'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'safari'
              ? 'bg-emerald-600 text-white shadow-md scale-105'
              : 'bg-white text-emerald-900 hover:bg-emerald-50'
          }`}
        >
          🐾 Animal Safari
        </button>

        <button
          onClick={() => {
            setActiveTab('quiz');
            audio.playPop();
            nextQuiz();
          }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'quiz'
              ? 'bg-emerald-600 text-white shadow-md scale-105'
              : 'bg-white text-emerald-900 hover:bg-emerald-50'
          }`}
        >
          🔊 Sound Detective
        </button>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col">
        {/* MODE 1: SAFARI EXPLORER */}
        {activeTab === 'safari' && (
          <div className="space-y-4">
            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
              {[
                { id: 'all', label: 'All Friends' },
                { id: 'farm', label: '🚜 Farm' },
                { id: 'wild', label: '🌴 Wild Jungle' },
                { id: 'sea', label: '🌊 Sea Ocean' },
                { id: 'birds', label: '🪶 Birds' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setActiveCategory(c.id as typeof activeCategory); audio.playPop(1.1); }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    activeCategory === c.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Animal Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredAnimals.map((animal) => {
                const langName = currentLang === 'yo' ? animal.yo : currentLang === 'ha' ? animal.ha : currentLang === 'ig' ? animal.ig : animal.name;
                return (
                  <button
                    key={animal.name}
                    onClick={() => handleAnimalTap(animal)}
                    className="group bg-white rounded-3xl p-5 shadow-md border-3 border-emerald-200 hover:border-emerald-400 flex flex-col items-center text-center transition-all transform active:scale-95 hover:-translate-y-1"
                  >
                    <div className="text-6xl my-2 group-hover:scale-110 transition-transform">
                      {animal.emoji}
                    </div>
                    <div className="text-base font-black text-slate-800">{langName}</div>
                    <div className="text-xs text-emerald-600 font-bold">{animal.soundPrompt}</div>
                    <div className="mt-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      {animal.habitat}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 2: SOUND DETECTIVE QUIZ */}
        {activeTab === 'quiz' && (
          <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full text-center">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-emerald-300 w-full animate-pop">
              <h2 className="text-xl font-black text-slate-800 mb-2">
                Who makes this sound?
              </h2>

              <p className="text-xs text-slate-500 mb-4">
                Listen carefully and tap the animal friend!
              </p>

              {/* Sound Button */}
              <button
                onClick={() => {
                  audio.playAnimalSound(quizAnimal.soundKey);
                }}
                className="my-3 inline-flex items-center gap-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3.5 text-lg shadow-md transition-transform active:scale-95 animate-bounce-gentle"
              >
                <Volume2 className="w-6 h-6" />
                <span>Play Sound Again</span>
              </button>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {quizChoices.map((choice) => {
                  const langName = currentLang === 'yo' ? choice.yo : currentLang === 'ha' ? choice.ha : currentLang === 'ig' ? choice.ig : choice.name;
                  return (
                    <button
                      key={choice.name}
                      onClick={() => handleQuizAnswer(choice)}
                      className="aspect-square rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-3 border-emerald-200 hover:border-emerald-400 shadow-sm flex flex-col items-center justify-center p-2 transition-transform active:scale-95"
                    >
                      <span className="text-5xl">{choice.emoji}</span>
                      <span className="text-xs font-bold text-slate-800 mt-1">{langName}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={nextQuiz}
                className="mt-6 inline-flex items-center gap-2 text-xs text-emerald-700 font-bold hover:underline"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Next Animal</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
