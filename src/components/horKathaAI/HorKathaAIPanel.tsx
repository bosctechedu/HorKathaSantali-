// Chat card of the floating "Hor Katha AI सहायक" — ported from EDISAM's floating AI assistant
// (header with avatar upload, share/clear/close, chat bubbles with time + copy + share, thinking dots,
// suggested prompts, voice input, send). Merged with the old Hor Katha "AI Search Assistant":
// Gemini answers through /api/ai-chat (key stays on the server), Google Search on/off, source links,
// saved history, offline/AI-off handling and local site search with buttons that open modules.
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Sparkles, Share2, Trash2, X, Bot, User, Check, Copy, Loader2, CircleHelp, Send, Mic, MicOff,
  Globe, ExternalLink, ArrowRight, BookOpen, Landmark, LayoutGrid,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import type { ActiveDesktopTab } from '../../types';
import { AI_NAME } from './shared';
import { searchSite, type SiteHit } from './siteSearch';

type Source = { title: string; uri: string };
type Msg = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: Source[];
  links?: SiteHit[];
  error?: boolean;
};

const STORE_KEY = 'horkatha_ai_chat';
const OLD_STORE_KEY = 'hk_ai_chat_history'; // old AI Search Assistant tab history (migrated once)
const WEB_KEY = 'horkatha_ai_websearch';

// EDISAM suggested prompts (+ the old Hor Katha assistant's Santali word / Johar prompts)
const SUGGESTIONS = [
  { text: 'संताली संस्कृति और त्योहार', desc: 'Culture & Festivals' },
  { text: 'पंडित रघुनाथ मुर्मू कौन थे?', desc: 'About Gurugomke' },
  { text: 'संताली देवनागरी शब्द सीखें', desc: 'Vocabulary & Phrases' },
  { text: 'Santhal Hool (1855) का इतिहास', desc: 'Historical Revolution' },
  { text: 'मुझे एक प्रेरक विचार बताओ', desc: 'Motivational Quote' },
  { text: '"धन्यवाद" को संताली में क्या कहते हैं?', desc: 'Word Meaning' },
  { text: 'Johar का अर्थ और उपयोग समझाइए', desc: 'Greetings' },
];

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const welcomeMessage = (): Msg => ({
  id: 'welcome',
  role: 'assistant',
  content: `जोहार! 🙏 मैं **${AI_NAME}** - BOSC Tech & Edu का आपका डिजिटल सहायक हूँ। 

मैं संताली संस्कृति, त्योहारों, इतिहास, महापुरुषों (जैसे गुरुदेव पंडित रघुनाथ मुर्मू, सिद्धू-कान्हू), संताली देवनागरी शब्दकोश और आपके किसी भी शैक्षिक विषयों के प्रश्नों का उत्तर दे सकता हूँ। साइट का कोई भी मॉड्यूल खोजकर भी खोल सकता हूँ।

आज मैं आपकी क्या सहायता करूँ? / How can I help you today?`,
  timestamp: now(),
});

const loadMessages = (): Msg[] => {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr) && arr.length) return arr.slice(-30);
    }
    // One-time migration of the old AI Search Assistant history
    const old = JSON.parse(localStorage.getItem(OLD_STORE_KEY) || '[]');
    if (Array.isArray(old) && old.length) {
      const migrated: Msg[] = [
        welcomeMessage(),
        ...old.slice(-20).map((m: any, i: number) => ({
          id: `old_${i}`,
          role: m?.role === 'user' ? ('user' as const) : ('assistant' as const),
          content: String(m?.content || ''),
          timestamp: '',
          sources: Array.isArray(m?.sources) ? m.sources : undefined,
          error: !!m?.error,
        })),
      ];
      localStorage.removeItem(OLD_STORE_KEY);
      return migrated;
    }
  } catch { /* ignore broken storage */ }
  return [welcomeMessage()];
};

