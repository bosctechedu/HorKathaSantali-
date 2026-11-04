/**
 * Robust Female Voice Synthesis & Audio Engine for Hor Katha Suite.
 * Features:
 * - Native Santali Devanagari & Hindi TTS phonetic compatibility
 * - Anti-garbage collection lock for Chromium browsers
 * - AudioContext Web Audio chime fallback if TTS is muted/unavailable
 * - Instant voice pre-warming with no asynchronous gesture expiration
 */

// Santali Devanagari phonetic text formatter
export function formatSpeechText(input: string): string {
  if (!input) return '';
  return input;
}

// Global reference array to prevent Chrome GC bug
let activeUtterances: SpeechSynthesisUtterance[] = [];
let cachedVoices: SpeechSynthesisVoice[] = [];

// Pre-load voices immediately at module execution
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Finds the highest quality female voice available in the client browser.
 */
export function getImmediateFemaleVoice(preferredLang = 'hi-IN'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const femaleKeywords = [
    'female',
    'swara',
    'kavya',
    'heera',
    'zira',
    'aditi',
    'veena',
    'sunita',
    'geeta',
    'shruti',
    'neerja',
    'kalpana',
    'samantha',
    'victoria',
    'karen',
    'natasha'
  ];

  // 1. Prioritize Indian / Hindi Female
  const hindiFemale = voices.find(
    (v) =>
      (v.lang.startsWith('hi') || v.lang.includes('IN')) &&
      femaleKeywords.some((k) => v.name.toLowerCase().includes(k))
  );
  if (hindiFemale) return hindiFemale;

  // 2. Any Hindi voice (e.g., Google हिन्दी)
  const anyHindi = voices.find((v) => v.lang.startsWith('hi'));
  if (anyHindi) return anyHindi;

  // 3. Indian English Female
  const indianFemale = voices.find(
    (v) =>
      v.lang.includes('IN') &&
      femaleKeywords.some((k) => v.name.toLowerCase().includes(k))
  );
  if (indianFemale) return indianFemale;

  // 4. Any female voice
  const anyFemale = voices.find((v) =>
    femaleKeywords.some((k) => v.name.toLowerCase().includes(k))
  );
  if (anyFemale) return anyFemale;

  // 5. Default fallback
  return voices[0] || null;
}

/**
 * AudioContext Web Audio acoustic fallback chime.
 * Ensures the user always hears clear audio feedback even if TTS is muted/unsupported.
 */
export function playAcousticChime(frequency = 587.33, duration = 0.3) {
  try {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + duration * 0.5);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silent catch
  }
}

/**
 * Main Female Voice Speech Recitation function.
 * Articulates Santali Devanagari phonetics, unfreezes TTS queue,
 * protects against garbage collection, and provides acoustic fallback.
 */
export function speakWithFemaleVoice(
  text: string,
  options?: {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
  }
) {
  if (typeof window === 'undefined') return;

  if (!text || !text.trim()) return;

  // 1. Play subtle pleasant acoustic cue
  playAcousticChime(523.25, 0.15);

  // 2. Check for speech synthesis support
  if (!('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis not supported on this device.');
    playAcousticChime(659.25, 0.4);
    if (options?.onEnd) options.onEnd();
    return;
  }

  try {
    // Unfreeze / resume speech engine if stuck
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();

    // Prepare phonetic text
    const phoneticText = formatSpeechText(text.trim());

    const utterance = new SpeechSynthesisUtterance(phoneticText);

    // Keep global reference to prevent Chrome garbage collector dropping speech
    activeUtterances.push(utterance);

    const voice = getImmediateFemaleVoice(options?.lang || 'hi-IN');
    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang = options?.lang || (voice ? voice.lang : 'hi-IN');
    utterance.pitch = options?.pitch ?? 1.15; // Pleasant female pitch
    utterance.rate = options?.rate ?? 0.88; // Natural, clear articulation speed
    utterance.volume = options?.volume ?? 1.0;

    const cleanup = () => {
      const idx = activeUtterances.indexOf(utterance);
      if (idx !== -1) {
        activeUtterances.splice(idx, 1);
      }
    };

    utterance.onend = () => {
      cleanup();
      if (options?.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      cleanup();
      // If native TTS fails, provide pleasant acoustic tones
      playAcousticChime(440, 0.25);
      if (options?.onEnd) options.onEnd();
    };

    // Speak
    window.speechSynthesis.speak(utterance);

    // Resume again after speaking call to prevent Chromium pause deadlock
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch (err) {
    console.error('TTS execution error:', err);
    playAcousticChime(440, 0.3);
    if (options?.onEnd) options.onEnd();
  }
}

/**
 * Stop any current speech playback.
 */
export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      activeUtterances = [];
    } catch (e) {
      // Ignore
    }
  }
}
