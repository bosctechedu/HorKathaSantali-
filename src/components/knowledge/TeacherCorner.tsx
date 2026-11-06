import React from 'react';
import { Presentation, Printer } from 'lucide-react';
import { KHeader, KCard, KNote } from './ui';
import { OL_LETTERS, OL_DIGITS, shuffle } from '../../lib/olchiki';

const PLANS: [string, string, string[]][] = [
  ['कक्षा 1', 'ओल चिकी अक्षरों से पहचान', ['हर दिन 3 अक्षर: दिखाएँ, नाम बोलें, बच्चे दोहराएँ', 'हवा में और रेत/स्लेट पर अक्षर बनवाएँ', 'अक्षर-कार्ड से "पहचानो और उठाओ" खेल', 'हफ़्ते के अंत में 15 अक्षरों का मौखिक दोहराव']],
  ['कक्षा 2', 'सभी 30 अक्षर और अंक ᱐–᱙', ['अक्षरों को 6-6 के पाँच समूह में दोहराएँ', 'अंक लिखना और गिनती (वस्तुएँ गिनवाकर)', 'अक्षर-नाम मिलान अभ्यास-पत्र (नीचे से print करें)', 'घर-परिवार के आम शब्द बोलकर पढ़ना']],
  ['कक्षा 3', 'शब्द पढ़ना-लिखना', ['2–3 अक्षर वाले शब्द जोड़कर पढ़ना', 'चित्र देखकर शब्द लिखना', 'साइट के "शब्दकोश" से रोज़ 5 नए शब्द', 'छोटी कविता/बालगीत गाकर पढ़ना']],
  ['कक्षा 4', 'वाक्य और छोटी कहानी', ['सरल वाक्य बनाना और बोलना', 'लोककथा सुनाकर 3 प्रश्न पूछना', 'त्योहार (सोहराय, बाहा, करम) पर 5 वाक्य लिखना', 'जोड़ी में बातचीत अभ्यास']],
  ['कक्षा 5', 'पढ़कर समझना और लिखना', ['अनुच्छेद पढ़कर प्रश्नों के उत्तर', 'अपने गाँव/परिवार पर छोटा निबंध', 'संताल हूल और गुरु गोमके पर कहानी', 'महीने के अंत में quiz और "मेरी प्रगति" का प्रमाणपत्र']],
];

const openPrint = (title: string, body: string) => {
  const w = window.open('', '_blank'); if (!w) { alert('Pop-up खोलने की अनुमति दें।'); return; }
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>
  body{font-family:'Noto Sans Ol Chiki','Nirmala UI',sans-serif;margin:24px;color:#111} h1{font-size:20px;margin:0 0 4px} p{margin:0 0 14px;font-size:12px;color:#555}
  .g{display:grid;grid-template-columns:repeat(6,1fr);gap:8px} .c{border:1px solid #999;border-radius:6px;height:78px;display:flex;align-items:center;justify-content:center;font-size:44px}
  .f{color:#ccc} .row{display:flex;justify-content:space-between;font-size:20px;padding:10px 0;border-bottom:1px dashed #bbb} @media print{button{display:none}}</style></head><body>
  <button onclick="print()" style="float:right;padding:6px 14px">Print</button>${body}<p style="margin-top:18px">horkathasantali.pages.dev</p></body></html>`);
  w.document.close();
};
const head = (t: string) => `<h1>${t}</h1><p>नाम: ____________________ &nbsp; कक्षा: ______ &nbsp; तारीख़: __________</p>`;
const sheets = [
  ['अक्षर लिखने का अभ्यास', () => head('ओल चिकी अक्षर: देखकर लिखें') + `<div class="g">${OL_LETTERS.map((l) => `<div class="c">${l.char}</div><div class="c f">${l.char}</div><div class="c"></div>`).slice(0, 36).join('')}</div>`],
  ['सभी 30 अक्षर (हल्के, ऊपर से लिखें)', () => head('अक्षरों पर ऊपर से लिखें') + `<div class="g">${OL_LETTERS.map((l) => `<div class="c f">${l.char}</div>`).join('')}</div>`],
  ['अंक ᱐–᱙ लिखना', () => head('ओल चिकी अंक') + `<div class="g">${OL_DIGITS.map((d) => `<div class="c">${d.char}</div><div class="c f">${d.char}</div><div class="c"></div>`).join('')}</div>`],
  ['अक्षर और नाम मिलाएँ', () => { const L = shuffle(OL_LETTERS).slice(0, 10), R = shuffle(L); return head('रेखा खींचकर मिलाएँ') + L.map((l, i) => `<div class="row"><span style="font-size:36px">${l.char}</span><span>${R[i].hindi} (${R[i].roman})</span></div>`).join(''); }],
  ['अंक पहचानें', () => { const D = shuffle(OL_DIGITS); return head('ओल चिकी अंक के सामने हिन्दी अंक लिखें') + D.map((d) => `<div class="row"><span style="font-size:36px">${d.char}</span><span>= ______</span></div>`).join(''); }],
] as [string, () => string][];

export const TeacherCorner: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <KHeader icon={<Presentation className="w-8 h-8 text-sky-300" />} title="शिक्षक कोना" sub="कक्षा 1–5 के लिए संताली (ओल चिकी) पाठ-योजना और print करने लायक अभ्यास-पत्र।" grad="from-sky-900 via-blue-950 to-slate-900" />
    <KCard title="🖨️ अभ्यास-पत्र (हर बार नया क्रम)">
      <div className="flex flex-wrap gap-2">
        {sheets.map(([n, f]) => <button key={n} onClick={() => openPrint(n, f())} className="px-4 py-2 rounded-full bg-sky-600 text-white text-sm font-bold inline-flex items-center gap-2"><Printer className="w-4 h-4" />{n}</button>)}
      </div>
      <p className="text-[11px] text-slate-400 mt-2">नई खिड़की में पत्र खुलेगा; वहाँ "Print" दबाएँ या PDF के रूप में save करें।</p>
    </KCard>
    <div className="grid md:grid-cols-2 gap-4">
      {PLANS.map(([c, goal, steps]) => (
        <KCard key={c} title={`${c}: ${goal}`}>
          <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
        </KCard>
      ))}
    </div>
    <KNote>सुझाव: हर कक्षा 30–40 मिनट की रखें; 10 मिनट दोहराव, 20 मिनट नया पाठ, 10 मिनट खेल/अभ्यास। अपने स्कूल के पाठ्यक्रम के अनुसार बदलाव करें।</KNote>
  </div>
);
export default TeacherCorner;
