// Mock test for /api/newsletter. Run: npm run test:nl
import { onRequestPost as authPost } from '../functions/api/auth';
import { onRequestGet, onRequestPost } from '../functions/api/newsletter';

const store = new Map<string, string>();
const kv: any = {
  get: async (k: string) => (store.has(k) ? store.get(k)! : null),
  put: async (k: string, v: string) => { store.set(k, String(v)); },
  delete: async (k: string) => { store.delete(k); },
  list: async ({ prefix = '' }: any = {}) => ({ keys: [...store.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })), list_complete: true }),
};
let lastOtp = '';
const env: any = { HK_DB: kv, BREVO_API_KEY: 'test' };
const sent: any[] = [];
(globalThis as any).fetch = async (_u: string, init: any) => { const b = JSON.parse(init.body); sent.push(b); lastOtp = (String(b.subject).match(/(\d{6})/) || [])[1] || lastOtp; return new Response('{}', { status: 201 }); };

const O = 'https://horkathasantali.pages.dev';
const H = (token = '', origin = O) => ({ 'content-type': 'application/json', origin, 'cf-connecting-ip': '2.2.2.2', ...(token ? { authorization: `Bearer ${token}` } : {}) });
const auth = async (body: any, token = '') => (await authPost({ env, request: new Request(O + '/api/auth', { method: 'POST', headers: H(token), body: JSON.stringify(body) }) } as any)).json() as any;
const nl = async (body: any, token = '') => { const r = await onRequestPost({ env, request: new Request(O + '/api/newsletter', { method: 'POST', headers: H(token), body: JSON.stringify(body) }) } as any); return { status: r.status, ...(await r.json()) } as any; };
const get = async (q: string) => (await onRequestGet({ env, request: new Request(O + '/api/newsletter?' + q) } as any)).text();
let pass = 0, fail = 0;
const t = (n: string, c: any, x: any = '') => { c ? pass++ : fail++; console.log(`${c ? '✅' : '❌'} ${n}${c ? '' : '  → ' + JSON.stringify(x)}`); };
(async () => {
  await auth({ action: 'send-otp' });
  const admin = (await auth({ action: 'setup', otp: lastOtp, password: 'FirstPass#1' })).token;
  await auth({ action: 'op-create', username: 'ramesh.op', password: 'OpPass#123' }, admin);
  const op = (await auth({ action: 'login', username: 'ramesh.op', password: 'OpPass#123' })).token;
  t('bad email → 400', (await nl({ op: 'subscribe', email: 'abc' })).status === 400);
  sent.length = 0;
  t('subscribe ok', (await nl({ op: 'subscribe', email: 'A@Example.com' })).success === true);
  const tok = (sent[0].htmlContent.match(/confirm=([a-f0-9]{32})/) || [])[1];
  t('confirm email sent with link', !!tok && sent[0].to[0].email === 'a@example.com');
  t('not counted before confirm', (await nl({ op: 'stats' }, admin)).count === 0);
  t('confirm page', (await get('confirm=' + tok)).includes('पक्की'));
  t('counted after confirm', (await nl({ op: 'stats' }, admin)).count === 1);
  t('reused confirm link', (await get('confirm=' + tok)).includes('पुराना'));
  t('operator send → 403', (await nl({ op: 'send', subject: 'नमस्ते', message: 'इस हफ़्ते के नए शब्द।' }, op)).status === 403);
  t('visitor stats → 401', (await nl({ op: 'stats' })).status === 401);
  sent.length = 0;
  let r = await nl({ op: 'send', subject: 'इस हफ़्ते', message: 'Johar!\n\nनए शब्द <b>देखें</b>।' }, admin);
  t('admin send ok', r.success && r.sent === 1, r);
  const unsub = (sent[0].messageVersions[0].params.unsub.match(/unsub=([a-f0-9]{32})/) || [])[1];
  t('html escaped + unsub param', sent[0].htmlContent.includes('&lt;b&gt;') && !!unsub && sent[0].htmlContent.includes('{{params.unsub}}'));
  t('second send within 10 min → 429', (await nl({ op: 'send', subject: 'फिर', message: 'दोबारा भेजा जा रहा है।' }, admin)).status === 429);
  t('unsubscribe page', (await get('unsub=' + unsub)).includes('बंद'));
  t('count 0 after unsub', (await nl({ op: 'stats' }, admin)).count === 0);
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
