// Santali keyboard now lives on Hor Katha Suite. Every "Keyboard" click opens it.
export const HOR_KATHA_SUITE_KEYBOARD_URL = 'https://horkathasuite.pages.dev/';

export const openExternalKeyboard = () => {
  const w = window.open(HOR_KATHA_SUITE_KEYBOARD_URL, '_blank', 'noopener,noreferrer');
  if (!w) window.location.href = HOR_KATHA_SUITE_KEYBOARD_URL; // popup blocked → same tab
};
