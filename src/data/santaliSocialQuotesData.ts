export interface SocialCardQuote {
  id: string;
  category: 'pride' | 'philosophy' | 'nature' | 'friendship' | 'greetings' | 'labor' | 'proverbs' | 'education';
  categoryLabel: string;
  santaliDevanagari: string;
  santaliRoman: string;
  hindiMeaning: string;
  englishMeaning: string;
  authorOrSource: string;
}

export const SANTALI_100_QUOTES: SocialCardQuote[] = [
  // ─── 1. स्वाभिमान व भाषा अस्मिता (Pride & Identity) ───
  {
    id: 'sq_1',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'आबो रोड़, आबो उपरुम, आबो गोरोब।',
    santaliRoman: 'Abo Ror, Abo Uprum, Abo Gorob.',
    hindiMeaning: 'हमारी भाषा ही हमारी असली पहचान और हमारा सर्वोच्च स्वाभिमान है।',
    englishMeaning: 'Our Language is our true identity and our supreme pride.',
    authorOrSource: 'संताली लोक चेतना महामंत्र'
  },
  {
    id: 'sq_2',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'रोड़ बांचाय लेनखान गे, जाति दो बांचावा।',
    santaliRoman: 'Ror banchay lenkhan ge, jati do banchawa.',
    hindiMeaning: 'यदि मातृभाषा जीवित रहेगी, तभी हमारी संस्कृति और समाज जीवित रहेगा।',
    englishMeaning: 'Only if the mother tongue survives will our community and heritage survive.',
    authorOrSource: 'पंडित रघुनाथ मुर्मू'
  },
  {
    id: 'sq_3',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'हुल! सिदो-कान्हू, चांद-भैरव, फूलो-झानो आबोवाग् गोरबो।',
    santaliRoman: 'Hul! Sido-Kanhu, Chand-Bhairav, Phulo-Jhano abowag gorbo.',
    hindiMeaning: '१८५५ का अमर हुल! सिदो-कान्हू, चांद-भैरव और फूलो-झानो का अमर बलिदान हमारा शाश्वत गौरव है।',
    englishMeaning: 'Hul 1855! The immortal sacrifice of our martyrs is our eternal pride.',
    authorOrSource: 'संथाल हुल १८५५'
  },
  {
    id: 'sq_4',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'बाबा तिलका मांझी दो पहिल हुलगारिया कानाय।',
    santaliRoman: 'Baba Tilka Majhi do pahil hulgaria kanay.',
    hindiMeaning: 'बाबा तिलका मांझी भारत भूमि के प्रथम स्वतंत्रता सेनानी और स्वाभिमान के अमर प्रतीक हैं।',
    englishMeaning: 'Baba Tilka Majhi is the legendary first freedom fighter of our motherland.',
    authorOrSource: 'तिलका आंदोलन १७८४'
  },
  {
    id: 'sq_5',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'हासा आड़ आबोवाग्, भासा आड़ आबोवाग्, आबो गे दिसोम रेन मालिक।',
    santaliRoman: 'Hasa ar abowag, bhasa ar abowag, abo ge disom ren malik.',
    hindiMeaning: 'यह पवित्र माटी हमारी है, यह भाषा हमारी है, और हम ही इस धरती के सच्चे स्वामी हैं।',
    englishMeaning: 'This soil is ours, this tongue is ours, and we are the sovereign custodians of this land.',
    authorOrSource: 'आदिम जल-जंगल-जमीन उद्घोष'
  },
  {
    id: 'sq_6',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'ओल-चिकी दो आबोवाग् मेत् काना, रोड़ दो आबोवाग् जीवी।',
    santaliRoman: 'Ol-Chiki do abowag met kana, ror do abowag jiwi.',
    hindiMeaning: 'ओल-चिकी लिपि हमारी दृष्टि (आंख) है और संताली भाषा हमारी अंतरात्मा की प्राणवायु।',
    englishMeaning: 'The Ol Chiki script is our vision, and the Santali language is our very soul.',
    authorOrSource: 'भाषा चेतना विचार'
  },
  {
    id: 'sq_7',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'आबो दो खेरवाल होपोन, सानाम खोन् लाहा तेगे।',
    santaliRoman: 'Abo do Kherwal hopon, sanam khon laha tege.',
    hindiMeaning: 'हम खेरवाल के वंशज हैं, जो सृष्टि के आरंभ से ही स्वाभिमानी और स्वतंत्र रहे हैं।',
    englishMeaning: 'We are the proud progeny of Kherwal, sovereign from the dawn of creation.',
    authorOrSource: 'हपड़ाम कोवाग् काथा'
  },
  {
    id: 'sq_8',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'धिरि लेका केटेच् मोने, तीर लेका सीधा डाहार।',
    santaliRoman: 'Dhiri leka ketech mone, tir leka sidha dahar.',
    hindiMeaning: 'मन चट्टान की भांति दृढ़ और जीवन का मार्ग धनुष के तीर की भांति सीधा और निष्कपट होना चाहिए।',
    englishMeaning: 'A mind resolute as rock, and a life path straight and truthful as an arrow.',
    authorOrSource: 'संताली वीर नीति'
  },
  {
    id: 'sq_9',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'मांझी परगना आरिस लेका साफा, आबोवाग् बैसी गे आबोवाग् सरकार।',
    santaliRoman: 'Majhi Pargana aris leka safa, abowag baisi ge abowag sarkar.',
    hindiMeaning: 'मांझी परगना स्वशासन दर्पण की भांति स्वच्छ है, हमारी पारंपरिक ग्राम सभा ही हमारा असली शासन है।',
    englishMeaning: 'Majhi Pargana self-rule is crystal pure; our village assembly is our supreme council.',
    authorOrSource: 'मांझी परगना स्वशासन'
  },
  {
    id: 'sq_10',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'लुगुबुरु घंटाबाड़ी दो सानाम संताल कोवाग् धरम गढ़।',
    santaliRoman: 'Luguburu Ghantabari do sanam Santal kowag dhorom garh.',
    hindiMeaning: 'लुगुबुरु घंटाबाड़ी संपूर्ण संताल जाति की आध्यात्मिक आस्था और अखंड एकता का सर्वोच्च तीर्थ है।',
    englishMeaning: 'Luguburu Ghantabari is the supreme spiritual citadel of unity for all Santal people.',
    authorOrSource: 'लुगुबुरु धर्म सम्मेलन'
  },
  {
    id: 'sq_11',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'आबोवाग् अरिचली, आबोवाग् सेरेञ दो आबोवाग् गहना।',
    santaliRoman: 'Abowag aricali, abowag seren do abowag gohana.',
    hindiMeaning: 'हमारी समृद्ध संस्कृति और पारंपरिक लोकगीत ही हमारा सबसे अनमोल आभूषण हैं।',
    englishMeaning: 'Our living traditions and ancient folk melodies are our most precious adornments.',
    authorOrSource: 'संताली सांस्कृतिक नीति'
  },
  {
    id: 'sq_12',
    category: 'pride',
    categoryLabel: 'स्वाभिमान व अस्मिता',
    santaliDevanagari: 'गोरोब ते मेने मे— इञ दो संताल कानाञ! आबोवाग् रोड़ दो सोना।',
    santaliRoman: 'Gorob te mene me— In do Santal kanan! Abowag ror do sona.',
    hindiMeaning: 'गर्व से कहो— मैं संताल हूँ! हमारी भाषा सोने से भी अधिक मूल्यवान और मधुर है।',
    englishMeaning: 'Declare with pride— I am a Santal! Our tongue is more precious than refined gold.',
    authorOrSource: 'संताली युवा उद्घोष'
  },

  // ─── 2. आदिम दर्शन व जीवन मूल्य (Philosophy & Wisdom) ───
  {
    id: 'sq_13',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'सानाम होड़ मित्, जीवी दो मित् गेया।',
    santaliRoman: 'Sanam hor mit, jiwi do mit geya.',
    hindiMeaning: 'संसार के सभी मनुष्य एक समान हैं, और प्रत्येक प्राणी की आत्मा एक समान पवित्र है।',
    englishMeaning: 'All humans are equal, and the sacred spirit dwelling in every being is one.',
    authorOrSource: 'संताल आदिम दर्शन'
  },
  {
    id: 'sq_14',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'रोड़ रे हेड़ेम, मोने रे सा़री, कामी रे आचार।',
    santaliRoman: 'Ror re herem, mone re sari, kami re achar.',
    hindiMeaning: 'वाणी में सदैव मिठास रखो, अंतःकरण में पवित्र सत्य, और आचरण में धर्म व मर्यादा।',
    englishMeaning: 'Sweetness upon the tongue, truth within the heart, and dignity in all deeds.',
    authorOrSource: 'संताली शिष्टाचार सूत्र'
  },
  {
    id: 'sq_15',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'ठाकुर जिउ दो सानाम कोवाग् मोने रे मेनाया।',
    santaliRoman: 'Thakur Jiu do sanam kowag mone re menaya.',
    hindiMeaning: 'सृष्टिकर्ता ठाकुर जिउ हर प्राणी के हृदय में दया और प्रकाश बनकर विराजमान हैं।',
    englishMeaning: 'The supreme creator Thakur Jiu resides within the conscience of all living beings.',
    authorOrSource: 'सिरजोन गाथा'
  },
  {
    id: 'sq_16',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'सुख आर दुख दो चांदो आड़ रेनाग् साहाव काना।',
    santaliRoman: 'Sukh ar dukh do Chando ar renag sahaw kana.',
    hindiMeaning: 'सुख और दुःख दिन और रात की तरह जीवन के स्वाभाविक चक्र हैं, दोनों में समभाव रखो।',
    englishMeaning: 'Joy and sorrow are like day and night; face both with enduring equanimity.',
    authorOrSource: 'हपड़ाम कोवाग् दर्शन'
  },
  {
    id: 'sq_17',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'एड़े काथा ते दो ओकय हों बाय बांचावा।',
    santaliRoman: 'Ere katha te do otoy hon bay banchawa.',
    hindiMeaning: 'झूठ और छल के सहारे कभी कोई स्थायी सफलता या सम्मान प्राप्त नहीं कर सकता।',
    englishMeaning: 'Falsehood and deceit can never lead to enduring truth or salvation.',
    authorOrSource: 'संताली नीति श्लोक'
  },
  {
    id: 'sq_18',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'जीवत बेड़ा रे भलाई कामी मे, गुजुक् खोन लाहा सुक पाय।',
    santaliRoman: 'Jiwat bera re bhalai kami me, gujuk khon laha suk pay.',
    hindiMeaning: 'जब तक जीवन की सांसें हैं, परोपकार करो; नेकी का फल मृत्यु के बाद भी अमर रहता है।',
    englishMeaning: 'Do good deeds while life endures; selfless kindness outlives mortality.',
    authorOrSource: 'संताल जीवन दर्शन'
  },
  {
    id: 'sq_19',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'मारांग बुरु आबोवाग् रक्षक, जाहेर एरा आबोवाग् आयुष।',
    santaliRoman: 'Marang Buru abowag rokhok, Jaher Era abowag ayush.',
    hindiMeaning: 'मरांग बुरु हमारे रक्षक हैं और जाहेर एरा हमारे कुल-गोत्र और जीवन की शक्ति हैं।',
    englishMeaning: 'Marang Buru is our eternal guardian, and Jaher Era is the mother of our life force.',
    authorOrSource: 'जाहेर थान प्रार्थना'
  },
  {
    id: 'sq_20',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'हड़ाम कोवाग् उपदेश दो धीरी रेनाग् ओल काना।',
    santaliRoman: 'Haram kowag updesh do dhiri renag ol kana.',
    hindiMeaning: 'बुजुर्गों और पूर्वजों की सीख पत्थर पर खुदी लकीर की तरह अटल और मार्गदर्शक होती है।',
    englishMeaning: 'The counsel of our wise ancestors is indelibly etched like carvings on stone.',
    authorOrSource: 'संताली कुलही बैसी'
  },
  {
    id: 'sq_21',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'धन-दौलत दो धुड़ी काना, मान-सम्मान गे असली धन।',
    santaliRoman: 'Dhan-doulat do dhuri kana, man-somman ge asli dhan.',
    hindiMeaning: 'भौतिक धन-दौलत धूल के समान नश्वर है, चरित्र और आत्म-सम्मान ही सबसे बड़ा धन है।',
    englishMeaning: 'Material wealth is transient as dust; character and honor are true riches.',
    authorOrSource: 'संताल लोक नीति'
  },
  {
    id: 'sq_22',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'साहाव लेकान दाड़े दो संसार रे आर ओका हों बानूक्-आ।',
    santaliRoman: 'Sahaw lekan dare do sansar re ar oka hon banuk-a.',
    hindiMeaning: 'धैर्य और सहनशीलता से बड़ी कोई शक्ति संसार में नहीं है।',
    englishMeaning: 'There is no supreme strength in this universe greater than patient endurance.',
    authorOrSource: 'संताली दार्शनिक वचन'
  },
  {
    id: 'sq_23',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'मोने सुलूक गे तीरथ काना, अंतोर रे शांति ताहेन मा।',
    santaliRoman: 'Mone suluk ge tirath kana, antor re shanti tahen ma.',
    hindiMeaning: 'पवित्र और शांत मन ही सबसे बड़ा तीर्थ है, अपने अंतःकरण को सदैव शांत और निर्मल रखो।',
    englishMeaning: 'A peaceful heart is the truest pilgrimage; keep your soul serene and pure.',
    authorOrSource: 'आदिम ध्यान दर्शन'
  },
  {
    id: 'sq_24',
    category: 'philosophy',
    categoryLabel: 'आदिम दर्शन व जीवन मूल्य',
    santaliDevanagari: 'होर दो होर गे, सानाम को तेगे दिसोम।',
    santaliRoman: 'Hor do hor ge, sanam ko tege disom.',
    hindiMeaning: 'मनुष्य सब एक हैं, और यह सुंदर संसार सभी के आपसी सहयोग और सद्भाव से ही चलता है।',
    englishMeaning: 'Humans are one humankind; harmonious community creates a thriving world.',
    authorOrSource: 'संताल सामाजिक दर्शन'
  },

  // ─── 3. प्रकृति, वन व सरजोम वंदना (Nature, Forest & Sal Tree) ───
  {
    id: 'sq_25',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'दारे सरजोम जीवी बांचाव, बीर गे आबोवाग् जीवी।',
    santaliRoman: 'Dare sarjom jiwi banchaw, bir ge abowag jiwi.',
    hindiMeaning: 'साल का पावन वृक्ष जीवन रक्षक है, और जंगल ही हमारा सच्चा प्राण है।',
    englishMeaning: 'The Sal tree preserves life; the forest is our true existence.',
    authorOrSource: 'जाहेर थान प्रकृति वंदना'
  },
  {
    id: 'sq_26',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'रुपा लेका दाग्, सोना लेका हासा, सानाम खोन् दामी।',
    santaliRoman: 'Rupa leka dag, sona leka hasa, sanam khon dami.',
    hindiMeaning: 'चांदी के समान निर्मल है वर्षा का जल, और सोने से भी मूल्यवान है हमारी उपजाऊ मिट्टी।',
    englishMeaning: 'Water pristine as silver, and mother earth more precious than purest gold.',
    authorOrSource: 'संताली कृषि दर्शन'
  },
  {
    id: 'sq_27',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'बाहा परोब रे सरजोम बाहा कुड़ी को साजाव, धरम बोंगा सेबा।',
    santaliRoman: 'Baha parab re sarjom baha kuri ko sajaw, dhorom bonga seba.',
    hindiMeaning: 'बाहा पर्व में साल के नए फूलों से बेटियां सजती हैं, और बोंगा व प्रकृति की आराधना होती है।',
    englishMeaning: 'In Baha festival, maidens adorn fresh Sal blossoms in sacred reverence.',
    authorOrSource: 'बाहा लोकगीत'
  },
  {
    id: 'sq_28',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'बीर बुरू दो आबोवाग् आयोक काना, ओना सांवते छेडछाड़ आलो पे कोरावा।',
    santaliRoman: 'Bir buru do abowag ayok kana, ona sawte chedchar alo pe korawa.',
    hindiMeaning: 'वन और पर्वत हमारी माता के समान हैं, उनके साथ खिलवाड़ या उनका विनाश कभी न करें।',
    englishMeaning: 'Forests and mountains are our divine mother; protect them with unyielding reverence.',
    authorOrSource: 'सेंन्द्रा लोबीर संरक्षण नियम'
  },
  {
    id: 'sq_29',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'दाड़ी दाक् दो अमृत, ओना साफा दोहो मे।',
    santaliRoman: 'Dadi dak do amrit, ona safa doho me.',
    hindiMeaning: 'प्राकृतिक जलस्रोत (दाड़ी) का पानी अमृत है, उसे सदैव स्वच्छ और पवित्र बनाए रखो।',
    englishMeaning: 'Spring water from the Dadi is nectar; keep every water source pristine and clean.',
    authorOrSource: 'संताली जल नीति'
  },
  {
    id: 'sq_30',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'सरजोम, मातकोम, केंदु आर ईचाक्— बीर रेनाग् आबोवाग् धन।',
    santaliRoman: 'Sarjom, Matkom, Kendu ar Ichak— bir renag abowag dhan.',
    hindiMeaning: 'साल, महुआ, केंदु और ईचाक के वृक्ष वन में हमारा सबसे बड़ा प्राकृतिक भंडार हैं।',
    englishMeaning: 'Sal, Mahua, Kendu and Ichak are the sacred botanical wealth of our ancestors.',
    authorOrSource: 'वनौषधि ज्ञान'
  },
  {
    id: 'sq_31',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'चेणे-चिपड़ू कोवाग् राग् ते दिशोम दो उसाड़ा।',
    santaliRoman: 'Cene-cipru kowag rag te disom do usara.',
    hindiMeaning: 'पक्षियों के मधुर कलरव से ही प्रकृति का सौंदर्य और प्रभात की शोभा जगती है।',
    englishMeaning: 'The joyful songs of forest birds awaken the true majesty of dawn.',
    authorOrSource: 'संताली भोर सेरेञ'
  },
  {
    id: 'sq_32',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'जाहेर थान रे साल-महुआ दारे दो बोंगा कोवाग् बासा।',
    santaliRoman: 'Jaher Than re Sal-Mahua dare do bonga kowag basa.',
    hindiMeaning: 'पवित्र जाहेर थान के साल और महुआ वृक्ष देव शक्तियों का साक्षात पावन निवास हैं।',
    englishMeaning: 'The sacred Sal grove at Jaher Than is the divine sanctuary of our protector deities.',
    authorOrSource: 'जाहेर थान पवित्रता'
  },
  {
    id: 'sq_33',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'दारे रोहाय मे, जीवी बांचाव मे, संताल रीती दोहो मे।',
    santaliRoman: 'Dare rohay me, jiwi banchaw me, Santal riti doho me.',
    hindiMeaning: 'पेड़ लगाओ, जीवन बचाओ, और संताली प्रकृति-पूजक परंपरा को जीवित रखो।',
    englishMeaning: 'Plant trees, sustain all life, and preserve the ecological heritage of the Santals.',
    authorOrSource: 'प्रकृति संदेश'
  },
  {
    id: 'sq_34',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'सिं बोंगा दो धरती रे उजाला आर शक्ति एमोक्-आ।',
    santaliRoman: 'Sin Bonga do dharti re ujala ar shakti emok-a.',
    hindiMeaning: 'सूर्य देवता (सिं बोंगा) संपूर्ण जगत को प्रकाश, जीवन ऊर्जा और नवचेतना प्रदान करते हैं।',
    englishMeaning: 'Sing Bonga (the Sun divinity) bestows radiant light and vitality upon all creation.',
    authorOrSource: 'सिं बोंगा वंदना'
  },
  {
    id: 'sq_35',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'चांदो मुलूग् रे बाहा फूटे, कुनामी रे मोने उसाड़ा।',
    santaliRoman: 'Chando mulug re baha fute, kunami re mone usara.',
    hindiMeaning: 'शुक्ल पक्ष के नए चांद में फूल खिलते हैं, और पूर्णमासी की रात में मन उल्लास से भर जाता है।',
    englishMeaning: 'With the waxing moon flowers bloom; beneath the full moon the spirit rejoices.',
    authorOrSource: 'चांदो लोकगीत'
  },
  {
    id: 'sq_36',
    category: 'nature',
    categoryLabel: 'प्रकृति व पर्यावरण',
    santaliDevanagari: 'हासा माताव लेनखान, अन्न मातावा, आतु रे सुख हेजुक्-आ।',
    santaliRoman: 'Hasa mataw lenkhan, anno matawa, atu re sukh hejuk-a.',
    hindiMeaning: 'जब धरती माता तृप्त और हरी-भरी होती है, तभी फसलें लहलहाती हैं और गांव में खुशहाली आती है।',
    englishMeaning: 'When the soil is nurtured with love, grain flourishes and peace graces every home.',
    authorOrSource: 'संताली कृषि सूत्र'
  },

  // ─── 4. श्रम, स्वावलंबन व कृषि (Labor, Hard Work & Agriculture) ───
  {
    id: 'sq_37',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'कामी लेखान जोम, बांग खान ताहेन रेंगेच्।',
    santaliRoman: 'Kami lekhan jom, bang khan tahen rengech.',
    hindiMeaning: 'परिश्रम करोगे तो भरपूर अन्न मिलेगा, आलस्य करोगे तो भूखे रहना पड़ेगा।',
    englishMeaning: 'Honest labor brings abundant sustenance; idleness leads only to hunger.',
    authorOrSource: 'हपड़ाम कोवाग् उपदेश'
  },
  {
    id: 'sq_38',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'नाहोल आर काड़ा, आबोवाग् जीवन डाहार।',
    santaliRoman: 'Nahol ar kara, abowag jiwan dahar.',
    hindiMeaning: 'हल और बैल हमारी आजीविका के सच्चे सारथी और स्वावलंबन के आधार हैं।',
    englishMeaning: 'The plough and the oxen are our faithful companions on the journey of life.',
    authorOrSource: 'कृषि लोकगीत'
  },
  {
    id: 'sq_39',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'उदगार दाग् ते रोहाय लेनखान, धान दो सोना लेका झोलकावा।',
    santaliRoman: 'Udgar dag te rohay lenkhan, dhan do sona leka jholkawa.',
    hindiMeaning: 'जब पसीने की बूंदों से खेत सींचे जाते हैं, तो धान की फसल सोने की भांति चमकती है।',
    englishMeaning: 'When fields are nourished by honest sweat, golden grain shines with pride.',
    authorOrSource: 'रोपा सेरेञ'
  },
  {
    id: 'sq_40',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'ती-जांगा मेनाक्-आ, ओनाते कामी मे, ओकय सामने आलोम कोयोक्।',
    santaliRoman: 'Ti-janga menak-a, onate kami me, okay samne alom koyok.',
    hindiMeaning: 'हाथ और पैर दिए हैं तो मेहनत करो, किसी के आगे कभी हाथ मत फैलाओ।',
    englishMeaning: 'With able hands and legs, work diligently; never bow down as a beggar to anyone.',
    authorOrSource: 'स्वावलंबन नीति'
  },
  {
    id: 'sq_41',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'कामी रे लाजाव बानूक्-आ, ठग कामी रे लाजाव मेनाक्-आ।',
    santaliRoman: 'Kami re lajaw banuk-a, thag kami re lajaw menak-a.',
    hindiMeaning: 'मेहनत और ईमानदारी के काम में कोई लज्जा नहीं, लज्जा तो बेईमानी और चोरी में है।',
    englishMeaning: 'There is no shame in honest labor; shame lies only in theft and deception.',
    authorOrSource: 'संताली श्रम नीति'
  },
  {
    id: 'sq_42',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'सावे-सावे ते कामी लेनखान, मारांग बुरु हों आशीर्वाद एमोक्-आ।',
    santaliRoman: 'Sawe-sawe te kami lenkhan, Marang Buru hon ashirbad emok-a.',
    hindiMeaning: 'एकजुट होकर मिलकर काम करने पर प्रकृति और भगवान भी अपनी कृपा बरसाते हैं।',
    englishMeaning: 'When we work in united solidarity, the divine blessings of Marang Buru shower upon us.',
    authorOrSource: 'कुलही सहयोग'
  },
  {
    id: 'sq_43',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'एरोक\' बेड़ा रे आलोम घूमावा, इर-सुनात बेड़ा रे सुख पाय।',
    santaliRoman: 'Erok bera re alom ghumawa, ir-sunat bera re sukh pay.',
    hindiMeaning: 'बोआई के समय आलस मत करो, तभी फसल कटाई के समय घर में सुख और शांति आएगी।',
    englishMeaning: 'Never be indolent in sowing season, and your harvest shall be joyful and rich.',
    authorOrSource: 'एरोक\' सिम उपदेश'
  },
  {
    id: 'sq_44',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'मांडी दाक् आर जिल पीठा, मेहनत रेन होड़ कोवाग् अमृत।',
    santaliRoman: 'Mandi dak ar jil pitha, mehnat ren hor kowag amrit.',
    hindiMeaning: 'मांडी दाक (मांड) और जिल पीठा मेहनती किसान के लिए अमृत तुल्य शक्तिदायक भोजन है।',
    englishMeaning: 'Mandi broth and steaming rice pitha are nectar to the hardworking farmer.',
    authorOrSource: 'संताली खानपान'
  },
  {
    id: 'sq_45',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'बिना मेहनत ते ओकोय हों लाहा ते बाय चालाव दारेयावा।',
    santaliRoman: 'Bina mehnat te okoy hon laha te bay chalaw dareyawa.',
    hindiMeaning: 'परिश्रम के बिना आज तक कोई भी व्यक्ति आगे नहीं बढ़ सका है।',
    englishMeaning: 'Without relentless dedication, no human being has ever advanced in life.',
    authorOrSource: 'संताल नीति'
  },
  {
    id: 'sq_46',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'खेत-खामार दो आबोवाग् मंदिर काना, ओना रे भक्ति ते कामी मे।',
    santaliRoman: 'Khet-khamar do abowag mondir kana, ona re bhakti te kami me.',
    hindiMeaning: 'खेत-खलिहान ही हमारा सच्चा मंदिर है, वहां निष्ठा और समर्पण से काम करो।',
    englishMeaning: 'The fertile fields are our sacred temple; labor therein with pure devotion.',
    authorOrSource: 'किसान वचन'
  },

  // ─── 5. मित्रता, प्रेम व पारिवारिक रिश्ते (Kinship, Friendship & Love) ───
  {
    id: 'sq_47',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'आतु रेनाग् सुलुक गे दिसोम रेनाग् दाड़े।',
    santaliRoman: 'Atu renag suluk ge disom renag dare.',
    hindiMeaning: 'गांव का आपसी सद्भाव, प्रेम और भाईचारा ही देश की सबसे बड़ी शक्ति है।',
    englishMeaning: 'Harmony in the village is the supreme strength of the nation.',
    authorOrSource: 'मांझी परगना नीति'
  },
  {
    id: 'sq_48',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'गाते को सांवते एनेच-सेरेञ, मोने रे सुख उफुर।',
    santaliRoman: 'Gate ko sawte enec-seren, mone re sukh ufur.',
    hindiMeaning: 'सखा-सहेलियों के संग जब कदमताल और लोकगीत गूंजते हैं, तो हृदय आनंद से भर जाता है।',
    englishMeaning: 'Dancing and singing with dear companions fills the soul with boundless joy.',
    authorOrSource: 'अखड़ा लोकगीत'
  },
  {
    id: 'sq_49',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'पेड़ा को आदर मे, दाक्-मांडी एम को मे, धरम बांचावा।',
    santaliRoman: 'Pera ko aador me, dak-mandi em ko me, dhorom banchawa.',
    hindiMeaning: 'अतिथि का आदर करो, उन्हें आदरपूर्वक जल और भोजन कराओ, यही सच्चा धर्म है।',
    englishMeaning: 'Honor visiting guests with gentle hospitality and water; this preserves dharma.',
    authorOrSource: 'संताली आतिथ्य सत्कार'
  },
  {
    id: 'sq_50',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'सांचाव गाते दो दुख रे हों सांवते ताहेना।',
    santaliRoman: 'Sanchaw gate do dukh re hon sawte tahena.',
    hindiMeaning: 'सच्चा मित्र वही है जो संकट और विपत्ति के समय भी छाया बनकर साथ खड़ा रहे।',
    englishMeaning: 'A faithful companion stands unwaveringly by your side in hours of trial.',
    authorOrSource: 'गाते सेरेञ'
  },
  {
    id: 'sq_51',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'आयो-बाबा दो धरती रेन जिउत बोंगा कानाकिन।',
    santaliRoman: 'Ayo-Baba do dharti ren jiut bonga kanakin.',
    hindiMeaning: 'माता-पिता इस धरती पर साक्षात जीवित देवता हैं, उनकी सेवा ही सबसे बड़ी पूजा है।',
    englishMeaning: 'Mother and father are the living gods on earth; serving them is the highest worship.',
    authorOrSource: 'संताली कुल परंपरा'
  },
  {
    id: 'sq_52',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'मिशी-बोयहा कोवाग् दुलार, संसार रेनाग् सानाम खोन् हेड़ेम।',
    santaliRoman: 'Mishi-boyha kowag dular, sansar renag sanam khon herem.',
    hindiMeaning: 'भाई-बहन का पवित्र निश्छल स्नेह इस संसार में सबसे मीठा और अनमोल बंधन है।',
    englishMeaning: 'The pure affectionate bond between siblings is the sweetest treasure in this world.',
    authorOrSource: 'करम पर्व दर्शन'
  },
  {
    id: 'sq_53',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'दुलार बांग लेनखान, संसार दो मसान लेका खाली।',
    santaliRoman: 'Dular bang lenkhan, sansar do masan leka khali.',
    hindiMeaning: 'यदि जीवन में प्रेम और संवेदना न हो, तो यह विशाल संसार वीराने की भांति खाली है।',
    englishMeaning: 'Without love and genuine compassion, the universe is desolate as a wilderness.',
    authorOrSource: 'संताली लोक दर्शन'
  },
  {
    id: 'sq_54',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'बापला दो बारिया मोने आर बारिया पारिस रेनाग् मिलन।',
    santaliRoman: 'Bapla do baria mone ar baria paris renag milan.',
    hindiMeaning: 'विवाह केवल दो शरीरों का नहीं, बल्कि दो परिवारों और दो गोत्रों का पवित्र संगम है।',
    englishMeaning: 'Marriage is the holy communion of two souls and two ancient clans.',
    authorOrSource: 'बापला संस्कार नीति'
  },
  {
    id: 'sq_55',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'कुलही रे जेमोन हांसली, तेमोन आतु रे सुलुक।',
    santaliRoman: 'Kulhi re jemon hasli, temon atu re suluk.',
    hindiMeaning: 'जैसे गले में चांदी की हांसली सुशोभित होती है, वैसे ही गांव की गलियों में प्रेम और शांति।',
    englishMeaning: 'As silver Hasli adorns the neck, so mutual love beautifies the village street.',
    authorOrSource: 'आतु मुहावरा'
  },
  {
    id: 'sq_56',
    category: 'friendship',
    categoryLabel: 'मित्रता, प्रेम व रिश्ते',
    santaliDevanagari: 'गुनुम कुड़ी दो घर रेनाग् दीप कानाय।',
    santaliRoman: 'Gunum kuri do ghar renag dip kanay.',
    hindiMeaning: 'गुणवान और संस्कारी बेटी ही घर-आंगन का सबसे पावन प्रकाश और दीपक है।',
    englishMeaning: 'A daughter of virtue and character is the sacred lamp radiating light upon the home.',
    authorOrSource: 'संताली लोक विचार'
  },

  // ─── 6. पर्व, उत्सव व मंगलकामनाएं (Festivals & Greetings) ───
  {
    id: 'sq_57',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'जोहार! नापाय गे मेनापेया? सुख-शांति रे ताहेन पे।',
    santaliRoman: 'Johar! Napay ge menapeya? Sukh-shanti re tahen pe.',
    hindiMeaning: 'नमस्ते! आप सब सकुशल हैं? आप सभी के जीवन में सदैव सुख-शांति बनी रहे।',
    englishMeaning: 'Warm greetings! Are you well? May lasting peace and joy abide with you.',
    authorOrSource: 'दैनिक जोहार अभिवादन'
  },
  {
    id: 'sq_58',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'सोहराय परोब रे जोहार! हासा-रासा ओड़ाग् रे सुख ताहेन मा।',
    santaliRoman: 'Sohrai parab re Johar! Hasa-rasa orag re sukh tahen ma.',
    hindiMeaning: 'सोहराय महापर्व की हार्दिक बधाई! आपके घर-आंगन में समृद्धि, पशुधन और खुशियां बरसें।',
    englishMeaning: 'Happy Sohrai Festival! May harvest abundance and joyous livestock bless your home.',
    authorOrSource: 'सोहराय मंगलकामना'
  },
  {
    id: 'sq_59',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'बाहा परोब रेनाग् सानाम को सगुन बाहा जोहार! सरजोम बाहा महकौक् मा।',
    santaliRoman: 'Baha parab renag sanam ko Sagun Baha Johar! Sarjom baha mahkauk ma.',
    hindiMeaning: 'बाहा पर्व की पावन बधाई! साल के फूलों की सुगंध से आपका जीवन सदैव महकता रहे।',
    englishMeaning: 'Blessed Baha greetings! May the fragrant bloom of the Sal flower scent your days.',
    authorOrSource: 'बाहा जोहार'
  },
  {
    id: 'sq_60',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'करम बोंगा आशिष एमोक् मा, भायवा कोवाग् आयुक् बाढ़ाव मा।',
    santaliRoman: 'Karam Bonga ashish emok ma, bhaywa kowag ayuk barhaw ma.',
    hindiMeaning: 'करम देवता का आशीर्वाद आप पर बरसे, और सभी भाई-बहनों की आयु और सुख में वृद्धि हो।',
    englishMeaning: 'May Karam Bonga bestow grace, granting long life and prosperity to all siblings.',
    authorOrSource: 'करम परोब सेरेञ'
  },
  {
    id: 'sq_61',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'साकरात परोब रेनाग् रासा, जिल पीठा सांवते नविन उसाड़ा।',
    santaliRoman: 'Sakrat parab renag rasa, jil pitha sawte nawin usara.',
    hindiMeaning: 'साकरात पर्व की मिठास और स्वादिष्ट जिल पीठा आपके जीवन में नया उत्साह भरे।',
    englishMeaning: 'May the delights of Sakrat and traditional rice pitha fill life with joy.',
    authorOrSource: 'साकरात बधाई'
  },
  {
    id: 'sq_62',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'नवा सेरमा रेनाग् सगुन जोहार! सानाम कोवाग् आसा पूराव मा।',
    santaliRoman: 'Nawa Serma renag Sagun Johar! Sanam kowag aasa puraw ma.',
    hindiMeaning: 'नव वर्ष की पावन मंगलकामनाएं! इस वर्ष आप सभी की हर शुभ मनोकामना पूर्ण हो।',
    englishMeaning: 'Auspicious New Year greetings! May all noble aspirations be joyously fulfilled.',
    authorOrSource: 'नव वर्ष जोहार'
  },
  {
    id: 'sq_63',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'जांथार परोब रे नवा धान, नवा अन्न, नवा आनंद।',
    santaliRoman: 'Janthar parab re nawa dhan, nawa anno, nawa anand.',
    hindiMeaning: 'जांथार पर्व में नई फसल का स्वागत करें, नया अन्न सबके जीवन में नया आनंद लाए।',
    englishMeaning: 'In Janthar harvest rite, welcome the new grain that ushers in fresh bliss.',
    authorOrSource: 'जांथार नवान्न'
  },
  {
    id: 'sq_64',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'माघे परोब रे गांव रे नवा संकल्प, नवा एकता।',
    santaliRoman: 'Maghe parab re gaw re nawa sankalp, nawa ekta.',
    hindiMeaning: 'माघे पर्व पर गांव में नए प्रशासनिक दायित्व और अटूट सामाजिक एकता का संकल्प लें।',
    englishMeaning: 'On Maghe festival, renew your sacred vow of village harmony and united leadership.',
    authorOrSource: 'माघे संदेश'
  },
  {
    id: 'sq_65',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'दासाय रे भुवांग रु-साड़े, चेला कोवाग् गुरुकुल परंपरा।',
    santaliRoman: 'Dasae re bhuwang ru-sare, chela kowag gurukul parampara.',
    hindiMeaning: 'दासाय पर्व में भुवांग वाद्य की गूंज हमारे अमर गुरु-शिष्य संस्कार का गौरव गान करती है।',
    englishMeaning: 'In Dasae, the resonant Bhuwang sound echoes the ancient guru-disciple tradition.',
    authorOrSource: 'दासाय सेरेञ'
  },
  {
    id: 'sq_66',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'तुमाक-तामाक साड़े ते, अखड़ा रे कदमताल मिलाव पे।',
    santaliRoman: 'Tumdak-Tamak sare te, akhra re kadamtal milaw pe.',
    hindiMeaning: 'मांदर और नगाड़े की गूंज पर अखड़ा में कदमताल मिलाएं और उत्सव का आनंद लें।',
    englishMeaning: 'To the rhythmic beats of Tumdak and Tamak, dance together in the village arena.',
    authorOrSource: 'अखड़ा सेरेञ'
  },

  // ─── 7. लोकोक्तियां, पहेलियां व मेनकाथा (Metaphors & Proverbs) ───
  {
    id: 'sq_67',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'दाग् रेनाग् गहिरा दो बुझौक्-आ, जब दुबौक्-आ।',
    santaliRoman: 'Dag renag gahira do bujhauk-a, job dubauk-a.',
    hindiMeaning: 'जल की गहराई का अनुभव तभी होता है जब कोई उसमें स्वयं उतरता है।',
    englishMeaning: 'The true depth of the water is only understood when one steps within it.',
    authorOrSource: 'संताली मेनकाथा'
  },
  {
    id: 'sq_68',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'धीरी रे घास बाय ओमोनोक्-आ, कपटी होड़ रे धरम बाय ताहेना।',
    santaliRoman: 'Dhiri re ghas bay omonok-a, kapti hor re dhorom bay tahena.',
    hindiMeaning: 'कठोर पत्थर पर दूब नहीं उगती, और कपटी व्यक्ति के हृदय में कभी धर्म नहीं ठहरता।',
    englishMeaning: 'Grass does not sprout upon stone; virtue cannot dwell in a deceitful heart.',
    authorOrSource: 'संताली भेंता काथा'
  },
  {
    id: 'sq_69',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'उनी दो सेता लेका हुपुक, तायोम ते कुल लेका गोजोक्।',
    santaliRoman: 'Uni do seta leka hupuk, tayom te kul leka gojok.',
    hindiMeaning: 'मुख पर विनम्रता दिखाना और पीठ पीछे आस्तीन का सांप बनना सबसे बड़ा दुर्गुण है।',
    englishMeaning: 'Flattery before the eyes and treachery behind the back is the worst vice.',
    authorOrSource: 'संताली नीति वचन'
  },
  {
    id: 'sq_70',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'सारजोम दारे रेनाग् छाय, सानाम को तेगे सुख पाय।',
    santaliRoman: 'Sarjom dare renag chhay, sanam ko tege sukh pay.',
    hindiMeaning: 'साल वृक्ष की शीतल छाया जिस प्रकार सबको समान रूप से सुख देती है, सज्जन वैसे ही होते हैं।',
    englishMeaning: 'Just as the Sal shade shelters all without bias, so noble hearts shelter everyone.',
    authorOrSource: 'संताली लोक सूक्ति'
  },
  {
    id: 'sq_71',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'चेड़े बांचाय लेनखान, बीर दो सोदोरा।',
    santaliRoman: 'Cere banchay lenkhan, bir do sodora.',
    hindiMeaning: 'जब तक वनों में पक्षी सुरक्षित हैं, तभी तक वन की जीवन-लीला और संतुलन बना रहता है।',
    englishMeaning: 'As long as wild birds thrive, the forest retains its divine ecological balance.',
    authorOrSource: 'पक्षी संरक्षण कहावत'
  },
  {
    id: 'sq_72',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'काठ रेनाग् पाल्हा, दाग् रे बाय डूबावा।',
    santaliRoman: 'Kath renag palha, dag re bay dubawa.',
    hindiMeaning: 'लकड़ी का तिनका जल में कभी नहीं डूबता; सत्यनिष्ठ व्यक्ति कभी विपत्तियों में पराजित नहीं होता।',
    englishMeaning: 'A plank of timber never sinks in water; an honest soul is never undone by adversity.',
    authorOrSource: 'संताली कुदुम दर्शन'
  },
  {
    id: 'sq_73',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'आलोम गातेया तावाक् सांवते, गाते मे सांवते ज्ञानी सांवते।',
    santaliRoman: 'Alom gateya tawak sawte, gate me sawte gyani sawte.',
    hindiMeaning: 'मूर्ख और कलहकारी की संगति से बचो, सदैव ज्ञानी और चरित्रवान मित्रों का संग करो।',
    englishMeaning: 'Avoid the company of the quarrelsome; seek the kinship of the wise and truthful.',
    authorOrSource: 'संताली हितोपदेश'
  },
  {
    id: 'sq_74',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'जेलेका रोहाय मे, तेलेका इर मे।',
    santaliRoman: 'Jeleka rohay me, teleka ir me.',
    hindiMeaning: 'जैसा बीज बोओगे, वैसा ही फल काटोगे— कर्म का नियम अटल और अकाट्य है।',
    englishMeaning: 'As you sow in the soil, so shall you reap; the law of karma is unwavering.',
    authorOrSource: 'कर्म नियम'
  },
  {
    id: 'sq_75',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'लूतुर मेनाक्-आ तो आजोम मे, मोने मेनाक्-आ तो गुणि मे।',
    santaliRoman: 'Lutur menak-a to aijom me, mone menak-a to guni me.',
    hindiMeaning: 'कान हैं तो ज्ञान की बात सुनो, और मन है तो उस पर गहरा विचार और मनन करो।',
    englishMeaning: 'If you have ears, listen to wisdom; if you have a mind, contemplate deeply.',
    authorOrSource: 'संताली नीति'
  },
  {
    id: 'sq_76',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'मित्-मित् दाग् ते पुखरी पेरौक्-आ।',
    santaliRoman: 'Mit-mit dag te pukhri perauk-a.',
    hindiMeaning: 'बूंद-बूंद पानी से ही विशाल सरोवर भरता है; छोटे-छोटे अच्छे प्रयास महान परिणाम देते हैं।',
    englishMeaning: 'Drop by single drop the deep lake is filled; humble daily efforts achieve greatness.',
    authorOrSource: 'संताली लोकोक्ति'
  },
  {
    id: 'sq_77',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'आलोम रागेया बीर बुरू रे, गाते मेनाक्-आ जाहेर थान रे।',
    santaliRoman: 'Alom rageya bir buru re, gate menak-a Jaher Than re.',
    hindiMeaning: 'अकेलेपन में भयभीत मत हो, पवित्र जाहेर थान में ईश्वर और पुरखे सदैव तुम्हारे संग हैं।',
    englishMeaning: 'Do not despair in the wilderness; divine ancestors watch over you in sacred solace.',
    authorOrSource: 'संताली संबल गीत'
  },

  // ─── 8. शिक्षा, ज्ञान व सामाजिक जागृति (Education & Social Awakening) ───
  {
    id: 'sq_78',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'ओल-पाढ़ाव गे आबोवाग् डाहार रेनाग् दीया काना।',
    santaliRoman: 'Ol-parhaw ge abowag dahar renag diya kana.',
    hindiMeaning: 'शिक्षा और विद्या अर्जन ही हमारे जीवन-मार्ग का सबसे तेजस्वी प्रकाश स्तंभ है।',
    englishMeaning: 'Education and learning are the luminous lantern guiding our life path.',
    authorOrSource: 'पंडित रघुनाथ मुर्मू'
  },
  {
    id: 'sq_79',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'गीदरा को स्कूल कुल को मे, दिशोम दो लाहावा।',
    santaliRoman: 'Gidra ko school kul ko me, disom do lahawa.',
    hindiMeaning: 'बेटे-बेटियों को विद्यालय अवश्य भेजो, तभी हमारा संताल समाज और देश आगे बढ़ेगा।',
    englishMeaning: 'Send every son and daughter to school; only then will our nation truly advance.',
    authorOrSource: 'शिक्षा चेतना संदेश'
  },
  {
    id: 'sq_80',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'ज्ञान दो ओकोय हों बाय कुम्बू दारेयावा।',
    santaliRoman: 'Gyan do okoy hon bay kumbu dareyawa.',
    hindiMeaning: 'ज्ञान ऐसा अनमोल धन है जिसे न कोई चुरा सकता है और न कोई छीन सकता है।',
    englishMeaning: 'Knowledge is that supreme treasure which no thief can ever steal or seize.',
    authorOrSource: 'संताली ज्ञान सूत्र'
  },
  {
    id: 'sq_81',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'कुड़ी गीदरा पाढ़ाव लेनखान, बारिया कुल उजालाक्-आ।',
    santaliRoman: 'Kuri gidra parhaw lenkhan, baria kul ujalak-a.',
    hindiMeaning: 'जब एक बेटी शिक्षित होती है, तो वह मायके और ससुराल दोनों कुलों को रोशन करती है।',
    englishMeaning: 'When an educated daughter shines, she illuminates both maternal and marital families.',
    authorOrSource: 'महिला शिक्षा विचार'
  },
  {
    id: 'sq_82',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'किताब सांवते गाते मे, जिंदगी दो नापाय चालावा।',
    santaliRoman: 'Kitab sawte gate me, jindagi do napay chalawa.',
    hindiMeaning: 'अच्छी पुस्तकों को अपना सच्चा मित्र बनाओ, तुम्हारा जीवन सुखद और सफल बनेगा।',
    englishMeaning: 'Make noble books your faithful companions, and your life will flourish with wisdom.',
    authorOrSource: 'संताली प्रेरक वचन'
  },
  {
    id: 'sq_83',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'आबोवाग् इतिहास बाड़ाय मे, नवा इतिहास बेनाव मे।',
    santaliRoman: 'Abowag itihas baray me, nawa itihas benaw me.',
    hindiMeaning: 'अपने गौरवशाली इतिहास को जानो, और अपनी मेहनत व विद्या से नया इतिहास रचो।',
    englishMeaning: 'Know your glorious ancestry, and forge a heroic new history through knowledge.',
    authorOrSource: 'संताली युवा आह्वान'
  },
  {
    id: 'sq_84',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'नशा आर अंधविश्वास खोन् साहा मे, विद्या अपनाव मे।',
    santaliRoman: 'Nasha ar andhavishwas khon saha me, vidya apnaw me.',
    hindiMeaning: 'नशा और अंधविश्वास से दूर रहो, विद्या और वैज्ञानिक चेतना को गले लगाओ।',
    englishMeaning: 'Shun intoxicants and superstition; embrace enlightened learning and science.',
    authorOrSource: 'समाज सुधार संदेश'
  },
  {
    id: 'sq_85',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'रोड़-सांवहेद दो समाज रेनाग् आरिस काना।',
    santaliRoman: 'Ror-sawhed do samaj renag aris kana.',
    hindiMeaning: 'मातृभाषा और लोक-साहित्य समाज का सच्चा दर्पण हैं, उनका अध्ययन करो।',
    englishMeaning: 'Mother tongue and literature are the true mirror reflecting the soul of society.',
    authorOrSource: 'साहित्य अकादमी संताली'
  },
  {
    id: 'sq_86',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'चेद् मे, कामी मे, समाज लाहा मे।',
    santaliRoman: 'Ched me, kami me, samaj laha me.',
    hindiMeaning: 'सीखो, परिश्रम करो, और समाज को प्रगति के पथ पर आगे ले जाओ।',
    englishMeaning: 'Learn diligently, work resolutely, and lead society forward on the path of progress.',
    authorOrSource: 'संताली प्रगति मंत्र'
  },
  {
    id: 'sq_87',
    category: 'education',
    categoryLabel: 'शिक्षा व सामाजिक जागृति',
    santaliDevanagari: 'पंडित रघुनाथ मुर्मू आबोवाग् कुल-दीपक कानाकिन।',
    santaliRoman: 'Pandit Raghunath Murmu abowag kul-deepak kanakin.',
    hindiMeaning: 'गुरु गोमके पंडित रघुनाथ मुर्मू संताल समाज के अमर पथ-प्रदर्शक और कुल-दीपक हैं।',
    englishMeaning: 'Guru Gomke Pandit Raghunath Murmu is the immortal beacon guiding our nation.',
    authorOrSource: 'गुरु गोमके स्मृति'
  },

  // ─── 9. कला, संगीत व संस्कृति (Art, Music & Heritage) ───
  {
    id: 'sq_88',
    category: 'pride',
    categoryLabel: 'कला व संगीत संस्कृति',
    santaliDevanagari: 'रोड़ गे सेरेञ, ताड़ाम गे एनेच।',
    santaliRoman: 'Ror ge seren, taram ge enec.',
    hindiMeaning: 'संताल की हर बोली ही लोकगीत है, और उसका हर कदम ही नृत्य है।',
    englishMeaning: 'Every spoken word of a Santal is a melody; every stride is a sacred dance.',
    authorOrSource: 'संताली सांस्कृतिक लोकोक्ति'
  },
  {
    id: 'sq_89',
    category: 'pride',
    categoryLabel: 'कला व संगीत संस्कृति',
    santaliDevanagari: 'सोहराय खोवर चित्र दो आबोवाग् भित्ति-कला रेनाग् आत्मा काना।',
    santaliRoman: 'Sohrai Khovar chitra do abowag bhitti-kala renag aatma kana.',
    hindiMeaning: 'मिट्टी की दीवारों पर उकेरे सोहराय और खोवर चित्र हमारी प्राचीन भित्ति कला की आत्मा हैं।',
    englishMeaning: 'Sohrai and Khovar wall murals are the living heartbeat of our indigenous art.',
    authorOrSource: 'सोहराय भित्तिचित्र दर्शन'
  },
  {
    id: 'sq_90',
    category: 'pride',
    categoryLabel: 'कला व संगीत संस्कृति',
    santaliDevanagari: 'बनम रेनाग् राड़ ते मोने दो मोहेकावा।',
    santaliRoman: 'Banam renag rar te mone do mohekawa.',
    hindiMeaning: 'एक-तंत्रीय बनम वाद्य की करुणामयी और मधुर धुन आत्मा को सम्मोहित कर लेती है।',
    englishMeaning: 'The soulful resonance of the single-stringed Banam enchants the spirit with bliss.',
    authorOrSource: 'बनम लोक संगीत'
  },
  {
    id: 'sq_91',
    category: 'pride',
    categoryLabel: 'कला व संगीत संस्कृति',
    santaliDevanagari: 'तिरियो साड़े ते महुआ झोरोक्-आ, बंशी साड़े ते अखड़ा महकौक्-आ।',
    santaliRoman: 'Tiriyo sare te matkom jhorok-a, banshi sare te akhra mahkauk-a.',
    hindiMeaning: 'तिरियो (बांसुरी) की मीठी तान पर महुआ टपकने लगता है और अखड़ा महक उठता है।',
    englishMeaning: 'To the sweet breath of the Tiriyo flute, Mahua drops fall and the arena comes alive.',
    authorOrSource: 'तिरियो सेरेञ'
  },
  {
    id: 'sq_92',
    category: 'pride',
    categoryLabel: 'कला व संगीत संस्कृति',
    santaliDevanagari: 'पांची-पारहांड ते साजाव कुड़ी, साकाम-हांसली ते चमकौक्-आ।',
    santaliRoman: 'Panchi-Parhand te sajaw kuri, sakam-hasli te chamkauk-a.',
    hindiMeaning: 'पारंपरिक पांची-पारहांड वस्त्रों और हांसली-साकम आभूषणों में संताली बेटियां अप्रतिम दिखती हैं।',
    englishMeaning: 'Draped in Panchi-Parhand and silver ornaments, Santali maidens radiate divine grace.',
    authorOrSource: 'पारंपरिक शृंगार'
  },

  // ─── 10. एकता व सामूहिक सद्भाव (Unity & Solidarity) ───
  {
    id: 'sq_93',
    category: 'friendship',
    categoryLabel: 'एकता व सामूहिकता',
    santaliDevanagari: 'मित्-मोने ते ताहेन पे, दुश्मन दो कतारावा।',
    santaliRoman: 'Mit-mone te tahen pe, dushman do katarawa.',
    hindiMeaning: 'एक मन होकर संगठित रहो, तुम्हारी एकता देखकर शत्रु कभी टिक नहीं सकेगा।',
    englishMeaning: 'Stand unified as one mind; before your unshakable solidarity, every obstacle falls.',
    authorOrSource: 'संताली एकता मंत्र'
  },
  {
    id: 'sq_94',
    category: 'friendship',
    categoryLabel: 'एकता व सामूहिकता',
    santaliDevanagari: 'सावे-सावे ते दारे साबोक् पे, तूफान हों बाय रपूद दारेयावा।',
    santaliRoman: 'Sawe-sawe te dare sabok pe, tufan hon bay rapud dareyawa.',
    hindiMeaning: 'जब सभी मिलकर किसी पेड़ को थाम लेते हैं, तो बड़ा तूफान भी उसे गिरा नहीं सकता।',
    englishMeaning: 'When hands unite to clasp the tree, even the fiercest gale cannot uproot it.',
    authorOrSource: 'सामूहिकता दर्शन'
  },
  {
    id: 'sq_95',
    category: 'friendship',
    categoryLabel: 'एकता व सामूहिकता',
    santaliDevanagari: 'कुलही बैसी दो आबोवाग् लोकतंत्र काना, ओना रे सानाम कोवाग् सुर।',
    santaliRoman: 'Kulhi Baisi do abowag loktantra kana, ona re sanam kowag sur.',
    hindiMeaning: 'कुलही बैसी (ग्राम संसद) हमारा प्राचीन लोकतंत्र है, जिसमें हर ग्रामीण की आवाज सुनी जाती है।',
    englishMeaning: 'Kulhi Baisi is our ancestral democracy, where the voice of every villager is honored.',
    authorOrSource: 'मांझी परगना प्रणाली'
  },
  {
    id: 'sq_96',
    category: 'philosophy',
    categoryLabel: 'संतोष व सादगी',
    santaliDevanagari: 'सादा जीवन, सांचाव विचार, संताल रीती रेनाग् सार।',
    santaliRoman: 'Sada jiwan, sanchaw vichar, Santal riti renag saar.',
    hindiMeaning: 'सादगीपूर्ण जीवन और उच्च विचार ही संताली संस्कृति का सच्चा सार हैं।',
    englishMeaning: 'Simple harmonious living and noble truth are the living essence of Santal philosophy.',
    authorOrSource: 'जीवन सूत्र'
  },
  {
    id: 'sq_97',
    category: 'philosophy',
    categoryLabel: 'संतोष व सादगी',
    santaliDevanagari: 'अहंकार दो धीरी लेका भारिया, नम्रता दो फूल लेका हलका।',
    santaliRoman: 'Ahankar do dhiri leka bhariya, namrata do phul leka halka.',
    hindiMeaning: 'अहंकार पत्थर की तरह भारी बोझ है, जबकि विनम्रता फूल की तरह हल्की और मनमोहक होती है।',
    englishMeaning: 'Arrogance is a burden heavy as stone; humility is light and radiant as a blossom.',
    authorOrSource: 'संताली नीति'
  },
  {
    id: 'sq_98',
    category: 'nature',
    categoryLabel: 'प्रकृति व ऋतु',
    santaliDevanagari: 'झार-झार जारि दाग्, खेतों रे हरियर चादोर।',
    santaliRoman: 'Jhar-jhar jari dag, kheton re hariyar chador.',
    hindiMeaning: 'रिमझिम मानसूनी फुहारों से खेतों ने हरियाली की मनमोहक चादर ओढ़ ली है।',
    englishMeaning: 'Under gentle monsoon showers, the greening fields drape themselves in living emerald.',
    authorOrSource: 'सावन सेरेञ'
  },
  {
    id: 'sq_99',
    category: 'nature',
    categoryLabel: 'प्रकृति व ऋतु',
    santaliDevanagari: 'सितांग-जापानी-दासांय, ६ ऋतुएं आबोवाग् साथी।',
    santaliRoman: 'Sitang-Japani-Dasay, 6 rituein abowag sathi.',
    hindiMeaning: 'ग्रीष्म, वर्षा, शरद आदि छहों ऋतुएं संताली जीवन और लोकपर्वों की सच्ची सहचरी हैं।',
    englishMeaning: 'The six indigenous seasons are the faithful companions of our festivals and seasons.',
    authorOrSource: 'ऋतु दर्शन'
  },
  {
    id: 'sq_100',
    category: 'pride',
    categoryLabel: 'शाश्वत उद्घोष',
    santaliDevanagari: 'जाहेर थान दो आबोवाग् प्राण, मारांग बुरु आबोवाग् त्राण! जोहार!',
    santaliRoman: 'Jaher Than do abowag pran, Marang Buru abowag tran! Johar!',
    hindiMeaning: 'पवित्र जाहेर थान हमारे प्राण हैं, और मरांग बुरु हमारे संकटमोचक रक्षक हैं! सबको सादर जोहार!',
    englishMeaning: 'Jaher Than is our breath of life, and Marang Buru is our eternal protector! Johar!',
    authorOrSource: 'संताल आदिम महाप्रार्थना'
  },
  {
    id: 'sq_101',
    category: 'education',
    categoryLabel: 'शिक्षा व ज्ञान',
    santaliDevanagari: 'मेत् खोन् हों लाहा विद्या मेत्, ओना ते संसार ञेलोक्-आ।',
    santaliRoman: 'Met khon hon laha vidya met, ona te sansar nelok-a.',
    hindiMeaning: 'शारीरिक आंखों से भी बढ़कर है विद्या की आंख, जिससे संपूर्ण संसार का सत्य दिखाई देता है।',
    englishMeaning: 'Far greater than physical eyes is the eye of wisdom through which truth is revealed.',
    authorOrSource: 'संताली ज्ञानोपदेश'
  },
  {
    id: 'sq_102',
    category: 'greetings',
    categoryLabel: 'पर्व व मंगलकामनाएं',
    santaliDevanagari: 'सानाम संताल बोयहा कोटे सगुन जोहार! हासा-भासा अमर ताहेन मा!',
    santaliRoman: 'Sanam Santal boyha kote Sagun Johar! Hasa-bhasa amar tahen ma!',
    hindiMeaning: 'सभी संताल भाइयों और बहनों को सगुन जोहार! हमारी पावन माटी और भाषा सदैव अमर रहे!',
    englishMeaning: 'Auspicious Johar to all Santal kin! May our sacred soil and mother tongue live forever!',
    authorOrSource: 'विश्व संताली एकता'
  },
  {
    id: 'sq_103',
    category: 'labor',
    categoryLabel: 'श्रम व स्वावलंबन',
    santaliDevanagari: 'कामी मे सांचाव ते, जोम मे सुख ते, ताहेन मे शांति ते।',
    santaliRoman: 'Kami me sanchaw te, jom me sukh te, tahen me shanti te.',
    hindiMeaning: 'ईमानदारी से श्रम करो, संतोष से भोजन करो, और आनंद व शांति से जीवन जियो।',
    englishMeaning: 'Labor with integrity, eat with contentment, and live in serene peace.',
    authorOrSource: 'संताली जीवन मंत्र'
  },
  {
    id: 'sq_104',
    category: 'proverbs',
    categoryLabel: 'लोकोक्तियां व मेनकाथा',
    santaliDevanagari: 'अखड़ा रे एनेच, खेत रे जोत, कुलही रे बैसी— नोवा गे संताल समाज।',
    santaliRoman: 'Akhra re enec, khet re jot, kulhi re baisi— nowa ge Santal samaj.',
    hindiMeaning: 'अखड़ा में सामूहिक नृत्य, खेतों में हल की जुताई, और चौपाल में सर्वसम्मति निर्णय— यही है संताल समाज।',
    englishMeaning: 'Dance in the arena, plough in the field, consensus in the council— this is the Santal soul.',
    authorOrSource: 'संताली समाज सूत्र'
  },
  {
    id: 'sq_105',
    category: 'pride',
    categoryLabel: 'शाश्वत उद्घोष',
    santaliDevanagari: 'आबोवाग् देश, आबोवाग् संस्कृति, आबोवाग् गौरव— युग-युग जियो! जोहार!',
    santaliRoman: 'Abowag Desh, Abowag Sanskriti, Abowag Gourav— Yug-yug jiyo! Johar!',
    hindiMeaning: 'हमारा देश, हमारी संस्कृति और हमारा गौरव युग-युगांतर तक अमर रहे! जोहार!',
    englishMeaning: 'May our homeland, our culture, and our pride shine bright through the eons! Johar!',
    authorOrSource: 'संताली राष्ट्रगान भावना'
  }
];
