// POST /api/auth  { action, ... }   ·   GET /api/auth → { ready, adminSet }
import {
  Ctx, json, sameOrigin, ip, ADMIN_USERNAME, ADMIN_EMAIL, MIN_PASS, normUser, isAdminName, isAdminLogin,
  getAdmin, getOperator, hashPassword, verifyPassword, createSession, readSession, deleteSession,
  loginFail, loginFailCount, loginClear, LOGIN_LIMIT, sendAdminOtp, checkAdminOtp, Account,
} from '../../api-lib/auth';

const NOT_READY = { error: 'Server storage (HK_DB) अभी जुड़ा नहीं है। Cloudflare में KV binding जोड़ें।' };
const maskEmail = (e: string) => e.replace(/^(.{3}).*(@.*)$/, '$1•••$2');

export const onRequestGet = async ({ env }: Ctx) => {
  if (!env.HK_DB) return json({ ready: false, adminSet: false, emailReady: !!env.BREVO_API_KEY });
  return json({ ready: true, adminSet: !!(await getAdmin(env.HK_DB)), emailReady: !!env.BREVO_API_KEY, adminUsername: ADMIN_USERNAME, resetEmail: maskEmail(ADMIN_EMAIL) });
};

export const onRequestPost = async ({ request, env }: Ctx) => {
  if (!sameOrigin(request)) return json({ error: 'Forbidden' }, 403);
  const db = env.HK_DB;
  if (!db) return json(NOT_READY, 503);
  let b: any;
  try { b = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  const action = String(b?.action || '');
  const reqIp = ip(request);

  switch (action) {
    // ── Admin email OTP (first-time setup or password reset) ──
    case 'send-otp': {
      const admin = await getAdmin(db);
      const purpose = admin ? 'reset' : 'setup';
      const r = await sendAdminOtp(env, purpose, reqIp);
      return r.ok ? json({ success: true, purpose, sentTo: maskEmail(ADMIN_EMAIL) }) : json({ error: r.error }, r.status || 500);
    }

    // ── First-time admin password (needs email OTP so nobody else can claim Admin) ──
    case 'setup': {
      if (await getAdmin(db)) return json({ error: 'Admin पहले से बना हुआ है। Login करें या पासवर्ड रीसेट करें।' }, 409);
      const pw = String(b?.password || '');
      if (pw.length < MIN_PASS) return json({ error: `पासवर्ड कम से कम ${MIN_PASS} अक्षर का हो।` }, 400);
      const bad = await checkAdminOtp(db, String(b?.otp || '').trim(), 'setup');
      if (bad) return json({ error: bad }, 400);
      const h = await hashPassword(pw);
      const acct: Account = { ...h, ver: 1, createdAt: new Date().toISOString() };
      await db.put('acct:admin', JSON.stringify(acct));
      const token = await createSession(db, { role: 'admin', username: ADMIN_USERNAME, ver: 1 });
      return json({ success: true, token, role: 'admin', username: ADMIN_USERNAME });
    }

    // ── Admin password reset via email OTP ──
    case 'reset': {
      const admin = await getAdmin(db);
      if (!admin) return json({ error: 'Admin अभी बना नहीं है। पहले setup करें।' }, 400);
      const pw = String(b?.password || '');
      if (pw.length < MIN_PASS) return json({ error: `पासवर्ड कम से कम ${MIN_PASS} अक्षर का हो।` }, 400);
      const bad = await checkAdminOtp(db, String(b?.otp || '').trim(), 'reset');
      if (bad) return json({ error: bad }, 400);
      const h = await hashPassword(pw);
      await db.put('acct:admin', JSON.stringify({ ...admin, ...h, ver: admin.ver + 1 }));
      await loginClear(db, `${ADMIN_USERNAME.toLowerCase()}|${reqIp}`);
      return json({ success: true, message: 'पासवर्ड बदल गया। नए पासवर्ड से Login करें।' });
    }

    // ── Login (Admin or Operator) ──
    case 'login': {
      const username = normUser(b?.username);
      const pw = String(b?.password || '');
      if (!username || !pw) return json({ error: 'Username और Password दोनों डालें।' }, 400);
      const asAdmin = isAdminLogin(username); // username BOSC@TECH&EDU or the admin email
      // Admin email and username share one lockout counter
      const failKey = `${asAdmin ? ADMIN_USERNAME.toLowerCase() : username.toLowerCase()}|${reqIp}`;
      if ((await loginFailCount(db, failKey)) >= LOGIN_LIMIT) return json({ error: 'बहुत बार गलत प्रयास। 15 मिनट बाद कोशिश करें।' }, 429);

      if (asAdmin) {
        const admin = await getAdmin(db);
        if (!admin) return json({ error: 'Admin अभी बना नहीं है। "पहली बार सेटअप" से पासवर्ड बनाएँ।', needSetup: true }, 400);
        if (!(await verifyPassword(pw, admin.salt, admin.hash))) { await loginFail(db, failKey); return json({ error: 'Username या Password गलत है।' }, 401); }
        await loginClear(db, failKey);
        const token = await createSession(db, { role: 'admin', username: ADMIN_USERNAME, ver: admin.ver });
        return json({ success: true, token, role: 'admin', username: ADMIN_USERNAME });
      }
      const op = await getOperator(db, username);
      if (!op || op.active === false || !(await verifyPassword(pw, op.salt, op.hash))) { await loginFail(db, failKey); return json({ error: 'Username या Password गलत है।' }, 401); }
      await loginClear(db, failKey);
      const token = await createSession(db, { role: 'operator', username: username.toLowerCase(), ver: op.ver });
      return json({ success: true, token, role: 'operator', username: username.toLowerCase(), name: op.name || '' });
    }

    case 'me': {
      const s = await readSession(db, request);
      return s ? json({ success: true, role: s.role, username: s.username }) : json({ error: 'Session समाप्त' }, 401);
    }

    case 'logout': {
      await deleteSession(db, request);
      return json({ success: true });
    }

    // ── Signed-in user changes own password ──
    case 'change-password': {
      const s = await readSession(db, request);
      if (!s) return json({ error: 'Session समाप्त, दोबारा Login करें।' }, 401);
      const oldPw = String(b?.oldPassword || ''), pw = String(b?.password || '');
      if (pw.length < MIN_PASS) return json({ error: `पासवर्ड कम से कम ${MIN_PASS} अक्षर का हो।` }, 400);
      const key = s.role === 'admin' ? 'acct:admin' : `acct:op:${s.username}`;
      const acct: Account = JSON.parse((await db.get(key))!);
      if (!(await verifyPassword(oldPw, acct.salt, acct.hash))) return json({ error: 'पुराना पासवर्ड गलत है।' }, 400);
      const h = await hashPassword(pw);
      await db.put(key, JSON.stringify({ ...acct, ...h, ver: acct.ver + 1 }));
      const token = await createSession(db, { role: s.role, username: s.username, ver: acct.ver + 1 });
      return json({ success: true, token, message: 'पासवर्ड बदल गया।' });
    }

    // ── Admin only: manage operators ──
    case 'op-list':
    case 'op-create':
    case 'op-delete':
    case 'op-reset': {
      const s = await readSession(db, request);
      if (!s || s.role !== 'admin') return json({ error: 'केवल Admin के लिए।' }, 403);

      if (action === 'op-list') {
        const out: any[] = [];
        let cursor: string | undefined;
        do {
          const l = await db.list({ prefix: 'acct:op:', cursor });
          for (const k of l.keys) {
            const a = JSON.parse((await db.get(k.name)) || '{}');
            out.push({ username: k.name.slice(8), name: a.name || '', createdAt: a.createdAt, active: a.active !== false });
          }
          cursor = l.list_complete ? undefined : l.cursor;
        } while (cursor);
        return json({ success: true, operators: out });
      }

      const username = normUser(b?.username).toLowerCase();
      if (!/^[a-z0-9._@-]{3,30}$/.test(username) || isAdminLogin(username)) return json({ error: 'Username 3–30 अक्षर (a-z, 0-9, . _ @ -) का हो, Admin वाला नाम नहीं।' }, 400);

      if (action === 'op-delete') {
        await db.delete(`acct:op:${username}`);
        return json({ success: true });
      }
      const pw = String(b?.password || '');
      if (pw.length < MIN_PASS) return json({ error: `पासवर्ड कम से कम ${MIN_PASS} अक्षर का हो।` }, 400);
      const existing = await getOperator(db, username);
      if (action === 'op-create' && existing) return json({ error: 'यह Username पहले से है।' }, 409);
      if (action === 'op-reset' && !existing) return json({ error: 'Operator नहीं मिला।' }, 404);
      const h = await hashPassword(pw);
      const acct: Account = existing
        ? { ...existing, ...h, ver: existing.ver + 1 }
        : { ...h, ver: 1, createdAt: new Date().toISOString(), name: String(b?.name || '').trim().slice(0, 60), active: true };
      await db.put(`acct:op:${username}`, JSON.stringify(acct));
      return json({ success: true });
    }
  }
  return json({ error: 'Unknown action' }, 400);
};
