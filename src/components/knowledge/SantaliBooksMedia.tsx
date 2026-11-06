import React from 'react';
import { Library } from 'lucide-react';
import { KHeader, KCard, KLink } from './ui';

const BOOKS: [string, string, string][] = [
  ['बिदु चांदान', 'पंडित रघुनाथ मुर्मू', 'प्रसिद्ध नाटक; ओल चिकी साहित्य की नींव।'],
  ['खेरवाल बीर', 'पंडित रघुनाथ मुर्मू', 'वीरता पर आधारित नाटक।'],
  ['रोनोड़', 'पंडित रघुनाथ मुर्मू', 'संताली व्याकरण।'],
  ['होड़कोरेन मारे हापड़ामको रेयाक कथा (1887)', 'कोलेयान हाड़ाम (संकलन: एल. ओ. स्क्रेफ़्सरुड)', 'संताल पुरखों की परंपरा और इतिहास का पुराना लिखित स्रोत।'],
  ['Santal Folk Tales (3 खंड)', 'पी. ओ. बोडिंग', 'संताली लोककथाओं का संग्रह, अंग्रेज़ी अनुवाद के साथ।'],
  ['A Santal Dictionary (5 खंड)', 'पी. ओ. बोडिंग', 'संताली का सबसे बड़ा पुराना शब्दकोश।'],
  ['भाबना', 'जदुमणि बेसरा', 'संताली का पहला साहित्य अकादमी पुरस्कार (2005)।'],
  ['जिवी झरना (1994)', 'दमयंती बेसरा', 'किसी संताल महिला का पहला कविता संग्रह।'],
];
const MEDIA: [string, string, string?][] = [
  ['संताली विकिपीडिया', 'ओल चिकी लिपि में संताली विश्वकोश; कोई भी लेख लिख सकता है।', 'https://sat.wikipedia.org/'],
  ['साहित्य अकादमी', 'संताली किताबें और अनुवाद; अकादमी की किताब दुकानों और वेबसाइट पर।', 'https://sahitya-akademi.gov.in/'],
  ['आकाशवाणी व दूरदर्शन', 'झारखंड, बंगाल और ओडिशा के क्षेत्रीय केंद्र संताली कार्यक्रम प्रसारित करते हैं; समय अपने नज़दीकी केंद्र से देखें।'],
  ['पत्रिकाएँ', 'कई संताली साहित्यिक पत्रिकाएँ छपती हैं, जैसे "खेरवाल जाहेर" और महिलाओं की पत्रिका "करम डार"।'],
];

export const SantaliBooksMedia: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <KHeader icon={<Library className="w-8 h-8 text-fuchsia-300" />} title="संताली किताबें और मीडिया" sub="पढ़ने लायक संताली किताबें, और संताली में पढ़ने-सुनने की जगहें।" grad="from-fuchsia-900 via-purple-950 to-slate-900" />
    <KCard title="ज़रूर पढ़ें">
      <div className="grid md:grid-cols-2 gap-3">
        {BOOKS.map(([b, a, t]) => <div key={b} className="rounded-xl bg-fuchsia-50 border border-fuchsia-100 p-3"><p className="font-bold text-slate-800">{b}</p><p className="text-xs text-fuchsia-800">{a}</p><p className="text-sm text-slate-700 mt-1">{t}</p></div>)}
      </div>
      <p className="text-[11px] text-slate-400 mt-3">2005–2025 के सभी साहित्य अकादमी पुरस्कार विजेता "संताली साहित्य व साहित्यकार" में देखें।</p>
    </KCard>
    <KCard title="संताली मीडिया">
      <div className="grid md:grid-cols-2 gap-3">
        {MEDIA.map(([n, t, u]) => <div key={n} className="rounded-xl border border-slate-100 p-3"><p className="font-bold text-slate-800">{n}</p><p className="text-sm text-slate-700">{t}</p>{u && <KLink href={u}>खोलें</KLink>}</div>)}
      </div>
      <p className="text-[11px] text-slate-400 mt-3">Admin: Edit Mode में "➕ नीचे जोड़ें" से YouTube चैनल, रेडियो कार्यक्रम या पत्रिका जोड़ें।</p>
    </KCard>
  </div>
);
export default SantaliBooksMedia;
