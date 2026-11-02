import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Check, ArrowRight } from 'lucide-react';
import { MascotAvatar } from '../mascots/MascotAvatar';
import { useGame } from '../../context/GameContext';

interface Particle {
  id: number;
  type: 'ribbon' | 'circle' | 'star' | 'diamond' | 'sparkle';
  color: string;
  size: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  duration: number;
  delay: number;
  spinX: number;
  spinY: number;
  spinZ: number;
  scale: number;
}

const PALETTE = [
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#FBBF24', // Warm Gold
  '#34D399', // Mint
  '#F43F5E', // Rose
];

interface Props {
  isActive: boolean;
  onDismiss: () => void;
  title?: string;
  subtitle?: string;
  starsAwarded?: number;
}

export const ConfettiExplosion: React.FC<Props> = ({
  isActive,
  onDismiss,
  title = 'Level Complete!',
  subtitle = 'Little Minds. Big Discoveries!',
  starsAwarded = 1,
}) => {
  const { currentProfile, settings, t } = useGame();

  // Generate 75 rich, physics-simulated confetti pieces
  const particles = useMemo<Particle[]>(() => {
    if (!isActive) return [];

    const list: Particle[] = [];
    const count = settings.reducedMotion ? 12 : 75;

    for (let i = 0; i < count; i++) {
      // 3 launch origins: left cannon (25%), center explosion (50%), right cannon (25%)
      const originBucket = Math.random();
      let startX = 0;
      let startY = 60;
      let angle = 0;
      let distance = 0;

      if (originBucket < 0.3) {
        // Left cannon shooting up-right
        startX = -window.innerWidth * 0.4;
        startY = window.innerHeight * 0.3;
        angle = -Math.PI * 0.15 - Math.random() * (Math.PI * 0.5); // shoot upwards and right
        distance = 320 + Math.random() * 450;
      } else if (originBucket > 0.7) {
        // Right cannon shooting up-left
        startX = window.innerWidth * 0.4;
        startY = window.innerHeight * 0.3;
        angle = -Math.PI * 0.85 + Math.random() * (Math.PI * 0.5); // shoot upwards and left
        distance = 320 + Math.random() * 450;
      } else {
        // Center burst radiating 360 degrees
        startX = 0;
        startY = 0;
        angle = Math.random() * Math.PI * 2;
        distance = 180 + Math.random() * 520;
      }

      // Physics vector: explosive burst outward + gravity drag downward
      const burstX = startX + Math.cos(angle) * distance;
      const burstY = startY + Math.sin(angle) * distance;
      const finalY = burstY + (160 + Math.random() * 320); // gravity fall

      const types: Particle['type'][] = ['ribbon', 'circle', 'star', 'diamond', 'sparkle'];
      const chosenType = types[Math.floor(Math.random() * types.length)];

      list.push({
        id: i,
        type: chosenType,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        size: chosenType === 'ribbon' ? 8 + Math.random() * 8 : 12 + Math.random() * 14,
        startX,
        startY,
        targetX: burstX,
        targetY: finalY,
        duration: 1.8 + Math.random() * 1.4,
        delay: Math.random() * 0.15,
        spinX: Math.random() > 0.5 ? 720 + Math.random() * 360 : -(720 + Math.random() * 360),
        spinY: Math.random() > 0.5 ? 720 + Math.random() * 360 : -(720 + Math.random() * 360),
        spinZ: (Math.random() - 0.5) * 720,
        scale: 0.8 + Math.random() * 0.6,
      });
    }

    return list;
  }, [isActive, settings.reducedMotion]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        {/* Soft background glow backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px] pointer-events-auto"
          onClick={onDismiss}
        />

        {/* 1. Framer Motion Physics Confetti Particles Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => {
            return (
              <motion.div
                key={p.id}
                initial={{
                  x: p.startX,
                  y: p.startY,
                  opacity: 1,
                  scale: 0,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                }}
                animate={{
                  x: [p.startX, p.targetX, p.targetX + (Math.random() - 0.5) * 50],
                  y: [p.startY, p.targetY * 0.4, p.targetY],
                  opacity: [0, 1, 1, 0.9, 0],
                  scale: [0, p.scale * 1.3, p.scale, p.scale * 0.8, 0],
                  rotateX: [0, p.spinX],
                  rotateY: [0, p.spinY],
                  rotateZ: [0, p.spinZ],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.16, 1, 0.3, 1], // explosive burst out, smooth float down
                }}
                style={{
                  position: 'absolute',
                  willChange: 'transform, opacity',
                }}
              >
                {p.type === 'ribbon' && (
                  <div
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size * 2.2}px`,
                      backgroundColor: p.color,
                      borderRadius: '3px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  />
                )}

                {p.type === 'circle' && (
                  <div
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      backgroundColor: p.color,
                      borderRadius: '50%',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  />
                )}

                {p.type === 'diamond' && (
                  <div
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      backgroundColor: p.color,
                      transform: 'rotate(45deg)',
                      borderRadius: '2px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  />
                )}

                {p.type === 'star' && (
                  <span
                    style={{
                      fontSize: `${p.size * 1.3}px`,
                      color: p.color,
                      textShadow: '0 2px 8px rgba(245,158,11,0.5)',
                    }}
                  >
                    ⭐
                  </span>
                )}

                {p.type === 'sparkle' && (
                  <span
                    style={{
                      fontSize: `${p.size * 1.2}px`,
                      color: p.color,
                      textShadow: '0 2px 8px rgba(236,72,153,0.5)',
                    }}
                  >
                    ✨
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 2. Central Celebration Card with Framer Motion Spring Entrance */}
        <motion.div
          initial={{ scale: 0, y: 70, rotate: -6 }}
          animate={{
            scale: 1,
            y: 0,
            rotate: 0,
            transition: {
              type: 'spring',
              damping: 14,
              stiffness: 220,
              delay: 0.1,
            },
          }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          className="relative pointer-events-auto z-10 w-full max-w-sm mx-4 bg-white rounded-3xl p-6 sm:p-7 text-center shadow-2xl border-4 border-amber-400 overflow-hidden"
        >
          {/* Top Sparkling Light Accent */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl" />

          {/* Animated Mascot Cheer with Framer Motion */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 4, -4, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
            className="flex justify-center mb-3"
          >
            <MascotAvatar mascot={currentProfile.avatar} size="lg" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 300 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black mb-2 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-spin" />
            <span>{t.youDidIt}!</span>
          </motion.div>

          {/* Level Complete Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight"
          >
            {title}
          </motion.h2>

          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 mb-4">
            {subtitle}
          </p>

          {/* Stars Collected Pill */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 280 }}
            className="my-3 py-2 px-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center gap-2 text-amber-950 font-black text-sm"
          >
            <span className="text-xl">⭐</span>
            <span>+{starsAwarded} Star Added to Trophy Collection!</span>
          </motion.div>

          {/* Big Action CTA Button to Keep Playing */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDismiss}
            className="mt-3 w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-base shadow-lg border-2 border-amber-500 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Keep Playing!</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
