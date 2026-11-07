/**
 * Helpers & types for the Santali Social Card Studio "पूरा Customization" panel:
 * sizes, persisted settings, colour utilities and small canvas drawing helpers.
 */

export type CardAspectId = 'square' | 'story' | 'landscape' | 'a4' | 'fb_cover';
export type CardCorner = 'tl' | 'tr' | 'bl' | 'br';
export type CardAlign = 'left' | 'center' | 'right';
export type PhotoShape = 'circle' | 'rounded' | 'square';
export type QrMode = 'off' | 'link' | 'upi';

export const CARD_SIZES: {
  id: CardAspectId;
  label: string;
  sub: string;
  w: number;
  h: number;
  /** base typography scale for this format (fit loop shrinks further when needed) */
  scale: number;
}[] = [
  { id: 'square', label: '1:1 वर्गाकार', sub: 'WhatsApp Post', w: 1080, h: 1080, scale: 1 },
  { id: 'story', label: '9:16 लंबवत', sub: 'WhatsApp Status', w: 1080, h: 1920, scale: 1 },
  { id: 'landscape', label: '16:9 क्षैतिज', sub: 'Banner / FB', w: 1200, h: 675, scale: 0.85 },
  { id: 'a4', label: 'A4 प्रिंट', sub: '1240×1754', w: 1240, h: 1754, scale: 1.15 },
  { id: 'fb_cover', label: 'FB कवर', sub: '1640×624', w: 1640, h: 624, scale: 0.8 }
];

export const DEFAULT_TOP_LINE = 'HOR KATHA · आदिम संताली दर्शन';
export const DEFAULT_BOTTOM_LINE = 'होड़ काथा · www.horkatha.org · हमारी भाषा, हमारा स्वाभिमान';

export interface CardCustomization {
  // Background
  bgOverlay: number; // 0–90 (%), how much theme colour covers an uploaded image
  gradOn: boolean;
  grad1: string;
  grad2: string;
  // Colours ('' = use theme)
  colorText: string;
  colorAccent: string;
  colorSecondary: string;
  // Text
  sizeMain: number; // %
  sizeRoman: number;
  sizeHindi: number;
  sizeAuthor: number;
  align: CardAlign;
  vPos: number; // -50 (top) … 0 (centre) … 50 (bottom)
  topLineOn: boolean;
  topLine: string;
  bottomLine: string;
  nameOn: boolean;
  nameLine: string;
  // Photo
  photoShape: PhotoShape;
  photoSize: number; // % of shorter side
  photoX: number; // % of width (centre)
  photoY: number; // % of height (centre)
  photoCorner: CardCorner | 'custom';
  photoRing: boolean;
  // Logo
  logoCorner: CardCorner;
  logoSize: number; // % of shorter side
  // QR
  qrMode: QrMode;
  qrText: string;
  upiId: string;
  upiName: string;
  upiAmount: string;
  qrCaption: string;
  qrCorner: CardCorner;
  qrSize: number; // % of shorter side
}

export const DEFAULT_CUSTOMIZATION: CardCustomization = {
  bgOverlay: 45,
  gradOn: false,
  grad1: '#5C1D11',
  grad2: '#1C1917',
  colorText: '',
  colorAccent: '',
  colorSecondary: '',
  sizeMain: 100,
  sizeRoman: 100,
  sizeHindi: 100,
  sizeAuthor: 100,
  align: 'center',
  vPos: 0,
  topLineOn: true,
  topLine: DEFAULT_TOP_LINE,
  bottomLine: DEFAULT_BOTTOM_LINE,
  nameOn: false,
  nameLine: '',
  photoShape: 'circle',
  photoSize: 24,
  photoX: 82,
  photoY: 18,
  photoCorner: 'tr',
  photoRing: true,
  logoCorner: 'tl',
  logoSize: 13,
  qrMode: 'off',
  qrText: 'https://horkatha.org',
  upiId: '',
  upiName: '',
  upiAmount: '',
  qrCaption: '',
  qrCorner: 'br',
  qrSize: 20
};

export const SETTINGS_STORAGE_KEY = 'hor_katha_social_card_settings_v1';
export const IMAGES_STORAGE_KEY = 'hor_katha_social_card_images_v1';
/** Uploaded images larger than this (data-URL chars) stay only in memory for the session. */
export const MAX_PERSIST_IMAGE_CHARS = 1_400_000;

/** Merge stored (possibly partial / stale) customization over defaults, keeping only known keys with the right type. */
export function sanitizeCustomization(raw: unknown): CardCustomization {
  const out: CardCustomization = { ...DEFAULT_CUSTOMIZATION };
  if (!raw || typeof raw !== 'object') return out;
  const src = raw as Record<string, unknown>;
  (Object.keys(DEFAULT_CUSTOMIZATION) as (keyof CardCustomization)[]).forEach((key) => {
    const v = src[key];
    if (v !== undefined && typeof v === typeof DEFAULT_CUSTOMIZATION[key]) {
      (out as unknown as Record<string, unknown>)[key] = v;
    }
  });
  return out;
}

// ---------- colour utilities ----------
export function hexToRgb(hex: string): [number, number, number] {
  let h = String(hex || '').replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  if (isNaN(n)) return [0, 0, 0];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function hexA(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** Relative luminance 0..1 */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// ---------- canvas helpers ----------
export function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

export function shapePath(ctx: CanvasRenderingContext2D, shape: PhotoShape, x: number, y: number, s: number) {
  if (shape === 'circle') {
    ctx.beginPath();
    ctx.arc(x + s / 2, y + s / 2, s / 2, 0, Math.PI * 2);
    ctx.closePath();
  } else if (shape === 'rounded') {
    roundRectPath(ctx, x, y, s, s, s * 0.18);
  } else {
    ctx.beginPath();
    ctx.rect(x, y, s, s);
    ctx.closePath();
  }
}

/** Draw an image so it covers the box (crop overflow, keep aspect). */
export function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;
  const s = Math.max(w / iw, h / ih);
  const dw = iw * s;
  const dh = ih * s;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

/** Draw an image so it fits inside the box (no crop). Returns drawn rect. */
export function drawContain(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return { x, y, w: 0, h: 0 };
  const s = Math.min(w / iw, h / ih);
  const dw = iw * s;
  const dh = ih * s;
  const dx = x + (w - dw) / 2;
  const dy = y + (h - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
  return { x: dx, y: dy, w: dw, h: dh };
}

/** Top-left of a box placed in a corner with the given inset. */
export function cornerXY(corner: CardCorner, W: number, H: number, bw: number, bh: number, inset: number) {
  return {
    x: corner === 'tl' || corner === 'bl' ? inset : W - inset - bw,
    y: corner === 'tl' || corner === 'tr' ? inset : H - inset - bh
  };
}

/** Read an uploaded image file, downscale it so its longest side ≤ maxSide, return a data URL. */
export function fileToDataUrl(file: File, maxSide: number, mime: 'image/jpeg' | 'image/png', quality = 0.88): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('read failed'));
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('decode failed'));
      img.onload = () => {
        const sc = Math.min(1, maxSide / Math.max(img.width || 1, img.height || 1));
        const c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(img.width * sc));
        c.height = Math.max(1, Math.round(img.height * sc));
        const cx = c.getContext('2d');
        if (!cx) return resolve(fr.result as string);
        if (mime === 'image/jpeg') {
          cx.fillStyle = '#ffffff';
          cx.fillRect(0, 0, c.width, c.height);
        }
        cx.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL(mime, quality));
      };
      img.src = fr.result as string;
    };
    fr.readAsDataURL(file);
  });
}

export function loadImage(url: string | undefined | null): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}
