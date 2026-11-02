import React, { useState } from 'react';
import { Volume2, Sparkles, RefreshCw, Star } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

const COLORS = [
  { id: 'red', name: 'Red', hex: '#EF4444', emoji: '🍎', yo: 'Pupa', ha: 'Ja', ig: 'Uhie' },
  { id: 'blue', name: 'Blue', hex: '#3B82F6', emoji: '🐬', yo: 'Buluu', ha: 'Shudi', ig: 'Bulu' },
  { id: 'yellow', name: 'Yellow', hex: '#EAB308', emoji: '⭐', yo: 'Pupa rúsúrúsú', ha: 'Rawaya', ig: 'Edo' },
  { id: 'green', name: 'Green', hex: '#10B981', emoji: '🐸', yo: 'Àwọ̀ ewé', ha: 'Kore', ig: 'Akwụkwọ ndụ' },
  { id: 'orange', name: 'Orange', hex: '#F97316', emoji: '🥕', yo: 'Ọsàn', ha: 'Lemu', ig: 'Oroma' },
  { id: 'purple', name: 'Purple', hex: '#8B5CF6', emoji: '🍇', yo: 'Pọ́pù', ha: 'Shuni', ig: 'Odo odo' },
  { id: 'pink', name: 'Pink', hex: '#EC4899', emoji: '🌸', yo: 'Pínkì', ha: 'Fenti', ig: 'Pinki' }
];

const SHAPES = [
  { id: 'circle', name: 'Circle', shapeType: 'circle', yo: 'Róbótó', ha: 'Kewaye', ig: 'Gburugburu' },
  { id: 'square', name: 'Square', shapeType: 'square', yo: 'Onigun mẹrin', ha: 'Daidai gwargwado', ig: 'Nkuku anọ nha' },
  { id: 'triangle', name: 'Triangle', shapeType: 'triangle', yo: 'Onigun mẹta', ha: 'Talaata', ig: 'Nkuku atọ' },
  { id: 'star', name: 'Star', shapeType: 'star', yo: 'Irawọ', ha: 'Tauraro', ig: 'Kpakpando' },
  { id: 'heart', name: 'Heart', shapeType: 'heart', yo: 'Ọkàn', ha: 'Zuciya', ig: 'Obi' },
];

