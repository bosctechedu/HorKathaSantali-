import React from 'react';
import { Landmark, ExternalLink, AlertTriangle } from 'lucide-react';

const SCHEMES = [
  { name: 'प्री-मैट्रिक छात्रवृत्ति (ST)', who: 'कक्षा 9 और 10 के अनुसूचित जनजाति छात्र', what: 'पढ़ाई के खर्च के लिए वार्षिक छात्रवृत्ति, सीधे बैंक खाते में (DBT)', how: 'राज्य पोर्टल या राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर आवेदन', link: 'https://scholarships.gov.in/' },
  { name: 'पोस्ट-मैट्रिक छात्रवृत्ति (ST)', who: 'कक्षा 11 से स्नातकोत्तर तक के ST छात्र', what: 'संस्थान की अनिवार्य फ़ीस और रखरखाव भत्ता; केंद्र-राज्य मिलकर देते हैं', how: 'राज्य पोर्टल (झारखंड में e-Kalyan) या NSP पर आवेदन', link: 'https://dbttribal.gov.in/' },
  { name: 'राष्ट्रीय छात्रवृत्ति — टॉप क्लास शिक्षा', who: 'मंत्रालय द्वारा अधिसूचित प्रमुख संस्थानों (IIT, IIM, AIIMS आदि) में दाख़िला पाए ST छात्र', what: 'पूरी फ़ीस और भत्ता, कोर्स पूरा होने तक', how: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)', link: 'https://scholarships.gov.in/' },
  { name: 'राष्ट्रीय फ़ेलोशिप (ST)', who: 'पोस्ट-ग्रेजुएट के बाद M.Phil./Ph.D. करने वाले ST शोधार्थी', what: 'हर साल 750 नए शोधार्थियों को फ़ेलोशिप', how: 'नेशनल फ़ेलोशिप पोर्टल', link: 'https://fellowship.tribal.gov.in/' },
  { name: 'राष्ट्रीय विदेश छात्रवृत्ति (ST)', who: 'विदेश में मास्टर्स/Ph.D./पोस्ट-डॉक करने वाले ST छात्र', what: 'विदेश में पढ़ाई का ख़र्च', how: 'जनजातीय कार्य मंत्रालय का पोर्टल', link: 'https://tribal.gov.in/ScholarshiP.aspx' },
  { name: 'एकलव्य मॉडल आवासीय विद्यालय (EMRS)', who: 'जनजातीय क्षेत्रों के छात्र-छात्राएँ', what: 'नवोदय विद्यालय जैसी आवासीय शिक्षा, स्थानीय कला-संस्कृति और खेल के साथ', how: 'अपने ज़िले के EMRS में प्रवेश परीक्षा/सूचना देखें', link: 'https://tribal.gov.in/' },
];

export const TribalSchemes: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl">
      <div className="flex items-center gap-3 mb-2"><Landmark className="w-8 h-8 text-emerald-300" /><h1 className="text-2xl sm:text-3xl font-black">आदिवासी छात्रों के लिए सरकारी योजनाएँ</h1></div>
      <p className="text-sm sm:text-base text-emerald-100">अनुसूचित जनजाति (ST) छात्रों के लिए केंद्र सरकार की मुख्य छात्रवृत्ति और शिक्षा योजनाएँ, सरल हिन्दी में।</p>
    </div>
    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs sm:text-sm">
      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
      <span>राशि, आय सीमा और अंतिम तारीख़ हर साल बदलती है। आवेदन से पहले आधिकारिक पोर्टल पर ताज़ा नियम ज़रूर देखें। आवेदन के लिए जाति प्रमाणपत्र, आय प्रमाणपत्र, आधार और बैंक खाता तैयार रखें।</span>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {SCHEMES.map((s) => (
        <div key={s.name} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col">
          <h2 className="font-black text-slate-800 mb-3">{s.name}</h2>
          <dl className="text-sm space-y-2 text-slate-700 flex-1">
            <div><dt className="font-bold text-slate-500 text-xs">किसके लिए</dt><dd>{s.who}</dd></div>
            <div><dt className="font-bold text-slate-500 text-xs">क्या मिलता है</dt><dd>{s.what}</dd></div>
            <div><dt className="font-bold text-slate-500 text-xs">कैसे आवेदन करें</dt><dd>{s.how}</dd></div>
          </dl>
          <a href={s.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-emerald-700 hover:underline">आधिकारिक पोर्टल <ExternalLink className="w-3 h-3" /></a>
        </div>
      ))}
    </div>
  </div>
);
export default TribalSchemes;
