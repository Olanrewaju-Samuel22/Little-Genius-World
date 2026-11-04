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
    this.playCelebrationFanfare();
  }

  public playCelebrationFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;

    // 1. Dual Confetti "POP!" sounds
    [0, 0.09].forEach((offset, idx) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const t = now + offset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320 + idx * 80, t);
      osc.frequency.exponentialRampToValueAtTime(800 + idx * 120, t + 0.08);

      gain.gain.setValueAtTime(0.55, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(t);
      osc.stop(t + 0.11);
    });

    // 2. Triumphant Brass/Chime Melody: G4 -> C5 -> E5 -> G5 -> C6
    const melody = [
      { f: 392.00, d: 0.14, t: 0.08 }, // G4
      { f: 523.25, d: 0.14, t: 0.20 }, // C5
      { f: 659.25, d: 0.16, t: 0.32 }, // E5
      { f: 783.99, d: 0.35, t: 0.46 }, // G5
      { f: 1046.50, d: 0.65, t: 0.60 }, // High C6 (sparkling sustain)
    ];

    melody.forEach((item) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const t = now + item.t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, t);

      gain.gain.setValueAtTime(0.45, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(t);
      osc.stop(t + item.d + 0.05);
    });

    // 3. Shimmering Star Sparkles & Chimes
    const sparkles = [1318.51, 1567.98, 2093.00, 2637.02];
    sparkles.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const t = now + 0.65 + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(t);
      osc.stop(t + 0.4);
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

    if (lower.includes('cow')) {
      // Moo: Low warm resonant slide
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(135, now);
      osc.frequency.linearRampToValueAtTime(155, now + 0.22);
      osc.frequency.exponentialRampToValueAtTime(105, now + 0.85);
      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.9);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.92);
    } else if (lower.includes('sheep')) {
      // Baa Baa: Gentle vibrato bleat
      [0, 0.35].forEach((offset) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, t);
        osc.frequency.linearRampToValueAtTime(290, t + 0.1);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.28);
        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.32);
      });
    } else if (lower.includes('goat')) {
      // Maa-aa: Quivering reedy bleat
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(360, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(270, now + 0.5);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.52);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.55);
    } else if (lower.includes('horse') || lower.includes('zebra')) {
      // Whinny: Ascending vibrato slide then drop
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.65);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.72);
    } else if (lower.includes('pig')) {
      // Oink Oink: Two low snort grunts
      [0, 0.22].forEach((offset) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.14);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.16);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    } else if (lower.includes('chicken')) {
      // Cluck Cluck: Staccato resonant chirps
      [0, 0.12, 0.28].forEach((offset, idx) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const base = idx === 2 ? 440 : 380;
        osc.frequency.setValueAtTime(base, t);
        osc.frequency.exponentialRampToValueAtTime(base + 120, t + 0.04);
        osc.frequency.exponentialRampToValueAtTime(base - 60, t + 0.09);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.11);
      });
    } else if (lower.includes('cat')) {
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
    } else if (lower.includes('dog')) {
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
    } else if (lower.includes('lion') || lower.includes('tiger') || lower.includes('bear')) {
      // Roar: Deep powerful growl
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(115, now);
      osc.frequency.linearRampToValueAtTime(135, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.65);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.75);
    } else if (lower.includes('elephant')) {
      // Trumpet / Pawoo: Brassy swell
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.25);
      osc.frequency.linearRampToValueAtTime(620, now + 0.55);
      gain.gain.setValueAtTime(0.38, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.7);
    } else if (lower.includes('monkey')) {
      // Ooh ooh aah aah: playful rhythmic hops
      [0, 0.14, 0.28, 0.44].forEach((offset, idx) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const freq = idx < 2 ? 480 : 720;
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq + 100, t + 0.05);
        osc.frequency.exponentialRampToValueAtTime(freq - 50, t + 0.1);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.11);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.12);
      });
    } else if (lower.includes('owl')) {
      // Hoo Hoo: Two gentle descending mellow tones
      [0, 0.35].forEach((offset, idx) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const startFreq = idx === 0 ? 460 : 420;
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(startFreq - 60, t + 0.22);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.27);
      });
    } else if (lower.includes('duck')) {
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
    } else if (lower.includes('frog')) {
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
    } else if (lower.includes('dolphin') || lower.includes('whale')) {
      // Ocean song: gentle harmonic slide
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(1300, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.5);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (lower.includes('eagle') || lower.includes('peacock')) {
      // High bird call
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.45);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.connect(gain);
      gain.connect(this.sfxGainNode);
      osc.start(now);
      osc.stop(now + 0.52);
    } else if (lower.includes('bird') || lower.includes('parrot') || lower.includes('flamingo') || lower.includes('penguin')) {
      // Tweet Tweet: cheerful high chirps
      [0, 0.12, 0.24].forEach((offset) => {
        if (!this.ctx || !this.sfxGainNode) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1600, t);
        osc.frequency.exponentialRampToValueAtTime(2600, t + 0.05);
        osc.frequency.exponentialRampToValueAtTime(2000, t + 0.08);
        gain.gain.setValueAtTime(0.32, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);
        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(t);
        osc.stop(t + 0.1);
      });
    } else {
      // Playful water splash / chime fallback
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

      const langCodes: Record<string, string> = {
        en: 'en-US',
        yo: 'yo-NG',
        ha: 'ha-NG',
        ig: 'ig-NG',
      };

      utterance.lang = langCodes[lang] || 'en-US';
      utterance.rate = 0.88;
      utterance.pitch = 1.2;
      utterance.volume = this.sfxVolume;

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech fallback silent
    }
  }

  // --- Interactive Phonics Sound Engine ---

  public playPhonicSound(
    letter: string,
    soundText: string,
    word: string,
    mode: 'short' | 'intro' | 'chant' = 'short',
    slow = false
  ) {
    if (this.isMuted) return;

    // 1. Synthesize an immediate acoustic bounce tone for instant tactile response
    this.initContext();
    if (this.ctx && this.sfxGainNode) {
      try {
        const now = this.ctx.currentTime;
        const upper = letter.toUpperCase();
        const isVowel = ['A', 'E', 'I', 'O', 'U'].includes(upper);

        // Vowels get a resonant dual-harmonic bell; consonants get a crisp punchy pop
        const baseFreq = isVowel ? 523.25 : 360 + (letter.charCodeAt(0) % 15) * 25;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = isVowel ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.12);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);

        osc.start(now);
        osc.stop(now + 0.23);
      } catch {
        // audio silent fallback
      }
    }

    // 2. Play speech utterance with optimized phonetics
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      let textToSpeak = '';
      if (mode === 'short') {
        // Focus strictly on the short letter sound (e.g. "/ah/! ... /ah/!")
        textToSpeak = `${soundText}! ${soundText}!`;
      } else if (mode === 'intro') {
        // Letter name + sound + word association
        textToSpeak = `Letter ${letter} says ${soundText}! ${letter} is for ${word}!`;
      } else {
        // Rhythmic chant: "ah, ah, Apple!"
        textToSpeak = `${soundText}... ${soundText}... ${word}!`;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US';
      utterance.rate = slow ? 0.70 : 0.86;
      utterance.pitch = 1.25;
      utterance.volume = this.sfxVolume;

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech fallback silent
    }
  }
}

export const audio = new AudioEngine();
