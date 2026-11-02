import React, { useState } from 'react';
import { Play, Pause, Music, Sparkles } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { WorldHeader } from './WorldHeader';
import { audio } from '../../utils/audio';

const XYLOPHONE_NOTES = [
  { note: 'C', solfege: 'Do', freq: 261.63, color: 'bg-red-500 hover:bg-red-400', height: 'h-64' },
  { note: 'D', solfege: 'Re', freq: 293.66, color: 'bg-orange-500 hover:bg-orange-400', height: 'h-60' },
  { note: 'E', solfege: 'Mi', freq: 329.63, color: 'bg-yellow-400 hover:bg-yellow-300', height: 'h-56' },
  { note: 'F', solfege: 'Fa', freq: 349.23, color: 'bg-green-500 hover:bg-green-400', height: 'h-52' },
  { note: 'G', solfege: 'Sol', freq: 392.00, color: 'bg-teal-500 hover:bg-teal-400', height: 'h-48' },
  { note: 'A', solfege: 'La', freq: 440.00, color: 'bg-blue-500 hover:bg-blue-400', height: 'h-44' },
  { note: 'B', solfege: 'Ti', freq: 493.88, color: 'bg-indigo-500 hover:bg-indigo-400', height: 'h-40' },
  { note: 'C5', solfege: 'Do', freq: 523.25, color: 'bg-purple-500 hover:bg-purple-400', height: 'h-36' },
];

const NURSERY_RHYMES = [
  {
    title: 'Twinkle Twinkle Little Star',
    emoji: '⭐',
    notes: [261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00],
    lyrics: "Twinkle, twinkle, little star, How I wonder what you are! Up above the world so high, Like a diamond in the sky!"
  },
  {
    title: 'Alphabet Song (ABC)',
    emoji: '🔤',
    notes: [261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00],
    lyrics: "A-B-C-D-E-F-G, H-I-J-K-L-M-N-O-P, Q-R-S and T-U-V, W-X, Y and Z! Now I know my ABCs, Next time won't you sing with me!"
  },
  {
    title: 'The Wheels on the Bus',
    emoji: '🚌',
    notes: [261.63, 349.23, 349.23, 349.23, 349.23, 392.00, 440.00],
    lyrics: "The wheels on the bus go round and round, round and round, round and round! The wheels on the bus go round and round, all through the town!"
  }
];

