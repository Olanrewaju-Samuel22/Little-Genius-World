import React, { useState } from 'react';
import { Volume2, Play, Pause, ChevronLeft, ChevronRight, BookOpen, Star, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

interface StoryBook {
  id: string;
  title: string;
  moral: string;
  coverEmoji: string;
  pages: {
    text: string;
    emoji: string;
    sceneBg: string;
  }[];
}

const STORIES: StoryBook[] = [
  {
    id: 'leo-shares',
    title: "Leo Learns to Share",
    moral: "Sharing toys brings twice as much joy and creates best friends forever!",
    coverEmoji: '🦁',
    pages: [
      {
        text: "Deep in the sunny savanna, Leo the little lion had a brand new shiny red ball.",
        emoji: '🦁 ⚽',
        sceneBg: 'bg-amber-100'
      },
      {
        text: "Pip the penguin watched from behind a tall baobab tree, wishing he could play too.",
        emoji: '🐧 🌳',
        sceneBg: 'bg-emerald-100'
      },
      {
        text: "Leo kicked the ball gently over to Pip with a big warm smile. 'Let's kick it together!' he roared happily.",
        emoji: '🦁 ⚽ 🐧',
        sceneBg: 'bg-sky-100'
      },
      {
        text: "They played until the golden sunset. Leo realized having a friend to share with was the best treasure of all!",
        emoji: '🌅 🦁 🤝 🐧 ⭐',
        sceneBg: 'bg-orange-100'
      }
    ]
  },
  {
    id: 'pips-flight',
    title: "Pip's Brave Adventure",
    moral: "Everyone has their own special gift. Be proud of who you are!",
    coverEmoji: '🐧',
    pages: [
      {
        text: "Pip looked up into the clouds where the little birds were fluttering with their colorful wings.",
        emoji: '🐧 ☁️ 🐦',
        sceneBg: 'bg-sky-100'
      },
      {
        text: "'I want to fly too!' Pip chirped, flapping his tiny penguin flippers as hard as he could.",
        emoji: '🐧 💨',
        sceneBg: 'bg-indigo-100'
      },
      {
        text: "His friend Ollie the wise owl smiled gently. 'Look down into the clear blue water, Pip!'",
        emoji: '🦉 🌊 🐧',
        sceneBg: 'bg-teal-100'
      },
      {
        text: "Pip dived into the ocean and swam like an arrow! He was flying underwater through rainbow fish, happier than ever!",
        emoji: '🐠 🐧 🌊 🐬',
        sceneBg: 'bg-cyan-100'
      }
    ]
  },
  {
    id: 'helpful-hippo',
    title: "The Helpful Garden",
    moral: "Kind hands make the whole world bloom with happiness.",
    coverEmoji: '🦛',
    pages: [
      {
        text: "Barnaby the little hippo noticed that the flowers in the meadow were feeling thirsty in the warm sun.",
        emoji: '🦛 🥀 ☀️',
        sceneBg: 'bg-yellow-100'
      },
      {
        text: "He took his green watering can to the bubbling river and filled it up with fresh sparkling water.",
        emoji: '🦛 💧 🌊',
        sceneBg: 'bg-blue-100'
      },
      {
        text: "Barnaby gently gave a sip of water to every tulip, daisy, and sunflower.",
        emoji: '🦛 🚿 🌻 🌷',
        sceneBg: 'bg-green-100'
      },
      {
        text: "The garden burst into glorious colors, and butterflies danced all around Barnaby in joyful gratitude!",
        emoji: '🦋 🌸 🦛 🌺 🌈',
        sceneBg: 'bg-pink-100'
      }
    ]
  }
];

export const StoryCastle: React.FC = () => {
  const { addStar, celebrate, currentLang, t } = useGame();
  const [selectedStory, setSelectedStory] = useState<StoryBook>(STORIES[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const page = selectedStory.pages[currentPage];

  const handleReadAloud = () => {
    setIsPlayingAudio(true);
    audio.playChime();
    audio.speak(page.text, currentLang);
    setTimeout(() => setIsPlayingAudio(false), 5000);
  };

  const handleNextPage = () => {
    if (currentPage < selectedStory.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
      audio.playPop(1.1);
    } else {
      // Completed book!
      addStar(3);
      celebrate();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      audio.playPop(0.9);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <WorldHeader
        title={t.worlds['story-castle'].title}
        instructionText="Turn the pages to read friendly illustrated bedtime stories with gentle morals!"
        accentColor="bg-blue-400"
      />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center">
        {/* Story Selector Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 w-full justify-start sm:justify-center">
          {STORIES.map((story) => (
            <button
              key={story.id}
              onClick={() => {
                setSelectedStory(story);
                setCurrentPage(0);
                audio.playPop(1.1);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                selectedStory.id === story.id
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              <span className="text-lg">{story.coverEmoji}</span>
              <span>{story.title}</span>
            </button>
          ))}
        </div>

        {/* Big Illustrated Storybook */}
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-blue-300 overflow-hidden flex flex-col animate-pop">
          {/* Illustrated Scene Frame */}
          <div className={`h-60 sm:h-72 w-full ${page.sceneBg} flex flex-col items-center justify-center p-6 border-b-2 border-blue-100 transition-colors duration-500`}>
            <div className="text-6xl sm:text-7xl filter drop-shadow-md animate-float">
              {page.emoji}
            </div>
            <div className="mt-4 text-xs font-bold text-slate-600 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full">
              Page {currentPage + 1} of {selectedStory.pages.length}
            </div>
          </div>

          {/* Story Text Area */}
          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            <p className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed font-sans min-h-[70px]">
              &ldquo;{page.text}&rdquo;
            </p>

            {/* Read-Aloud Voice Button */}
            <button
              onClick={handleReadAloud}
              className="mt-4 flex items-center gap-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-extrabold px-5 py-2 text-sm shadow-xs transition-transform active:scale-95"
            >
              <Volume2 className="w-5 h-5 text-blue-600" />
              <span>Read Aloud</span>
            </button>
          </div>

          {/* Book Bottom Navigation Controls */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`flex items-center gap-1 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold border transition-all ${
                currentPage === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentPage === selectedStory.pages.length - 1 ? (
              <button
                onClick={handleNextPage}
                className="flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black px-5 py-2.5 text-xs sm:text-sm shadow-md transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Finish Story! (+3 ⭐)</span>
              </button>
            ) : (
              <button
                onClick={handleNextPage}
                className="flex items-center gap-1 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black px-5 py-2.5 text-xs sm:text-sm shadow-md transition-transform active:scale-95"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Moral Lesson Banner */}
        <div className="w-full max-w-2xl mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-900 font-medium">
          <BookOpen className="w-5 h-5 text-amber-600 shrink-0" />
          <span><strong>Kind Lesson:</strong> {selectedStory.moral}</span>
        </div>
      </main>
    </div>
  );
};
