// "अपनी Gemini key जोड़ें" (bring your own key): the visitor's own Gemini API key is kept ONLY in this
// browser's localStorage and requests go straight from the browser to Google. It is never sent to our
// server and never logged. Persona + request format are copied from functions/api/ai-chat.ts so answers match.
// Loaded lazily together with the chat panel (not part of the main chunk).

export const USER_KEY_STORE = 'hk_user_gemini_key';
export const USER_KEY_EVENT = 'hk-user-gemini-key-changed';

// Keep in sync with SYSTEM in functions/api/ai-chat.ts
export const SYSTEM = `You are "Hor Katha AI सहायक" (Hor Katha AI Assistant), the friendly digital assistant of the Hor Katha Santali website by BOSC Tech & Edu, and an expert on the Santali language and Santal culture.
Answer in the language the user writes in (Hindi, English or Santali); when unsure, answer in simple Hindi.
You can help with: Santali culture, festivals (Sohrai, Baha, Karam), history and great personalities (Guru Gomke Pandit Raghunath Murmu, Sidhu-Kanhu, Hul 1855), the Santali Devanagari dictionary, Santali grammar, Santali–Hindi–English translation, and any educational subject or general-knowledge question (use Google Search when useful).
For any Santali word give: Santali in Devanagari, Roman Santali (with standard accents), Hindi meaning and English meaning.
If you are not sure about a Santali word, say so honestly instead of inventing it.
Begin greetings with "Johar!" (जोहार!). Be warm and respectful. Keep answers clear and short, with headings or bullet points where helpful.
When the user asks for structured data such as a JSON array of questions, return only that data, with no extra text.`;

const BASE = 'https://generativelanguage.googleapis.com/v1beta/models/';
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];

export function getUserKey(): string {
  try { return (localStorage.getItem(USER_KEY_STORE) || '').trim(); } catch { return ''; }
}
export function setUserKey(k: string) {
  try {
    if (k) localStorage.setItem(USER_KEY_STORE, k.trim());
    else localStorage.removeItem(USER_KEY_STORE);
  } catch { /* storage blocked */ }
  window.dispatchEvent(new Event(USER_KEY_EVENT));
}

export type HistItem = { role: string; content: string };
export type UserGeminiResult =
  | { ok: true; reply: string; sources: { title: string; uri: string }[] }
  | { ok: false; status: number; message: string };

const errText = (status: number) =>
  status === 429
    ? 'आपकी Gemini key की सीमा (quota) अभी पूरी हो गई है।'
    : status === 403 || status === 401
    ? 'आपकी Gemini key अमान्य है या इसकी अनुमति नहीं है (403)।'
    : status === 400
    ? 'आपकी Gemini key अमान्य लग रही है (400)।'
    : status === 0
    ? 'Google Gemini से कनेक्ट नहीं हो पाए।'
    : `Gemini से उत्तर नहीं मिला (HTTP ${status})।`;

async function post(model: string, key: string, payload: unknown): Promise<{ status: number; data: any }> {
  const r = await fetch(`${BASE}${model}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify(payload),
    referrerPolicy: 'no-referrer',
  });
  const data = await r.json().catch(() => ({}));
  return { status: r.status, data };
}

/** Same request shape as /api/ai-chat, sent directly to Google with the visitor's key. */
export async function askUserGemini(key: string, message: string, history: HistItem[], webSearch: boolean): Promise<UserGeminiResult> {
  const contents: any[] = [];
  for (const h of history.slice(-6)) {
    const t = String(h?.content ?? '').slice(0, 2000);
    if (t) contents.push({ role: h?.role === 'user' ? 'user' : 'model', parts: [{ text: t }] });
  }
  contents.push({ role: 'user', parts: [{ text: message.slice(0, 2000) }] });
  const payload: any = {
    systemInstruction: { parts: [{ text: SYSTEM }] },
    contents,
    generationConfig: { temperature: 0.5, maxOutputTokens: 2048 },
  };
  if (webSearch) payload.tools = [{ google_search: {} }];
  try {
    let res = await post(MODELS[0], key, payload);
    if (res.status === 404) res = await post(MODELS[1], key, payload);
    if (res.status < 200 || res.status >= 300) return { ok: false, status: res.status, message: errText(res.status) };
    const cand = res.data?.candidates?.[0];
    const reply = (cand?.content?.parts || []).map((p: any) => p?.text || '').join('').trim()
      || 'Johar! उत्तर नहीं बन पाया, कृपया प्रश्न दोबारा लिखें।';
    const sources = (cand?.groundingMetadata?.groundingChunks || [])
      .map((c: any) => (c?.web?.uri ? { title: c.web.title || c.web.uri, uri: c.web.uri } : null))
      .filter(Boolean)
      .slice(0, 6);
    return { ok: true, reply, sources };
  } catch {
    return { ok: false, status: 0, message: errText(0) };
  }
}

/** Tiny validation request ("जाँचें और सहेजें"). */
export async function validateUserKey(key: string): Promise<{ ok: boolean; message: string }> {
  const payload = { contents: [{ role: 'user', parts: [{ text: 'Hi' }] }], generationConfig: { maxOutputTokens: 5 } };
  try {
    let res = await post(MODELS[0], key, payload);
    if (res.status === 404) res = await post(MODELS[1], key, payload);
    if (res.status >= 200 && res.status < 300) return { ok: true, message: '✅ key सही है और सहेज ली गई।' };
    return { ok: false, message: errText(res.status) };
  } catch {
    return { ok: false, message: errText(0) };
  }
}

/** "Gemini में खोलें": copy the question (+ a short context line) and open Gemini in a new tab. */
export function openInGemini(question: string) {
  const text = `(संदर्भ: संताली भाषा/संस्कृति सहायक "Hor Katha" से पूछा गया सवाल — उत्तर सवाल की भाषा में दें)\n\n${question.trim()}`;
  // Start the copy while this page still has focus, then open Gemini.
  let done: Promise<boolean>;
  if (navigator.clipboard?.writeText) {
    done = navigator.clipboard.writeText(text).then(() => true, () => legacyCopy(text));
  } else {
    done = Promise.resolve(legacyCopy(text));
  }
  window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
  return done;
}

function legacyCopy(text: string): boolean {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch { return false; }
}
