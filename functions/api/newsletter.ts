// हफ़्ते का email समाचार-पत्र (double opt-in)
// POST {op:'subscribe', email}          → पुष्टि-link वाला email (Brevo)
// GET  ?confirm=TOKEN | ?unsub=TOKEN     → पुष्टि / सदस्यता बंद (HTML पेज)
// POST {op:'stats'|'send', subject, message} → केवल Admin. भेजना केवल Admin के बटन दबाने पर।
import { Ctx, json, sameOrigin, readSession, randomHex, ip, ADMIN_EMAIL } from '../../api-lib/auth';

const SUBS = 'nl:subs';
const EMAIL_RE = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,190}\.[a-z]{2,}$/i;
type Subs = Record<string, { t: string; at: string }>;
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const loadSubs = async (db: any): Promise<Subs> => { try { return JSON.parse((await db.get(SUBS)) || '{}'); } catch { return {}; } };
const page = (msg: string) => new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Hor Katha</title><body style="font-family:sans-serif;text-align:center;padding:40px"><h2>${esc(msg)}</h2><a href="/">Hor Katha Santali पर जाएँ</a></body>`, { headers: { 'content-type': 'text/html; charset=utf-8' } });
const brevo = (key: string, body: unknown) => fetch('https://api.brevo.com/v3/smtp/email', { method: 'POST', headers: { accept: 'application/json', 'api-key': key, 'content-type': 'application/json' }, body: JSON.stringify(body) });
const shell = (inner: string, origin: string) => `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:20px;border:1px solid #e2e8f0;border-radius:10px"><h2 style="color:#b45309;margin:0 0 12px">Hor Katha Santali</h2>${inner}<p style="color:#94a3b8;font-size:12px;margin-top:24px"><a href="${origin}">${origin.replace('https://', '')}</a></p></div>`;

export const onRequestGet = async ({ request, env }: Ctx) => {
  const db = env.HK_DB; if (!db) return page('सेवा अभी उपलब्ध नहीं है।');
  const u = new URL(request.url);
  const confirm = u.searchParams.get('confirm'), unsub = u.searchParams.get('unsub');
  if (confirm && /^[a-f0-9]{32}$/.test(confirm)) {
    const email = await db.get('nl:pend:' + confirm);
    if (!email) return page('यह link पुराना हो गया है। दोबारा subscribe करें।');
    const subs = await loadSubs(db);
    subs[email] = { t: randomHex(16), at: new Date().toISOString() };
    await db.put(SUBS, JSON.stringify(subs)); await db.delete('nl:pend:' + confirm);
    return page('धन्यवाद! आपकी सदस्यता पक्की हो गई। ✅');
  }
  if (unsub && /^[a-f0-9]{32}$/.test(unsub)) {
    const subs = await loadSubs(db);
    const e = Object.keys(subs).find((k) => subs[k].t === unsub);
    if (e) { delete subs[e]; await db.put(SUBS, JSON.stringify(subs)); }
    return page('आपकी सदस्यता बंद कर दी गई है। अब आपको email नहीं आएगा।');
  }
  return page('गलत link');
};