export const ColourGarden: React.FC = () => {
  const { addStar, celebrate, playPositiveFeedback, currentLang, t } = useGame();
  const [activeTab, setActiveTab] = useState<'colors' | 'shapes' | 'sorting'>('colors');

  // Sorting game state
  const [targetColor, setTargetColor] = useState(COLORS[0]);
  const [itemsToBasket, setItemsToBasket] = useState([
    { id: 1, colorId: 'red', label: '🍎 Red Apple' },
    { id: 2, colorId: 'blue', label: '🫐 Blueberries' },
    { id: 3, colorId: 'red', label: '🍓 Strawberry' },
    { id: 4, colorId: 'green', label: '🥒 Cucumber' },
    { id: 5, colorId: 'red', label: '🌹 Red Rose' }
  ]);
  const [basketItems, setBasketItems] = useState<number[]>([]);

  const handleColorClick = (c: typeof COLORS[0]) => {
    audio.playPop(1.1);
    const langName = currentLang === 'yo' ? c.yo : currentLang === 'ha' ? c.ha : currentLang === 'ig' ? c.ig : c.name;
    audio.speak(`${langName}`, currentLang);
  };

  const handleShapeClick = (s: typeof SHAPES[0]) => {
    audio.playChime();
    const langName = currentLang === 'yo' ? s.yo : currentLang === 'ha' ? s.ha : currentLang === 'ig' ? s.ig : s.name;
    audio.speak(`${langName}`, currentLang);
  };

  const handleSortItem = (item: typeof itemsToBasket[0]) => {
    if (item.colorId === targetColor.id) {
      audio.playPop(1.2);
      setBasketItems(prev => [...prev, item.id]);
      addStar(1);

      // Check if all correct items sorted
      const remainingTargetItems = itemsToBasket.filter(i => i.colorId === targetColor.id && !basketItems.includes(i.id) && i.id !== item.id);
      if (remainingTargetItems.length === 0) {
        playPositiveFeedback();
        celebrate();
      }
    } else {
      audio.playGentleTryAgain();
      audio.speak(t.tryAgain, currentLang);
    }
  };

  const resetSortingGame = () => {
    const nextColor = COLORS[Math.floor(Math.random() * 4)];
    setTargetColor(nextColor);
    setBasketItems([]);
    setItemsToBasket([
      { id: 10, colorId: nextColor.id, label: `${nextColor.emoji} Yummy ${nextColor.name}` },
      { id: 11, colorId: 'yellow', label: '⭐ Sun' },
      { id: 12, colorId: nextColor.id, label: `${nextColor.emoji} Pretty flower` },
      { id: 13, colorId: 'blue', label: '🌊 Drop' },
      { id: 14, colorId: nextColor.id, label: `${nextColor.emoji} Magic jewel` }
    ]);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50 via-pink-50 to-amber-50 flex flex-col">
      <WorldHeader
        title={t.worlds['colour-garden'].title}
        instructionText="Pick bright colors, match magical shapes, and sort into baskets!"
        accentColor="bg-pink-400"
      />

      <div className="flex justify-center gap-2 p-3 bg-white/70 backdrop-blur-xs border-b border-pink-200">
        <button
          onClick={() => { setActiveTab('colors'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'colors'
              ? 'bg-rose-500 text-white shadow-md scale-105'
              : 'bg-white text-rose-900 hover:bg-rose-50'
          }`}
        >
          🎨 Colour Garden
        </button>

        <button
          onClick={() => { setActiveTab('shapes'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'shapes'
              ? 'bg-rose-500 text-white shadow-md scale-105'
              : 'bg-white text-rose-900 hover:bg-rose-50'
          }`}
        >
          🔷 Shape Meadow
        </button>

        <button
          onClick={() => { setActiveTab('sorting'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'sorting'
              ? 'bg-rose-500 text-white shadow-md scale-105'
              : 'bg-white text-rose-900 hover:bg-rose-50'
          }`}
        >
          🧺 Basket Sorting
        </button>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center">
        {/* MODE 1: COLORS */}
        {activeTab === 'colors' && (
          <div className="w-full">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Explore Beautiful Colours!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tap each blossom to hear its cheerful name.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {COLORS.map((c) => {
                const langName = currentLang === 'yo' ? c.yo : currentLang === 'ha' ? c.ha : currentLang === 'ig' ? c.ig : c.name;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleColorClick(c)}
                    className="group bg-white rounded-3xl p-5 shadow-md border-3 border-slate-100 hover:border-pink-300 flex flex-col items-center text-center transition-all transform active:scale-95 hover:-translate-y-1"
                  >
                    <div
                      className="w-20 h-20 rounded-full shadow-inner flex items-center justify-center text-3xl group-hover:scale-110 transition-transform mb-3"
                      style={{ backgroundColor: c.hex }}
                    >
                      <span>{c.emoji}</span>
                    </div>
                    <div className="text-lg font-black text-slate-800">{langName}</div>
                    <div className="text-xs text-slate-400 font-semibold">{c.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 2: SHAPES */}
        {activeTab === 'shapes' && (
          <div className="w-full max-w-3xl">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Meet the Shape Friends!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tap each shape to discover its name and geometry!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SHAPES.map((s) => {
                const langName = currentLang === 'yo' ? s.yo : currentLang === 'ha' ? s.ha : currentLang === 'ig' ? s.ig : s.name;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleShapeClick(s)}
                    className="bg-white rounded-3xl p-6 shadow-md border-3 border-pink-200 hover:border-pink-400 flex flex-col items-center text-center transition-transform active:scale-95"
                  >
                    <div className="w-20 h-20 flex items-center justify-center mb-3">
                      {s.shapeType === 'circle' && (
                        <div className="w-16 h-16 rounded-full bg-amber-400 border-4 border-amber-500 shadow-xs" />
                      )}
                      {s.shapeType === 'square' && (
                        <div className="w-16 h-16 rounded-2xl bg-sky-400 border-4 border-sky-500 shadow-xs" />
                      )}
                      {s.shapeType === 'triangle' && (
                        <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[56px] border-b-emerald-400 drop-shadow-xs" />
                      )}
                      {s.shapeType === 'star' && (
                        <div className="text-5xl text-amber-400 drop-shadow-xs">⭐</div>
                      )}
                      {s.shapeType === 'heart' && (
                        <div className="text-5xl text-rose-500 drop-shadow-xs">💖</div>
                      )}
                    </div>
                    <div className="text-base font-black text-slate-800">{langName}</div>
                    <div className="text-xs text-slate-400 font-semibold">{s.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 3: BASKET SORTING */}
        {activeTab === 'sorting' && (
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-pink-300 text-center animate-pop">
            <h2 className="text-xl font-black text-slate-800 mb-2">
              Fill the {targetColor.name} Basket!
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Tap the items that belong in this color basket!
            </p>

            {/* Target Basket */}
            <div
              className="rounded-3xl p-6 border-4 border-dashed mb-6 transition-all"
              style={{ borderColor: targetColor.hex, backgroundColor: `${targetColor.hex}15` }}
            >
              <div className="text-6xl mb-2">🧺</div>
              <div className="text-lg font-black" style={{ color: targetColor.hex }}>
                {targetColor.name} Basket ({basketItems.length} collected)
              </div>
            </div>

            {/* Items pool */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {itemsToBasket.map((item) => {
                const isCollected = basketItems.includes(item.id);
                if (isCollected) {
                  return (
                    <div key={item.id} className="h-16 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center opacity-40 text-xs">
                      ✓ Collected
                    </div>
                  );
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSortItem(item)}
                    className="h-16 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-pink-300 shadow-xs font-bold text-xs sm:text-sm text-slate-800 transition-transform active:scale-95 flex items-center justify-center p-2"
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={resetSortingGame}
              className="mt-6 inline-flex items-center gap-2 text-xs text-pink-700 font-bold hover:underline"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Color Basket</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
