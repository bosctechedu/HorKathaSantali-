// Ported from EDISAM (edisam.ai.studio) — same UI, texts, question banks and behaviour.
// Converted from the production bundle back to TSX; local variable names are the minified originals.
// Data for the LDP panel: class 1-12 subjects & chapters, chapter question generator (15 MCQs per section),
// competitive / entrance exam groups and the Knowledge Shelf books.

import { dedupeQuestions } from "../utils/questionDedupe";
export const LDP_SUBJECTS = [
  {
    id: "santhali",
    name: "संताली भाषा व व्याकरण (Santhali Language & Grammar)",
    nameEn: "Santhali Language & Grammar",
    chapters: [
      {
        id: "ch1",
        name: "अध्याय १: संताली वर्णमाला व देवनागरी (Santhali Alphabet & Script)",
        nameEn: "Chapter 1: Santhali Alphabet & Script",
        desc: "संताली वर्णमाला, वर्णों के रूप, प्रकार तथा उच्चारण स्थान।",
      },
      {
        id: "ch2",
        name: "अध्याय २: बुनियादी संताली शब्द (Basic Santhali Words)",
        nameEn: "Chapter 2: Basic Words",
        desc: "संताली में दैनिक जीवन के शब्द, वस्तुओं, फूलों तथा रंगों के नाम।",
      },
      {
        id: "ch3",
        name: "अध्याय ३: संबंध और अभिवादन (Relations & Greetings)",
        nameEn: "Chapter 3: Greetings & Relations",
        desc: "पारिवारिक संबंध और शिष्टाचार के महत्वपूर्ण संताली वाक्य।",
      },
    ],
  },
  {
    id: "math",
    name: "गणित (Mathematics)",
    nameEn: "Mathematics",
    chapters: [
      {
        id: "ch1",
        name: "अध्याय १: संख्या पद्धति (Number Systems)",
        nameEn: "Chapter 1: Number Systems",
        desc: "संख्याओं का ज्ञान, स्थानीय मान, रोमन संख्याएँ तथा गुणनखंड।",
      },
      {
        id: "ch2",
        name: "अध्याय २: संक्रियाएं व बीजगणित (Operations & Algebra)",
        nameEn: "Chapter 2: Operations & Algebra",
        desc: "जोड़, घटाव, गुणा, भाग, भिन्न तथा बुनियादी बीजीय व्यंजक।",
      },
      {
        id: "ch3",
        name: "अध्याय ३: ज्यामिति व मापन (Geometry & Measurement)",
        nameEn: "Chapter 3: Geometry & Measurement",
        desc: "आकृतियां, कोण, परिमाप, क्षेत्रफल तथा मापन के नियम।",
      },
    ],
  },
  {
    id: "science",
    name: "विज्ञान / पर्यावरण (Science & EVS)",
    nameEn: "Science & EVS",
    chapters: [
      {
        id: "ch1",
        name: "अध्याय १: हमारा शरीर व स्वास्थ्य (Our Body & Health)",
        nameEn: "Chapter 1: Our Body & Health",
        desc: "मानव शरीर के अंग, संवेदी अंग, भोजन के घटक और स्वस्थ आदतें।",
      },
      {
        id: "ch2",
        name: "अध्याय २: सजीव व पर्यावरण (Living World & Environment)",
        nameEn: "Chapter 2: Living Things & Environment",
        desc: "पेड़-पौधे, पशु-पक्षी, अनुकूलन, खाद्य श्रृंखला और जल चक्र।",
      },
      {
        id: "ch3",
        name: "अध्याय ३: पदार्थ, बल व ऊर्जा (Matter, Force & Energy)",
        nameEn: "Chapter 3: Matter, Force & Energy",
        desc: "पदार्थ की अवस्थाएं, दैनिक जीवन में बल, गति और ऊर्जा के विभिन्न स्रोत।",
      },
    ],
  },
  {
    id: "social",
    name: "सामाजिक विज्ञान / इतिहास (Social Science)",
    nameEn: "Social Science",
    chapters: [
      {
        id: "ch1",
        name: "अध्याय १: हमारा सौरमंडल व पृथ्वी (Our Solar System & Earth)",
        nameEn: "Chapter 1: Solar System & Earth",
        desc: "ग्रह, नक्षत्र, पृथ्वी की गतियाँ, महाद्वीप व महासागर।",
      },
      {
        id: "ch2",
        name: "अध्याय २: इतिहास व स्वतंत्रता संग्राम (History & Freedom Struggle)",
        nameEn: "Chapter 2: History & Freedom",
        desc: "हमारे अतीत, सिंधु घाटी सभ्यता, वीर तिलका मांझी और संताल हूल।",
      },
      {
        id: "ch3",
        name: "अध्याय ३: नागरिक कर्तव्य व संविधान (Civics & Constitution)",
        nameEn: "Chapter 3: Civics & Constitution",
        desc: "लोकतंत्र, मौलिक अधिकार, कर्तव्य, राष्ट्रीय ध्वज और भारतीय संविधान।",
      },
    ],
  },
  {
    id: "english",
    name: "अंग्रेज़ी (English Language)",
    nameEn: "English Language",
    chapters: [
      {
        id: "ch1",
        name: "Chapter 1: Alphabet & Parts of Speech (वर्णमाला व शब्द भेद)",
        nameEn: "Chapter 1: Alphabet & Parts of Speech",
        desc: "Nouns, Pronouns, Adjectives, Vowels, and basic word structures.",
      },
      {
        id: "ch2",
        name: "Chapter 2: Verbs & Tenses (क्रिया व काल)",
        nameEn: "Chapter 2: Verbs & Tenses",
        desc: "Present, Past, and Future Tenses with correct helping verbs.",
      },
      {
        id: "ch3",
        name: "Chapter 3: Grammar & Sentence Making (व्याकरण व वाक्य निर्माण)",
        nameEn: "Chapter 3: Grammar & Sentences",
        desc: "Articles, Prepositions, Singular/Plural, and Synonyms/Antonyms.",
      },
    ],
  },
  {
    id: "hindi",
    name: "हिंदी व्याकरण व साहित्य (Hindi)",
    nameEn: "Hindi",
    chapters: [
      {
        id: "ch1",
        name: "अध्याय १: वर्णमाला और शब्द-भेद (Alphabets & Words)",
        nameEn: "Chapter 1: Alphabets & Words",
        desc: "हिंदी स्वर, व्यंजन, संज्ञा, सर्वनाम और विशेषण की बुनियादी समझ।",
      },
      {
        id: "ch2",
        name: "अध्याय २: क्रिया, काल और लिंग (Verbs, Tenses & Gender)",
        nameEn: "Chapter 2: Verbs, Tenses & Gender",
        desc: "क्रिया के भेद, काल परिवर्तन, लिंग और वचन के नियम।",
      },
      {
        id: "ch3",
        name: "अध्याय ३: संधि, समास व पर्यायवाची (Grammar & Vocabulary)",
        nameEn: "Chapter 3: Vocabulary & Grammar",
        desc: "संधि विच्छेद, महत्वपूर्ण समास, पर्यायवाची और विलोम शब्द।",
      },
    ],
  },
  {
    id: "computer",
    name: "कंप्यूटर विज्ञान व सूचना प्रौद्योगिकी (Computer & IT)",
    nameEn: "Computer Science & IT",
    chapters: [
      {
        id: "ch1",
        name: "अध्याय १: कंप्यूटर का परिचय व इतिहास (Introduction & History)",
        nameEn: "Chapter 1: Intro & History",
        desc: "कंप्यूटर की मूल परिभाषा, इतिहास, पीढ़ियां तथा बुनियादी घटक (इनपुट/आउटपुट डिवाइस)।",
      },
      {
        id: "ch2",
        name: "अध्याय २: सॉफ्टवेयर और ऑपरेटिंग सिस्टम (Software & OS)",
        nameEn: "Chapter 2: Software & OS",
        desc: "सिस्टम सॉफ्टवेयर, एप्लिकेशन सॉफ्टवेयर, विंडोज तथा बुनियादी कमांड।",
      },
      {
        id: "ch3",
        name: "अध्याय ३: इंटरनेट, सुरक्षा व कोडिंग (Internet, Cyber Security & Coding)",
        nameEn: "Chapter 3: Internet & Coding",
        desc: "इंटरनेट की कार्यप्रणाली, ई-मेल, साइबर सुरक्षा के नियम और बुनियादी प्रोग्रामिंग की समझ।",
      },
    ],
  },
];
export const generateChapterQuestions = (a: any, t: any, s: any) => {
  const n: any = [];
  for (let o = 1; o <= 15; o++) {
    let l = "",
      A: any = [],
      d = 0,
      u = "";
    if (a === 0) {
      if (s === "gs" || s.includes("general") || s.includes("studies")) {
        const p = [
          {
            text: "भारतीय संविधान की कौन सी अनुसूची भाषाओं (Languages) से संबंधित है?",
            options: [
              "सातवीं अनुसूची",
              "आठवीं अनुसूची",
              "नौवीं अनुसूची",
              "दसवीं अनुसूची",
            ],
            ans: 1,
            exp: "८वीं अनुसूची २२ आधिकारिक भाषाओं से संबंधित है। संताली भाषा को २००३ में ९२वें संशोधन द्वारा शामिल किया गया।",
          },
          {
            text: "भारत के किस राज्य को 'संताल विद्रोह' (संताल हूल १८५५) का मुख्य केंद्र माना जाता है?",
            options: ["बिहार", "झारखंड", "ओडिशा", "पश्चिम बंगाल"],
            ans: 1,
            exp: "१८५५ का महान संताल विद्रोह (हूल) मुख्य रूप से वर्तमान झारखंड के साहिबगंज और दुमका जिले के भोगनाडीह क्षेत्र में केंद्रित था।",
          },
          {
            text: "संसद के दोनों सदनों की संयुक्त बैठक की अध्यक्षता कौन करता है?",
            options: [
              "राष्ट्रपति",
              "प्रधानमंत्री",
              "लोकसभा अध्यक्ष",
              "राज्यसभा के सभापति",
            ],
            ans: 2,
            exp: "अनुच्छेद १०८ के अनुसार संयुक्त बैठक राष्ट्रपति बुलाते हैं तथा अध्यक्षता लोकसभा अध्यक्ष (Speaker) करते हैं।",
          },
          {
            text: "भारत में नीति आयोग (NITI Aayog) के पदेन अध्यक्ष कौन होते हैं?",
            options: [
              "राष्ट्रपति",
              "प्रधानमंत्री",
              "वित्त मंत्री",
              "गृह मंत्री",
            ],
            ans: 1,
            exp: "भारत के प्रधानमंत्री नीति आयोग (National Institution for Transforming India) के पदेन अध्यक्ष होते हैं।",
          },
          {
            text: "झारखंड राज्य का गठन किस वर्ष किया गया था?",
            options: [
              "१ नवंबर २०००",
              "९ नवंबर २०००",
              "१५ नवंबर २०००",
              "२५ नवंबर २०००",
            ],
            ans: 2,
            exp: "झारखंड राज्य का गठन १५ नवंबर २००० को भगवान बिरसा मुंडा की जयंती पर भारत के २८वें राज्य के रूप में किया गया था।",
          },
          {
            text: "निम्नलिखित में से कौन सा कर (Tax) अप्रत्यक्ष कर (Indirect Tax) का उदाहरण है?",
            options: [
              "आयकर (Income Tax)",
              "जीएसटी (GST)",
              "निगम कर (Corporate Tax)",
              "उपहार कर (Gift Tax)",
            ],
            ans: 1,
            exp: "जीएसटी (वस्तु एवं सेवा कर) भारत में व्यापक बहु-स्तरीय अप्रत्यक्ष कर है, जिसे २०१७ में लागू किया गया।",
          },
          {
            text: "भारतीय रिज़र्व बैंक (RBI) का मुख्यालय कहाँ स्थित है?",
            options: ["नई दिल्ली", "मुंबई", "कोलकाता", "चेन्नई"],
            ans: 1,
            exp: "आरबीआई की स्थापना १९३५ में हुई थी और इसका केंद्रीय कार्यालय मुंबई में स्थित है।",
          },
          {
            text: "भारत के किस राज्य में सबसे लंबी समुद्री तटरेखा (Coastline) है?",
            options: ["तमिलनाडु", "महाराष्ट्र", "गुजरात", "आंध्र प्रदेश"],
            ans: 2,
            exp: "गुजरात राज्य की समुद्री तटरेखा सबसे लंबी (लगभग १६०० किमी) है।",
          },
          {
            text: "मानव अधिकार दिवस (Human Rights Day) प्रतिवर्ष किस तिथि को मनाया जाता है?",
            options: ["५ जून", "२४ अक्टूबर", "१० दिसंबर", "१ दिसंबर"],
            ans: 2,
            exp: "संयुक्त राष्ट्र द्वारा १० दिसंबर १९४८ को मानवाधिकारों की घोषणा की याद में प्रतिवर्ष १० दिसंबर को मानवाधिकार दिवस मनाया जाता है।",
          },
          {
            text: "भारत में मौद्रिक नीति (Monetary Policy) कौन जारी करता है?",
            options: [
              "वित्त मंत्रालय",
              "भारतीय रिज़र्व बैंक (RBI)",
              "नीति आयोग",
              "SEBI",
            ],
            ans: 1,
            exp: "भारतीय रिज़र्व बैंक मुद्रास्फीति नियंत्रण और अर्थव्यवस्था के संतुलन के लिए मौद्रिक नीति जारी करता है।",
          },
          {
            text: "कर्क रेखा (Tropic of Cancer) भारत के कितने राज्यों से होकर गुजरती है?",
            options: ["६ राज्य", "७ राज्य", "८ राज्य", "९ राज्य"],
            ans: 2,
            exp: "कर्क रेखा (२३.५° उत्तरी अक्षांश) भारत के ८ राज्यों (गुजरात, राजस्थान, MP, छत्तीसगढ़, झारखंड, पश्चिम बंगाल, त्रिपुरा, मिजोरम) से गुजरती है।",
          },
          {
            text: "प्रसिद्ध 'चंपारण सत्याग्रह' किस वर्ष शुरू हुआ था?",
            options: ["१९१५", "१९१७", "१९१९", "१९२०"],
            ans: 1,
            exp: "महात्मा गांधी के नेतृत्व में भारत में पहला सत्याग्रह १९१७ में बिहार के चंपारण में नील किसानों के लिए हुआ था।",
          },
          {
            text: "भारत की सिलिकॉन वैली (Silicon Valley of India) किस शहर को कहा जाता है?",
            options: ["हैदराबाद", "पुणे", "बेंगलुरु", "नोएडा"],
            ans: 2,
            exp: "आईटी और सॉफ्टवेयर हब होने के कारण बेंगलुरु को भारत की सिलिकॉन वैली कहा जाता है।",
          },
          {
            text: "भारत का राष्ट्रीय जल जीव (National Aquatic Animal) कौन सा है?",
            options: ["ब्लू व्हेल", "गंगा डॉल्फिन", "घड़ियाल", "समुद्री कछुआ"],
            ans: 1,
            exp: "गंगा डॉल्फिन को २००९ में भारत का राष्ट्रीय जलीय जीव घोषित किया गया था।",
          },
          {
            text: "भारत की स्वतंत्रता के समय भारतीय राष्ट्रीय कांग्रेस के अध्यक्ष कौन थे?",
            options: [
              "जे.बी. कृपलानी",
              "जवाहरलाल नेहरू",
              "मौलाना आजाद",
              "सरदार पटेल",
            ],
            ans: 0,
            exp: "१९४७ में स्वतंत्रता के समय आचार्य जे.बी. कृपलानी कांग्रेस के अध्यक्ष थे।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else if (
        s === "math" ||
        s.includes("aptitude") ||
        s.includes("quant")
      ) {
        const p = [
          {
            text: "सरल करें: (३/५) का ४५% + (२/५) का ८०% = ?",
            options: ["०.५९", "०.७५", "०.८२", "०.९५"],
            ans: 0,
            exp: "(३/५)*०.४५ = ०.२७, (२/५)*०.८० = ०.३२. योग = ०.२७ + ०.३२ = ०.५९.",
          },
          {
            text: "यदि १० व्यक्ति किसी कार्य को ६ दिनों में पूरा कर सकते हैं, तो १५ व्यक्ति उसे कितने दिनों में पूरा करेंगे?",
            options: ["३ दिन", "४ दिन", "५ दिन", "८ दिन"],
            ans: 1,
            exp: "M1*D1 = M2*D2 => १०*६ = १५*D2 => ६०/१५ = ४ दिन।",
          },
          {
            text: "यदि किसी वस्तु का क्रय मूल्य रु. ४०० है और उसे रु. ५०० में बेचा जाता है, तो लाभ प्रतिशत क्या होगा?",
            options: ["१५%", "२०%", "२५%", "३०%"],
            ans: 2,
            exp: "लाभ = १०० रुपये. लाभ % = (१००/४००)*१०० = २५%.",
          },
          {
            text: "एक रेलगाड़ी ५४ किमी/घंटा की गति से चल रही है। m/s में इसकी गति क्या होगी?",
            options: ["१२ m/s", "१५ m/s", "१८ m/s", "२० m/s"],
            ans: 1,
            exp: "५४ * (५/१८) = ३ * ५ = १५ m/s.",
          },
          {
            text: "दो संख्याओं का अनुपात ३:४ है और उनका HCF ४ है। उनका LCM क्या होगा?",
            options: ["१२", "२४", "३६", "४८"],
            ans: 3,
            exp: "संख्याएँ १२ व १६ हैं. LCM = (१२*१६)/४ = ४८.",
          },
          {
            text: "यदि रु. ५,००० पर १०% वार्षिक दर से २ वर्ष का साधारण ब्याज कितना होगा?",
            options: ["रु. ५००", "रु. ८००", "रु. १,०००", "रु. १,२००"],
            ans: 2,
            exp: "साधारण ब्याज = (मूलधन * दर * समय)/१०० = (५००० * १० * २)/१०० = रु. १,०००.",
          },
          {
            text: "प्रथम १० प्राकृतिक संख्याओं का औसत (Average) क्या होगा?",
            options: ["५.०", "५.५", "६.०", "६.५"],
            ans: 1,
            exp: "प्रथम n प्राकृतिक संख्याओं का औसत = (n + 1)/2 = (10 + 1)/2 = 5.5.",
          },
          {
            text: "एक वृत्त (Circle) का व्यास २८ सेमी है। इसकी परिधि (Circumference) कितनी होगी?",
            options: ["६६ सेमी", "८८ सेमी", "१३२ सेमी", "१७६ सेमी"],
            ans: 1,
            exp: "परिधि = π * d = (२२/७) * २८ = २२ * ४ = ८८ सेमी.",
          },
          {
            text: "यदि A:B = 2:3 और B:C = 4:5 है, तो A:B:C का मान क्या होगा?",
            options: ["8:12:15", "6:9:15", "8:10:15", "4:6:10"],
            ans: 0,
            exp: "A:B:C = (2*4) : (3*4) : (3*5) = 8:12:15.",
          },
          {
            text: "यदि किसी संख्या का ४०% १२- बराबर है, तो उस संख्या का ६०% क्या होगा?",
            options: ["१५०", "१८०", "२००", "२४०"],
            ans: 1,
            exp: "संख्या = १२० / ०.४० = ३००. ६०% = ३०० * ०.६० = १८०.",
          },
          {
            text: "२५० मीटर लंबी ट्रेन ५० किमी/घंटा की गति से एक खंभे को कितने समय में पार करेगी?",
            options: ["१४ सेकंड", "१८ सेकंड", "२४ सेकंड", "३० सेकंड"],
            ans: 1,
            exp: "गति = ५० * ५/१८ = १२५/९ m/s. समय = दूरी / गति = २५० / (१२५/९) = १८ सेकंड.",
          },
          {
            text: "एक आयत की लंबाई २०% बढ़ाई जाती है और चौड़ाई १०% घटाई जाती है। क्षेत्रफल में प्रतिशत परिवर्तन क्या होगा?",
            options: ["८% वृद्धि", "१०% वृद्धि", "५% कमी", "कोई बदलाव नहीं"],
            ans: 0,
            exp: "परिवर्तन = x + y + (xy/100) = +20 - 10 + (20*-10)/100 = +10 - 2 = +8% वृद्धि.",
          },
          {
            text: "√६२५ + √१४४ का मान क्या होगा?",
            options: ["३५", "३७", "३९", "४२"],
            ans: 1,
            exp: "√६२५ = २५, √१४४ = १२. २५ + १२ = ३७.",
          },
          {
            text: "यदि x + 1/x = 4 है, तो x² + 1/x² का मान क्या होगा?",
            options: ["12", "14", "16", "18"],
            ans: 1,
            exp: "(x + 1/x)² - 2 = 16 - 2 = 14.",
          },
          {
            text: "एक परीक्षा में पास होने के लिए ३६% अंक चाहिए। एक छात्र को १४५ अंक मिले और वह ३५ अंकों से फेल हो गया। अधिकतम अंक कितने हैं?",
            options: ["४००", "४५०", "५००", "६००"],
            ans: 2,
            exp: "३६% = १४५ + ३५ = १८० अंक. १००% = (१८०/३६)*१०० = ५०० अंक.",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else if (
        s === "english" ||
        s.includes("verbal") ||
        s.includes("lang")
      ) {
        const p = [
          {
            text: 'Choose the correct synonym for "ABUNDANT":',
            options: ["Scarcity", "Plentiful", "Rare", "Deficient"],
            ans: 1,
            exp: '"Abundant" means existing in large quantities. Synonym is "Plentiful".',
          },
          {
            text: "Identify the correct spelling among the options:",
            options: [
              "Accomodation",
              "Accommodation",
              "Acomodation",
              "Accomodasion",
            ],
            ans: 1,
            exp: 'Correct spelling is "Accommodation" with double "c" and double "m".',
          },
          {
            text: 'Choose the word opposite in meaning (Antonym) to "TRANSPARENT":',
            options: ["Clear", "Opaque", "Translucent", "Fragile"],
            ans: 1,
            exp: "The opposite of transparent (clear) is opaque (not see-through).",
          },
          {
            text: 'Fill in the blank: "She has been suffering ________ fever since Monday."',
            options: ["from", "with", "by", "of"],
            ans: 0,
            exp: 'The verb "suffering" is followed by preposition "from" for illnesses.',
          },
          {
            text: 'Choose the correct Passive Voice for: "He wrote a letter."',
            options: [
              "A letter is written by him.",
              "A letter was written by him.",
              "A letter has been written by him.",
              "A letter had been written by him.",
            ],
            ans: 1,
            exp: 'Simple Past Tense active voice "wrote" converts to "was written" in passive voice.',
          },
          {
            text: 'Identify the Part of Speech of the underlined word: "He walked *slowly* into the room."',
            options: ["Noun", "Adjective", "Adverb", "Preposition"],
            ans: 2,
            exp: '"Slowly" modifies the verb "walked", making it an Adverb.',
          },
          {
            text: 'Select the one word substitute for: "One who knows everything"',
            options: ["Omnipresent", "Omnipotent", "Omniscient", "Optimist"],
            ans: 2,
            exp: '"Omniscient" means all-knowing.',
          },
          {
            text: 'Fill in the blank with appropriate article: "He is ________ European country representative."',
            options: ["a", "an", "the", "no article"],
            ans: 0,
            exp: `"European" starts with consonant sound 'yu', so "a" is used.`,
          },
          {
            text: 'Choose the correct meaning of idiom: "To turn a deaf ear"',
            options: [
              "To listen attentively",
              "To ignore or refuse to listen",
              "To be hard of hearing",
              "To shout loudly",
            ],
            ans: 1,
            exp: '"Turn a deaf ear" means deliberately ignoring what someone says.',
          },
          {
            text: "Choose the correct sentence:",
            options: [
              "He is more taller than his brother.",
              "He is taller than his brother.",
              "He is tallest than his brother.",
              "He is most tall than his brother.",
            ],
            ans: 1,
            exp: 'Double comparatives like "more taller" are incorrect. "Taller than" is correct.',
          },
          {
            text: "Find the correctly spelt word:",
            options: ["Receive", "Recieve", "Receeve", "Reiceve"],
            ans: 0,
            exp: 'Rule: "i" before "e" except after "c". Thus "Receive" is correct.',
          },
          {
            text: 'Change into indirect speech: She said, "I am happy."',
            options: [
              "She said that she is happy.",
              "She said that she was happy.",
              "She told that I am happy.",
              "She says that she was happy.",
            ],
            ans: 1,
            exp: 'Present simple "am" changes to past simple "was" in indirect reporting.',
          },
          {
            text: 'Choose the antonym of "BENEVOLENT":',
            options: ["Kind", "Malevolent", "Generous", "Friendly"],
            ans: 1,
            exp: '"Benevolent" means well-meaning/kind. Its antonym is "Malevolent" (wishing harm).',
          },
          {
            text: 'Plural form of "Criterion" is:',
            options: ["Criterions", "Criteria", "Criterias", "Criterium"],
            ans: 1,
            exp: '"Criteria" is the irregular plural form of "Criterion".',
          },
          {
            text: 'Fill in the blank: "Neither Rohan nor his friends ________ present in the meeting."',
            options: ["was", "were", "is", "has"],
            ans: 1,
            exp: 'With "neither...nor", verb agrees with the closer subject ("his friends" - plural, so "were").',
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else if (s === "computer" || s.includes("computer")) {
        const p = [
          {
            text: "कंप्यूटर का जनक (Father of Computer) किसे कहा जाता है?",
            options: [
              "एलन ट्यूरिंग",
              "चार्ल्स बैबेज",
              "जॉन वॉन न्यूमैन",
              "बिल गेट्स",
            ],
            ans: 1,
            exp: "चार्ल्स बैबेज ने १९वीं सदी में विश्लेषणात्मक इंजन (Analytical Engine) का डिजाइन बनाया था।",
          },
          {
            text: "इंटरनेट पर फाइलों के सुरक्षित स्थानांतरण (Transfer) के लिए किस प्रोटोकॉल का उपयोग किया जाता है?",
            options: ["HTML", "HTTP", "FTP", "SMTP"],
            ans: 2,
            exp: "FTP (File Transfer Protocol) नेटवर्क पर फाइल अपलोड/डाउनलोड करने के लिए प्रयोग होता है।",
          },
          {
            text: "निम्नलिखित में से कौन सा कंप्यूटर की गैर-वाष्पशील (Non-volatile / स्थायी) मेमोरी का उदाहरण है?",
            options: ["RAM", "SRAM", "DRAM", "ROM"],
            ans: 3,
            exp: "ROM (Read Only Memory) की सामग्री बिजली जाने पर भी सुरक्षित रहती है।",
          },
          {
            text: "एमएस एक्सेल (MS Excel) में किसी फॉर्मूले को शुरू करने के लिए किस प्रतीक का उपयोग किया जाता है?",
            options: ["+", "=", "#", "@"],
            ans: 1,
            exp: "एमएस एक्सेल में सभी सूत्र हमेशा बराबर (=) चिन्ह से शुरू होते हैं।",
          },
          {
            text: "कंप्यूटर नेटवर्क में IP का पूर्ण रूप क्या होता है?",
            options: [
              "Intranet Protocol",
              "Internet Protocol",
              "Information Protocol",
              "Instant Protocol",
            ],
            ans: 1,
            exp: "IP का पूर्ण रूप Internet Protocol है।",
          },
          {
            text: "ईमेल पते में यूजरनेम और डोमेन नाम को अलग करने के लिए किस प्रतीक का प्रयोग किया जाता है?",
            options: ["#", "$", "@", "&"],
            ans: 2,
            exp: 'ईमेल पते में "@" (At the rate) चिन्ह दोनों भागों को पृथक करता है।',
          },
          {
            text: "कंप्यूटर का मस्तिष्क किसे कहा जाता है?",
            options: ["Monitor", "Keyboard", "CPU", "Hard Disk"],
            ans: 2,
            exp: "CPU (Central Processing Unit) सभी गणनाएँ और नियंत्रण करता है।",
          },
          {
            text: "१ गीगाबाइट (1 GB) में कितने मेगाबाइट (MB) होते हैं?",
            options: ["५१२ MB", "१०२४ MB", "२०४८ MB", "१००० MB"],
            ans: 1,
            exp: "१ GB = १०२४ MB होता है।",
          },
          {
            text: "वेब पेज डिजाइन करने के लिए प्राथमिक भाषा कौन सी है?",
            options: ["C++", "HTML", "SQL", "Python"],
            ans: 1,
            exp: "HTML (HyperText Markup Language) वेब पेजों की संरचना तैयार करती है।",
          },
          {
            text: "कंप्यूटर बंद होने पर किस मेमोरी का डेटा नष्ट हो जाता है (Volatile)?",
            options: ["ROM", "RAM", "Hard Disk", "Pen Drive"],
            ans: 1,
            exp: "RAM (Random Access Memory) एक अस्थायी वाष्पशील मेमोरी है।",
          },
          {
            text: "किसी दस्तावेज़ को प्रिंट करने की शॉर्टकट कुंजी क्या है?",
            options: ["Ctrl + C", "Ctrl + P", "Ctrl + V", "Ctrl + S"],
            ans: 1,
            exp: "Ctrl + P का प्रयोग दस्तावेज़ प्रिंट करने के लिए किया जाता है।",
          },
          {
            text: "सुपर कंप्यूटर के पिता के रूप में किसे जाना जाता है?",
            options: [
              "सीमुर क्रे (Seymour Cray)",
              "चार्ल्स बैबेज",
              "एलन ट्यूरिंग",
              "टिम बर्नर्स ली",
            ],
            ans: 0,
            exp: "सीमुर क्रे ने दुनिया का पहला सफल सुपरकंप्यूटर (Cray-1) बनाया था।",
          },
          {
            text: "डेटाबेस को प्रबंधित और एक्सेस करने के लिए किस भाषा का प्रयोग किया जाता है?",
            options: ["HTML", "SQL", "CSS", "HTTP"],
            ans: 1,
            exp: "SQL (Structured Query Language) का प्रयोग डेटाबेस में डेटा प्रबंधन के लिए होता है।",
          },
          {
            text: "कंप्यूटर सुरक्षा में फ़ायरवॉल (Firewall) का मुख्य कार्य क्या है?",
            options: [
              "कंप्यूटर को ठंडा रखना",
              "अनधिकृत पहुँच (Unauthorized Access) को रोकना",
              "प्रिंटिंग में मदद करना",
              "स्पीड बढ़ाना",
            ],
            ans: 1,
            exp: "फायरवॉल नेटवर्क ट्रैफ़िक को फ़िल्टर कर अनधिकृत पहुँच से सुरक्षा प्रदान करता है।",
          },
          {
            text: "विश्वव्यापी वेब (World Wide Web) का आविष्कार १९८९ में किसने किया था?",
            options: [
              "स्टीव जॉब्स",
              "टिम बर्नर्स ली (Tim Berners-Lee)",
              "बिल गेट्स",
              "मार्क जुकरबर्ग",
            ],
            ans: 1,
            exp: "टिम बर्नर्स ली ने CERN में WWW की खोज की थी।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else {
        const p = [
          {
            text: "यदि कूट भाषा में 'CAT' को '3120' लिखा जाता है, तो 'DOG' को क्या लिखा जाएगा?",
            options: ["४१५७", "४२६८", "३१५७", "५१५८"],
            ans: 0,
            exp: "C=3, A=1, T=20. D=4, O=15, G=7 => 4157.",
          },
          {
            text: "शृंखला को पूरा करें: २, ६, १२, २०, ३०, ?",
            options: ["३६", "४०", "४२", "४८"],
            ans: 2,
            exp: "+४, +६, +८, +१०, +१२ => ३० + १२ = ४२.",
          },
          {
            text: "एक व्यक्ति पूर्व में १० मी चलता है फिर बाएं ५ मी चलता है। वह किस दिशा में है?",
            options: ["उत्तर", "पूर्व", "उत्तर-पूर्व", "दक्षिण-पूर्व"],
            ans: 2,
            exp: "१० मी पूर्व व ५ मी उत्तर से दिशा उत्तर-पूर्व (North-East) होगी।",
          },
          {
            text: "यदि कल से पहले का दिन रविवार था, तो कल के बाद का दिन क्या होगा?",
            options: ["गुरुवार", "शुक्रवार", "शनिवार", "बुधवार"],
            ans: 0,
            exp: "कल से पहले रविवार => आज मंगलवार. कल बुधवार => कल के बाद गुरुवार.",
          },
          {
            text: "विषम (Odd One Out) को चुनें:",
            options: ["काठमांडू", "नई दिल्ली", "ढाका", "मुंबई"],
            ans: 3,
            exp: "मुंबई भारत का शहर है जबकि अन्य तीन देशों की राजधानियाँ हैं।",
          },
          {
            text: "यदि A, B का भाई है और C, A की माता है, तो C का B से क्या संबंध है?",
            options: ["माता", "बहन", "पुत्री", "मामी"],
            ans: 0,
            exp: "A और B भाई हैं और C दोनों की माता हैं।",
          },
          {
            text: "अंग्रेजी वर्णमाला में बाएं से १०वें अक्षर के दाएं ५वां अक्षर कौन सा होगा?",
            options: ["N", "O", "P", "Q"],
            ans: 1,
            exp: "१० + ५ = १५वां अक्षर 'O' होता है।",
          },
          {
            text: "शृंखला पूर्ण करें: ३, ९, २७, ८१, ?",
            options: ["१६२", "२४३", "३२४", "४०५"],
            ans: 1,
            exp: "प्रत्येक पद में ३ से गुणा हो रहा है: ८१ * ३ = २४३.",
          },
          {
            text: "यदि '+' का अर्थ गुणा और '-' का अर्थ भाग है, तो २० - ५ + ४ का मान क्या होगा?",
            options: ["१६", "२०", "२४", "२८"],
            ans: 0,
            exp: "२० / ५ * ४ = ४ * ४ = १६.",
          },
          {
            text: "घड़ी में ३:०० बजे घंटे और मिनट की सुइयों के बीच कितना कोण बनता है?",
            options: ["६०°", "७५°", "९०°", "१२०°"],
            ans: 2,
            exp: "३:०० बजे समकोण (९० डिग्री) बनता है।",
          },
          {
            text: "विषम युग्म को पहचानें:",
            options: [
              "डॉक्टर - अस्पताल",
              "शिक्षक - विद्यालय",
              "किसान - खेत",
              "वकील - अदालत",
              "दर्जी - लकड़ी",
            ],
            ans: 4,
            exp: "दर्जी का कार्य स्थल कपड़ा होता है, लकड़ी नहीं।",
          },
          {
            text: "यदि 16, 25, 36, 49 का पैटर्न है, तो अगला पद क्या होगा?",
            options: ["५६", "६०", "६४", "८१"],
            ans: 2,
            exp: "4², 5², 6², 7² का पैटर्न है. अगला पद 8² = 64.",
          },
          {
            text: "शब्द 'DICTIONARY' के अक्षरों से कौन सा शब्द नहीं बनाया जा सकता?",
            options: ["RADIO", "ACTION", "NATION", "CITY"],
            ans: 2,
            exp: "'NATION' में दो 'N' हैं जबकि DICTIONARY में केवल एक 'N' है।",
          },
          {
            text: "यदि उत्तर को पूर्व कहा जाए, तो दक्षिण को क्या कहा जाएगा?",
            options: ["पश्चिम", "उत्तर", "दक्षिण-पूर्व", "पूर्व"],
            ans: 0,
            exp: "दिशाएं ९०° क्लॉकवाइज़ घूम रही हैं. दक्षिण बदलकर पश्चिम बन जाएगा।",
          },
          {
            text: "यदि ५ मित्र एक पंक्ति में बैठे हैं और C मध्य में है, तो C के बाएं कितने व्यक्ति हैं?",
            options: ["१", "२", "३", "४"],
            ans: 1,
            exp: "५ व्यक्तियों में मध्य स्थान ३रा होता है, जिसके बाएं २ व्यक्ति होते हैं।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      }
      n.push({
        id: `comp_q_0_${t}_${s}_q_${o}`,
        text: l,
        options: A,
        correctAnswer: d,
        explanation: u,
        category: t,
      });
      continue;
    }
    if (t === "santhali") {
      if (s === "ch1") {
        const p = [
          {
            text: "संताली भाषा को संविधान की किस अनुसूची में शामिल किया गया है?",
            options: [
              "सातवीं अनुसूची",
              "आठवीं अनुसूची",
              "नौवीं अनुसूची",
              "दसवीं अनुसूची",
            ],
            ans: 1,
            exp: "संताली भाषा को वर्ष 2003 में 92वें संविधान संशोधन द्वारा भारतीय संविधान की 8वीं अनुसूची में शामिल किया गया था।",
          },
          {
            text: "संताली भाषा की अपनी आधिकारिक लिपि 'ओल चिकि' (Ol Chiki) का आविष्कार किसने किया था?",
            options: [
              "गुरु गोमके पंडित रघुनाथ मुर्मू",
              "तिलका मांझी",
              "सिद्धू मुर्मू",
              "बिरसा मुंडा",
            ],
            ans: 0,
            exp: "ओल चिकि लिपि का आविष्कार महान शिक्षाविद पंडित रघुनाथ मुर्मू द्वारा वर्ष 1925 में किया गया था।",
          },
          {
            text: "संताली भाषा में 'दाः' (Dah) शब्द का क्या अर्थ होता है?",
            options: ["अग्नि", "वायु", "जल/पानी", "मिट्टी"],
            ans: 2,
            exp: 'संताली भाषा में "दाः" का अर्थ जल/पानी होता है।',
          },
          {
            text: "ओल चिकि लिपि में कुल कितने मूल वर्ण/अक्षर होते हैं?",
            options: ["25 वर्ण", "30 वर्ण", "35 वर्ण", "40 वर्ण"],
            ans: 1,
            exp: "ओल चिकि लिपि में कुल 30 मूल वर्ण होते हैं जो संताली ध्वनियों को सटीक रूप से व्यक्त करते हैं।",
          },
          {
            text: "संताली भाषा को भारत सरकार द्वारा संवैधानिक मान्यता किस वर्ष मिली थी?",
            options: [
              "वर्ष 2000 में",
              "वर्ष 2003 में",
              "वर्ष 2008 में",
              "वर्ष 1995 में",
            ],
            ans: 1,
            exp: "92वें संविधान संशोधन के तहत वर्ष 2003 में संताली भाषा को संविधान की 8वीं अनुसूची में शामिल किया गया था।",
          },
          {
            text: "संताली शब्द 'सेंगेल' (Sengel) का सही अर्थ क्या है?",
            options: ["पानी", "आग", "हवा", "धूप"],
            ans: 1,
            exp: 'संताली भाषा में "सेंगेल" का अर्थ आग (Fire) होता है।',
          },
          {
            text: "संताली शब्द 'हासा' (Hasa) का अर्थ क्या होता है?",
            options: ["पत्थर", "नदी", "मिट्टी", "आसमान"],
            ans: 2,
            exp: 'संताली में "हासा" का अर्थ मिट्टी या भूमि (Soil/Earth) होता है।',
          },
          {
            text: "संताली शब्द 'सेरमा' (Serma) का हिंदी अनुवाद क्या है?",
            options: ["आसमान/गगन", "समुद्र", "जंगल", "पहाड़"],
            ans: 0,
            exp: 'संताली भाषा में "सेरमा" का अर्थ आकाश/आसमान (Sky) होता है।',
          },
          {
            text: "संताली शब्द 'बुरु' (Buru) किस प्राकृतिक आकृति को दर्शाता है?",
            options: ["नदी", "पहाड़/पर्वत", "झरना", "मैदान"],
            ans: 1,
            exp: 'संताली में "बुरु" का अर्थ पर्वत या पहाड़ (Mountain) होता है।',
          },
          {
            text: "संताली शब्द 'गड़ा' (Gada) का क्या अर्थ है?",
            options: ["तालाब", "कुआँ", "नदी", "झील"],
            ans: 2,
            exp: 'संताली भाषा में "गड़ा" का अर्थ नदी (River) होता है।',
          },
          {
            text: "संताली भाषा किस भाषा परिवार (Language Family) से संबंधित है?",
            options: [
              "द्रविड़ परिवार",
              "ऑस्ट्रो-एशियाटिक (ऑस्ट्रिक / मुंडा) परिवार",
              "इंडो-आर्यन परिवार",
              "तिब्बती-बर्मी परिवार",
            ],
            ans: 1,
            exp: "संताली भाषा ऑस्ट्रो-एशियाटिक (ऑस्ट्रिक) भाषा परिवार के मुंडा समूह से संबंधित है।",
          },
          {
            text: "संताली भाषा में 'बाहा' (Baha) शब्द का क्या अर्थ है?",
            options: ["फल", "फूल", "पत्ता", "पेड़"],
            ans: 1,
            exp: 'संताली में "बाहा" का अर्थ फूल होता है। बाहा पर्व संताल समाज का प्रसिद्ध वसंत उत्सव है।',
          },
          {
            text: "संताली भाषा में सिंह/शेर को क्या कहा जाता है?",
            options: [
              "कुल (Kul)",
              "तराड़ (Tarad)",
              "मेरम (Merom)",
              "सिम (Sim)",
            ],
            ans: 0,
            exp: 'संताली में सिंह/शेर को "कुल" (Kul) कहा जाता है।',
          },
          {
            text: "संताली भाषा में अभिवादन का पवित्र प्रतीक शब्द कौन सा है?",
            options: ["जोहार (Johar)", "प्रणाम", "नमस्ते", "सलाह"],
            ans: 0,
            exp: '"जोहार" संताली संस्कृति का सर्वोच्च सम्मानजनक अभिवादन शब्द है।',
          },
          {
            text: "संताली भाषा की लिपि ओल चिकि का विकास किस वर्ष हुआ था?",
            options: ["1905 में", "1925 में", "1947 में", "1952 में"],
            ans: 1,
            exp: "पंडित रघुनाथ मुर्मू ने वर्ष 1925 में ओल चिकि लिपि का विकास किया था।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else if (s === "ch2") {
        const p = [
          {
            text: "संताली भाषा में जल/पानी को क्या कहा जाता है?",
            options: ["सेंगेंल", "दाः (Dah)", "होय", "हासा"],
            ans: 1,
            exp: 'संताली में पानी को "दाः" कहा जाता है।',
          },
          {
            text: 'संताली भाषा में "बाहा" (Baha) शब्द का हिंदी अनुवाद क्या है?',
            options: ["फल", "पेड़", "फूल", "घास"],
            ans: 2,
            exp: 'संताली में "बाहा" का अर्थ "फूल" होता है।',
          },
          {
            text: "संताली में 'हासा' (Hasa) का क्या अर्थ है?",
            options: ["हँसना", "पानी", "मिट्टी", "पत्थर"],
            ans: 2,
            exp: 'संताली भाषा में "हासा" का अर्थ मिट्टी होता है।',
          },
          {
            text: 'संताली भाषा में "सिंह" या "शेर" को क्या कहा जाता है?',
            options: ["कुल (Kul)", "तराड़", "बिढ़ी", "मेरम"],
            ans: 0,
            exp: 'संताली में सिंह/शेर को "कुल" (Kul) कहा जाता है।',
          },
          {
            text: 'संताली शब्द "दाराय कानाय" (Daray Kanay) का क्या अर्थ है?',
            options: [
              "वह जा रहा है",
              "वह आ रहा है",
              "वह सो रहा है",
              "वह लिख रहा है",
            ],
            ans: 1,
            exp: '"दाराय कानाय" का अर्थ "वह आ रहा है" होता है।',
          },
          {
            text: "संताली भाषा में 'सूर्य' को क्या कहा जाता है?",
            options: ["सिंगी (Singi) / चांदो", "सेरमा", "निंदा", "इपिल"],
            ans: 0,
            exp: 'संताली में सूर्य को "सिंगी" या "सिंग चांदो" कहा जाता है।',
          },
          {
            text: "संताली भाषा में 'चंद्रमा' को क्या कहा जाता है?",
            options: ["सिंगी", "निंदा चांदो (Ninda Chando)", "इपिल", "होय"],
            ans: 1,
            exp: 'रात के चांद को "निंदा चांदो" कहा जाता है।',
          },
          {
            text: "संताली भाषा में 'तारे' को क्या कहा जाता है?",
            options: ["इपिल (Ipil)", "दाः", "बाहा", "बुरु"],
            ans: 0,
            exp: 'संताली में तारों को "इपिल" (Ipil) कहा जाता है।',
          },
          {
            text: "संताली भाषा में 'घर' को क्या कहा जाता है?",
            options: ["ओड़ाः (Orah)", "गड़ा", "बुरु", "हासा"],
            ans: 0,
            exp: 'संताली में घर को "ओड़ाः" (Orah) कहा जाता है।',
          },
          {
            text: "संताली भाषा में 'पेड़' को क्या कहा जाता है?",
            options: ["दारे (Dare)", "साकाम", "बाहा", "जो"],
            ans: 0,
            exp: 'संताली में पेड़ को "दारे" (Dare) और फल को "जो" कहा जाता है।',
          },
          {
            text: "संताली भाषा में 'पत्ता' को क्या कहा जाता है?",
            options: ["साकाम (Sakam)", "दारे", "बाहा", "हासा"],
            ans: 0,
            exp: 'संताली में पेड़ के पत्ते को "साकाम" (Sakam) कहते हैं।',
          },
          {
            text: "संताली भाषा में 'दूध' को क्या कहते हैं?",
            options: ["तोआ (Toa)", "दाः", "रस", "चाहे"],
            ans: 0,
            exp: 'संताली में दूध को "तोआ" (Toa) कहा जाता है।',
          },
          {
            text: "संताली भाषा में 'आँख' को क्या कहा जाता है?",
            options: ["मेद (Med)", "लुतुर", "मोचा", "ति"],
            ans: 0,
            exp: 'संताली में आँख को "मेद", कान को "लुतुर" तथा हाथ को "ति" कहा जाता है।',
          },
          {
            text: "संताली भाषा में 'हाथ' को क्या कहते हैं?",
            options: ["ति (Ti)", "जंगा", "मेद", "मोचा"],
            ans: 0,
            exp: 'संताली में हाथ को "ति" और पैर को "जंगा" कहा जाता है।',
          },
          {
            text: "संताली भाषा में 'पक्षी' को क्या कहा जाता है?",
            options: ["चेणे (Chene)", "जिपी", "होर", "मेरम"],
            ans: 0,
            exp: 'संताली में चिड़िया/पक्षी को "चेणे" (Chene) कहते हैं।',
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else {
        const p = [
          {
            text: 'संताली समाज में अभिवादन हेतु प्रयुक्त शब्द "जोहार" का क्या अर्थ है?',
            options: [
              "स्वागत व नमस्कार",
              "विदाई संकेत",
              "भोजन आमंत्रण",
              "क्षमा याचना",
            ],
            ans: 0,
            exp: '"जोहार" संताली संस्कृति का परम पवित्र अभिवादन और नमस्कार का प्रतीक शब्द है।',
          },
          {
            text: "संताली भाषा में माताजी को सम्मानपूर्वक क्या पुकारा जाता है?",
            options: ["आयो (Ayo)", "बाबा (Baba)", "दाई (Dai)", "काकी"],
            ans: 0,
            exp: 'संताली में माताजी को "आयो" (Ayo) और पिताजी को "बाबा" (Baba) पुकारा जाता है।',
          },
          {
            text: "संताली में बड़े भाई को क्या कहा जाता है?",
            options: ["बाबू", "मरांग दादा (Marang Dada)", "बोको", "काका"],
            ans: 1,
            exp: 'संताली में बड़े भाई को "मरांग दादा" और छोटे भाई को "बोको" कहते हैं।',
          },
          {
            text: "संताली में पिताजी को क्या पुकारा जाता है?",
            options: ["बाबा (Baba)", "आयो", "हताम", "मामा"],
            ans: 0,
            exp: 'संताली में पिता को "बाबा" कहा जाता है।',
          },
          {
            text: "संताली में छोटे भाई को क्या कहा जाता है?",
            options: ["बोको (Boko)", "दादा", "बाबू", "काका"],
            ans: 0,
            exp: 'संताली में छोटे भाई को "बोको" (Boko) कहते हैं।',
          },
          {
            text: "संताली में बहन को क्या पुकारा जाता है?",
            options: ["मिश्रा / दाई (Mishra/Dai)", "आयो", "बोको", "काकी"],
            ans: 0,
            exp: 'संताली में बहन को "मिश्रा" या "दाई" कहा जाता है।',
          },
          {
            text: "संताली में मित्र/दोस्त को क्या कहा जाता है?",
            options: ["गाते (Gate)", "होर", "पेड़ा", "पेड़ा होर"],
            ans: 0,
            exp: 'संताली में मित्र या दोस्त को "गाते" (Gate) कहते हैं।',
          },
          {
            text: '"आम दो चेले कानाम्?" (Who are you?) का उचित उत्तर क्या होगा?',
            options: [
              "इञ् दो संताल कनाञ्",
              "इञ् दो ओड़ाः कनाञ्",
              "इञ् दो गड़ा कनाञ्",
              "इञ् दो सेरमा कनाञ्",
            ],
            ans: 0,
            exp: '"आम दो चेले कानाम्?" का अर्थ "तुम कौन हो?" है, उत्तर "इञ् दो संताल कनाञ्" (मैं संताल हूँ) है।',
          },
          {
            text: '"चेत् लेका मेनामा?" (How are you?) का सही उत्तर क्या होगा?',
            options: [
              "बुगीगे मेनाइञा (I am fine)",
              "चलाह तनाइञ्",
              "जम तनाइञ्",
              "गितिज तनाइञ्",
            ],
            ans: 0,
            exp: '"चेत् लेका मेनामा?" का अर्थ "आप कैसे हैं?" है, उत्तर "बुगीगे मेनाइञा" (मैं ठीक हूँ) है।',
          },
          {
            text: 'संताली में "मेरा नाम..." कहने के लिए किस वाक्य का प्रयोग होता है?',
            options: [
              "इञाः ञुतुम दो...",
              "इञाः ओड़ाः दो...",
              "इञाः दाः दो...",
              "इञाः दारे दो...",
            ],
            ans: 0,
            exp: 'संताली में नाम बताने के लिए "इञाः ञुतुम दो..." प्रयोग होता है।',
          },
          {
            text: 'संताली शब्द "हिजुक मे" (Hijuk me) का क्या अर्थ है?',
            options: ["यहाँ आओ (Come here)", "चले जाओ", "बैठ जाओ", "खाना खाओ"],
            ans: 0,
            exp: '"हिजुक मे" का अर्थ "यहाँ आओ" होता है।',
          },
          {
            text: 'संताली शब्द "चलाह तनाइञ्" का क्या अर्थ है?',
            options: [
              "मैं जा रहा हूँ (I am going)",
              "मैं आ रहा हूँ",
              "मैं सो रहा हूँ",
              "मैं पढ़ रहा हूँ",
            ],
            ans: 0,
            exp: '"चलाह तनाइञ्" का अर्थ "मैं जा रहा हूँ" होता है।',
          },
          {
            text: "संताली में दादाजी (Grandfather) को क्या कहा जाता है?",
            options: [
              "हराम बाबा (Haram Baba)",
              "बुढ़ी आयो",
              "बाबा",
              "मरांग दादा",
            ],
            ans: 0,
            exp: 'संताली में दादाजी को "हराम बाबा" कहा जाता है।',
          },
          {
            text: "संताली में दादीजी (Grandmother) को क्या कहा जाता है?",
            options: ["बुढ़ी आयो (Budhi Ayo)", "हराम बाबा", "आयो", "दाई"],
            ans: 0,
            exp: 'संताली में दादीजी को "बुढ़ी आयो" कहा जाता है।',
          },
          {
            text: "संताली भाषा में अतिथियों/मेहमानों को क्या कहा जाता है?",
            options: ["पेड़ा (Peda)", "गाते", "होर", "बोको"],
            ans: 0,
            exp: 'संताली समाज में मेहमानों या संबंधियों को "पेड़ा" (Peda) कहा जाता है।',
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      }
    } else if (t === "math") {
      if (s === "ch1") {
        const p = [
          {
            text: "संख्या 45,678 में अंक '5' का स्थानीय मान (Place Value) क्या है?",
            options: ["50", "500", "5,000", "50,000"],
            ans: 2,
            exp: "अंक 5 हजारवें स्थान पर है, अतः 5 × 1,000 = 5,000.",
          },
          {
            text: "रोमन अंक प्रणाली में 'L' किस संख्या को निरूपित करता है?",
            options: ["50", "100", "500", "1000"],
            ans: 0,
            exp: "L = 50, C = 100, D = 500, M = 1000.",
          },
          {
            text: "सबसे छोटी अभाज्य संख्या (Prime Number) कौन सी है?",
            options: ["0", "1", "2", "3"],
            ans: 2,
            exp: "2 सबसे छोटी और एकमात्र सम अभाज्य संख्या है।",
          },
          {
            text: "गुणात्मक तत्समक (Multiplicative Identity) कौन सी संख्या कहलाती है?",
            options: ["1", "0", "-1", "10"],
            ans: 0,
            exp: "किसी संख्या को 1 से गुणा करने पर मान अपरिवर्तित रहता है।",
          },
          {
            text: "योज्य तत्समक (Additive Identity) कौन सी संख्या होती है?",
            options: ["0", "1", "-1", "100"],
            ans: 0,
            exp: "किसी संख्या में 0 जोड़ने पर मान वही रहता है।",
          },
          {
            text: "सबसे छोटी भाज्य संख्या (Composite Number) कौन सी है?",
            options: ["1", "2", "3", "4"],
            ans: 3,
            exp: "4 सबसे छोटी भाज्य संख्या है (जिसके 2 से अधिक गुणनखंड हैं)।",
          },
          {
            text: "संख्याओं 12 और 18 का महत्तम समापवर्तक (HCF) क्या होगा?",
            options: ["2", "3", "6", "36"],
            ans: 2,
            exp: "12 व 18 को विभाजित करने वाला सबसे बड़ा अंक 6 है।",
          },
          {
            text: "संख्याओं 4 और 6 का लघुत्तम समापवर्त्य (LCM) क्या होगा?",
            options: ["12", "24", "8", "2"],
            ans: 0,
            exp: "4 और 6 दोनों की गुणज सबसे छोटी संख्या 12 है।",
          },
          {
            text: "संख्या 7,342 में अंक 7 के अंकित मान (Face Value) और स्थानीय मान (Place Value) का अंतर क्या होगा?",
            options: ["6,993", "7,000", "6,930", "0"],
            ans: 0,
            exp: "स्थानीय मान = 7000, अंकित मान = 7. अंतर = 7000 - 7 = 6993.",
          },
          {
            text: "संख्या 1,000 का पूर्ववर्ती (Predecessor) क्या होगा?",
            options: ["999", "1,001", "990", "900"],
            ans: 0,
            exp: "पूर्ववर्ती = 1000 - 1 = 999.",
          },
          {
            text: "संख्या 9,999 का परवर्ती (Successor) क्या होगा?",
            options: ["10,000", "9,998", "10,001", "9,990"],
            ans: 0,
            exp: "परवर्ती = 9999 + 1 = 10000.",
          },
          {
            text: "5 अंकों की सबसे छोटी संख्या कौन सी है?",
            options: ["10,000", "99,999", "1,000", "10,001"],
            ans: 0,
            exp: "10,000 पांच अंकों की सबसे छोटी संख्या है।",
          },
          {
            text: "4 अंकों की सबसे बड़ी संख्या कौन सी है?",
            options: ["9,999", "10,000", "8,888", "9,000"],
            ans: 0,
            exp: "9,999 चार अंकों की सबसे बड़ी संख्या है।",
          },
          {
            text: "संख्या 48 को निकटतम दहाई (Nearest Ten) तक सही करने पर क्या मिलेगा?",
            options: ["40", "50", "45", "60"],
            ans: 1,
            exp: "48 का इकाई अंक 8 है जो 5 से बड़ा है, अतः निकटतम दहाई 50 है।",
          },
          {
            text: "निम्नलिखित में से कौन सी संख्या विषम अभाज्य (Odd Prime) संख्या है?",
            options: ["2", "3", "4", "9"],
            ans: 1,
            exp: "3 पहली विषम अभाज्य संख्या है।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else if (s === "ch2") {
        const p = [
          {
            text: "सरल करें: 25 - 5 × 4 + 2 (BODMAS नियम अनुसार)",
            options: ["82", "7", "18", "20"],
            ans: 1,
            exp: "5 × 4 = 20. 25 + 2 = 27. 27 - 20 = 7.",
          },
          {
            text: "यदि x + 7 = 15 है, तो x का मान क्या होगा?",
            options: ["5", "8", "22", "105"],
            ans: 1,
            exp: "x = 15 - 7 = 8.",
          },
          {
            text: "समीकरण 3x = 21 में x का मान क्या होगा?",
            options: ["3", "7", "18", "63"],
            ans: 1,
            exp: "x = 21 / 3 = 7.",
          },
          {
            text: "(-5) × (-4) का मान क्या होगा?",
            options: ["-20", "+20", "-9", "+9"],
            ans: 1,
            exp: "दो ऋणात्मक संख्याओं का गुणा धनात्मक होता है: (-5) * (-4) = +20.",
          },
          {
            text: "भिन्नों का जोड़ सरल करें: (1/2) + (1/4) = ?",
            options: ["2/6", "3/4", "1/8", "2/4"],
            ans: 1,
            exp: "2/4 + 1/4 = 3/4.",
          },
          {
            text: "2 की घात 3 (2³) का मान क्या होगा?",
            options: ["6", "8", "9", "16"],
            ans: 1,
            exp: "2 × 2 × 2 = 8.",
          },
          {
            text: "144 का वर्गमूल (Square Root) क्या होगा?",
            options: ["10", "12", "14", "16"],
            ans: 1,
            exp: "12 × 12 = 144.",
          },
          {
            text: "यदि a = 3 और b = 4 है, तो (a² + b²) का मान क्या होगा?",
            options: ["12", "14", "25", "49"],
            ans: 2,
            exp: "3² + 4² = 9 + 16 = 25.",
          },
          {
            text: "2:3 के तुल्य (Equivalent) अनुपात कौन सा है?",
            options: ["4:6", "3:2", "6:4", "1:2"],
            ans: 0,
            exp: "(2*2):(3*2) = 4:6.",
          },
          {
            text: "150 का 20% कितना होगा?",
            options: ["20", "30", "40", "50"],
            ans: 1,
            exp: "150 × (20/100) = 30.",
          },
          {
            text: "संख्याओं 10, 20 और 30 का औसत (Average) क्या होगा?",
            options: ["15", "20", "25", "30"],
            ans: 1,
            exp: "(10 + 20 + 30) / 3 = 60 / 3 = 20.",
          },
          {
            text: "साधारण ब्याज (Simple Interest) का सूत्र क्या है?",
            options: [
              "(P × R × T) / 100",
              "P + R + T",
              "P × R / T",
              "P × T / 100",
            ],
            ans: 0,
            exp: "ब्याज = (मूलधन × दर × समय) / 100.",
          },
          {
            text: "समीकरण 2x + 5 = 15 में x का मान क्या होगा?",
            options: ["5", "10", "15", "20"],
            ans: 0,
            exp: "2x = 10 => x = 5.",
          },
          {
            text: "200 रुपये की वस्तु पर 15% की छूट कितनी होगी?",
            options: ["15 रु", "20 रु", "30 रु", "40 रु"],
            ans: 2,
            exp: "200 × 0.15 = 30 रुपये।",
          },
          {
            text: "चाल (Speed) ज्ञात करने का सूत्र क्या है?",
            options: ["दूरी / समय", "दूरी × समय", "समय / दूरी", "दूरी + समय"],
            ans: 0,
            exp: "चाल = दूरी / समय (Speed = Distance / Time).",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else {
        const p = [
          {
            text: "एक समकोण (Right Angle) का माप कितने डिग्री होता है?",
            options: ["45°", "90°", "180°", "360°"],
            ans: 1,
            exp: "समकोण 90 डिग्री का होता है।",
          },
          {
            text: "एक त्रिभुज के तीनों आंतरिक कोणों का योग कितना होता है?",
            options: ["90°", "180°", "270°", "360°"],
            ans: 1,
            exp: "त्रिभुज के कोणों का योग हमेशा 180° होता है।",
          },
          {
            text: "6 सेमी भुजा वाले वर्ग (Square) का परिमाप क्या होगा?",
            options: ["12 सेमी", "24 सेमी", "36 सेमी", "18 सेमी"],
            ans: 1,
            exp: "परिमाप = 4 × 6 = 24 सेमी।",
          },
          {
            text: "8 सेमी लंबाई और 5 सेमी चौड़ाई वाले आयत का क्षेत्रफल क्या होगा?",
            options: [
              "13 वर्ग सेमी",
              "26 वर्ग सेमी",
              "40 वर्ग सेमी",
              "80 वर्ग सेमी",
            ],
            ans: 2,
            exp: "क्षेत्रफल = लंबाई × चौड़ाई = 8 × 5 = 40 वर्ग सेमी।",
          },
          {
            text: "ऋजुकोण / सरल कोण (Straight Angle) का माप कितना होता है?",
            options: ["90°", "180°", "270°", "360°"],
            ans: 1,
            exp: "सरल कोण का माप बिल्कुल 180° होता है।",
          },
          {
            text: "वृत्त के व्यास (Diameter) और त्रिज्या (Radius) में क्या संबंध है?",
            options: [
              "व्यास = 2 × त्रिज्या",
              "त्रिज्या = 2 × व्यास",
              "व्यास = त्रिज्या",
              "व्यास = त्रिज्या / 2",
            ],
            ans: 0,
            exp: "व्यास त्रिज्या का दुगना होता है (d = 2r).",
          },
          {
            text: "एक संपूर्ण कोण (Complete Angle) का माप कितना होता है?",
            options: ["90°", "180°", "270°", "360°"],
            ans: 3,
            exp: "एक पूरा वृत्त घुमाव 360° होता है।",
          },
          {
            text: "90° से कम माप वाले कोण को क्या कहते हैं?",
            options: ["न्यूनकोण (Acute Angle)", "अधिककोण", "समकोण", "ऋजुकोण"],
            ans: 0,
            exp: "0° से 90° के बीच का कोण न्यूनकोण कहलाता है।",
          },
          {
            text: "जिस त्रिभुज की तीनों भुजाएँ बराबर हों, उसे क्या कहते हैं?",
            options: [
              "समबाहु त्रिभुज (Equilateral)",
              "समद्विबाहु",
              "विषमबाहु",
              "समकोण",
            ],
            ans: 0,
            exp: "समान भुजाओं वाला त्रिभुज समबाहु त्रिभुज कहलाता है।",
          },
          {
            text: "5 भुजाओं वाली बंद आकृति (Polygon) को क्या कहा जाता है?",
            options: ["चतुर्भुज", "पंचभुज (Pentagon)", "षट्भुज", "अष्टभुज"],
            ans: 1,
            exp: "5 भुजाओं वाले बहुभुज को पंचभुज कहते हैं।",
          },
          {
            text: "1 किलोमीटर में कितने मीटर होते हैं?",
            options: ["100 मीटर", "1,000 मीटर", "10,000 मीटर", "500 मीटर"],
            ans: 1,
            exp: "1 किमी = 1,000 मीटर।",
          },
          {
            text: "1 किलोग्राम में कितने ग्राम होते हैं?",
            options: ["100 ग्राम", "500 ग्राम", "1,000 ग्राम", "10,000 ग्राम"],
            ans: 2,
            exp: "1 किग्रा = 1,000 ग्राम।",
          },
          {
            text: "3 सेमी भुजा वाले घन (Cube) का आयतन (Volume) क्या होगा?",
            options: ["9 घन सेमी", "18 घन सेमी", "27 घन सेमी", "36 घन सेमी"],
            ans: 2,
            exp: "आयतन = भुजा³ = 3 × 3 × 3 = 27 घन सेमी।",
          },
          {
            text: "पूरक कोणों (Complementary Angles) का योग कितना होता है?",
            options: ["45°", "90°", "180°", "360°"],
            ans: 1,
            exp: "दो कोणों का योग 90° होने पर वे एक-दूसरे के पूरक कहलाते हैं।",
          },
          {
            text: "संपूरक कोणों (Supplementary Angles) का योग कितना होता है?",
            options: ["90°", "180°", "270°", "360°"],
            ans: 1,
            exp: "दो कोणों का योग 180° होने पर वे संपूरक कोण कहलाते हैं।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      }
    } else if (t === "science") {
      if (s === "ch1") {
        const p = [
          {
            text: "मानव शरीर की सबसे बड़ी हड्डी कौन सी है और यह कहाँ पाई जाती है?",
            options: [
              "फीमर (जांघ की हड्डी)",
              "स्टेपिस (कान की हड्डी)",
              "ह्यूमरस",
              "रीढ़ की हड्डी",
            ],
            ans: 0,
            exp: "मानव शरीर की सबसे बड़ी हड्डी फीमर (जांघ में) है।",
          },
          {
            text: "रतौंधी (Night Blindness) किस विटामिन की कमी के कारण होता है?",
            options: ["विटामिन A", "विटामिन B", "विटामिन C", "विटामिन D"],
            ans: 0,
            exp: "विटामिन A की कमी से रतौंधी रोग होता है।",
          },
          {
            text: "हमारे रक्त का लाल रंग किस वर्णक (Pigment) की उपस्थिति के कारण होता है?",
            options: ["क्लोरोफिल", "हीमोग्लोबिन", "मेलेनिन", "प्लाज्मा"],
            ans: 1,
            exp: "हीमोग्लोबिन में आयरन होता है जो रक्त को लाल रंग देता है।",
          },
          {
            text: "मानव हृदय में कुल कितने कोष्ठक (Chambers) होते हैं?",
            options: ["2", "3", "4", "5"],
            ans: 2,
            exp: "मानव हृदय में 4 कोष्ठक (2 अलिंद, 2 निलय) होते हैं।",
          },
          {
            text: "स्कर्वी (Scurvy) रोग किस विटामिन की कमी से होता है?",
            options: ["विटामिन A", "विटामिन B", "विटामिन C", "विटामिन D"],
            ans: 2,
            exp: "विटामिन C की कमी से मसूड़ों में स्कर्वी रोग होता है (आँवला/नींबू में पाया जाता है)।",
          },
          {
            text: "मानव शरीर की सबसे छोटी हड्डी कौन सी है?",
            options: [
              "स्टेपिस (Stapes - कान में)",
              "फीमर",
              "रेडियस",
              "नासिक हड्डी",
            ],
            ans: 0,
            exp: "स्टेपिस मध्य कान में पाई जाने वाली सबसे छोटी हड्डी है।",
          },
          {
            text: "सामान्य स्वस्थ मानव शरीर का तापमान कितना होता है?",
            options: [
              "37°C / 98.6°F",
              "35°C / 95°F",
              "40°C / 104°F",
              "32°C / 90°F",
            ],
            ans: 0,
            exp: "मानव शरीर का सामान्य तापमान 37 डिग्री सेल्सियस होता है।",
          },
          {
            text: "रक्त को छानने और मूत्र बनाने का कार्य कौन सा अंग करता है?",
            options: ["हृदय", "फेफड़े", "वृक्क (Kidneys)", "यकृत"],
            ans: 2,
            exp: "गुर्दे/वृक्क शरीर के अपशिष्ट पदार्थों को छानकर अलग करते हैं।",
          },
          {
            text: "शरीर की 'मास्टर ग्रंथि' (Master Gland) किसे कहा जाता है?",
            options: [
              "थायरॉइड ग्रंथि",
              "पीयूष ग्रंथि (Pituitary Gland)",
              "अग्न्याशय",
              "यकृत",
            ],
            ans: 1,
            exp: "पीयूष ग्रंथि अन्य सभी ग्रंथियों के स्राव को नियंत्रित करती है।",
          },
          {
            text: "सर्वदाता (Universal Donor) रक्त समूह कौन सा है?",
            options: ["A positive", "B positive", "AB positive", "O negative"],
            ans: 3,
            exp: "O नेगेटिव सर्वदाता रक्त समूह है।",
          },
          {
            text: "श्वसन (Respiration) के दौरान मानव शरीर कौन सी गैस ग्रहण करता है?",
            options: ["ऑक्सीजन", "कार्बन डाइऑक्साइड", "नाइट्रोजन", "हाइड्रोजन"],
            ans: 0,
            exp: "हम ऑक्सीजन ग्रहण करते हैं और CO2 छोड़ते हैं।",
          },
          {
            text: "सूर्य के प्रकाश से शरीर में किस विटामिन का संश्लेषण होता है?",
            options: ["विटामिन A", "विटामिन B", "विटामिन C", "विटामिन D"],
            ans: 3,
            exp: "सूर्य का प्रकाश त्वचा में विटामिन D का निर्माण करता है।",
          },
          {
            text: "लार (Saliva) में कौन सा एंजाइम होता है जो स्टार्च को पचाता है?",
            options: ["एमाइलेज (Amylase)", "पेप्सिन", "ट्रिप्सिन", "लाइपेज"],
            ans: 0,
            exp: "लार में एमाइलेज/टायलिन एंजाइम होता है।",
          },
          {
            text: "एक वयस्क मानव के मुख में स्थायी दांतों की कुल संख्या कितनी होती है?",
            options: ["20", "28", "32", "36"],
            ans: 2,
            exp: "वयस्क मनुष्य में 32 स्थायी दांत होते हैं।",
          },
          {
            text: "शरीर में रक्त को पंप करने वाला मुख्य अंग कौन सा है?",
            options: ["फेफड़े", "हृदय (Heart)", "यकृत", "मस्तिष्क"],
            ans: 1,
            exp: "हृदय निरंतर संकुचित होकर पूरे शरीर में रक्त पंप करता है।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else if (s === "ch2") {
        const p = [
          {
            text: "पौधों में प्रकाश संश्लेषण (Photosynthesis) के लिए कौन सी गैस आवश्यक है?",
            options: ["ऑक्सीजन", "नाइट्रोजन", "कार्बन डाइऑक्साइड", "हाइड्रोजन"],
            ans: 2,
            exp: "पौधे CO2, पानी और धूप से भोजन बनाते हैं।",
          },
          {
            text: "पारिस्थितिकी तंत्र में मुख्य उत्पादक (Primary Producers) कौन होते हैं?",
            options: ["शाकाहारी जीव", "हरे पौधे", "मांसाहारी जीव", "अपघटक"],
            ans: 1,
            exp: "हरे पौधे स्वपोषी उत्पादक हैं।",
          },
          {
            text: "वायुमंडल में ऑक्सीजन गैस की मात्रा लगभग कितने प्रतिशत है?",
            options: ["78%", "21%", "0.03%", "0.9%"],
            ans: 1,
            exp: "ऑक्सीजन लगभग 21% और नाइट्रोजन 78% है।",
          },
          {
            text: "वायुमंडल में नाइट्रोजन गैस की मात्रा लगभग कितनी है?",
            options: ["21%", "78%", "50%", "1%"],
            ans: 1,
            exp: "नाइट्रोजन वायुमंडल की सबसे प्रचुर गैस (78%) है।",
          },
          {
            text: "पौधों की पत्तियों द्वारा जलवाष्प बाहर निकालने की प्रक्रिया क्या कहलाती है?",
            options: [
              "वाष्पोत्सर्जन (Transpiration)",
              "प्रकाश संश्लेषण",
              "श्वसन",
              "अवशोषण",
            ],
            ans: 0,
            exp: "पत्तियों के रंध्रों से जलवाष्प निकलना वाष्पोत्सर्जन कहलाता है।",
          },
          {
            text: "पत्तियों को हरा रंग प्रदान करने वाला वर्णक कौन सा है?",
            options: [
              "हीमोग्लोबिन",
              "क्लोरोफिल (Chlorophyll)",
              "मेलेनिन",
              "कैरोटीन",
            ],
            ans: 1,
            exp: "क्लोरोफिल सूर्य प्रकाश को अवशोषित करता है।",
          },
          {
            text: "पारिस्थितिकी तंत्र में मृत जीवों को अपघटित करने वाले जीव (Decomposers) कौन हैं?",
            options: [
              "जीवाणु व कवक (Bacteria & Fungi)",
              "शेर व बाघ",
              "हिरण व खरगोश",
              "हरे पौधे",
            ],
            ans: 0,
            exp: "बैक्टीरिया और फंगस मृत कार्बनिक पदार्थों को मिट्टी में मिलाते हैं।",
          },
          {
            text: "केवल पेड़-पौधों व पत्तियों को खाने वाले जंतु क्या कहलाते हैं?",
            options: [
              "शाकाहारी (Herbivores)",
              "मांसाहारी",
              "सर्वाहारी",
              "अपघटक",
            ],
            ans: 0,
            exp: "शाकाहारी जीव (जैसे गाय, हिरण) केवल वनस्पति खाते हैं।",
          },
          {
            text: "विश्व पर्यावरण दिवस (World Environment Day) कब मनाया जाता है?",
            options: ["22 अप्रैल", "5 जून", "16 सितंबर", "10 दिसंबर"],
            ans: 1,
            exp: "प्रतिवर्ष 5 जून को पर्यावरण दिवस मनाया जाता है।",
          },
          {
            text: "ओजोन परत (Ozone Layer) हमें सूर्य की किन हानिकारक किरणों से बचाती है?",
            options: [
              "इन्फ्रारेड किरणें",
              "पराबैंगनी किरणें (UV Rays)",
              "एक्स-किरणें",
              "गामा किरणें",
            ],
            ans: 1,
            exp: "ओजोन परत समताप मंडल में पराबैंगनी (UV) किरणों को रोकती है।",
          },
          {
            text: "निम्नलिखित में से कौन सा समतापी / नियततापी (Warm-blooded) प्राणी है?",
            options: ["मेंढक", "सांप", "पक्षी व स्तनधारी", "मछली"],
            ans: 2,
            exp: "पक्षी और स्तनधारी अपने शरीर का तापमान स्थिर रखते हैं।",
          },
          {
            text: "उड़ने वाला एकमात्र स्तनधारी (Mammal) प्राणी कौन सा है?",
            options: ["गरुड़", "चमगादड़ (Bat)", "उड़न गिलहरी", "बाज"],
            ans: 1,
            exp: "चमगादड़ एक स्तनधारी जीव है जो उड़ सकता है।",
          },
          {
            text: "मरुस्थल (Desert) में उगने वाले काँटेदार पौधों को क्या कहा जाता है?",
            options: [
              "जलोद्भिद",
              "मरुद्भिद (Cactus/Xerophytes)",
              "लवणोद्भिद",
              "शैवाल",
            ],
            ans: 1,
            exp: "नागफनी/कैक्टस मरुद्भिद अनुकूलित पौधे हैं।",
          },
          {
            text: "ग्लोबल वार्मिंग (Global Warming) के लिए मुख्य जिम्मेदार गैस कौन सी है?",
            options: [
              "ऑक्सीजन",
              "कार्बन डाइऑक्साइड (CO2)",
              "नाइट्रोजन",
              "आर्गन",
            ],
            ans: 1,
            exp: "CO2 और ग्रीनहाउस गैसें वैश्विक तापन बढ़ाती हैं।",
          },
          {
            text: "जल चक्र (Water Cycle) के तीन मुख्य चरण कौन से हैं?",
            options: [
              "वाष्पीकरण, संघनन, वर्षा",
              "गलन, क्वथन, जमुना",
              "श्वसन, पाचन, उत्सर्जन",
              "पिघलना, जमना, बहना",
            ],
            ans: 0,
            exp: "जल का वाष्प बनना, बादल बनना और वर्षा होना जल चक्र है।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else {
        const p = [
          {
            text: "पदार्थ की किस अवस्था में निश्चित आकार और निश्चित आयतन होता है?",
            options: ["ठोस (Solid)", "द्रव (Liquid)", "गैस (Gas)", "प्लाज्मा"],
            ans: 0,
            exp: "ठोस में कणों के बीच आकर्षण बल सबसे मजबूत होता है।",
          },
          {
            text: "गुरुत्वाकर्षण का सिद्धांत (Law of Gravitation) किसने प्रतिपादित किया था?",
            options: ["आइंस्टीन", "सर आइजक न्यूटन", "गैलिलियो", "टेस्ला"],
            ans: 1,
            exp: "न्यूटन ने गुरुत्वाकर्षण बल के नियम दिए थे।",
          },
          {
            text: "कार्य (Work) और ऊर्जा (Energy) का एसआई (SI) मात्रक क्या है?",
            options: ["न्यूटन", "जूल (Joule)", "वाट", "पास्कल"],
            ans: 1,
            exp: "कार्य और ऊर्जा का SI मात्रक जूल होता है।",
          },
          {
            text: "निर्वात में प्रकाश की चाल (Speed of Light) कितनी होती है?",
            options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "330 m/s", "1500 m/s"],
            ans: 0,
            exp: "प्रकाश निर्वात में 3 लाख किमी/सेकंड की गति से चलता है।",
          },
          {
            text: "बल (Force) का एसआई (SI) मात्रक क्या है?",
            options: ["जूल", "न्यूटन (Newton)", "वाट", "कैलोरी"],
            ans: 1,
            exp: "बल का SI मात्रक न्यूटन होता है।",
          },
          {
            text: "नवीकरणीय ऊर्जा (Renewable Energy) का उदाहरण कौन सा है?",
            options: [
              "कोयला",
              "पेट्रोलियम",
              "सौर ऊर्जा (Solar Energy)",
              "प्राकृतिक गैस",
            ],
            ans: 2,
            exp: "सौर ऊर्जा कभी समाप्त न होने वाला प्राकृतिक स्रोत है।",
          },
          {
            text: "शुद्ध जल का क्वथनांक (Boiling Point) कितना होता है?",
            options: ["0°C", "50°C", "100°C", "120°C"],
            ans: 2,
            exp: "जल 100 डिग्री सेल्सियस पर उबलता है।",
          },
          {
            text: "शुद्ध जल का हिमांक (Freezing Point) कितना होता है?",
            options: ["0°C", "-10°C", "10°C", "100°C"],
            ans: 0,
            exp: "जल 0 डिग्री सेल्सियस पर बर्फ बन जाता है।",
          },
          {
            text: "ध्वनि तरंगें (Sound Waves) किसमें गमन नहीं कर सकतीं?",
            options: [
              "हवा में",
              "पानी में",
              "लोहे में",
              "निर्वात (Vacuum) में",
            ],
            ans: 3,
            exp: "ध्वनि को गमन के लिए भौतिक माध्यम चाहिए, निर्वात में यह नहीं चलती।",
          },
          {
            text: "रासायनिक ऊर्जा को विद्युत ऊर्जा में बदलने वाली युक्ति कौन सी है?",
            options: ["बैटरी / सेल (Battery)", "मोटर", "बल्ब", "सोलर पैनल"],
            ans: 0,
            exp: "बैटरी रासायनिक क्रिया द्वारा विद्युत धारा उत्पन्न करती है।",
          },
          {
            text: "विद्युत का सबसे अच्छा सुचालक (Good Conductor) कौन सा तत्व है?",
            options: ["तांबा", "चांदी (Silver)", "एल्युमिनियम", "लोहा"],
            ans: 1,
            exp: "चांदी विद्युत की सबसे उत्तम सुचालक धातु है।",
          },
          {
            text: "विद्युत कुचालक (Insulating) पदार्थ का उदाहरण कौन सा है?",
            options: ["तांबा", "लोहा", "प्लास्टिक / रबर", "एल्युमिनियम"],
            ans: 2,
            exp: "प्लास्टिक और रबर में से विद्युत धारा प्रवाहित नहीं होती।",
          },
          {
            text: "ऊर्जा संरक्षण का नियम (Law of Conservation of Energy) क्या कहता है?",
            options: [
              "ऊर्जा नष्ट की जा सकती है",
              "ऊर्जा बनाई जा सकती है",
              "ऊर्जा न तो बनती है न नष्ट होती है, केवल रूप बदलती है",
              "ऊर्जा स्थिर नहीं रहती",
            ],
            ans: 2,
            exp: "ऊर्जा केवल एक रूप से दूसरे रूप में रूपांतरित होती है।",
          },
          {
            text: "वायुमंडलीय दाब (Atmospheric Pressure) मापने का यंत्र कौन सा है?",
            options: [
              "थर्मामीटर",
              "बैरोमीटर (Barometer)",
              "स्पीडोमीटर",
              "अमीटर",
            ],
            ans: 1,
            exp: "बैरोमीटर से वायुमंडलीय दाब मापा जाता है।",
          },
          {
            text: "घर्षण बल (Friction Force) गति की किस दिशा में कार्य करता है?",
            options: [
              "गति की दिशा में",
              "गति की विपरीत दिशा में",
              "ऊपर की ओर",
              "नीचे की ओर",
            ],
            ans: 1,
            exp: "घर्षण हमेशा गति का विरोध करता है और विपरीत दिशा में लगता है।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      }
    } else if (t === "social") {
      if (s === "ch1") {
        const p = [
          {
            text: "हमारे सौरमंडल का सबसे बड़ा ग्रह कौन सा है?",
            options: ["पृथ्वी", "मंगल", "बृहस्पति (Jupiter)", "शनि"],
            ans: 2,
            exp: "बृहस्पति सौरमंडल का सबसे बड़ा ग्रह है।",
          },
          {
            text: "पृथ्वी को 'नीला ग्रह' (Blue Planet) क्यों कहा जाता है?",
            options: [
              "हवा के कारण",
              "71% भाग पर जल होने के कारण",
              "मिट्टी के कारण",
              "बर्फ के कारण",
            ],
            ans: 1,
            exp: "71% जल की उपस्थिति के कारण अंतरिक्ष से पृथ्वी नीली दिखती है।",
          },
          {
            text: "क्षेत्रफल की दृष्टि से विश्व का सबसे बड़ा महाद्वीप कौन सा है?",
            options: ["अफ़्रीका", "यूरोप", "एशिया", "उत्तर अमेरिका"],
            ans: 2,
            exp: "एशिया विश्व का सबसे बड़ा महाद्वीप है।",
          },
          {
            text: "सौरमंडल में 'लाल ग्रह' (Red Planet) किसे कहा जाता है?",
            options: ["बुध", "शुक्र", "मंगल (Mars)", "बृहस्पति"],
            ans: 2,
            exp: "आयरन ऑक्साइड के कारण मंगल ग्रह लाल दिखाई देता है।",
          },
          {
            text: "पृथ्वी का एकमात्र प्राकृतिक उपग्रह (Natural Satellite) कौन सा है?",
            options: ["सूर्य", "चंद्रमा (Moon)", "बुध", "शुक्र"],
            ans: 1,
            exp: "चंद्रमा पृथ्वी का एकमात्र प्राकृतिक उपग्रह है।",
          },
          {
            text: "पृथ्वी के सबसे निकटतम तारा कौन सा है?",
            options: [
              "ध्रुव तारा",
              "सूर्य (Sun)",
              "साइरस",
              "प्रोक्सिमा सेंटॉरी",
            ],
            ans: 1,
            exp: "सूर्य पृथ्वी के सबसे निकट स्थित तारा है।",
          },
          {
            text: "विश्व का सबसे गहरा महासागर कौन सा है?",
            options: [
              "अटलांटिक महासागर",
              "हिंद महासागर",
              "प्रशांत महासागर (Pacific Ocean)",
              "आर्कटिक महासागर",
            ],
            ans: 2,
            exp: "प्रशांत महासागर सबसे बड़ा और गहरा महासागर है।",
          },
          {
            text: "पृथ्वी अपनी धुरी (Axis) पर किस दिशा से किस दिशा की ओर घूमती है?",
            options: [
              "पूर्व से पश्चिम",
              "पश्चिम से पूर्व (West to East)",
              "उत्तर से दक्षिण",
              "दक्षिण से उत्तर",
            ],
            ans: 1,
            exp: "पृथ्वी पश्चिम से पूर्व दिशा में घूर्णन करती है।",
          },
          {
            text: "पृथ्वी को अपनी धुरी पर एक घूर्णन (Rotation) पूरा करने में कितना समय लगता है?",
            options: ["12 घंटे", "24 घंटे", "30 दिन", "365 दिन"],
            ans: 1,
            exp: "24 घंटे में दिन और रात का चक्र पूरा होता है।",
          },
          {
            text: "पृथ्वी को सूर्य का एक परिक्रमण (Revolution) पूरा करने में कितना समय लगता है?",
            options: ["24 घंटे", "30 दिन", "365.25 दिन (1 वर्ष)", "100 दिन"],
            ans: 2,
            exp: "365 दिन और 6 घंटे में एक वर्ष पूरा होता है।",
          },
          {
            text: "पृथ्वी का त्रिविमीय वास्तविक मॉडल क्या कहलाता है?",
            options: ["मानचित्र", "ग्लोब (Globe)", "चित्र", "चार्ट"],
            ans: 1,
            exp: "ग्लोब पृथ्वी का सही रूप निरूपित करता है।",
          },
          {
            text: "पृथ्वी को उत्तरी और दक्षिणी गोलार्ध में बाँटने वाली काल्पनिक रेखा कौन सी है?",
            options: [
              "कर्क रेखा",
              "मकर रेखा",
              "भूमध्य रेखा / विषुवत वृत्त (Equator)",
              "ग्रीनविच रेखा",
            ],
            ans: 2,
            exp: "0° अक्षांश रेखा भूमध्य रेखा कहलाती है।",
          },
          {
            text: "पृथ्वी पर कुल कितने महाद्वीप (Continents) हैं?",
            options: ["5", "6", "7", "8"],
            ans: 2,
            exp: "पृथ्वी पर 7 महाद्वीप स्थित हैं।",
          },
          {
            text: "पृथ्वी पर कुल कितने मुख्य महासागर (Oceans) हैं?",
            options: ["3", "4", "5", "7"],
            ans: 2,
            exp: "पृथ्वी पर 5 मुख्य महासागर हैं।",
          },
          {
            text: "बर्फ से ढका हुआ सबसे ठंडा और निर्जन महाद्वीप कौन सा है?",
            options: [
              "यूरोप",
              "अंटार्कटिका (Antarctica)",
              "ऑस्ट्रेलिया",
              "एशिया",
            ],
            ans: 1,
            exp: "अंटार्कटिका को श्वेत महाद्वीप भी कहते हैं।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else if (s === "ch2") {
        const p = [
          {
            text: "झारखंड के प्रथम क्रांतिकारी सेनानी कौन थे जिन्होंने ब्रिटिश शासन के विरुद्ध आंदोलन का नेतृत्व किया था?",
            options: [
              "बाबा तिलका मांझी",
              "बिरसा मुंडा",
              "सिद्धू मुर्मू",
              "कान्हू मुर्मू",
            ],
            ans: 0,
            exp: "बाबा तिलका मांझी ने 1784 में भागलपुर में अंग्रेजों के खिलाफ विद्रोह किया था।",
          },
          {
            text: "1855 का प्रसिद्ध 'संताल हूल' (संताल विद्रोह) के मुख्य नायक कौन थे?",
            options: [
              "सिद्धू-कान्हू और चांद-भैरव",
              "बिरसा मुंडा",
              "जतरा भगत",
              "तिलका मांझी",
            ],
            ans: 0,
            exp: "भोगनाडीह से सिद्धू, कान्हू, चांद और भैरव ने आंदोलन शुरू किया था।",
          },
          {
            text: "संताल विद्रोह की स्मृति में प्रत्येक वर्ष 'हूल दिवस' (Hool Diwas) कब मनाया जाता है?",
            options: ["15 अगस्त", "26 जनवरी", "30 जून", "15 नवंबर"],
            ans: 2,
            exp: "30 जून 1855 की याद में प्रतिवर्ष हूल दिवस मनाया जाता है।",
          },
          {
            text: "महान आदिवासी जननायक बिरसा मुंडा का जन्म किस वर्ष हुआ था?",
            options: ["15 नवंबर 1875", "1855", "1890", "1900"],
            ans: 0,
            exp: "बिरसा मुंडा का जन्म 15 नवंबर 1875 को उलीहातू में हुआ था।",
          },
          {
            text: "प्राचीन सिंधु घाटी सभ्यता के दो प्रमुख नगर कौन से थे?",
            options: [
              "हड़प्पा और मोहनजोदड़ो",
              "पाटलिपुत्र और उज्जयिनी",
              "दिल्ली और आगरा",
              "वाराणसी और प्रयाग",
            ],
            ans: 0,
            exp: "हड़प्पा और मोहनजोदड़ो सिंधु घाटी सभ्यता के प्रसिद्ध नगर थे।",
          },
          {
            text: "महान मौर्य सम्राट अशोक किस वंश के शासक थे?",
            options: ["गुप्त वंश", "मौर्य वंश", "मुगल वंश", "कुषाण वंश"],
            ans: 1,
            exp: "अशोक चंद्रगुप्त मौर्य के पौत्र और मौर्य वंश के सम्राट थे।",
          },
          {
            text: "भारत का पहला स्वतंत्रता संग्राम (1857 का विद्रोह) कहाँ से प्रारंभ हुआ था?",
            options: ["मेरठ से", "दिल्ली से", "झांसी से", "कोलकाता से"],
            ans: 0,
            exp: "10 मई 1857 को मेरठ छावनी से विद्रोह शुरू हुआ था।",
          },
          {
            text: "वर्ष 1930 का प्रसिद्ध दांडी मार्च (नमक सत्याग्रह) किसने शुरू किया था?",
            options: [
              "नेहरू जी",
              "महात्मा गांधी",
              "सरदार पटेल",
              "सुभाष चंद्र बोस",
            ],
            ans: 1,
            exp: "महात्मा गांधी ने साबरमती से दांडी तक यात्रा की थी।",
          },
          {
            text: "'इंकलाब जिंदाबाद' का प्रसिद्ध नारा किस महान क्रांतिकारी ने दिया था?",
            options: [
              "भगत सिंह",
              "चंद्रशेखर आजाद",
              "सुभाष चंद्र बोस",
              "लाला लाजपत राय",
            ],
            ans: 0,
            exp: "संसद में बम फेंकते समय भगत सिंह ने यह नारा बुलंद किया था।",
          },
          {
            text: "'आजाद हिंद फौज' (INA) का पुनर्गठन कर स्वतंत्रता आंदोलन का नेतृत्व किसने किया?",
            options: [
              "नेहरू जी",
              "नेताजी सुभाष चंद्र बोस",
              "गांधी जी",
              "तिलक जी",
            ],
            ans: 1,
            exp: 'नेताजी ने "तुम मुझे खून दो, मैं तुम्हें आजादी दूंगा" का नारा दिया था।',
          },
          {
            text: "जलियांवाला बाग हत्याकांड किस वर्ष और किस शहर में हुआ था?",
            options: [
              "1919 में अमृतसर",
              "1922 में चौरी चौरा",
              "1930 में लाहौर",
              "1942 में मुंबई",
            ],
            ans: 0,
            exp: "13 अप्रैल 1919 को अमृतसर के जलियांवाला बाग में नरसंहार हुआ था।",
          },
          {
            text: "'भारत छोड़ो आंदोलन' (Quit India Movement) किस वर्ष प्रारंभ हुआ था?",
            options: ["1920", "1930", "1942", "1947"],
            ans: 2,
            exp: 'अगस्त 1942 में गांधी जी ने "करो या मरो" का नारा देकर आंदोलन शुरू किया था।',
          },
          {
            text: "स्वतंत्र भारत के प्रथम प्रधानमंत्री कौन बने थे?",
            options: [
              "डॉ. राजेंद्र प्रसाद",
              "पंडित जवाहरलाल नेहरू",
              "सरदार पटेल",
              "डॉ. अंबेडकर",
            ],
            ans: 1,
            exp: "पंडित नेहरू भारत के पहले प्रधानमंत्री बने थे।",
          },
          {
            text: "स्वतंत्र भारत के प्रथम राष्ट्रपति कौन चुने गए थे?",
            options: [
              "डॉ. राजेंद्र प्रसाद",
              "डॉ. सर्वपल्ली राधाकृष्णन",
              "नेहरू जी",
              "सरदार पटेल",
            ],
            ans: 0,
            exp: "डॉ. राजेंद्र प्रसाद भारत के प्रथम राष्ट्रपति थे।",
          },
          {
            text: "भारत के 'लौह पुरुष' (Iron Man of India) के नाम से किसे जाना जाता है?",
            options: [
              "भगत सिंह",
              "सरदार वल्लभभाई पटेल",
              "सुभाष चंद्र बोस",
              "तिलक जी",
            ],
            ans: 1,
            exp: "देश की रियासतों का एकीकरण करने के लिए सरदार पटेल को लौह पुरुष कहा जाता है।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else {
        const p = [
          {
            text: "भारतीय संविधान के जनक (Father of Indian Constitution) किसे माना जाता है?",
            options: [
              "गांधी जी",
              "डॉ. भीमराव अंबेडकर",
              "नेहरू जी",
              "डॉ. राजेंद्र प्रसाद",
            ],
            ans: 1,
            exp: "डॉ. बी.आर. अंबेडकर संविधान प्रारूप समिति के अध्यक्ष थे।",
          },
          {
            text: "भारत का संविधान पूरी तरह किस तिथि को लागू हुआ था?",
            options: [
              "15 अगस्त 1947",
              "26 नवंबर 1949",
              "26 जनवरी 1950",
              "30 जनवरी 1948",
            ],
            ans: 2,
            exp: "26 जनवरी 1950 को संविधान लागू हुआ और हम गणतंत्र दिवस मनाते हैं।",
          },
          {
            text: "भारतीय संविधान द्वारा नागरिकों को कुल कितने मौलिक अधिकार (Fundamental Rights) दिए गए हैं?",
            options: ["5", "6", "7", "11"],
            ans: 1,
            exp: "वर्तमान में 6 मौलिक अधिकार प्राप्त हैं।",
          },
          {
            text: "भारत में मतदान (Vote) करने की न्यूनतम कानूनी आयु कितनी है?",
            options: ["16 वर्ष", "18 वर्ष", "21 वर्ष", "25 वर्ष"],
            ans: 1,
            exp: "61वें संशोधन के बाद सार्वभौमिक वयस्क मताधिकार की आयु 18 वर्ष है।",
          },
          {
            text: "भारतीय संसद का उच्च सदन (Upper House) कौन सा कहलाता है?",
            options: ["लोकसभा", "राज्यसभा", "विधानसभा", "विधान परिषद"],
            ans: 1,
            exp: "राज्यसभा उच्च सदन और लोकसभा निम्न सदन है।",
          },
          {
            text: "भारतीय संसद का निम्न सदन (Lower House) कौन सा है?",
            options: ["राज्यसभा", "लोकसभा", "सुप्रीम कोर्ट", "मंत्रिमंडल"],
            ans: 1,
            exp: "लोकसभा जनता द्वारा चुने गए प्रतिनिधियों का सदन है।",
          },
          {
            text: "भारत के संवैधानिक प्रमुख (Constitutional Head) कौन होते हैं?",
            options: [
              "प्रधानमंत्री",
              "राष्ट्रपति (President of India)",
              "मुख्य न्यायाधीश",
              "लोकसभा अध्यक्ष",
            ],
            ans: 1,
            exp: "राष्ट्रपति भारत गणराज्य के सर्वोच्च प्रमुख होते हैं।",
          },
          {
            text: "लोकसभा के सदस्यों का कार्यकाल कितने वर्षों का होता है?",
            options: ["4 वर्ष", "5 वर्ष", "6 वर्ष", "स्थायी"],
            ans: 1,
            exp: "लोकसभा का सामान्य कार्यकाल 5 वर्ष होता है।",
          },
          {
            text: "भारतीय संविधान में कुल कितने मौलिक कर्तव्य (Fundamental Duties) दर्ज हैं?",
            options: ["8", "10", "11", "12"],
            ans: 2,
            exp: "अनुच्छेद 51A के तहत 11 मौलिक कर्तव्य शामिल हैं।",
          },
          {
            text: "भारत का सर्वोच्च न्यायालय (Supreme Court) कहाँ स्थित है?",
            options: ["मुंबई", "कोलकाता", "नई दिल्ली", "चेन्नई"],
            ans: 2,
            exp: "सर्वोच्च न्यायालय नई दिल्ली में स्थित है।",
          },
          {
            text: "भारत का राष्ट्रगान 'जन गण मन' किसके द्वारा रचित है?",
            options: [
              "बंकिम चंद्र चट्टोपाध्याय",
              "रवींद्रनाथ टैगोर",
              "सरोजिनी नायडू",
              "कबीरदास",
            ],
            ans: 1,
            exp: "गुरुदेव रवींद्रनाथ टैगोर ने राष्ट्रगान की रचना की थी।",
          },
          {
            text: "भारत का राष्ट्रीय गीत 'वंदे मातरम' के रचयिता कौन हैं?",
            options: [
              "बंकिम चंद्र चट्टोपाध्याय",
              "रवींद्रनाथ टैगोर",
              "इकबाल",
              "मैथिलीशरण गुप्त",
            ],
            ans: 0,
            exp: "बंकिम चंद्र चट्टोपाध्याय ने आनंदमठ में वंदे मातरम लिखा था।",
          },
          {
            text: "शिक्षा का अधिकार अधिनियम (RTE) किस आयु वर्ग के बच्चों के लिए मुफ्त व अनिवार्य शिक्षा की गारंटी देता है?",
            options: [
              "3 से 10 वर्ष",
              "6 से 14 वर्ष",
              "10 से 18 वर्ष",
              "5 से 15 वर्ष",
            ],
            ans: 1,
            exp: "6 से 14 वर्ष के सभी बच्चों के लिए शिक्षा का मौलिक अधिकार है।",
          },
          {
            text: "संविधान की 8वीं अनुसूची में कुल कितनी भाषाओं को आधिकारिक मान्यता दी गई है?",
            options: ["18 भाषाएं", "20 भाषाएं", "22 भाषाएं", "25 भाषाएं"],
            ans: 2,
            exp: "8वीं अनुसूची में कुल 22 मान्यता प्राप्त भाषाएं हैं।",
          },
          {
            text: "संविधान की प्रस्तावना की शुरुआत किन शब्दों से होती है?",
            options: [
              "हम भारत के लोग (We, the People of India)",
              "भारत एक धर्मनिरपेक्ष राज्य है",
              "जय हिंद",
              "सत्यमेव जयते",
            ],
            ans: 0,
            exp: 'प्रस्तावना "हम भारत के लोग..." से शुरू होती है।',
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      }
    } else if (t === "english") {
      if (s === "ch1") {
        const p = [
          {
            text: 'Identify the Noun in: "Rohan is reading a book under the tree."',
            options: ["reading", "Rohan", "under", "is"],
            ans: 1,
            exp: '"Rohan" is a proper noun referring to a person.',
          },
          {
            text: "Which pronoun replaces a group of people including yourself?",
            options: ["He", "They", "We", "She"],
            ans: 2,
            exp: '"We" is the 1st person plural pronoun.',
          },
          {
            text: 'Identify the Adjective in: "She has a beautiful voice."',
            options: ["beautiful", "voice", "has", "She"],
            ans: 0,
            exp: '"Beautiful" describes the noun "voice".',
          },
          {
            text: 'Identify the Verb in: "The birds fly in the sky."',
            options: ["birds", "fly", "sky", "in"],
            ans: 1,
            exp: '"Fly" shows the action of birds.',
          },
          {
            text: 'Identify the Adverb in: "He runs very fast."',
            options: ["runs", "fast", "He", "very"],
            ans: 1,
            exp: '"Fast" modifies the verb "runs".',
          },
          {
            text: 'Identify the Preposition in: "The cat is sitting under the table."',
            options: ["cat", "sitting", "under", "table"],
            ans: 2,
            exp: '"Under" shows the position relation.',
          },
          {
            text: 'Identify the Conjunction in: "Jack and Jill went up the hill."',
            options: ["and", "went", "up", "hill"],
            ans: 0,
            exp: '"And" joins two nouns.',
          },
          {
            text: 'Identify the Interjection in: "Hurrah! We won the match."',
            options: ["We", "won", "Hurrah", "match"],
            ans: 2,
            exp: '"Hurrah" expresses sudden joy.',
          },
          {
            text: "Which of the following is a Countable Noun?",
            options: ["Water", "Milk", "Book", "Air"],
            ans: 2,
            exp: "Books can be counted individually.",
          },
          {
            text: "Which of the following is an Uncountable Noun?",
            options: ["Pen", "Water", "Apple", "Chair"],
            ans: 1,
            exp: "Water cannot be counted as separate units.",
          },
          {
            text: 'What is the correct plural form of "Child"?',
            options: ["Childs", "Children", "Childrens", "Childes"],
            ans: 1,
            exp: '"Children" is the irregular plural of child.',
          },
          {
            text: 'What is the correct plural form of "Leaf"?',
            options: ["Leafs", "Leaves", "Leafes", "Leaveses"],
            ans: 1,
            exp: "Words ending in 'f' change to 'ves' in plural.",
          },
          {
            text: "Which word is a Collective Noun for cows/cattle?",
            options: ["Herd", "Flock", "Swarm", "Pack"],
            ans: 0,
            exp: 'A group of cattle is called a "Herd".',
          },
          {
            text: "Which of the following is a Proper Noun?",
            options: ["city", "boy", "Ranchi", "country"],
            ans: 2,
            exp: '"Ranchi" is a specific name of a city.',
          },
          {
            text: "Which of the following is an Abstract Noun?",
            options: ["Honesty", "Table", "Dog", "Boy"],
            ans: 0,
            exp: '"Honesty" is a quality/feeling that cannot be touched.',
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else if (s === "ch2") {
        const p = [
          {
            text: 'Choose the correct verb form: "The sun ________ in the east."',
            options: ["rise", "rises", "rising", "rose"],
            ans: 1,
            exp: 'Universal truths use simple present third-person singular "rises".',
          },
          {
            text: 'Identify the tense: "We will visit Ranchi tomorrow."',
            options: [
              "Simple Past Tense",
              "Present Continuous",
              "Simple Future Tense",
              "Past Perfect",
            ],
            ans: 2,
            exp: '"Will + verb" indicates Simple Future Tense.',
          },
          {
            text: 'What is the past tense form of the verb "Go"?',
            options: ["Gone", "Went", "Going", "Goes"],
            ans: 1,
            exp: "Go -> Went -> Gone.",
          },
          {
            text: 'What is the third form (Past Participle) of the verb "Eat"?',
            options: ["Ate", "Eating", "Eaten", "Eats"],
            ans: 2,
            exp: "Eat -> Ate -> Eaten.",
          },
          {
            text: 'Fill in the blank: "They ________ playing football yesterday."',
            options: ["is", "was", "were", "are"],
            ans: 2,
            exp: 'Plural subject "They" + past continuous uses "were".',
          },
          {
            text: "Which suffix is added to a verb to make Continuous Tense?",
            options: ["-ed", "-es", "-ing", "-ly"],
            ans: 2,
            exp: 'Verb + "-ing" creates present/past continuous tense.',
          },
          {
            text: 'Fill in the blank: "She ________ finished her homework."',
            options: ["has", "have", "is", "are"],
            ans: 0,
            exp: 'Third-person singular "She" takes "has" in present perfect.',
          },
          {
            text: 'What is the antonym (opposite) of "Remember"?',
            options: ["Forget", "Recall", "Learn", "Think"],
            ans: 0,
            exp: "The opposite of remember is forget.",
          },
          {
            text: 'Fill in the blank: "She ________ cooking food right now."',
            options: ["is", "was", "were", "are"],
            ans: 0,
            exp: '"Right now" indicates present continuous, "She is".',
          },
          {
            text: 'Fill in the blank: "I have ________ a letter to my friend."',
            options: ["write", "wrote", "written", "writing"],
            ans: 2,
            exp: 'Has/Have is followed by 3rd form "written".',
          },
          {
            text: 'Identify the tense: "He was reading a book when I arrived."',
            options: [
              "Past Continuous Tense",
              "Simple Present",
              "Future Perfect",
              "Present Perfect",
            ],
            ans: 0,
            exp: '"Was + v-ing" indicates Past Continuous Tense.',
          },
          {
            text: 'What is the past tense of "Write"?',
            options: ["Written", "Wrote", "Writing", "Writes"],
            ans: 1,
            exp: "Write -> Wrote -> Written.",
          },
          {
            text: 'Fill in the blank: "Water ________ at 100 degrees Celsius."',
            options: ["boil", "boils", "boiled", "boiling"],
            ans: 1,
            exp: 'Scientific fact uses simple present "boils".',
          },
          {
            text: "Which tense is used to express daily routine habits?",
            options: [
              "Simple Present Tense",
              "Simple Past Tense",
              "Future Continuous",
              "Past Perfect",
            ],
            ans: 0,
            exp: "Habitual actions are stated in Simple Present Tense.",
          },
          {
            text: 'Fill in the blank: "They ________ already left the station."',
            options: ["has", "have", "was", "is"],
            ans: 1,
            exp: 'Plural pronoun "They" takes "have" in present perfect.',
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else {
        const p = [
          {
            text: 'Fill in the article: "Copper is ________ useful metal."',
            options: ["a", "an", "the", "no article"],
            ans: 0,
            exp: `"Useful" starts with consonant sound 'yu', so "a" is used.`,
          },
          {
            text: 'What is the antonym (opposite word) of "HONEST"?',
            options: ["truthful", "kind", "dishonest", "clever"],
            ans: 2,
            exp: "The opposite of honest is dishonest.",
          },
          {
            text: 'Complete with preposition: "The cat is hiding ________ the table."',
            options: ["on", "under", "at", "between"],
            ans: 1,
            exp: '"Under" shows spatial position beneath something.',
          },
          {
            text: 'Fill in the article: "He is ________ honest man."',
            options: ["a", "an", "the", "no article"],
            ans: 1,
            exp: `"Honest" starts with silent 'h' (vowel sound 'o'), taking "an".`,
          },
          {
            text: 'What is a synonym (same meaning word) for "HAPPY"?',
            options: ["Sad", "Joyful", "Angry", "Weak"],
            ans: 1,
            exp: '"Joyful" means happy.',
          },
          {
            text: "Which punctuation mark ends an Interrogative Sentence?",
            options: [
              "Full stop (.)",
              "Question mark (?)",
              "Exclamation (!)",
              "Comma (,)",
            ],
            ans: 1,
            exp: "Questions end with a question mark (?)",
          },
          {
            text: "Which is the correctly spelt word?",
            options: ["Beautifull", "Beautiful", "Beutiful", "Beauteful"],
            ans: 1,
            exp: 'Correct spelling is "Beautiful".',
          },
          {
            text: 'What is the opposite of "BRAVE"?',
            options: ["Strong", "Bold", "Cowardly", "Smart"],
            ans: 2,
            exp: "Opposite of brave is cowardly.",
          },
          {
            text: 'Fill in the preposition: "He jumped ________ the river."',
            options: ["in", "into", "on", "at"],
            ans: 1,
            exp: 'Motion into a enclosed space uses "into".',
          },
          {
            text: 'Complete proverb: "An apple a day keeps the doctor ________."',
            options: ["away", "near", "happy", "busy"],
            ans: 0,
            exp: 'Proverb: "...keeps the doctor away."',
          },
          {
            text: 'One word substitute for "A person who teaches students in a school":',
            options: ["Doctor", "Teacher", "Farmer", "Driver"],
            ans: 1,
            exp: "A person who teaches is a Teacher.",
          },
          {
            text: 'What is the opposite of "Ancient"?',
            options: ["Old", "Modern", "Historic", "Past"],
            ans: 1,
            exp: "Ancient means very old, opposite is Modern.",
          },
          {
            text: "Choose the correct sentence structure:",
            options: [
              "He is a good boy.",
              "Boy a good he is.",
              "Is he boy good a.",
              "A good he is boy.",
            ],
            ans: 0,
            exp: "Subject + Verb + Object order is correct.",
          },
          {
            text: 'Which prefix makes "possible" negative?',
            options: ["un-", "im-", "dis-", "in-"],
            ans: 1,
            exp: '"im-" + possible = impossible.',
          },
          {
            text: 'Which suffix converts "care" into an adjective meaning watchful?',
            options: ["-less", "-ful", "-ness", "-ly"],
            ans: 1,
            exp: 'care + "-ful" = careful.',
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      }
    } else if (t === "computer") {
      if (s === "ch1") {
        const p = [
          {
            text: "कंप्यूटर (Computer) शब्द की उत्पत्ति किस भाषा से हुई है?",
            options: ["लैटिन (Latin)", "ग्रीक", "अंग्रेजी", "संस्कृत"],
            ans: 0,
            exp: 'लैटिन शब्द "Computare" से हुई जिसका अर्थ गणना करना है।',
          },
          {
            text: "कंप्यूटर का 'दिमाग' किसे कहा जाता है?",
            options: ["RAM", "CPU", "Hard Disk", "Monitor"],
            ans: 1,
            exp: "CPU (Central Processing Unit) कंप्यूटर का मस्तिष्क है।",
          },
          {
            text: "प्रथम पीढ़ी के कंप्यूटरों में मुख्य घटक क्या था?",
            options: [
              "ट्रांजिस्टर",
              "इंटीग्रेटेड सर्किट",
              "वैक्यूम ट्यूब (Vacuum Tubes)",
              "माइक्रोप्रोसेसर",
            ],
            ans: 2,
            exp: "प्रथम पीढ़ी (1940-1956) में वैक्यूम ट्यूब प्रयुक्त हुई।",
          },
          {
            text: "कंप्यूटर के चार मुख्य कार्य कौन से हैं?",
            options: [
              "इनपुट, प्रोसेसिंग, आउटपुट, स्टोरेज",
              "कीबोर्ड, माउस, सीपीयू, प्रिंटर",
              "सॉफ्टवेयर, हार्डवेयर, इंटरनेट, गेम",
              "वर्ड, एक्सेल, पेंट, नोटपैड",
            ],
            ans: 0,
            exp: "इनपुट, प्रोसेसिंग, आउटपुट व स्टोरेज मूल कार्य हैं।",
          },
          {
            text: "CPU का पूर्ण रूप क्या होता है?",
            options: [
              "Central Processing Unit",
              "Central Power Unit",
              "Computer Processing Unit",
              "Central Program Unit",
            ],
            ans: 0,
            exp: "CPU = Central Processing Unit.",
          },
          {
            text: "द्वितीय पीढ़ी के कंप्यूटरों (2nd Gen) में वैक्यूम ट्यूब का स्थान किसने लिया?",
            options: [
              "ट्रांजिस्टर (Transistors)",
              "IC",
              "माइक्रोप्रोसेसर",
              "रोबोटिक चिप",
            ],
            ans: 0,
            exp: "दूसरी पीढ़ी में ट्रांजिस्टर का उपयोग हुआ।",
          },
          {
            text: "तृतीय पीढ़ी के कंप्यूटरों (3rd Gen) में किसका उपयोग हुआ?",
            options: [
              "ट्रांजिस्टर",
              "इंटीग्रेटेड सर्किट (IC)",
              "वैक्यूम ट्यूब",
              "वॉल्व",
            ],
            ans: 1,
            exp: "3rd Gen में सिलिकॉन आधारित IC का प्रयोग हुआ।",
          },
          {
            text: "चतुर्थ पीढ़ी (4th Gen) के कंप्यूटरों में मुख्य नवाचार क्या था?",
            options: [
              "वैक्यूम ट्यूब",
              "माइक्रोप्रोसेसर (Microprocessor)",
              "पंच कार्ड",
              "चुंबकीय टेप",
            ],
            ans: 1,
            exp: "माइक्रोप्रोसेसर ने व्यक्तिगत कंप्यूटर (PC) क्रांति ला दी।",
          },
          {
            text: "कंप्यूटर का जनक (Father of Computer) किसे कहा जाता है?",
            options: [
              "चार्ल्स बैबेज",
              "एलन ट्यूरिंग",
              "बिल गेट्स",
              "स्टीव जॉब्स",
            ],
            ans: 0,
            exp: "चार्ल्स बैबेज ने एनालिटिकल इंजन बनाया था।",
          },
          {
            text: "विश्व का पहला यांत्रिक गणना यंत्र (Mechanical Calculator) कौन सा था?",
            options: ["अबैकस (Abacus)", "पास्कलाइन", "एनिऐक", "परम"],
            ans: 0,
            exp: "चीन में विकसित अबैकस प्राचीन गणना यंत्र था।",
          },
          {
            text: "निम्नलिखित में से कौन सा आउटपुट डिवाइस (Output Device) का उदाहरण है?",
            options: ["कीबोर्ड", "माउस", "मॉनिटर / प्रिंटर", "स्कैनर"],
            ans: 2,
            exp: "मॉनिटर और प्रिंटर परिणाम प्रदर्शित करते हैं।",
          },
          {
            text: "निम्नलिखित में से कौन सा इनपुट डिवाइस (Input Device) है?",
            options: ["प्रिंटर", "स्पीकर", "कीबोर्ड / माउस", "मॉनिटर"],
            ans: 2,
            exp: "कीबोर्ड और माउस कंप्यूटर में डेटा प्रविष्ट कराते हैं।",
          },
          {
            text: "कंप्यूटर की प्राथमिक स्मृति (Primary Memory) कौन सी है?",
            options: ["RAM और ROM", "हार्ड डिस्क", "पेन ड्राइव", "सीडी"],
            ans: 0,
            exp: "RAM और ROM मदरबोर्ड पर स्थित प्राथमिक मेमोरी हैं।",
          },
          {
            text: "डेटा को स्थायी रूप से सुरक्षित रखने वाली सेकेंडरी मेमोरी कौन सी है?",
            options: [
              "RAM",
              "हार्ड डिस्क (Hard Disk / SSD)",
              "कैश मेमोरी",
              "रजिस्टर",
            ],
            ans: 1,
            exp: "हार्ड डिस्क/SSD में डेटा बिजली जाने पर भी रहता है।",
          },
          {
            text: "1 बाइट (Byte) में कुल कितने बिट्स (Bits) होते हैं?",
            options: ["4 बिट", "8 बिट", "16 बिट", "1024 बिट"],
            ans: 1,
            exp: "1 Byte = 8 Bits.",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else if (s === "ch2") {
        const p = [
          {
            text: "विंडोज (MS Windows) और एंड्रॉइड (Android) किस प्रकार के सॉफ्टवेयर हैं?",
            options: [
              "एप्लिकेशन सॉफ्टवेयर",
              "सिस्टम सॉफ्टवेयर / ऑपरेटिंग सिस्टम",
              "यूटिलिटी",
              "एंटीवायरस",
            ],
            ans: 1,
            exp: "ऑपरेटिंग सिस्टम हार्डवेयर और यूजर के बीच सेतु का कार्य करता है।",
          },
          {
            text: "इनपुट डिवाइस का उदाहरण कौन सा है?",
            options: ["कीबोर्ड (Keyboard)", "मॉनिटर", "प्रिंटर", "स्पीकर"],
            ans: 0,
            exp: "कीबोर्ड से डेटा टाइप किया जाता है।",
          },
          {
            text: "विंडोज में किसी फाइल को स्थायी रूप से हटाने (Permanent Delete) की कुंजी क्या है?",
            options: [
              "Delete",
              "Shift + Delete",
              "Ctrl + Delete",
              "Alt + Delete",
            ],
            ans: 1,
            exp: "Shift + Delete से फाइल रीसायकल बिन में नहीं जाती।",
          },
          {
            text: "चयनित टेक्स्ट या फाइल को कॉपी (Copy) करने का शॉर्टकट क्या है?",
            options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"],
            ans: 0,
            exp: "Ctrl + C कॉपी करता है।",
          },
          {
            text: "कॉपी किए गए डेटा को पेस्ट (Paste) करने का शॉर्टकट क्या है?",
            options: ["Ctrl + P", "Ctrl + V", "Ctrl + C", "Ctrl + Z"],
            ans: 1,
            exp: "Ctrl + V डेटा चिपकाता है।",
          },
          {
            text: "अंतिम कार्य को निरस्त (Undo) करने का शॉर्टकट क्या है?",
            options: ["Ctrl + Z", "Ctrl + Y", "Ctrl + A", "Ctrl + S"],
            ans: 0,
            exp: "Ctrl + Z अंडू करता है।",
          },
          {
            text: "दस्तावेज़ की सभी सामग्रियों को एक साथ चुनने (Select All) का शॉर्टकट क्या है?",
            options: ["Ctrl + A", "Ctrl + S", "Ctrl + F", "Ctrl + H"],
            ans: 0,
            exp: "Ctrl + A संपूर्ण सामग्री चुनता है।",
          },
          {
            text: "एमएस वर्ड (MS Word) किस प्रकार का सॉफ्टवेयर है?",
            options: [
              "सिस्टम सॉफ्टवेयर",
              "एप्लिकेशन सॉफ्टवेयर (वर्ड प्रोसेसर)",
              "ऑपरेटिंग सिस्टम",
              "एंटीवायरस",
            ],
            ans: 1,
            exp: "एमएस वर्ड एक लोकप्रिय वर्ड प्रोसेसिंग एप्लिकेशन है।",
          },
          {
            text: "ओपन-सोर्स ऑपरेटिंग सिस्टम (Open Source OS) का उदाहरण कौन सा है?",
            options: ["विंडोज", "लिनक्स (Linux)", "एमएस डॉस", "मैक ओएस"],
            ans: 1,
            exp: "लिनक्स नि:शुल्क एवं ओपन सोर्स ऑपरेटिंग सिस्टम है।",
          },
          {
            text: "विंडोज कंप्यूटर शुरू (Boot) होने पर सामने दिखने वाली मुख्य स्क्रीन क्या कहलाती है?",
            options: ["डेस्कटॉप (Desktop)", "टूलबार", "मेन्यू", "टास्कबार"],
            ans: 0,
            exp: "मुख्य स्क्रीन डेस्कटॉप कहलाती है।",
          },
          {
            text: "एमएस एक्सेल (MS Excel) की फाइल को क्या कहा जाता है?",
            options: [
              "डॉक्यूमेंट",
              "स्प्रेडशीट / वर्कबुक (Workbook)",
              "स्लाइड",
              "डेटाबेस",
            ],
            ans: 1,
            exp: "एक्सेल में रो और कॉलम वाली वर्कशीट/वर्कबुक होती है।",
          },
          {
            text: "प्रेजेंटेशन (प्रस्तुतीकरण) बनाने के लिए किस सॉफ्टवेयर का प्रयोग होता है?",
            options: ["MS Word", "MS PowerPoint", "MS Excel", "MS Paint"],
            ans: 1,
            exp: "पावरपॉइंट से आकर्षक स्लाइड्स बनाई जाती हैं।",
          },
          {
            text: "कंप्यूटर को हानिकारक वायरस से बचाने वाले सॉफ्टवेयर को क्या कहते हैं?",
            options: [
              "मैलवेयर",
              "एंटीवायरस (Anti-Virus)",
              "ब्राउज़र",
              "ड्राइवर",
            ],
            ans: 1,
            exp: "एंटीवायरस सिस्टम को स्कैन कर वायरस नष्ट करता है।",
          },
          {
            text: "विंडोज में डिलीट की गई फाइलें अस्थायी रूप से कहाँ जमा होती हैं?",
            options: [
              "माई डॉक्यूमेंट्स",
              "रीसायकल बिन (Recycle Bin)",
              "कंट्रोल पैनल",
              "डाउनलोड्स",
            ],
            ans: 1,
            exp: "रीसायकल बिन से हटाए गए डेटा को रीस्टोर किया जा सकता है।",
          },
          {
            text: "डिवाइस ड्राइवर (Device Driver) का मुख्य कार्य क्या होता है?",
            options: [
              "गेम चलाना",
              "हार्डवेयर डिवाइस को ओएस से जोड़ना",
              "गाना बजाना",
              "इंटरनेट चलाना",
            ],
            ans: 1,
            exp: "ड्राइवर सॉफ्टवेयर हार्डवेयर उपकरण को संचालित करता है।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      } else {
        const p = [
          {
            text: "विश्व का सबसे बड़ा कंप्यूटर नेटवर्क कौन सा है?",
            options: ["इंट्रानेट", "इंटरनेट (Internet)", "LAN", "MAN"],
            ans: 1,
            exp: "इंटरनेट दुनिया का सबसे विशाल वैश्विक नेटवर्क है।",
          },
          {
            text: "कंप्यूटर सुरक्षा में 'मैलवेयर' (Malware) क्या होता है?",
            options: [
              "एंटीवायरस",
              "हानिकारक सॉफ्टवेयर / वायरस",
              "हार्डवेयर उपकरण",
              "स्पीड बूस्टर",
            ],
            ans: 1,
            exp: "मैलवेयर दुर्भावनापूर्ण सॉफ्टवेयर होता है।",
          },
          {
            text: "कंप्यूटर की मशीनी भाषा में केवल कौन से दो अंक होते हैं?",
            options: ["0 और 1 (Binary)", "1 और 2", "1 और 10", "0 और 9"],
            ans: 0,
            exp: "बाइनरी प्रणाली केवल 0 और 1 पर काम करती है।",
          },
          {
            text: "WWW का पूर्ण रूप क्या होता है?",
            options: [
              "World Wide Web",
              "World Wide Work",
              "World Web Wide",
              "Western Wide Web",
            ],
            ans: 0,
            exp: "WWW = World Wide Web.",
          },
          {
            text: "URL का पूर्ण रूप क्या होता है?",
            options: [
              "Uniform Resource Locator",
              "Universal Resource Link",
              "Uniform Reform Link",
              "United Resource Locator",
            ],
            ans: 0,
            exp: "URL वेब पते को निरूपित करता है।",
          },
          {
            text: "HTTP का पूर्ण रूप क्या होता है?",
            options: [
              "HyperText Transfer Protocol",
              "HyperText Technical Protocol",
              "High Transfer Text Protocol",
              "Hyper Transfer Text",
            ],
            ans: 0,
            exp: "HTTP वेब डेटा स्थानांतरण प्रोटोकॉल है।",
          },
          {
            text: "वेबसाइट एड्रेस में 'https://' में 's' का क्या अर्थ होता है?",
            options: ["Software", "Secure", "Server", "System"],
            ans: 1,
            exp: "Secure (सुरक्षित एन्क्रिप्टेड कनेक्शन)।",
          },
          {
            text: "एक मजबूत पासवर्ड (Strong Password) कैसा होना चाहिए?",
            options: [
              "केवल नाम",
              "123456",
              "अक्षर, अंक व विशेष चिन्हों का मिश्रण",
              "जन्म तिथि",
            ],
            ans: 2,
            exp: "मिश्रित वर्णों से बना पासवर्ड हैक करना कठिन होता है।",
          },
          {
            text: "नकली लिंक या ईमेल भेजकर गुप्त जानकारी चुराने का साइबर अपराध क्या कहलाता है?",
            options: ["हैकिंग", "फ़िशिंग (Phishing)", "स्पैमिंग", "ब्लॉगिंग"],
            ans: 1,
            exp: "फ़िशिंग के द्वारा व्यक्तिगत वित्तीय डेटा चुराया जाता है।",
          },
          {
            text: "वेब पेज की संरचना बनाने के लिए किस भाषा का प्रयोग होता है?",
            options: ["HTML", "C++", "Python", "Java"],
            ans: 0,
            exp: "HTML (HyperText Markup Language) वेबपेज बनाती है।",
          },
          {
            text: "इंटरनेट पर वेबसाइट देखने के लिए किस सॉफ्टवेयर का प्रयोग होता है?",
            options: [
              "वेब ब्राउज़र (Google Chrome / Firefox)",
              "मीडिया प्लेयर",
              "एंटीवायरस",
              "एमएस पेंट",
            ],
            ans: 0,
            exp: "वेब ब्राउज़र इंटरनेट पेजों को लोड करता है।",
          },
          {
            text: "Google और Bing किस प्रकार की इंटरनेट सेवाएं हैं?",
            options: [
              "सर्च इंजन (Search Engine)",
              "सोशल मीडिया",
              "ई-कॉमर्स",
              "एंटीवायरस",
            ],
            ans: 0,
            exp: "सर्च इंजन इंटरनेट पर जानकारी ढूंढते हैं।",
          },
          {
            text: "Wi-Fi का पूर्ण रूप क्या होता है?",
            options: [
              "Wireless Fidelity",
              "Wired Fidelity",
              "Wireless File",
              "Wireless Field",
            ],
            ans: 0,
            exp: "Wi-Fi = Wireless Fidelity.",
          },
          {
            text: "इंटरनेट सेवा प्रदाता से कंप्यूटर को जोड़ने वाला उपकरण कौन सा है?",
            options: [
              "मॉडेम / राउटर (Modem/Router)",
              "प्रिंटर",
              "स्कैनर",
              "वेबकैम",
            ],
            ans: 0,
            exp: "मॉडेम सिग्नल रूपांतरित कर इंटरनेट कनेक्शन प्रदान करता है।",
          },
          {
            text: "गूगल ड्राइव (Google Drive) किस प्रकार की सेवा का उदाहरण है?",
            options: [
              "क्लाउड स्टोरेज (Cloud Storage)",
              "हार्डवेयर",
              "एंटीवायरस",
              "ऑपरेटिंग सिस्टम",
            ],
            ans: 0,
            exp: "क्लाउड स्टोरेज इंटरनेट पर डेटा सुरक्षित रखता है।",
          },
        ][o - 1];
        ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
      }
    } else if (s === "ch1") {
      const p = [
        {
          text: "हिंदी वर्णमाला में स्वरों (Vowels) की कुल संख्या कितनी मानी जाती है?",
          options: ["9", "11", "13", "33"],
          ans: 1,
          exp: "हिंदी में मूल स्वरों की संख्या 11 है।",
        },
        {
          text: "निम्नलिखित में से कौन सा शब्द 'भाववाचक संज्ञा' (Abstract Noun) का उदाहरण है?",
          options: ["राम", "बुढ़ापा", "किताब", "पटना"],
          ans: 1,
          exp: "बुढ़ापा अवस्था/भाव का बोध कराता है।",
        },
        {
          text: "'वह' किस प्रकार का सर्वनाम है?",
          options: ["पुरुषवाचक सर्वनाम", "निजवाचक", "प्रश्नवाचक", "संबंधवाचक"],
          ans: 0,
          exp: "यह अन्य पुरुषवाचक सर्वनाम है।",
        },
        {
          text: "हिंदी वर्णमाला में व्यंजनों (Consonants) की मूल संख्या कितनी है?",
          options: ["11", "25", "33", "52"],
          ans: 2,
          exp: "हिंदी में मूल व्यंजन 33 माने जाते हैं।",
        },
        {
          text: "'गंगा' और 'हिमालय' किस प्रकार की संज्ञा के उदाहरण हैं?",
          options: [
            "व्यक्तिवाचक संज्ञा",
            "जातिवाचक संज्ञा",
            "समूहवाचक संज्ञा",
            "भाववाचक संज्ञा",
          ],
          ans: 0,
          exp: "विशेष व्यक्ति/स्थान/नदी का नाम व्यक्तिवाचक संज्ञा है।",
        },
        {
          text: "'सेना' और 'सभा' किस प्रकार की संज्ञा के शब्द हैं?",
          options: ["व्यक्तिवाचक", "जातिवाचक", "समूहवाचक संज्ञा", "भाववाचक"],
          ans: 2,
          exp: "समूह या समुदाय का बोध कराने वाले शब्द समूहवाचक हैं।",
        },
        {
          text: "'मीठा आम' वाक्य में 'मीठा' शब्द क्या है?",
          options: ["संज्ञा", "विशेषण (Adjective)", "क्रिया", "सर्वनाम"],
          ans: 1,
          exp: "मीठा आम की विशेषता बता रहा है, अतः यह विशेषण है।",
        },
        {
          text: "वक्ता स्वयं के लिए किस सर्वनाम का प्रयोग करता है?",
          options: [
            "उत्तम पुरुषवाचक (मैं / हम)",
            "मध्यम पुरुषवाचक",
            "अन्य पुरुषवाचक",
            "निजवाचक",
          ],
          ans: 0,
          exp: "उत्तम पुरुष (मैं, हम) का प्रयोग वक्ता करता है।",
        },
        {
          text: "हिंदी में 'क' वर्ग का उच्चारण स्थान क्या है?",
          options: ["कंठ (Throat)", "तालू", "दंत", "ओष्ठ"],
          ans: 0,
          exp: "क, ख, ग, घ, ङ का उच्चारण कंठ से होता है।",
        },
        {
          text: "'त' वर्ग (त, थ, द, ध, न) का उच्चारण स्थान क्या है?",
          options: ["कंठ", "तालू", "दंत (Teeth)", "ओष्ठ"],
          ans: 2,
          exp: "इनका उच्चारण जीभ और दांतों के स्पर्श से होता है।",
        },
        {
          text: "'प' वर्ग (प, फ, ब, भ, म) का उच्चारण स्थान क्या है?",
          options: ["ओष्ठ (Lips)", "कंठ", "मूर्धा", "तालू"],
          ans: 0,
          exp: "इनका उच्चारण दोनों होंठों के मिलने से होता है।",
        },
        {
          text: "हिंदी में अनुस्वार का रूप क्या है?",
          options: ["बिंदु ( अं )", "विसर्ग ( अः )", "चंद्रबिंदु", "मात्रा"],
          ans: 0,
          exp: "अं की मात्रा को अनुस्वार कहते हैं।",
        },
        {
          text: "हिंदी में विसर्ग ( : ) का उच्चारण किस ध्वनि की भांति होता है?",
          options: ["ह की भांति", "म की भांति", "न की भांति", "र की भांति"],
          ans: 0,
          exp: "विसर्ग का उच्चारण ह की तरह होता है (जैसे: प्रातः, अतः)।",
        },
        {
          text: "'सुंदर' शब्द का भाववाचक संज्ञा रूप क्या होगा?",
          options: ["सुंदरता / सौंदर्य", "सुंदरी", "सुंदरतम", "सुंदरतापूर्वक"],
          ans: 0,
          exp: "सुंदर से भाववाचक संज्ञा सुंदरता या सौंदर्य बनती है।",
        },
        {
          text: "संस्कृत के जो शब्द बिना किसी परिवर्तन के हिंदी में प्रयोग होते हैं, क्या कहलाते हैं?",
          options: ["तत्सम शब्द", "तद्भव शब्द", "देशज शब्द", "विदेशी शब्द"],
          ans: 0,
          exp: "संस्कृत के मूल शब्द तत्सम कहलाते हैं (जैसे: अग्नि, सूर्य)।",
        },
      ][o - 1];
      ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
    } else if (s === "ch2") {
      const p = [
        {
          text: "वाक्य में जिस शब्द से किसी काम के करने या होने का बोध होता है, उसे क्या कहते हैं?",
          options: ["संज्ञा", "विशेषण", "क्रिया (Verb)", "अव्यय"],
          ans: 2,
          exp: "काम का बोध कराने वाले शब्द क्रिया कहलाते हैं।",
        },
        {
          text: "काल (Tense) के मुख्य रूप से कितने भेद होते हैं?",
          options: ["2", "3", "4", "5"],
          ans: 1,
          exp: "भूतकाल, वर्तमानकाल और भविष्यत्काल।",
        },
        {
          text: "'कवि' शब्द का शुद्ध स्त्रीलिंग रूप क्या होगा?",
          options: ["कविनी", "कवयित्री", "कवियत्री", "कवियित्री"],
          ans: 1,
          exp: "कवि का स्त्रीलिंग कवयित्री होता है।",
        },
        {
          text: "'विद्वान' शब्द का स्त्रीलिंग रूप क्या होगा?",
          options: ["विद्वानी", "विदुषी", "विद्वत्ता", "विद्वान महिला"],
          ans: 1,
          exp: "विद्वान का स्त्रीलिंग विदुषी होता है।",
        },
        {
          text: "'नेता' शब्द का स्त्रीलिंग रूप क्या होगा?",
          options: ["नेत्री", "नेतिन", "नेताइन", "महिला नेता"],
          ans: 0,
          exp: "नेता का स्त्रीलिंग नेत्री होता है।",
        },
        {
          text: "जिस क्रिया में कर्म (Object) होता है, उसे क्या कहते हैं?",
          options: [
            "सकर्मक क्रिया (Transitive Verb)",
            "अकर्मक क्रिया",
            "प्रेरणादायक क्रिया",
            "द्विकर्मक",
          ],
          ans: 0,
          exp: "सकर्मक क्रिया में कर्म उपस्थित होता है (जैसे: राम आम खाता है)।",
        },
        {
          text: "जिस क्रिया में कर्म नहीं होता, उसे क्या कहते हैं?",
          options: [
            "सकर्मक क्रिया",
            "अकर्मक क्रिया (Intransitive Verb)",
            "संयुक्त क्रिया",
            "सहायक क्रिया",
          ],
          ans: 1,
          exp: "अकर्मक क्रिया में फल सीधे कर्ता पर पड़ता है (जैसे: बच्चा सोता है)।",
        },
        {
          text: "'किताब' शब्द का बहुवचन रूप क्या होगा?",
          options: ["किताबों", "किताबें", "किताबियां", "किताबगण"],
          ans: 1,
          exp: "किताब का बहुवचन पुस्तकें/किताबें होता है।",
        },
        {
          text: "'लड़की' शब्द का सही बहुवचन रूप क्या होगा?",
          options: ["लड़कीयाँ", "लड़कियाँ", "लड़कियों", "लड़कियांं"],
          ans: 1,
          exp: "इकारांत शब्दों में 'इ' होकर 'याँ' लगता है: लड़कियाँ।",
        },
        {
          text: "'राम पुस्तक पढ़ता है' वाक्य किस काल का उदाहरण है?",
          options: [
            "सामान्य वर्तमानकाल",
            "भूतकाल",
            "भविष्यत्काल",
            "संभाव्य वर्तमान",
          ],
          ans: 0,
          exp: "यह वर्तमान समय की सामान्य क्रिया है।",
        },
        {
          text: "'उसने पत्र लिखा था' किस काल का वाक्य है?",
          options: [
            "पूर्ण भूतकाल",
            "वर्तमानकाल",
            "भविष्यत्काल",
            "अपूर्ण भूतकाल",
          ],
          ans: 0,
          exp: "भूतकाल में क्रिया पूर्ण हो चुकी थी।",
        },
        {
          text: "'हम कल दिल्ली जाएंगे' किस काल का वाक्य है?",
          options: [
            "वर्तमानकाल",
            "भूतकाल",
            "भविष्यत्काल (Future Tense)",
            "संभाव्यकाल",
          ],
          ans: 2,
          exp: "आने वाले समय की क्रिया भविष्यत्काल निरूपित करती है।",
        },
        {
          text: "'माता' शब्द का पुल्लिंग रूप क्या होगा?",
          options: ["पिता", "भाई", "पुत्र", "मामा"],
          ans: 0,
          exp: "माता का लिंग परिवर्तन पिता है।",
        },
        {
          text: "'चिड़िया' शब्द का बहुवचन रूप क्या होगा?",
          options: ["चिड़ियाएँ", "चिड़ियाँ", "चिड़ियों", "चिड़ियाओं"],
          ans: 1,
          exp: "या-अंत वाले शब्दों में चंद्रबिंदु लगता है: चिड़ियाँ।",
        },
        {
          text: "मुख्य क्रिया की सहायता करने वाली क्रिया क्या कहलाती है?",
          options: [
            "सहायक क्रिया (Helping Verb)",
            "पूर्वकालिक क्रिया",
            "नामधातु क्रिया",
            "सकर्मक क्रिया",
          ],
          ans: 0,
          exp: 'जैसे "पढ़ रहा है" में "है" सहायक क्रिया है।',
        },
      ][o - 1];
      ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
    } else {
      const p = [
        {
          text: "दो समीपवर्ती वर्णों के मेल से होने वाले विकार/परिवर्तन को क्या कहते हैं?",
          options: ["समास", "संधि", "उपसर्ग", "प्रत्यय"],
          ans: 1,
          exp: "दो वर्णों के मेल को संधि कहते हैं (जैसे: हिम + आलय = हिमालय)।",
        },
        {
          text: "निम्नलिखित में से कौन सा शब्द 'सूर्य' का पर्यायवाची (Synonym) नहीं है?",
          options: ["दिनकर", "रवि", "शशांक", "भास्कर"],
          ans: 2,
          exp: "शशांक चंद्रमा का पर्यायवाची है।",
        },
        {
          text: "'आदर' शब्द का सही विलोम (Antonym) शब्द क्या होगा?",
          options: ["अनादर", "निरादर", "सत्कार", "सम्मान"],
          ans: 1,
          exp: "आदर का सही विलोम निरादर होता है।",
        },
        {
          text: "'अमृत' शब्द का सही विलोम शब्द क्या होगा?",
          options: ["विष / ज़हर", "सुधा", "पीयूष", "जल"],
          ans: 0,
          exp: "अमृत का विलोम विष होता है।",
        },
        {
          text: "'सत्य' शब्द का सही विलोम क्या होगा?",
          options: ["असत्य / झूठ", "धर्म", "न्याय", "पाप"],
          ans: 0,
          exp: "सत्य का विलोम असत्य है।",
        },
        {
          text: "'जल' शब्द का पर्यायवाची शब्द कौन सा है?",
          options: ["नीरा / पानी", "अनल", "समीर", "पावक"],
          ans: 0,
          exp: "पानी, नीर, तोय जल के पर्यायवाची हैं (अनल = आग, समीर = हवा)।",
        },
        {
          text: "'आकाश' का पर्यायवाची शब्द कौन सा है?",
          options: ["गगन / नभ / अंबर", "धरा", "पाताल", "सरोवर"],
          ans: 0,
          exp: "गगन, नभ, अंबर आकाश के रूप हैं।",
        },
        {
          text: "दो या दो से अधिक पदों के संक्षिप्तीकरण से बने नए शब्द को क्या कहते हैं?",
          options: ["संधि", "समास", "अव्यय", "कारक"],
          ans: 1,
          exp: "शब्दों के संक्षेप को समास कहते हैं (जैसे: राजपुत्र)।",
        },
        {
          text: "मूल शब्द के पहले जुड़कर अर्थ बदलने वाले शब्दांश क्या कहलाते हैं?",
          options: ["उपसर्ग (Prefix)", "प्रत्यय", "संधि", "समास"],
          ans: 0,
          exp: "उपसर्ग शब्द के प्रारंभ में जुड़ते हैं (जैसे: अ + धर्म = अधर्म)।",
        },
        {
          text: "मूल शब्द के अंत में जुड़कर नया शब्द बनाने वाले शब्दांश क्या कहलाते हैं?",
          options: ["उपसर्ग", "प्रत्यय (Suffix)", "समास", "कारक"],
          ans: 1,
          exp: "प्रत्यय शब्द के अंत में जुड़ते हैं (जैसे: सुंदर + ता = सुंदरता)।",
        },
        {
          text: "'जिसका कोई अंत न हो' के लिए एक शब्द क्या होगा?",
          options: ["अनंत", "अमर", "अजर", "सर्वज्ञ"],
          ans: 0,
          exp: "जिसका अंत न हो उसे अनंत कहते हैं।",
        },
        {
          text: "'जो सब कुछ जानता हो' वाक्यांश के लिए एक शब्द क्या होगा?",
          options: ["अल्पज्ञ", "सर्वज्ञ", "विद्वान", "ज्ञानी"],
          ans: 1,
          exp: "सब कुछ जानने वाला सर्वज्ञ कहलाता है।",
        },
        {
          text: "'जो आँखों के सामने हो' के लिए एक शब्द क्या होगा?",
          options: ["परोक्ष", "प्रत्यक्ष", "दृश्य", "अदृश्य"],
          ans: 1,
          exp: "आँखों के सामने उपस्थित प्रत्यक्ष कहलाता है।",
        },
        {
          text: "'दाल न गलना' मुहावरे का सही अर्थ क्या है?",
          options: [
            "दाल न पकना",
            "सफल न होना / युक्ति न चलना",
            "भूख न लगना",
            "झगड़ा होना",
          ],
          ans: 1,
          exp: "दाल न गलना का अर्थ किसी चाल में सफल न होना है।",
        },
        {
          text: "'नौ दो ग्यारह होना' मुहावरे का अर्थ क्या है?",
          options: ["गिनती करना", "भाग जाना", "मिलकर काम करना", "जीत जाना"],
          ans: 1,
          exp: "नौ दो ग्यारह होना का अर्थ रफूचक्कर या भाग जाना है।",
        },
      ][o - 1];
      ((l = p.text), (A = p.options), (d = p.ans), (u = p.exp));
    }
    n.push({
      id: `csc_${a}_${t}_${s}_q_${o}`,
      text: l,
      options: A,
      correctAnswer: d,
      explanation: u,
      category: t,
    });
  }
  // No question may repeat inside one practice section (empty / duplicate texts are dropped).
  return dedupeQuestions(n);
};
export const COMPETITIVE_EXAM_GROUPS = [
  {
    id: "jharkhand",
    name: "Jharkhand State Exams (झारखंड)",
    exams: [
      "JPSC Combined Civil Services",
      "JSSC CGL",
      "Jharkhand Police SI & Constable",
      "JSSC Excise Constable",
      "JTET (Jharkhand Teacher Eligibility Test)",
      "Jharkhand GK Special",
      "Jharkhand Assistant Teacher / PRT",
      "JSSC Industrial Instructors",
    ],
  },
  {
    id: "upsc",
    name: "UPSC Exams",
    exams: [
      "Civil Services (IAS/IPS/IFS)",
      "Indian Forest Service (IFoS)",
      "Engineering Services (ESE)",
      "CDS",
      "NDA",
      "CAPF (Assistant Commandant)",
      "CMS",
      "IES/ISS",
    ],
  },
  {
    id: "ssc",
    name: "SSC Exams",
    exams: [
      "SSC CGL",
      "SSC CHSL",
      "SSC CPO",
      "SSC MTS",
      "SSC GD Constable",
      "SSC JE",
      "SSC Stenographer",
      "SSC Selection Post",
    ],
  },
  {
    id: "banking",
    name: "Banking & Insurance",
    exams: [
      "SBI PO",
      "SBI Clerk",
      "IBPS PO",
      "IBPS Clerk",
      "IBPS RRB",
      "RBI Grade B",
      "RBI Assistant",
      "NABARD Grade A/B",
    ],
  },
  {
    id: "railway",
    name: "Railway (RRB)",
    exams: [
      "RRB NTPC",
      "RRB Group D",
      "RRB JE",
      "RRB ALP",
      "RPF SI",
      "RPF Constable",
    ],
  },
  {
    id: "defence",
    name: "Defence Services",
    exams: [
      "NDA Exam",
      "CDS Exam",
      "AFCAT",
      "Agniveer Recruitment",
      "Indian Navy SSR/AA",
      "Indian Coast Guard",
    ],
  },
  {
    id: "teaching",
    name: "Teaching Exams",
    exams: ["CTET", "UPTET", "REET", "HTET", "KVS", "NVS", "State TET Exams"],
  },
  {
    id: "police",
    name: "Police & Para-military",
    exams: [
      "Delhi Police",
      "BSF Recruitment",
      "CRPF Recruitment",
      "CISF Recruitment",
      "ITBP Recruitment",
      "SSB Recruitment",
      "State Police SI/Constable",
    ],
  },
  {
    id: "engineering",
    name: "Engineering Entrance",
    exams: [
      "JEE Main",
      "JEE Advanced",
      "BITSAT",
      "VITEEE",
      "COMEDK",
      "MHT CET",
      "WBJEE",
    ],
  },
  {
    id: "medical",
    name: "Medical Entrance",
    exams: ["NEET UG", "NEET PG", "AIIMS Nursing", "INI CET"],
  },
  {
    id: "law",
    name: "Law Entrance",
    exams: ["CLAT", "AILET", "SLAT", "MH CET Law"],
  },
  {
    id: "mba",
    name: "MBA Entrance",
    exams: ["CAT", "XAT", "MAT", "CMAT", "SNAP", "NMAT", "IIFT"],
  },
  {
    id: "others",
    name: "Other Entrance Exams",
    exams: [
      "CUET UG",
      "CUET PG",
      "GATE",
      "UGC NET",
      "CSIR NET",
      "CA Foundation",
      "CMA Foundation",
      "CSEET",
      "NIFT",
      "NID DAT",
    ],
  },
];
export const SCHOOL_BOARD_GROUPS = [
  {
    id: "national",
    name: "राष्ट्रीय स्तर (1–10)",
    schools: [
      "जवाहर नवोदय विद्यालय चयन परीक्षा (JNVST) – कक्षा 6",
      "JNVST – कक्षा 9",
      "AISSEE – सैनिक स्कूल कक्षा 6",
      "AISSEE – सैनिक स्कूल कक्षा 9",
      "राष्ट्रीय मिलिट्री स्कूल प्रवेश परीक्षा",
      "राष्ट्रीय इंडियन मिलिट्री कॉलेज (RIMC) प्रवेश परीक्षा",
      "एकलव्य मॉडल रेजिडेंशियल स्कूल (EMRS)",
      "केंद्रीय हिन्दू स्कूल (CHS-BHU) कक्षा 6",
      "CHS-BHU कक्षा 9",
      "CHS-BHU कक्षा 11",
    ],
  },
  {
    id: "up",
    name: "उत्तर प्रदेश (11–25)",
    schools: [
      "अटल आवासीय विद्यालय कक्षा 6",
      "अटल आवासीय विद्यालय कक्षा 9",
      "राजकीय सैनिक स्कूल लखनऊ",
      "राजकीय सैनिक स्कूल अमेठी",
      "संस्कृत विद्यालय प्रवेश",
      "मॉडल स्कूल प्रवेश",
      "राजकीय आवासीय विद्यालय प्रवेश",
      "खेल विद्यालय प्रवेश",
      "छात्रावास विद्यालय प्रवेश",
      "नवोदय लेटरल प्रवेश",
      "उर्दू अकादमी विद्यालय प्रवेश",
      "अल्पसंख्यक आवासीय विद्यालय",
      "कृषि विद्यालय प्रवेश",
      "तकनीकी विद्यालय प्रवेश",
      "उत्कृष्ट विद्यालय प्रवेश",
    ],
  },
  {
    id: "bihar",
    name: "बिहार (26–35)",
    schools: [
      "सिमुलतला आवासीय विद्यालय",
      "डॉ. अंबेडकर आवासीय विद्यालय",
      "अनुसूचित जाति आवासीय विद्यालय",
      "जनजातीय आवासीय विद्यालय",
      "उत्कृष्ट विद्यालय प्रवेश",
      "मॉडल स्कूल प्रवेश",
      "सैनिक प्रिपरेटरी स्कूल",
      "अल्पसंख्यक विद्यालय प्रवेश",
      "खेल विद्यालय",
      "जिला आवासीय विद्यालय",
    ],
  },
  {
    id: "mp",
    name: "मध्य प्रदेश (36–45)",
    schools: [
      "CM राइज स्कूल प्रवेश",
      "उत्कृष्ट विद्यालय",
      "मॉडल स्कूल",
      "कन्या शिक्षा परिसर",
      "आदिवासी आवासीय विद्यालय",
      "एकलव्य विद्यालय",
      "खेल विद्यालय",
      "सैनिक स्कूल (PPP)",
      "नवोदय लेटरल",
      "जिला उत्कृष्ट विद्यालय",
    ],
  },
  {
    id: "rajasthan",
    name: "राजस्थान (46–55)",
    schools: [
      "महात्मा गांधी अंग्रेजी विद्यालय",
      "आदर्श आवासीय विद्यालय",
      "जनजातीय विद्यालय",
      "सैनिक स्कूल चित्तौड़गढ़",
      "सैनिक स्कूल झुंझुनू",
      "मॉडल स्कूल",
      "उत्कृष्ट विद्यालय",
      "छात्रावास विद्यालय",
      "खेल विद्यालय",
      "नवोदय लेटरल",
    ],
  },
  {
    id: "cg",
    name: "छत्तीसगढ़ (56–65)",
    schools: [
      "प्रयास विद्यालय",
      "एकलव्य आदर्श विद्यालय",
      "प्रयास आवासीय विद्यालय",
      "आदिवासी विद्यालय",
      "उत्कृष्ट विद्यालय",
      "मॉडल स्कूल",
      "खेल विद्यालय",
      "छात्रावास विद्यालय",
      "कन्या शिक्षा परिसर",
      "नवोदय लेटरल",
    ],
  },
  {
    id: "jharkhand",
    name: "झारखंड (66–72)",
    schools: [
      "नेतरहाट आवासीय विद्यालय",
      "इंदिरा गांधी बालिका विद्यालय",
      "आदिवासी विद्यालय",
      "एकलव्य विद्यालय",
      "मॉडल स्कूल",
      "उत्कृष्ट विद्यालय",
      "नवोदय लेटरल",
    ],
  },
  {
    id: "odisha",
    name: "ओडिशा (73–79)",
    schools: [
      "ओडिशा आदर्श विद्यालय",
      "SC/ST आवासीय विद्यालय",
      "एकलव्य विद्यालय",
      "सैनिक स्कूल भुवनेश्वर",
      "मॉडल स्कूल",
      "उत्कृष्ट विद्यालय",
      "नवोदय लेटरल",
    ],
  },
  {
    id: "haryana",
    name: "हरियाणा (80–85)",
    schools: [
      "मोतीलाल नेहरू स्कूल ऑफ स्पोर्ट्स",
      "सुपर-100 स्कूल",
      "मॉडल संस्कृति विद्यालय",
      "सैनिक स्कूल रेवाड़ी",
      "आवासीय विद्यालय",
      "उत्कृष्ट विद्यालय",
    ],
  },
  {
    id: "delhi",
    name: "दिल्ली (86–90)",
    schools: [
      "CM SHRI स्कूल प्रवेश परीक्षा",
      "सर्वोदय विद्यालय चयन",
      "नवयुग स्कूल",
      "राजकीय प्रतिभा विद्यालय",
      "स्कूल ऑफ एक्सीलेंस प्रवेश",
    ],
  },
  {
    id: "private",
    name: "प्रतिष्ठित निजी विद्यालय (91–110)",
    schools: [
      "दून स्कूल",
      "सिंधिया स्कूल",
      "मेयो कॉलेज",
      "बिशप कॉटन स्कूल",
      "वेल्हम बॉयज़",
      "वेल्हम गर्ल्स",
      "बिरला पब्लिक स्कूल",
      "बिरला विद्या मंदिर",
      "आर.के. मिशन विद्यालय",
      "शेरवुड कॉलेज",
      "लारेंस स्कूल सनावर",
      "लारेंस स्कूल लवडेल",
      "यदुविंद्र पब्लिक स्कूल",
      "सिंधिया कन्या विद्यालय",
      "वुडस्टॉक स्कूल",
      "सेंट पॉल्स स्कूल",
      "सेंट जॉर्ज स्कूल",
      "दिल्ली पब्लिक स्कूल (जहाँ प्रवेश परीक्षा लागू हो)",
      "आर्मी पब्लिक स्कूल (कुछ कक्षाओं में)",
    ],
  },
];
export const COMPETITIVE_SUBJECTS = [
  {
    id: "gs",
    name: "सामान्य अध्ययन / जनरल नॉलेज (General Studies & GK)",
    desc: "इतिहास, भूगोल, नागरिक शास्त्र, राजनीति, अर्थशास्त्र और पर्यावरण जागरूकता।",
  },
  {
    id: "math",
    name: "संख्यात्मक व गणितीय अभियोग्यता (Quantitative Aptitude & Math)",
    desc: "संख्या पद्धति, अंकगणित, बीजगणित, ज्यामिति और डीआई।",
  },
  {
    id: "english",
    name: "अंग्रेजी भाषा व व्याकरण (English Language & Verbal Ability)",
    desc: "Grammar, Parts of Speech, Vocabulary, Synonyms, Antonyms, and Comprehension.",
  },
  {
    id: "reasoning",
    name: "तार्किक व मानसिक क्षमता (Reasoning & Mental Ability)",
    desc: "कोडिंग-डिकोडिंग, रक्त संबंध, शृंखला, दिशा ज्ञान और तार्किक पहेलियाँ।",
  },
  {
    id: "computer",
    name: "कंप्यूटर व सूचना प्रौद्योगिकी (Computer Science & IT)",
    desc: "कंप्यूटर का इतिहास, बुनियादी घटक, एमएस ऑफिस, इंटरनेट, नेटवर्किंग व साइबर सुरक्षा।",
  },
];
export const KNOWLEDGE_BOOKS = [
  {
    id: "success_principles",
    title: "सफलता के सिद्धांत",
    color: "from-emerald-800 to-emerald-950",
    content: `
      <h3 class="text-xl font-bold text-emerald-950 mb-3">सफलता के मूल सिद्धांत (Core Principles of Success)</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">सफलता कोई दुर्घटना नहीं है, बल्कि यह निरंतर प्रयास, अनुशासन, और सही दिशा में की गई मेहनत का परिणाम है। जीवन में सफलता पाने के कुछ बुनियादी सिद्धांत यहाँ दिए गए हैं:</p>
      
      <div class="space-y-3 mb-4">
        <div class="border-l-4 border-emerald-600 pl-3">
          <strong class="text-emerald-900">1. स्पष्ट लक्ष्य (Clear Vision):</strong> बिना लक्ष्य के आगे बढ़ना वैसा ही है जैसे बिना पते के यात्रा करना। अपने लक्ष्यों को स्पष्ट और मापने योग्य बनाएं।
        </div>
        <div class="border-l-4 border-emerald-600 pl-3">
          <strong class="text-emerald-900">2. निरंतरता (Consistency):</strong> एक बड़ा कदम उठाने से बेहतर है कि हर रोज छोटे-छोटे कदम उठाए जाएं। निरंतरता ही साधारण को असाधारण बनाती है।
        </div>
        <div class="border-l-4 border-emerald-600 pl-3">
          <strong class="text-emerald-900">3. सकारात्मक मानसिकता (Positive Mindset):</strong> चुनौतियों को अवसरों के रूप में देखना और असफलता से सीखकर आगे बढ़ना ही असली सफलता का मार्ग है।
        </div>
      </div>
    `,
  },
  {
    id: "time_management",
    title: "समय प्रबंधन",
    color: "from-amber-800 to-amber-950",
    content: `
      <h3 class="text-xl font-bold text-emerald-950 mb-3">समय प्रबंधन (Time Management)</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">समय हमारा सबसे मूल्यवान संसाधन है। इसे कभी भी संचित (store) नहीं किया जा सकता, केवल बुद्धिमानी से उपयोग किया जा सकता है।</p>
      <h4 class="font-bold text-emerald-800 mb-2">प्रभावशाली समय प्रबंधन के मुख्य तरीके:</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-700 mb-4">
        <li><strong>आइजनहावर मैट्रिक्स (Eisenhower Matrix):</strong> अपने कार्यों को चार श्रेणियों में विभाजित करें: महत्वपूर्ण और जरूरी, महत्वपूर्ण लेकिन जरूरी नहीं, जरूरी लेकिन महत्वपूर्ण नहीं, न जरूरी और न महत्वपूर्ण।</li>
        <li><strong>पोमोडोरो तकनीक (Pomodoro Technique):</strong> 25 मिनट पूरी एकाग्रता के साथ काम करें, फिर 5 मिनट का छोटा ब्रेक लें। इससे उत्पादकता बनी रहती है।</li>
        <li><strong>टू-डू लिस्ट (To-Do List):</strong> हर रोज सुबह या एक रात पहले अपने कार्यों की सूची तैयार करें।</li>
      </ul>
    `,
  },
  {
    id: "digital_education",
    title: "डिजिटल शिक्षा",
    color: "from-teal-800 to-teal-950",
    content: `
      <h3 class="text-xl font-bold text-emerald-950 mb-3">डिजिटल शिक्षा और इंटरनेट साक्षरता</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">आज की डिजिटल दुनिया में शिक्षा केवल कक्षाओं तक सीमित नहीं है। इंटरनेट ने ज्ञान के असीमित द्वार खोल दिए हैं।</p>
      <h4 class="font-bold text-emerald-800 mb-2">डिजिटल शिक्षा के लाभ:</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-700 mb-3">
        <li><strong>सुलभता (Accessibility):</strong> आप दुनिया के किसी भी कोने से बेहतरीन शिक्षकों और पाठ्यक्रमों तक पहुँच सकते हैं।</li>
        <li><strong>लचीलापन (Flexibility):</strong> अपनी गति और सुविधानुसार सीखने का अवसर।</li>
        <li><strong>विविधता (Diversity):</strong> वीडियो, ऑडियो, कोडिंग सैंडबॉक्स और इंटरेक्टिव क्विज़ के माध्यम से सीखना अधिक मजेदार होता है।</li>
      </ul>
      <p class="text-xs text-gray-500 italic mt-4">नोट: डिजिटल संसाधनों का उपयोग करते समय स्क्रीन टाइम को संतुलित रखना और प्रामाणिक स्रोतों से ही जानकारी लेना आवश्यक है।</p>
    `,
  },
  {
    id: "personality_development",
    title: "व्यक्तित्व विकास",
    color: "from-blue-800 to-blue-950",
    content: `
      <h3 class="text-xl font-bold text-emerald-950 mb-3">व्यक्तित्व विकास (Personality Development)</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">व्यक्तित्व केवल बाहरी रूप-रंग नहीं है, बल्कि आपके आंतरिक गुणों, व्यवहार और संवाद शैली का मेल है। अपने व्यक्तित्व को निखारने के लिए इन बातों पर ध्यान दें:</p>
      <ul class="list-disc pl-5 space-y-2 text-gray-700 mb-4">
        <li><strong>आत्मविश्वास रखें:</strong> अपने निर्णयों और क्षमताओं पर भरोसा करना सीखें।</li>
        <li><strong>अच्छा श्रोता बनें:</strong> दूसरों की बातों को ध्यान से सुनना आपके व्यक्तित्व को गरिमा प्रदान करता है।</li>
        <li><strong>निरंतर सुधार करें:</strong> अपनी कमियों को पहचानें और उन पर सकारात्मक रूप से काम करें।</li>
      </ul>
    `,
  },
  {
    id: "positive_thinking",
    title: "सकारात्मक सोच",
    color: "from-purple-800 to-purple-950",
    content: `
      <h3 class="text-xl font-bold text-emerald-950 mb-3">सकारात्मक सोच (Positive Thinking)</h3>
      <p class="mb-4 text-gray-700 leading-relaxed">हमारी सोच ही हमारे जीवन की दिशा तय करती है। सकारात्मक सोच का अर्थ यह नहीं है कि हम समस्याओं को नजरअंदाज करें, बल्कि यह है कि हम उनका सामना आशावादी दृष्टिकोण से करें।</p>
      <h4 class="font-bold text-emerald-800 mb-2">सकारात्मक सोच विकसित करने के उपाय:</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-700 mb-4">
        <li><strong>कृतज्ञता (Gratitude):</strong> अपने जीवन में मौजूद अच्छी चीजों के लिए आभार व्यक्त करें।</li>
        <li><strong>सकारात्मक आत्म-संवाद (Self-Talk):</strong> खुद को कोसने के बजाय खुद को प्रेरित और प्रोत्साहित करें।</li>
        <li><strong>अच्छी संगति:</strong> ऐसे लोगों और विचारों के साथ समय बिताएं जो आपको सकारात्मक ऊर्जा प्रदान करते हैं।</li>
      </ul>
    `,
  },
];
