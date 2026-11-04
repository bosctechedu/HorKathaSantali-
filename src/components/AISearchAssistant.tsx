import React, { useEffect, useRef, useState } from 'react';
import { Bot, Send, Trash2, Globe, Copy, Check, Loader2, ExternalLink, Sparkles } from 'lucide-react';

type Msg = { role: 'user' | 'model'; content: string; sources?: { title: string; uri: string }[]; error?: boolean };

const STORE_KEY = 'hk_ai_chat_history';
const SUGGESTIONS = [
  'सोहराय पर्व क्यों मनाया जाता है?',
  '"धन्यवाद" को संताली में क्या कहते हैं?',
  'हूल 1855 के बारे में संक्षेप में बताइए',
  'Johar का अर्थ और उपयोग समझाइए',
];

// Very small, safe formatter: **bold**, bullet lines, line breaks. No innerHTML.
const renderText = (text: string) =>
  text.split('\n').map((line, i) => {
    const bullet = /^\s*[-*•]\s+/.test(line);
    const clean = line.replace(/^\s*[-*•]\s+/, '').replace(/^#{1,6}\s*/, '');
    const parts = clean.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith('**') && p.endsWith('**') ? <strong key={j}>{p.slice(2, -2)}</strong> : <React.Fragment key={j}>{p}</React.Fragment>
    );
    if (!clean.trim()) return <div key={i} className="h-2" />;
    return bullet ? (
      <div key={i} className="flex gap-2 pl-1"><span className="text-amber-600">•</span><span>{parts}</span></div>
    ) : (
      <div key={i}>{parts}</div>
    );
  });

export const AISearchAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]').slice(-20); } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [webSearch, setWebSearch] = useState(true);
  const [copied, setCopied] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(messages.slice(-20))); } catch { /* storage full */ }
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    if (!navigator.onLine) {
      setMessages((m) => [...m, { role: 'user', content: q }, { role: 'model', content: 'इंटरनेट नहीं है। AI सहायक के लिए ऑनलाइन होना ज़रूरी है।', error: true }]);
      setInput('');
      return;
    }
    const history = messages.filter((m) => !m.error).slice(-6).map(({ role, content }) => ({ role, content }));
    setMessages((m) => [...m, { role: 'user', content: q }]);
    setInput('');
    setLoading(true);
    try {
      const r = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: q, history, webSearch }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.reply) {
        setMessages((m) => [...m, { role: 'model', content: data?.error || 'AI सेवा अभी उपलब्ध नहीं है। थोड़ी देर बाद कोशिश करें।', error: true }]);
      } else {
        setMessages((m) => [...m, { role: 'model', content: data.reply, sources: data.sources || [] }]);
      }
    } catch {
      setMessages((m) => [...m, { role: 'model', content: 'AI सेवा से जुड़ नहीं पाए। कृपया बाद में कोशिश करें।', error: true }]);
    } finally {
      setLoading(false);
    }
  };

  const copy = (i: number, t: string) => {
    navigator.clipboard?.writeText(t).then(() => { setCopied(i); setTimeout(() => setCopied(null), 1500); }).catch(() => {});
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 flex flex-col gap-4 min-h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-300 flex items-center justify-center">
            <Bot className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black text-slate-900">AI सर्च सहायक (AI Search Assistant)</h1>
            <p className="text-xs text-slate-600">संताली भाषा, संस्कृति, अनुवाद और सामान्य ज्ञान · Google Search के साथ</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWebSearch((v) => !v)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition ${webSearch ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-300 text-slate-600'}`}
            title="Google Search grounding"
          >
            <Globe className="w-3.5 h-3.5" /> Web {webSearch ? 'ON' : 'OFF'}
          </button>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700"
            >
              <Trash2 className="w-3.5 h-3.5" /> साफ़ करें
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 space-y-4 overflow-y-auto min-h-[360px] max-h-[62vh]">
        {messages.length === 0 && (
          <div className="text-center py-8 space-y-4">
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-sm text-slate-700 font-semibold">Johar! कुछ भी पूछिए। नीचे से कोई प्रश्न चुन भी सकते हैं।</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-3 py-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-amber-600 text-white whitespace-pre-wrap'
                  : m.error
                  ? 'bg-rose-50 border border-rose-200 text-rose-800'
                  : 'bg-slate-50 border border-slate-200 text-slate-800'
              }`}
            >
              {m.role === 'user' ? m.content : <div className="space-y-1">{renderText(m.content)}</div>}
              {m.role === 'model' && !m.error && (
                <div className="mt-2 pt-2 border-t border-slate-200 flex flex-wrap items-center gap-2">
                  <button onClick={() => copy(i, m.content)} className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800">
                    {copied === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied === i ? 'कॉपी हुआ' : 'कॉपी'}
                  </button>
                  {(m.sources || []).map((s, j) => (
                    <a key={j} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-blue-700 hover:underline max-w-[220px] truncate">
                      <ExternalLink className="w-3 h-3 shrink-0" /> {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" /> सोच रहा है…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="flex items-end gap-2 bg-white border border-slate-200 rounded-2xl p-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 2000))}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          rows={2}
          placeholder="अपना प्रश्न लिखें… (हिन्दी, English या संताली)"
          className="flex-1 resize-none outline-none text-sm px-2 py-1.5 bg-transparent text-slate-900"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold disabled:opacity-40"
        >
          <Send className="w-4 h-4" /> पूछें
        </button>
      </form>
      <p className="text-[11px] text-slate-500 text-center">AI के उत्तर गलत भी हो सकते हैं। संताली शब्दों को शब्दकोश से मिला लें।</p>
    </div>
  );
};
