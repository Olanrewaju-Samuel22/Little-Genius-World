import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  RotateCcw, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Eye, 
  EyeOff, 
  Check, 
  Paintbrush, 
  ArrowRight,
  Trophy,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRACING_LETTERS, TracingLetter, LetterStroke, Waypoint } from './tracingData';
import { audio } from '../../../utils/audio';
import { useGame } from '../../../context/GameContext';
import { MascotAvatar, MascotExpression } from '../../mascots/MascotAvatar';

interface Props {
  ageGroup: string;
  currentLang: string;
  onCorrectAnswer: () => void;
  streak: number;
  initialLetter?: string;
}

const BRUSH_COLORS = [
  { id: 'rainbow', name: 'Rainbow', color: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFE66D, #9B5DE5)', isRainbow: true },
  { id: 'gold', name: 'Star Gold', color: '#F59E0B', isRainbow: false },
  { id: 'blue', name: 'Sky Blue', color: '#3B82F6', isRainbow: false },
  { id: 'coral', name: 'Cherry Red', color: '#EF4444', isRainbow: false },
  { id: 'emerald', name: 'Leaf Green', color: '#10B981', isRainbow: false },
  { id: 'violet', name: 'Magic Violet', color: '#8B5CF6', isRainbow: false },
];

export const LetterTracingGame: React.FC<Props> = ({
  ageGroup,
  currentLang,
  onCorrectAnswer,
  streak,
  initialLetter
}) => {
  const { addStar, celebrate } = useGame();
  
  // Letter selection
  const [selectedLetterIdx, setSelectedLetterIdx] = useState(() => {
    if (initialLetter) {
      const idx = TRACING_LETTERS.findIndex(l => l.letter === initialLetter.toUpperCase());
      if (idx !== -1) return idx;
    }
    return 0;
  });
  const [isUppercase, setIsUppercase] = useState(true);
  
  // Tracing tools
  const [activeColorId, setActiveColorId] = useState('rainbow');
  const [brushSize, setBrushSize] = useState<'standard' | 'chunky'>('chunky');
  const [showGuides, setShowGuides] = useState(true);

  // Tracing progress
  // Keyed by `${strokeId}-${checkpointIdx}`
  const [hitCheckpoints, setHitCheckpoints] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('lgw_traced_letters');
      return saved ? new Set(JSON.parse(saved)) : new Set(['A']);
    } catch {
      return new Set(['A']);
    }
  });

  // Mascot state
  const [mascotMood, setMascotMood] = useState<MascotExpression>('curious');
  const [mascotTip, setMascotTip] = useState<string>('Trace the dotted lines starting at dot #1!');

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const hueRef = useRef(0);

  const currentLetter: TracingLetter = TRACING_LETTERS[selectedLetterIdx] || TRACING_LETTERS[0];
  const activeStrokes: LetterStroke[] = isUppercase ? currentLetter.upperStrokes : currentLetter.lowerStrokes;
  const currentLetterChar = isUppercase ? currentLetter.letter : currentLetter.lower;

  // Calculate total checkpoints for current letter
  const allCheckpoints = React.useMemo(() => {
    const list: { id: string; strokeId: number; point: Waypoint }[] = [];
    activeStrokes.forEach((stroke) => {
      stroke.checkpoints.forEach((pt, idx) => {
        list.push({
          id: `${stroke.id}-${idx}`,
          strokeId: stroke.id,
          point: pt,
        });
      });
    });
    return list;
  }, [activeStrokes]);

  const totalCheckpointsCount = allCheckpoints.length;
  const hitCheckpointsCount = hitCheckpoints.size;
  const progressPercent = totalCheckpointsCount > 0 
    ? Math.min(100, Math.round((hitCheckpointsCount / totalCheckpointsCount) * 100)) 
    : 0;

  // Clear Canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHitCheckpoints(new Set());
    setIsCompleted(false);
    lastPointRef.current = null;
    isDrawingRef.current = false;
  }, []);

  // When changing letter or case
  useEffect(() => {
    clearCanvas();
    setMascotMood('curious');
    const caseStr = isUppercase ? 'UPPERCASE' : 'lowercase';
    setMascotTip(`Trace ${caseStr} ${currentLetterChar}! Follow the numbered dots!`);
    
    // Announce letter
    const timer = setTimeout(() => {
      audio.playPop(1.1);
      audio.speak(`${isUppercase ? 'Uppercase' : 'Lowercase'} ${currentLetterChar}. ${currentLetter.word}!`, currentLang);
    }, 250);

    return () => clearTimeout(timer);
  }, [selectedLetterIdx, isUppercase, currentLang]);

  // Adjust canvas size for high-DPI displays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  // Convert client coordinates to normalized (0..100) canvas coordinates
  const getCanvasNormalizedCoords = (clientX: number, clientY: number): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x, y };
  };

  // Check collision with checkpoints
  const checkCheckpointsProximity = (normX: number, normY: number) => {
    if (isCompleted) return;

    // Proximity threshold: ~14% of canvas width
    const HIT_RADIUS = brushSize === 'chunky' ? 14 : 11;
    let newlyHit = false;

    setHitCheckpoints((prev) => {
      const next = new Set(prev);
      allCheckpoints.forEach((cp) => {
        if (!next.has(cp.id)) {
          const dx = normX - cp.point.x;
          const dy = normY - cp.point.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= HIT_RADIUS) {
            next.add(cp.id);
            newlyHit = true;
          }
        }
      });
      return next;
    });

    if (newlyHit) {
      audio.playPop(1.2 + (hitCheckpointsCount % 6) * 0.1);
      if (mascotMood !== 'excited' && !isCompleted) {
        setMascotMood('happy');
      }
    }
  };

  // Completion check
  useEffect(() => {
    // When >= 80% of waypoints are hit, celebrate!
    if (!isCompleted && totalCheckpointsCount > 0 && progressPercent >= 80) {
      setIsCompleted(true);
      setMascotMood('celebrating');
      setMascotTip(`Fantastic! You traced letter ${currentLetterChar}! ⭐`);

      // Update completed letters set
      const letterKey = `${currentLetter.letter}-${isUppercase ? 'upper' : 'lower'}`;
      setCompletedLetters((prev) => {
        const next = new Set(prev);
        next.add(letterKey);
        next.add(currentLetter.letter);
        try {
          localStorage.setItem('lgw_traced_letters', JSON.stringify(Array.from(next)));
        } catch {
          // ignore
        }
        return next;
      });

      // Award game reward
      onCorrectAnswer();

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#F59E0B', '#3B82F6', '#8B5CF6'],
        });
      } catch {
        // fallback
      }

      // Voice praise
      setTimeout(() => {
        audio.playCelebrationFanfare();
        audio.speak(`Hooray! You traced the letter ${currentLetterChar}! Super work!`, currentLang);
      }, 200);
    }
  }, [progressPercent, totalCheckpointsCount, isCompleted, currentLetterChar, isUppercase, currentLetter.letter, onCorrectAnswer, currentLang]);

  // Drawing event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Capture pointer for continuous tracking
    canvas.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;

    const rect = canvas.getBoundingClientRect();
    const currX = e.clientX - rect.left;
    const currY = e.clientY - rect.top;
    lastPointRef.current = { x: currX, y: currY };

    // Draw single dot if tapped
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      const radius = brushSize === 'chunky' ? 14 : 9;
      
      let strokeStyle = activeColorId;
      if (activeColorId === 'rainbow') {
        hueRef.current = (hueRef.current + 18) % 360;
        strokeStyle = `hsl(${hueRef.current}, 90%, 55%)`;
      } else {
        const cObj = BRUSH_COLORS.find(c => c.id === activeColorId);
        if (cObj) strokeStyle = cObj.color;
      }

      ctx.fillStyle = strokeStyle;
      ctx.arc(currX, currY, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const norm = getCanvasNormalizedCoords(e.clientX, e.clientY);
    if (norm) {
      checkCheckpointsProximity(norm.x, norm.y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currX = e.clientX - rect.left;
    const currY = e.clientY - rect.top;

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(currX, currY);

      let strokeStyle = activeColorId;
      if (activeColorId === 'rainbow') {
        hueRef.current = (hueRef.current + 8) % 360;
        strokeStyle = `hsl(${hueRef.current}, 92%, 52%)`;
      } else {
        const cObj = BRUSH_COLORS.find(c => c.id === activeColorId);
        if (cObj) strokeStyle = cObj.color;
      }

      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = brushSize === 'chunky' ? 26 : 16;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    lastPointRef.current = { x: currX, y: currY };

    const norm = getCanvasNormalizedCoords(e.clientX, e.clientY);
    if (norm) {
      checkCheckpointsProximity(norm.x, norm.y);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // already released
    }
  };

  // Next and Previous letters
  const handleNextLetter = () => {
    setSelectedLetterIdx((prev) => (prev + 1) % TRACING_LETTERS.length);
    audio.playPop(1.1);
  };

  const handlePrevLetter = () => {
    setSelectedLetterIdx((prev) => (prev - 1 + TRACING_LETTERS.length) % TRACING_LETTERS.length);
    audio.playPop(0.9);
  };

  // Pronounce letter phonics
  const handlePlaySound = () => {
    audio.playPop(1.1);
    audio.playPhonicSound(currentLetter.letter, currentLetter.sound, currentLetter.word, 'short');
    audio.speak(`${currentLetter.letter} says ${currentLetter.sound}. ${currentLetter.word}!`, currentLang);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 max-w-4xl mx-auto pb-8">
      {/* Top Alphabet Ribbon / Drawer */}
      <div className="w-full bg-white/95 backdrop-blur-xs rounded-3xl p-2.5 sm:p-3 shadow-md border-2 border-indigo-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {TRACING_LETTERS.map((item, idx) => {
          const isSelected = idx === selectedLetterIdx;
          const isDone = completedLetters.has(item.letter);

          return (
            <button
              key={item.letter}
              onClick={() => {
                setSelectedLetterIdx(idx);
                audio.playPop(1.0);
              }}
              className={`relative shrink-0 flex flex-col items-center justify-center w-10 h-12 sm:w-12 sm:h-14 rounded-2xl font-black transition-all cursor-pointer ${
                isSelected
                  ? 'btn-3d-amber text-amber-950 scale-105 shadow-md'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-indigo-50/70 text-indigo-900 border border-indigo-100 hover:bg-indigo-100/70'
              }`}
            >
              <span className="text-base sm:text-lg">{isUppercase ? item.letter : item.lower}</span>
              {isDone && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-black shadow-xs">
                  ★
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left Column: Letter Info & Controls */}
        <div className="md:col-span-4 flex flex-col gap-3">
          {/* Card: Current Letter & Sound */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-md border-2 border-indigo-100 flex flex-col gap-3 items-center text-center relative overflow-hidden">
            {/* Top decorative gradient glow */}
            <div className={`absolute top-0 inset-x-0 h-3 bg-linear-to-r ${currentLetter.bgGradient}`} />

            {/* Letter & Object Showcase */}
            <div className="flex items-center justify-between w-full pt-1">
              <span className="text-4xl sm:text-5xl drop-shadow-sm">{currentLetter.emoji}</span>
              <div className="flex flex-col items-end">
                <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">Letter</span>
                <span className="text-3xl sm:text-4xl font-black text-indigo-950">
                  {currentLetter.letter} {currentLetter.lower}
                </span>
              </div>
            </div>

            <div className="w-full border-t border-indigo-100 pt-3 flex items-center justify-between">
              <div className="text-left">
                <p className="text-xs font-bold text-slate-500">Phonics Word</p>
                <p className="text-lg font-black text-indigo-900">{currentLetter.word}</p>
                <p className="text-xs text-indigo-600 font-bold">Sound: "{currentLetter.sound}"</p>
              </div>

              <button
                onClick={handlePlaySound}
                className="btn-3d-amber w-11 h-11 rounded-2xl flex items-center justify-center text-amber-950 shadow-sm"
                title="Hear Letter Sound"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Upper / Lower Case Toggle */}
            <div className="w-full grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => {
                  setIsUppercase(true);
                  audio.playPop(1.1);
                }}
                className={`py-2 px-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  isUppercase
                    ? 'btn-3d-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                UPPERCASE {currentLetter.letter}
              </button>
              <button
                onClick={() => {
                  setIsUppercase(false);
                  audio.playPop(1.1);
                }}
                className={`py-2 px-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  !isUppercase
                    ? 'btn-3d-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                lowercase {currentLetter.lower}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full mt-2">
              <div className="flex items-center justify-between text-xs font-black text-indigo-950 mb-1">
                <span>Tracing Progress</span>
                <span className="text-amber-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-3.5 bg-indigo-50 rounded-full overflow-hidden border border-indigo-200 p-0.5">
                <motion.div
                  className="h-full bg-linear-to-r from-amber-400 via-orange-400 to-emerald-400 rounded-full"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Card: Magic Brush Tools */}
          <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-md border-2 border-indigo-100 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-indigo-900 flex items-center gap-1.5">
                <Paintbrush className="w-4 h-4 text-indigo-600" />
                Magic Crayons
              </span>

              {/* Brush size switch */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => {
                    setBrushSize('standard');
                    audio.playPop(1.0);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black cursor-pointer ${
                    brushSize === 'standard' ? 'bg-white shadow-xs text-indigo-950' : 'text-slate-500'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => {
                    setBrushSize('chunky');
                    audio.playPop(1.1);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black cursor-pointer ${
                    brushSize === 'chunky' ? 'bg-amber-400 shadow-xs text-amber-950' : 'text-slate-500'
                  }`}
                >
                  Chunky 🖍️
                </button>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="grid grid-cols-6 gap-2">
              {BRUSH_COLORS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveColorId(b.id);
                    audio.playPop(1.1);
                  }}
                  style={{ background: b.color }}
                  className={`w-full aspect-square rounded-2xl flex items-center justify-center shadow-xs transition-transform cursor-pointer ${
                    activeColorId === b.id ? 'ring-4 ring-indigo-500 ring-offset-2 scale-110' : 'hover:scale-105'
                  }`}
                  title={b.name}
                >
                  {activeColorId === b.id && (
                    <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />
                  )}
                </button>
              ))}
            </div>

            {/* Guide Lines & Clear Controls */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 mt-1">
              <button
                onClick={() => {
                  setShowGuides(prev => !prev);
                  audio.playPop(1.0);
                }}
                className={`py-2 px-2 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  showGuides
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {showGuides ? <Eye className="w-3.5 h-3.5 text-indigo-600" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showGuides ? 'Guides On' : 'Guides Off'}</span>
              </button>

              <button
                onClick={() => {
                  clearCanvas();
                  audio.playPop(0.9);
                }}
                className="py-2 px-2 rounded-2xl text-xs font-black bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                <span>Erase</span>
              </button>
            </div>
          </div>

          {/* Friendly Mascot Cheerleader */}
          <div className="bg-amber-50/80 border-2 border-amber-200 rounded-3xl p-3 flex items-center gap-3 shadow-xs">
            <MascotAvatar mascot="lion" size="sm" isAnimated={true} expression={mascotMood} />
            <div className="text-left flex-1">
              <p className="text-[11px] font-black uppercase text-amber-800">Leo the Lion</p>
              <p className="text-xs font-bold text-amber-950 leading-snug">{mascotTip}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Tracing Slate / Canvas */}
        <div className="md:col-span-8 flex flex-col items-center gap-3 w-full">
          {/* Tracing Canvas Container */}
          <div className="relative w-full aspect-square max-w-[460px] bg-white rounded-3xl shadow-xl border-4 border-indigo-200 p-2 sm:p-4 select-none touch-none overflow-hidden flex items-center justify-center">
            {/* Lined Notebook Paper Background */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #E0E7FF 0px, #E0E7FF 1px, transparent 1px, transparent 36px)',
                backgroundPosition: '0 12px'
              }}
            />

            {/* Dotted Midline guide for handwriting practice */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b-2 border-dashed border-sky-300 pointer-events-none opacity-60" />
            <div className="absolute inset-x-0 top-[18%] border-b border-rose-300 pointer-events-none opacity-50" />
            <div className="absolute inset-x-0 bottom-[16%] border-b border-rose-300 pointer-events-none opacity-50" />

            {/* SVG Guide Paths and Numbered Checkpoint Badges */}
            {showGuides && (
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-2 sm:inset-4 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] h-[calc(100%-16px)] sm:h-[calc(100%-32px)] pointer-events-none z-0"
              >
                {/* 1. Background Wide Letter Track (Gray/Pastel) */}
                {activeStrokes.map((stroke) => (
                  <path
                    key={`bg-${stroke.id}`}
                    d={stroke.pathD}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* 2. Soft Outer Track Glow */}
                {activeStrokes.map((stroke) => (
                  <path
                    key={`glow-${stroke.id}`}
                    d={stroke.pathD}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* 3. Dashed Center Directional Guide */}
                {activeStrokes.map((stroke) => (
                  <path
                    key={`guide-${stroke.id}`}
                    d={stroke.pathD}
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="3.5"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* 4. Sequential Checkpoint Waypoints */}
                {activeStrokes.map((stroke) =>
                  stroke.checkpoints.map((pt, idx) => {
                    const key = `${stroke.id}-${idx}`;
                    const isHit = hitCheckpoints.has(key);
                    return (
                      <g key={key}>
                        {/* Glow halo when hit */}
                        {isHit && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="5"
                            fill="#FBBF24"
                            opacity="0.4"
                            className="animate-ping"
                          />
                        )}
                        {/* Waypoint circle dot */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHit ? 3.8 : 2.5}
                          fill={isHit ? '#F59E0B' : '#CBD5E1'}
                          stroke={isHit ? '#FFFFFF' : '#94A3B8'}
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })
                )}

                {/* 5. Numbered Start Circles & Direction Arrows */}
                {activeStrokes.map((stroke) => (
                  <g key={`badge-${stroke.id}`}>
                    {/* Pulsing ring around starting point */}
                    <circle
                      cx={stroke.startPoint.x}
                      cy={stroke.startPoint.y}
                      r="6.5"
                      fill="#3B82F6"
                      opacity="0.25"
                    />
                    {/* Number badge */}
                    <circle
                      cx={stroke.startPoint.x}
                      cy={stroke.startPoint.y}
                      r="4.8"
                      fill="#2563EB"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                    />
                    <text
                      x={stroke.startPoint.x}
                      y={stroke.startPoint.y + 1.6}
                      textAnchor="middle"
                      fontSize="4.2"
                      fontWeight="900"
                      fill="#FFFFFF"
                    >
                      {stroke.id}
                    </text>
                  </g>
                ))}
              </svg>
            )}

            {/* Interactive Drawing Canvas */}
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full h-full cursor-crosshair z-10 touch-none"
              style={{ touchAction: 'none' }}
            />

            {/* Celebratory Completed Overlay */}
            <AnimatePresence>
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 z-30 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -5, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-amber-100 border-4 border-amber-300 rounded-full flex items-center justify-center shadow-lg text-4xl"
                  >
                    ⭐
                  </motion.div>

                  <h3 className="text-2xl sm:text-3xl font-black text-amber-950">
                    Letter {currentLetterChar} Complete!
                  </h3>
                  <p className="text-sm font-bold text-slate-600 max-w-xs">
                    You traced with amazing focus! {currentLetter.word} begins with {currentLetter.letter}!
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        clearCanvas();
                        audio.playPop(1.0);
                      }}
                      className="btn-3d-white px-4 py-2 text-xs font-black text-slate-700 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4 text-slate-500" />
                      <span>Trace Again</span>
                    </button>

                    {isUppercase ? (
                      <button
                        onClick={() => {
                          setIsUppercase(false);
                          audio.playPop(1.1);
                        }}
                        className="btn-3d-blue px-4 py-2 text-xs font-black text-white flex items-center gap-1.5"
                      >
                        <span>Trace lowercase {currentLetter.lower}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleNextLetter}
                        className="btn-3d-amber px-4 py-2 text-xs font-black text-amber-950 flex items-center gap-1.5"
                      >
                        <span>Next Letter</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Bar (Prev Letter / Next Letter) */}
          <div className="w-full flex items-center justify-between max-w-[460px]">
            <button
              onClick={handlePrevLetter}
              className="btn-3d-white px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black text-indigo-950 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4 text-indigo-600" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-black text-indigo-950 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
              {selectedLetterIdx + 1} of 26
            </span>

            <button
              onClick={handleNextLetter}
              className="btn-3d-amber px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black text-amber-950 flex items-center gap-1.5"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 text-amber-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
