import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, X, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { MascotAvatar } from '../mascots/MascotAvatar';
import { APP_VERSION, BUILD_ID } from '../../utils/version';

interface Props {
  isOpen: boolean;
  isUpdating: boolean;
  updateError: string | null;
  onUpdate: () => void;
  onLater: () => void;
}

export const UpdateNotificationModal: React.FC<Props> = ({
  isOpen,
  isUpdating,
  updateError,
  onUpdate,
  onLater,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-4 border-amber-400 relative overflow-hidden text-center"
        >
          {/* Decorative ambient rays */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />

          {/* Friendly Mascot Presentation */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <MascotAvatar
                mascot="lion"
                size="lg"
                expression={isUpdating ? 'excited' : 'celebrating'}
                isAnimated
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-md border-2 border-white"
              >
                <Sparkles className="w-4 h-4 fill-amber-950 text-amber-950" />
              </motion.div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight mb-2">
            A New Adventure Awaits!
          </h3>

          {/* Message */}
          <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed mb-6 px-1">
            A new version of Little Genius World is ready. Update now to enjoy the latest games, improvements and exciting learning experiences.
          </p>

          {/* Error Message if update fails */}
          {updateError && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2 text-left">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{updateError}</span>
            </div>
          )}

          {/* Data Protection Guarantee */}
          <div className="mb-6 p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Your profiles, stars, and progress are 100% saved!</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              disabled={isUpdating}
              onClick={onUpdate}
              className={`w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
                isUpdating
                  ? 'bg-amber-300 text-amber-900 cursor-wait'
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-amber-950 shadow-amber-300 border-2 border-amber-500'
              }`}
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-950" />
                  <span>Loading Adventure...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-yellow-100" />
                  <span>Update Now</span>
                </>
              )}
            </motion.button>

            {!isUpdating && (
              <button
                onClick={onLater}
                className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
              >
                Later
              </button>
            )}
          </div>

          {/* Version tag */}
          <div className="mt-4 text-[11px] font-semibold text-slate-400">
            Little Genius World v{APP_VERSION} (Build {BUILD_ID})
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
