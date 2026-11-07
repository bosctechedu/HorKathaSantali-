import React, { useMemo, useState } from 'react';
import { buildGeneratedQuiz } from '../../data/santaliData';
import { GraduationCap, CheckCircle2, XCircle, RotateCcw, ExternalLink } from 'lucide-react';

const EXAMS = [
  {
    name: 'JSSC CGL — Paper II (जनजातीय/क्षेत्रीय भाषा: संताली)',
    points: [
      '100 बहुविकल्पीय प्रश्न, कुल 300 अंक, समय 2 घंटे',
      'सही उत्तर पर +3, गलत उत्तर पर −1 (नकारात्मक अंकन)',
      'चुनी गई भाषा में कम से कम 30% अंक लाना ज़रूरी',
      'प्रश्न: व्याकरण, शब्दावली, अपठित गद्यांश, साहित्य व संस्कृति',
    ],
    link: 'https://jssc.nic.in/',
  },
  {
    name: 'UGC-NET — संताली (विषय कोड 95)',
    points: [
      'Paper I: शिक्षण व शोध अभिक्षमता — 50 प्रश्न, 100 अंक',
      'Paper II: संताली — 100 प्रश्न, 200 अंक',
      'दोनों पेपर एक साथ, कुल 3 घंटे (CBT)',
      'Paper II में 10 इकाइयाँ: नृवंशविज्ञान, भाषाविज्ञान व व्याकरण, भारतीय साहित्य, संताली साहित्य की विधाएँ, संताल इतिहास आदि',
    ],
    link: 'https://www.ugcnetonline.in/syllabus-new.php',
  },
];

type Q = { q: string; o: string[]; a: number; why: string };
const QUESTIONS: Q[] = [
  { q: 'ओल चिकी लिपि के रचयिता कौन हैं?', o: ['पॉल ओलाफ़ बोडिंग', 'पंडित रघुनाथ मुर्मू', 'सिदो मुर्मू', 'राम चंद्र मुर्मू'], a: 1, why: 'पंडित रघुनाथ मुर्मू ने 1925 में ओल चिकी लिपि बनाई।' },
  { q: 'ओल चिकी लिपि किस वर्ष बनी?', o: ['1905', '1925', '1947', '2003'], a: 1, why: 'ओल चिकी 1925 में बनी; 2025 में इसके 100 वर्ष पूरे हुए।' },
  { q: 'ओल चिकी वर्णमाला में कितने अक्षर हैं?', o: ['26', '30', '36', '44'], a: 1, why: 'ओल चिकी में 30 अक्षर हैं।' },
  { q: 'पंडित रघुनाथ मुर्मू को सम्मान से क्या कहा जाता है?', o: ['गुरु गोमके', 'माझी बाबा', 'पारगाना', 'नायके'], a: 0, why: 'उन्हें "गुरु गोमके" कहा जाता है।' },
  { q: 'संताली भाषा को संविधान की आठवीं अनुसूची में किस संशोधन से जोड़ा गया?', o: ['71वाँ', '86वाँ', '92वाँ', '100वाँ'], a: 2, why: '92वें संविधान संशोधन (2003) से संताली, बोडो, डोगरी व मैथिली जोड़ी गईं।' },
  { q: 'संताली किस भाषा परिवार की भाषा है?', o: ['द्रविड़', 'आस्ट्रो-एशियाटिक (मुंडा शाखा)', 'तिब्बती-बर्मी', 'हिन्द-आर्य'], a: 1, why: 'संताली आस्ट्रो-एशियाटिक परिवार की मुंडा शाखा की भाषा है।' },
  { q: 'संताली के लिए पहला साहित्य अकादमी पुरस्कार किसे मिला?', o: ['जदुमणि बेसरा', 'भोगला सोरेन', 'काली चरण हेम्ब्रम', 'दमयंती बेसरा'], a: 0, why: '2005 में जदुमणि बेसरा को कविता संग्रह "भाबना" के लिए।' },
  { q: 'संताली में साहित्य अकादमी पुरस्कार किस वर्ष से दिया जा रहा है?', o: ['1955', '1990', '2005', '2015'], a: 2, why: 'संताली के लिए यह पुरस्कार 2005 से दिया जा रहा है।' },
  { q: '"गुरु गोमके पंडित रघुनाथ मुर्मू" (जीवनी) के लेखक कौन हैं?', o: ['राम चंद्र मुर्मू', 'खेरवाल सोरेन', 'गंगाधर हांसदा', 'रबिलाल टुडू'], a: 0, why: 'राम चंद्र मुर्मू — साहित्य अकादमी पुरस्कार 2006।' },
  { q: 'संताल हूल (विद्रोह) किस वर्ष हुआ?', o: ['1831', '1855', '1857', '1900'], a: 1, why: '1855 में सिदो-कान्हू के नेतृत्व में संताल हूल हुआ।' },
  { q: 'हूल दिवस हर साल कब मनाया जाता है?', o: ['26 जनवरी', '30 जून', '15 नवंबर', '22 दिसंबर'], a: 1, why: 'हूल दिवस 30 जून को मनाया जाता है।' },
  { q: 'संताल हूल के प्रमुख नायक कौन थे?', o: ['बिरसा मुंडा', 'सिदो-कान्हू', 'तिलका माँझी', 'जतरा भगत'], a: 1, why: 'सिदो और कान्हू मुर्मू भाइयों ने हूल का नेतृत्व किया (साथ में चाँद-भैरव, फूलो-झानो)।' },
  { q: 'संताल गाँव के मुखिया को क्या कहते हैं?', o: ['माझी', 'ओझा', 'गोडेत', 'दिकू'], a: 0, why: 'गाँव का मुखिया "माझी" (माँझी हाड़ाम) कहलाता है।' },
  { q: 'संतालों का पवित्र उपवन क्या कहलाता है?', o: ['आखड़ा', 'जाहेर थान', 'कुल्ही', 'माझी थान'], a: 1, why: '"जाहेर थान" (जाहेरगाड़) गाँव का पवित्र उपवन है।' },
  { q: 'संतालों के सर्वोच्च देवता (बोंगा) कौन माने जाते हैं?', o: ['मारांग बुरु', 'जाहेर आयो', 'मोड़ेको-तुरुयको', 'गोसाईं एरा'], a: 0, why: 'मारांग बुरु को सर्वोच्च बोंगा माना जाता है।' },
  { q: 'वसंत में फूलों का संताली पर्व कौन-सा है?', o: ['सोहराय', 'बाहा', 'करम', 'सकरात'], a: 1, why: '"बाहा" (फूल) पर्व वसंत में साल के फूलों के साथ मनाया जाता है।' },
  { q: 'फसल कटाई और पशुधन से जुड़ा बड़ा संताली पर्व कौन-सा है?', o: ['बाहा', 'सोहराय', 'एरोक', 'हरियाड़'], a: 1, why: 'सोहराय फसल कटाई और पशुओं के सम्मान का पर्व है।' },
  { q: '"A Santal Dictionary" (5 खंड) किसने तैयार किया?', o: ['पी. ओ. बोडिंग', 'जी. ए. ग्रियर्सन', 'वेरियर एल्विन', 'एल. ओ. स्क्रेफ़्सरुड'], a: 0, why: 'नॉर्वे के मिशनरी पॉल ओलाफ़ बोडिंग ने यह शब्दकोश तैयार किया।' },
  { q: 'संताली में "पारगाना" किसे कहते हैं?', o: ['कई गाँवों के समूह का प्रमुख', 'पुजारी', 'संदेशवाहक', 'युवा मुखिया'], a: 0, why: 'पारगाना कई गाँवों (पारगाना) के समूह का प्रमुख होता है।' },
  { q: 'गाँव का पुजारी संताली में क्या कहलाता है?', o: ['नायके', 'जोग माझी', 'गोडेत', 'कुडाम नायके'], a: 0, why: '"नायके" गाँव का मुख्य पुजारी होता है।' },
];
// 30+ प्रश्न: ओल चिकी अंक व अक्षर-नाम (साइट के अपने डेटा से)
QUESTIONS.push(
  ...[...buildGeneratedQuiz('ol_digit'), ...buildGeneratedQuiz('ol_letter_name').slice(0, 10)].map((g) => ({
    q: g.question, o: g.options, a: g.answer, why: g.explanation,
  })),
);

