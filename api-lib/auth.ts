// Shared server helpers for Cloudflare Pages Functions (bundled into functions/*).
// Bindings needed in Cloudflare Pages → Settings → Bindings / Variables and Secrets:
//   HK_DB          KV namespace binding (accounts, sessions, OTP, slider)
//   BREVO_API_KEY  Secret (email OTP; sender bosctechedu@gmail.com must be verified in Brevo)

export interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string | ArrayBuffer, opts?: { expirationTtl?: number; metadata?: unknown }): Promise<void>;
  delete(key: string): Promise<void>;
  list(opts?: { prefix?: string; cursor?: string }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
  getWithMetadata?(key: string, type: 'arrayBuffer'): Promise<{ value: ArrayBuffer | null; metadata: any }>;
}
export interface Env {
  HK_DB?: KV;
  BREVO_API_KEY?: string;
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
}
export type Ctx = { request: Request; env: Env; params?: Record<string, string | string[]> };

export const ADMIN_USERNAME = 'BOSC@TECH&EDU';
export const ADMIN_EMAIL = 'bosctechedu@gmail.com';
export const MIN_PASS = 8;
const SESSION_TTL = 60 * 60 * 12; // 12 hours
const OTP_TTL = 60 * 10; // 10 minutes
const OTP_GAP = 60; // 1 minute between sends
const OTP_MAX_TRIES = 5;
const LOGIN_MAX_FAILS = 8; // per username+IP per 15 min

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const sameOrigin = (request: Request) => {
  const origin = request.headers.get('origin');
  return !origin || new URL(origin).host === new URL(request.url).host;
};

export const ip = (request: Request) => request.headers.get('cf-connecting-ip') || 'unknown';

const enc = new TextEncoder();
const toHex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const fromHex = (hex: string) => new Uint8Array(hex.match(/.{2}/g)!.map((h) => parseInt(h, 16)));
export const randomHex = (bytes = 32) => toHex(crypto.getRandomValues(new Uint8Array(bytes)).buffer);

export async function hashPassword(password: string, saltHex = randomHex(16)) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: fromHex(saltHex), iterations: 100000 }, key, 256);
  return { salt: saltHex, hash: toHex(bits) };
}

export async function verifyPassword(password: string, salt: string, hash: string) {
  const h = await hashPassword(password, salt);
  if (h.hash.length !== hash.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= h.hash.charCodeAt(i) ^ hash.charCodeAt(i);
  return diff === 0;
}

const sha256 = async (s: string) => toHex(await crypto.subtle.digest('SHA-256', enc.encode(s)));

export const normUser = (u: unknown) => String(u ?? '').trim().slice(0, 40);
export const isAdminName = (u: string) => u.toUpperCase() === ADMIN_USERNAME;
/** Admin may sign in with the username or the admin email (both case-insensitive). */
export const isAdminLogin = (u: string) => isAdminName(u) || u.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();

export type Account = { salt: string; hash: string; ver: number; createdAt: string; name?: string; active?: boolean };
export type Session = { role: 'admin' | 'operator'; username: string; ver: number };

export async function getAdmin(db: KV): Promise<Account | null> {
  const s = await db.get('acct:admin');
  return s ? JSON.parse(s) : null;
}
export async function getOperator(db: KV, username: string): Promise<Account | null> {
  const s = await db.get(`acct:op:${username.toLowerCase()}`);
  return s ? JSON.parse(s) : null;
}

export async function createSession(db: KV, sess: Session) {
  const token = randomHex(32);
  await db.put(`sess:${await sha256(token)}`, JSON.stringify(sess), { expirationTtl: SESSION_TTL });
  return token;
}

export async function readSession(db: KV, request: Request): Promise<Session | null> {
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!/^[0-9a-f]{64}$/.test(token)) return null;
  const s = await db.get(`sess:${await sha256(token)}`);
  if (!s) return null;
  const sess: Session = JSON.parse(s);
  // Password change / operator removal invalidates old sessions
  const acct = sess.role === 'admin' ? await getAdmin(db) : await getOperator(db, sess.username);
  if (!acct || acct.ver !== sess.ver || acct.active === false) return null;
  return sess;
}

