import React, { useCallback, useEffect, useState } from 'react';
import { PenLine, Send, Check, X, EyeOff } from 'lucide-react';
import { KHeader, KCard } from './ui';
import { useAdmin } from '../../context/AdminContext';

type Sub = { id: string; name: string; place: string; type: string; title: string; text: string; at: string };
const TYPES = ['कविता', 'कहानी', 'लेख', 'गीत'];

export const ReaderSubmissions: React.FC = () => {
  const { isAdmin: isStaff, role, staffFetch } = useAdmin();
  const isSuper = isStaff && role === 'admin';
  const [items, setItems] = useState<Sub[]>([]);
  const [form, setForm] = useState({ name: '', place: '', type: 'कविता', title: '', text: '', website: '' });
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState<Sub[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch('/api/submissions', { cache: 'no-cache' }).then((r) => r.json()).then((d) => setItems(d.items || [])).catch(() => {});
  }, []);
  const loadPending = useCallback(async () => {
    if (!isSuper) return;
    const r = await staffFetch('/api/submissions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ op: 'pending' }) });
    if (r.ok) { const d = await r.json(); setPending(d.pending || []); }
  }, [isSuper, staffFetch]);
  useEffect(load, [load]);
  useEffect(() => { loadPending(); }, [loadPending]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg('');
    try {
      const r = await fetch('/api/submissions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ op: 'submit', ...form }) });
      const d = await r.json();
      setMsg(d.message || d.error || '');
      if (r.ok) { setForm({ name: '', place: '', type: 'कविता', title: '', text: '', website: '' }); loadPending(); }
    } catch { setMsg('भेजा नहीं जा सका। इंटरनेट जाँचें।'); }
    setBusy(false);
  };
  const act = async (op: string, id: string) => {
    if ((op === 'reject' || op === 'unpublish') && !confirm(op === 'reject' ? 'यह रचना हटाएँ?' : 'साइट से हटाएँ?')) return;
    await staffFetch('/api/submissions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ op, id }) });
    load(); loadPending();
  };
  const inp = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <KHeader icon={<PenLine className="w-8 h-8 text-pink-300" />} title="आपकी रचना" sub="अपनी संताली या हिन्दी कविता, कहानी, गीत या लेख भेजें। Admin की मंज़ूरी के बाद वह यहाँ सबको दिखेगी।" grad="from-pink-900 via-rose-950 to-slate-900" />

      {isSuper && (
        <KCard title={`🛡️ Admin: मंज़ूरी के लिए (${pending.length})`} className="border-amber-300">
          {pending.length === 0 ? <p className="text-sm text-slate-500">कोई नई रचना नहीं।</p> : (
            <div className="space-y-3">
              {pending.map((s) => (
                <div key={s.id} className="border border-amber-100 rounded-xl p-3 bg-amber-50/50">
                  <p className="font-bold text-slate-800">{s.title} <span className="text-xs font-normal text-slate-500">· {s.type} · {s.name}{s.place ? `, ${s.place}` : ''}</span></p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap mt-1">{s.text}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => act('approve', s.id)} className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-600 text-white inline-flex items-center gap-1"><Check className="w-3 h-3" /> मंज़ूर करें</button>
                    <button onClick={() => act('reject', s.id)} className="text-xs font-bold px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 inline-flex items-center gap-1"><X className="w-3 h-3" /> हटाएँ</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </KCard>
      )}

      <KCard title="रचना भेजें">
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
          <input required minLength={2} maxLength={60} placeholder="आपका नाम *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} />
          <input maxLength={60} placeholder="गाँव / शहर" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} className={inp} />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inp}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
          <input required minLength={2} maxLength={120} placeholder="शीर्षक *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inp} />
          <textarea required minLength={20} maxLength={4000} rows={7} placeholder="अपनी रचना यहाँ लिखें (कम से कम 20 अक्षर) *" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className={`${inp} sm:col-span-2`} />
          <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" />
          <div className="sm:col-span-2 flex items-center gap-3 flex-wrap">
            <button disabled={busy} className="px-5 py-2 rounded-full bg-indigo-600 text-white font-bold text-sm inline-flex items-center gap-2 disabled:opacity-60"><Send className="w-4 h-4" /> {busy ? 'भेज रहे हैं…' : 'भेजें'}</button>
            <span className="text-xs text-slate-500">{form.text.length}/4000</span>
            {msg && <span className="text-sm font-semibold text-indigo-700">{msg}</span>}
          </div>
          <p className="sm:col-span-2 text-[11px] text-slate-400">केवल अपनी लिखी रचना भेजें। भेजने का मतलब है कि आप Hor Katha को इसे आपके नाम के साथ साइट पर दिखाने की अनुमति देते हैं।</p>
        </form>
      </KCard>

      <KCard title={`पाठकों की रचनाएँ (${items.length})`}>
        {items.length === 0 ? <p className="text-sm text-slate-500">अभी कोई रचना नहीं। पहली रचना आपकी हो सकती है!</p> : (
          <div className="space-y-3">
            {items.map((s) => (
              <article key={s.id} className="border border-slate-100 rounded-xl p-4">
                <button onClick={() => setOpen(open === s.id ? null : s.id)} className="text-left w-full">
                  <p className="font-bold text-slate-800">{s.title}</p>
                  <p className="text-xs text-slate-500">{s.type} · {s.name}{s.place ? `, ${s.place}` : ''} · {s.at.slice(0, 10)}</p>
                </button>
                <p className={`text-sm text-slate-700 whitespace-pre-wrap mt-2 ${open === s.id ? '' : 'line-clamp-3'}`}>{s.text}</p>
                {isSuper && <button onClick={() => act('unpublish', s.id)} className="mt-2 text-[11px] font-bold text-rose-600 inline-flex items-center gap-1"><EyeOff className="w-3 h-3" /> साइट से हटाएँ</button>}
              </article>
            ))}
          </div>
        )}
      </KCard>
    </div>
  );
};
export default ReaderSubmissions;
