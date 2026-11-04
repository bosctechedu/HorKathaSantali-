import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Layers,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Play,
  HelpCircle,
  Copy,
  Check,
  Edit2,
  Trash2,
  Plus,
  Save,
  X
} from 'lucide-react';

export interface SentencePart {
  id: string;
  devanagari: string;
  roman: string;
  hindi: string;
  english: string;
}

export const DEFAULT_SUBJECTS: SentencePart[] = [
  { id: 's1', devanagari: 'इञ (Iñ)', roman: 'In', hindi: 'मैं', english: 'I' },
  { id: 's2', devanagari: 'आम (Am)', roman: 'Am', hindi: 'तुम / आप', english: 'You' },
  { id: 's3', devanagari: 'उनी (Uni)', roman: 'Uni', hindi: 'वह (निकट/प्रत्यक्ष)', english: 'He/She' },
  { id: 's4', devanagari: 'आलां (Alaṅ)', roman: 'Alan', hindi: 'हम दोनों (तू और मैं)', english: 'We two (Inclusive)' },
  { id: 's5', devanagari: 'आलिंग (Aliñ)', roman: 'Alin', hindi: 'हम दोनों (वह और मैं, तू नहीं)', english: 'We two (Exclusive)' },
  { id: 's6', devanagari: 'आबो (Abo)', roman: 'Abo', hindi: 'हम सब (आप सब सहित)', english: 'We all (Inclusive)' },
  { id: 's7', devanagari: 'आले (Ale)', roman: 'Ale', hindi: 'हम सब (आप नहीं)', english: 'We all (Exclusive)' },
  { id: 's8', devanagari: 'उनकु (Unku)', roman: 'Unku', hindi: 'वे सब', english: 'They all' }
];

export const DEFAULT_OBJECTS: SentencePart[] = [
  { id: 'o1', devanagari: 'दाका (Daka)', roman: 'Daka', hindi: 'भात / भोजन', english: 'cooked rice / food' },
  { id: 'o2', devanagari: 'दाक (Dak\')', roman: "Dak'", hindi: 'जल / पानी', english: 'water' },
  { id: 'o3', devanagari: 'पुथी (Puthi)', roman: 'Puthi', hindi: 'पुस्तक / किताब', english: 'book' },
  { id: 'o4', devanagari: 'हातु (Hatu)', roman: 'Hatu', hindi: 'गांव', english: 'village' },
  { id: 'o5', devanagari: 'संताली पारसी (Santali Parsi)', roman: 'Santali Parsi', hindi: 'संताली भाषा', english: 'Santali language' },
  { id: 'o6', devanagari: 'सेरेञ (Sereñ)', roman: 'Seren', hindi: 'पारंपरिक गीत', english: 'folk song' }
];

export const DEFAULT_VERBS: SentencePart[] = [
  { id: 'v1', devanagari: 'जोम काना (Jom kana)', roman: 'jom kana', hindi: 'खा रहा हूँ/है', english: 'am/is eating' },
  { id: 'v2', devanagari: 'ञु काना (Ñu kana)', roman: 'nu kana', hindi: 'पी रहा हूँ/है', english: 'am/is drinking' },
  { id: 'v3', devanagari: 'पढ़ाव काना (Paṛhaw kana)', roman: 'parhaw kana', hindi: 'पढ़ रहा हूँ/है', english: 'am/is reading' },
  { id: 'v4', devanagari: 'चलाक् काना (Chalaq kana)', roman: 'chalaq kana', hindi: 'जा रहा हूँ/है', english: 'am/is going' },
  { id: 'v5', devanagari: 'चेद काना (Ched kana)', roman: 'ched kana', hindi: 'सीख रहा हूँ/है', english: 'am/is learning' },
  { id: 'v6', devanagari: 'सेरेञ काना (Sereñ kana)', roman: 'seren kana', hindi: 'गा रहा हूँ/है', english: 'am/is singing' }
];

