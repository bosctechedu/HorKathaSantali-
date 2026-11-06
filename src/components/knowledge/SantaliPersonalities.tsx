import React from 'react';
import { Star } from 'lucide-react';
import { KHeader, KCard } from './ui';

const GROUPS: [string, [string, string][]][] = [
  ['स्वतंत्रता संग्राम', [
    ['सिदो-कान्हू मुर्मू', '1855 के संताल हूल के नेता।'],
    ['चाँद-भैरव, फूलो-झानो', 'हूल के वीर भाई-बहन।'],
  ]],
  ['भाषा और साहित्य', [
    ['पंडित रघुनाथ मुर्मू (गुरु गोमके)', '1925 में ओल चिकी लिपि के रचयिता।'],
    ['दमयंती बेसरा', 'पद्मश्री 2020; संताली में कविता संग्रह छापने वाली पहली महिला ("जिवी झरना", 1994); साहित्य अकादमी पुरस्कार 2009।'],
    ['कालीपद सोरेन (खेरवाल सोरेन)', 'नाटककार; साहित्य अकादमी पुरस्कार 2007, पद्मश्री 2022।'],
    ['हांसदा सौवेन्द्र शेखर', 'अंग्रेज़ी में संताल जीवन पर लिखने वाले चर्चित लेखक ("The Adivasi Will Not Dance")।'],
  ]],
  ['सार्वजनिक जीवन', [
    ['द्रौपदी मुर्मू', 'भारत की 15वीं राष्ट्रपति (25 जुलाई 2022 से); ओडिशा के मयूरभंज से।'],
    ['शिबू सोरेन (दिशोम गुरु)', 'JMM के सह-संस्थापक, झारखंड के तीन बार मुख्यमंत्री; 4 अगस्त 2025 को निधन, 2026 में मरणोपरांत पद्म भूषण।'],
    ['बाबूलाल मरांडी', 'झारखंड के पहले मुख्यमंत्री (2000)।'],
    ['हेमंत सोरेन', 'झारखंड के मुख्यमंत्री।'],
  ]],
];

export const SantaliPersonalities: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <KHeader icon={<Star className="w-8 h-8 text-yellow-300" />} title="प्रसिद्ध संताल व्यक्तित्व" sub="इतिहास, साहित्य और सार्वजनिक जीवन में संताल समाज का नाम रोशन करने वाले लोग।" grad="from-yellow-900 via-amber-950 to-stone-900" />
    {GROUPS.map(([g, list]) => (
      <KCard key={g} title={g}>
        <div className="grid sm:grid-cols-2 gap-3">
          {list.map(([n, t]) => <div key={n} className="rounded-xl bg-amber-50 border border-amber-100 p-3"><p className="font-bold text-slate-800">{n}</p><p className="text-sm text-slate-700">{t}</p></div>)}
        </div>
      </KCard>
    ))}
    <p className="text-[11px] text-slate-400">Admin: Edit Mode में "➕ नीचे जोड़ें" से और नाम जोड़ सकते हैं।</p>
  </div>
);
export default SantaliPersonalities;
