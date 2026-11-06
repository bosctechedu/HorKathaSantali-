import React from 'react';
import { School } from 'lucide-react';
import { KHeader, KCard, KLink, KNote } from './ui';

const UNIS: [string, string, string, string][] = [
  ['रांची विश्वविद्यालय', 'रांची, झारखंड', 'M.A., Ph.D. (विभाग 1980 से)', 'https://www.ranchiuniversity.ac.in/santali'],
  ['सिदो-कान्हू मुर्मू विश्वविद्यालय', 'दुमका, झारखंड', 'M.A. संताली, संताल संस्कृति अध्ययन', 'https://skmu.ac.in/pg-programmes'],
  ['डॉ. श्यामा प्रसाद मुखर्जी विश्वविद्यालय', 'रांची, झारखंड', 'संताली विभाग', 'https://dspmuranchi.ac.in/'],
  ['विश्व-भारती', 'शांतिनिकेतन, प. बंगाल', '4-वर्षीय UG, M.A., Ph.D., सर्टिफ़िकेट/डिप्लोमा', 'https://www.visvabharati.ac.in/home/santali/'],
  ['विद्यासागर विश्वविद्यालय', 'मेदिनीपुर, प. बंगाल', 'M.A., Ph.D.', 'https://old.vidyasagar.ac.in/departments/Santali/Courses.aspx'],
  ['साधु रामचंद मुर्मू विश्वविद्यालय', 'झाड़ग्राम, प. बंगाल', 'M.A. संताली (110 सीट)', 'https://www.srcmujhargram.ac.in/academic/department/santali/'],
  ['महाराजा श्रीराम चंद्र भंज देव विश्वविद्यालय', 'बारिपदा, ओडिशा', 'M.A., Ph.D., सर्टिफ़िकेट', 'https://mscbu.ac.in/departments/santali'],
  ['KISS डीम्ड विश्वविद्यालय', 'भुवनेश्वर, ओडिशा', 'संताली विभाग', 'https://university.kiss.ac.in/'],
];
const CAREERS: [string, string][] = [
  ['शिक्षक / प्राध्यापक', 'स्कूल (संताली/ओल चिकी माध्यम), कॉलेज और विश्वविद्यालय। प्राध्यापक के लिए UGC-NET/SET ज़रूरी।'],
  ['सरकारी नौकरी', 'JSSC जैसी परीक्षाओं में संताली भाषा पेपर; संताली जानने वालों को स्थानीय पदों पर बढ़त।'],
  ['अनुवादक व दुभाषिया', 'सरकारी विभाग, अदालत, प्रकाशन, NGO और डिजिटल कंपनियाँ (ऐप, वेबसाइट, AI डेटा)।'],
  ['मीडिया', 'रेडियो/TV उद्घोषक, समाचार लेखन, YouTube और पॉडकास्ट।'],
  ['शोध व संग्रहालय', 'भाषा-विज्ञान, लोकसाहित्य, जनजातीय शोध संस्थान, संग्रहालय और अभिलेखागार।'],
  ['लेखन व प्रकाशन', 'किताबें, पाठ्य-पुस्तकें, बाल-साहित्य, पत्रिकाएँ।'],
];
const JOBS: [string, string][] = [
  ['JSSC (झारखंड)', 'https://jssc.nic.in/'],
  ['UGC-NET (संताली, कोड 95)', 'https://ugcnet.nta.ac.in/'],
  ['UPSC', 'https://upsc.gov.in/'],
];

export const SantaliStudyCareer: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <KHeader icon={<School className="w-8 h-8 text-teal-300" />} title="संताली पढ़ाई, करियर और नौकरी" sub="कहाँ से संताली में B.A./M.A./Ph.D. करें, आगे कौन-से रास्ते खुलते हैं, और नौकरी की सूचना कहाँ देखें।" grad="from-teal-900 via-cyan-950 to-slate-900" />
    <KCard title="संताली कहाँ पढ़ें">
      <div className="grid md:grid-cols-2 gap-3">
        {UNIS.map(([n, p, c, u]) => (
          <div key={n} className="rounded-xl bg-teal-50 border border-teal-100 p-3">
            <p className="font-bold text-slate-800">{n}</p>
            <p className="text-xs text-slate-500">{p}</p>
            <p className="text-sm text-slate-700 mt-1">{c}</p>
            <KLink href={u}>वेबसाइट</KLink>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-400 mt-3">झारखंड, बंगाल और ओडिशा के कई कॉलेजों में B.A. संताली भी है। प्रवेश की तारीख़ और सीटें हर साल विश्वविद्यालय की सूचना से देखें।</p>
    </KCard>
    <KCard title="संताली से करियर">
      <div className="grid md:grid-cols-2 gap-3">
        {CAREERS.map(([n, t]) => <div key={n} className="rounded-xl border border-slate-100 p-3"><p className="font-bold text-slate-800">{n}</p><p className="text-sm text-slate-700">{t}</p></div>)}
      </div>
    </KCard>
    <KCard title="नौकरी सूचना">
      <KNote>Admin/Operator: Edit Mode चालू करके इस लाइन पर क्लिक करें और "➕ नीचे जोड़ें" से नई vacancy (पद, विभाग, अंतिम तारीख़) जोड़ें।</KNote>
      <div className="flex flex-wrap gap-4 mt-2">{JOBS.map(([n, u]) => <KLink key={u} href={u}>{n}</KLink>)}</div>
    </KCard>
  </div>
);
export default SantaliStudyCareer;
