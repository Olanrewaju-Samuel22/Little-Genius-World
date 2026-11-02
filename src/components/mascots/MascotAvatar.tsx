import React from 'react';

export type MascotKey = 'lion' | 'penguin' | 'bunny' | 'owl' | 'zebra' | 'elephant' | 'star';
export type MascotExpression = 'happy' | 'winking' | 'excited' | 'curious' | 'celebrating' | 'proud';

interface MascotProps {
  mascot: MascotKey | string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  isAnimated?: boolean;
  expression?: MascotExpression;
}

export const MascotAvatar: React.FC<MascotProps> = ({
  mascot,
  size = 'md',
  className = '',
  isAnimated = false,
  expression = 'happy',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    hero: 'w-48 h-48 sm:w-60 sm:h-60',
  }[size];

  const animClass = isAnimated ? 'animate-mascot-sway' : '';

  switch (mascot) {
    case 'penguin':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          <defs>
            <radialGradient id="pengBelly" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </radialGradient>
          </defs>
          {/* Flipper Wings */}
          <ellipse cx="18" cy="62" rx="7" ry="18" fill="#0F172A" transform="rotate(20 18 62)" />
          <ellipse cx="82" cy="62" rx="7" ry="18" fill="#0F172A" transform="rotate(-20 82 62)" />
          {/* Main Body */}
          <ellipse cx="50" cy="56" rx="33" ry="38" fill="#1E293B" />
          {/* Soft White Tummy */}
          <ellipse cx="50" cy="62" rx="22" ry="28" fill="url(#pengBelly)" />
          {/* Rosy Cheeks */}
          <circle cx="33" cy="48" r="4.5" fill="#FB7185" fillOpacity="0.75" />
          <circle cx="67" cy="48" r="4.5" fill="#FB7185" fillOpacity="0.75" />
          {/* Expressive Eyes */}
          {expression === 'winking' ? (
            <>
              <path d="M 33,39 Q 40,34 44,40" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
              <circle cx="62" cy="38" r="5" fill="#0F172A" />
              <circle cx="60" cy="36" r="2" fill="#FFFFFF" />
            </>
          ) : (
            <>
              <circle cx="38" cy="38" r="5.5" fill="#0F172A" />
              <circle cx="36" cy="36" r="2" fill="#FFFFFF" />
              <circle cx="40" cy="40" r="1" fill="#FFFFFF" />
              <circle cx="62" cy="38" r="5.5" fill="#0F172A" />
              <circle cx="60" cy="36" r="2" fill="#FFFFFF" />
              <circle cx="64" cy="40" r="1" fill="#FFFFFF" />
            </>
          )}
          {/* Beak */}
          <polygon points="50,54 42,45 58,45" fill="#F59E0B" stroke="#D97706" strokeWidth="1" strokeLinejoin="round" />
          {/* Feet */}
          <ellipse cx="36" cy="92" rx="9" ry="5" fill="#F59E0B" />
          <ellipse cx="64" cy="92" rx="9" ry="5" fill="#F59E0B" />
          {/* Cozy Scarf */}
          <path d="M 26,48 Q 50,58 74,48" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 36,52 L 36,66" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'bunny':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Ears with inner pink fluff */}
          <ellipse cx="36" cy="22" rx="7" ry="19" fill="#FDF2F8" stroke="#F472B6" strokeWidth="2.5" />
          <ellipse cx="36" cy="22" rx="4" ry="13" fill="#F472B6" />
          <ellipse cx="64" cy="22" rx="7" ry="19" fill="#FDF2F8" stroke="#F472B6" strokeWidth="2.5" />
          <ellipse cx="64" cy="22" rx="4" ry="13" fill="#F472B6" />
          {/* Head */}
          <ellipse cx="50" cy="62" rx="32" ry="30" fill="#FDF2F8" stroke="#F472B6" strokeWidth="2.5" />
          {/* Big Cheeks */}
          <circle cx="31" cy="67" r="6" fill="#FDA4AF" />
          <circle cx="69" cy="67" r="6" fill="#FDA4AF" />
          {/* Eyes */}
          <circle cx="39" cy="57" r="5" fill="#475569" />
          <circle cx="37" cy="55" r="1.8" fill="#FFFFFF" />
          <circle cx="61" cy="57" r="5" fill="#475569" />
          <circle cx="59" cy="55" r="1.8" fill="#FFFFFF" />
          {/* Nose & Smile */}
          <polygon points="50,66 46,62 54,62" fill="#FB7185" />
          <path d="M 44,70 Q 50,75 56,70" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cute Whiskers */}
          <path d="M 23,65 L 14,64" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 23,69 L 15,71" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 77,65 L 86,64" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 77,69 L 85,71" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'owl':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Ear Tufts */}
          <polygon points="24,28 36,40 20,46" fill="#6D28D9" />
          <polygon points="76,28 64,40 80,46" fill="#6D28D9" />
          {/* Body */}
          <ellipse cx="50" cy="58" rx="34" ry="34" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2.5" />
          {/* Big Owl Eye Patches */}
          <circle cx="36" cy="50" r="15" fill="#FFFFFF" stroke="#DDD6FE" strokeWidth="2" />
          <circle cx="64" cy="50" r="15" fill="#FFFFFF" stroke="#DDD6FE" strokeWidth="2" />
          {/* Pupils */}
          <circle cx="37" cy="50" r="7.5" fill="#1E1B4B" />
          <circle cx="35" cy="47" r="2.5" fill="#FFFFFF" />
          <circle cx="39" cy="52" r="1" fill="#FFFFFF" />
          <circle cx="63" cy="50" r="7.5" fill="#1E1B4B" />
          <circle cx="61" cy="47" r="2.5" fill="#FFFFFF" />
          <circle cx="65" cy="52" r="1" fill="#FFFFFF" />
          {/* Gold Beak */}
          <polygon points="50,62 44,53 56,53" fill="#F59E0B" />
          {/* Tummy scallops */}
          <path d="M 40,73 Q 50,78 60,73" fill="none" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 43,80 Q 50,85 57,80" fill="none" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'zebra':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Mane */}
          <path d="M 44,14 Q 50,8 56,14 L 58,35 L 42,35 Z" fill="#0F172A" />
          {/* Head */}
          <ellipse cx="50" cy="54" rx="30" ry="32" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
          {/* Cute Stripes */}
          <path d="M 22,44 L 35,48 L 23,53" fill="#0F172A" />
          <path d="M 78,44 L 65,48 L 77,53" fill="#0F172A" />
          <path d="M 24,62 L 34,63 L 25,67" fill="#0F172A" />
          <path d="M 76,62 L 66,63 L 75,67" fill="#0F172A" />
          {/* Eyes */}
          <circle cx="39" cy="45" r="5" fill="#0F172A" />
          <circle cx="37" cy="43" r="1.8" fill="#FFFFFF" />
          <circle cx="61" cy="45" r="5" fill="#0F172A" />
          <circle cx="59" cy="43" r="1.8" fill="#FFFFFF" />
          {/* Soft Muzzle */}
          <ellipse cx="50" cy="72" rx="17" ry="13" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="44" cy="70" r="2.2" fill="#0F172A" />
          <circle cx="56" cy="70" r="2.2" fill="#0F172A" />
          <path d="M 45,76 Q 50,80 55,76" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'elephant':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Big Flappy Ears */}
          <ellipse cx="20" cy="50" rx="17" ry="22" fill="#93C5FD" stroke="#2563EB" strokeWidth="2.5" />
          <ellipse cx="20" cy="50" rx="11" ry="14" fill="#BFDBFE" />
          <ellipse cx="80" cy="50" rx="17" ry="22" fill="#93C5FD" stroke="#2563EB" strokeWidth="2.5" />
          <ellipse cx="80" cy="50" rx="11" ry="14" fill="#BFDBFE" />
          {/* Head */}
          <ellipse cx="50" cy="54" rx="29" ry="29" fill="#93C5FD" stroke="#2563EB" strokeWidth="2.5" />
          {/* Big Friendly Eyes */}
          <circle cx="39" cy="46" r="5" fill="#1E293B" />
          <circle cx="37" cy="44" r="1.8" fill="#FFFFFF" />
          <circle cx="61" cy="46" r="5" fill="#1E293B" />
          <circle cx="59" cy="44" r="1.8" fill="#FFFFFF" />
          {/* Rosy Cheeks */}
          <circle cx="31" cy="56" r="4.5" fill="#FDA4AF" />
          <circle cx="69" cy="56" r="4.5" fill="#FDA4AF" />
          {/* Playful Trunk */}
          <path d="M 45,55 Q 50,78 62,74 Q 68,70 66,63" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 45,55 Q 50,78 62,74 Q 68,70 66,63" stroke="#BFDBFE" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          <defs>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <path
            d="M 50,8 L 61,34 L 89,37 L 68,57 L 74,85 L 50,70 L 26,85 L 32,57 L 11,37 L 39,34 Z"
            fill="url(#starGradient)"
            stroke="#D97706"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Glowing Eyes */}
          <circle cx="41" cy="46" r="4" fill="#1E1B4B" />
          <circle cx="39" cy="44" r="1.5" fill="#FFFFFF" />
          <circle cx="59" cy="46" r="4" fill="#1E1B4B" />
          <circle cx="57" cy="44" r="1.5" fill="#FFFFFF" />
          {/* Happy Smile */}
          <path d="M 44,55 Q 50,62 56,55" fill="none" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          {/* Sparkle Cheeks */}
          <circle cx="34" cy="52" r="3.5" fill="#FB7185" fillOpacity="0.8" />
          <circle cx="66" cy="52" r="3.5" fill="#FB7185" fillOpacity="0.8" />
        </svg>
      );

    case 'lion':
    default:
      // Premium Expressive 2D Cartoon Lion Mascot (Leo)
      return (
        <svg viewBox="0 0 120 120" className={`${sizeClasses} ${animClass} ${className}`}>
          <defs>
            {/* Mane Depth Gradient */}
            <radialGradient id="lionManeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="70%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </radialGradient>
            {/* Face Soft Warmth */}
            <linearGradient id="lionFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
            {/* Snout Cream */}
            <linearGradient id="snoutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
            <filter id="lionShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#78350F" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Group with gentle shadow */}
          <g filter="url(#lionShadow)">
            {/* Outer Volumetric Mane Fluffs (12 rich overlapping circular clouds) */}
            <g>
              {[
                { cx: 60, cy: 18, r: 16 },
                { cx: 82, cy: 26, r: 16 },
                { cx: 98, cy: 44, r: 16 },
                { cx: 104, cy: 66, r: 16 },
                { cx: 96, cy: 88, r: 16 },
                { cx: 78, cy: 102, r: 16 },
                { cx: 60, cy: 105, r: 16 },
                { cx: 42, cy: 102, r: 16 },
                { cx: 24, cy: 88, r: 16 },
                { cx: 16, cy: 66, r: 16 },
                { cx: 22, cy: 44, r: 16 },
                { cx: 38, cy: 26, r: 16 },
              ].map((p, i) => (
                <circle
                  key={i}
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill="url(#lionManeGrad)"
                  stroke="#9A3412"
                  strokeWidth="1.5"
                />
              ))}
              {/* Inner Mane Core */}
              <circle cx="60" cy="62" r="44" fill="url(#lionManeGrad)" />
            </g>

            {/* Rounded Ears (Layered behind face, with inner pink tufts) */}
            <g>
              {/* Left Ear */}
              <circle cx="34" cy="34" r="13" fill="#FDE047" stroke="#D97706" strokeWidth="2.5" />
              <circle cx="34" cy="34" r="8" fill="#F472B6" />
              <circle cx="34" cy="34" r="5" fill="#FDA4AF" />

              {/* Right Ear */}
              <circle cx="86" cy="34" r="13" fill="#FDE047" stroke="#D97706" strokeWidth="2.5" />
              <circle cx="86" cy="34" r="8" fill="#F472B6" />
              <circle cx="86" cy="34" r="5" fill="#FDA4AF" />
            </g>

            {/* Main Golden Head */}
            <circle cx="60" cy="64" r="34" fill="url(#lionFaceGrad)" stroke="#D97706" strokeWidth="3" />

            {/* Cute Tuft of Forehead Crown Hair */}
            <path
              d="M 54,34 Q 60,24 66,34 Q 63,30 60,32 Q 57,30 54,34 Z"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="1.5"
            />

            {/* Big Expressive Cartoon Eyes */}
            {expression === 'winking' ? (
              <g>
                {/* Left Winking Eye */}
                <path
                  d="M 40,56 Q 48,48 54,57"
                  fill="none"
                  stroke="#451A03"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path d="M 37,56 L 33,52" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 57,57 L 61,54" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />

                {/* Right Big Sparkling Eye */}
                <circle cx="73" cy="56" r="6.5" fill="#451A03" />
                <circle cx="71" cy="53" r="2.5" fill="#FFFFFF" />
                <circle cx="75" cy="58" r="1.2" fill="#FFFFFF" />
              </g>
            ) : expression === 'excited' || expression === 'celebrating' ? (
              <g>
                {/* Wide Wonder Eyes with Star Highlights */}
                <circle cx="47" cy="55" r="7" fill="#451A03" />
                <circle cx="44" cy="52" r="3" fill="#FFFFFF" />
                <circle cx="49" cy="58" r="1.5" fill="#FFFFFF" />

                <circle cx="73" cy="55" r="7" fill="#451A03" />
                <circle cx="70" cy="52" r="3" fill="#FFFFFF" />
                <circle cx="75" cy="58" r="1.5" fill="#FFFFFF" />
              </g>
            ) : expression === 'curious' ? (
              <g>
                {/* One raised eye brow */}
                <path d="M 40,46 Q 47,42 54,47" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 66,43 Q 73,38 80,43" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <circle cx="47" cy="56" r="6" fill="#451A03" />
                <circle cx="45" cy="53" r="2.2" fill="#FFFFFF" />
                <circle cx="73" cy="56" r="6" fill="#451A03" />
                <circle cx="71" cy="53" r="2.2" fill="#FFFFFF" />
              </g>
            ) : (
              // Default Cheerful Happy Eyes
              <g>
                <circle cx="47" cy="56" r="6" fill="#451A03" />
                <circle cx="44.5" cy="53" r="2.4" fill="#FFFFFF" />
                <circle cx="49" cy="58" r="1.2" fill="#FFFFFF" />

                <circle cx="73" cy="56" r="6" fill="#451A03" />
                <circle cx="70.5" cy="53" r="2.4" fill="#FFFFFF" />
                <circle cx="75" cy="58" r="1.2" fill="#FFFFFF" />
              </g>
            )}

            {/* Glowing Rosy Cheeks */}
            <ellipse cx="37" cy="66" rx="6" ry="4.5" fill="#FB7185" fillOpacity="0.85" />
            <ellipse cx="83" cy="66" rx="6" ry="4.5" fill="#FB7185" fillOpacity="0.85" />

            {/* Soft Cream Muzzle */}
            <ellipse cx="60" cy="72" rx="16" ry="12" fill="url(#snoutGrad)" stroke="#D97706" strokeWidth="1.5" />

            {/* Whisker freckles */}
            <circle cx="51" cy="71" r="1.2" fill="#92400E" />
            <circle cx="47" cy="73" r="1.2" fill="#92400E" />
            <circle cx="69" cy="71" r="1.2" fill="#92400E" />
            <circle cx="73" cy="73" r="1.2" fill="#92400E" />

            {/* Cute Espresso Button Nose */}
            <polygon points="60,69 54,63 66,63" fill="#78350F" stroke="#451A03" strokeWidth="1.5" strokeLinejoin="round" />
            <ellipse cx="58" cy="64.5" rx="2" ry="1" fill="#FFFFFF" fillOpacity="0.6" />

            {/* Mouth */}
            {expression === 'excited' || expression === 'celebrating' ? (
              <g>
                {/* Big Open Happy Mouth with Pink Tongue */}
                <path d="M 52,73 Q 60,84 68,73 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 55,75 Q 60,82 65,75" fill="#F43F5E" />
              </g>
            ) : (
              // Sweet Warm Smile
              <path
                d="M 51,72 Q 60,80 69,72"
                fill="none"
                stroke="#78350F"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}

            {/* Little Genius Gold Star Bandana / Collar */}
            <g transform="translate(60, 93)">
              <polygon
                points="0,-4 3,3 10,4 5,8 7,15 0,11 -7,15 -5,8 -10,4 -3,3"
                fill="#FDE047"
                stroke="#B45309"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>
      );
  }
};