export const onRequestPost = async ({ request, env }: Ctx) => {
  if (!sameOrigin(request)) return json({ error: 'Forbidden' }, 403);
  const db = env.HK_DB; if (!db) return json({ error: 'Server storage (HK_DB) जुड़ा नहीं है।' }, 503);
  let b: any; try { b = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  const op = String(b?.op || '');
  const origin = new URL(request.url).origin;

  if (op === 'subscribe') {
    if (b?.website) return json({ success: true });
    const email = String(b?.email || '').trim().toLowerCase();
    if (!EMAIL_RE.test(email)) return json({ error: 'सही email लिखें।' }, 400);
    if (!env.BREVO_API_KEY) return json({ error: 'Email सेवा अभी सेट नहीं है।' }, 503);
    const subs = await loadSubs(db);
    if (subs[email]) return json({ success: true, message: 'यह email पहले से जुड़ा है। ✅' });
    const rk = 'nlrl:' + ip(request), n = Number((await db.get(rk)) || 0);
    if (n >= 3) return json({ error: 'बहुत ज़्यादा अनुरोध। 1 घंटे बाद कोशिश करें।' }, 429);
    await db.put(rk, String(n + 1), { expirationTtl: 3600 });
    const tok = randomHex(16);
    await db.put('nl:pend:' + tok, email, { expirationTtl: 172800 });
    const link = `${origin}/api/newsletter?confirm=${tok}`;
    const r = await brevo(env.BREVO_API_KEY, { sender: { name: 'Hor Katha Santali', email: ADMIN_EMAIL }, to: [{ email }], subject: 'Hor Katha समाचार-पत्र: सदस्यता पक्की करें',
      htmlContent: shell(`<p>Johar! हर हफ़्ते संताली शब्द, कार्यक्रम और नई रचनाएँ पाने के लिए नीचे दबाएँ:</p><p><a href="${link}" style="background:#b45309;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">सदस्यता पक्की करें</a></p><p style="color:#64748b;font-size:12px">अगर आपने यह नहीं माँगा, तो इस email को अनदेखा करें।</p>`, origin) });
    if (!r.ok) return json({ error: 'Email नहीं भेजा जा सका। बाद में कोशिश करें।' }, 502);
    return json({ success: true, message: 'आपके email पर पुष्टि-link भेजा गया है। उसे दबाकर सदस्यता पक्की करें।' });
  }

  const sess = await readSession(db, request);
  if (!sess) return json({ error: 'Login ज़रूरी है।' }, 401);
  if (sess.role !== 'admin') return json({ error: 'समाचार-पत्र केवल Admin भेज सकते हैं।' }, 403);
  const subs = await loadSubs(db);
  const list = Object.entries(subs);
  if (op === 'stats') return json({ success: true, count: list.length, last: await db.get('nl:last') });
  if (op === 'send') {
    const subject = String(b?.subject || '').trim().slice(0, 150), message = String(b?.message || '').trim().slice(0, 20000);
    if (subject.length < 3 || message.length < 10) return json({ error: 'विषय और संदेश लिखें।' }, 400);
    if (!list.length) return json({ error: 'अभी कोई subscriber नहीं है।' }, 400);
    if (!env.BREVO_API_KEY) return json({ error: 'Email सेवा (BREVO_API_KEY) सेट नहीं है।' }, 503);
    if (await db.get('nl:gap')) return json({ error: 'अभी-अभी भेजा गया है। 10 मिनट बाद दोबारा भेजें।' }, 429);
    const body = message.split(/\n{2,}/).map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');
    let sent = 0;
    for (let i = 0; i < list.length; i += 900) {
      const chunk = list.slice(i, i + 900);
      const r = await brevo(env.BREVO_API_KEY, { sender: { name: 'Hor Katha Santali', email: ADMIN_EMAIL }, subject,
        htmlContent: shell(body + `<p style="color:#94a3b8;font-size:12px">यह email नहीं चाहिए? <a href="{{params.unsub}}">सदस्यता बंद करें</a></p>`, origin),
        messageVersions: chunk.map(([email, s]) => ({ to: [{ email }], params: { unsub: `${origin}/api/newsletter?unsub=${s.t}` } })) });
      if (!r.ok) return json({ error: `भेजने में दिक़्क़त (Brevo ${r.status})। ${sent} को भेजा गया।` }, 502);
      sent += chunk.length;
    }
    await db.put('nl:gap', '1', { expirationTtl: 600 });
    await db.put('nl:last', JSON.stringify({ at: new Date().toISOString(), subject, sent }));
    return json({ success: true, sent });
  }
  return json({ error: 'Unknown op' }, 400);
};
