// Mock-KV test for /api/auth (functions/api/auth.ts). Run: npm run test:auth
import { onRequestGet, onRequestPost } from '../functions/api/auth';

const store = new Map<string, string>();
const kv: any = {
  get: async (k: string) => (store.has(k) ? store.get(k)! : null),
  put: async (k: string, v: string) => { store.set(k, String(v)); },
  delete: async (k: string) => { store.delete(k); },
  list: async ({ prefix = '' }: any = {}) => ({ keys: [...store.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })), list_complete: true }),
};
let lastOtp = '';
let mailTo = '';
(globalThis as any).fetch = async (url: string, init: any) => {
  if (String(url).includes('brevo')) {
    const b = JSON.parse(init.body);
    mailTo = b.to[0].email;
    lastOtp = (b.subject.match(/(\d{6})/) || [])[1];
    return new Response('{}', { status: 201 });
  }
  throw new Error('unexpected fetch ' + url);
};
const env: any = { HK_DB: kv, BREVO_API_KEY: 'test' };
const post = async (body: any, token = '', e = env, ipAddr = '1.1.1.1') => {
  const r = await onRequestPost({ env: e, request: new Request('https://horkathasantali.pages.dev/api/auth', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://horkathasantali.pages.dev', 'cf-connecting-ip': ipAddr, ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) }) } as any);
  return { status: r.status, ...(await r.json()) } as any;
};
const get = async (e: any) => (await onRequestGet({ env: e, request: new Request('https://x/api/auth') } as any)).json() as any;
let pass = 0, fail = 0;
const t = (name: string, cond: any, extra: any = '') => { cond ? pass++ : fail++; console.log(`${cond ? '✅' : '❌'} ${name}${cond ? '' : '  → ' + JSON.stringify(extra)}`); };
const clearGap = () => store.delete('otp:gap');

(async () => {
  // server readiness flags
  t('GET without HK_DB → ready:false', (await get({})).ready === false);
  const g0 = await get({ HK_DB: kv });
  t('GET without BREVO_API_KEY → emailReady:false', g0.ready === true && g0.emailReady === false);
  t('send-otp without BREVO_API_KEY → 503', (await post({ action: 'send-otp' }, '', { HK_DB: kv })).status === 503);
  t('POST without HK_DB → 503', (await post({ action: 'login', username: 'x', password: 'y' }, '', {})).status === 503);

  // first-time setup via email OTP
  t('GET → adminSet:false initially', (await get(env)).adminSet === false);
  let r = await post({ action: 'login', username: 'bosctechedu@gmail.com', password: 'whatever1' });
  t('admin login before setup → needSetup', r.needSetup === true, r);
  r = await post({ action: 'send-otp' });
  t('send-otp (setup) → OTP mailed to bosctechedu@gmail.com', r.success && r.purpose === 'setup' && mailTo === 'bosctechedu@gmail.com' && /^\d{6}$/.test(lastOtp), r);
  r = await post({ action: 'setup', otp: '000000' === lastOtp ? '111111' : '000000', password: 'FirstPass#1' });
  t('setup with wrong OTP rejected', !r.success && r.status === 400, r);
  r = await post({ action: 'setup', otp: lastOtp, password: 'FirstPass#1' });
  t('setup with correct OTP → admin session', r.success && r.role === 'admin' && /^[0-9a-f]{64}$/.test(r.token), r);

  // admin login by username and by email (case-insensitive)
  r = await post({ action: 'login', username: 'BOSC@TECH&EDU', password: 'FirstPass#1' });
  t('admin login by username BOSC@TECH&EDU', r.success && r.role === 'admin', r);
  r = await post({ action: 'login', username: 'bosc@tech&edu', password: 'FirstPass#1' });
  t('admin login by username (lowercase)', r.success && r.role === 'admin', r);
  r = await post({ action: 'login', username: 'BoscTechEdu@Gmail.com', password: 'FirstPass#1' });
  t('admin login by email (mixed case) → admin account', r.success && r.role === 'admin' && r.username === 'BOSC@TECH&EDU', r);
  const adminToken = r.token;
  r = await post({ action: 'login', username: 'bosctechedu@gmail.com', password: 'wrongpass' });
  t('admin wrong password → 401', r.status === 401, r);

  // operator create/login (admin only)
  r = await post({ action: 'op-create', username: 'ramesh.op', password: 'OpPass#123' });
  t('op-create without session → 403', r.status === 403, r);
  r = await post({ action: 'op-create', username: 'bosctechedu@gmail.com', password: 'OpPass#123' }, adminToken);
  t('op-create with admin email as username → rejected', r.status === 400, r);
  r = await post({ action: 'op-create', username: 'ramesh.op', name: 'Ramesh', password: 'OpPass#123' }, adminToken);
  t('admin creates operator ramesh.op', r.success, r);
  r = await post({ action: 'op-list' }, adminToken);
  t('op-list shows ramesh.op', r.success && r.operators.some((o: any) => o.username === 'ramesh.op'), r);
  r = await post({ action: 'login', username: 'Ramesh.Op', password: 'OpPass#123' });
  t('operator login (case-insensitive username)', r.success && r.role === 'operator' && r.username === 'ramesh.op', r);
  const opToken = r.token;
  r = await post({ action: 'op-create', username: 'second.op', password: 'OpPass#123' }, opToken);
  t('operator cannot create operators → 403', r.status === 403, r);
  r = await post({ action: 'op-reset', username: 'ramesh.op', password: 'NewOpPass#9' }, adminToken);
  t('admin resets operator password', r.success, r);
  r = await post({ action: 'me' }, opToken);
  t('old operator session invalid after reset', r.status === 401, r);
  r = await post({ action: 'login', username: 'ramesh.op', password: 'NewOpPass#9' });
  t('operator logs in with new password', r.success && r.role === 'operator', r);

  // admin forgot-password via email OTP, then login
  clearGap();
  r = await post({ action: 'send-otp' });
  t('forgot: send-otp (reset)', r.success && r.purpose === 'reset' && r.sentTo === 'bos•••@gmail.com', r);
  r = await post({ action: 'send-otp' });
  t('forgot: second send within 60s → 429', r.status === 429, r);
  r = await post({ action: 'reset', otp: lastOtp, password: 'short' });
  t('forgot: too-short password rejected', r.status === 400, r);
  r = await post({ action: 'reset', otp: lastOtp, password: 'ResetPass#2' });
  t('forgot: reset with OTP succeeds', r.success, r);
  r = await post({ action: 'reset', otp: lastOtp, password: 'ResetPass#3' });
  t('forgot: OTP cannot be reused', !r.success, r);
  r = await post({ action: 'me' }, adminToken);
  t('old admin session invalid after reset', r.status === 401, r);
  r = await post({ action: 'login', username: 'bosctechedu@gmail.com', password: 'FirstPass#1' });
  t('old admin password rejected', r.status === 401, r);
  r = await post({ action: 'login', username: 'bosctechedu@gmail.com', password: 'ResetPass#2' });
  t('admin logs in (email) with new password', r.success && r.role === 'admin', r);

  // operator "forgot": no OTP route for operators (client shows Admin/WhatsApp message)
  clearGap();
  r = await post({ action: 'send-otp', username: 'ramesh.op' }, '', env, '2.2.2.2');
  t('send-otp always targets admin email only (never an operator)', r.success && mailTo === 'bosctechedu@gmail.com', r);

  // lockout shared between admin email and username
  for (let i = 0; i < 4; i++) await post({ action: 'login', username: 'BOSC@TECH&EDU', password: 'bad' }, '', env, '9.9.9.9');
  for (let i = 0; i < 4; i++) await post({ action: 'login', username: 'bosctechedu@gmail.com', password: 'bad' }, '', env, '9.9.9.9');
  r = await post({ action: 'login', username: 'bosctechedu@gmail.com', password: 'ResetPass#2' }, '', env, '9.9.9.9');
  t('lockout after 8 fails (email + username share counter) → 429', r.status === 429, r);

  // PBKDF2 hash stored, not the password
  const acct = JSON.parse(store.get('acct:admin')!);
  t('admin stored as PBKDF2 salt+hash only', acct.salt && acct.hash && !JSON.stringify(acct).includes('ResetPass'), acct);

  console.log(`\n${fail ? '❌' : '✅'} ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
