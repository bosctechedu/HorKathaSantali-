import React, { useCallback, useEffect, useState } from 'react';
import { Users, CalendarDays, Check, X, EyeOff, Send } from 'lucide-react';
import { KHeader, KCard } from './ui';
import { useAdmin } from '../../context/AdminContext';

type Item = { id: string; name: string; place: string; type: string; title: string; text: string; at: string; contact?: string; date?: string };
const CFG = {
  org: { types: ['साहित्यिक', 'सामाजिक', 'छात्र', 'सांस्कृतिक', 'अन्य'], title: 'संगठन का नाम *', text: 'संगठन क्या काम करता है (कम से कम 20 अक्षर) *' },
  event: { types: ['मेला', 'पर्व', 'सेमिनार', 'खेल', 'अन्य'], title: 'कार्यक्रम का नाम *', text: 'कार्यक्रम के बारे में (समय, क्या होगा) *' },
} as const;
type Kind = keyof typeof CFG;
const today = () => new Date().toISOString().slice(0, 10);

export const CommunityBoard: React.FC = () => {
  const { isAdmin: isStaff, role, staffFetch } = useAdmin();
  const isSuper = isStaff && role === 'admin';
  const [tab, setTab] = useState<Kind>('event');
  const [items, setItems] = useState<Item[]>([]);
  const [pending, setPending] = useState<Item[]>([]);
  const blank = { name: '', place: '', type: CFG[tab].types[0] as string, title: '', text: '', contact: '', date: '', website: '' };
  const [f, setF] = useState(blank);
  const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false);

  const load = useCallback(() => { fetch(`/api/submissions?kind=${tab}`, { cache: 'no-cache' }).then((r) => r.json()).then((d) => setItems(d.items || [])).catch(() => {}); }, [tab]);
  const post = (body: any) => staffFetch('/api/submissions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: tab, ...body }) });
  const loadPending = useCallback(async () => { if (!isSuper) return; const r = await post({ op: 'pending' }); if (r.ok) setPending((await r.json()).pending || []); }, [isSuper, tab]); // eslint-disable-line
  useEffect(() => { load(); loadPending(); setF({ ...blank, type: CFG[tab].types[0] }); setMsg(''); }, [tab]); // eslint-disable-line

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg('');
    try {
      const r = await fetch('/api/submissions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ op: 'submit', kind: tab, ...f }) });
      const d = await r.json(); setMsg(d.message || d.error || '');
      if (r.ok) { setF({ ...blank, type: CFG[tab].types[0] }); loadPending(); }
    } catch { setMsg('भेजा नहीं जा सका।'); }
    setBusy(false);
  };
  const act = async (op: string, id: string) => { if (op !== 'approve' && !confirm('पक्का हटाएँ?')) return; await post({ op, id }); load(); loadPending(); };

  const list = tab === 'event'
    ? [...items].sort((a, b) => ((a.date || '') < today()) === ((b.date || '') < today()) ? (a.date || '').localeCompare(b.date || '') : (a.date || '') < today() ? 1 : -1)
    : items;
  const inp = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <KHeader icon={<Users className="w-8 h-8 text-emerald-300" />} title="संगठन और कार्यक्रम" sub="संताल समाज के संगठनों की सूची और आने वाले मेले, पर्व, सेमिनार। आप भी जोड़ सकते हैं; Admin की मंज़ूरी के बाद दिखेगा।" grad="from-emerald-900 via-teal-950 to-slate-900" />
      <div className="flex gap-2 justify-center">
        <button onClick={() => setTab('event')} className={`px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-1 ${tab === 'event' ? 'bg-emerald-600 text-white' : 'bg-white border'}`}><CalendarDays className="w-4 h-4" /> कार्यक्रम</button>
        <button onClick={() => setTab('org')} className={`px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-1 ${tab === 'org' ? 'bg-emerald-600 text-white' : 'bg-white border'}`}><Users className="w-4 h-4" /> संगठन सूची</button>
      </div>

      {isSuper && (
        <KCard title={`🛡️ Admin: मंज़ूरी के लिए (${pending.length})`} className="border-amber-300">
          {pending.length === 0 ? <p className="text-sm text-slate-500">कुछ नया नहीं।</p> : pending.map((s) => (
            <div key={s.id} className="border border-amber-100 rounded-xl p-3 mb-2 bg-amber-50/50">
              <p className="font-bold">{s.title} <span className="text-xs font-normal text-slate-500">· {s.type}{s.date ? ` · ${s.date}` : ''} · {s.place} · भेजा: {s.name}{s.contact ? ` (${s.contact})` : ''}</span></p>
              <p className="text-sm whitespace-pre-wrap">{s.text}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => act('approve', s.id)} className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-600 text-white inline-flex items-center gap-1"><Check className="w-3 h-3" /> मंज़ूर करें</button>
                <button onClick={() => act('reject', s.id)} className="text-xs font-bold px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 inline-flex items-center gap-1"><X className="w-3 h-3" /> हटाएँ</button>
              </div>
            </div>
          ))}
        </KCard>
      )}

      <KCard title={tab === 'event' ? `कार्यक्रम (${list.length})` : `संगठन (${list.length})`}>
        {list.length === 0 ? <p className="text-sm text-slate-500">अभी कुछ नहीं। नीचे से पहला जोड़ें!</p> : (
          <div className="grid md:grid-cols-2 gap-3">
            {list.map((s) => {
              const past = tab === 'event' && (s.date || '') < today();
              return (
                <div key={s.id} className={`rounded-xl border p-3 ${past ? 'opacity-60' : 'border-emerald-100 bg-emerald-50/40'}`}>
                  {s.date && <p className="text-xs font-black text-emerald-700">{s.date}{past ? ' (हो चुका)' : ''}</p>}
                  <p className="font-bold text-slate-800">{s.title} <span className="text-xs font-normal text-slate-500">· {s.type}</span></p>
                  {s.place && <p className="text-xs text-slate-500">📍 {s.place}</p>}
                  <p className="text-sm text-slate-700 whitespace-pre-wrap mt-1">{s.text}</p>
                  {s.contact && <p className="text-xs text-slate-600 mt-1">संपर्क: {s.contact}</p>}
                  {isSuper && <button onClick={() => act('unpublish', s.id)} className="mt-1 text-[11px] font-bold text-rose-600 inline-flex items-center gap-1"><EyeOff className="w-3 h-3" /> हटाएँ</button>}
                </div>
              );
            })}
          </div>
        )}
      </KCard>

      <KCard title={tab === 'event' ? 'कार्यक्रम जोड़ें' : 'संगठन जोड़ें'}>
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
          <input required minLength={2} maxLength={120} placeholder={CFG[tab].title} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} className={inp} />
          <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })} className={inp}>{CFG[tab].types.map((t) => <option key={t}>{t}</option>)}</select>
          {tab === 'event' && <input required type="date" min={today()} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} className={inp} />}
          <input maxLength={60} placeholder="जगह (गाँव / शहर / ज़िला)" value={f.place} onChange={(e) => setF({ ...f, place: e.target.value })} className={inp} />
          <textarea required minLength={20} maxLength={4000} rows={4} placeholder={CFG[tab].text} value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} className={`${inp} sm:col-span-2`} />
          <input required minLength={2} maxLength={60} placeholder="आपका नाम *" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inp} />
          <input maxLength={80} placeholder="सार्वजनिक संपर्क (फ़ोन/email, वैकल्पिक)" value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} className={inp} />
          <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} className="hidden" />
          <div className="sm:col-span-2 flex items-center gap-3 flex-wrap">
            <button disabled={busy} className="px-5 py-2 rounded-full bg-emerald-600 text-white font-bold text-sm inline-flex items-center gap-2 disabled:opacity-60"><Send className="w-4 h-4" /> {busy ? 'भेज रहे हैं…' : 'भेजें'}</button>
            {msg && <span className="text-sm font-semibold text-emerald-700">{msg}</span>}
          </div>
          <p className="sm:col-span-2 text-[11px] text-slate-400">"संपर्क" मंज़ूरी के बाद सबको दिखेगा; केवल वही लिखें जो सार्वजनिक करना चाहते हैं।</p>
        </form>
      </KCard>
    </div>
  );
};
export default CommunityBoard;