// ---------- Voice input button (port of EDISAM's voice search button) ----------
const VoiceInputButton: React.FC<{ onResult: (t: string) => void; lang?: string }> = ({ onResult, lang = 'hi-IN' }) => {
  const [listening, setListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState(lang);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<any>(null);

  useEffect(() => () => { try { recRef.current?.stop(); } catch { /* noop */ } }, []);

  const start = () => {
    setError(null);
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError('आपका ब्राउज़र वॉयस रिकग्निशन (Voice Search) का समर्थन नहीं करता है।');
      setTimeout(() => setError(null), 3500);
      return;
    }
    try {
      recRef.current?.stop();
      const rec = new SR();
      recRef.current = rec;
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = voiceLang;
      rec.onstart = () => { setListening(true); setTranscript(''); };
      rec.onresult = (e: any) => {
        let t = '';
        for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript;
        setTranscript(t);
        onResult(t);
        if (e.results[0].isFinal) setListening(false);
      };
      rec.onerror = (e: any) => {
        setListening(false);
        setError(
          e?.error === 'no-speech' ? 'कोई आवाज़ नहीं सुनी गई। कृपया पुनः प्रयास करें।'
            : e?.error === 'not-allowed' ? 'माइक्रोफ़ोन अनुमति (Microphone Permission) अस्वीकृत।'
            : 'वॉयस सर्च त्रुटि। पुनः प्रयास करें।',
        );
        setTimeout(() => setError(null), 3500);
      };
      rec.onend = () => setListening(false);
      rec.start();
    } catch {
      setListening(false);
    }
  };
  const stop = () => { try { recRef.current?.stop(); } catch { /* noop */ } setListening(false); };

  return (
    <div className="relative inline-flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => (listening ? stop() : start())}
        title={listening ? 'वॉयस रिकॉर्डिंग रोकें' : 'बोलकर खोजें / Voice Search'}
        className={`relative flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 cursor-pointer p-2 text-sm ${
          listening
            ? 'bg-red-600 text-white shadow-lg shadow-red-500/30 animate-pulse ring-4 ring-red-200'
            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 hover:shadow'
        }`}
      >
        {listening ? <MicOff className="w-4 h-4 text-white animate-bounce" /> : <Mic className="w-4 h-4 text-emerald-700" />}
      </button>
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full right-0 mb-2 z-50 bg-slate-900 text-white p-3 rounded-2xl shadow-2xl border border-emerald-500 w-64 text-left select-none"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">बोलिए... (Listening)</span>
              </div>
              <select
                value={voiceLang}
                onChange={(e) => setVoiceLang(e.target.value)}
                className="bg-slate-800 text-slate-200 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-700 focus:outline-none"
              >
                <option value="hi-IN">हिन्दी (Hindi)</option>
                <option value="en-IN">English</option>
                <option value="bn-IN">संताली/बांला</option>
              </select>
            </div>
            <p className="text-xs text-slate-300 bg-slate-800/80 p-2 rounded-xl italic min-h-[36px] line-clamp-2 border border-slate-700/60">
              {transcript || 'बोलना शुरू करें, यहाँ टाइप होगा...'}
            </p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1 text-emerald-400"><Sparkles className="w-3 h-3" /> स्पोकन वॉइस टेक</span>
              <button type="button" onClick={stop} className="text-red-400 hover:underline font-bold">रद्द करें</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full right-0 mb-1 z-50 bg-red-950 text-red-200 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-red-800 shadow-xl whitespace-nowrap"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------- EDISAM's markdown-lite renderer (headings, > quotes, bullets, **bold**) ----------
const renderContent = (text: string, isUser = false) =>
  text.split('\n').map((line, idx) => {
    let s = line;
    const isQuote = s.trim().startsWith('>');
    if (isQuote) s = s.trim().replace(/^>\s*/, '');
    const isHeading = s.trim().startsWith('#');
    if (isHeading) s = s.trim().replace(/^#+\s*/, '');
    const isBullet = s.trim().startsWith('* ') || s.trim().startsWith('- ');
    if (isBullet) s = s.trim().replace(/^[*-]\s*/, '');
    const parts = s.split(/(\*\*[^*]+\*\*)/g).map((p, k) => {
      if (p.startsWith('**') && p.endsWith('**')) {
        const inner = p.slice(2, -2);
        return isUser ? (
          <strong key={k} className="font-extrabold text-white underline decoration-amber-300">{inner}</strong>
        ) : (
          <strong key={k} className="font-extrabold text-slate-950 bg-amber-100/90 text-amber-950 px-1.5 py-0.5 rounded border border-amber-300/80 inline-block my-0.5">{inner}</strong>
        );
      }
      return <React.Fragment key={k}>{p}</React.Fragment>;
    });
    if (isHeading)
      return (
        <h4 key={idx} className="font-black text-slate-950 text-xs sm:text-sm mt-3 mb-1 pt-1 border-b border-rose-200 flex items-center gap-1.5 select-text">
          <span className="text-rose-600 font-bold">❖</span>
          <span>{parts}</span>
        </h4>
      );
    if (isQuote)
      return (
        <blockquote key={idx} className="my-2 pl-3 py-1.5 border-l-4 border-amber-500 bg-amber-50/90 rounded-r-xl text-slate-900 font-bold text-xs sm:text-sm shadow-2xs select-text">
          {parts}
        </blockquote>
      );
    if (isBullet)
      return (
        <div key={idx} className={`flex items-start gap-1.5 my-1 font-medium select-text ${isUser ? 'text-white' : 'text-slate-900'}`}>
          <span className={`font-extrabold shrink-0 mt-0.5 ${isUser ? 'text-amber-200' : 'text-rose-600'}`}>•</span>
          <span className="flex-1">{parts}</span>
        </div>
      );
    return (
      <span key={idx} className={`block min-h-[0.5rem] my-0.5 font-medium leading-relaxed select-text ${isUser ? 'text-white' : 'text-slate-900'}`}>
        {parts}
      </span>
    );
  });

interface PanelProps {
  onClose: () => void;
  avatar: string;
  onAvatarChange: (src: string) => void;
  onNavigateTab: (tab: ActiveDesktopTab) => void;
  pendingPrompt?: string | null;
  onPromptConsumed?: () => void;
}

const HorKathaAIPanel: React.FC<PanelProps> = ({ onClose, avatar, onAvatarChange, onNavigateTab, pendingPrompt, onPromptConsumed }) => {
  const { words } = useAdmin();
  const [messages, setMessages] = useState<Msg[]>(loadMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
  const [webSearch, setWebSearch] = useState<boolean>(() => {
    try { return localStorage.getItem(WEB_KEY) !== 'off'; } catch { return true; }
  });
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const save = (list: Msg[]) => {
    setMessages(list);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(-30))); } catch { /* storage full */ }
  };

  // Is Gemini configured on the server? (GET /api/ai-chat → { aiAvailable })
  useEffect(() => {
    let alive = true;
    fetch('/api/ai-chat', { method: 'GET' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d && typeof d.aiAvailable === 'boolean') setAiAvailable(d.aiAvailable); })
      .catch(() => { /* unknown: still try POST */ });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const toggleWeb = () => {
    setWebSearch((v) => {
      try { localStorage.setItem(WEB_KEY, v ? 'off' : 'on'); } catch { /* noop */ }
      return !v;
    });
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result;
      if (typeof src === 'string') onAvatarChange(src);
    };
    reader.readAsDataURL(f);
    e.target.value = '';
  };

  /** Local answer from the site index (dictionary words + modules), used when AI is off or offline. */
  const localAnswer = (q: string, reason: 'off' | 'offline' | 'error') => {
    const { pages, words: wordHits } = searchSite(q, words);
    const head =
      reason === 'offline'
        ? '📡 इंटरनेट नहीं है, इसलिए AI उत्तर अभी नहीं मिल सकता।'
        : reason === 'off'
        ? 'जोहार! 🙏 AI सहायक अभी शुरू नहीं हुआ है — जल्द ही चालू होगा।'
        : '⚠️ AI सेवा से अभी उत्तर नहीं मिला। कृपया थोड़ी देर बाद पुनः प्रयास करें।';
    const lines: string[] = [head, ''];
    if (wordHits.length) {
      lines.push('### शब्दकोश में मिला');
      for (const h of wordHits) {
        const w = h.word;
        lines.push(`- **${w.wordDevanagari}** (${w.wordRoman}) — ${w.meaningHindi} · ${w.meaningEnglish}`);
      }
      lines.push('');
    }
    if (pages.length) {
      lines.push('नीचे दिए बटन से संबंधित मॉड्यूल खोलें:');
    } else if (!wordHits.length) {
      lines.push('तब तक आप 10,000+ शब्दकोश, अनुवादक, कीबोर्ड और सभी मॉड्यूल का उपयोग कर सकते हैं। ऊपर की खोज (Ctrl+K) से भी कुछ भी ढूँढ सकते हैं।');
    }
    const links: SiteHit[] = [...wordHits.map(({ word: _w, ...rest }) => rest), ...pages].slice(0, 6);
    if (!links.length) {
      links.push(
        { id: 'mod-dict', kind: 'module', title: 'Santali Dictionary (10,000+ Words)', subtitle: '', targetTab: 'dashboard' },
        { id: 'mod-trans', kind: 'module', title: 'Multilingual Translator', subtitle: '', targetTab: 'translator' },
      );
    }
    return { content: lines.join('\n').trim(), links };
  };

  const send = async (raw: string) => {
    const q = raw.trim().slice(0, 2000);
    if (!q || loading) return;
    const userMsg: Msg = { id: 'user_' + Date.now(), role: 'user', content: q, timestamp: now() };
    const list = [...messagesRef.current, userMsg];
    save(list);
    setInput('');

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const { content, links } = localAnswer(q, 'offline');
      save([...list, { id: 'local_' + Date.now(), role: 'assistant', content, links, timestamp: now() }]);
      return;
    }
    if (aiAvailable === false) {
      const { content, links } = localAnswer(q, 'off');
      save([...list, { id: 'local_' + Date.now(), role: 'assistant', content, links, timestamp: now() }]);
      return;
    }

    setLoading(true);
    try {
      const history = list
        .slice(0, -1)
        .filter((m) => m.id !== 'welcome' && !m.error && m.content)
        .slice(-12)
        .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', content: m.content }));
      const r = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, history, webSearch }),
      });
      const data: any = await r.json().catch(() => ({}));
      if (data?.isFallback) {
        setAiAvailable(false);
        const { content, links } = localAnswer(q, 'off');
        save([...list, { id: 'local_' + Date.now(), role: 'assistant', content, links, timestamp: now() }]);
        return;
      }
      if (!r.ok || typeof data?.reply !== 'string') {
        const { content, links } = localAnswer(q, 'error');
        const msg = data?.error ? `⚠️ ${data.error}\n\n${content.split('\n').slice(1).join('\n')}`.trim() : content;
        save([...list, { id: 'err_' + Date.now(), role: 'assistant', content: msg, links, error: true, timestamp: now() }]);
        return;
      }
      const { pages, words: wordHits } = searchSite(q, words, 3);
      const links: SiteHit[] = [...wordHits.map(({ word: _w, ...rest }) => rest), ...pages].slice(0, 4);
      save([
        ...list,
        {
          id: 'assistant_' + Date.now(),
          role: 'assistant',
          content: data.reply || 'क्षमा करें, मैं इस समय उत्तर देने में असमर्थ हूँ। कृपया पुनः प्रयास करें।',
          sources: Array.isArray(data.sources) ? data.sources.slice(0, 6) : [],
          links,
          timestamp: now(),
        },
      ]);
    } catch {
      const { links } = localAnswer(q, 'error');
      save([
        ...list,
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: '⚠️ सर्वर कनेक्शन में समस्या है। कृपया सुनिश्चित करें कि इंटरनेट सक्रिय है और पुनः प्रयास करें। / Connection issue. Please check your internet and try again.',
          links,
          error: true,
          timestamp: now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // A question handed over from elsewhere on the site (openHorKathaAI(prompt))
  useEffect(() => {
    if (pendingPrompt) {
      onPromptConsumed?.();
      void send(pendingPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingPrompt]);

  const clearChat = () => {
    if (window.confirm('क्या आप पूरी बातचीत को हटाना चाहते हैं? / Clear conversation history?')) {
      try { localStorage.removeItem(STORE_KEY); } catch { /* noop */ }
      save([welcomeMessage()]);
    }
  };

  const copyMsg = (id: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const shareMsg = (text: string) => {
    if (navigator.share) navigator.share({ title: `${AI_NAME} Reply`, text }).catch(() => {});
    else {
      navigator.clipboard?.writeText(text).catch(() => {});
      alert('उत्तर कॉपी कर लिया गया है! (Copied to clipboard for sharing)');
    }
  };

  const shareChat = () => {
    const text = messages
      .map((m) => `[${m.role === 'user' ? 'आप' : AI_NAME}]:\n${m.content}`)
      .join('\n\n-------------------------\n\n');
    if (navigator.share) navigator.share({ title: `${AI_NAME} Chat`, text }).catch(() => {});
    else {
      navigator.clipboard?.writeText(text).catch(() => {});
      alert('पूरी बातचीत क्लिपबोर्ड पर कॉपी हो गई है! (Entire chat copied to clipboard)');
    }
  };

  const openLink = (h: SiteHit) => {
    if (!h.targetTab) return;
    onNavigateTab(h.targetTab);
    onClose();
  };

  return (
    <motion.div
      id="ai-assistant-card"
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 30 }}
      transition={{ type: 'spring', duration: 0.4 }}
      className="w-[calc(100vw-1.5rem)] sm:w-[410px] h-[520px] max-h-[calc(100vh-7rem)] bg-white border-2 border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900"
    >
      <input type="file" ref={fileRef} onChange={onFile} accept="image/*" className="hidden" />

      {/* Header */}
      <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 border-b border-rose-400/30 flex items-center justify-between text-white shadow-sm cursor-default select-none">
        <div className="flex items-center gap-3 min-w-0">
          <div
            onClick={() => fileRef.current?.click()}
            className="relative group cursor-pointer w-11 h-11 rounded-full border-2 border-white p-[1px] bg-slate-100 overflow-hidden shrink-0 shadow-md"
            title="फोटो बदलें / Upload Photo"
          >
            <img src={avatar} alt="Hor Katha AI Assistant" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-full group-hover:opacity-80 transition" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-[9px] font-bold text-white uppercase text-center leading-none">बदलें</div>
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-black text-white flex items-center gap-1.5 leading-none whitespace-nowrap">
              {AI_NAME} <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-2 h-2 rounded-full animate-pulse ${aiAvailable === false ? 'bg-amber-300' : 'bg-emerald-300'}`} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${aiAvailable === false ? 'text-amber-100' : 'text-emerald-100'}`}>
                {aiAvailable === false ? 'साइट खोज मोड' : 'ऑनलाइन 24x7'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={toggleWeb}
            className={`p-1.5 hover:bg-white/20 rounded-xl transition cursor-pointer ${webSearch ? 'text-white' : 'text-white/45'}`}
            title={`Google Search ${webSearch ? 'ON' : 'OFF'} (वेब खोज ${webSearch ? 'चालू' : 'बंद'})`}
            aria-pressed={webSearch}
          >
            <Globe className="w-4 h-4" />
          </button>
          <button onClick={shareChat} className="p-1.5 hover:bg-white/20 rounded-xl text-white/90 hover:text-white transition cursor-pointer" title="पूरी बातचीत शेयर करें (Share Conversation)">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={clearChat} className="p-1.5 hover:bg-white/20 rounded-xl text-white/90 hover:text-white transition cursor-pointer" title="बातचीत मिटाएं / Clear chat">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-xl text-white/90 hover:text-white transition cursor-pointer" title="बंद करें / Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {aiAvailable === false && (
        <div className="px-4 py-1.5 bg-amber-50 border-b border-amber-200 text-[10px] sm:text-[11px] font-bold text-amber-900 select-none">
          AI सहायक जल्द चालू होगा। तब तक शब्दकोश और साइट खोज यहीं काम कर रही है।
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/80 scrollbar-thin scrollbar-thumb-slate-300 select-text cursor-text">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 max-w-[90%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div
              className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs shadow-2xs select-none ${
                m.role === 'assistant' ? 'bg-rose-100 border border-rose-200 text-rose-700' : 'bg-amber-100 border border-amber-200 text-amber-800'
              }`}
            >
              {m.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <div
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs select-text ${
                  m.role === 'assistant'
                    ? m.error
                      ? 'bg-rose-50 border border-rose-200 text-slate-900 font-medium'
                      : 'bg-white border border-slate-200 text-slate-900 font-medium'
                    : 'bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 text-white rounded-tr-none font-semibold'
                }`}
              >
                {renderContent(m.content, m.role === 'user')}

                {/* Site search results → open the module */}
                {m.role === 'assistant' && !!m.links?.length && (
                  <div className="mt-2 pt-2 border-t border-slate-200 flex flex-col gap-1.5 select-none">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">साइट पर खोलें / Open on site</span>
                    {m.links.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => openLink(h)}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 transition cursor-pointer flex items-center gap-2"
                      >
                        {h.kind === 'word' ? (
                          <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        ) : h.kind === 'culture' ? (
                          <Landmark className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        ) : (
                          <LayoutGrid className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        )}
                        <span className="flex-1 min-w-0">
                          <span className="block text-[11px] font-extrabold text-slate-900 truncate">
                            {h.kind === 'word' && h.devanagari ? `${h.devanagari} (${h.title})` : h.title}
                          </span>
                          {h.subtitle && <span className="block text-[10px] text-slate-500 truncate">{h.subtitle}</span>}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Google Search sources (Gemini grounding) */}
                {m.role === 'assistant' && !!m.sources?.length && (
                  <div className="mt-2 pt-2 border-t border-slate-200 flex flex-wrap gap-x-3 gap-y-1 select-none">
                    {m.sources.map((s, j) => (
                      <a key={j} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-blue-700 hover:underline max-w-[200px] truncate">
                        <ExternalLink className="w-3 h-3 shrink-0" /> {s.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className={`flex items-center gap-2 px-1 select-none ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.timestamp && <span className="text-[9px] text-slate-400 font-bold">{m.timestamp}</span>}
                <button
                  onClick={() => copyMsg(m.id, m.content)}
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                  title="कॉपी करें (Copy)"
                >
                  {copiedId === m.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-[9px] text-emerald-600 font-extrabold">कॉपी हुआ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="text-[9px]">कॉपी</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => shareMsg(m.content)}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition cursor-pointer flex items-center justify-center"
                  title="शेयर करें (Share Message)"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 max-w-[85%] select-none">
            <div className="w-7 h-7 rounded-lg shrink-0 bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center shadow-2xs">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-600 flex items-center gap-2 shadow-2xs">
              <span className="font-bold animate-pulse text-rose-600">Hor Katha AI सोच रहा है</span>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce" />
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length <= 2 && !loading && (
        <div className="px-4 py-2.5 bg-white border-t border-slate-200 select-none">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5 flex items-center gap-1">
            <CircleHelp className="w-3.5 h-3.5 text-rose-500" /> तुरंत पूछें / Suggested Prompts:
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-[90px] overflow-y-auto">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => send(s.text)}
                className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-800 hover:text-rose-900 rounded-xl transition cursor-pointer text-left shadow-2xs"
              >
                {s.text} <span className="text-[9px] text-slate-500 font-medium font-sans">({s.desc})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center select-none"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 2000))}
          disabled={loading}
          placeholder="यहाँ अपना सवाल लिखें... / Type message..."
          className="flex-grow min-w-0 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium disabled:opacity-55 shadow-inner select-text"
        />
        <VoiceInputButton onResult={(t) => setInput(t.slice(0, 2000))} lang="hi-IN" />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="w-10 h-10 shrink-0 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 hover:opacity-95 disabled:bg-slate-200 disabled:from-slate-200 disabled:to-slate-200 text-white rounded-2xl flex items-center justify-center transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
          title="भेजें / Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      <p className="px-3 pb-1.5 -mt-1 bg-white text-[9px] text-slate-400 text-center select-none">
        AI के उत्तर गलत भी हो सकते हैं। संताली शब्दों को शब्दकोश से मिला लें।
      </p>
    </motion.div>
  );
};

export default HorKathaAIPanel;
