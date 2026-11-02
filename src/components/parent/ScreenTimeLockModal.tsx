import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MascotAvatar } from '../mascots/MascotAvatar';
import { ParentGateModal } from './ParentGateModal';

export const ScreenTimeLockModal: React.FC = () => {
  const { isScreenTimeLocked, unlockScreenTime, t } = useGame();
  const [showGate, setShowGate] = useState(false);

  if (!isScreenTimeLocked) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-900/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl border-4 border-amber-300 animate-pop">
        {/* Animated Friendly Mascot */}
        <div className="flex justify-center mb-4">
          <MascotAvatar mascot="lion" size="xl" isAnimated />
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
          <h2 className="text-2xl font-extrabold text-amber-950">
            {t.parent.breakTimeTitle}
          </h2>
          <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
          {t.parent.breakTimeDesc}
        </p>

        <div className="rounded-2xl bg-amber-50 p-4 border-2 border-amber-200 mb-6 flex justify-around text-center text-xs font-bold text-amber-900">
          <div>
            <div className="text-2xl mb-1">💧</div>
            <span>Drink Water</span>
          </div>
          <div>
            <div className="text-2xl mb-1">👀</div>
            <span>Rest Eyes</span>
          </div>
          <div>
            <div className="text-2xl mb-1">🤸‍♀️</div>
            <span>Big Stretch</span>
          </div>
        </div>

        <button
          onClick={() => setShowGate(true)}
          className="w-full rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold py-3 text-sm shadow-md transition-transform active:scale-95"
        >
          {t.parent.breakTimeAction}
        </button>

        {showGate && (
          <ParentGateModal
            isOpen={showGate}
            onClose={() => setShowGate(false)}
            onSuccess={() => {
              setShowGate(false);
              unlockScreenTime();
            }}
          />
        )}
      </div>
    </div>
  );
};
