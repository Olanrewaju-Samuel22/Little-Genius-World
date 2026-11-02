import React, { useRef, useState, useEffect } from 'react';
import { Download, Eraser, Trash2, Palette, Sparkles, Check } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

const CRAYON_COLORS = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#FBBF24', // Yellow
  '#10B981', // Green
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#78350F', // Brown
  '#1E293B', // Charcoal Black
];

const COLORING_PAGES = [
  { id: 'blank', title: 'Free Draw', icon: '🎨' },
  { id: 'lion', title: 'Little Lion', icon: '🦁' },
  { id: 'rocket', title: 'Space Rocket', icon: '🚀' },
  { id: 'butterfly', title: 'Happy Butterfly', icon: '🦋' },
  { id: 'rainbow', title: 'Magic Rainbow', icon: '🌈' },
];

export const CreativeCorner: React.FC = () => {
  const { addStar, celebrate, saveArtworkToProfile, t } = useGame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState(CRAYON_COLORS[0]);
  const [isRainbowMode, setIsRainbowMode] = useState(false);
  const [brushSize, setBrushSize] = useState<number>(14);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activePage, setActivePage] = useState('blank');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions based on container
    canvas.width = 680;
    canvas.height = 460;

    // Fill white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawTemplateOutline(ctx, activePage);
  }, [activePage]);

  const drawTemplateOutline = (ctx: CanvasRenderingContext2D, page: string) => {
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#475569';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (page === 'lion') {
      // Mane
      ctx.beginPath();
      ctx.arc(340, 230, 130, 0, Math.PI * 2);
      ctx.stroke();
      // Face
      ctx.beginPath();
      ctx.arc(340, 230, 85, 0, Math.PI * 2);
      ctx.stroke();
      // Eyes
      ctx.beginPath();
      ctx.arc(310, 215, 10, 0, Math.PI * 2);
      ctx.arc(370, 215, 10, 0, Math.PI * 2);
      ctx.stroke();
      // Nose & mouth
      ctx.beginPath();
      ctx.moveTo(330, 240);
      ctx.lineTo(350, 240);
      ctx.lineTo(340, 255);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(340, 260, 20, 0, Math.PI);
      ctx.stroke();
    } else if (page === 'rocket') {
      // Rocket body
      ctx.beginPath();
      ctx.moveTo(340, 90);
      ctx.quadraticCurveTo(400, 220, 390, 310);
      ctx.lineTo(290, 310);
      ctx.quadraticCurveTo(280, 220, 340, 90);
      ctx.stroke();
      // Window
      ctx.beginPath();
      ctx.arc(340, 200, 30, 0, Math.PI * 2);
      ctx.stroke();
      // Wings
      ctx.beginPath();
      ctx.moveTo(290, 260);
      ctx.lineTo(240, 330);
      ctx.lineTo(290, 310);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(390, 260);
      ctx.lineTo(440, 330);
      ctx.lineTo(390, 310);
      ctx.stroke();
    } else if (page === 'butterfly') {
      // Body
      ctx.beginPath();
      ctx.ellipse(340, 230, 15, 70, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Wings left
      ctx.beginPath();
      ctx.arc(260, 180, 60, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(275, 275, 45, 0, Math.PI * 2);
      ctx.stroke();
      // Wings right
      ctx.beginPath();
      ctx.arc(420, 180, 60, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(405, 275, 45, 0, Math.PI * 2);
      ctx.stroke();
    } else if (page === 'rainbow') {
      // Arcs
      [180, 150, 120, 90].forEach(r => {
        ctx.beginPath();
        ctx.arc(340, 320, r, Math.PI, 0);
        ctx.stroke();
      });
      // Clouds
      ctx.beginPath();
      ctx.arc(150, 320, 35, 0, Math.PI * 2);
      ctx.arc(180, 310, 40, 0, Math.PI * 2);
      ctx.arc(210, 320, 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(470, 320, 35, 0, Math.PI * 2);
      ctx.arc(500, 310, 40, 0, Math.PI * 2);
      ctx.arc(530, 320, 30, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    audio.playPop(1.5);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (isEraser) {
      ctx.strokeStyle = '#FFFFFF';
    } else if (isRainbowMode) {
      const rainbow = ['#EF4444', '#F97316', '#FBBF24', '#10B981', '#3B82F6', '#8B5CF6'];
      ctx.strokeStyle = rainbow[Math.floor(Math.random() * rainbow.length)];
    } else {
      ctx.strokeStyle = selectedColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTemplateOutline(ctx, activePage);
    audio.playPop(0.8);
  };

  const handleSaveArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    saveArtworkToProfile(dataUrl);

    // Trigger local download
    const link = document.createElement('a');
    link.download = `my-masterpiece-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();

    addStar(2);
    celebrate();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-rose-50 to-pink-50 flex flex-col">
      <WorldHeader
        title={t.worlds['creative-corner'].title}
        instructionText="Paint, color cute outlines, and save your masterpieces to your gallery!"
        accentColor="bg-pink-400"
      />

      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 flex flex-col items-center">
        {/* Template page picker */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 w-full justify-start sm:justify-center">
          {COLORING_PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                setActivePage(page.id);
                audio.playPop(1.1);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                activePage === page.id
                  ? 'bg-pink-500 text-white shadow-sm scale-105'
                  : 'bg-white text-slate-700 hover:bg-pink-50 border border-slate-200'
              }`}
            >
              <span>{page.icon}</span>
              <span>{page.title}</span>
            </button>
          ))}
        </div>

        {/* Canvas & Drawing Tools Frame */}
        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Main Drawing Canvas */}
          <div className="relative rounded-3xl overflow-hidden border-4 border-amber-300 shadow-xl bg-white max-w-full touch-none">
            <canvas
              ref={canvasRef}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
              className="cursor-crosshair w-[340px] h-[230px] sm:w-[540px] sm:h-[365px] md:w-[680px] md:h-[460px] block"
            />
          </div>

          {/* Tools Palette Toolbar */}
          <div className="w-full md:w-56 bg-white rounded-3xl p-4 shadow-lg border-2 border-pink-200 flex flex-col gap-4">
            {/* Color Swatches */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">Crayon Colours</span>
              <div className="grid grid-cols-5 gap-2">
                {CRAYON_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedColor(c);
                      setIsEraser(false);
                      setIsRainbowMode(false);
                      audio.playPop(1.2);
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor === c && !isEraser && !isRainbowMode
                        ? 'border-slate-800 scale-125 shadow-md ring-2 ring-pink-300'
                        : 'border-white hover:scale-110 shadow-xs'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Rainbow pen mode */}
            <button
              onClick={() => {
                setIsRainbowMode(true);
                setIsEraser(false);
                audio.playChime();
              }}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-2xl text-xs font-black shadow-xs transition-transform active:scale-95 ${
                isRainbowMode
                  ? 'bg-linear-to-r from-red-500 via-yellow-400 to-blue-500 text-white ring-2 ring-pink-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Rainbow Pen!</span>
            </button>

            {/* Brush Sizes */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">Brush Size</span>
              <div className="flex items-center justify-between gap-1">
                {[
                  { label: 'Thin', size: 6 },
                  { label: 'Medium', size: 14 },
                  { label: 'Jumbo', size: 28 },
                ].map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setBrushSize(b.size)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-colors ${
                      brushSize === b.size
                        ? 'bg-pink-100 border-pink-400 text-pink-950 font-black'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Eraser & Clear */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEraser(!isEraser);
                  setIsRainbowMode(false);
                  audio.playPop(1.0);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-2xl text-xs font-bold border transition-colors ${
                  isEraser
                    ? 'bg-rose-100 border-rose-400 text-rose-900 font-black'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Eraser</span>
              </button>

              <button
                onClick={clearCanvas}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-2xl text-xs font-bold bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>

            {/* Save Masterpiece Button */}
            <button
              onClick={handleSaveArtwork}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-md transition-transform active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Saved to Gallery!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Save Artwork</span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
