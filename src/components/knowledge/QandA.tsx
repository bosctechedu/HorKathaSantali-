import React, { useCallback, useEffect, useState } from 'react';
import { HelpCircle, Send, Check, X, EyeOff } from 'lucide-react';
import { KHeader, KCard } from './ui';
import { useAdmin } from '../../context/AdminContext';

type Item = { id: string; name: string; place: string; type: string; title: string; text: string; at: string; answer?: string };
const TYPES = ['भाषा', 'लिपि', 'संस्कृति', 'इतिहास', 'अन्य'];

export const QandA: React.FC = () => {
  const { isAdmin: isStaff, role, staffFetch } = useAdmin();
  const isSuper = isStaff && role === 'admin';
  const [items, setItems] = useState<Item[]>([]); const [pending, setPending] = useState<Item[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [f, setF] = useState({ name: '', place: '', type: TYPES[0], text: '', website: '' });
  const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false); const [q, setQ] = useState('');
  const post = (b: any) => staffFetch('/api/submissions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'qa', ...b }) });
  const load = useCallback(() => { fetch('/api/submissions?kind=qa', { cache: 'no-cache' }).then((r) => r.json()).then((d) => setItems(d.items || [])).catch(() => {}); }, []);
  const loadPending = useCallback(async () => { if (!isSuper) return; const r = await post({ op: 'pending' }); if (r.ok) setPending((await r.json()).pending || []); }, [isSuper]); // eslint-disable-line
  useEffect(() => { load(); loadPending(); }, [load, loadPending]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg('');
    try { const r = await fetch('/api/submissions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ op: 'submit', kind: 'qa', ...f }) }); const d = await r.json(); setMsg(r.ok ? 'धन्यवाद! उत्तर मिलने पर आपका प्रश्न यहाँ दिखेगा।' : d.error || ''); if (r.ok) { setF({ ...f, text: '' }); loadPending(); } }
    catch { setMsg('भेजा नहीं जा सका।'); }
    setBusy(false);
  };
  const approve = async (id: string) => { const r = await post({ op: 'approve', id, answer: answers[id] || '' }); if (!r.ok) { alert((await r.json()).error); return; } load(); loadPending(); };
  const remove = async (op: string, id: string) => { if (!confirm('पक्का हटाएँ?')) return; await post({ op, id }); load(); loadPending(); };
  const shown = items.filter((i) => !q.trim() || `${i.text} ${i.answer}`.includes(q.trim()));
  const inp = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-400';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <KHeader icon={<HelpCircle className="w-8 h-8 text-cyan-300" />} title="प्रश्न पूछें" sub="संताली भाषा, ओल चिकी, संस्कृति या इतिहास पर अपना सवाल भेजें। Admin उत्तर लिखकर यहाँ छापेंगे।" grad="from-cyan-900 via-sky-950 to-slate-900" />
      {isSuper && (
        <KCard title={`🛡️ Admin: उत्तर देने बाकी (${pending.length})`} className="border-amber-300">
          {pending.length === 0 ? <p className="text-sm text-slate-500">कोई नया प्रश्न नहीं।</p> : pending.map((s) => (
            <div key={s.id} className="border border-amber-100 rounded-xl p-3 mb-2 bg-amber-50/50 space-y-2">
              <p className="text-sm"><b>प्रश्न:</b> {s.text} <span className="text-xs text-slate-500">· {s.type} · {s.name}{s.place ? `, ${s.place}` : ''}</span></p>
              <textarea rows={3} value={answers[s.id] || ''} onChange={(e) => setAnswers({ ...answers, [s.id]: e.target.value })} placeholder="उत्तर लिखें…" className={inp} />
              <div className="flex gap-2">
                <button onClick={() => approve(s.id)} className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-600 text-white inline-flex items-center gap-1"><Check className="w-3 h-3" /> उत्तर के साथ छापें</button>
                <button onClick={() => remove('reject', s.id)} className="text-xs font-bold px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 inline-flex items-center gap-1"><X className="w-3 h-3" /> हटाएँ</button>
              </div>
            </div>
          ))}
        </KCard>
      )}
      <KCard title={`उत्तर मिले प्रश्न (${items.length})`}>
        {items.length > 3 && <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 प्रश्न खोजें" className={`${inp} mb-3`} />}
        {shown.length === 0 ? <p className="text-sm text-slate-500">अभी कोई उत्तर नहीं। पहला प्रश्न आप पूछें!</p> : (
          <div className="space-y-3">{shown.map((s) => (
            <div key={s.id} className="rounded-xl border border-cyan-100 bg-cyan-50/40 p-3">
              <p className="font-bold text-slate-800">❓ {s.text}</p>
              <p className="text-xs text-slate-500 mb-1">{s.type} · {s.name}{s.place ? `, ${s.place}` : ''}</p>
              <p className="text-sm text-slate-700 whitespace-pre-wrap">💬 {s.answer}</p>
              {isSuper && <button onClick={() => remove('unpublish', s.id)} className="mt-1 text-[11px] font-bold text-rose-600 inline-flex items-center gap-1"><EyeOff className="w-3 h-3" /> हटाएँ</button>}
            </div>
          ))}</div>
        )}
      </KCard>
      <KCard title="अपना प्रश्न भेजें">
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
          <textarea required minLength={10} maxLength={1000} rows={3} placeholder="आपका प्रश्न *" value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} className={`${inp} sm:col-span-2`} />
          <input required minLength={2} maxLength={60} placeholder="आपका नाम *" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inp} />
          <input maxLength={60} placeholder="गाँव / शहर (वैकल्पिक)" value={f.place} onChange={(e) => setF({ ...f, place: e.target.value })} className={inp} />
          <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })} className={inp}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
          <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} className="hidden" />
          <div className="flex items-center gap-3 flex-wrap"><button disabled={busy} className="px-5 py-2 rounded-full bg-cyan-600 text-white font-bold text-sm inline-flex items-center gap-2 disabled:opacity-60"><Send className="w-4 h-4" /> भेजें</button>{msg && <span className="text-sm font-semibold text-cyan-700">{msg}</span>}</div>
          <p className="sm:col-span-2 text-[11px] text-slate-400">उत्तर के साथ आपका नाम और गाँव भी दिखेगा।</p>
        </form>
      </KCard>
    </div>
  );
};
export default QandA;
