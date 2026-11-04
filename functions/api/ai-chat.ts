// Cloudflare Pages Function: POST /api/ai-chat
// Secret needed in Cloudflare Pages → Settings → Variables and Secrets:
//   GEMINI_API_KEY  (type: Secret)   — free key from https://aistudio.google.com/apikey
// Optional: GEMINI_MODEL (default "gemini-flash-latest")

interface Env { GEMINI_API_KEY?: string; GEMINI_MODEL?: string }
type Ctx = { request: Request; env: Env };

const SYSTEM = `You are the "Hor Katha AI Search Assistant" by BOSC Tech & Edu, an expert on the Santali language and Santal culture.
Answer in the language the user writes in (Hindi, English or Santali).
For any Santali word give: Santali in Devanagari, Roman Santali (with standard accents), Hindi meaning and English meaning.
Topics: Santali vocabulary and grammar, Santali–Hindi–English translation, Santal history (Hul 1855, Sidhu-Kanhu), festivals (Sohrai, Baha, Karam), folklore, arts, and general knowledge using Google Search when useful.
If you are not sure about a Santali word, say so honestly instead of inventing it.
Begin greetings with "Johar!". Keep answers clear and short, with headings or bullet points where helpful.`;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const onRequestGet = async ({ env }: Ctx) =>
  json({ status: 'ok', aiAvailable: !!env.GEMINI_API_KEY });

export const onRequestPost = async ({ request, env }: Ctx) => {
  // Same-origin only (blocks other sites from using this endpoint from a browser)
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: 'Forbidden' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 2000) : '';
  if (!message) return json({ error: 'Message is required' }, 400);
  const webSearch = body?.webSearch !== false;

  if (!env.GEMINI_API_KEY) {
    return json({
      success: true, isFallback: true, sources: [],
      reply: 'Johar! AI सहायक अभी चालू नहीं है (GEMINI_API_KEY सेट नहीं है)। तब तक आप 10,000+ शब्दकोश, कीबोर्ड और अनुवादक का उपयोग कर सकते हैं।',
    });
  }

  const contents: any[] = [];
  if (Array.isArray(body?.history)) {
    for (const h of body.history.slice(-6)) {
      const t = String(h?.content ?? h?.text ?? '').slice(0, 2000);
      if (t) contents.push({ role: h?.role === 'user' ? 'user' : 'model', parts: [{ text: t }] });
    }
  }
  contents.push({ role: 'user', parts: [{ text: message }] });

  const payload: any = {
    systemInstruction: { parts: [{ text: SYSTEM }] },
    contents,
    generationConfig: { temperature: 0.5, maxOutputTokens: 1500 },
  };
  if (webSearch) payload.tools = [{ google_search: {} }];

  const model = env.GEMINI_MODEL || 'gemini-flash-latest';
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify(payload),
    });
    const data: any = await r.json().catch(() => ({}));
    if (!r.ok) {
      const code = r.status === 429 ? 'आज की मुफ़्त सीमा पूरी हो गई, थोड़ी देर बाद कोशिश करें।' : 'AI सेवा से उत्तर नहीं मिला।';
      return json({ error: code, details: data?.error?.message || `HTTP ${r.status}` }, r.status === 429 ? 429 : 502);
    }
    const cand = data?.candidates?.[0];
    const reply = (cand?.content?.parts || []).map((p: any) => p?.text || '').join('').trim()
      || 'Johar! उत्तर नहीं बन पाया, कृपया प्रश्न दोबारा लिखें।';
    const sources = (cand?.groundingMetadata?.groundingChunks || [])
      .map((c: any) => (c?.web?.uri ? { title: c.web.title || c.web.uri, uri: c.web.uri } : null))
      .filter(Boolean)
      .slice(0, 6);
    return json({ success: true, reply, sources });
  } catch (e: any) {
    return json({ error: 'AI सेवा से जुड़ नहीं पाए।', details: e?.message || 'network' }, 502);
  }
};
