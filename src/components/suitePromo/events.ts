// Tiny, eagerly-imported bridge for the Hor Katha Suite showcase popup.
// The controller + modal live in their own lazy chunks; this file only carries the "open" event.

export const OPEN_SUITE_PROMO_EVENT = 'horkatha-open-suite-promo';

let pending = false;
let listening = false;
export function setSuitePromoListening(v: boolean) { listening = v; }
export function takePendingSuitePromo() { const p = pending; pending = false; return p; }

/** Open the full "Hor Katha Suite" showcase popup from anywhere (Dashboard card, ?promo=1, …). */
export function openSuitePromo() {
  if (!listening) pending = true;
  window.dispatchEvent(new CustomEvent(OPEN_SUITE_PROMO_EVENT));
}

/** URL param for quick testing: ?promo=1 (full popup now) · ?promo=card (small card now). */
export function promoUrlParam(): string | null {
  try { return new URLSearchParams(window.location.search).get('promo'); } catch { return null; }
}
