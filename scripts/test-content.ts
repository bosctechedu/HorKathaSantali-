// Mock-KV test for /api/content (Live Content Editor). Run: npm run test:content
import { onRequestPost as authPost } from '../functions/api/auth';
import { onRequestGet, onRequestPost } from '../functions/api/content';

const store = new Map<string, string>();
const kv: any = {
  get: async (k: string) => (store.has(k) ? store.get(k)! : null),
  put: async (k: string, v: string) => { store.set(k, String(v)); },
  delete: async (k: string) => { store.delete(k); },
  list: async ({ prefix = '' }: any = {}) => ({ keys: [...store.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })), list_complete: true }),
};
let lastOtp = '';
(globalThis as any).fetch = async (_u: string, init: any) => { lastOtp = (JSON.parse(init.body).subject.match(/(\d{6})/) || [])[1]; return new Response('{}', { status: 201 }); };
const env: any = { HK_DB: kv, BREVO_API_KEY: 'test' };
const H = (token = '', origin = 'https://horkathasantali.pages.dev') => ({ 'content-type': 'application/json', origin, 'cf-connecting-ip': '1.1.1.1', ...(token ? { authorization: `Bearer ${token}` } : {}) });
const auth = async (body: any, token = '') => (await authPost({ env, request: new Request('https://horkathasantali.pages.dev/api/auth', { method: 'POST', headers: H(token), body: JSON.stringify(body) }) } as any)).json() as any;
const cms = async (body: any, token = '', origin?: string) => {
  const r = await onRequestPost({ env, request: new Request('https://horkathasantali.pages.dev/api/content', { method: 'POST', headers: H(token, origin), body: JSON.stringify(body) }) } as any);
  return { status: r.status, ...(await r.json()) } as any;
};
const pub = async () => (await onRequestGet({ env, request: new Request('https://x/api/content') } as any)).json() as any;
let pass = 0, fail = 0;
const t = (n: string, c: any, x: any = '') => { c ? pass++ : fail++; console.log(`${c ? '✅' : '❌'} ${n}${c ? '' : '  → ' + JSON.stringify(x)}`); };

(async () => {
  await auth({ action: 'send-otp' });
  const admin = (await auth({ action: 'setup', otp: lastOtp, password: 'FirstPass#1' })).token;
  await auth({ action: 'op-create', username: 'ramesh.op', password: 'OpPass#123' }, admin);
  const op = (await auth({ action: 'login', username: 'ramesh.op', password: 'OpPass#123' })).token;
  const K = 'home|abc123';

  t('public GET empty', (await pub()).ready === true && Object.keys((await pub()).edits).length === 0);
  t('no session → 401', (await cms({ op: 'edit', key: K, text: 'x' })).status === 401);
  t('cross-origin → 403', (await cms({ op: 'edit', key: K, text: 'x' }, admin, 'https://evil.com')).status === 403);
  let r = await cms({ op: 'edit', key: K, text: 'नया शीर्षक', orig: 'पुराना' }, op);
  t('operator Update allowed', r.success && r.edits[K].t === 'नया शीर्षक', r);
  t('public GET shows edit (no author info)', (await pub()).edits[K].t === 'नया शीर्षक' && !(await pub()).edits[K].by);
  t('operator Delete → 403', (await cms({ op: 'delete', key: K }, op)).status === 403);
  t('operator Restore → 403', (await cms({ op: 'restore', key: K }, op)).status === 403);
  t('operator History → 403', (await cms({ op: 'history' }, op)).status === 403);
  t('operator List → 403', (await cms({ op: 'list' }, op)).status === 403);
  t('empty edit rejected', (await cms({ op: 'edit', key: K, text: '   ' }, op)).status === 400);
  t('bad key rejected', (await cms({ op: 'edit', key: '<script>', text: 'x' }, op)).status === 400);
  r = await cms({ op: 'add', anchor: K, text: 'नया पैराग्राफ़' }, op);
  t('operator Add allowed', r.success && r.adds.length === 1, r);
  const addId = r.adds[0].id;
  r = await cms({ op: 'update-add', id: addId, text: 'बदला पैराग्राफ़' }, op);
  t('operator Update-add allowed', r.success && r.adds[0].t === 'बदला पैराग्राफ़', r);
  t('operator Remove-add → 403', (await cms({ op: 'remove-add', id: addId }, op)).status === 403);
  r = await cms({ op: 'delete', key: K, orig: 'पुराना' }, admin);
  t('admin Delete', r.success && r.edits[K].del === true, r);
  r = await cms({ op: 'list' }, admin);
  t('admin List has author + orig', r.success && r.edits[K].by === 'BOSC@TECH&EDU' && r.edits[K].orig === 'पुराना', r);
  r = await cms({ op: 'restore', key: K }, admin);
  t('admin Restore removes override', r.success && !r.edits[K], r);
  r = await cms({ op: 'remove-add', id: addId }, admin);
  t('admin Remove-add', r.success && r.adds.length === 0, r);
  r = await cms({ op: 'history' }, admin);
  t('history logs who did what', r.success && r.log.length === 6 && r.log.some((l: any) => l.by === 'ramesh.op' && l.role === 'operator'), r.log);
  await auth({ action: 'op-reset', username: 'ramesh.op', password: 'NewOpPass#9' }, admin);
  t('old operator session after reset → 401', (await cms({ op: 'edit', key: K, text: 'x' }, op)).status === 401);
  console.log(`\n${fail ? '❌' : '✅'} ${pass} passed, ${fail} failed`);
  if (fail) process.exit(1);
})();
