import React from 'react';
import { BarChart3 } from 'lucide-react';
import { KHeader, KCard } from './ui';

const STATES: [string, number][] = [
  ['झारखंड', 44.4], ['पश्चिम बंगाल', 33.0], ['ओडिशा', 11.7], ['बिहार', 6.2], ['असम', 2.9], ['अन्य राज्य', 1.8],
];
const max = STATES[0][1];
const fmt = (n: number) => `${n.toFixed(1)}%`;
const FACTS = [
  ['73,68,192', 'भारत में संताली बोलने वाले (जनगणना 2011, करमाली व महली बोलियाँ शामिल)'],
  ['22', 'आठवीं अनुसूची की भाषाओं में संताली शामिल (2003 से)'],
  ['30', 'ओल चिकी लिपि के अक्षर'],
  ['4 देश', 'भारत, बांग्लादेश, नेपाल और भूटान में संताली बोली जाती है'],
];

export const SantaliInNumbers: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <KHeader icon={<BarChart3 className="w-8 h-8 text-cyan-300" />} title="संताली आँकड़ों में" sub="कितने लोग बोलते हैं, कहाँ बोलते हैं — जनगणना 2011 के अनुसार।" grad="from-cyan-900 via-slate-900 to-indigo-900" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {FACTS.map(([n, t]) => <div key={t} className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-sm"><p className="text-2xl font-black text-cyan-700">{n}</p><p className="text-xs text-slate-600 mt-1">{t}</p></div>)}
    </div>
    <KCard title="राज्यवार हिस्सा: भारत के कुल संताली भाषियों में (जनगणना 2011)">
      <div className="space-y-2">
        {STATES.map(([s, n]) => (
          <div key={s} className="flex items-center gap-3 text-sm">
            <span className="w-28 shrink-0 font-semibold text-slate-700">{s}</span>
            <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500" style={{ width: `${Math.max(1, (n / max) * 100)}%` }} /></div>
            <span className="w-24 text-right tabular-nums text-slate-600">{fmt(n)}</span>
          </div>
        ))}
      </div>
    </KCard>
    <KCard title="भारत के बाहर">
      <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
        <li>बांग्लादेश: राजशाही और रंगपुर डिवीज़न</li>
        <li>नेपाल: मोरंग और झापा ज़िले (2011 में लगभग 51,000 संताल)</li>
        <li>भूटान: छोटी आबादी</li>
      </ul>
    </KCard>
    <p className="text-[11px] text-slate-400">स्रोत: भारत की जनगणना 2011 (C-16 भाषा तालिका)। प्रतिशत लगभग हैं।</p>
  </div>
);
export default SantaliInNumbers;