export const SantaliGrammarBuilder: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState<'builder' | 'vachan' | 'pronouns' | 'tenses'>('builder');

  const [subjects, setSubjects] = useState<SentencePart[]>(() =>
    safeLoadFromStorage('hor_katha_grammar_subjects_v1', DEFAULT_SUBJECTS)
  );
  const [objects, setObjects] = useState<SentencePart[]>(() =>
    safeLoadFromStorage('hor_katha_grammar_objects_v1', DEFAULT_OBJECTS)
  );
  const [verbs, setVerbs] = useState<SentencePart[]>(() =>
    safeLoadFromStorage('hor_katha_grammar_verbs_v1', DEFAULT_VERBS)
  );

  useEffect(() => {
    safeSaveToStorage('hor_katha_grammar_subjects_v1', subjects);
  }, [subjects]);

  useEffect(() => {
    safeSaveToStorage('hor_katha_grammar_objects_v1', objects);
  }, [objects]);

  useEffect(() => {
    safeSaveToStorage('hor_katha_grammar_verbs_v1', verbs);
  }, [verbs]);
  
  // Sentence Builder State
  const [selectedSub, setSelectedSub] = useState<SentencePart>(subjects[0] || DEFAULT_SUBJECTS[0]);
  const [selectedObj, setSelectedObj] = useState<SentencePart>(objects[0] || DEFAULT_OBJECTS[0]);
  const [selectedVrb, setSelectedVrb] = useState<SentencePart>(verbs[0] || DEFAULT_VERBS[0]);
  const [copied, setCopied] = useState(false);

  // Admin Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'subject' | 'object' | 'verb'>('subject');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<SentencePart, 'id'>>({
    devanagari: '',
    roman: '',
    hindi: '',
    english: ''
  });

  const handleOpenAddPart = (type: 'subject' | 'object' | 'verb') => {
    setModalType(type);
    setEditingId(null);
    setFormData({
      devanagari: '',
      roman: '',
      hindi: '',
      english: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditPart = (type: 'subject' | 'object' | 'verb', item: SentencePart, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setModalType(type);
    setEditingId(item.id);
    setFormData({
      devanagari: item.devanagari,
      roman: item.roman,
      hindi: item.hindi,
      english: item.english
    });
    setIsModalOpen(true);
  };

  const handleDeletePart = (type: 'subject' | 'object' | 'verb', id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm('क्या आप इसे व्याकरण सूची से हटाना चाहते हैं?')) {
      if (type === 'subject') {
        const updated = subjects.filter(s => s.id !== id);
        setSubjects(updated);
        if (selectedSub.id === id && updated.length > 0) setSelectedSub(updated[0]);
      } else if (type === 'object') {
        const updated = objects.filter(o => o.id !== id);
        setObjects(updated);
        if (selectedObj.id === id && updated.length > 0) setSelectedObj(updated[0]);
      } else {
        const updated = verbs.filter(v => v.id !== id);
        setVerbs(updated);
        if (selectedVrb.id === id && updated.length > 0) setSelectedVrb(updated[0]);
      }
    }
  };

  const handleResetGrammar = () => {
    if (window.confirm('क्या आप व्याकरण घटकों को मूल डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      setSubjects(DEFAULT_SUBJECTS);
      setObjects(DEFAULT_OBJECTS);
      setVerbs(DEFAULT_VERBS);
      setSelectedSub(DEFAULT_SUBJECTS[0]);
      setSelectedObj(DEFAULT_OBJECTS[0]);
      setSelectedVrb(DEFAULT_VERBS[0]);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.devanagari.trim() || !formData.hindi.trim()) {
      alert('कृपया संताली देवनागरी और हिंदी अर्थ अवश्य भरें।');
      return;
    }

    if (modalType === 'subject') {
      if (editingId) {
        setSubjects(subjects.map(s => s.id === editingId ? { id: editingId, ...formData } : s));
        if (selectedSub.id === editingId) setSelectedSub({ id: editingId, ...formData });
      } else {
        const newPart = { id: `s_${Date.now()}`, ...formData };
        setSubjects([...subjects, newPart]);
        setSelectedSub(newPart);
      }
    } else if (modalType === 'object') {
      if (editingId) {
        setObjects(objects.map(o => o.id === editingId ? { id: editingId, ...formData } : o));
        if (selectedObj.id === editingId) setSelectedObj({ id: editingId, ...formData });
      } else {
        const newPart = { id: `o_${Date.now()}`, ...formData };
        setObjects([...objects, newPart]);
        setSelectedObj(newPart);
      }
    } else {
      if (editingId) {
        setVerbs(verbs.map(v => v.id === editingId ? { id: editingId, ...formData } : v));
        if (selectedVrb.id === editingId) setSelectedVrb({ id: editingId, ...formData });
      } else {
        const newPart = { id: `v_${Date.now()}`, ...formData };
        setVerbs([...verbs, newPart]);
        setSelectedVrb(newPart);
      }
    }
    setIsModalOpen(false);
  };

  // Constructed Sentence
  const rawDevSub = selectedSub.devanagari.split(' ')[0];
  const rawDevObj = selectedObj.devanagari.split(' ')[0];
  const rawDevVrb = selectedVrb.devanagari.split(' ')[0];

  const fullSentenceDev = `${rawDevSub} ${rawDevObj} ${rawDevVrb} काना।`;
  const fullSentenceRoman = `${selectedSub.roman} ${selectedObj.roman} ${selectedVrb.roman}.`;
  const fullSentenceHindi = `${selectedSub.hindi} ${selectedObj.hindi} ${selectedVrb.hindi}।`;
  const fullSentenceEnglish = `${selectedSub.english} ${selectedVrb.english} ${selectedObj.english}.`;

  const handleSpeakSentence = () => {
    speakWithFemaleVoice(fullSentenceDev, { lang: 'hi-IN' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${fullSentenceDev}\n${fullSentenceRoman}\nHindi: ${fullSentenceHindi}\nEnglish: ${fullSentenceEnglish}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-teal-300" />
              रोनौड़ (Ronoṛ) · संताली व्याकरण
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-400/30 text-[11px] font-bold text-teal-200">
              Grammar &amp; Sentence Lab
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-teal-100">
            संताली व्याकरण व वाक्य निर्माण लैब
          </h1>
          <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed font-medium">
            संताली भाषा की अनूठी व्याकरणिक संरचना: 3 वचन (द्विवचन सहित), समावेशी-अपवर्जक सर्वनाम और ड्रैग-एंड-टैप वाक्य निर्माता।
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['builder', 'vachan', 'pronouns', 'tenses'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-teal-900 shadow-md font-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tab === 'builder' && '⚡ वाक्य निर्माता'}
              {tab === 'vachan' && '🔢 3 वचन (Numbers)'}
              {tab === 'pronouns' && '👥 सर्वनाम (Pronouns)'}
              {tab === 'tenses' && '⏳ काल व प्रत्यय (Tenses)'}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Action Bar */}
      {isAdmin && (
        <div className="bg-teal-500/10 border border-teal-300/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-teal-950">
              प्रशासक नियंत्रण (Admin Control): {subjects.length} कर्ता · {objects.length} कर्म · {verbs.length} क्रियाएं
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenAddPart('subject')}
              className="px-2.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ कर्ता</span>
            </button>
            <button
              onClick={() => handleOpenAddPart('object')}
              className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ कर्म</span>
            </button>
            <button
              onClick={() => handleOpenAddPart('verb')}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ क्रिया</span>
            </button>
            <button
              onClick={handleResetGrammar}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>रीसेट</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 1: Interactive Sentence Builder */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          {/* Output Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
                आपका निर्मित संताली वाक्य (Constructed Sentence)
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-white text-slate-700 hover:text-amber-800 text-xs font-bold flex items-center gap-1.5 border border-slate-200 shadow-2xs cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'कॉपी हुआ!' : 'कॉपी करें'}</span>
                </button>

                <button
                  onClick={handleSpeakSentence}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>ऑडियो सुनें</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 font-serif tracking-tight">
                {fullSentenceDev}
              </h2>
              <p className="text-base sm:text-xl font-bold text-amber-900 font-mono">
                {fullSentenceRoman}
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm font-semibold text-slate-700 border-t border-amber-200/60 mt-3 pt-3">
                <p>
                  <strong>हिन्दी अनुवाद:</strong> {fullSentenceHindi}
                </p>
                <span className="text-slate-300">|</span>
                <p>
                  <strong>English Translation:</strong> {fullSentenceEnglish}
                </p>
              </div>
            </div>
          </div>

          {/* Selection Pickers (Subject + Object + Verb) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Subject Column */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>कर्ता (Subject) चुनें</span>
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{subjects.length} विकल्प</span>
                  {isAdmin && (
                    <button
                      onClick={() => handleOpenAddPart('subject')}
                      title="+ नया कर्ता जोड़ें"
                      className="p-1 rounded-md bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {subjects.map((sub) => {
                  const isSel = sub.id === selectedSub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSub(sub)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer relative group ${
                        isSel
                          ? 'bg-sky-50 border-sky-400 ring-1 ring-sky-300 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-black text-slate-900 text-sm">{sub.devanagari}</div>
                          <div className="text-xs text-sky-800 font-semibold mt-0.5">
                            {sub.hindi} · <span className="opacity-75">{sub.english}</span>
                          </div>
                        </div>
                        {isAdmin && (
                          <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                            <button
                              onClick={(e) => handleOpenEditPart('subject', sub, e)}
                              title="सुधारें"
                              className="p-1 rounded-md text-slate-400 hover:text-sky-700 hover:bg-sky-100 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => handleDeletePart('subject', sub.id, e)}
                              title="हटाएं"
                              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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

            {/* 2. Object Column */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>कर्म (Object) चुनें</span>
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{objects.length} विकल्प</span>
                  {isAdmin && (
                    <button
                      onClick={() => handleOpenAddPart('object')}
                      title="+ नया कर्म जोड़ें"
                      className="p-1 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {objects.map((obj) => {
                  const isSel = obj.id === selectedObj.id;
                  return (
                    <div
                      key={obj.id}
                      onClick={() => setSelectedObj(obj)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer relative group ${
                        isSel
                          ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-300 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-black text-slate-900 text-sm">{obj.devanagari}</div>
                          <div className="text-xs text-amber-800 font-semibold mt-0.5">
                            {obj.hindi} · <span className="opacity-75">{obj.english}</span>
                          </div>
                        </div>
                        {isAdmin && (
                          <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                            <button
                              onClick={(e) => handleOpenEditPart('object', obj, e)}
                              title="सुधारें"
                              className="p-1 rounded-md text-slate-400 hover:text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => handleDeletePart('object', obj.id, e)}
                              title="हटाएं"
                              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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

            {/* 3. Verb Column */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>क्रिया (Verb) चुनें</span>
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{verbs.length} क्रियाएं</span>
                  {isAdmin && (
                    <button
                      onClick={() => handleOpenAddPart('verb')}
                      title="+ नई क्रिया जोड़ें"
                      className="p-1 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {verbs.map((vrb) => {
                  const isSel = vrb.id === selectedVrb.id;
                  return (
                    <div
                      key={vrb.id}
                      onClick={() => setSelectedVrb(vrb)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer relative group ${
                        isSel
                          ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-300 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-black text-slate-900 text-sm">{vrb.devanagari}</div>
                          <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                            {vrb.hindi} · <span className="opacity-75">{vrb.english}</span>
                          </div>
                        </div>
                        {isAdmin && (
                          <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                            <button
                              onClick={(e) => handleOpenEditPart('verb', vrb, e)}
                              title="सुधारें"
                              className="p-1 rounded-md text-slate-400 hover:text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => handleDeletePart('verb', vrb.id, e)}
                              title="हटाएं"
                              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
          </div>
        </div>
      )}

      {/* Tab 2: The 3 Vachanas (Numbers) */}
      {activeTab === 'vachan' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              संताली भाषा के ३ वचन (Three Grammatical Numbers)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              अधिकांश भारतीय भाषाओं में केवल एकवचन और बहुवचन होते हैं, किंतु संताली में विशिष्ट **द्विवचन (Dual Number)** होता है जो दो व्यक्तियों या वस्तुओं के लिए प्रयुक्त होता है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-sky-50 border border-sky-200 space-y-3">
              <span className="px-3 py-1 rounded-full bg-sky-200 text-sky-900 text-xs font-black uppercase">
                १. एकवचन (Mit' Gotan)
              </span>
              <h3 className="text-xl font-black text-slate-900">मित् गोटांग</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                एक व्यक्ति या वस्तु के लिए प्रयुक्त होता है।
              </p>
              <div className="bg-white p-3.5 rounded-2xl border border-sky-100 text-xs space-y-1">
                <p><strong>उदाहरण:</strong> होड़ (इंसान / एक व्यक्ति)</p>
                <p><strong>सेता:</strong> एक कुत्ता</p>
                <p><strong>ओड़ाक्:</strong> एक घर</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-3 shadow-xs">
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-black uppercase">
                २. द्विवचन (Bar Gotan) — संताली विशेषता
              </span>
              <h3 className="text-xl font-black text-slate-900">बार गोटांग</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ठीक दो व्यक्तियों या वस्तुओं के लिए प्रत्यय <strong>-किन (-kin)</strong> लगाया जाता है।
              </p>
              <div className="bg-white p-3.5 rounded-2xl border border-amber-200 text-xs space-y-1">
                <p><strong>उदाहरण:</strong> होड़-किन (दो इंसान)</p>
                <p><strong>सेता-किन:</strong> दो कुत्ते</p>
                <p><strong>ओड़ाक्-किन:</strong> दो घर</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3">
              <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-black uppercase">
                ३. बहुवचन (Sangay Gotan)
              </span>
              <h3 className="text-xl font-black text-slate-900">सांगाय गोटांग</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                दो से अधिक (तीन या अनंत) व्यक्तियों या वस्तुओं के लिए प्रत्यय <strong>-को (-ko)</strong> लगाया जाता है।
              </p>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 text-xs space-y-1">
                <p><strong>उदाहरण:</strong> होड़-को (अनेक लोग / सब इंसान)</p>
                <p><strong>सेता-को:</strong> सब कुत्ते</p>
                <p><strong>दारे-को:</strong> सब पेड़</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Inclusive vs Exclusive Pronouns */}
      {activeTab === 'pronouns' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              समावेशी व अपवर्जक सर्वनाम (Inclusive vs Exclusive Pronouns)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              संताली व्याकरण में 'हम' बोलते समय यह स्पष्ट होता है कि सुनने वाला (श्रोता) उस समूह में शामिल है या नहीं:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-teal-50 border border-teal-200 space-y-3">
              <span className="px-3 py-1 rounded-full bg-teal-200 text-teal-900 text-xs font-black uppercase">
                समावेशी (Inclusive - श्रोता शामिल है)
              </span>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-2xl border border-teal-100">
                  <h4 className="text-lg font-black text-slate-900">आलां (Alan)</h4>
                  <p className="text-xs text-teal-800 font-bold">द्विवचन समावेशी (हम दोनों = मैं और तू)</p>
                  <p className="text-xs text-slate-600 mt-1">उदा. "आलां लांग चलाक् काना।" (हम दोनों चल रहे हैं।)</p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-teal-100">
                  <h4 className="text-lg font-black text-slate-900">आबो / आबोन (Abo / Abon)</h4>
                  <p className="text-xs text-teal-800 font-bold">बहुवचन समावेशी (हम सब = हमारे साथ आप सब भी)</p>
                  <p className="text-xs text-slate-600 mt-1">उदा. "आबो संताली कानाबोन।" (हम सब संताली हैं।)</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 space-y-3">
              <span className="px-3 py-1 rounded-full bg-rose-200 text-rose-900 text-xs font-black uppercase">
                अपवर्जक (Exclusive - श्रोता बाहर है)
              </span>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-2xl border border-rose-100">
                  <h4 className="text-lg font-black text-slate-900">आलिंग (Alin)</h4>
                  <p className="text-xs text-rose-800 font-bold">द्विवचन अपवर्जक (हम दोनों = मैं और कोई अन्य, आप नहीं)</p>
                  <p className="text-xs text-slate-600 mt-1">उदा. "आलिंग लिंग जोम काना।" (हम दोनों खा रहे हैं, आप नहीं।)</p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-rose-100">
                  <h4 className="text-lg font-black text-slate-900">आले (Ale)</h4>
                  <p className="text-xs text-rose-800 font-bold">बहुवचन अपवर्जक (हम सब = हमारे लोग, आप शामिल नहीं)</p>
                  <p className="text-xs text-slate-600 mt-1">उदा. "आले हातु ले चलाक् काना।" (हम सब गांव जा रहे हैं।)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Tenses & Suffixes */}
      {activeTab === 'tenses' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              संताली काल व क्रिया प्रत्यय (Tenses &amp; Verbal Markers)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              संताली में काल (समय) को क्रिया धातु के साथ जुड़ने वाले प्रत्ययों (Suffixes) से पहचाना जाता है:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-black uppercase">
                १. वर्तमान काल (Present Continuous)
              </span>
              <h4 className="text-lg font-black text-slate-900">-काना (-kana)</h4>
              <p className="text-xs text-slate-600">
                कार्य के अभी घटित होने का संकेत।
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs">
                <p className="font-bold">जोम काना (Jom kana)</p>
                <p className="text-slate-500">खा रहा हूँ / खा रहे हैं</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[11px] font-black uppercase">
                २. भूतकाल (Past Tense)
              </span>
              <h4 className="text-lg font-black text-slate-900">-केदा (-keda) / -एना (-ena)</h4>
              <p className="text-xs text-slate-600">
                कार्य समाप्त हो चुका है।
              </p>
              <div className="p-3 bg-white rounded-xl border border-amber-100 text-xs">
                <p className="font-bold">जोम केदा (Jom keda)</p>
                <p className="text-slate-500">खा लिया / खा चुका</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[11px] font-black uppercase">
                ३. भविष्यत काल (Future Tense)
              </span>
              <h4 className="text-lg font-black text-slate-900">-आ (-a)</h4>
              <p className="text-xs text-slate-600">
                भविष्य में कार्य होने की संभावना।
              </p>
              <div className="p-3 bg-white rounded-xl border border-emerald-100 text-xs">
                <p className="font-bold">जोमा (Joma)</p>
                <p className="text-slate-500">खाएगा / खाऊंगा</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <span>
                  {editingId
                    ? `${modalType === 'subject' ? 'कर्ता' : modalType === 'object' ? 'कर्म' : 'क्रिया'} सुधारें`
                    : `+ नया ${modalType === 'subject' ? 'कर्ता (Subject)' : modalType === 'object' ? 'कर्म (Object)' : 'क्रिया (Verb)'} जोड़ें`}
                </span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">संताली शब्द (देवनागरी लिपि) *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. इञ, दाका, जोम काना..."
                  value={formData.devanagari}
                  onChange={(e) => setFormData({ ...formData, devanagari: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">रोमन लिपि उच्चारण (Roman)</label>
                <input
                  type="text"
                  placeholder="उदा. In, Daka, jom kana..."
                  value={formData.roman}
                  onChange={(e) => setFormData({ ...formData, roman: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिंदी अर्थ *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. मैं, भात, खा रहा हूँ..."
                    value={formData.hindi}
                    onChange={(e) => setFormData({ ...formData, hindi: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-teal-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">English Meaning</label>
                  <input
                    type="text"
                    placeholder="e.g. I, rice, eating..."
                    value={formData.english}
                    onChange={(e) => setFormData({ ...formData, english: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-teal-500"
                  />
                </div>
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
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
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
