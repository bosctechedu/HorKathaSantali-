import React, { useState, useRef, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  Sparkles,
  Download,
  Share2,
  Heart,
  Palette,
  Volume2,
  Check,
  Send,
  Flower2,
  Sun,
  Flame,
  Calendar,
  Layers,
  Copy,
  Edit2,
  Trash2,
  Plus,
  Save,
  RotateCcw,
  X
} from 'lucide-react';

export interface GreetingTemplate {
  id: string;
  festivalName: string;
  festivalDev: string;
  defaultMessageDev: string;
  defaultMessageRoman: string;
  defaultMessageHindi: string;
  bgGradient: string;
  borderColor: string;
  symbol: string;
  festiveTag: string;
}

export const DEFAULT_GREETING_TEMPLATES: GreetingTemplate[] = [
  {
    id: 'sohrai',
    festivalName: 'Sohrai Parab',
    festivalDev: 'सोहराय महापर्व',
    defaultMessageDev: 'सोहराय महापर्व रेयाक आमाक आर आमाक घारोज ते सागुन जोहार!',
    defaultMessageRoman: 'Sohrai mahaparv reyak amak ar amak gharoj te sagun johar!',
    defaultMessageHindi: 'सोहराय महापर्व के पावन अवसर पर आपको और आपके पूरे परिवार को हार्दिक शुभकामनाएं!',
    bgGradient: 'from-amber-600 via-orange-600 to-amber-900',
    borderColor: 'border-amber-400',
    symbol: '🌾',
    festiveTag: 'कृषि व गौ-वंदना महापर्व'
  },
  {
    id: 'baha',
    festivalName: 'Baha Parab',
    festivalDev: 'बाहा परोब',
    defaultMessageDev: 'सारजोम बाहा फुटावेना, आमाक जियान रे रासका पेरेज् कोक् मा! सागुन बाहा परोब!',
    defaultMessageRoman: 'Sarjom baha phutawena, amak jiyan re raska perej kok ma! Sagun Baha Parab!',
    defaultMessageHindi: 'साल के फूल खिल उठे हैं, आपके जीवन में खुशियों की बहार आए! बाहा पर्व की हार्दिक बधाई!',
    bgGradient: 'from-emerald-600 via-teal-700 to-green-900',
    borderColor: 'border-emerald-400',
    symbol: '🌸',
    festiveTag: 'वसंत व साल पुष्प उत्सव'
  },
  {
    id: 'karam',
    festivalName: 'Karam Parab',
    festivalDev: 'करम परोब',
    defaultMessageDev: 'करम गोसाय आमाक थुम दाड़े ते आतो-दिशोम रे सुख-शांति ताहेंन मा! सागुन करम!',
    defaultMessageRoman: 'Karam Gosai amak thum dare te ato-dishom re sukh-shanti tahen ma! Sagun Karam!',
    defaultMessageHindi: 'करम देवता के पावन आशीर्वाद से आपके घर-परिवार में सुख-समृद्धि और आरोग्य बना रहे!',
    bgGradient: 'from-yellow-600 via-amber-700 to-orange-950',
    borderColor: 'border-yellow-400',
    symbol: '🌿',
    festiveTag: 'प्रकृति व करम डाल वंदना'
  },
  {
    id: 'new_year',
    festivalName: 'Sagun Nawa Serma',
    festivalDev: 'सागुन नावा सेरमा (नववर्ष)',
    defaultMessageDev: 'नावा सेरमा रे आमाक जोतो आसा-उहाब पुरावेन् मा! सागुन नावा सेरमा जोहार!',
    defaultMessageRoman: 'Nawa serma re amak joto asa-uhab purawen ma! Sagun Nawa Serma Johar!',
    defaultMessageHindi: 'नववर्ष में आपकी समस्त मनोकामनाएं पूर्ण हों और जीवन में नव-उमंग का संचार हो!',
    bgGradient: 'from-purple-600 via-indigo-700 to-slate-950',
    borderColor: 'border-purple-400',
    symbol: '✨',
    festiveTag: 'नववर्ष मंगलकामना'
  },
  {
    id: 'general_johar',
    festivalName: 'Sagun Daram',
    festivalDev: 'सगुन दाराम (हार्दिक अभिनंदन)',
    defaultMessageDev: 'जोहार! आबोवाक पारसी, आबोवाक लाकचार, आबोवाक गोरोब! सागुन जोहार!',
    defaultMessageRoman: 'Johar! Abowak parsi, abowak lakchar, abowak gorob! Sagun Johar!',
    defaultMessageHindi: 'प्रणाम! हमारी भाषा, हमारी संस्कृति, हमारा गौरव! सादर सप्रेम जोहार!',
    bgGradient: 'from-rose-600 via-pink-700 to-stone-900',
    borderColor: 'border-rose-400',
    symbol: '🙏',
    festiveTag: 'सद्भावना व प्रेम संदेश'
  }
];

