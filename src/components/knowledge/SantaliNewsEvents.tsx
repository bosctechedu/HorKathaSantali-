import React from 'react';
import { Newspaper, CalendarDays, Info } from 'lucide-react';

const YEARLY = [
  { date: '30 जून', title: 'हूल दिवस', text: '1855 के संताल हूल और सिदो-कान्हू, चाँद-भैरव, फूलो-झानो की याद में।' },
  { date: '22 दिसंबर', title: 'संताली भाषा दिवस (भाषा विजय दिवस)', text: '22 दिसंबर 2003 को संताली आठवीं अनुसूची में शामिल हुई (92वाँ संविधान संशोधन)।' },
  { date: 'वसंत (फागुन)', title: 'बाहा पर्व', text: 'साल के नए फूलों के साथ जाहेर थान में पूजा और नाच-गान।' },
  { date: 'कटाई के बाद (कार्तिक-पौष)', title: 'सोहराय पर्व', text: 'फसल कटाई और पशुधन के सम्मान का सबसे बड़ा पर्व; तारीख़ गाँव/क्षेत्र के अनुसार।' },
  { date: 'भादो', title: 'करम पर्व', text: 'करम डाल की पूजा, भाई-बहन और प्रकृति का उत्सव।' },
];

const NEWS = [
  { date: '2025', title: 'ओल चिकी लिपि के 100 वर्ष', text: 'पंडित रघुनाथ मुर्मू द्वारा 1925 में बनी ओल चिकी लिपि ने 2025 में 100 वर्ष पूरे किए।' },
  { date: '2025', title: 'साहित्य अकादमी पुरस्कार: सुमित्रा सोरेन', text: 'कहानी संग्रह "मिद बिरना चेन्ने साओन इनाग सागाई" के लिए संताली का साहित्य अकादमी पुरस्कार।' },
];

export const SantaliNewsEvents: React.FC = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-sky-900 via-slate-900 to-violet-900 text-white shadow-xl">
      <div className="flex items-center gap-3 mb-2"><Newspaper className="w-8 h-8 text-sky-300" /><h1 className="text-2xl sm:text-3xl font-black">संताली समाचार और कार्यक्रम</h1></div>
      <p className="text-sm sm:text-base text-sky-100">संताली भाषा, साहित्य और समाज से जुड़ी ख़बरें, सम्मेलन, पुरस्कार और हर साल के ख़ास दिन।</p>
    </div>
    <div className="flex items-start gap-2 bg-sky-50 border border-sky-200 text-sky-900 rounded-xl p-3 text-xs sm:text-sm">
      <Info className="w-4 h-4 shrink-0 mt-0.5" />
      <span>Admin/Operator: Edit Mode चालू करके किसी ख़बर पर क्लिक करें और "➕ नीचे जोड़ें" से नई ख़बर या कार्यक्रम जोड़ें।</span>
    </div>
    <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <h2 className="font-black text-slate-800 mb-4 flex items-center gap-2"><Newspaper className="w-5 h-5 text-sky-600" /> ताज़ा ख़बरें</h2>
      <div className="space-y-3">
        {NEWS.map((n) => (
          <article key={n.title} className="border-l-4 border-sky-400 pl-3">
            <p className="text-[11px] font-bold text-sky-700">{n.date}</p>
            <h3 className="font-bold text-slate-800">{n.title}</h3>
            <p className="text-sm text-slate-700">{n.text}</p>
          </article>
        ))}
      </div>
    </section>
    <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <h2 className="font-black text-slate-800 mb-4 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-violet-600" /> हर साल के ख़ास दिन</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {YEARLY.map((y) => (
          <div key={y.title} className="rounded-xl bg-violet-50 border border-violet-100 p-4">
            <p className="text-xs font-bold text-violet-700">{y.date}</p>
            <h3 className="font-bold text-slate-800">{y.title}</h3>
            <p className="text-sm text-slate-700">{y.text}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
export default SantaliNewsEvents;
