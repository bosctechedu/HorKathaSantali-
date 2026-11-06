import React, { useState } from 'react';
import { BookMarked, Award, Search } from 'lucide-react';

const AWARDS: [number, string, string, string][] = [
  [2005, 'भाबना', 'कविता', 'जदुमणि बेसरा'],
  [2006, 'गुरु गोमके पंडित रघुनाथ मुर्मू', 'जीवनी', 'राम चंद्र मुर्मू'],
  [2007, 'चेत रे चिकायना', 'नाटक', 'खेरवाल सोरेन'],
  [2008, 'मनमी', 'कहानी', 'बादल हेम्ब्रम'],
  [2009, 'साय साहेद', 'कविता', 'दमयंती बेसरा'],
  [2010, 'राही रानवाक काना', 'नाटक', 'भोगला सोरेन'],
  [2011, 'बांचाव लड़हाई', 'कविता', 'आदित्य कुमार मांडी'],
  [2012, 'बांचाव आकान गोज होड़', 'कहानी', 'गंगाधर हांसदा'],
  [2013, 'चांदा बोंगा', 'कविता', 'अर्जुन चरण हेम्ब्रम'],
  [2014, 'माला मुदाम', 'नाटक', 'जमादार किस्कू'],
  [2015, 'पारसी खातिर', 'नाटक', 'रबिलाल टुडू'],
  [2016, 'नालहा', 'कविता', 'गोबिंद चंद्र माझी'],
  [2017, 'ताहेना तांगी रे', 'कविता', 'भुजंग टुडू'],
  [2018, 'मारोम', 'उपन्यास', 'श्याम सुंदर बेसरा'],
  [2019, 'सिसिरजाली', 'कहानी', 'काली चरण हेम्ब्रम'],
  [2020, 'गुड़ दाक खासा दाक', 'कविता', 'रूपचंद हांसदा'],
  [2021, 'माने रेना अरहांग', 'कहानी', 'निरंजन हांसदा'],
  [2022, 'साबारनाका बालिरे सानान पांजाय', 'कविता', 'काजली सोरेन (जगन्नाथ सोरेन)'],
  [2023, 'जाबा बाहा', 'कहानी', 'तुरिया चंद बास्के'],
  [2024, 'सेचेद सावंता रेन आंधा मानमी', 'नाटक', 'महेश्वर सोरेन'],
  [2025, 'मिद बिरना चेन्ने साओन इनाग सागाई', 'कहानी', 'सुमित्रा सोरेन'],
];

const PEOPLE = [
  { name: 'पंडित रघुनाथ मुर्मू (गुरु गोमके)', text: 'ओडिशा के मयूरभंज में जन्मे। 1925 में ओल चिकी लिपि बनाई, जिससे संताली भाषा को अपनी लिपि मिली। "बिदु चांदान" जैसे नाटक और कई पाठ्य-पुस्तकें लिखीं।' },
  { name: 'पॉल ओलाफ़ बोडिंग', text: 'नॉर्वे के मिशनरी और भाषाविद्। "A Santal Dictionary" (5 खंड) और संताली व्याकरण पर काम किया; संताली लोककथाओं का संग्रह भी किया।' },
  { name: 'साहित्य अकादमी पुरस्कार (संताली)', text: '92वें संविधान संशोधन (2003) से संताली आठवीं अनुसूची में आई; 2005 से हर वर्ष संताली की श्रेष्ठ पुस्तक को साहित्य अकादमी पुरस्कार मिलता है।' },
];

export const SantaliLiterature: React.FC = () => {
  const [q, setQ] = useState('');
  const rows = AWARDS.filter((r) => !q || r.join(' ').toLowerCase().includes(q.toLowerCase())).slice().reverse();
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-900 via-stone-900 to-amber-900 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2"><BookMarked className="w-8 h-8 text-amber-300" /><h1 className="text-2xl sm:text-3xl font-black">संताली साहित्य और साहित्यकार</h1></div>
        <p className="text-sm sm:text-base text-rose-100">ओल चिकी से आधुनिक कहानी तक: संताली साहित्य के प्रमुख नाम और साहित्य अकादमी पुरस्कार (2005–2025)।</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {PEOPLE.map((p) => (
          <div key={p.name} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-black text-slate-800 mb-2">{p.name}</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <h2 className="font-black text-slate-800 flex items-center gap-2"><Award className="w-5 h-5 text-amber-600" /> साहित्य अकादमी पुरस्कार — संताली</h2>
          <label className="flex items-center gap-2 border border-slate-200 rounded-full px-3 py-1.5 text-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="वर्ष, लेखक या विधा" className="outline-none w-40" />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs text-slate-500 border-b"><th className="py-2 pr-3">वर्ष</th><th className="py-2 pr-3">पुस्तक</th><th className="py-2 pr-3">विधा</th><th className="py-2">लेखक</th></tr></thead>
            <tbody>
              {rows.map(([y, b, g, a]) => (
                <tr key={y} className="border-b border-slate-100"><td className="py-2 pr-3 font-bold">{y}</td><td className="py-2 pr-3">{b}</td><td className="py-2 pr-3">{g}</td><td className="py-2">{a}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 mt-3">स्रोत: साहित्य अकादमी पुरस्कार सूची। पुस्तकों के नाम रोमन से देवनागरी में लिखे गए हैं।</p>
      </div>
    </div>
  );
};
export default SantaliLiterature;