export const ExamPrepSantali: React.FC = () => {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const score = useMemo(() => Object.entries(picked).filter(([i, v]) => QUESTIONS[+i].a === v).length, [picked]);
  const done = Object.keys(picked).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-900 via-slate-900 to-amber-900 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2"><GraduationCap className="w-8 h-8 text-amber-300" /><h1 className="text-2xl sm:text-3xl font-black">संताली प्रतियोगी परीक्षा तैयारी</h1></div>
        <p className="text-sm sm:text-base text-indigo-100">JSSC, UGC-NET और अन्य परीक्षाओं के संताली पेपर की जानकारी और अभ्यास प्रश्न। परीक्षा के नियम हर साल बदल सकते हैं, इसलिए आधिकारिक सूचना ज़रूर देखें।</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {EXAMS.map((e) => (
          <div key={e.name} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-black text-slate-800 mb-3">{e.name}</h2>
            <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-5">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <a href={e.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-indigo-700 hover:underline">आधिकारिक वेबसाइट <ExternalLink className="w-3 h-3" /></a>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="font-black text-slate-800">अभ्यास प्रश्न ({QUESTIONS.length})</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">अंक: {score} / {done}</span>
            <button onClick={() => setPicked({})} className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 inline-flex items-center gap-1"><RotateCcw className="w-3 h-3" /> फिर से</button>
          </div>
        </div>
        <ol className="space-y-4">
          {QUESTIONS.map((q, i) => {
            const p = picked[i];
            return (
              <li key={i} className="border border-slate-100 rounded-xl p-4">
                <p className="font-bold text-slate-800 mb-2">{i + 1}. {q.q}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.o.map((o, j) => {
                    const state = p === undefined ? '' : j === q.a ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : j === p ? 'bg-rose-50 border-rose-400 text-rose-800' : 'opacity-60';
                    return (
                      <button key={j} disabled={p !== undefined} onClick={() => setPicked((s) => ({ ...s, [i]: j }))}
                        className={`text-left text-sm px-3 py-2 rounded-lg border border-slate-200 hover:border-indigo-300 transition ${state}`}>
                        {String.fromCharCode(65 + j)}. {o}
                      </button>
                    );
                  })}
                </div>
                {p !== undefined && (
                  <p className={`mt-2 text-xs font-semibold flex items-start gap-1 ${p === q.a ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {p === q.a ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />} {q.why}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
export default ExamPrepSantali;
