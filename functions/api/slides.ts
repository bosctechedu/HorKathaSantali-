// GET /api/slides → public slider list · PUT /api/slides → save (Admin / Operator only)
import { Ctx, json, sameOrigin, readSession, randomHex } from '../../api-lib/auth';

const MAX_SLIDES = 20;
const MAX_IMG_BYTES = 1_500_000;
const str = (v: unknown, n: number) => String(v ?? '').slice(0, n);

export const onRequestGet = async ({ env }: Ctx) => {
  if (!env.HK_DB) return json({ ready: false, slides: [] });
  const s = await env.HK_DB.get('slides:index');
  return new Response(JSON.stringify({ ready: true, slides: s ? JSON.parse(s) : [] }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-cache' },
  });
};

export const onRequestPut = async ({ request, env }: Ctx) => {
  if (!sameOrigin(request)) return json({ error: 'Forbidden' }, 403);
  const db = env.HK_DB;
  if (!db) return json({ error: 'Server storage (HK_DB) जुड़ा नहीं है।' }, 503);
  const sess = await readSession(db, request);
  if (!sess) return json({ error: 'केवल Admin / Operator स्लाइड बदल सकते हैं। दोबारा Login करें।' }, 401);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  if (!Array.isArray(body?.slides)) return json({ error: 'slides array चाहिए' }, 400);
  if (body.slides.length > MAX_SLIDES) return json({ error: `अधिकतम ${MAX_SLIDES} स्लाइड।` }, 400);

  const oldIdx: any[] = JSON.parse((await db.get('slides:index')) || '[]');
  const out: any[] = [];
  for (const raw of body.slides) {
    const id = /^[A-Za-z0-9_-]{1,60}$/.test(String(raw?.id)) ? String(raw.id) : 's_' + randomHex(6);
    let imageUrl = String(raw?.imageUrl || '');
    const m = imageUrl.match(/^data:(image\/(?:jpeg|png|webp|gif));base64,([A-Za-z0-9+/=]+)$/);
    if (m) {
      const bin = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));
      if (bin.byteLength > MAX_IMG_BYTES) return json({ error: 'एक फ़ोटो 1.5 MB से छोटी हो।' }, 400);
      const v = randomHex(4);
      await db.put(`slideimg:${id}`, bin.buffer, { metadata: { type: m[1], v } });
      imageUrl = `/api/slide-img/${id}?v=${v}`;
    } else if (!/^(https:\/\/|\/api\/slide-img\/|\/assets\/)/.test(imageUrl)) {
      return json({ error: 'फ़ोटो फ़ाइल या https लिंक चाहिए।' }, 400);
    }
    out.push({
      id, imageUrl,
      heading: str(raw.heading, 200), subheading: str(raw.subheading, 200), category: str(raw.category, 100),
      badge: str(raw.badge, 60), description: str(raw.description, 3000), locationOrDate: str(raw.locationOrDate, 200),
      accentColor: str(raw.accentColor, 80), createdAt: Number(raw.createdAt) || Date.now(),
      updatedBy: sess.username,
    });
  }
  // Remove images of deleted / replaced slides
  const keep = new Set(out.filter((s) => s.imageUrl.startsWith('/api/slide-img/')).map((s) => s.id));
  for (const o of oldIdx) if (!keep.has(o.id)) await db.delete(`slideimg:${o.id}`);

  await db.put('slides:index', JSON.stringify(out));
  return json({ success: true, slides: out });
};