export const MusicVillage: React.FC = () => {
  const { addStar, celebrate, t } = useGame();
  const [activeTab, setActiveTab] = useState<'xylophone' | 'drums' | 'jukebox'>('xylophone');
  const [activeNoteIdx, setActiveNoteIdx] = useState<number | null>(null);

  // Song playback state
  const [selectedSong, setSelectedSong] = useState(NURSERY_RHYMES[0]);
  const [isPlayingSong, setIsPlayingSong] = useState(false);

  const handlePlayXyloNote = (item: typeof XYLOPHONE_NOTES[0], idx: number) => {
    audio.playNote(item.freq, 0.6);
    setActiveNoteIdx(idx);
    setTimeout(() => setActiveNoteIdx(null), 300);
  };

  const handlePlayDrum = (type: 'kick' | 'snare' | 'hihat' | 'cowbell' | 'maraca') => {
    audio.playDrum(type);
  };

  const playSongMelody = (song: typeof NURSERY_RHYMES[0]) => {
    if (isPlayingSong) return;
    setIsPlayingSong(true);
    addStar(1);

    song.notes.forEach((freq, i) => {
      setTimeout(() => {
        audio.playNote(freq, 0.4);
        if (i === song.notes.length - 1) {
          setIsPlayingSong(false);
          celebrate({
            title: 'Music Village Maestro!',
            subtitle: `Encore! You sang along to "${selectedSong.title}"!`,
            stars: 2
          });
        }
      }, i * 380);
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 via-sky-50 to-indigo-50 flex flex-col">
      <WorldHeader
        title={t.worlds['music-village'].title}
        instructionText="Play the rainbow xylophone, sing nursery rhymes, and beat the rhythm drums!"
        accentColor="bg-teal-400"
      />

      <div className="flex justify-center gap-2 p-3 bg-white/70 backdrop-blur-xs border-b border-teal-200">
        <button
          onClick={() => { setActiveTab('xylophone'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'xylophone'
              ? 'bg-teal-600 text-white shadow-md scale-105'
              : 'bg-white text-teal-900 hover:bg-teal-50'
          }`}
        >
          🎵 Rainbow Xylophone
        </button>

        <button
          onClick={() => { setActiveTab('drums'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'drums'
              ? 'bg-teal-600 text-white shadow-md scale-105'
              : 'bg-white text-teal-900 hover:bg-teal-50'
          }`}
        >
          🥁 Drum Rhythm Studio
        </button>

        <button
          onClick={() => { setActiveTab('jukebox'); audio.playPop(); }}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
            activeTab === 'jukebox'
              ? 'bg-teal-600 text-white shadow-md scale-105'
              : 'bg-white text-teal-900 hover:bg-teal-50'
          }`}
        >
          📻 Sing-Along Jukebox
        </button>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {/* MODE 1: RAINBOW XYLOPHONE */}
        {activeTab === 'xylophone' && (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-teal-300 flex flex-col items-center animate-pop">
            <h2 className="text-xl font-black text-slate-800 mb-2">
              Rainbow Xylophone
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Tap the colored bars to play musical notes!
            </p>

            {/* Xylophone bars */}
            <div className="flex items-end justify-center gap-2 sm:gap-3 p-4 bg-amber-100/60 rounded-3xl border-3 border-amber-300 w-full min-h-[300px]">
              {XYLOPHONE_NOTES.map((bar, idx) => {
                const isActive = activeNoteIdx === idx;
                return (
                  <button
                    key={bar.note}
                    onClick={() => handlePlayXyloNote(bar, idx)}
                    className={`flex-1 ${bar.height} ${bar.color} rounded-2xl shadow-md flex flex-col items-center justify-between py-4 text-white font-black transition-all transform active:scale-95 ${
                      isActive ? 'scale-105 ring-4 ring-white shadow-xl -translate-y-2' : ''
                    }`}
                  >
                    <span className="text-sm opacity-90">{bar.note}</span>
                    <span className="w-3 h-3 rounded-full bg-white/40 shadow-xs" />
                    <span className="text-xs font-bold">{bar.solfege}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 2: DRUM RHYTHM STUDIO */}
        {activeTab === 'drums' && (
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-teal-300 text-center animate-pop">
            <h2 className="text-xl font-black text-slate-800 mb-2">
              Rhythm Drum Pad
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Tap the pads to create fun rhythmic beats!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { type: 'kick', label: 'Bass Kick', emoji: '🥁', color: 'bg-rose-500' },
                { type: 'snare', label: 'Crisp Snare', emoji: '🪘', color: 'bg-sky-500' },
                { type: 'hihat', label: 'Cymbal Hi-Hat', emoji: '🪙', color: 'bg-amber-500' },
                { type: 'cowbell', label: 'Happy Cowbell', emoji: '🔔', color: 'bg-emerald-500' },
                { type: 'maraca', label: 'Sandy Shaker', emoji: '🌾', color: 'bg-purple-500' },
              ].map((drum) => (
                <button
                  key={drum.type}
                  onClick={() => handlePlayDrum(drum.type as any)}
                  className={`aspect-square rounded-3xl ${drum.color} text-white font-black shadow-lg hover:shadow-xl transition-all transform active:scale-90 flex flex-col items-center justify-center p-3`}
                >
                  <span className="text-4xl sm:text-5xl mb-2">{drum.emoji}</span>
                  <span className="text-xs sm:text-sm">{drum.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MODE 3: SING-ALONG JUKEBOX */}
        {activeTab === 'jukebox' && (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-teal-300 text-center animate-pop">
            <h2 className="text-xl font-black text-slate-800 mb-4">
              Sing-Along Songbook
            </h2>

            {/* Song Picker */}
            <div className="flex gap-2 justify-center mb-6 overflow-x-auto pb-2">
              {NURSERY_RHYMES.map((song) => (
                <button
                  key={song.title}
                  onClick={() => {
                    setSelectedSong(song);
                    audio.playPop(1.1);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                    selectedSong.title === song.title
                      ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                  }`}
                >
                  <span>{song.emoji} {song.title}</span>
                </button>
              ))}
            </div>

            {/* Selected Song Lyrics Frame */}
            <div className="rounded-3xl bg-teal-50 p-6 border-2 border-teal-200 mb-6">
              <div className="text-5xl mb-3 animate-float">{selectedSong.emoji}</div>
              <h3 className="text-lg font-black text-teal-950 mb-3">{selectedSong.title}</h3>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed max-w-md mx-auto">
                {selectedSong.lyrics}
              </p>
            </div>

            <button
              onClick={() => playSongMelody(selectedSong)}
              disabled={isPlayingSong}
              className="inline-flex items-center gap-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-black px-8 py-3.5 text-base shadow-md transition-transform active:scale-95 disabled:opacity-50"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{isPlayingSong ? 'Playing Song...' : 'Play Sing-Along!'}</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
