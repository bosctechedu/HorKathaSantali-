import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Flag, X, Send, CheckCircle2 } from 'lucide-react';

// "गलती बताएँ" — every quiz question can be reported. The report goes to the site's own submissions
// backend (/api/submissions, kind 'mistake' → Admin sees it under "प्रश्न पूछें" admin panel) and is
// also kept in the same localStorage list the "सुझाव दें" (FeedbackModal) button writes to, so nothing
// is lost when the server is unreachable.
type Props = {
  page: string;
  question: string;
  options?: string[];
  correct?: string;
  className?: string;
  compact?: boolean;
};

const REASONS = ['उत्तर गलत है', 'प्रश्न में गलती', 'विकल्प में गलती / दो सही उत्तर', 'वर्तनी / अनुवाद', 'अन्य'];

export const ReportMistakeButton: React.FC<Props> = ({ page, question, options, correct, className = '', compact }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<'' | 'server' | 'local'>('');
  const [err, setErr] = useState('');

  const close = () => { setOpen(false); setDone(''); setErr(''); setNote(''); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    const text = [
      `पेज: ${page}`,
      `प्रश्न: ${question}`,
      options && options.length ? `विकल्प: ${options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join(' | ')}` : '',
      correct ? `साइट का उत्तर: ${correct}` : '',
      `समस्या: ${reason}`,
      note.trim() ? `विवरण: ${note.trim()}` : '',
      `URL: ${typeof location !== 'undefined' ? location.pathname : ''}`,
    ].filter(Boolean).join('\n');
    // Same local list the "सुझाव दें" button uses
    try {
      const existing = JSON.parse(localStorage.getItem('hor_katha_user_feedbacks') || '[]');
      localStorage.setItem('hor_katha_user_feedbacks', JSON.stringify([{ id: Date.now(), name: name.trim() || 'Anonymous', region: '', category: 'translation_fix', rating: 0, message: text, date: new Date().toISOString() }, ...existing].slice(0, 200)));
    } catch { /* storage full / blocked */ }
    try {
      const r = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ op: 'submit', kind: 'mistake', type: reason, name: name.trim(), title: question.slice(0, 110), text }),
      });
      if (r.ok) setDone('server');
      else {
        let d: any = {};
        try { d = await r.json(); } catch { /* ignore */ }
        if (r.status === 429) setErr(d.error || 'अभी बहुत रिपोर्ट भेजी गईं, थोड़ी देर बाद भेजें।');
        else setDone('local');
      }
    } catch {
      setDone('local');
    }
    setBusy(false);
  };

  const inp = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500 bg-white';

  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        className={`inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-full ${compact ? 'px-1.5 py-1' : 'px-2.5 py-1'} transition cursor-pointer ${className}`}
        title="इस प्रश्न में गलती बताएँ"
        data-report-mistake
      >
        <Flag className="w-3 h-3" />
        {!compact && <span>गलती बताएँ</span>}
      </button>
      {open && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/50" onClick={close} role="dialog" aria-modal="true">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
              <h3 className="font-black text-amber-900 flex items-center gap-2 text-sm"><Flag className="w-4 h-4" /> प्रश्न में गलती बताएँ</h3>
              <button type="button" onClick={close} className="p-1 rounded-full hover:bg-amber-100 text-amber-900" aria-label="बंद करें"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto">
              {done ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <p className="font-black text-slate-800">धन्यवाद! आपकी रिपोर्ट मिल गई।</p>
                  <p className="text-xs text-slate-500">{done === 'server' ? 'Admin इसे जाँचकर प्रश्न सुधारेंगे।' : 'सर्वर से अभी जुड़ नहीं सके — रिपोर्ट इस डिवाइस पर सहेज ली गई है।'}</p>
                  <button type="button" onClick={close} className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold">ठीक है</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3 text-sm">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <p className="text-[10px] font-bold text-slate-400">{page}</p>
                    <p className="font-bold text-slate-800">{question}</p>
                    {correct && <p className="text-emerald-700">साइट का उत्तर: <b>{correct}</b></p>}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {REASONS.map((r) => (
                      <button key={r} type="button" onClick={() => setReason(r)}
                        className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${reason === r ? 'bg-amber-600 border-amber-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{r}</button>
                    ))}
                  </div>
                  <textarea rows={3} maxLength={800} value={note} onChange={(e) => setNote(e.target.value)} placeholder="क्या गलत है? सही उत्तर / सुधार लिखें (वैकल्पिक)" className={inp} />
                  <input maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="आपका नाम (वैकल्पिक)" className={inp} />
                  {err && <p className="text-xs font-bold text-rose-700">{err}</p>}
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={close} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">रद्द करें</button>
                    <button disabled={busy} className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-60"><Send className="w-3.5 h-3.5" /> {busy ? 'भेज रहे…' : 'भेजें'}</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
export default ReportMistakeButton;
