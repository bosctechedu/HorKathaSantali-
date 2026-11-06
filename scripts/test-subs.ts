// Mock-KV test for /api/submissions. Run: npm run test:subs
import { onRequestPost as authPost } from '../functions/api/auth';
import { onRequestGet, onRequestPost } from '../functions/api/submissions';

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
  const r = await onRequestPost({ env, request: new Request('https://horkathasantali.pages.dev/api/submissions', { method: 'POST', headers: H(token, origin), body: JSON.stringify(body) }) } as any);
  return { status: r.status, ...(await r.json()) } as any;
};
const pub = async () => (await onRequestGet({ env, request: new Request('https://x/api/submissions') } as any)).json() as any;
let pass = 0, fail = 0;
const t = (n: string, c: any, x: any = '') => { c ? pass++ : fail++; console.log(`${c ? '✅' : '❌'} ${n}${c ? '' : '  → ' + JSON.stringify(x)}`); };


(async () => {
  await auth({ action: 'send-otp' });
  const admin = (await auth({ action: 'setup', otp: lastOtp, password: 'FirstPass#1' })).token;
  await auth({ action: 'op-create', username: 'ramesh.op', password: 'OpPass#123' }, admin);
  const op = (await auth({ action: 'login', username: 'ramesh.op', password: 'OpPass#123' })).token;
  const good = { op: 'submit', name: 'सुनील', place: 'दुमका', type: 'कविता', title: 'बाहा', text: 'साल के फूल खिले, जाहेर थान में नगाड़ा बजा।' };

  t('public GET empty', (await pub()).ready === true && (await pub()).items.length === 0);
  t('cross-origin submit → 403', (await cms(good, '', 'https://evil.com')).status === 403);
  t('too short → 400', (await cms({ ...good, text: 'छोटा' })).status === 400);
  let r = await cms(good);
  t('visitor submit ok', r.success === true, r);
  t('not public before approval', (await pub()).items.length === 0);
  t('honeypot silently ignored', (await cms({ ...good, website: 'spam' })).success === true);
  await cms(good); await cms(good);
  t('4th in an hour → 429', (await cms(good)).status === 429);
  t('visitor pending → 401', (await cms({ op: 'pending' })).status === 401);
  t('operator pending → 403', (await cms({ op: 'pending' }, op)).status === 403);
  r = await cms({ op: 'pending' }, admin);
  t('admin sees 3 pending (honeypot not stored)', r.pending.length === 3, r.pending?.length);
  const id = r.pending[0].id;
  t('operator approve → 403', (await cms({ op: 'approve', id }, op)).status === 403);
  t('admin approve', (await cms({ op: 'approve', id }, admin)).success === true);
  let p = await pub();
  t('approved is public, no approver info', p.items.length === 1 && p.items[0].title === 'बाहा' && !p.items[0].by, p);
  t('admin reject', (await cms({ op: 'reject', id: (await cms({ op: 'pending' }, admin)).pending[0].id }, admin)).success === true);
  t('pending now 1', (await cms({ op: 'pending' }, admin)).pending.length === 1);
  t('admin unpublish', (await cms({ op: 'unpublish', id }, admin)).success === true && (await pub()).items.length === 0);
  store.delete('subrl:1.1.1.1');
  t('event without date → 400', (await cms({ op: 'submit', kind: 'event', name: 'राम', title: 'बाहा मेला', text: 'गाँव में बाहा पर्व का मेला और नाच-गान होगा।' })).status === 400);
  t('event submit ok', (await cms({ op: 'submit', kind: 'event', name: 'राम', title: 'बाहा मेला', date: '2027-03-10', place: 'दुमका', text: 'गाँव में बाहा पर्व का मेला और नाच-गान होगा।' })).success === true);
  t('odd kind falls back to rachna', (await cms({ op: 'pending', kind: 'constructor' }, admin)).pending.length === 1);
  r = await cms({ op: 'pending', kind: 'event' }, admin);
  t('event pending separate, keeps date', r.pending.length === 1 && r.pending[0].date === '2027-03-10', r);
  await cms({ op: 'approve', kind: 'event', id: r.pending[0].id }, admin);
  const ev = await (await onRequestGet({ env, request: new Request('https://x/api/submissions?kind=event') } as any)).json() as any;
  t('event public by kind', ev.items.length === 1 && (await pub()).items.length === 0);
  store.delete('subrl:1.1.1.1');
  t('public job submit → 403', (await cms({ op: 'submit', kind: 'job', name: 'राम', title: 'शिक्षक', text: 'शिक्षक की भर्ती निकली है, जल्दी आवेदन करें।' })).status === 403);
  t('operator job post → 403', (await cms({ op: 'post', kind: 'job', title: 'संताली शिक्षक', date: '2099-01-01' }, op)).status === 403);
  t('admin job post ok', (await cms({ op: 'post', kind: 'job', title: 'संताली शिक्षक', place: 'JSSC', date: '2099-01-01', link: 'https://example.org/x' }, admin)).success === true);
  await cms({ op: 'post', kind: 'job', title: 'पुरानी भर्ती', date: '2020-01-01' }, admin);
  const jobs = await (await onRequestGet({ env, request: new Request('https://x/api/submissions?kind=job') } as any)).json() as any;
  t('expired job hidden, link kept', jobs.items.length === 1 && jobs.items[0].link === 'https://example.org/x', jobs);
  t('qa submit short text ok', (await cms({ op: 'submit', kind: 'qa', name: 'सीता', text: 'ओल चिकी किसने बनाई?' })).success === true);
  r = await cms({ op: 'pending', kind: 'qa' }, admin);
  t('qa approve without answer → 400', (await cms({ op: 'approve', kind: 'qa', id: r.pending[0].id }, admin)).status === 400);
  await cms({ op: 'approve', kind: 'qa', id: r.pending[0].id, answer: 'पंडित रघुनाथ मुर्मू ने, 1925 में।' }, admin);
  const qa = await (await onRequestGet({ env, request: new Request('https://x/api/submissions?kind=qa') } as any)).json() as any;
  t('qa published with answer', qa.items[0]?.answer?.includes('रघुनाथ'), qa);
  console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
