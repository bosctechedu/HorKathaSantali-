import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import { buildGeneratedQuiz, GeneratedQuizKind } from '../data/santaliData';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Download,
  Printer,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Star,
  ChevronRight,
  Edit2,
  Trash2,
  Plus,
  Save,
  X
} from 'lucide-react';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export const DEFAULT_LEVEL_QUESTIONS: Record<string, Question[]> = {
  beginner: [
    {
      id: 1,
      question: 'संथाली में आदरपूर्वक "नमस्कार / अभिवादन" को क्या कहा जाता है?',
      options: ['जोहार (Johar)', 'सेंगेल (Sengel)', 'अखड़ा (Akhra)', 'दाका (Daka)'],
      correctIdx: 0,
      explanation: 'संथाली समाज में दोनों हाथ जोड़कर सिर झुकाकर "जोहार" कहा जाता है।'
    },
    {
      id: 2,
      question: '"दाक्" (Dah) शब्द का हिंदी में क्या अर्थ है?',
      options: ['अग्नि', 'जल / पानी', 'वायु', 'पहाड़'],
      correctIdx: 1,
      explanation: 'संथाली में दाक् का अर्थ जल या पानी होता है।'
    },
    {
      id: 3,
      question: 'संथाली में "५" (पांच) अंक को क्या कहते हैं?',
      options: ['मित् (Mid)', 'बारया (Barya)', 'मोड़े (Mone)', 'तुरुय (Turuy)'],
      correctIdx: 2,
      explanation: 'संथाली में ५ को "मोड़े" कहा जाता है।'
    },
    {
      id: 4,
      question: '"आम चेद् लेका मेनामा?" का हिंदी अनुवाद क्या है?',
      options: ['आप कहां जा रहे हैं?', 'आप कैसे हैं?', 'आपका नाम क्या है?', 'भोजन कर लीजिए'],
      correctIdx: 1,
      explanation: '"आम चेद् लेका मेनामा?" का अर्थ "आप कैसे हैं?" होता है।'
    },
    {
      id: 5,
      question: 'संथाली में "पिता" को आदरपूर्वक क्या कहते हैं?',
      options: ['आयो (Ayo)', 'बाबा (Baba)', 'हाड़ाम (Haram)', 'मायंजी (Mayanji)'],
      correctIdx: 1,
      explanation: 'संथाली में पिता को बाबा और माता को आयो कहा जाता है।'
    }
  ],
  intermediate: [
    {
      id: 1,
      question: 'संथाली समाज का सबसे बड़ा प्राकृतिक वसंत पर्व कौन सा है जिसमें साल के फूलों की पूजा होती है?',
      options: ['सोहराय (Sohrai)', 'बाहा (Baha)', 'साकरात (Sakrat)', 'माघे (Maghe)'],
      correctIdx: 1,
      explanation: 'बाहा पर्व में जाहेर थान में साल (सरजोम) के नए फूलों की पहली पूजा की जाती है।'
    },
    {
      id: 2,
      question: 'संथाली ग्राम स्वशासन व्यवस्था में गांव के प्रधान (मुखिया) को क्या कहा जाता है?',
      options: ['नायके (Naike)', 'मांझी हाड़ाम (Majhi Haram)', 'गोडेत (Godet)', 'प्राणिक (Paranik)'],
      correctIdx: 1,
      explanation: 'गांव के पारंपरिक मुखिया और न्यायाधीश को मांझी हाड़ाम कहा जाता है।'
    },
    {
      id: 3,
      question: 'संथाली लोक संगीत में दोनों हाथों से बजाया जाने वाला मुख्य मांदर क्या कहलाता है?',
      options: ['तामाक (Tamak)', 'तुमदाक (Tumdak)', 'तिरियो (Tiriyo)', 'बानाम (Banam)'],
      correctIdx: 1,
      explanation: 'तुमदाक मिट्टी का बना द्विमुखीय ढोल/मांदर है जो अखड़ा नृत्य का प्राण है।'
    },
    {
      id: 4,
      question: 'संथाली समाज में कुल कितने मूल गोत्र (पारिस) हैं?',
      options: ['८ गोत्र', '१० गोत्र', '१२ गोत्र (पारिस)', '१६ गोत्र'],
      correctIdx: 2,
      explanation: 'संथाली समाज में १२ पवित्र पारिस (हांसदा, मुर्मु, किस्कू, हेम्ब्रम, सोरेन, टुडू, आदि) हैं।'
    },
    {
      id: 5,
      question: 'संथाली महिलाओं का पारंपरिक दो-टुकड़ा वस्त्र क्या कहलाता है?',
      options: ['धोतरा', 'पांची पारहांड (Panchi Parhand)', 'सिकरी', 'पांछना'],
      correctIdx: 1,
      explanation: 'निचला हिस्सा पारहांड और ऊपरी हिस्सा पांची कहलाता है।'
    }
  ],
  advanced: [
    {
      id: 1,
      question: '३० जून १८५५ को भोगनाडीह में १०,००० संतालों की महापंचायत कर संथाल हुल का बिगुल किसने फूंका था?',
      options: ['बाबा तिलका मांझी', 'सिदो मुर्मू आर कान्हू मुर्मू', 'बिरसा मुंडा', 'भागीरथ मांझी'],
      correctIdx: 1,
      explanation: 'सिदो-कान्हू, चांद-भैरव एवं फूलो-झानो ने 1855 के ऐतिहासिक संथाल हुल का नेतृत्व किया था।'
    },
    {
      id: 2,
      question: 'संथाली सृष्टि कथा (सिरजोन काहनी) के अनुसार परमात्मा (ठाकुर जिउ) ने सर्वप्रथम किन पक्षियों की रचना की थी?',
      options: ['गरुड़ व मयूर', 'हांस आर हांसली (हंस-हंसली)', 'तोता व मैना', 'कबूतर'],
      correctIdx: 1,
      explanation: 'ठाकुर जिउ की छाती के मैल से हांस और हांसली पक्षी उत्पन्न हुए जिन्होंने जल पर कमल पत्ते पर अंडे दिए।'
    },
    {
      id: 3,
      question: 'संतालों का सर्वोच्च आध्यात्मिक महातीर्थ "लुगुबुरु घंटाबाड़ी धोरोमगाड़" किस राज्य व जिले में स्थित है?',
      options: ['पश्चिम बंगाल, पुरुलिया', 'ओडिशा, मयूरभंज', 'झारखंड, बोकारो (ललपनिया)', 'बिहार, भागलपुर'],
      correctIdx: 2,
      explanation: 'लुगुबुरु घंटाबाड़ी झारखंड के बोकारो जिले के ललपनिया में स्थित है।'
    },
    {
      id: 4,
      question: 'संथाली समाज में युवक को पूर्ण सामाजिक नागरिकता दिलाने वाला अनिवार्य संस्कार कौन सा है?',
      options: ['जानाम छठियार', 'निम-दाः मांडी', 'चाचो छठियार (Chacho Chhatiyar)', 'भांडान'],
      correctIdx: 2,
      explanation: 'चाचो छठियार के बिना किसी भी व्यक्ति को समाज में विवाह या पूर्ण अधिकार प्राप्त नहीं होता।'
    },
    {
      id: 5,
      question: 'संथाल हुल का अमर राष्ट्रव्यापी उद्घोष क्या था?',
      options: ['जय जोहार', 'अबोवाः दिशोम, अबोवाः राज!', 'सेंगेल जुलाओ', 'हूल सेंगेल'],
      correctIdx: 1,
      explanation: '"अबोवाः दिशोम, अबोवाः राज!" (हमारा देश, हमारा राज) संथाल हुल का अमर नारा था।'
    }
  ]
};