export async function deleteSession(db: KV, request: Request) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (/^[0-9a-f]{64}$/.test(token)) await db.delete(`sess:${await sha256(token)}`);
}

async function bump(db: KV, key: string, ttl: number) {
  const n = parseInt((await db.get(key)) || '0', 10) + 1;
  await db.put(key, String(n), { expirationTtl: ttl });
  return n;
}
export const loginFailCount = async (db: KV, key: string) => parseInt((await db.get(`fail:${key}`)) || '0', 10);
export const loginFail = (db: KV, key: string) => bump(db, `fail:${key}`, 900);
export const loginClear = (db: KV, key: string) => db.delete(`fail:${key}`);
export const LOGIN_LIMIT = LOGIN_MAX_FAILS;

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export async function sendAdminOtp(env: Env, purpose: 'setup' | 'reset', reqIp: string): Promise<{ ok: boolean; error?: string; status?: number }> {
  const db = env.HK_DB!;
  if (!env.BREVO_API_KEY) return { ok: false, error: 'Email सेवा (BREVO_API_KEY) सेट नहीं है।', status: 503 };
  if (await db.get('otp:gap')) return { ok: false, error: 'कृपया 60 सेकंड बाद दोबारा भेजें।', status: 429 };
  if ((await bump(db, `otpcnt:${reqIp}`, 3600)) > 6) return { ok: false, error: 'बहुत ज़्यादा अनुरोध। 1 घंटे बाद कोशिश करें।', status: 429 };

  const otp = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0');
  await db.put('otp:admin', JSON.stringify({ h: await sha256(otp), purpose, tries: 0 }), { expirationTtl: OTP_TTL });
  await db.put('otp:gap', '1', { expirationTtl: OTP_GAP });

  const what = purpose === 'setup' ? 'Admin खाता पहली बार बनाने' : 'Admin पासवर्ड रीसेट करने';
  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { accept: 'application/json', 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'BOSC Tech & Edu', email: ADMIN_EMAIL },
      to: [{ email: ADMIN_EMAIL, name: 'BOSC Admin' }],
      subject: `HorKathaSantali Admin OTP: ${otp}`,
      htmlContent: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:20px;border:1px solid #e2e8f0;border-radius:10px">
        <h2 style="color:#b45309;margin:0 0 8px">HorKathaSantali Admin</h2>
        <p>${escapeHtml(what)} के लिए आपका OTP:</p>
        <h1 style="letter-spacing:8px;color:#b45309">${otp}</h1>
        <p style="color:#ef4444;font-size:12px">यह OTP 10 मिनट के लिए वैध है। किसी के साथ साझा न करें। अगर आपने यह अनुरोध नहीं किया, तो इस ईमेल को अनदेखा करें।</p>
        <p style="color:#94a3b8;font-size:12px">Request IP: ${escapeHtml(reqIp)}</p></div>`,
    }),
  });
  if (!r.ok) {
    await db.delete('otp:gap');
    return { ok: false, error: 'OTP ईमेल नहीं भेज पाए। थोड़ी देर बाद कोशिश करें।', status: 502 };
  }
  return { ok: true };
}

export async function checkAdminOtp(db: KV, otp: string, purpose: 'setup' | 'reset'): Promise<string | null> {
  const s = await db.get('otp:admin');
  if (!s) return 'OTP समाप्त हो गया या भेजा नहीं गया। नया OTP मँगाएँ।';
  const rec = JSON.parse(s);
  if (rec.purpose !== purpose) return 'यह OTP इस काम के लिए नहीं है। नया OTP मँगाएँ।';
  if (rec.tries >= OTP_MAX_TRIES) { await db.delete('otp:admin'); return 'बहुत बार गलत OTP। नया OTP मँगाएँ।'; }
  if (!/^\d{6}$/.test(otp) || (await sha256(otp)) !== rec.h) {
    rec.tries++;
    await db.put('otp:admin', JSON.stringify(rec), { expirationTtl: OTP_TTL });
    return 'OTP गलत है।';
  }
  await db.delete('otp:admin');
  return null;
}
