import React from 'react';

export type MascotKey = 'lion' | 'penguin' | 'bunny' | 'owl' | 'zebra' | 'elephant' | 'star';

interface MascotProps {
  mascot: MascotKey | string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  isAnimated?: boolean;
}

export const MascotAvatar: React.FC<MascotProps> = ({
  mascot,
  size = 'md',
  className = '',
  isAnimated = false,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    hero: 'w-44 h-44 sm:w-56 sm:h-56',
  }[size];

  const animClass = isAnimated ? 'animate-float' : '';

  switch (mascot) {
    case 'penguin':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Body */}
          <ellipse cx="50" cy="55" rx="34" ry="38" fill="#1E293B" />
          {/* White Belly */}
          <ellipse cx="50" cy="60" rx="22" ry="28" fill="#F8FAFC" />
          {/* Beak */}
          <polygon points="50,52 44,45 56,45" fill="#F59E0B" />
          {/* Blushes */}
          <circle cx="34" cy="46" r="4" fill="#FB7185" fillOpacity="0.7" />
          <circle cx="66" cy="46" r="4" fill="#FB7185" fillOpacity="0.7" />
          {/* Eyes */}
          <circle cx="40" cy="38" r="5" fill="#0F172A" />
          <circle cx="38" cy="36" r="2" fill="#FFFFFF" />
          <circle cx="60" cy="38" r="5" fill="#0F172A" />
          <circle cx="58" cy="36" r="2" fill="#FFFFFF" />
          {/* Feet */}
          <ellipse cx="38" cy="92" rx="9" ry="5" fill="#F59E0B" />
          <ellipse cx="62" cy="92" rx="9" ry="5" fill="#F59E0B" />
          {/* Scarf */}
          <path d="M 28,48 Q 50,56 72,48" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'bunny':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Ears */}
          <ellipse cx="38" cy="24" rx="7" ry="18" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2.5" />
          <ellipse cx="38" cy="24" rx="4" ry="12" fill="#F472B6" />
          <ellipse cx="62" cy="24" rx="7" ry="18" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2.5" />
          <ellipse cx="62" cy="24" rx="4" ry="12" fill="#F472B6" />
          {/* Head & Body */}
          <ellipse cx="50" cy="62" rx="32" ry="30" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2.5" />
          {/* Cheeks */}
          <circle cx="32" cy="66" r="6" fill="#FDA4AF" />
          <circle cx="68" cy="66" r="6" fill="#FDA4AF" />
          {/* Eyes */}
          <circle cx="40" cy="58" r="4.5" fill="#475569" />
          <circle cx="38" cy="56" r="1.5" fill="#FFFFFF" />
          <circle cx="60" cy="58" r="4.5" fill="#475569" />
          <circle cx="58" cy="56" r="1.5" fill="#FFFFFF" />
          {/* Nose & Smile */}
          <polygon points="50,67 47,63 53,63" fill="#FB7185" />
          <path d="M 45,71 Q 50,76 55,71" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'owl':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Body */}
          <ellipse cx="50" cy="58" rx="34" ry="34" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2.5" />
          {/* Ear Tufts */}
          <polygon points="26,30 36,40 22,46" fill="#7C3AED" />
          <polygon points="74,30 64,40 78,46" fill="#7C3AED" />
          {/* Big Eye Patches */}
          <circle cx="37" cy="50" r="14" fill="#FFFFFF" />
          <circle cx="63" cy="50" r="14" fill="#FFFFFF" />
          {/* Pupils */}
          <circle cx="38" cy="50" r="7" fill="#1E1B4B" />
          <circle cx="36" cy="47" r="2.5" fill="#FFFFFF" />
          <circle cx="62" cy="50" r="7" fill="#1E1B4B" />
          <circle cx="60" cy="47" r="2.5" fill="#FFFFFF" />
          {/* Beak */}
          <polygon points="50,60 45,52 55,52" fill="#F59E0B" />
          {/* Tummy Feathers */}
          <path d="M 42,72 Q 50,76 58,72" fill="none" stroke="#7C3AED" strokeWidth="2" />
          <path d="M 44,79 Q 50,83 56,79" fill="none" stroke="#7C3AED" strokeWidth="2" />
        </svg>
      );

    case 'zebra':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Mane */}
          <path d="M 45,15 Q 50,10 55,15 L 56,35 L 44,35 Z" fill="#1E293B" />
          {/* Head */}
          <ellipse cx="50" cy="54" rx="30" ry="32" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
          {/* Stripes */}
          <path d="M 22,46 L 36,49 L 23,54" fill="#0F172A" />
          <path d="M 78,46 L 64,49 L 77,54" fill="#0F172A" />
          <path d="M 25,62 L 35,63 L 26,67" fill="#0F172A" />
          <path d="M 75,62 L 65,63 L 74,67" fill="#0F172A" />
          {/* Eyes */}
          <circle cx="40" cy="46" r="4.5" fill="#0F172A" />
          <circle cx="39" cy="44" r="1.5" fill="#FFFFFF" />
          <circle cx="60" cy="46" r="4.5" fill="#0F172A" />
          <circle cx="59" cy="44" r="1.5" fill="#FFFFFF" />
          {/* Soft Muzzle */}
          <ellipse cx="50" cy="72" rx="16" ry="12" fill="#CBD5E1" />
          <circle cx="45" cy="70" r="2" fill="#0F172A" />
          <circle cx="55" cy="70" r="2" fill="#0F172A" />
          <path d="M 46,75 Q 50,78 54,75" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'elephant':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Big Ears */}
          <ellipse cx="22" cy="50" rx="16" ry="20" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
          <ellipse cx="22" cy="50" rx="10" ry="13" fill="#BFDBFE" />
          <ellipse cx="78" cy="50" rx="16" ry="20" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
          <ellipse cx="78" cy="50" rx="10" ry="13" fill="#BFDBFE" />
          {/* Head */}
          <ellipse cx="50" cy="54" rx="28" ry="28" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="40" cy="46" r="4.5" fill="#1E293B" />
          <circle cx="39" cy="44" r="1.5" fill="#FFFFFF" />
          <circle cx="60" cy="46" r="4.5" fill="#1E293B" />
          <circle cx="59" cy="44" r="1.5" fill="#FFFFFF" />
          {/* Trunk */}
          <path d="M 46,55 Q 50,76 60,72 Q 65,70 65,65" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 46,55 Q 50,76 60,72 Q 65,70 65,65" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Cheeks */}
          <circle cx="33" cy="55" r="4" fill="#FDA4AF" />
          <circle cx="67" cy="55" r="4" fill="#FDA4AF" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          <path
            d="M 50,12 L 60,35 L 85,38 L 65,56 L 71,81 L 50,68 L 29,81 L 35,56 L 15,38 L 40,35 Z"
            fill="#FDE047"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="46" r="3.5" fill="#1E293B" />
          <circle cx="58" cy="46" r="3.5" fill="#1E293B" />
          <path d="M 46,54 Q 50,60 54,54" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="36" cy="50" r="3" fill="#FB7185" fillOpacity="0.7" />
          <circle cx="64" cy="50" r="3" fill="#FB7185" fillOpacity="0.7" />
        </svg>
      );

    case 'lion':
    default:
      return (
        <svg viewBox="0 0 100 100" className={`${sizeClasses} ${animClass} ${className}`}>
          {/* Mane */}
          <circle cx="50" cy="52" r="38" fill="#F97316" />
          {/* Fluffy mane petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 36 * Math.cos(rad);
            const y = 52 + 36 * Math.sin(rad);
            return <circle key={i} cx={x} cy={y} r="10" fill="#EA580C" />;
          })}
          {/* Face */}
          <circle cx="50" cy="54" r="28" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
          {/* Ears */}
          <circle cx="30" cy="30" r="9" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="30" cy="30" r="5" fill="#FB7185" />
          <circle cx="70" cy="30" r="9" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="70" cy="30" r="5" fill="#FB7185" />
          {/* Cute Big Eyes */}
          <circle cx="41" cy="49" r="4.5" fill="#1E293B" />
          <circle cx="39" cy="47" r="1.5" fill="#FFFFFF" />
          <circle cx="59" cy="49" r="4.5" fill="#1E293B" />
          <circle cx="57" cy="47" r="1.5" fill="#FFFFFF" />
          {/* Rosy Cheeks */}
          <circle cx="33" cy="57" r="4.5" fill="#FDA4AF" />
          <circle cx="67" cy="57" r="4.5" fill="#FDA4AF" />
          {/* Little Brown Nose & Happy Smile */}
          <polygon points="50,57 46,53 54,53" fill="#78350F" />
          <path d="M 44,60 Q 50,67 56,60" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
};
