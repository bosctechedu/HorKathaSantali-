import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  ContentData, getData, getKey, getOriginal, hasContent, isSkippable, loadCached,
  reapplyAll, setData, startEngine,
} from './contentEngine';

type Target =
  | { kind: 'text'; node: Text; key: string; orig: string; current: string }
  | { kind: 'add'; id: string; current: string };

type FullEdit = { t: string; del?: boolean; by: string; at: string; orig?: string };
type FullAdd = { id: string; anchor: string; t: string; by: string; at: string };

const btn = 'px-3 py-2 rounded-lg text-xs font-bold transition active:scale-95 disabled:opacity-50';

/** Live Content Editor: सबके लिए server के बदलाव लागू करता है; Admin/Operator के लिए Edit Mode देता है। */
export const LiveContentEditor: React.FC = () => {
  const { isAdmin: isStaff, role, staffFetch } = useAdmin();
  const isSuper = isStaff && role === 'admin';
  const [editOn, setEditOn] = useState(false);
  const [target, setTarget] = useState<Target | null>(null);
  const [text, setText] = useState('');
  const [addText, setAddText] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [panel, setPanel] = useState<null | 'list'>(null);
  const [list, setList] = useState<{ edits: Record<string, FullEdit>; adds: FullAdd[] } | null>(null);
  const [log, setLog] = useState<{ at: string; by: string; role: string; msg: string }[]>([]);
  const hoverEl = useRef<HTMLElement | null>(null);

  // 1) सबके लिए: सहेजे गए बदलाव लाएँ और लागू करें
  useEffect(() => {
    const cached = loadCached();
    if (cached) { setData(cached, false); if (hasContent()) startEngine(); }
    fetch('/api/content', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d || !d.ready) return;
        setData({ edits: d.edits || {}, adds: d.adds || [] });
        if (hasContent()) startEngine(); else if (cached) reapplyAll();
      })
      .catch(() => { /* offline: cache से चलेगा */ });
  }, []);

  useEffect(() => { if (!isStaff) setEditOn(false); }, [isStaff]);

  // 2) Edit Mode: hover outline + click से edit
  useEffect(() => {
    if (!editOn) return;
    startEngine();
    document.documentElement.classList.add('hk-cms-on');
    const clearHover = () => { if (hoverEl.current) { hoverEl.current.style.outline = ''; hoverEl.current = null; } };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el || isSkippable(el) && !el.closest('[data-hk-add]')) return clearHover();
      if (el.closest('[data-hk-cms-ui]')) return clearHover();
      clearHover(); hoverEl.current = el; el.style.outline = '2px dashed #f59e0b';
    };
    const textNodeAt = (e: MouseEvent): Text | null => {
      const d: any = document;
      let n: Node | null = null;
      if (d.caretPositionFromPoint) n = d.caretPositionFromPoint(e.clientX, e.clientY)?.offsetNode ?? null;
      else if (d.caretRangeFromPoint) n = d.caretRangeFromPoint(e.clientX, e.clientY)?.startContainer ?? null;
      const el = e.target as Element;
      if (n && n.nodeType === 3 && el.contains(n) && (n.nodeValue || '').trim()) return n as Text;
      const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let t: Node | null;
      while ((t = tw.nextNode())) if ((t.nodeValue || '').trim() && !isSkippable(t.parentElement)) return t as Text;
      return null;
    };
    const click = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el || el.closest('[data-hk-cms-ui]')) return;
      // Sidebar में सामान्य क्लिक से पेज बदले; Shift/Alt + क्लिक से edit
      if (el.closest('aside') && !e.shiftKey && !e.altKey) return;
      const add = el.closest('[data-hk-add]') as HTMLElement | null;
      if (add) {
        e.preventDefault(); e.stopPropagation();
        const a = getData().adds.find((x) => x.id === add.dataset.hkAdd);
        if (a) open({ kind: 'add', id: a.id, current: a.t });
        return;
      }
      const n = textNodeAt(e);
      if (!n) return;
      e.preventDefault(); e.stopPropagation();
      const orig = getOriginal(n);
      open({ kind: 'text', node: n, key: getKey(n), orig: orig.trim(), current: (n.nodeValue || '').trim() });
    };
    window.addEventListener('mouseover', over, true);
    window.addEventListener('click', click, true);
    return () => {
      clearHover();
      document.documentElement.classList.remove('hk-cms-on');
      window.removeEventListener('mouseover', over, true);
      window.removeEventListener('click', click, true);
    };
  }, [editOn]);

  const open = (t: Target) => { setTarget(t); setText(t.current); setAddText(''); setShowAdd(false); setMsg(''); };
  const close = () => { setTarget(null); setMsg(''); };

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { close(); setPanel(null); } };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  const send = useCallback(async (body: Record<string, unknown>) => {
    setBusy(true); setMsg('');
    try {
      const r = await staffFetch('/api/content', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.success) { setMsg(d.error || `त्रुटि (${r.status})`); return null; }
      if (d.edits && !d.log && body.op !== 'list') { setData({ edits: d.edits, adds: d.adds } as ContentData); reapplyAll(); }
      return d;
    } catch {
      setMsg('नेटवर्क त्रुटि। इंटरनेट जाँचें।'); return null;
    } finally { setBusy(false); }
  }, [staffFetch]);

  const doSave = async () => {
    if (!target) return;
    const ok = target.kind === 'text'
      ? await send({ op: 'edit', key: target.key, text, orig: target.orig })
      : await send({ op: 'update-add', id: target.id, text });
    if (ok) close();
  };
  const doAdd = async () => {
    if (!target) return;
    const anchor = target.kind === 'text' ? target.key : `add:${target.id}`;
    const ok = await send({ op: 'add', anchor, text: addText });
    if (ok) close();
  };
  const doDelete = async () => {
    if (!target || !isSuper) return;
    if (!window.confirm('यह हिस्सा सबके लिए हटेगा। पक्का?')) return;
    const ok = target.kind === 'text'
      ? await send({ op: 'delete', key: target.key, orig: target.orig })
      : await send({ op: 'remove-add', id: target.id });
    if (ok) close();
  };
  const doRestore = async (key: string, orig = '') => {
    const ok = await send({ op: 'restore', key, orig });
    if (ok) { close(); if (panel) loadList(); }
  };
  const loadList = async () => {
    const [l, h] = await Promise.all([send({ op: 'list' }), send({ op: 'history' })]);
    if (l) setList({ edits: l.edits, adds: l.adds });
    if (h) setLog(h.log || []);
  };

  if (!isStaff) return null;

  const edited = target?.kind === 'text' && !!getData().edits[target.key];

  return (
    <div data-hk-cms-ui="1">
      {/* Floating toolbar (bottom-left) */}
      <div className="fixed bottom-5 left-3 sm:bottom-6 sm:left-6 z-[70] flex items-center gap-2">
        <button
          onClick={() => setEditOn((v) => !v)}
          className={`h-11 px-4 rounded-full text-xs font-black shadow-lg border-2 ${editOn ? 'bg-amber-500 text-slate-950 border-amber-200' : 'bg-slate-900/90 text-white border-white/30'}`}
          title="किसी भी लिखावट पर क्लिक करके बदलें"
        >
          ✏️ Edit Mode: {editOn ? 'ON' : 'OFF'}
        </button>
        {isSuper && (
          <button
            onClick={() => { setPanel('list'); loadList(); }}
            className="h-11 px-4 rounded-full text-xs font-black shadow-lg border-2 bg-slate-900/90 text-white border-white/30"
          >
            📜 बदलाव
          </button>
        )}
      </div>
      {editOn && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[70] bg-amber-500 text-slate-950 text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          Edit Mode चालू: किसी भी लिखावट पर क्लिक करें · Sidebar में Shift+क्लिक
        </div>
      )}

      {/* Edit dialog */}
      {target && (
        <div className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-3" onClick={close}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-4 space-y-3 text-slate-800" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm">{target.kind === 'add' ? 'जोड़ा गया पैराग्राफ़' : 'लिखावट बदलें'}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100">{role === 'admin' ? 'Admin' : 'Operator'}</span>
            </div>
            {target.kind === 'text' && target.orig !== target.current && (
              <p className="text-[11px] text-slate-500 bg-slate-50 rounded-lg p-2 max-h-20 overflow-auto"><b>मूल:</b> {target.orig}</p>
            )}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={Math.min(10, Math.max(3, Math.ceil(text.length / 60)))}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              autoFocus
            />
            {showAdd && (
              <textarea
                value={addText}
                onChange={(e) => setAddText(e.target.value)}
                rows={4}
                placeholder="इसके नीचे जुड़ने वाला नया पैराग्राफ़…"
                className="w-full border border-emerald-300 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            )}
            {msg && <p className="text-xs font-bold text-rose-600">{msg}</p>}
            <div className="flex flex-wrap gap-2">
              <button disabled={busy || !text.trim() || text.trim() === target.current} onClick={doSave} className={`${btn} bg-sky-600 text-white`}>💾 Update</button>
              {!showAdd
                ? <button disabled={busy} onClick={() => setShowAdd(true)} className={`${btn} bg-emerald-600 text-white`}>➕ नीचे जोड़ें</button>
                : <button disabled={busy || !addText.trim()} onClick={doAdd} className={`${btn} bg-emerald-600 text-white`}>✅ Add सहेजें</button>}
              {isSuper && <button disabled={busy} onClick={doDelete} className={`${btn} bg-rose-600 text-white`}>🗑️ Delete</button>}
              {isSuper && edited && target.kind === 'text' && (
                <button disabled={busy} onClick={() => doRestore(target.key, target.orig)} className={`${btn} bg-slate-200`}>↩️ मूल पर लौटाएँ</button>
              )}
              <button onClick={close} className={`${btn} bg-slate-100 ml-auto`}>बंद करें</button>
            </div>
            {!isSuper && <p className="text-[10px] text-slate-500">Operator: Add और Update कर सकते हैं। Delete/Restore केवल Admin।</p>}
          </div>
        </div>
      )}

      {/* Admin: बदलाव सूची + इतिहास */}
      {panel === 'list' && isSuper && (
        <div className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-3" onClick={() => setPanel(null)}>
          <div className="w-full max-w-2xl max-h-[85vh] overflow-auto bg-white rounded-2xl shadow-2xl p-4 space-y-4 text-slate-800" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm">📜 सभी बदलाव (Admin)</h3>
              <button onClick={() => setPanel(null)} className={`${btn} bg-slate-100`}>बंद करें</button>
            </div>
            {msg && <p className="text-xs font-bold text-rose-600">{msg}</p>}
            {!list ? <p className="text-xs">लोड हो रहा है…</p> : (
              <>
                <section className="space-y-2">
                  <h4 className="text-xs font-black text-slate-500">बदली / हटाई गई लिखावट ({Object.keys(list.edits).length})</h4>
                  {Object.entries(list.edits).map(([k, e]) => (
                    <div key={k} className="border border-slate-200 rounded-xl p-2 text-xs flex gap-2 items-start">
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-400 truncate">मूल: {e.orig || '—'} · <span className="font-mono">{k.split('|')[0]}</span></p>
                        <p className={e.del ? 'text-rose-600 font-bold' : 'font-semibold'}>{e.del ? '🗑️ हटाया गया' : e.t}</p>
                        <p className="text-[10px] text-slate-400">{e.by} · {e.at.slice(0, 16).replace('T', ' ')} UTC</p>
                      </div>
                      <button disabled={busy} onClick={() => doRestore(k, e.orig)} className={`${btn} bg-slate-200 shrink-0`}>↩️ मूल</button>
                    </div>
                  ))}
                </section>
                <section className="space-y-2">
                  <h4 className="text-xs font-black text-slate-500">जोड़े गए पैराग्राफ़ ({list.adds.length})</h4>
                  {list.adds.map((a) => (
                    <div key={a.id} className="border border-emerald-200 rounded-xl p-2 text-xs flex gap-2 items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold whitespace-pre-line">{a.t}</p>
                        <p className="text-[10px] text-slate-400">{a.by} · {a.at.slice(0, 16).replace('T', ' ')} UTC</p>
                      </div>
                      <button disabled={busy} onClick={async () => { if (window.confirm('यह जोड़ा गया हिस्सा हटाएँ?') && await send({ op: 'remove-add', id: a.id })) loadList(); }} className={`${btn} bg-rose-600 text-white shrink-0`}>🗑️</button>
                    </div>
                  ))}
                </section>
                <section className="space-y-1">
                  <h4 className="text-xs font-black text-slate-500">इतिहास (कौन, कब)</h4>
                  {log.map((l, i) => (
                    <p key={i} className="text-[11px]"><span className="text-slate-400">{l.at.slice(0, 16).replace('T', ' ')} UTC · {l.by} ({l.role})</span> — {l.msg}</p>
                  ))}
                </section>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
