import React, { useCallback, useEffect, useState } from 'react';
import { Flag, Check, X } from 'lucide-react';
import { KCard } from './ui';
import { useAdmin } from '../../context/AdminContext';

// Admin: क्विज़ प्रश्नों पर आई "गलती बताएँ" रिपोर्ट (kind 'mistake'). 'सुधार हो गया' = resolved सूची में जाती है।
type Item = { id: string; name: string; type: string; title: string; text: string; at: string };

export const MistakeReportsAdmin: React.FC = () => {
  const { isAdmin: isStaff, role, staffFetch } = useAdmin();
  const isSuper = isStaff && role === 'admin';
  const [pending, setPending] = useState<Item[]>([]);
  const post = (b: any) => staffFetch('/api/submissions', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'mistake', ...b }) });
  const load = useCallback(async () => {
    if (!isSuper) return;
    try { const r = await post({ op: 'pending' }); if (r.ok) setPending((await r.json()).pending || []); } catch { /* offline */ }
  }, [isSuper]); // eslint-disable-line
  useEffect(() => { load(); }, [load]);
  if (!isSuper) return null;
  const act = async (op: 'approve' | 'reject', id: string) => { await post({ op, id }); load(); };
  return (
    <KCard title={`🛡️ Admin: क्विज़ "गलती बताएँ" रिपोर्ट (${pending.length})`} className="border-rose-200">
      {pending.length === 0 ? <p className="text-sm text-slate-500">कोई नई रिपोर्ट नहीं।</p> : pending.map((s) => (
        <div key={s.id} className="border border-rose-100 rounded-xl p-3 mb-2 bg-rose-50/40 space-y-2">
          <p className="text-xs text-slate-500 flex items-center gap-1"><Flag className="w-3 h-3 text-rose-600" /> {s.type} · {s.name} · {new Date(s.at).toLocaleString('hi-IN')}</p>
          <pre className="text-xs whitespace-pre-wrap font-sans text-slate-800">{s.text}</pre>
          <div className="flex gap-2">
            <button onClick={() => act('approve', s.id)} className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-600 text-white inline-flex items-center gap-1"><Check className="w-3 h-3" /> सुधार हो गया</button>
            <button onClick={() => act('reject', s.id)} className="text-xs font-bold px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 inline-flex items-center gap-1"><X className="w-3 h-3" /> हटाएँ</button>
          </div>
        </div>
      ))}
    </KCard>
  );
};
export default MistakeReportsAdmin;