export const SantaliGreetingMaker: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [templatesList, setTemplatesList] = useState<GreetingTemplate[]>(() =>
    safeLoadFromStorage('hor_katha_greetings_templates_db', DEFAULT_GREETING_TEMPLATES)
  );

  const [selectedTemplate, setSelectedTemplate] = useState<GreetingTemplate>(templatesList[0] || DEFAULT_GREETING_TEMPLATES[0]);
  const [recipientName, setRecipientName] = useState('प्रिय सखा / स्नेहीजन');
  const [senderName, setSenderName] = useState('आपका शुभचिंतक');
  const [customMessage, setCustomMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Admin Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<GreetingTemplate, 'id'>>({
    festivalName: '',
    festivalDev: '',
    defaultMessageDev: '',
    defaultMessageRoman: '',
    defaultMessageHindi: '',
    bgGradient: 'from-amber-600 via-orange-600 to-amber-900',
    borderColor: 'border-amber-400',
    symbol: '🌸',
    festiveTag: 'शुभकामना'
  });

  useEffect(() => {
    safeSaveToStorage('hor_katha_greetings_templates_db', templatesList);
  }, [templatesList]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      festivalName: 'Baha Parab',
      festivalDev: 'बाहा परोब',
      defaultMessageDev: 'सारजोम बाहा फुटावेना! सागुन बाहा परोब!',
      defaultMessageRoman: 'Sarjom baha phutawena! Sagun Baha Parab!',
      defaultMessageHindi: 'साल के फूल खिल उठे हैं! बाहा पर्व की हार्दिक बधाई!',
      bgGradient: 'from-emerald-600 via-teal-700 to-green-900',
      borderColor: 'border-emerald-400',
      symbol: '🌸',
      festiveTag: 'शुभकामना संदेश'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tmpl: GreetingTemplate, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingId(tmpl.id);
    setFormData({
      festivalName: tmpl.festivalName,
      festivalDev: tmpl.festivalDev,
      defaultMessageDev: tmpl.defaultMessageDev,
      defaultMessageRoman: tmpl.defaultMessageRoman,
      defaultMessageHindi: tmpl.defaultMessageHindi,
      bgGradient: tmpl.bgGradient,
      borderColor: tmpl.borderColor,
      symbol: tmpl.symbol,
      festiveTag: tmpl.festiveTag
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm('क्या आप इस ई-कार्ड टेम्पलेट को हटाना चाहते हैं?')) {
      const updated = templatesList.filter(t => t.id !== id);
      setTemplatesList(updated);
      if (selectedTemplate.id === id && updated.length > 0) {
        setSelectedTemplate(updated[0]);
      }
    }
  };

  const handleReset = () => {
    if (window.confirm('क्या आप सभी ई-कार्ड टेम्पलेट्स को मूल डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      setTemplatesList(DEFAULT_GREETING_TEMPLATES);
      setSelectedTemplate(DEFAULT_GREETING_TEMPLATES[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.festivalDev.trim() || !formData.defaultMessageDev.trim()) {
      alert('कृपया पर्व का नाम और संताली देवनागरी संदेश अवश्य भरें।');
      return;
    }

    if (editingId) {
      const updated = templatesList.map(t => t.id === editingId ? { id: editingId, ...formData } : t);
      setTemplatesList(updated);
      if (selectedTemplate.id === editingId) {
        setSelectedTemplate({ id: editingId, ...formData });
      }
    } else {
      const newTmpl: GreetingTemplate = {
        id: `card_${Date.now()}`,
        ...formData
      };
      setTemplatesList([...templatesList, newTmpl]);
      setSelectedTemplate(newTmpl);
    }
    setIsModalOpen(false);
  };

  const activeMessageDev = customMessage.trim() || selectedTemplate.defaultMessageDev;

  const handleSpeak = () => {
    const text = `${recipientName} जोहार! ${selectedTemplate.festivalDev}। ${activeMessageDev}। प्रेषक: ${senderName}।`;
    speakWithFemaleVoice(text, { lang: 'hi-IN' });
  };

  const handleCopyText = () => {
    const fullText = `🌺 *${selectedTemplate.festivalDev}* 🌺\n\nप्रिय *${recipientName}*,\n\n${activeMessageDev}\n\n_${selectedTemplate.defaultMessageHindi}_\n\nसादर सप्रेम,\n*${senderName}*\n(होर कथा सुइट द्वारा प्रेषित)`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const fullText = `🌺 *${selectedTemplate.festivalDev}* 🌺\n\nप्रिय *${recipientName}*,\n\n${activeMessageDev}\n\n_${selectedTemplate.defaultMessageHindi}_\n\nसादर सप्रेम,\n*${senderName}*\n(Hor Katha Suite)`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-800 via-pink-800 to-amber-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              डिजिटल ई-कार्ड स्टूडियो
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-400/30 text-[11px] font-bold text-rose-200">
              Santali E-Card Creator
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-rose-100">
            संताली पावन पर्व ई-कार्ड जेनरेटर
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed font-medium">
            सोहराय, बाहा, करम और नववर्ष के पावन अवसर पर संताली देवनागरी में सुंदर शुभकामना पत्र तैयार करें और 1-क्लिक में WhatsApp पर साझा करें।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleSpeak}
            className="px-4 py-2.5 rounded-2xl bg-white text-rose-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-rose-700" />
            <span>कार्ड का वाचन सुनें</span>
          </button>
        </div>
      </div>

      {/* Admin Action Bar */}
      {isAdmin && (
        <div className="bg-rose-500/10 border border-rose-300/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-rose-950">
              प्रशासक नियंत्रण (Admin Control): कुल {templatesList.length} ई-कार्ड उपलब्ध
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAdd}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया ई-कार्ड जोड़ें</span>
            </button>
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>रीसेट</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Studio Grid: Left Controls + Right Live Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Template Selector */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-600" />
                <span>१. पावन पर्व / प्रसंग चुनें (Select Occasion):</span>
              </label>
              {isAdmin && (
                <button
                  onClick={handleOpenAdd}
                  className="text-[11px] text-rose-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>नया जोड़ें</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {templatesList.map((tmpl) => {
                const isSel = tmpl.id === selectedTemplate.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplate(tmpl);
                      setCustomMessage('');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative group ${
                      isSel
                        ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/40 shadow-xs'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{tmpl.symbol}</span>
                        <div>
                          <div className="font-black text-slate-900 text-xs">{tmpl.festivalDev}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">{tmpl.festivalName}</div>
                        </div>
                      </div>

                      {isAdmin && (
                        <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                          <button
                            onClick={(e) => handleOpenEdit(tmpl, e)}
                            title="सुधारें (Edit)"
                            className="p-1 rounded-md text-slate-400 hover:text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(tmpl.id, e)}
                            title="हटाएं (Delete)"
                            className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Names & Personalization */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>२. नाम व संदेश प्रविष्टि (Names &amp; Message):</span>
            </label>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                प्राप्तकर्ता का नाम (Recipient Name):
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="उदा. सोमाय मरांडी, प्रिय दादा, मित्रवर..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                प्रेषक का नाम (Sender Name / From):
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="उदा. बड़का हांसदा, आपका भाई, समस्त परिवार..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                कस्टम संताली संदेश (वैकल्पिक - छोड़ दें तो स्वतः सेट रहेगा):
              </label>
              <textarea
                rows={3}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={selectedTemplate.defaultMessageDev}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none font-serif"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Card Canvas & Share Options */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card Canvas */}
          <div
            ref={cardRef}
            className={`w-full min-h-[460px] rounded-3xl p-8 sm:p-10 text-white bg-gradient-to-br ${selectedTemplate.bgGradient} border-4 ${selectedTemplate.borderColor} shadow-xl flex flex-col justify-between relative overflow-hidden`}
          >
            {/* Background Decorative Motifs */}
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-15 select-none pointer-events-none">
              {selectedTemplate.symbol}
            </div>
            <div className="absolute bottom-0 left-0 p-8 text-7xl opacity-10 select-none pointer-events-none">
              🌸
            </div>

            {/* Top Border & Header */}
            <div className="relative z-10 space-y-3 border-b border-white/20 pb-6">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black uppercase tracking-wider text-amber-200 border border-white/25">
                  {selectedTemplate.festiveTag}
                </span>
                <span className="text-2xl">{selectedTemplate.symbol}</span>
              </div>

              <div className="space-y-0.5">
                <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-tight drop-shadow-md text-amber-100">
                  {selectedTemplate.festivalDev}
                </h2>
                <p className="text-xs sm:text-sm font-bold text-white/80 font-mono tracking-wider">
                  {selectedTemplate.festivalName}
                </p>
              </div>
            </div>

            {/* Middle: Greetings Body */}
            <div className="relative z-10 my-auto py-6 space-y-4">
              <div className="text-base sm:text-lg font-bold text-amber-200">
                सगुन जोहार, {recipientName}!
              </div>

              <p className="text-lg sm:text-2xl font-black font-serif leading-relaxed text-white drop-shadow-sm">
                “{activeMessageDev}”
              </p>

              <p className="text-xs sm:text-sm text-white/85 italic bg-black/20 p-3 rounded-2xl border border-white/10">
                {selectedTemplate.defaultMessageHindi}
              </p>
            </div>

            {/* Bottom: Signature & Watermark */}
            <div className="relative z-10 border-t border-white/20 pt-4 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-white/70 block">
                  सादर सप्रेम प्रेषक:
                </span>
                <span className="text-base sm:text-xl font-black text-amber-200">
                  {senderName}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-semibold text-white/60 block">
                  BOSC Hor Katha Suite
                </span>
                <span className="text-[11px] font-bold text-white/90">
                  होड़ कथा सुइट
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: WhatsApp & Copy */}
          <div className="flex flex-wrap items-center gap-3 justify-end pt-2">
            <button
              onClick={handleCopyText}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-2 border border-slate-200 shadow-2xs cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'संदेश कॉपी हुआ!' : 'संदेश टेक्स्ट कॉपी करें'}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp पर भेजें (Share on WhatsApp)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-600" />
                <span>{editingId ? 'ई-कार्ड टेम्पलेट सुधारें' : '+ नया ई-कार्ड टेम्पलेट जोड़ें'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">पर्व / प्रसंग (संताली देवनागरी) *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. सोहराय महापर्व"
                    value={formData.festivalDev}
                    onChange={(e) => setFormData({ ...formData, festivalDev: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-rose-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">पर्व नाम (रोमन)</label>
                  <input
                    type="text"
                    placeholder="उदा. Sohrai Parab"
                    value={formData.festivalName}
                    onChange={(e) => setFormData({ ...formData, festivalName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">प्रतीक चिन्ह (Emoji)</label>
                  <input
                    type="text"
                    value={formData.symbol}
                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-rose-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">उत्सव टैग (Festive Tag)</label>
                  <input
                    type="text"
                    placeholder="उदा. कृषि व गौ-वंदना"
                    value={formData.festiveTag}
                    onChange={(e) => setFormData({ ...formData, festiveTag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">मूल शुभकामना संदेश (संताली देवनागरी लिपि) *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="उदा. सोहराय महापर्व रेयाक आमाक आर आमाक घारोज ते सागुन जोहार!..."
                  value={formData.defaultMessageDev}
                  onChange={(e) => setFormData({ ...formData, defaultMessageDev: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">संदेश (रोमन लिपि)</label>
                <input
                  type="text"
                  placeholder="उदा. Sohrai mahaparv reyak amak ar amak gharoj te sagun johar!..."
                  value={formData.defaultMessageRoman}
                  onChange={(e) => setFormData({ ...formData, defaultMessageRoman: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-rose-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">हिंदी अर्थ / व्याख्या</label>
                <textarea
                  rows={2}
                  placeholder="उदा. सोहराय महापर्व के पावन अवसर पर आपको और आपके परिवार को हार्दिक शुभकामनाएं!..."
                  value={formData.defaultMessageHindi}
                  onChange={(e) => setFormData({ ...formData, defaultMessageHindi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सहेजें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
