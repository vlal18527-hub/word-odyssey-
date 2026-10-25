/**
 * Procedural Web Audio Engine for Word Odyssey.
 * 100% self-contained, lightweight, zero external MP3 dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private sfxVol = 0.8;
  private musicVol = 0.6;
  private masterVol = 1.0;
  private isMuted = false;

  constructor() {
    // Lazy init on first user interaction to comply with browser autoplay policies
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();
        this.musicGain = this.ctx.createGain();

        this.sfxGain.connect(this.masterGain);
        this.musicGain.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.updateVolumes();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setVolumes(master: number, sfx: number, music: number, muted: boolean) {
    this.masterVol = Math.max(0, Math.min(1, master));
    this.sfxVol = Math.max(0, Math.min(1, sfx));
    this.musicVol = Math.max(0, Math.min(1, music));
    this.isMuted = muted;
    this.updateVolumes();
  }

  private updateVolumes() {
    if (!this.ctx || !this.masterGain || !this.sfxGain || !this.musicGain) return;
    const now = this.ctx.currentTime;
    const effectiveMaster = this.isMuted ? 0 : this.masterVol;
    this.masterGain.gain.setValueAtTime(effectiveMaster, now);
    this.sfxGain.gain.setValueAtTime(this.sfxVol, now);
    this.musicGain.gain.setValueAtTime(this.musicVol, now);
  }

  // Tactical click
  public playClick() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio fallback silent
    }
  }

  // Ascending letter drag selection tone (index 0..15)
  public playTileSelect(stepIndex: number = 0) {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      // Pentatonic scale frequencies [C4, D4, E4, G4, A4, C5, D5, E5, G5, A5, C6]
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];
      const freq = scale[Math.min(stepIndex, scale.length - 1)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Audio fallback
    }
  }

  // Word Found: Bright harmonic chime (Major chord)
  public playWordFound() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      chord.forEach((freq, i) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + i * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(startTime);
        osc.stop(startTime + 0.38);
      });
    } catch {
      // Audio fallback
    }
  }

  // Bonus Word: Magical sparkle
  public playBonusWord() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const notes = [659.25, 830.61, 987.77, 1318.51, 1661.22];
      const now = this.ctx.currentTime;

      notes.forEach((freq, i) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + i * 0.04;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(startTime);
        osc.stop(startTime + 0.28);
      });
    } catch {
      // Audio fallback
    }
  }

  // Invalid path selection: gentle soft blip
  public playInvalid() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.setValueAtTime(110, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      // Low pass filter to make it pleasant
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio fallback
    }
  }

  // Hint activation: Ethereal ping
  public playHint() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const notes = [880, 1174.66, 1760];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // Audio fallback
    }
  }

  // Victory Fanfare: Jubilant arpeggio + final chord
  public playVictory() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const arpeggio = [
        { f: 392.00, t: 0.0 },  // G4
        { f: 523.25, t: 0.12 }, // C5
        { f: 659.25, t: 0.24 }, // E5
        { f: 783.99, t: 0.36 }, // G5
        { f: 1046.50, t: 0.50 } // C6
      ];

      const now = this.ctx.currentTime;

      arpeggio.forEach(({ f, t }) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const st = now + t;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, st);

        gain.gain.setValueAtTime(0.2, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.4);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(st);
        osc.stop(st + 0.45);
      });

      // Big lingering chord at the end
      const finalChord = [523.25, 659.25, 783.99, 1046.50];
      finalChord.forEach(f => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const st = now + 0.55;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, st);

        gain.gain.setValueAtTime(0.15, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 1.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(st);
        osc.stop(st + 1.25);
      });
    } catch {
      // Audio fallback
    }
  }

  // Ambient zen drone generator
  public startAmbientZen() {
    try {
      this.initCtx();
      if (!this.ctx || !this.musicGain || this.isAmbientPlaying) return;

      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.05, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc2 = this.ctx.createOscillator();

      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(110, now); // A2
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(164.81, now); // E3

      this.ambientOsc1.connect(filter);
      this.ambientOsc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.musicGain);

      this.ambientOsc1.start(now);
      this.ambientOsc2.start(now);
      this.isAmbientPlaying = true;
    } catch {
      // Ambient fallback
    }
  }

  public stopAmbientZen() {
    try {
      if (!this.isAmbientPlaying) return;
      if (this.ambientOsc1) {
        this.ambientOsc1.stop();
        this.ambientOsc1.disconnect();
        this.ambientOsc1 = null;
      }
      if (this.ambientOsc2) {
        this.ambientOsc2.stop();
        this.ambientOsc2.disconnect();
        this.ambientOsc2 = null;
      }
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
      this.isAmbientPlaying = false;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  // Timer warning tick (urgent when <= 10s)
  public playTimerTick(isUrgent = false) {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = isUrgent ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(isUrgent ? 880 : 440, now);
      osc.frequency.exponentialRampToValueAtTime(isUrgent ? 440 : 220, now + 0.05);

      gain.gain.setValueAtTime(isUrgent ? 0.16 : 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Audio fallback
    }
  }

  // Freeze Time Power-Up (ice shimmer)
  public playFreezeTime() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const notes = [1200, 1500, 1800, 2400];
      const now = this.ctx.currentTime;

      notes.forEach((freq, i) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const st = now + i * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, st);
        gain.gain.setValueAtTime(0.15, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(st);
        osc.stop(st + 0.4);
      });
    } catch {
      // fallback
    }
  }

  // Shuffle Power-Up (quick wind flutter)
  public playShuffle() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      for (let i = 0; i < 6; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const st = now + i * 0.03;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300 + Math.random() * 400, st);

        gain.gain.setValueAtTime(0.08, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.05);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(st);
        osc.stop(st + 0.06);
      }
    } catch {
      // fallback
    }
  }

  // Double Coins Power-Up (coin fountain chime)
  public playDoubleCoins() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const chord = [587.33, 739.99, 880, 1174.66];
      const now = this.ctx.currentTime;

      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const st = now + idx * 0.05;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, st);
        gain.gain.setValueAtTime(0.18, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.3);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(st);
        osc.stop(st + 0.35);
      });
    } catch {
      // fallback
    }
  }

  // Streak Shield Power-Up (celestial ward)
  public playShield() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.25);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // fallback
    }
  }

  // Boss Battle Roar
  public playBossRoar() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.7);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.8);
    } catch {
      // fallback
    }
  }

  // Boss Defeated Fanfare
  public playBossDefeat() {
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;

      const notes = [261.63, 329.63, 392, 523.25, 659.25, 783.99, 1046.5];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const st = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, st);
        gain.gain.setValueAtTime(0.2, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.5);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(st);
        osc.stop(st + 0.55);
      });
    } catch {
      // fallback
    }
  }
}

export const audio = new SoundEngine();
