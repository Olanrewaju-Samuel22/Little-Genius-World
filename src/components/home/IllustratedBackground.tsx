import React from 'react';

export const IllustratedBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`}>
      {/* 1. Sky & Landscape Vector Artwork Layer */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sky Gradient */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="45%" stopColor="#7DD3FC" />
              <stop offset="85%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>

            {/* Distant Hills Gradient */}
            <linearGradient id="distantHillsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A5B4FC" />
              <stop offset="100%" stopColor="#C7D2FE" />
            </linearGradient>

            {/* Midground Hills Gradient */}
            <linearGradient id="midHillsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            {/* Foreground Lush Meadow Gradient */}
            <linearGradient id="foreHillsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>

            {/* Fluffy Cloud Filter */}
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0284C7" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Sky Backdrop */}
          <rect width="1440" height="900" fill="url(#skyGrad)" />

          {/* Cheerful Smiling Cartoon Sun */}
          <g transform="translate(180, 110)">
            {/* Sun Rays */}
            <g className="animate-sun-spin" style={{ transformOrigin: '0px 0px' }}>
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <rect
                  key={deg}
                  x="-3.5"
                  y="-58"
                  width="7"
                  height="16"
                  rx="3.5"
                  fill="#FDE047"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>
            {/* Sun Core Disc */}
            <circle cx="0" cy="0" r="42" fill="#FACC15" stroke="#EAB308" strokeWidth="3" />
            {/* Sun Cute Face */}
            <circle cx="-13" cy="-6" r="4" fill="#854D0E" />
            <circle cx="-11.5" cy="-8" r="1.5" fill="#FFFFFF" />
            <circle cx="13" cy="-6" r="4" fill="#854D0E" />
            <circle cx="14.5" cy="-8" r="1.5" fill="#FFFFFF" />
            <circle cx="-20" cy="4" r="5" fill="#FB7185" fillOpacity="0.75" />
            <circle cx="20" cy="4" r="5" fill="#FB7185" fillOpacity="0.75" />
            <path d="M -9,6 Q 0,16 9,6" fill="none" stroke="#854D0E" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Gentle Rainbow Arc in Sky */}
          <g opacity="0.45">
            <path d="M 980,480 A 380,380 0 0,0 420,480" fill="none" stroke="#F43F5E" strokeWidth="10" strokeLinecap="round" />
            <path d="M 970,480 A 370,370 0 0,0 430,480" fill="none" stroke="#FB923C" strokeWidth="10" strokeLinecap="round" />
            <path d="M 960,480 A 360,360 0 0,0 440,480" fill="none" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round" />
            <path d="M 950,480 A 350,350 0 0,0 450,480" fill="none" stroke="#34D399" strokeWidth="10" strokeLinecap="round" />
            <path d="M 940,480 A 340,340 0 0,0 460,480" fill="none" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" />
            <path d="M 930,480 A 330,330 0 0,0 470,480" fill="none" stroke="#A855F7" strokeWidth="10" strokeLinecap="round" />
          </g>

          {/* Drifting Clouds */}
          <g filter="url(#softGlow)" className="animate-cloud-slow">
            {/* Cloud 1 (Top Left) */}
            <path
              d="M 120,160 Q 130,120 170,125 Q 210,100 250,130 Q 290,120 300,160 Q 320,180 290,200 L 130,200 Q 100,185 120,160 Z"
              fill="#FFFFFF"
              opacity="0.95"
            />
          </g>

          <g filter="url(#softGlow)" className="animate-cloud-medium">
            {/* Cloud 2 (Top Right) */}
            <path
              d="M 1100,120 Q 1120,80 1160,90 Q 1200,60 1240,90 Q 1280,80 1300,120 Q 1320,150 1280,170 L 1110,170 Q 1080,150 1100,120 Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
            {/* Cloud 3 (Mid Floating) */}
            <path
              d="M 680,210 Q 700,180 730,190 Q 760,170 790,190 Q 820,180 830,210 Q 850,230 820,245 L 690,245 Q 665,230 680,210 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
          </g>

          {/* Layer 1: Distant Lilac Hills */}
          <path
            d="M 0,600 Q 360,450 720,530 Q 1080,440 1440,560 L 1440,900 L 0,900 Z"
            fill="url(#distantHillsGrad)"
          />

          {/* Distant Fairytale Castle Silhouette on Hill */}
          <g transform="translate(1120, 420)" opacity="0.6">
            <rect x="0" y="25" width="40" height="45" fill="#818CF8" />
            <polygon points="-5,25 20,-10 45,25" fill="#6366F1" />
            <rect x="35" y="40" width="30" height="30" fill="#818CF8" />
            <polygon points="30,40 50,15 70,40" fill="#6366F1" />
            <line x1="20" y1="-10" x2="20" y2="-22" stroke="#4F46E5" strokeWidth="2" />
            <polygon points="20,-22 32,-18 20,-14" fill="#F43F5E" />
          </g>

          {/* Layer 2: Midground Rolling Green Hills with Trees */}
          <path
            d="M 0,660 Q 420,540 860,620 Q 1200,560 1440,640 L 1440,900 L 0,900 Z"
            fill="url(#midHillsGrad)"
          />

          {/* Cartoon Trees on Mid Hills */}
          <g transform="translate(240, 520)">
            {/* Tree Trunk */}
            <rect x="18" y="40" width="10" height="30" rx="3" fill="#78350F" />
            {/* Foliage Puffs */}
            <circle cx="23" cy="30" r="24" fill="#15803D" />
            <circle cx="12" cy="32" r="18" fill="#16A34A" />
            <circle cx="34" cy="32" r="18" fill="#22C55E" />
            <circle cx="23" cy="18" r="18" fill="#4ADE80" />
            {/* Cute Red Apples */}
            <circle cx="16" cy="24" r="3" fill="#EF4444" />
            <circle cx="28" cy="28" r="3" fill="#EF4444" />
            <circle cx="22" cy="36" r="3" fill="#EF4444" />
          </g>

          <g transform="translate(1260, 530)">
            <rect x="16" y="35" width="8" height="28" rx="2" fill="#78350F" />
            <circle cx="20" cy="26" r="22" fill="#15803D" />
            <circle cx="10" cy="28" r="16" fill="#16A34A" />
            <circle cx="30" cy="28" r="16" fill="#22C55E" />
            <circle cx="20" cy="16" r="16" fill="#4ADE80" />
            <circle cx="15" cy="20" r="2.5" fill="#EF4444" />
            <circle cx="25" cy="24" r="2.5" fill="#EF4444" />
          </g>

          {/* Layer 3: Foreground Bright Grassy Hill */}
          <path
            d="M -40,730 Q 380,630 760,710 Q 1140,640 1480,720 L 1480,900 L -40,900 Z"
            fill="url(#foreHillsGrad)"
          />

          {/* Foreground Meadow Flowers & Grass Details */}
          <g transform="translate(80, 770)">
            {/* Daisy 1 */}
            <circle cx="10" cy="10" r="10" fill="#FFFFFF" />
            <circle cx="10" cy="10" r="4" fill="#FACC15" />
            <path d="M 10,20 L 10,32" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 10,26 Q 5,22 2,26" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
          </g>

          <g transform="translate(130, 790)">
            {/* Tulip 1 */}
            <path d="M 10,12 C 4,6 4,-2 10,2 C 16,-2 16,6 10,12 Z" fill="#F43F5E" />
            <path d="M 10,12 L 10,26" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          <g transform="translate(1280, 760)">
            {/* Daisy 2 */}
            <circle cx="10" cy="10" r="10" fill="#FFFFFF" />
            <circle cx="10" cy="10" r="4" fill="#FACC15" />
            <path d="M 10,20 L 10,30" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          <g transform="translate(1330, 775)">
            {/* Golden Starflower */}
            <circle cx="8" cy="8" r="8" fill="#FDE047" />
            <circle cx="8" cy="8" r="3.5" fill="#EA580C" />
            <path d="M 8,16 L 8,26" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Children content mounted on top */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
