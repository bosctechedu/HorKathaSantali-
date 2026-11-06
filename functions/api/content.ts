// Live Content Editor (CMS) API
// GET  /api/content            → public: { edits, adds } (सभी visitors पर लागू)
// POST /api/content            → staff only. Operator: edit, add, update-add. Admin: + delete, restore, remove-add, history
import { Ctx, json, sameOrigin, readSession, randomHex } from '../../api-lib/auth';

const KEY = 'cms:overrides';
const LOG = 'cms:log';
const MAX_TEXT = 5000;
const MAX_ENTRIES = 5000;
const MAX_LOG = 300;
const KEY_RE = /^[a-z0-9_:-]{1,80}\|[a-z0-9]{1,16}$/;

type Edit = { t: string; del?: boolean; by: string; at: string; orig?: string };
type Add = { id: string; anchor: string; t: string; by: string; at: string };
type Store = { edits: Record<string, Edit>; adds: Add[] };

const load = async (db: any): Promise<Store> => {
  try { const s = JSON.parse((await db.get(KEY)) || '{}'); return { edits: s.edits || {}, adds: s.adds || [] }; }
  catch { return { edits: {}, adds: [] }; }
};

const publicView = (s: Store) => ({
  edits: Object.fromEntries(Object.entries(s.edits).map(([k, e]) => [k, e.del ? { del: true } : { t: e.t }])),
  adds: s.adds.map((a) => ({ id: a.id, anchor: a.anchor, t: a.t })),
});

export const onRequestGet = async ({ env }: Ctx) => {
  if (!env.HK_DB) return json({ ready: false, edits: {}, adds: [] });
  const s = await load(env.HK_DB);
  return new Response(JSON.stringify({ ready: true, ...publicView(s) }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-cache' },
  });
};

export const onRequestPost = async ({ request, env }: Ctx) => {
  if (!sameOrigin(request)) return json({ error: 'Forbidden' }, 403);
  const db = env.HK_DB;
  if (!db) return json({ error: 'Server storage (HK_DB) जुड़ा नहीं है।' }, 503);
  const sess = await readSession(db, request);
  if (!sess) return json({ error: 'केवल Admin / Operator बदलाव कर सकते हैं। दोबारा Login करें।' }, 401);
  const isAdmin = sess.role === 'admin';

  let b: any;
  try { b = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  const op = String(b?.op || '');
  const ADMIN_ONLY = ['delete', 'restore', 'remove-add', 'history', 'list'];
  if (ADMIN_ONLY.includes(op) && !isAdmin) return json({ error: 'यह काम केवल Admin कर सकते हैं।' }, 403);

  if (op === 'history') {
    return json({ success: true, log: JSON.parse((await db.get(LOG)) || '[]') });
  }

  const s = await load(db);
  if (op === 'list') return json({ success: true, edits: s.edits, adds: s.adds });
  const now = new Date().toISOString();
  const text = String(b?.text ?? '').slice(0, MAX_TEXT);
  const key = String(b?.key || '');
  let logLine = '';

  if (op === 'edit' || op === 'delete' || op === 'restore') {
    if (!KEY_RE.test(key)) return json({ error: 'गलत key' }, 400);
    if (op === 'edit') {
      if (!text.trim()) return json({ error: 'खाली लिखावट save नहीं होगी। हटाने का काम Admin करते हैं।' }, 400);
      if (!s.edits[key] && Object.keys(s.edits).length >= MAX_ENTRIES) return json({ error: 'बदलावों की सीमा पूरी।' }, 400);
      s.edits[key] = { t: text, by: sess.username, at: now, orig: String(b?.orig ?? s.edits[key]?.orig ?? '').slice(0, 300) };
      logLine = `Update: ${text.slice(0, 80)}`;
    } else if (op === 'delete') {
      s.edits[key] = { t: '', del: true, by: sess.username, at: now, orig: String(b?.orig ?? s.edits[key]?.orig ?? '').slice(0, 300) };
      logLine = `Delete: ${String(b?.orig || '').slice(0, 80)}`;
    } else {
      delete s.edits[key];
      logLine = `Restore original: ${String(b?.orig || '').slice(0, 80)}`;
    }
  } else if (op === 'add') {
    const anchor = String(b?.anchor || '');
    if (!KEY_RE.test(anchor) && !/^add:[A-Za-z0-9_-]{1,40}$/.test(anchor)) return json({ error: 'गलत anchor' }, 400);
    if (!text.trim()) return json({ error: 'नया पैराग्राफ़ खाली है।' }, 400);
    if (s.adds.length >= MAX_ENTRIES) return json({ error: 'सीमा पूरी।' }, 400);
    s.adds.push({ id: 'a_' + randomHex(6), anchor, t: text, by: sess.username, at: now });
    logLine = `Add: ${text.slice(0, 80)}`;
  } else if (op === 'update-add' || op === 'remove-add') {
    const a = s.adds.find((x) => x.id === String(b?.id || ''));
    if (!a) return json({ error: 'यह जोड़ा गया हिस्सा नहीं मिला।' }, 404);
    if (op === 'update-add') {
      if (!text.trim()) return json({ error: 'खाली लिखावट save नहीं होगी।' }, 400);
      a.t = text; a.by = sess.username; a.at = now;
      logLine = `Update added: ${text.slice(0, 80)}`;
    } else {
      s.adds = s.adds.filter((x) => x.id !== a.id && x.anchor !== `add:${a.id}`);
      logLine = `Remove added: ${a.t.slice(0, 80)}`;
    }
  } else {
    return json({ error: 'Unknown op' }, 400);
  }

  await db.put(KEY, JSON.stringify(s));
  try {
    const log = JSON.parse((await db.get(LOG)) || '[]');
    log.unshift({ at: now, by: sess.username, role: sess.role, msg: logLine });
    await db.put(LOG, JSON.stringify(log.slice(0, MAX_LOG)));
  } catch { /* log is best-effort */ }
  return json({ success: true, ...publicView(s) });
};
