'use client';

import { SOUND_CONFIG } from '../constants/app.constants';

/**
 * Plays a soft synthesized click sound using the Web Audio API.
 * Call this hook to get the `playClick` function.
 */
export function useClickSound() {
  const playClick = () => {
    if (typeof window === 'undefined') return;
    const soundEnabled = localStorage.getItem('sound_enabled') !== 'false';
    if (!soundEnabled) return;

    try {
      const ctx = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = SOUND_CONFIG.OSC_TYPE;
      osc.frequency.setValueAtTime(SOUND_CONFIG.FREQUENCY_START, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(SOUND_CONFIG.FREQUENCY_END, ctx.currentTime + SOUND_CONFIG.DURATION);

      gain.gain.setValueAtTime(SOUND_CONFIG.GAIN_START, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(SOUND_CONFIG.GAIN_END, ctx.currentTime + SOUND_CONFIG.DURATION);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + SOUND_CONFIG.DURATION);
    } catch {
      // Fail silently if AudioContext is blocked by browser policy
    }
  };

  return { playClick };
}
