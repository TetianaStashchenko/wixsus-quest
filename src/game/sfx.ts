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
