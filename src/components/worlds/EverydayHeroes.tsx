import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RefreshCw, Star, Heart } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

export const EverydayHeroes: React.FC = () => {
  const { addStar, celebrate, playPositiveFeedback, t, currentLang } = useGame();
  const [activeTab, setActiveTab] = useState<'handwash' | 'brush' | 'plate' | 'traffic'>('handwash');

  // Handwashing Game State
  const [germsRemaining, setGermsRemaining] = useState([
    { id: 1, x: 25, y: 35, emoji: '👾' },
    { id: 2, x: 65, y: 30, emoji: '🦠' },
    { id: 3, x: 45, y: 55, emoji: '🪱' },
    { id: 4, x: 30, y: 70, emoji: '👾' },
    { id: 5, x: 60, y: 65, emoji: '🦠' },
  ]);
  const [washBubbles, setWashBubbles] = useState<number[]>([]);

  const handleWashGerm = (id: number) => {
    audio.playPop(1.4);
    setWashBubbles(prev => [...prev, id]);
    const nextGerms = germsRemaining.filter(g => g.id !== id);
    setGermsRemaining(nextGerms);

    if (nextGerms.length === 0) {
      addStar(2);
      playPositiveFeedback();
      celebrate({
        title: 'Germ Buster Hero!',
        subtitle: 'Sparkling clean hands! All germs washed away!',
        stars: 2
      });
    }
  };

  const resetHandwashing = () => {
    setGermsRemaining([
      { id: 1, x: 25, y: 35, emoji: '👾' },
      { id: 2, x: 65, y: 30, emoji: '🦠' },
      { id: 3, x: 45, y: 55, emoji: '🪱' },
      { id: 4, x: 30, y: 70, emoji: '👾' },
      { id: 5, x: 60, y: 65, emoji: '🦠' },
    ]);
    setWashBubbles([]);
  };

  // Healthy Plate Game State
  const [plateFoods, setPlateFoods] = useState<string[]>([]);
  const FOOD_CHOICES = [
    { name: 'Crisp Apple', emoji: '🍎', healthy: true },
    { name: 'Sweet Carrot', emoji: '🥕', healthy: true },
    { name: 'Green Broccoli', emoji: '🥦', healthy: true },
    { name: 'Ripe Banana', emoji: '🍌', healthy: true },
    { name: 'Sugar Lollipop', emoji: '🍭', healthy: false },
    { name: 'Chocolate Candy', emoji: '🍫', healthy: false },
  ];

  const handlePickFood = (item: typeof FOOD_CHOICES[0]) => {
    if (item.healthy) {
      audio.playPop(1.2);
      if (!plateFoods.includes(item.name)) {
        const next = [...plateFoods, item.name];
        setPlateFoods(next);
        addStar(1);
        if (next.length === 4) {
          playPositiveFeedback();
          celebrate({
            title: 'Healthy Plate Champion!',
            subtitle: 'Delicious! You built a colorful, nutritious meal!',
            stars: 2
          });
        }
      }
    } else {
      audio.playGentleTryAgain();
      audio.speak("Candy is a yummy treat, but let's choose healthy fruits and veggies for our plate!", currentLang);
    }
  };

  // Traffic Light Game State
  const [trafficColor, setTrafficColor] = useState<'red' | 'yellow' | 'green'>('red');
  const [trafficPrompt, setTrafficPrompt] = useState('Red Light Means: STOP!');

  const handleSetTraffic = (color: 'red' | 'yellow' | 'green') => {
    setTrafficColor(color);
    audio.playPop(1.1);
    if (color === 'red') {
      setTrafficPrompt('Red Light Means: STOP! 🛑');
      audio.speak("Red Light! Stop and stay safe!", currentLang);
    } else if (color === 'yellow') {
      setTrafficPrompt('Yellow Light Means: WAIT & LOOK! ⚠️');
      audio.speak("Yellow Light! Wait and look both ways!", currentLang);
    } else {
      setTrafficPrompt('Green Light Means: GO & WALK SAFELY! 🟢');
      audio.speak("Green Light! Safe to cross with a grown-up!", currentLang);
      addStar(1);
      celebrate({
        title: 'Road Safety Champion!',
        subtitle: 'Green light! Safe to walk across with a grown-up!',
        stars: 1
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-teal-50 to-emerald-50 flex flex-col">
      <WorldHeader
        title={t.worlds['everyday-heroes'].title}
        instructionText="Learn healthy routines: wash away germs, build a fresh fruit plate, and learn traffic safety!"
        accentColor="bg-sky-400"
      />

      <div className="flex justify-center gap-2 p-3 bg-white/70 backdrop-blur-xs border-b border-sky-200">
        <button
          onClick={() => { setActiveTab('handwash'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'handwash'
              ? 'bg-sky-600 text-white shadow-md scale-105'
              : 'bg-white text-sky-900 hover:bg-sky-50'
          }`}
        >
          🧼 Soap & Bubble Wash
        </button>

        <button
          onClick={() => { setActiveTab('plate'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'plate'
              ? 'bg-sky-600 text-white shadow-md scale-105'
              : 'bg-white text-sky-900 hover:bg-sky-50'
          }`}
        >
          🥗 Healthy Plate
        </button>

        <button
          onClick={() => { setActiveTab('traffic'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'traffic'
              ? 'bg-sky-600 text-white shadow-md scale-105'
              : 'bg-white text-sky-900 hover:bg-sky-50'
          }`}
        >
          🚦 Road Safety
        </button>
      </div>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center">
        {/* MODE 1: HANDWASHING BUBBLE GAME */}
        {activeTab === 'handwash' && (
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-sky-300 text-center animate-pop">
            <h2 className="text-xl font-black text-slate-800 mb-2">
              Wash Away the Germs!
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Tap each cheeky germ to wash them away with soapy bubbles!
            </p>

            {/* Hand Stage */}
            <div className="relative w-72 h-72 mx-auto rounded-3xl bg-sky-100 border-4 border-dashed border-sky-300 flex items-center justify-center my-4 overflow-hidden">
              <div className="text-9xl select-none opacity-80">
                ✋
              </div>

              {/* Germs on hand */}
              {germsRemaining.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleWashGerm(g.id)}
                  className="absolute text-4xl p-2 rounded-full bg-white/90 shadow-md animate-bounce-gentle transform hover:scale-125 active:scale-90"
                  style={{ top: `${g.y}%`, left: `${g.x}%` }}
                >
                  {g.emoji}
                </button>
              ))}

              {germsRemaining.length === 0 && (
                <div className="absolute inset-0 bg-emerald-500/90 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                  <Sparkles className="w-12 h-12 mb-2 animate-spin" />
                  <span className="text-xl font-black">Sparkling Clean Hands!</span>
                  <span className="text-xs mt-1">Germ-Free Everyday Hero!</span>
                </div>
              )}
            </div>

            <button
              onClick={resetHandwashing}
              className="mt-4 inline-flex items-center gap-2 text-xs text-sky-700 font-bold hover:underline"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Wash Hands Again</span>
            </button>
          </div>
        )}

        {/* MODE 2: HEALTHY PLATE */}
        {activeTab === 'plate' && (
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-sky-300 text-center animate-pop">
            <h2 className="text-xl font-black text-slate-800 mb-2">
              Build a Healthy Plate!
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Pick nutritious fruits and veggies to fill your plate!
            </p>

            {/* Dinner Plate */}
            <div className="w-64 h-64 mx-auto rounded-full bg-emerald-50 border-8 border-emerald-300 shadow-inner flex flex-wrap items-center justify-center p-4 gap-3 my-4">
              {plateFoods.length === 0 ? (
                <span className="text-xs font-bold text-slate-400">Tap healthy food below!</span>
              ) : (
                plateFoods.map((f, i) => (
                  <div key={i} className="text-4xl animate-pop">
                    {f.includes('Apple') ? '🍎' : f.includes('Carrot') ? '🥕' : f.includes('Broccoli') ? '🥦' : '🍌'}
                  </div>
                ))
              )}
            </div>

            {/* Food Options */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
              {FOOD_CHOICES.map((food) => (
                <button
                  key={food.name}
                  onClick={() => handlePickFood(food)}
                  className="rounded-2xl p-2.5 bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-300 flex flex-col items-center transition-transform active:scale-95 shadow-xs"
                >
                  <span className="text-3xl mb-1">{food.emoji}</span>
                  <span className="text-[11px] font-bold text-slate-800">{food.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MODE 3: TRAFFIC LIGHT SAFETY */}
        {activeTab === 'traffic' && (
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-sky-300 text-center animate-pop">
            <h2 className="text-xl font-black text-slate-800 mb-2">
              Traffic Light Safety
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Learn what each traffic signal means when crossing the street!
            </p>

            {/* Traffic Signal Pole */}
            <div className="w-32 mx-auto rounded-3xl bg-slate-900 p-4 shadow-xl border-4 border-slate-700 flex flex-col gap-4 items-center mb-6">
              <button
                onClick={() => handleSetTraffic('red')}
                className={`w-20 h-20 rounded-full transition-all ${
                  trafficColor === 'red'
                    ? 'bg-red-500 shadow-lg shadow-red-500/70 scale-105 ring-4 ring-white'
                    : 'bg-red-950 opacity-40 hover:opacity-60'
                }`}
              />
              <button
                onClick={() => handleSetTraffic('yellow')}
                className={`w-20 h-20 rounded-full transition-all ${
                  trafficColor === 'yellow'
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/70 scale-105 ring-4 ring-white'
                    : 'bg-yellow-950 opacity-40 hover:opacity-60'
                }`}
              />
              <button
                onClick={() => handleSetTraffic('green')}
                className={`w-20 h-20 rounded-full transition-all ${
                  trafficColor === 'green'
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/70 scale-105 ring-4 ring-white'
                    : 'bg-emerald-950 opacity-40 hover:opacity-60'
                }`}
              />
            </div>

            <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 font-black text-amber-950 text-base">
              {trafficPrompt}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
