import React from 'react';
import { X, Volume2, VolumeX, Music, Globe, Eye } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { LanguageCode } from '../../types';
import { audio } from '../../utils/audio';
import { APP_VERSION, BUILD_ID } from '../../utils/version';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, t, currentLang, setLanguage } = useGame();

  if (!isOpen) return null;

  const toggleMusic = () => {
    if (settings.musicVolume > 0) {
      updateSettings({ musicVolume: 0 });
      audio.stopMusic();
    } else {
      updateSettings({ musicVolume: 0.35 });
      audio.startMusic();
    }
  };

  const toggleMute = () => {
    const next = !settings.isMuted;
    updateSettings({ isMuted: next });
    if (next) {
      audio.stopMusic();
    } else if (settings.musicVolume > 0) {
      audio.startMusic();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-4 border-amber-300 animate-pop">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <h3 className="text-xl font-bold text-slate-800">{t.settings}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Master Sound Button */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2">
              {settings.isMuted ? (
                <VolumeX className="w-5 h-5 text-rose-500" />
              ) : (
                <Volume2 className="w-5 h-5 text-emerald-600" />
              )}
              <span className="text-sm font-bold text-slate-800">
                {settings.isMuted ? t.soundOff : t.soundOn}
              </span>
            </div>
            <button
              onClick={toggleMute}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                !settings.isMuted ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {!settings.isMuted ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Background Music Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-sky-50 border border-sky-200">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-sky-600" />
              <span className="text-sm font-bold text-slate-800">
                {settings.musicVolume > 0 ? t.musicOn : t.musicOff}
              </span>
            </div>
            <button
              onClick={toggleMusic}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                settings.musicVolume > 0 ? 'bg-sky-500 text-white' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {settings.musicVolume > 0 ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50 border border-purple-200">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <span className="text-xs font-bold text-slate-800">Calm Motion</span>
            </div>
            <button
              onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                settings.reducedMotion ? 'bg-purple-600 text-white' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {settings.reducedMotion ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Language Selector */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <Globe className="w-4 h-4 text-amber-500" />
              <span>{t.language}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { code: 'en', label: 'English' },
                { code: 'yo', label: 'Yorùbá' },
                { code: 'ha', label: 'Hausa' },
                { code: 'ig', label: 'Igbo' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as LanguageCode)}
                  className={`rounded-xl p-2.5 text-xs font-bold border transition-colors ${
                    currentLang === lang.code
                      ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Application Version & Update Check */}
          <div className="pt-3 border-t border-slate-100 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-black text-slate-700">LITTLE GENIUS WORLD</span>
            <span className="text-[11px] font-bold text-slate-500">
              Version {APP_VERSION} (Build {BUILD_ID})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
