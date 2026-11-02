/**
 * Little Genius World - Web Audio Synthesizer & Speech Engine
 * Zero external audio dependencies - works 100% offline!
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private musicGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private isMusicPlaying = false;
  private musicTimer: number | null = null;
  private sfxVolume = 0.8;
  private musicVolume = 0.35;
  private isMuted = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.sfxGainNode = this.ctx.createGain();
        this.sfxGainNode.gain.value = this.isMuted ? 0 : this.sfxVolume;
        this.sfxGainNode.connect(this.ctx.destination);

        this.musicGainNode = this.ctx.createGain();
        this.musicGainNode.gain.value = this.isMuted ? 0 : this.musicVolume;
        this.musicGainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setVolumes(sfx: number, music: number, muted: boolean) {
    this.sfxVolume = sfx;
    this.musicVolume = music;
    this.isMuted = muted;

    if (this.sfxGainNode && this.ctx) {
      this.sfxGainNode.gain.setValueAtTime(muted ? 0 : sfx, this.ctx.currentTime);
    }
    if (this.musicGainNode && this.ctx) {
      this.musicGainNode.gain.setValueAtTime(muted ? 0 : music, this.ctx.currentTime);
    }
  }

  // --- Sound Effects ---

  public playPop(pitchMultiplier = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(350 * pitchMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(750 * pitchMultiplier, now + 0.08);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio fallback silent
    }
  }

  public playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const now = this.ctx.currentTime + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  public playSuccess() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    // Happy fanfare: G4 -> C5 -> E5 -> G5 (held)
    const melody = [
      { f: 392.0, d: 0.12, t: 0 },
      { f: 523.25, d: 0.12, t: 0.12 },
      { f: 659.25, d: 0.14, t: 0.24 },
      { f: 783.99, d: 0.45, t: 0.38 },
      { f: 1046.5, d: 0.55, t: 0.42 }, // Octave sparkle
    ];

    melody.forEach((item) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const now = this.ctx.currentTime + item.t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.d);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now);
      osc.stop(now + item.d + 0.05);
    });
  }

  public playGentleTryAgain() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    // Warm friendly "boing-boing" non-punitive sound
    const tones = [
      { f: 360, t: 0 },
      { f: 320, t: 0.14 },
    ];
    tones.forEach((tone) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const now = this.ctx.currentTime + tone.t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(tone.f, now);
      osc.frequency.exponentialRampToValueAtTime(tone.f - 40, now + 0.18);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(now);
      osc.stop(now + 0.22);
    });
  }

  public playStarDing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.15);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  public playNote(frequency: number, duration = 0.5) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + duration);
  }

  public playDrum(type: 'kick' | 'snare' | 'hihat' | 'cowbell' | 'maraca') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;

    if (type === 'kick') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.2);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'snare') {
      // Noise burst + tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.16);

      // White noise buffer
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      noise.connect(noiseGain);
      noiseGain.connect(this.sfxGainNode);
      noise.start(now);
    } else if (type === 'hihat') {
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 7000;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGainNode);
      noise.start(now);
    } else if (type === 'cowbell') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'maraca') {
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 3500;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGainNode);
      noise.start(now);
    }
  }

  public playAnimalSound(animal: string) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const lower = animal.toLowerCase();

    if (lower.includes('cow') || lower === 'cow') {
      // Moo: Low warm slide down
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.8);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.85);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.9);
    } else if (lower.includes('cat') || lower === 'cat') {
      // Meow: frequency upward bend then down
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.55);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.65);
    } else if (lower.includes('dog') || lower === 'dog') {
      // Woof Woof: two punchy bark drops
      [0, 0.22].forEach((offset) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(130, t + 0.12);
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.15);
      });
    } else if (lower.includes('lion') || lower === 'lion') {
      // Roar: Deep powerful filtered growl
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.6);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.7);
    } else if (lower.includes('bird') || lower.includes('parrot') || lower === 'bird') {
      // Tweet Tweet: cheerful high chirps
      [0, 0.12, 0.26].forEach((offset) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1600, t);
        osc.frequency.exponentialRampToValueAtTime(2600, t + 0.05);
        osc.frequency.exponentialRampToValueAtTime(2000, t + 0.08);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.1);
      });
    } else if (lower.includes('duck') || lower === 'duck') {
      // Quack: resonant bandpass buzzy quack
      [0, 0.18].forEach((offset) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(240, t + 0.12);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.13);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.14);
      });
    } else if (lower.includes('frog') || lower === 'frog') {
      // Ribbit: rapidly modulated buzz
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.28);
    } else {
      // Default cute animal chirp
      this.playChime();
    }
  }

  // --- Background Ambient Nursery Music ---

  public startMusic() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.initContext();

    // Gentle arpeggio lullaby notes (C major / G major soft bells)
    const chordSeq = [
      [261.63, 329.63, 392.00, 523.25], // C - E - G - C
      [293.66, 369.99, 440.00, 587.33], // D - F# - A - D
      [329.63, 392.00, 493.88, 659.25], // E - G - B - E
      [261.63, 349.23, 440.00, 523.25], // F - A - C - F
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const playNextBar = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGainNode) return;

      const chord = chordSeq[chordIdx];
      const freq = chord[noteIdx];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.musicGainNode);

      osc.start(now);
      osc.stop(now + 0.85);

      noteIdx = (noteIdx + 1) % chord.length;
      if (noteIdx === 0) {
        chordIdx = (chordIdx + 1) % chordSeq.length;
      }

      this.musicTimer = window.setTimeout(playNextBar, 600);
    };

    playNextBar();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      window.clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  // --- Multilingual Speech Synthesis ---

  public speak(text: string, lang = 'en') {
    if (this.isMuted) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Match available voices or fall back cleanly
      const langCodes: Record<string, string> = {
        en: 'en-US',
        yo: 'yo-NG',
        ha: 'ha-NG',
        ig: 'ig-NG',
      };

      utterance.lang = langCodes[lang] || 'en-US';
      utterance.rate = 0.88; // Gentle, clear toddler tempo
      utterance.pitch = 1.2; // Friendly, warm, inviting child/teacher tone
      utterance.volume = this.sfxVolume;

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech fallback silent
    }
  }
}

export const audio = new AudioEngine();
