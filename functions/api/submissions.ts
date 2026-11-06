// पाठकों की रचनाएँ (कविता / कहानी / लेख)
// GET  /api/submissions?kind=rachna|org|event → public: केवल Admin द्वारा मंज़ूर रचनाएँ
// POST /api/submissions {op:'submit'}   → कोई भी visitor (same-origin, IP पर प्रति घंटा 3 की सीमा) — "प्रतीक्षा" में जाती है
// POST {op:'pending'|'approve'|'reject'|'unpublish'} → केवल Admin
import { Ctx, json, sameOrigin, readSession, randomHex, ip } from '../../api-lib/auth';

// kind: 'rachna' (default, रचनाएँ) | 'org' (संगठन सूची) | 'event' (कार्यक्रम)
const KINDS: Record<string, { pend: string; pub: string; types: string[] }> = {
  rachna: { pend: 'sub:pending', pub: 'sub:published', types: ['कविता', 'कहानी', 'लेख', 'गीत'] },
  org: { pend: 'sub:org:pending', pub: 'sub:org:published', types: ['साहित्यिक', 'सामाजिक', 'छात्र', 'सांस्कृतिक', 'अन्य'] },
  event: { pend: 'sub:event:pending', pub: 'sub:event:published', types: ['मेला', 'पर्व', 'सेमिनार', 'खेल', 'अन्य'] },
};
const kindOf = (k: unknown) => (['rachna', 'org', 'event'].includes(String(k)) ? String(k) : 'rachna');
type Sub = { id: string; name: string; place: string; type: string; title: string; text: string; at: string; contact?: string; date?: string; by?: string };

const read = async (db: any, k: string): Promise<Sub[]> => { try { return JSON.parse((await db.get(k)) || '[]'); } catch { return []; } };
const clean = (v: unknown, n: number) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, n);

export const onRequestGet = async ({ env, request }: Ctx) => {
  if (!env.HK_DB) return json({ ready: false, items: [] });
  const K = KINDS[kindOf(new URL(request.url).searchParams.get('kind'))];
  const items = (await read(env.HK_DB, K.pub)).map(({ by, ...r }) => r);
  return new Response(JSON.stringify({ ready: true, items }), { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-cache' } });
};

export const onRequestPost = async ({ request, env }: Ctx) => {
  if (!sameOrigin(request)) return json({ error: 'Forbidden' }, 403);
  const db = env.HK_DB;
  if (!db) return json({ error: 'Server storage (HK_DB) जुड़ा नहीं है।' }, 503);
  let b: any;
  try { b = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  const op = String(b?.op || '');
  const kind = kindOf(b?.kind);
  const K = KINDS[kind];
  const PENDING = K.pend, PUBLISHED = K.pub, TYPES = K.types;

  if (op === 'submit') {
    if (b?.website) return json({ success: true }); // honeypot
    const name = clean(b?.name, 60), place = clean(b?.place, 60), title = clean(b?.title, 120), text = clean(b?.text, 4000);
    const type = TYPES.includes(b?.type) ? b.type : TYPES[TYPES.length - 1];
    const contact = clean(b?.contact, 80);
    const date = /^\d{4}-\d{2}-\d{2}$/.test(String(b?.date || '')) ? String(b.date) : '';
    if (kind === 'event' && !date) return json({ error: 'कार्यक्रम की तारीख़ ज़रूरी है।' }, 400);
    if (name.length < 2 || title.length < 2 || text.length < 20) return json({ error: 'नाम, शीर्षक और कम से कम 20 अक्षर का विवरण ज़रूरी है।' }, 400);
    const rk = 'subrl:' + ip(request); // सभी kinds मिलाकर
    const n = Number((await db.get(rk)) || 0);
    if (n >= 3) return json({ error: 'एक घंटे में 3 से ज़्यादा रचनाएँ नहीं भेज सकते। बाद में कोशिश करें।' }, 429);
    await db.put(rk, String(n + 1), { expirationTtl: 3600 });
    const pend = await read(db, PENDING);
    if (pend.length >= 300) return json({ error: 'अभी बहुत रचनाएँ जाँच में हैं। कुछ दिन बाद भेजें।' }, 503);
    pend.unshift({ id: 's_' + randomHex(6), name, place, type, title, text, at: new Date().toISOString(), ...(contact ? { contact } : {}), ...(date ? { date } : {}) });
    await db.put(PENDING, JSON.stringify(pend));
    return json({ success: true, message: 'धन्यवाद! Admin की मंज़ूरी के बाद यह साइट पर दिखेगा।' });
  }

  const sess = await readSession(db, request);
  if (!sess) return json({ error: 'Login ज़रूरी है।' }, 401);
  if (sess.role !== 'admin') return json({ error: 'रचनाओं को मंज़ूर/हटाने का काम केवल Admin करते हैं।' }, 403);

  const pend = await read(db, PENDING);
  const pub = await read(db, PUBLISHED);
  const id = String(b?.id || '');
  if (op === 'pending') return json({ success: true, pending: pend, published: pub });
  if (op === 'approve') {
    const i = pend.findIndex((s) => s.id === id);
    if (i < 0) return json({ error: 'रचना नहीं मिली' }, 404);
    const [s] = pend.splice(i, 1);
    pub.unshift({ ...s, by: sess.username });
    await db.put(PENDING, JSON.stringify(pend));
    await db.put(PUBLISHED, JSON.stringify(pub.slice(0, 500)));
    return json({ success: true });
  }
  if (op === 'reject') {
    await db.put(PENDING, JSON.stringify(pend.filter((s) => s.id !== id)));
    return json({ success: true });
  }
  if (op === 'unpublish') {
    await db.put(PUBLISHED, JSON.stringify(pub.filter((s) => s.id !== id)));
    return json({ success: true });
  }
  return json({ error: 'Unknown op' }, 400);
};
