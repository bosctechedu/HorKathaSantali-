import React from 'react';
import { Scale } from 'lucide-react';
import { KHeader, KCard, KLink, KNote } from './ui';

const LAWS = [
  ['पाँचवीं अनुसूची (संविधान, अनुच्छेद 244)', 'अनुसूचित क्षेत्रों के प्रशासन के लिए विशेष व्यवस्था; राज्यपाल को विशेष अधिकार और जनजाति सलाहकार परिषद (TAC)।'],
  ['PESA क़ानून, 1996', 'अनुसूचित क्षेत्रों में ग्राम सभा को ज़मीन, लघु वनोपज, बाज़ार और स्थानीय संसाधनों पर बड़ा अधिकार; परंपरागत व्यवस्था (जैसे माझी-परगना) को मान्यता।'],
  ['वन अधिकार क़ानून (FRA), 2006', 'जंगल में पीढ़ियों से रहने/खेती करने वालों को व्यक्तिगत और सामुदायिक वन अधिकार का पट्टा; दावा ग्राम सभा की वन अधिकार समिति से शुरू होता है।'],
  ['संताल परगना काश्तकारी (SPT) अधिनियम, 1949', 'संताल परगना में आदिवासी ज़मीन की बिक्री/हस्तांतरण पर कड़ी रोक।'],
  ['छोटानागपुर काश्तकारी (CNT) अधिनियम, 1908', 'छोटानागपुर क्षेत्र में आदिवासी ज़मीन बाहरी लोगों को देने पर रोक।'],
  ['SC/ST (अत्याचार निवारण) अधिनियम, 1989', 'अनुसूचित जाति/जनजाति के लोगों के ख़िलाफ़ अत्याचार पर कड़ी सज़ा, विशेष अदालतें और पीड़ित को राहत।'],
];
const CERTS = [
  ['जाति प्रमाणपत्र (ST)', 'आधार, निवास का प्रमाण, खतियान/वंशावली या पिता का जाति प्रमाणपत्र, ग्राम प्रधान/माझी का प्रमाण (जहाँ माँगा जाए), फ़ोटो।'],
  ['आय प्रमाणपत्र', 'आधार, राशन कार्ड, स्व-घोषणा पत्र, वेतन पर्ची/आय का प्रमाण (अगर हो), फ़ोटो।'],
  ['निवास (आवासीय) प्रमाणपत्र', 'आधार, खतियान या ज़मीन की रसीद, वोटर कार्ड/बिजली बिल, फ़ोटो।'],
];
const PORTALS: [string, string][] = [
  ['झारखंड — JharSewa', 'https://jharsewa.jharkhand.gov.in/'],
  ['बिहार — RTPS सेवा', 'https://serviceonline.bihar.gov.in/'],
  ['ओडिशा — e-District', 'https://edistrict.odisha.gov.in/'],
];

export const TribalRightsLaws: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <KHeader icon={<Scale className="w-8 h-8 text-lime-300" />} title="आदिवासी अधिकार और क़ानून" sub="ज़मीन, जंगल और ग्राम सभा से जुड़े मुख्य क़ानून, और प्रमाणपत्र बनवाने की आसान जानकारी।" grad="from-lime-900 via-emerald-950 to-stone-900" />
    <KNote>यह केवल सामान्य जानकारी है, क़ानूनी सलाह नहीं। किसी मामले में ज़िला विधिक सेवा प्राधिकरण (DLSA) से मुफ़्त क़ानूनी मदद ली जा सकती है — राष्ट्रीय हेल्पलाइन 15100।</KNote>
    <div className="grid md:grid-cols-2 gap-4">
      {LAWS.map(([n, t]) => <KCard key={n} title={n}><p className="text-sm text-slate-700">{t}</p></KCard>)}
    </div>
    <KCard title="प्रमाणपत्र कैसे बनवाएँ">
      <ol className="text-sm text-slate-700 list-decimal pl-5 space-y-1 mb-4">
        <li>अपने राज्य के सेवा पोर्टल पर या नज़दीकी प्रज्ञा केंद्र / CSC पर आवेदन करें।</li>
        <li>नीचे दिए काग़ज़ स्कैन करके लगाएँ।</li>
        <li>आवेदन संख्या संभालकर रखें; अंचल कार्यालय से जाँच के बाद प्रमाणपत्र पोर्टल से डाउनलोड होगा।</li>
      </ol>
      <div className="grid md:grid-cols-3 gap-3">
        {CERTS.map(([n, t]) => <div key={n} className="rounded-xl bg-lime-50 border border-lime-100 p-3"><p className="font-bold text-slate-800">{n}</p><p className="text-xs text-slate-700 mt-1">{t}</p></div>)}
      </div>
      <div className="flex flex-wrap gap-4 mt-3">{PORTALS.map(([n, u]) => <KLink key={u} href={u}>{n}</KLink>)}</div>
      <p className="text-[11px] text-slate-400 mt-2">ज़रूरी काग़ज़ राज्य और ज़िले के अनुसार थोड़े अलग हो सकते हैं।</p>
    </KCard>
  </div>
);
export default TribalRightsLaws;
