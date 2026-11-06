import React, { useEffect, useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { KHeader, KCard } from './ui';
import { useAdmin } from '../../context/AdminContext';

export const Newsletter: React.FC = () => {
  const { isAdmin: isStaff, role, staffFetch } = useAdmin();
  const isSuper = isStaff && role === 'admin';
  const [email, setEmail] = useState(''); const [hp, setHp] = useState('');
  const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState<{ count: number; last: any } | null>(null);
  const [subject, setSubject] = useState(''); const [body, setBody] = useState(''); const [aMsg, setAMsg] = useState('');
  const post = (b: any) => staffFetch('/api/newsletter', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) });
  const loadStats = async () => { if (!isSuper) return; const r = await post({ op: 'stats' }); if (r.ok) { const d = await r.json(); setStats({ count: d.count, last: d.last ? JSON.parse(d.last) : null }); } };
  useEffect(() => { loadStats(); }, [isSuper]); // eslint-disable-line

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg('');
    try { const r = await fetch('/api/newsletter', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ op: 'subscribe', email, website: hp }) }); const d = await r.json(); setMsg(d.message || d.error || ''); if (r.ok) setEmail(''); }
    catch { setMsg('भेजा नहीं जा सका।'); }
    setBusy(false);
  };
  const send = async () => {
    if (!stats?.count) return;
    if (!confirm(`यह email ${stats.count} लोगों को अभी भेजें?`)) return;
    setBusy(true); setAMsg('');
    const r = await post({ op: 'send', subject, message: body }); const d = await r.json();
    setAMsg(r.ok ? `✅ ${d.sent} लोगों को भेजा गया।` : d.error || 'दिक़्क़त हुई'); if (r.ok) { setSubject(''); setBody(''); loadStats(); }
    setBusy(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <KHeader icon={<Mail className="w-8 h-8 text-blue-300" />} title="हफ़्ते का समाचार-पत्र" sub="नए संताली शब्द, आने वाले कार्यक्रम और पाठकों की रचनाएँ सीधे आपके email पर।" grad="from-blue-900 via-indigo-950 to-slate-900" />
      <KCard title="Email से जुड़ें">
        <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="आपका email" className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
          <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" />
          <button disabled={busy} className="px-5 py-2 rounded-full bg-blue-600 text-white font-bold text-sm disabled:opacity-60">जुड़ें</button>
        </form>
        {msg && <p className="text-sm font-semibold text-blue-700 mt-2">{msg}</p>}
        <p className="text-[11px] text-slate-400 mt-2">आपके email पर पुष्टि-link आएगा। हर email में "सदस्यता बंद करें" का link रहेगा। आपका email किसी और को नहीं दिया जाएगा।</p>
      </KCard>
      {isSuper && (
        <KCard title="🛡️ Admin: समाचार-पत्र भेजें" className="border-amber-300">
          <p className="text-sm text-slate-600 mb-3">पक्के subscriber: <b>{stats?.count ?? '…'}</b>{stats?.last && <> · पिछला: "{stats.last.subject}" ({String(stats.last.at).slice(0, 10)}, {stats.last.sent} को)</>}</p>
          <input value={subject} maxLength={150} onChange={(e) => setSubject(e.target.value)} placeholder="विषय (Subject)" className="w-full border rounded-lg px-3 py-2 text-sm mb-2" />
          <textarea value={body} maxLength={20000} onChange={(e) => setBody(e.target.value)} rows={8} placeholder={'संदेश लिखें। खाली लाइन छोड़ने पर नया पैराग्राफ़ बनेगा।\n\nजैसे: इस हफ़्ते के 5 नए शब्द…'} className="w-full border rounded-lg px-3 py-2 text-sm mb-2" />
          <button disabled={busy || subject.length < 3 || body.length < 10 || !stats?.count} onClick={send} className="px-5 py-2 rounded-full bg-amber-600 text-white font-bold text-sm inline-flex items-center gap-2 disabled:opacity-50"><Send className="w-4 h-4" /> सबको भेजें</button>
          {aMsg && <p className="text-sm font-semibold mt-2">{aMsg}</p>}
          <p className="text-[11px] text-slate-400 mt-2">Email अपने आप नहीं जाता; केवल यह बटन दबाने पर। Brevo के मुफ़्त plan में रोज़ 300 email की सीमा है।</p>
        </KCard>
      )}
    </div>
  );
};
export default Newsletter;
