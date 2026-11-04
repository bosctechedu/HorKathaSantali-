// Shared bits of the floating "Hor Katha AI सहायक" widget (ported from EDISAM's floating AI assistant).
// Kept tiny on purpose: the bubble imports only this, the chat panel is lazy-loaded.

/** Window event that opens the floating assistant from anywhere (sidebar, Ctrl+K search, …). */
export const OPEN_AI_EVENT = 'horkatha-open-ai';

/** Open the assistant; optionally send a question right away. */
export function openHorKathaAI(prompt?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_AI_EVENT, { detail: { prompt } }));
}

/** EDISAM's "AI Assistant Face" image, copied into /public so it does not depend on Unsplash. */
export const AI_DEFAULT_AVATAR = '/horkatha-ai-face.jpg';
/** User-uploaded avatar ("बदलें" on the panel header), same behaviour as EDISAM. */
export const AI_AVATAR_KEY = 'horkatha_ai_custom_avatar';

/** Rotating speech bubble texts above the face (EDISAM order; EDISAM → Hor Katha). */
export const AI_ROTATING_TEXTS = [
  'Ask me anything!',
  'मुझसे कुछ भी पूछें!',
  'Hor Katha AI सहायक!',
  'कुली एञ् मे! (Ask me)',
  'संताली संस्कृति व इतिहास!',
  'परीक्षा & जॉब की सलाह!',
  'जोहार! सहायता चाहिए?',
];

export const AI_NAME = 'Hor Katha AI सहायक';
