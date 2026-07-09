let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
    } catch {
      return null;
    }
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function noiseBuffer(c: AudioContext, dur: number): AudioBuffer {
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

export function playBattleHit(): void {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const master = c.createGain();
  master.gain.value = 0.5;
  master.connect(c.destination);

  [55, 82.4, 110, 164.8].forEach((f) => {
    const o = c.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = f;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.11, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.65);
  });

  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.3);
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 3200;
  bp.Q.value = 6;
  const ng = c.createGain();
  ng.gain.setValueAtTime(0.45, t);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  src.connect(bp).connect(ng).connect(master);
  src.start(t);
  src.stop(t + 0.3);

  [1800, 2700, 4200].forEach((f) => {
    const o = c.createOscillator();
    o.type = 'square';
    o.frequency.value = f;
    const g = c.createGain();
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.22);
  });

  const k = c.createOscillator();
  k.type = 'sine';
  k.frequency.setValueAtTime(165, t);
  k.frequency.exponentialRampToValueAtTime(45, t + 0.18);
  const kg = c.createGain();
  kg.gain.setValueAtTime(0.5, t);
  kg.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
  k.connect(kg).connect(master);
  k.start(t);
  k.stop(t + 0.28);
}

export function playLaugh(): void {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime;
  const master = c.createGain();
  master.gain.value = 0.5;
  master.connect(c.destination);

  const offsets = [0, 0.14, 0.28, 0.42, 0.56];
  const bases = [540, 500, 470, 430, 400];
  offsets.forEach((dt, i) => {
    const t = t0 + dt;
    const o = c.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(bases[i], t);
    o.frequency.exponentialRampToValueAtTime(bases[i] * 0.68, t + 0.1);
    const lfo = c.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 28;
    const lg = c.createGain();
    lg.gain.value = 26;
    lfo.connect(lg).connect(o.frequency);
    lfo.start(t);
    lfo.stop(t + 0.12);
    const g = c.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.28, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.13);
  });
}

/* ===== Epic wordless background music (procedural loop) ===== */
let musicTimer: ReturnType<typeof setInterval> | null = null;
let musicGain: GainNode | null = null;
let musicBus: GainNode | null = null;
let nextTime = 0;
let step = 0;

const BEAT = 60 / 92;
const CHORDS: { root: number; notes: number[] }[] = [
  { root: 110.0, notes: [220.0, 261.63, 329.63] }, // Am
  { root: 87.31, notes: [174.61, 220.0, 261.63] }, // F
  { root: 130.81, notes: [261.63, 329.63, 392.0] }, // C
  { root: 98.0, notes: [196.0, 246.94, 293.66] }, // G
];
const LEAD = [659.25, 0, 587.33, 0, 523.25, 0, 587.33, 0, 659.25, 0, 783.99, 659.25, 587.33, 0, 523.25, 0];

function padChord(c: AudioContext, notes: number[], t: number, dur: number, dest: GainNode): void {
  notes.forEach((f) => {
    [0, 1.5].forEach((det, i) => {
      const o = c.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = f + det;
      const lp = c.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 1600;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(i === 0 ? 0.05 : 0.03, t + 0.4);
      g.gain.setValueAtTime(i === 0 ? 0.05 : 0.03, t + dur - 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(lp).connect(g).connect(dest);
      o.start(t);
      o.stop(t + dur);
    });
  });
}

function bass(c: AudioContext, f: number, t: number, dest: GainNode): void {
  const o = c.createOscillator();
  o.type = 'triangle';
  o.frequency.value = f;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.12, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + BEAT * 0.9);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + BEAT);
}

function kick(c: AudioContext, t: number, dest: GainNode): void {
  const o = c.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(140, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.14);
  const g = c.createGain();
  g.gain.setValueAtTime(0.16, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + 0.22);
}

function snare(c: AudioContext, t: number, dest: GainNode): void {
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.2);
  const hp = c.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 1400;
  const g = c.createGain();
  g.gain.setValueAtTime(0.09, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
  src.connect(hp).connect(g).connect(dest);
  src.start(t);
  src.stop(t + 0.2);
}

function lead(c: AudioContext, f: number, t: number, dest: GainNode): void {
  const o = c.createOscillator();
  o.type = 'triangle';
  o.frequency.value = f;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.07, t + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, t + BEAT * 0.9);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + BEAT);
}

function scheduleStep(c: AudioContext, s: number, t: number, dest: GainNode): void {
  const chord = CHORDS[Math.floor(s / 4) % 4];
  if (s % 4 === 0) padChord(c, chord.notes, t, BEAT * 4, dest);
  bass(c, chord.root, t, dest);
  kick(c, t, dest);
  if (s % 4 === 2) snare(c, t, dest);
  const lf = LEAD[s % 16];
  if (lf) lead(c, lf, t, dest);
}

export function startMusic(): void {
  const c = ac();
  if (!c || musicTimer) return;
  musicBus = c.createGain();
  musicBus.gain.value = 0.9;
  musicGain = c.createGain();
  musicGain.gain.setValueAtTime(0.0001, c.currentTime);
  musicGain.gain.exponentialRampToValueAtTime(0.16, c.currentTime + 2);
  musicBus.connect(musicGain).connect(c.destination);
  nextTime = c.currentTime + 0.15;
  step = 0;
  musicTimer = setInterval(() => {
    if (!musicBus) return;
    while (nextTime < c.currentTime + 0.14) {
      scheduleStep(c, step, nextTime, musicBus);
      nextTime += BEAT;
      step = (step + 1) % 16;
    }
  }, 25);
}

export function stopMusic(): void {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  if (musicGain && ctx) {
    const g = musicGain;
    g.gain.cancelScheduledValues(ctx.currentTime);
    g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
  }
  musicGain = null;
  musicBus = null;
}

export function isMusicOn(): boolean {
  return musicTimer !== null;
}
