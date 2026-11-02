import React, { useState, useEffect } from 'react';
import { Lock, X, Check } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audio } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ParentGateModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useGame();
  const [num1, setNum1] = useState(6);
  const [num2, setNum2] = useState(7);
  const [userAnswer, setUserAnswer] = useState('');
  const [hasError, setHasError] = useState(false);

  // Generate new math challenge whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const n1 = Math.floor(Math.random() * 8) + 4; // 4 to 11
      const n2 = Math.floor(Math.random() * 8) + 3; // 3 to 10
      setNum1(n1);
      setNum2(n2);
      setUserAnswer('');
      setHasError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = num1 + num2;
    if (parseInt(userAnswer.trim(), 10) === correct) {
      audio.playSuccess();
      onSuccess();
    } else {
      audio.playGentleTryAgain();
      setHasError(true);
      setUserAnswer('');
    }
  };

  const handleKeyPress = (num: number) => {
    if (userAnswer.length < 3) {
      setUserAnswer(prev => prev + num);
      audio.playPop(1.2);
    }
  };

  const handleBackspace = () => {
    setUserAnswer(prev => prev.slice(0, -1));
    audio.playPop(0.9);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-4 border-amber-300 animate-pop">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-lg">
            <Lock className="w-5 h-5 text-amber-500" />
            <span>{t.parent.gateTitle}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600 text-center font-medium">
          {t.parent.gatePrompt}
        </p>

        {/* Big Math Question */}
        <div className="my-5 rounded-2xl bg-amber-50 p-4 text-center border-2 border-amber-200">
          <span className="text-3xl font-extrabold text-amber-900 tracking-wider">
            {num1} + {num2} = ?
          </span>
        </div>

        {/* Answer Display */}
        <div className="h-14 w-full rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-slate-800">
            {userAnswer || <span className="text-slate-300 text-lg">Tap answer below</span>}
          </span>
        </div>

        {hasError && (
          <p className="text-center text-rose-500 text-xs font-semibold mb-3">
            {t.tryAgain}
          </p>
        )}

        {/* Keypad for touch/mobile and desktop friendly entry */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => handleKeyPress(n)}
              className="h-12 rounded-xl bg-amber-100/70 hover:bg-amber-200 text-amber-950 font-bold text-lg shadow-xs transition-transform active:scale-95"
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBackspace}
            className="h-12 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-sm shadow-xs active:scale-95 flex items-center justify-center"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => handleKeyPress(0)}
            className="h-12 rounded-xl bg-amber-100/70 hover:bg-amber-200 text-amber-950 font-bold text-lg shadow-xs active:scale-95"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-xs active:scale-95 flex items-center justify-center gap-1"
          >
            <Check className="w-4 h-4" />
            <span>OK</span>
          </button>
        </div>
      </div>
    </div>
  );
};
