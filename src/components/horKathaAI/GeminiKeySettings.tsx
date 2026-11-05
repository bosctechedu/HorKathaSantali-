// Settings sheet for "अपनी Gemini key जोड़ें" (bring your own key). Lazy-loaded on first 🔑 click.
// The key is stored only in this browser's localStorage (hk_user_gemini_key) and is never sent to our server.
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { KeyRound, X, Loader2, ExternalLink, Trash2, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { getUserKey, setUserKey, validateUserKey } from './userGemini';

const GeminiKeySettings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [hasKey, setHasKey] = useState(() => !!getUserKey());
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const check = async () => {
    const k = value.trim();
    if (!k || busy) return;
    setBusy(true);
    setStatus(null);
    const res = await validateUserKey(k);
    setBusy(false);
    if (res.ok) {
      setUserKey(k);
      setHasKey(true);
      setValue('');
    }
    setStatus({ ok: res.ok, text: res.message });
  };

  const remove = () => {
    setUserKey('');
    setHasKey(false);
    setValue('');
    setStatus({ ok: true, text: 'key हटा दी गई। अब साइट का AI उपयोग होगा।' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 bg-slate-900/40 flex items-end sm:items-center justify-center p-2"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 text-slate-900 max-h-full overflow-y-auto select-text"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="अपनी Gemini key जोड़ें"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-black text-sm flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-rose-600" /> अपनी Gemini key जोड़ें
          </h4>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 cursor-pointer" title="बंद करें / Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[11px] text-slate-600 mb-2">
          आपके पास Gemini की सुविधा है? अपनी मुफ़्त API key जोड़ें, फिर यह सहायक सीधे आपकी Gemini key से उत्तर देगा।
        </p>
        <ol className="text-[11px] text-slate-800 font-medium space-y-1 list-decimal pl-4 mb-3">
          <li>
            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline inline-flex items-center gap-0.5">
              aistudio.google.com/apikey <ExternalLink className="w-3 h-3" />
            </a>{' '}
            पर जाएँ और उसी Google खाते से साइन इन करें जिसमें आपका Gemini प्लान है।
          </li>
          <li><b>"Create API key"</b> दबाएँ (मुफ़्त)।</li>
          <li>key कॉपी करके नीचे paste करें और "जाँचें और सहेजें" दबाएँ।</li>
        </ol>

        {hasKey && (
          <div className="mb-2 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
            🔑 आपकी Gemini key सक्रिय है।
          </div>
        )}

        <div className="flex gap-1.5 items-center">
          <input
            type={show ? 'text' : 'password'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); void check(); } }}
            placeholder={hasKey ? 'नई key बदलने के लिए यहाँ paste करें' : 'AIza... (अपनी key यहाँ paste करें)'}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 min-w-0 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
            aria-label="Gemini API key"
          />
          <button type="button" onClick={() => setShow((v) => !v)} className="p-2 rounded-xl border border-slate-300 hover:bg-slate-100 cursor-pointer" title={show ? 'छिपाएँ' : 'दिखाएँ'}>
            {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={check}
            disabled={!value.trim() || busy}
            className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 text-white text-xs font-black disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1.5"
          >
            {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />} जाँचें और सहेजें
          </button>
          <button
            type="button"
            onClick={remove}
            disabled={!hasKey}
            className="px-3 py-2 rounded-xl border border-rose-300 text-rose-700 text-xs font-black hover:bg-rose-50 disabled:opacity-40 cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> हटाएँ
          </button>
        </div>
        {status && (
          <p className={`mt-2 text-[11px] font-bold ${status.ok ? 'text-emerald-700' : 'text-rose-700'}`}>{status.text}</p>
        )}
        <p className="mt-3 text-[10px] text-slate-500 flex items-start gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>आपकी key सिर्फ़ इसी डिवाइस में रहती है। यह हमारे सर्वर पर नहीं भेजी जाती; सवाल सीधे आपके ब्राउज़र से Google Gemini को जाते हैं। सीमा पूरी होने पर साइट का AI उत्तर देगा।</span>
        </p>
        <p className="mt-1 text-[10px] text-slate-500">
          ध्यान दें: Gemini ऐप की सदस्यता (Gemini Advanced/Google One) सीधे किसी दूसरी वेबसाइट पर नहीं चलती — इसके लिए API key चाहिए, या उत्तर के नीचे "Gemini में खोलें" दबाएँ।
        </p>
      </motion.div>
    </motion.div>
  );
};

export default GeminiKeySettings;
