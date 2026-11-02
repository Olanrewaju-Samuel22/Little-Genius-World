import React from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { AgeGroup } from '../../types';
import { audio } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AgeSelectModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentProfile, updateProfileAge, t } = useGame();

  if (!isOpen) return null;

  const ageGroups: { id: AgeGroup; emoji: string; color: string; border: string; bg: string }[] = [
    { id: '0-1', emoji: '🍼', color: 'from-pink-400 to-rose-400', border: 'border-pink-300', bg: 'bg-pink-50' },
    { id: '1-2', emoji: '🧸', color: 'from-amber-400 to-orange-400', border: 'border-amber-300', bg: 'bg-amber-50' },
    { id: '2-3', emoji: '🧩', color: 'from-emerald-400 to-teal-400', border: 'border-emerald-300', bg: 'bg-emerald-50' },
    { id: '3-4', emoji: '🎨', color: 'from-sky-400 to-blue-400', border: 'border-sky-300', bg: 'bg-sky-50' },
    { id: '4-5', emoji: '🚀', color: 'from-purple-400 to-indigo-400', border: 'border-purple-300', bg: 'bg-purple-50' },
  ];

  const handleSelect = (ageGroup: AgeGroup) => {
    updateProfileAge(ageGroup);
    audio.playSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border-4 border-amber-300 animate-pop">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold text-slate-800">{t.chooseAge}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Select an age group to adapt all games, speech tempo, and puzzle challenges:
        </p>

        <div className="mt-4 space-y-3">
          {ageGroups.map((group) => {
            const isSelected = currentProfile.ageGroup === group.id;
            const info = t.ageGroups[group.id];

            return (
              <button
                key={group.id}
                onClick={() => handleSelect(group.id)}
                className={`w-full flex items-center gap-4 rounded-2xl p-3.5 text-left border-3 transition-all transform active:scale-98 ${
                  isSelected
                    ? `${group.bg} ${group.border} ring-2 ring-amber-400 shadow-md`
                    : 'bg-white border-slate-200 hover:border-amber-200 hover:bg-amber-50/40 shadow-xs'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${group.color} flex items-center justify-center text-2xl shadow-xs shrink-0`}>
                  {group.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {info.title}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-600">
                      {info.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {info.desc}
                  </p>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
