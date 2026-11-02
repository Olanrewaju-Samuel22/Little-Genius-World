import React from 'react';
import { WorldId } from '../../types';

export const WorldIllustration: React.FC<{ worldId: WorldId; className?: string }> = ({
  worldId,
  className = 'w-full h-36'
}) => {
  switch (worldId) {
    case 'abc-adventure':
      return (
        <svg viewBox="0 0 320 160" className={`${className} block`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="abcSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#C7D2FE" />
            </linearGradient>
            <linearGradient id="abcIsland" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect width="320" height="160" fill="url(#abcSky)" />
          {/* Rainbow */}
          <path d="M 60,140 A 100,100 0 0,1 260,140" fill="none" stroke="#F43F5E" strokeWidth="6" opacity="0.4" />
          <path d="M 66,140 A 94,94 0 0,1 254,140" fill="none" stroke="#FBBF24" strokeWidth="6" opacity="0.4" />
          <path d="M 72,140 A 88,88 0 0,1 248,140" fill="none" stroke="#38BDF8" strokeWidth="6" opacity="0.4" />
          {/* Floating Island */}
          <path d="M 30,120 Q 160,85 290,120 Q 250,155 160,158 Q 70,155 30,120 Z" fill="url(#abcIsland)" />
          {/* Cube 'A' (Red) */}
          <g transform="translate(65, 55)">
            <rect x="0" y="0" width="46" height="46" rx="8" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
            <text x="23" y="34" fill="#FFFFFF" fontSize="30" fontWeight="900" textAnchor="middle">A</text>
            <rect x="4" y="4" width="38" height="6" rx="3" fill="#F87171" opacity="0.6" />
          </g>
          {/* Cube 'B' (Blue, Tilted) */}
          <g transform="translate(135, 40) rotate(-6)">
            <rect x="0" y="0" width="50" height="50" rx="9" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
            <text x="25" y="37" fill="#FFFFFF" fontSize="33" fontWeight="900" textAnchor="middle">B</text>
            <rect x="4" y="4" width="42" height="6" rx="3" fill="#60A5FA" opacity="0.6" />
          </g>
          {/* Cube 'C' (Gold) */}
          <g transform="translate(205, 58) rotate(8)">
            <rect x="0" y="0" width="46" height="46" rx="8" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
            <text x="23" y="34" fill="#FFFFFF" fontSize="30" fontWeight="900" textAnchor="middle">C</text>
            <rect x="4" y="4" width="38" height="6" rx="3" fill="#FCD34D" opacity="0.6" />
          </g>
          {/* Little Floating Star */}
          <polygon points="160,18 163,26 171,27 165,33 167,41 160,37 153,41 155,33 149,27 157,26" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
        </svg>
      );

    case 'number-kingdom':
      return (
        <svg viewBox="0 0 320 160" className={`${className} block`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="numSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
            <linearGradient id="castleWall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
          </defs>
          <rect width="320" height="160" fill="url(#numSky)" />
          {/* Sun */}
          <circle cx="270" cy="40" r="24" fill="#FEF08A" opacity="0.6" />
          {/* Rolling Hill */}
          <path d="M 0,130 Q 160,95 320,130 L 320,160 L 0,160 Z" fill="#22C55E" />
          {/* Castle Towers */}
          {/* Center Main Keep */}
          <rect x="120" y="55" width="80" height="75" rx="6" fill="url(#castleWall)" stroke="#B45309" strokeWidth="3" />
          {/* Crenellations */}
          <rect x="124" y="48" width="14" height="10" fill="#F59E0B" />
          <rect x="153" y="48" width="14" height="10" fill="#F59E0B" />
          <rect x="182" y="48" width="14" height="10" fill="#F59E0B" />
          {/* Left Turret */}
          <rect x="85" y="70" width="38" height="60" rx="4" fill="url(#castleWall)" stroke="#B45309" strokeWidth="2.5" />
          <polygon points="80,70 104,36 128,70" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          {/* Right Turret */}
          <rect x="197" y="70" width="38" height="60" rx="4" fill="url(#castleWall)" stroke="#B45309" strokeWidth="2.5" />
          <polygon points="192,70 216,36 240,70" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          {/* Center Flag with Number 1 */}
          <line x1="160" y1="48" x2="160" y2="20" stroke="#78350F" strokeWidth="3" />
          <polygon points="160,20 188,28 160,36" fill="#10B981" />
          <text x="170" y="31" fill="#FFFFFF" fontSize="12" fontWeight="900">1</text>
          {/* Castle Gate */}
          <path d="M 148,130 L 148,102 Q 160,92 172,102 L 172,130 Z" fill="#78350F" />
          {/* Floating Star Badges (2, 3) */}
          <circle cx="50" cy="50" r="16" fill="#FDE047" stroke="#D97706" strokeWidth="2" />
          <text x="50" y="56" fill="#78350F" fontSize="18" fontWeight="900" textAnchor="middle">2</text>
          <circle cx="270" cy="90" r="16" fill="#FDE047" stroke="#D97706" strokeWidth="2" />
          <text x="270" y="96" fill="#78350F" fontSize="18" fontWeight="900" textAnchor="middle">3</text>
        </svg>
      );

    case 'animal-world':
      return (
        <svg viewBox="0 0 320 160" className={`${className} block`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="safariSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#A7F3D0" />
            </linearGradient>
          </defs>
          <rect width="320" height="160" fill="url(#safariSky)" />
          {/* Safari Hills */}
          <path d="M 0,115 Q 160,80 320,120 L 320,160 L 0,160 Z" fill="#FDE047" />
          <path d="M 0,135 Q 140,110 320,135 L 320,160 L 0,160 Z" fill="#15803D" />
          {/* Lagoon Ocean Wave (Right) */}
          <path d="M 210,160 Q 230,130 260,138 Q 290,130 320,145 L 320,160 Z" fill="#0284C7" />
          {/* Dolphin Jumping */}
          <g transform="translate(250, 105)">
            <path d="M 0,20 Q 15,-6 35,6 Q 25,18 12,22 Z" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.5" />
            <polygon points="16,8 24,0 26,10" fill="#38BDF8" />
          </g>
          {/* Palm Tree (Left) */}
          <g transform="translate(45, 60)">
            <path d="M 25,65 Q 28,30 22,10" fill="none" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
            {/* Palm Fronds */}
            <path d="M 22,10 Q 0,4 -10,18" fill="none" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
            <path d="M 22,10 Q 10,-8 0,-10" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" />
            <path d="M 22,10 Q 35,-10 48,-4" fill="none" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
            <path d="M 22,10 Q 42,12 55,22" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" />
          </g>
          {/* Cute Friendly Cartoon Lion Silhouette Face Center */}
          <g transform="translate(135, 65)">
            <circle cx="25" cy="25" r="26" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            <circle cx="25" cy="27" r="18" fill="#FDE047" />
            <circle cx="18" cy="23" r="3" fill="#1E293B" />
            <circle cx="32" cy="23" r="3" fill="#1E293B" />
            <polygon points="25,29 22,26 28,26" fill="#78350F" />
            <path d="M 22,31 Q 25,35 28,31" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      );

    case 'colour-garden':
      return (
        <svg viewBox="0 0 320 160" className={`${className} block`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="colSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#FCE7F3" />
            </linearGradient>
          </defs>
          <rect width="320" height="160" fill="url(#colSky)" />
          {/* Garden Meadow */}
          <path d="M 0,110 Q 160,85 320,110 L 320,160 L 0,160 Z" fill="#22C55E" />
          {/* Giant Blossom 1 (Yellow) */}
          <g transform="translate(60, 60)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return <circle key={i} cx={25 + 16 * Math.cos(rad)} cy={25 + 16 * Math.sin(rad)} r="9" fill="#FDE047" />;
            })}
            <circle cx="25" cy="25" r="13" fill="#EA580C" />
            <line x1="25" y1="40" x2="25" y2="75" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
          </g>
          {/* Giant Blossom 2 (Blue Center) */}
          <g transform="translate(140, 40)">
            {[0, 60, 120, 180, 240, 300].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return <circle key={i} cx={22 + 18 * Math.cos(rad)} cy={22 + 18 * Math.sin(rad)} r="11" fill="#38BDF8" />;
            })}
            <circle cx="22" cy="22" r="14" fill="#FACC15" />
            <line x1="22" y1="40" x2="22" y2="95" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
          </g>
          {/* Giant Blossom 3 (Purple) */}
          <g transform="translate(225, 55)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return <circle key={i} cx={25 + 16 * Math.cos(rad)} cy={25 + 16 * Math.sin(rad)} r="9" fill="#C084FC" />;
            })}
            <circle cx="25" cy="25" r="13" fill="#7E22CE" />
            <line x1="25" y1="40" x2="25" y2="80" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
          </g>
          {/* Geometric Shapes in Garden (Star & Heart) */}
          <polygon points="110,30 113,38 121,39 115,45 117,53 110,49 103,53 105,45 99,39 107,38" fill="#F59E0B" />
        </svg>
      );

    case 'puzzle-planet':
      return (
        <svg viewBox="0 0 320 160" className={`${className} block`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="puzSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <rect width="320" height="160" fill="url(#puzSky)" />
          {/* Glowing Planetary Ring */}
          <ellipse cx="230" cy="70" rx="65" ry="16" fill="none" stroke="#DDD6FE" strokeWidth="6" opacity="0.6" transform="rotate(-15 230 70)" />
          <circle cx="230" cy="70" r="34" fill="#A855F7" stroke="#6D28D9" strokeWidth="3" />
          <ellipse cx="230" cy="70" rx="65" ry="16" fill="none" stroke="#FDE047" strokeWidth="3" strokeDasharray="6 6" transform="rotate(-15 230 70)" />
          {/* Floating Giant Puzzle Pieces */}
          {/* Blue Piece */}
          <g transform="translate(60, 45) rotate(12)">
            <rect x="0" y="0" width="46" height="46" rx="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
            <circle cx="23" cy="0" r="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
            <circle cx="46" cy="23" r="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          </g>
          {/* Gold Piece */}
          <g transform="translate(125, 60) rotate(-10)">
            <rect x="0" y="0" width="44" height="44" rx="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
            <circle cx="0" cy="22" r="7" fill="#7C3AED" />
            <circle cx="22" cy="0" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          </g>
          {/* Little Stars */}
          <circle cx="40" cy="30" r="2.5" fill="#FFFFFF" />
          <circle cx="120" cy="25" r="3" fill="#FDE047" />
          <circle cx="290" cy="130" r="2" fill="#FFFFFF" />
        </svg>
      );

    case 'creative-corner':
      return (
        <svg viewBox="0 0 320 160" className={`${className} block`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="artSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
          </defs>
          <rect width="320" height="160" fill="url(#artSky)" />
          {/* Wooden Easel (Center) */}
          <g transform="translate(115, 30)">
            {/* Easel Legs */}
            <line x1="45" y1="10" x2="10" y2="125" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
            <line x1="45" y1="10" x2="80" y2="125" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
            <line x1="45" y1="10" x2="45" y2="125" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
            {/* Canvas Board */}
            <rect x="12" y="25" width="66" height="52" rx="5" fill="#FFFFFF" stroke="#451A03" strokeWidth="3" />
            {/* Canvas Painted Rainbow */}
            <path d="M 22,65 A 22,22 0 0,1 68,65" fill="none" stroke="#EF4444" strokeWidth="5" />
            <path d="M 27,65 A 17,17 0 0,1 63,65" fill="none" stroke="#F59E0B" strokeWidth="5" />
            <path d="M 32,65 A 12,12 0 0,1 58,65" fill="none" stroke="#3B82F6" strokeWidth="5" />
          </g>
          {/* Big Cartoon Paintbrush (Left) */}
          <g transform="translate(40, 40) rotate(-35)">
            <rect x="0" y="30" width="12" height="60" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <rect x="-2" y="22" width="16" height="12" rx="2" fill="#94A3B8" />
            <path d="M -1,22 Q 6,-5 13,22 Z" fill="#3B82F6" />
          </g>
          {/* Paint Palette with Colors (Right) */}
          <g transform="translate(215, 65)">
            <ellipse cx="40" cy="30" rx="36" ry="24" fill="#FDE68A" stroke="#B45309" strokeWidth="3" />
            <circle cx="22" cy="24" r="6" fill="#EF4444" />
            <circle cx="38" cy="18" r="6" fill="#3B82F6" />
            <circle cx="54" cy="22" r="6" fill="#10B981" />
            <circle cx="48" cy="36" r="6" fill="#A855F7" />
          </g>
        </svg>
      );

    case 'story-castle':
      return (
        <svg viewBox="0 0 320 160" className={`${className} block`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="storySky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="100%" stopColor="#312E81" />
            </linearGradient>
          </defs>
          <rect width="320" height="160" fill="url(#storySky)" />
          {/* Crescent Moon */}
          <path d="M 60,30 A 18,18 0 0,0 85,55 A 22,22 0 1,1 60,30 Z" fill="#FDE047" />
          {/* Little Stars in Sky */}
          <circle cx="120" cy="35" r="2" fill="#FFFFFF" />
          <circle cx="160" cy="25" r="2" fill="#FFFFFF" />
          <circle cx="240" cy="40" r="2" fill="#FFFFFF" />
          {/* Cloud base */}
          <ellipse cx="160" cy="150" rx="140" ry="30" fill="#E0E7FF" opacity="0.3" />
          {/* Big Storybook Base (Open Book) */}
          <g transform="translate(100, 75)">
            <path d="M 10,40 Q 60,20 60,50 L 60,65 Q 60,35 10,55 Z" fill="#FFFFFF" stroke="#4338CA" strokeWidth="2" />
            <path d="M 110,40 Q 60,20 60,50 L 60,65 Q 60,35 110,55 Z" fill="#FFFFFF" stroke="#4338CA" strokeWidth="2" />
          </g>
          {/* Magical Tale Castle Tower */}
          <g transform="translate(135, 40)">
            <rect x="15" y="30" width="22" height="45" fill="#6366F1" stroke="#312E81" strokeWidth="2" />
            <polygon points="10,30 26,0 42,30" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <rect x="22" y="45" width="8" height="12" rx="4" fill="#FDE047" />
          </g>
        </svg>
      );

    case 'music-village':
      return (
        <svg viewBox="0 0 320 160" className={`${className} block`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="musSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#99F6E4" />
            </linearGradient>
          </defs>
          <rect width="320" height="160" fill="url(#musSky)" />
          {/* Musical Stream */}
          <path d="M 0,125 Q 160,95 320,125 L 320,160 L 0,160 Z" fill="#0284C7" />
          {/* Rainbow Xylophone Bridge */}
          <g transform="translate(60, 65)">
            {[
              { x: 0, h: 56, c: '#EF4444' },
              { x: 26, h: 50, c: '#F97316' },
              { x: 52, h: 44, c: '#FBBF24' },
              { x: 78, h: 38, c: '#10B981' },
              { x: 104, h: 34, c: '#06B6D4' },
              { x: 130, h: 30, c: '#3B82F6' },
              { x: 156, h: 26, c: '#8B5CF6' },
              { x: 182, h: 22, c: '#EC4899' },
            ].map((bar, i) => (
              <rect
                key={i}
                x={bar.x}
                y={60 - bar.h}
                width="20"
                height={bar.h}
                rx="5"
                fill={bar.c}
                stroke="#0F172A"
                strokeWidth="2"
              />
            ))}
          </g>
          {/* Dancing Musical Notes Floating in Sky */}
          <g transform="translate(65, 20)">
            <ellipse cx="10" cy="18" rx="5" ry="4" fill="#FDE047" transform="rotate(-20 10 18)" />
            <line x1="14" y1="16" x2="14" y2="4" stroke="#FDE047" strokeWidth="2.5" />
            <line x1="14" y1="4" x2="22" y2="8" stroke="#FDE047" strokeWidth="2.5" />
          </g>
          <g transform="translate(245, 25)">
            <ellipse cx="10" cy="18" rx="5" ry="4" fill="#FDE047" transform="rotate(-20 10 18)" />
            <line x1="14" y1="16" x2="14" y2="4" stroke="#FDE047" strokeWidth="2.5" />
          </g>
        </svg>
      );

    case 'everyday-heroes':
      return (
        <svg viewBox="0 0 320 160" className={`${className} block`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>
          <rect width="320" height="160" fill="url(#heroSky)" />
          {/* Clean City Skyline */}
          <path d="M 0,130 Q 160,110 320,130 L 320,160 L 0,160 Z" fill="#22C55E" />
          {/* City Buildings */}
          <rect x="70" y="60" width="40" height="70" rx="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          <rect x="80" y="70" width="8" height="10" fill="#38BDF8" />
          <rect x="94" y="70" width="8" height="10" fill="#38BDF8" />
          <rect x="80" y="88" width="8" height="10" fill="#38BDF8" />
          <rect x="94" y="88" width="8" height="10" fill="#38BDF8" />

          {/* Sparkling Toothbrush & Bubble Fountain Center */}
          <g transform="translate(145, 40)">
            {/* Toothbrush handle */}
            <rect x="12" y="30" width="10" height="60" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            <rect x="9" y="18" width="16" height="15" rx="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
            {/* Sparkling Toothpaste Foam */}
            <circle cx="17" cy="14" r="8" fill="#FFFFFF" />
            <circle cx="12" cy="18" r="5" fill="#E0F2FE" />
            <circle cx="22" cy="18" r="5" fill="#E0F2FE" />
          </g>

          {/* Traffic Light (Right) */}
          <g transform="translate(225, 45)">
            <rect x="12" y="0" width="24" height="60" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            <line x1="24" y1="60" x2="24" y2="85" stroke="#475569" strokeWidth="4" />
            <circle cx="24" cy="12" r="6" fill="#EF4444" />
            <circle cx="24" cy="30" r="6" fill="#FBBF24" />
            <circle cx="24" cy="48" r="6" fill="#22C55E" />
          </g>

          {/* Soapy Floating Bubbles */}
          <circle cx="45" cy="50" r="10" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
          <circle cx="130" cy="30" r="7" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
          <circle cx="190" cy="45" r="9" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
        </svg>
      );
  }
};
