import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../../utils/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-4 py-2 text-sm shadow-md transition-all active:scale-95 border-2 border-amber-500"
        title="Install Little Genius World app"
      >
        <Download className="w-4 h-4" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-4 py-2 text-sm shadow-md transition-all active:scale-95 border-2 border-amber-500"
        >
          <Smartphone className="w-4 h-4" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-4 border-amber-300">
              <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                <h3 className="text-lg font-bold text-slate-800">Install on iPad / iPhone</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-full p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                1. Tap the <strong>Share</strong> button (box with upward arrow) in the Safari toolbar.<br /><br />
                2. Scroll down and tap <strong>Add to Home Screen</strong>.<br /><br />
                3. Tap <strong>Add</strong> at top right to start playing full screen offline!
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-2xl bg-amber-400 py-3 text-sm font-bold text-amber-950 hover:bg-amber-300 shadow-md"
              >
                Got It!
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
