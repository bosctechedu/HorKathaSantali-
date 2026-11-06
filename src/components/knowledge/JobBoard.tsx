import React, { useCallback, useEffect, useState } from 'react';
import { Briefcase, ExternalLink, EyeOff, Plus } from 'lucide-react';
import { KHeader, KCard, KNote } from './ui';
import { useAdmin } from '../../context/AdminContext';

type Item = { id: string; place: string; type: string; title: string; text: string; date?: string; link?: string };
const TYPES = ['शिक्षक', 'अनुवादक', 'सरकारी', 'शोध', 'अन्य'];

export const JobBoard: React.FC = () => {
  const { isAdmin: isStaff, role, staffFetch } = useAdmin();
  const isSuper = isStaff && role === 'admin';
  const [items, setItems] = useState<Item[]>([]);
  const blank = { title: '', place: '', type: TYPES[0], date: '', link: '', text: '' };
  const [f, setF] = useState(blank); const [msg, setMsg] = useState('');
  const load = useCallback(() => { fetch('/api/submissions?kind=job', { cache: 'no-cache' }).then((r) => r.json()).then((d) => setItems((d.items || []).sort((a: Item, b: Item) => (a.date || '').localeCompare(b.date || '')))).catch(() => {}); }, []);
  useEffect(() => { load(); }, [load]);
  const post = (b: any) => staffFetch('/api/submissions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'job', ...b }) });
  const add = async (e: React.FormEvent) => { e.preventDefault(); const r = await post({ op: 'post', ...f }); const d = await r.json(); setMsg(r.ok ? '✅ सूचना जुड़ गई' : d.error); if (r.ok) { setF(blank); load(); } };
  const del = async (id: string) => { if (!confirm('पक्का हटाएँ?')) return; await post({ op: 'unpublish', id }); load(); };
  const daysLeft = (d?: string) => d ? Math.ceil((new Date(d + 'T23:59:59+05:30').getTime() - Date.now()) / 86400000) : null;
  const inp = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <KHeader icon={<Briefcase className="w-8 h-8 text-yellow-300" />} title="नौकरी सूचना बोर्ड" sub="संताली शिक्षक, अनुवादक और भाषा से जुड़ी नई भर्तियाँ, अंतिम तारीख़ के साथ। तारीख़ निकलते ही सूचना अपने आप हट जाती है।" grad="from-yellow-800 via-amber-900 to-stone-900" />
      <KCard title={`चालू भर्तियाँ (${items.length})`}>
        {items.length === 0 ? <p className="text-sm text-slate-500">अभी कोई चालू सूचना नहीं है।</p> : (
          <div className="space-y-3">{items.map((s) => { const left = daysLeft(s.date); return (
            <div key={s.id} className="rounded-xl border border-amber-100 bg-amber-50/40 p-3">
              <div className="flex justify-between gap-2 flex-wrap"><p className="font-bold text-slate-800">{s.title} <span className="text-xs font-normal text-slate-500">· {s.type}{s.place ? ` · ${s.place}` : ''}</span></p>
                {s.date && <span className={`text-xs font-black px-2 py-0.5 rounded-full ${left !== null && left <= 7 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>अंतिम तारीख़: {s.date}{left !== null ? ` (${left} दिन बाकी)` : ''}</span>}</div>
              {s.text && <p className="text-sm text-slate-700 whitespace-pre-wrap mt-1">{s.text}</p>}
              <div className="flex gap-3 mt-1">
                {s.link && <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-700 inline-flex items-center gap-1">आधिकारिक सूचना <ExternalLink className="w-3 h-3" /></a>}
                {isSuper && <button onClick={() => del(s.id)} className="text-[11px] font-bold text-rose-600 inline-flex items-center gap-1"><EyeOff className="w-3 h-3" /> हटाएँ</button>}
              </div>
            </div>); })}</div>
        )}
      </KCard>
      {isSuper && (
        <KCard title="🛡️ Admin: नई सूचना जोड़ें" className="border-amber-300">
          <form onSubmit={add} className="grid sm:grid-cols-2 gap-3">
            <input required minLength={3} maxLength={120} placeholder="पद का नाम *" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} className={inp} />
            <input maxLength={80} placeholder="विभाग / संस्था" value={f.place} onChange={(e) => setF({ ...f, place: e.target.value })} className={inp} />
            <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })} className={inp}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
            <label className="text-xs text-slate-500">अंतिम तारीख़ *<input required type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} className={inp} /></label>
            <input type="url" pattern="https://.*" placeholder="आधिकारिक link (https://…)" value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} className={`${inp} sm:col-span-2`} />
            <textarea rows={3} maxLength={4000} placeholder="योग्यता, पद संख्या आदि" value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} className={`${inp} sm:col-span-2`} />
            <div className="flex items-center gap-3"><button className="px-5 py-2 rounded-full bg-amber-600 text-white font-bold text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" /> जोड़ें</button>{msg && <span className="text-sm font-semibold">{msg}</span>}</div>
          </form>
        </KCard>
      )}
      <KNote>आवेदन से पहले हमेशा आधिकारिक वेबसाइट पर सूचना पढ़ें। नौकरी के नाम पर पैसे माँगने वालों से सावधान रहें।</KNote>
    </div>
  );
};
export default JobBoard;
