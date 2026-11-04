import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { toggleFavorite, isFavorite } from '../utils/favoritesStorage';
import {
  FileText,
  Volume2,
  Sparkles,
  Copy,
  Check,
  Printer,
  Download,
  Scroll,
  Heart,
  Users,
  Compass,
  Bookmark,
  Star,
  Eye,
  X
} from 'lucide-react';

interface LetterTemplate {
  id: string;
  titleDevanagari: string;
  titleRoman: string;
  category: 'wedding_invitation' | 'panchayat_application' | 'baisi_notice' | 'death_condolence';
  categoryLabel: string;
  description: string;
  templateDevanagari: string;
  templateHindiMeaning: string;
  culturalNote: string;
}

const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: 'l1',
    titleDevanagari: 'बापला नेवता साकाम (पारंपरिक संताली विवाह निमंत्रण पत्र)',
    titleRoman: 'Bapla Newta Sakam (Marriage Invitation)',
    category: 'wedding_invitation',
    categoryLabel: 'विवाह निमंत्रण पत्र (Wedding Invite)',
    description: 'सरजोम (साल) के पत्तों पर हल्दी और सिंदूर के टीके के साथ सगे-संबंधियों व पूरे गांव को विवाह का सादर निमंत्रण देने का पारंपरिक प्रारूप।',
    templateDevanagari: `॥ जाहेर एरा आर मरांग बुरुवाक् दया ते ॥

सगुन बापला नेवता साकाम (विवाह निमंत्रण)

मानतान् / मानोतिये: [संबंधी का नाम / पेड़ा कोवाक् ञुतूम]
आतु: [गांव], पोस्त: [पोस्ट], थाना: [थाना]

सगुन जोहार!
आडि रासका सांव ते बाडाय होचो पे काना जे, आबोवाक् हापड़ाम कोवाक् एयात बापला विधान लेकाते, इञिज बाबु [वर का नाम] सांव ते [ग्राम/गोत्र] रेन मानोतिये [ससुर का नाम] रेन कुड़ी गिद्रा मायी [वधू का नाम] वाक् पावन "दुवार बापला" हिजुक् कान् माह [तारीख] रे सागुन उतोर आकाना।

विवाह कार्यक्रम विवरण:
१. सगुन सुसुन आर माण्डवा: [तारीख व समय]
२. बारात सेतेर आर जांगा आबुक: [तारीख व समय]
३. सिंदूर दानांग (विवाह लग्न): [शुभ मुहूर्त]
४. पेड़ा दाराम आर दाका-उत् (भोज): [तारीख व समय]

अतएव, आपे सानाम पेड़ा-पुहुना, हात-हातुमी आर बोयहा-मिशी को ठीन् नेहोर काना जे, सगुन बेला रे सेतेर काते नवां युगल को सगुन थुमुक (आशीर्वाद) चाल पे।

नेवता जोहोकिच् (निमंत्रक):
[पिता/अभिभावक का नाम]
आतु: [गांव], कुलही: [टोला]
मोबाईल: [दूरभाष संख्या]`,
    templateHindiMeaning: `जाहेर एरा और मरांग बुरु की अनुकंपा से।
शुभ विवाह निमंत्रण पत्र।
आदरणीय संबंधी, हमारे पूर्वजों की पावन विवाह परंपरा अनुसार हमारे सुपुत्र और सुपुत्री का शुभ विवाह संपन्न होने जा रहा है। आप समस्त सगे-संबंधियों, ग्रामवासियों से सादर सप्रेम निवेदन है कि शुभ लग्न में पधारकर नवयुगल को अपना पावन आशीर्वाद प्रदान करें।`,
    culturalNote: 'पारंपरिक रूप से संताल समाज में निमंत्रण के लिए साल के पत्ते पर हल्दी की गांठ और सिंदूर लगाकर "नेवता साकाम" के रूप में गोदेत द्वारा घर-घर भेजा जाता है।'
  },
  {
    id: 'l2',
    titleDevanagari: 'मांझी हाड़ाम ठीन् आरजी / दरखास्त (ग्राम प्रधान हेतु आवेदन पत्र)',
    titleRoman: 'Manjhi Haram Thin Arji (Application to Village Head)',
    category: 'panchayat_application',
    categoryLabel: 'मांझी बाबा हेतु आवेदन (Panchayat Application)',
    description: 'गांव में पारिवारिक बंटवारे, सामाजिक विवाद या सीमांकन के समाधान हेतु मांझी बाबा और कुलही बैसी को दिया जाने वाला औपचारिक प्रार्थना पत्र।',
    templateDevanagari: `सेवा रे,
मानतान् मांझी बाबा,
आतु: [गांव का नाम], कुलही बैसी।

विषय: कुलही बैसी रे विचार-अचार नाम लगित् नेहोर आरजी।

मानोतिये गोमके,
इञ [आवेदक का नाम], पारिस [गोत्र], आतु [गांव] रेन बासिंदा कानिञ।
इञाक् नेहोर नोवा काना जे, [समस्या का संक्षिप्त विवरण - जैसे जमीन की सीमांकन या पारिवारिक सुलह] बाबद ते आबोवाक् आतु रे मित् ताला कुलही बैसी दुड़ुप होचो लगित् आडि जारुड़ आकाना। 

अतएव, मानतान् मांझी बाबा आर पारानिक, जोंग मांझी को ठीन् जोहार सांव ते नेहोर मेनाक्-आ जे, हिजुक् कान् हप्ता रे कुलही बैसी आहूत काते नोवा विचार रे न्याय एम चाले पे।

आपेयाक् मान-मानोत सांव,
आवेदक: [हस्ताक्षर / नाम]
गोत्र: [पारिस]
तारीख: [दिनांक]`,
    templateHindiMeaning: `सेवा में, आदरणीय मांझी बाबा, ग्राम पंचायत कुलही बैसी।
विषय: कुलही बैसी में न्याय और विचार-विमर्श हेतु प्रार्थना पत्र।
महोदय, मैं प्रार्थी सविनय निवेदन करता हूँ कि गांव की शांति और न्याय हेतु उक्त विषय पर कुलही बैसी की बैठक आहूत कर उचित समाधान प्रदान करने की कृपा करें।`,
    culturalNote: 'संताली समाज में स्वायत्त शासन व्यवस्था (मांझी परगना प्रणाली) के तहत गांव के आंतरिक मामलों के लिए मांझी बाबा सर्वोच्च न्याय-प्रतिनिधि होते हैं।'
  },
  {
    id: 'l3',
    titleDevanagari: 'कुलही बैसी दुड़ुप नेवता सूचना (ग्राम सभा की आवश्यक बैठक नोटिस)',
    titleRoman: 'Kulhi Baisi Durup Newta Suchna (Village Council Notice)',
    category: 'baisi_notice',
    categoryLabel: 'ग्राम सभा बैठक सूचना (Council Notice)',
    description: 'पर्व-त्योहार (बाहा, सोहराय) की तिथि निर्धारण अथवा गांव की सामूहिक सफाई व व्यवस्था हेतु गोदेत द्वारा जारी की जाने वाली सूचना।',
    templateDevanagari: `॥ आतु कुलही बैसी सूचना ॥

सानाम आतु होड़ को ठीन् बाडाय होचो लगित्:

नोवा ते सानाम आतु रेन ओड़ाक्-किसांड़ आर जुवान को बाडाय होचो पे काना जे, हिजुक् कान् [दिन व दिनांक] तिकिन बेला [समय] मांझी थान अखड़ा रे मित् जारुड़ "कुलही बैसी" दुड़ुप हुयुक्-आ।

बैठक रेयाक् मुख्य विचार:
१. नवां [बाहा / सोहराय / माघे] परोब रेयाक् दिन-बार ठीक।
२. जाहेर थान आर कुलही साफा-सुथरा कामि।
३. अखड़ा रे मांदर-धमक तायारी।

अतएव, सानाम ओड़ाक् खोन मित्-मित् होड़ सेतेर ताहेन् आडि लाकती गेया।

आदेश लेकाते:
मानतान् मांझी हाड़ाम / पारानिक
प्रचारक: गोदेत [नाम]
आतु: [गांव का नाम]`,
    templateHindiMeaning: `ग्राम पंचायत कुलही बैसी आवश्यक सूचना।
समस्त ग्रामवासियों को सूचित किया जाता है कि आगामी पर्व की तिथि व व्यवस्था हेतु मांझी थान अखड़ा में आवश्यक सभा आहूत की गई है। सभी परिवारों से एक-एक सदस्य की उपस्थिति अनिवार्य है।`,
    culturalNote: 'गोदेत पूरे गांव की कुलही (गली) में आवाज देकर या ढोल बजाकर इस प्रकार की सूचना प्रसारित करते हैं।'
  },
  {
    id: 'l4',
    titleDevanagari: 'शोक संदेश आर भांडान नेवता (पूर्वज मिलन शोक पत्र)',
    titleRoman: 'Shok Sandesh & Bhandan Newta',
    category: 'death_condolence',
    categoryLabel: 'शोक व भांडान पत्र (Condolence & Funeral)',
    description: 'परिवार के किसी पूज्य सदस्य के परलोक गमन के उपरांत शुद्धि संस्कार और भांडान भोज हेतु सगे-संबंधियों को सूचना।',
    templateDevanagari: `॥ हापड़ाम कोवाक् चरण रे विलीन ॥

मानतान् पेड़ा को,
आडि दुख सांव ते बाडाय होचो हुयुक् काना जे, आलिञिज गो-बाबा [दिवंगत का नाम], उमेर [आयु] वर्ष, माह [तारीख] रे नोवा धर्ती बागी काते हापड़ाम (बोंगा) लोक ते मोहाण्डा एनाकिन।

उकिनवाक् आत्मा रेयाक् शांति आर हापड़ाम सांव मिलान लगित् "भांडान / तेलांग दाहाक्" कार्यक्रम हिजुक् कान् [तारीख] रे आलिञाक् आतु ओड़ाक् रे सागुन-मुकुट संपन्न हुयुक्-आ।

सानाम पेड़ा-पुहुना को ठीन् नेहोर जे, सेतेर काते दिवंगत आत्मा लगित् शांति प्रार्थना आर प्रसाद ग्रहण पे।

दुखित परिवार:
[पुत्र/परिजनों के नाम]
आतु: [गांव], जिला: [जिला]`,
    templateHindiMeaning: `अत्यंत दुःखी मन से सूचित किया जाता है कि हमारे पूज्य पिता/माता का परलोक गमन हो गया है। उनकी आत्मा की शांति व पूर्वज मिलन संस्कार (भांडान) में आप सपरिवार उपस्थित होकर प्रार्थना करें।`,
    culturalNote: 'संताली संस्कृति में मृत्यु के बाद व्यक्ति बोंगा (आदरणीय पूर्वज) बन जाता है, अतः शोक के साथ श्रद्धा और शांति का भाव रहता है।'
  }
];