// 30+ प्रश्न हर level: साइट के अपने शब्दकोश, ओल चिकी अक्षर/अंक डेटा से (कोई नया संताली शब्द नहीं)
const certGen = (kinds: [GeneratedQuizKind, number][], start: number): Question[] =>
  kinds
    .flatMap(([k, n]) => buildGeneratedQuiz(k).slice(0, n))
    .map((g, i) => ({ id: start + i, question: g.question, options: g.options, correctIdx: g.answer, explanation: g.explanation }));
const CERT_EXTRA: Record<string, Question[]> = {
  beginner: certGen([['numeral_name', 10], ['dict_meaning', 20]], 101),
  intermediate: certGen([['ol_digit', 10], ['ol_letter_name', 20]], 201),
  advanced: certGen([['ol_letter_char', 15], ['dict_reverse', 15]], 301),
};
for (const lv of Object.keys(CERT_EXTRA)) {
  DEFAULT_LEVEL_QUESTIONS[lv] = [...(DEFAULT_LEVEL_QUESTIONS[lv] || []), ...CERT_EXTRA[lv]];
}

export const SantaliProficiencyCertificate: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [questionsMap, setQuestionsMap] = useState<Record<string, Question[]>>(() => {
    const saved = safeLoadFromStorage('hor_katha_certificate_questions_db', DEFAULT_LEVEL_QUESTIONS);
    // एक बार: हर level में नए प्रश्न जोड़ें (30+); admin के बदलाव वैसे ही रहें
    if (safeLoadFromStorage('hor_katha_certificate_merge30', false)) return saved;
    const merged: Record<string, Question[]> = { ...saved };
    for (const lv of Object.keys(CERT_EXTRA)) {
      const cur = merged[lv] || [];
      const ids = new Set(cur.map((q) => q.id));
      merged[lv] = [...cur, ...CERT_EXTRA[lv].filter((q) => !ids.has(q.id))];
    }
    safeSaveToStorage('hor_katha_certificate_merge30', true);
    return merged;
  });

  const [studentName, setStudentName] = useState('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Admin question manager state
  const [showAdminManager, setShowAdminManager] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQId, setEditingQId] = useState<number | null>(null);
  const [formLevel, setFormLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptions, setFormOptions] = useState<string[]>(['', '', '', '']);
  const [formCorrectIdx, setFormCorrectIdx] = useState(0);
  const [formExplanation, setFormExplanation] = useState('');

  useEffect(() => {
    safeSaveToStorage('hor_katha_certificate_questions_db', questionsMap);
  }, [questionsMap]);

  const certRef = useRef<HTMLDivElement>(null);

  const questions = questionsMap[level] || DEFAULT_LEVEL_QUESTIONS[level] || DEFAULT_LEVEL_QUESTIONS.beginner;

  const handleOpenAdd = () => {
    setEditingQId(null);
    setFormLevel(level);
    setFormQuestion('');
    setFormOptions(['', '', '', '']);
    setFormCorrectIdx(0);
    setFormExplanation('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (q: Question, qLevel: 'beginner' | 'intermediate' | 'advanced', e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingQId(q.id);
    setFormLevel(qLevel);
    setFormQuestion(q.question);
    setFormOptions([...q.options]);
    setFormCorrectIdx(q.correctIdx);
    setFormExplanation(q.explanation);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number, qLevel: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const currList = questionsMap[qLevel] || [];
    if (currList.length <= 1) {
      alert('इस स्तर में कम से कम १ प्रश्न होना आवश्यक है।');
      return;
    }
    if (window.confirm('क्या आप इस परीक्षा प्रश्न को हटाना चाहते हैं?')) {
      const updated = {
        ...questionsMap,
        [qLevel]: currList.filter(q => q.id !== id)
      };
      setQuestionsMap(updated);
    }
  };

  const handleReset = () => {
    if (window.confirm('क्या आप सभी परीक्षा प्रश्नों को मूल डिफ़ॉल्ट पर रीसेट करना चाहते हैं?')) {
      setQuestionsMap(DEFAULT_LEVEL_QUESTIONS);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim()) {
      alert('कृपया प्रश्न अवश्य भरें।');
      return;
    }
    if (formOptions.some(opt => !opt.trim())) {
      alert('कृपया सभी ४ विकल्प अवश्य भरें।');
      return;
    }

    const currentList = questionsMap[formLevel] || [];
    if (editingQId !== null) {
      const updatedList = currentList.map(q =>
        q.id === editingQId
          ? {
              id: editingQId,
              question: formQuestion.trim(),
              options: formOptions.map(o => o.trim()),
              correctIdx: formCorrectIdx,
              explanation: formExplanation.trim()
            }
          : q
      );
      setQuestionsMap({ ...questionsMap, [formLevel]: updatedList });
    } else {
      const newId = Date.now();
      const newQ: Question = {
        id: newId,
        question: formQuestion.trim(),
        options: formOptions.map(o => o.trim()),
        correctIdx: formCorrectIdx,
        explanation: formExplanation.trim()
      };
      setQuestionsMap({ ...questionsMap, [formLevel]: [...currentList, newQ] });
    }
    setIsModalOpen(false);
  };

  const handleStart = () => {
    if (!studentName.trim()) {
      alert('कृपया अपना नाम दर्ज करें!');
      return;
    }
    setQuizStarted(true);
    setCurrentQIdx(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
    setScore(0);
  };

  const handleSelectOption = (optIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentQIdx] = optIdx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (selectedAnswers[currentQIdx] === undefined) {
      alert('कृपया एक विकल्प चुनें!');
      return;
    }
    if (currentQIdx < questions.length - 1) {
      setCurrentQIdx(currentQIdx + 1);
    } else {
      // Calculate score
      let correct = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIdx) {
          correct++;
        }
      });
      const pct = Math.round((correct / questions.length) * 100);
      setScore(pct);
      setQuizFinished(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-stone-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-200 border border-amber-400/30">
              <Award className="w-4 h-4 text-amber-300" />
              <span>रोनौड़ आर सांवता परीक्षा • संथाली भाषा प्रवीणता व डिजिटल प्रमाण-पत्र</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संथाली भाषा प्रवीणता परीक्षा एवं प्रमाणपत्र (Proficiency & Certification)
            </h1>
            <p className="text-amber-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              अपनी संथाली शब्दावली, व्याकरण, संस्कृति, और हुल इतिहास के ज्ञान की परीक्षा दें और ७०% से अधिक अंक प्राप्त कर आधिकारिक "संथाली भाषा मित्र एवं संस्कृति गौरव प्रमाणपत्र" प्राप्त करें।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <GraduationCap className="w-6 h-6 text-amber-300" />
            <div>
              <p className="text-xs text-amber-200">प्रमाणन स्तर</p>
              <p className="text-lg font-black text-white">३ स्तर उपलब्ध</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Action Bar */}
      {isAdmin && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
              प्रशासक नियंत्रण (Admin CMS) • परीक्षा प्रश्नोत्तरी
            </span>
            <span className="text-xs bg-amber-200 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              कुल {((questionsMap.beginner?.length || 0) + (questionsMap.intermediate?.length || 0) + (questionsMap.advanced?.length || 0))} प्रश्न
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAdminManager(!showAdminManager)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              {showAdminManager ? 'परीक्षा स्क्रीन देखें' : '📋 सभी प्रश्न देखें व प्रबंधित करें'}
            </button>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया प्रश्न जोड़ें</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="मूल प्रश्न सूची पुनर्स्थापित करें"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>रीसेट</span>
            </button>
          </div>
        </div>
      )}

      {/* Admin Full Question Manager View */}
      {isAdmin && showAdminManager && (
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                प्रवीणता परीक्षा प्रश्नावली प्रबंधन (Certificate Question Bank CMS)
              </h3>
              <p className="text-xs text-slate-500">
                तीनों स्तरों (आरंभिक, मध्यम, उच्च) के किसी भी प्रश्न को सुधारें, हटाएं या नया प्रश्न जोड़ें।
              </p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> नया प्रश्न
            </button>
          </div>

          {(['beginner', 'intermediate', 'advanced'] as const).map((lvlKey) => {
            const list = questionsMap[lvlKey] || [];
            const lvlLabel = lvlKey === 'beginner' ? 'प्राथमिक स्तर (Beginner)' : lvlKey === 'intermediate' ? 'मध्यम स्तर (Intermediate)' : 'विद्वत स्तर (Advanced)';
            return (
              <div key={lvlKey} className="space-y-3">
                <div className="flex items-center justify-between bg-slate-100 px-3.5 py-2 rounded-xl">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                    {lvlLabel} ({list.length} प्रश्न)
                  </span>
                  <button
                    onClick={() => {
                      setFormLevel(lvlKey);
                      handleOpenAdd();
                    }}
                    className="text-xs text-amber-700 font-bold hover:underline"
                  >
                    + इस स्तर में जोड़ें
                  </button>
                </div>

                <div className="space-y-2">
                  {list.map((q, qIndex) => (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col md:flex-row md:items-start justify-between gap-3"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                            {qIndex + 1}
                          </span>
                          <p className="text-xs font-bold text-slate-900 leading-snug">
                            {q.question}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 pl-7 text-[11px]">
                          {q.options.map((opt, oI) => (
                            <span
                              key={oI}
                              className={`px-2 py-1 rounded-md border text-left ${
                                oI === q.correctIdx
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              {oI === q.correctIdx ? '✓ ' : '• '}{opt}
                            </span>
                          ))}
                        </div>
                        {q.explanation && (
                          <p className="text-[10px] text-slate-500 pl-7 italic">
                            💡 {q.explanation}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 self-end md:self-start shrink-0">
                        <button
                          onClick={(e) => handleOpenEdit(q, lvlKey, e)}
                          className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1 transition-colors"
                          title="प्रश्न संपादित करें"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>सुधारें</span>
                        </button>
                        <button
                          onClick={(e) => handleDelete(q.id, lvlKey, e)}
                          className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center gap-1 transition-colors"
                          title="प्रश्न हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>हटाएं</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Section */}
      {!quizStarted && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              प्रवीणता परीक्षा में पंजीकरण करें (Enter Details)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              प्रमाणपत्र पर आपका यही नाम मुद्रित होगा। कृपया सही नाम दर्ज करें।
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                शिक्षार्थी का पूरा नाम (Student Name):
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="उदा. सुनील मुर्मू / प्रिया हांसदा"
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                कठिनाई स्तर चुनें (Select Level):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'beginner', title: 'प्राथमिक स्तर', desc: 'शब्दावली, अंक व अभिवादन' },
                  { id: 'intermediate', title: 'मध्यम स्तर', desc: 'व्याकरण, वाद्य व पर्व' },
                  { id: 'advanced', title: 'विद्वत स्तर', desc: 'सृष्टि, हुल, संस्कार व दर्शन' }
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id as any)}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      level === l.id
                        ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-1 ring-amber-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-900">{l.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4" />
              <span>परीक्षा प्रारंभ करें (Start Exam)</span>
            </button>
          </div>
        </div>
      )}

      {/* Quiz in progress */}
      {quizStarted && !quizFinished && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
            <span className="font-bold text-slate-500">
              प्रश्न {currentQIdx + 1} / {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold uppercase text-[10px]">
                {level} स्तर
              </span>
              {isAdmin && (
                <button
                  onClick={(e) => handleOpenEdit(questions[currentQIdx], level, e)}
                  className="px-2 py-0.5 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-md font-bold text-[10px] flex items-center gap-1 transition-colors"
                  title="इस प्रश्न को संपादित करें"
                >
                  <Edit2 className="w-3 h-3" /> सुधारें
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 leading-snug">
              {questions[currentQIdx].question}
            </h3>

            <div className="space-y-2.5">
              {questions[currentQIdx].options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQIdx] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-3.5 rounded-xl border text-left font-semibold text-xs transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                उत्तीर्ण होने के लिए ७०% अंक आवश्यक हैं।
              </span>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <span>{currentQIdx < questions.length - 1 ? 'अगला प्रश्न' : 'परिणाम देखें'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Finished: Score & Certificate */}
      {quizFinished && (
        <div className="space-y-6">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center bg-amber-100 text-amber-800">
              {score >= 70 ? (
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              ) : (
                <RotateCcw className="w-8 h-8 text-amber-600" />
              )}
            </div>

            <h2 className="text-xl font-black text-slate-900">
              {score >= 70 ? '🎉 बधाई! आपने परीक्षा सफलतापूर्वक उत्तीर्ण की!' : 'पुनः प्रयास करें!'}
            </h2>
            <p className="text-xs text-slate-600">
              {studentName}, आपका प्राप्तांक <span className="font-black text-amber-700">{score}%</span> रहा।
              {score >= 70
                ? ' आपका आधिकारिक प्रमाण-पत्र नीचे तैयार है। आप इसे प्रिंट या डाउनलोड कर सकते हैं।'
                : ' प्रमाण-पत्र प्राप्त करने के लिए न्यूनतम ७०% अंक आवश्यक हैं। कृपया पुनः प्रयास करें।'}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStart}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>पुनः परीक्षा दें</span>
              </button>
              {score >= 70 && (
                <button
                  onClick={handlePrint}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>प्रमाणपत्र प्रिंट / PDF सेव करें</span>
                </button>
              )}
            </div>
          </div>

          {/* Gorgeous Printable Certificate Card */}
          {score >= 70 && (
            <div
              ref={certRef}
              className="max-w-3xl mx-auto bg-[#FDFBF7] p-8 sm:p-12 rounded-3xl border-8 border-double border-amber-600 shadow-2xl relative text-center space-y-6 print:border-4 print:p-8"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 text-amber-700 text-xs font-bold">⚜️</div>
              <div className="absolute top-3 right-3 text-amber-700 text-xs font-bold">⚜️</div>
              <div className="absolute bottom-3 left-3 text-amber-700 text-xs font-bold">⚜️</div>
              <div className="absolute bottom-3 right-3 text-amber-700 text-xs font-bold">⚜️</div>

              {/* Certificate Header */}
              <div className="space-y-1">
                <p className="text-xs font-extrabold tracking-widest text-amber-800 uppercase">
                  HOR KATHA SUITE • संताली देवनागरी मंच
                </p>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
                  संथाली भाषा मित्र एवं संस्कृति गौरव प्रमाणपत्र
                </h2>
                <p className="text-xs text-slate-500 italic">Certificate of Proficiency in Santali Language & Heritage</p>
              </div>

              {/* Body Text */}
              <div className="space-y-3 py-2">
                <p className="text-xs text-slate-600 uppercase tracking-wider">यह प्रमाणित किया जाता है कि</p>
                <p className="text-2xl sm:text-3xl font-black text-amber-900 font-serif underline decoration-amber-400 underline-offset-8">
                  {studentName}
                </p>
                <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed pt-2">
                  ने होड़ काथा (संथाली देवनागरी) भाषा, शब्दावली, लोक-संस्कृति एवं ऐतिहासिक धरोहर की{' '}
                  <span className="font-bold text-slate-900 uppercase">[{level} स्तर]</span> प्रवीणता परीक्षा को{' '}
                  <span className="font-bold text-emerald-800">{score}% अंकों</span> के साथ सफलतापूर्वक उत्तीर्ण कर संथाली भाषा संवर्धन में अपनी निष्ठा सिद्ध की है।
                </p>
              </div>

              {/* Badges & Signatures */}
              <div className="pt-6 border-t border-amber-200/80 flex items-center justify-between text-left text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">जारी तिथि</p>
                  <p className="font-bold text-slate-800">{new Date().toLocaleDateString('hi-IN')}</p>
                  <p className="text-[10px] text-slate-500">डिजिटल सत्यापन कोड: HK-{Date.now().toString().slice(-6)}</p>
                </div>

                <div className="w-16 h-16 rounded-full border-2 border-amber-600 bg-amber-100/50 flex flex-col items-center justify-center text-center p-1">
                  <Star className="w-4 h-4 text-amber-700 fill-amber-700" />
                  <span className="text-[8px] font-black text-amber-900 leading-tight">BOSC SEAL</span>
                </div>

                <div className="text-right">
                  <p className="font-serif italic font-black text-amber-900 text-sm">Hor Katha Team</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">अकादमिक परिषद्</p>
                  <p className="text-[10px] text-slate-500">HorKathaSantali.ai.studio</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Question Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-100 text-amber-900 rounded-xl">
                  {editingQId !== null ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
                <h3 className="font-black text-slate-900 text-base">
                  {editingQId !== null ? 'परीक्षा प्रश्न संपादित करें (Edit Question)' : 'नया परीक्षा प्रश्न जोड़ें (Add Question)'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  प्रमाणन स्तर (Difficulty Level):
                </label>
                <select
                  value={formLevel}
                  onChange={(e) => setFormLevel(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="beginner">प्राथमिक स्तर (Beginner)</option>
                  <option value="intermediate">मध्यम स्तर (Intermediate)</option>
                  <option value="advanced">विद्वत स्तर (Advanced)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  प्रश्न (Question in Devanagari):
                </label>
                <textarea
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="उदा. संथाली समाज में कुल कितने मूल गोत्र (पारिस) हैं?"
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  ४ बहुविकल्पीय उत्तर (४ Options - सही उत्तर के आगे रेडियो चुनें):
                </label>
                <div className="space-y-2">
                  {formOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswerRadio"
                        checked={formCorrectIdx === idx}
                        onChange={() => setFormCorrectIdx(idx)}
                        className="w-4 h-4 text-amber-600 focus:ring-amber-500 cursor-pointer shrink-0"
                        title="इसे सही उत्तर के रूप में चिह्नित करें"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...formOptions];
                          updated[idx] = e.target.value;
                          setFormOptions(updated);
                        }}
                        placeholder={`विकल्प ${idx + 1}`}
                        className={`flex-1 p-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          formCorrectIdx === idx
                            ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-bold'
                            : 'border-slate-300 bg-white'
                        }`}
                        required
                      />
                      {formCorrectIdx === idx && (
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                          सही उत्तर
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  सांस्कृतिक व्याख्या / स्पष्टीकरण (Explanation - Optional):
                </label>
                <textarea
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="उदा. संथाली समाज में १२ पवित्र पारिस हैं..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सुरक्षित करें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