export const SantaliFormalLetterTemplates: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<LetterTemplate>(LETTER_TEMPLATES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [starred, setStarred] = useState<boolean>(false);

  useEffect(() => {
    setStarred(isFavorite(selectedLetter.id));
  }, [selectedLetter.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedLetter.templateDevanagari);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFavorite = () => {
    const isNowFav = toggleFavorite({
      id: selectedLetter.id,
      category: 'letter',
      categoryLabel: selectedLetter.categoryLabel,
      titleDevanagari: selectedLetter.titleDevanagari,
      titleRoman: selectedLetter.titleRoman,
      summary: selectedLetter.description
    });
    setStarred(isNowFav);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800/40 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Scroll size={280} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
            <Sparkles size={14} />
            <span>नेवता साकाम आर दरखास्त - प्रामाणिक औपचारिक प्रारूप</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-amber-100 flex items-center gap-3">
            <span>संताली औपचारिक पत्र व निमंत्रण प्रारूप</span>
            <button
              onClick={() => speakWithFemaleVoice('सांतार नेवता साकाम आर मांझी हाड़ाम ठीन् दरखास्त')}
              className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 transition-colors"
              title="सुनें"
            >
              <Volume2 size={22} />
            </button>
          </h1>
          <p className="text-amber-200/80 text-sm sm:text-base mt-2 leading-relaxed">
            विवाह निमंत्रण पत्र (बापला नेवता साकाम), मांझी हाड़ाम हेतु आवेदन (आरजी), कुलही बैसी आमसभा नोटिस और भांडान शोक पत्र — शुद्ध संताली देवनागरी में संपादन, प्रतिलिपि और मुद्रण (A4 Print / PDF) हेतु तैयार।
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Templates */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            उपलब्ध पत्र प्रारूप ({LETTER_TEMPLATES.length})
          </h2>
          {LETTER_TEMPLATES.map((item) => {
            const isSelected = selectedLetter.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedLetter(item)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-md scale-[1.01]'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                  {item.categoryLabel}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1.5">
                  {item.titleDevanagari}
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                  {item.titleRoman}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Preview & Action Area */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                  {selectedLetter.categoryLabel}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                  {selectedLetter.titleDevanagari}
                </h2>
                <p className="text-sm text-amber-700 dark:text-amber-400 font-semibold">
                  {selectedLetter.titleRoman}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    starred
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                  title="डायरी में सुरक्षित करें"
                >
                  <Bookmark size={16} />
                  <span>{starred ? 'सुरक्षित है' : 'सेव करें'}</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-700 text-white hover:bg-amber-800 text-xs sm:text-sm font-semibold transition-colors shadow"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'कॉपी हो गया!' : 'कॉपी'}</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-amber-500 dark:text-stone-950 text-xs sm:text-sm font-semibold hover:opacity-90 transition-all shadow"
                  title="A4 प्रिंट प्रीव्यू"
                >
                  <Eye size={16} />
                  <span>A4 प्रिंट प्रीव्यू</span>
                </button>
              </div>
            </div>

            {/* Cultural Note */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs sm:text-sm text-amber-900 dark:text-amber-300">
              <strong>सांस्कृतिक परंपरा:</strong> {selectedLetter.culturalNote}
            </div>

            {/* Letter Document Preview Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/30 dark:bg-slate-950 border-2 border-amber-800/30 font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap shadow-inner relative">
              <div className="absolute top-3 right-3 opacity-20 pointer-events-none">
                <Scroll size={60} />
              </div>
              {selectedLetter.templateDevanagari}
            </div>

            {/* Hindi Translation Note */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                हिन्दी भावार्थ व उद्देश्य:
              </span>
              <p>{selectedLetter.templateHindiMeaning}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: A4 Formatted Print & Export View */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden border border-amber-800/30 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-stone-900 text-white p-4 px-6 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-amber-400" />
                <span className="font-bold text-sm sm:text-base">
                  A4 आधिकारिक प्रिंट लेआउट • {selectedLetter.titleDevanagari}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Printer size={15} />
                  <span>प्रिंट / PDF सेव करें</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-1.5 rounded-full hover:bg-stone-800 text-slate-300"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* A4 Document Area */}
            <div className="p-8 sm:p-12 overflow-y-auto bg-amber-50/20 font-serif space-y-6">
              <div className="border-4 border-amber-900/60 p-8 sm:p-10 rounded-xl bg-white shadow-sm relative">
                {/* Formal Tribal Seal Top Decoration */}
                <div className="text-center border-b-2 border-amber-800 pb-4 mb-6">
                  <div className="text-xs uppercase tracking-widest text-amber-900 font-bold">
                    ॥ संताल परगना स्वायत्त सामाजिक व सांस्कृतिक धरोहर ॥
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                    {selectedLetter.titleDevanagari}
                  </h1>
                  <p className="text-xs text-stone-600 mt-0.5 italic">
                    {selectedLetter.titleRoman}
                  </p>
                </div>

                {/* Letter Body */}
                <div className="whitespace-pre-wrap text-stone-800 leading-relaxed text-sm sm:text-base font-sans">
                  {selectedLetter.templateDevanagari}
                </div>

                {/* Formal Signature Footers */}
                <div className="mt-12 pt-6 border-t border-dashed border-stone-400 grid grid-cols-2 text-xs sm:text-sm text-stone-700">
                  <div>
                    <span className="block font-bold">मांझी बाबा / कुलही मुहर:</span>
                    <span className="block mt-6 text-stone-400">....................................</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold">आवेदक / निमंत्रक हस्ताक्षर:</span>
                    <span className="block mt-6 text-stone-400">....................................</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
