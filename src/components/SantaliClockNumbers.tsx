import React, { useState, useEffect } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { useAdmin } from '../context/AdminContext';
import { safeLoadFromStorage, safeSaveToStorage } from '../utils/storage';
import {
  Clock,
  Volume2,
  Search,
  Edit2,
  Trash2,
  Plus,
  Save,
  RotateCcw,
  X,
  Sparkles,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  ShieldCheck,
  Check
} from 'lucide-react';

// Devanagari Digits used in Santali Devanagari Numeracy
const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toDevanagariDigits(num: number | string): string {
  return String(num)
    .split('')
    .map((d) => {
      const n = parseInt(d, 10);
      return !isNaN(n) ? DEVANAGARI_DIGITS[n] : d;
    })
    .join('');
}

export interface NumberEntry {
  num: number;
  devanagariDigit: string;
  santaliDevanagari: string;
  santaliRoman: string;
  hindiWord: string;
}

export interface TimeTermEntry {
  id: string;
  category: 'unit' | 'fraction' | 'pahar' | 'sample';
  categoryLabel: string;
  hindiTerm: string;
  santaliDevanagari: string;
  santaliRoman: string;
  explanation: string;
  sampleTime?: string;
  spokenPhrase: string;
}

export const DEFAULT_TIME_TERMS: TimeTermEntry[] = [
  // 1. Basic Units
  {
    id: 'time_hour',
    category: 'unit',
    categoryLabel: 'इकाई (Unit)',
    hindiTerm: 'घंटा (Hour)',
    santaliDevanagari: 'ताड़ांग / बेड़ा / घांटा',
    santaliRoman: 'Tarang / Beda / Ghanta',
    explanation: 'समय की सबसे बड़ी दैनिक माप इकाई। संताली में 1 घंटे को "मित् ताड़ांग" कहा जाता है।',
    spokenPhrase: 'घंटा को संताली में ताड़ांग या बेड़ा कहते हैं। जैसे मित् ताड़ांग।'
  },
  {
    id: 'time_minute',
    category: 'unit',
    categoryLabel: 'इकाई (Unit)',
    hindiTerm: 'मिनट (Minute)',
    santaliDevanagari: 'टिपिच / मिनिट / पाला',
    santaliRoman: 'Tipic / Minut / Pala',
    explanation: 'घंटे के 60वें भाग को टिपिच या मिनिट कहते हैं।',
    spokenPhrase: 'मिनट को संताली में टिपिच कहते हैं।'
  },
  {
    id: 'time_second',
    category: 'unit',
    categoryLabel: 'इकाई (Unit)',
    hindiTerm: 'सेकंड (Second)',
    santaliDevanagari: 'छिन / तिल्हाड़ / सेकेन',
    santaliRoman: 'Chhin / Tilhard / Seken',
    explanation: 'पलक झपकने की अल्पतम अवधि (छिन/तिल्हाड़)।',
    spokenPhrase: 'सेकंड को संताली में छिन या तिल्हाड़ कहते हैं।'
  },
  // 2. Fractions (अंश व मिनट भाग)
  {
    id: 'time_5_min',
    category: 'fraction',
    categoryLabel: 'समय अंश (Fraction)',
    hindiTerm: '5 मिनट (5 Minutes)',
    santaliDevanagari: 'मोंड़े टिपिच (Mone Tipic)',
    santaliRoman: 'Mone Tipic',
    explanation: '५ मिनट। जैसे 2 बजकर 5 मिनट = बार ताड़ांग मोंड़े टिपिच।',
    sampleTime: '2:05',
    spokenPhrase: 'मोंड़े टिपिच। बार ताड़ांग मोंड़े टिपिच।'
  },
  {
    id: 'time_10_min',
    category: 'fraction',
    categoryLabel: 'समय अंश (Fraction)',
    hindiTerm: '10 मिनट (10 Minutes)',
    santaliDevanagari: 'गेल टिपिच (Gel Tipic)',
    santaliRoman: 'Gel Tipic',
    explanation: '१० मिनट। जैसे 3 बजकर 10 मिनट = पे ताड़ांग गेल टिपिच।',
    sampleTime: '3:10',
    spokenPhrase: 'गेल टिपिच। पे ताड़ांग गेल टिपिच।'
  },
  {
    id: 'time_15_min',
    category: 'fraction',
    categoryLabel: 'समय अंश (Fraction)',
    hindiTerm: '15 मिनट / पाव घंटा (Quarter Hour)',
    santaliDevanagari: 'गेल मोंड़े टिपिच / पावा (Gel Mone Tipic / Pawa)',
    santaliRoman: 'Gel Mone Tipic / Pawa',
    explanation: '१५ मिनट या पाव घंटा।',
    sampleTime: '4:15',
    spokenPhrase: 'गेल मोंड़े टिपिच, यानी पावा घांटा।'
  },
  {
    id: 'time_half_hour',
    category: 'fraction',
    categoryLabel: 'समय अंश (Fraction)',
    hindiTerm: 'आधा घंटा / 30 मिनट (Half Hour)',
    santaliDevanagari: 'ताला ताड़ांग / पे गेल टिपिच / आदा घांटा',
    santaliRoman: 'Tala Tarang / Pe Gel Tipic',
    explanation: '३० मिनट या आधा घंटा। ताला का अर्थ आधा होता है।',
    sampleTime: '5:30',
    spokenPhrase: 'ताला ताड़ांग, यानी आधा घंटा या पे गेल टिपिच।'
  },
  {
    id: 'time_sawa',
    category: 'fraction',
    categoryLabel: 'समय अंश (Fraction)',
    hindiTerm: 'सवा (Quarter Past - 15 Min Past)',
    santaliDevanagari: 'सावा / पावा डेरा (Sawa / Pawa Dera)',
    santaliRoman: 'Sawa / Pawa Dera',
    explanation: 'सवा एक (1:15) = सावा मित् ताड़ांग (मित् ताड़ांग गेल मोंड़े टिपिच)।',
    sampleTime: '1:15',
    spokenPhrase: 'सवा को सावा या पावा डेरा कहते हैं। जैसे सावा मित् ताड़ांग।'
  },
  {
    id: 'time_derh',
    category: 'fraction',
    categoryLabel: 'समय अंश (Fraction)',
    hindiTerm: 'डेढ़ (1:30 - Half Past One)',
    santaliDevanagari: 'मित् ताला ताड़ांग / डेड़ घांटा',
    santaliRoman: "Mit' Tala Tarang / Dedh Ghanta",
    explanation: '1 बजकर 30 मिनट को संताली में "मित् ताला ताड़ांग" कहते हैं।',
    sampleTime: '1:30',
    spokenPhrase: 'डेढ़ बजे को संताली में मित् ताला ताड़ांग कहते हैं।'
  },
  {
    id: 'time_dhai',
    category: 'fraction',
    categoryLabel: 'समय अंश (Fraction)',
    hindiTerm: 'ढाई (2:30 - Half Past Two)',
    santaliDevanagari: 'बार ताला ताड़ांग / आढ़ाई घांटा',
    santaliRoman: 'Bar Tala Tarang / Adhai Ghanta',
    explanation: '2 बजकर 30 मिनट को संताली में "बार ताला ताड़ांग" कहते हैं।',
    sampleTime: '2:30',
    spokenPhrase: 'ढाई बजे को संताली में बार ताला ताड़ांग कहते हैं।'
  },
  {
    id: 'time_sadhe',
    category: 'fraction',
    categoryLabel: 'समय अंश (Fraction)',
    hindiTerm: 'साढ़े (Half Past - 3:30, 4:30...)',
    santaliDevanagari: 'डेरा / ताला (जैसे साढ़े तीन = पे ताला ताड़ांग)',
    santaliRoman: 'Dera / Tala Tarang',
    explanation: 'तीन के बाद हर आधे घंटे को "ताला" जोड़कर बोला जाता है। जैसे 4:30 = पुन ताला ताड़ांग।',
    sampleTime: '3:30',
    spokenPhrase: 'साढ़े तीन को संताली में पे ताला ताड़ांग कहते हैं।'
  },
  {
    id: 'time_paune',
    category: 'fraction',
    categoryLabel: 'समय अंश (Fraction)',
    hindiTerm: 'पौने (Quarter To - 15 Min Remaining)',
    santaliDevanagari: 'पावा कोम / पौने (जैसे पौने तीन = पे ताड़ांग रे पावा कोम)',
    santaliRoman: 'Pawa Kom (15 Min to Next Hour)',
    explanation: 'अगले घंटे में 15 मिनट शेष होने पर "पावा कोम" (पाव कम) कहते हैं। जैसे 2:45 = पौने पे ताड़ांग।',
    sampleTime: '2:45',
    spokenPhrase: 'पौने को पावा कोम या पौने कहते हैं। जैसे पौने पे ताड़ांग।'
  },
  // 3. Traditional 8 Pahar of Day & Night
  {
    id: 'pahar_setah',
    category: 'pahar',
    categoryLabel: 'पारंपरिक पहर (Pahar)',
    hindiTerm: 'सुबह / प्रातः काल (Morning: 6 AM - 9 AM)',
    santaliDevanagari: 'सेताह् (Setah)',
    santaliRoman: 'Setah',
    explanation: 'सूर्य निकलने के बाद की पहली सुबह वेला जब लोग खेतों और मवेशियों को लेकर निकलते हैं।',
    spokenPhrase: 'सुबह को संताली में सेताह् कहते हैं।'
  },
  {
    id: 'pahar_baskiyam',
    category: 'pahar',
    categoryLabel: 'पारंपरिक पहर (Pahar)',
    hindiTerm: 'दोपहर पूर्व / कलेवा वेला (Late Morning: 9 AM - 12 PM)',
    santaliDevanagari: 'बास्कियाम (Baskiyam)',
    santaliRoman: 'Baskiyam',
    explanation: 'सुबह के नाश्ते (बास्के दाका) और खेत में काम के बीच की दूसरी वेला।',
    spokenPhrase: 'दोपहर पूर्व कलेवा वेला को बास्कियाम कहते हैं।'
  },
  {
    id: 'pahar_tikin',
    category: 'pahar',
    categoryLabel: 'पारंपरिक पहर (Pahar)',
    hindiTerm: 'मध्याह्न / दोपहर (Noon: 12 PM - 3 PM)',
    santaliDevanagari: 'तिकिन / माझान तिकिन (Tikin)',
    santaliRoman: 'Tikin / Majhan Tikin',
    explanation: 'सिर पर सूर्य होने का मध्याह्न समय जब किसान हल खोलकर बैलों को नहलाते हैं और भोजन करते हैं।',
    spokenPhrase: 'दोपहर को संताली में तिकिन कहते हैं।'
  },
  {
    id: 'pahar_tarasing',
    category: 'pahar',
    categoryLabel: 'पारंपरिक पहर (Pahar)',
    hindiTerm: 'अपराह्न / ढलती दोपहर (Afternoon: 3 PM - 6 PM)',
    santaliDevanagari: 'तारासिंग (Tarasing)',
    santaliRoman: 'Tarasing',
    explanation: 'सूर्य के ढलने और छांव लंबी होने का समय जब मवेशी घर की ओर लौटने लगते हैं।',
    spokenPhrase: 'ढलती दोपहर को संताली में तारासिंग कहते हैं।'
  },
  {
    id: 'pahar_ayup',
    category: 'pahar',
    categoryLabel: 'पारंपरिक पहर (Pahar)',
    hindiTerm: 'संध्या / गोधूलि वेला (Evening: 6 PM - 8 PM)',
    santaliDevanagari: 'आयुब / सिंगार (Ayup)',
    santaliRoman: 'Ayup',
    explanation: 'घर में दीया जलाने, अखड़ा में बैठने और परिवार के एकत्र होने का पावन संध्या समय।',
    spokenPhrase: 'संध्या वेला को संताली में आयुब कहते हैं।'
  },
  {
    id: 'pahar_tala_ninda',
    category: 'pahar',
    categoryLabel: 'पारंपरिक पहर (Pahar)',
    hindiTerm: 'मध्य रात्रि / आधी रात (Midnight: 11 PM - 3 AM)',
    santaliDevanagari: 'ताला निंदा (Tala Ninda)',
    santaliRoman: 'Tala Ninda',
    explanation: 'गहरी रात जब सारा संसार शांत होकर निद्रालीन होता है।',
    spokenPhrase: 'मध्य रात्रि को संताली में ताला निंदा कहते हैं।'
  },
  {
    id: 'pahar_anga',
    category: 'pahar',
    categoryLabel: 'पारंपरिक पहर (Pahar)',
    hindiTerm: 'भोर / उषाकाल (Dawn: 4 AM - 6 AM)',
    santaliDevanagari: 'आंगा / सिम राहोः (Anga / Sim Raho)',
    santaliRoman: 'Anga / Sim Raho',
    explanation: 'मुर्गे की पहली बांग (सिम राहोः) और आकाश में लालिमा फूटने का पावन ब्रह्ममुहूर्त।',
    spokenPhrase: 'भोर या उषाकाल को संताली में आंगा या सिम राहो कहते हैं।'
  }
];

export const BASE_NUMBERS: NumberEntry[] = [
  { num: 0, devanagariDigit: '०', santaliDevanagari: 'शून्य', santaliRoman: 'Sunya', hindiWord: 'शून्य' },
  { num: 1, devanagariDigit: '१', santaliDevanagari: 'मित’', santaliRoman: "Mit'", hindiWord: 'एक' },
  { num: 2, devanagariDigit: '२', santaliDevanagari: 'बार', santaliRoman: 'Bar', hindiWord: 'दो' },
  { num: 3, devanagariDigit: '३', santaliDevanagari: 'पे', santaliRoman: 'Pe', hindiWord: 'तीन' },
  { num: 4, devanagariDigit: '४', santaliDevanagari: 'पुन', santaliRoman: 'Pun', hindiWord: 'चार' },
  { num: 5, devanagariDigit: '५', santaliDevanagari: 'मोंड़े', santaliRoman: 'Mone', hindiWord: 'पांच' },
  { num: 6, devanagariDigit: '६', santaliDevanagari: 'तुरुई', santaliRoman: 'Turui', hindiWord: 'छह' },
  { num: 7, devanagariDigit: '७', santaliDevanagari: 'एया', santaliRoman: 'Eya', hindiWord: 'सात' },
  { num: 8, devanagariDigit: '८', santaliDevanagari: 'इरुल', santaliRoman: 'Irul', hindiWord: 'आठ' },
  { num: 9, devanagariDigit: '९', santaliDevanagari: 'आरे', santaliRoman: 'Arey', hindiWord: 'नौ' },
  { num: 10, devanagariDigit: '१०', santaliDevanagari: 'गेल', santaliRoman: 'Gel', hindiWord: 'दस' },
  { num: 11, devanagariDigit: '११', santaliDevanagari: 'गेल मित’', santaliRoman: "Gel Mit'", hindiWord: 'ग्यारह' },
  { num: 12, devanagariDigit: '१२', santaliDevanagari: 'गेल बार', santaliRoman: 'Gel Bar', hindiWord: 'बारह' },
  { num: 13, devanagariDigit: '१३', santaliDevanagari: 'गेल पे', santaliRoman: 'Gel Pe', hindiWord: 'तेरह' },
  { num: 14, devanagariDigit: '१४', santaliDevanagari: 'गेल पुन', santaliRoman: 'Gel Pun', hindiWord: 'चौदह' },
  { num: 15, devanagariDigit: '१५', santaliDevanagari: 'गेल मोंड़े', santaliRoman: 'Gel Mone', hindiWord: 'पंद्रह' },
  { num: 16, devanagariDigit: '१६', santaliDevanagari: 'गेल तुरुई', santaliRoman: 'Gel Turui', hindiWord: 'सोलह' },
  { num: 17, devanagariDigit: '१७', santaliDevanagari: 'गेल एया', santaliRoman: 'Gel Eya', hindiWord: 'सत्रह' },
  { num: 18, devanagariDigit: '१८', santaliDevanagari: 'गेल इरुल', santaliRoman: 'Gel Irul', hindiWord: 'अठारह' },
  { num: 19, devanagariDigit: '१९', santaliDevanagari: 'गेल आरे', santaliRoman: 'Gel Arey', hindiWord: 'उन्नीस' },
  { num: 20, devanagariDigit: '२०', santaliDevanagari: 'बार गेल (इसी)', santaliRoman: 'Bar Gel (Isi)', hindiWord: 'बीस' },
  { num: 25, devanagariDigit: '२५', santaliDevanagari: 'बार गेल मोंड़े', santaliRoman: 'Bar Gel Mone', hindiWord: 'पच्चीस' },
  { num: 30, devanagariDigit: '३०', santaliDevanagari: 'पे गेल', santaliRoman: 'Pe Gel', hindiWord: 'तीस' },
  { num: 40, devanagariDigit: '४०', santaliDevanagari: 'पुन गेल', santaliRoman: 'Pun Gel', hindiWord: 'चालीस' },
  { num: 50, devanagariDigit: '५०', santaliDevanagari: 'मोंड़े गेल', santaliRoman: 'Mone Gel', hindiWord: 'पचास' },
  { num: 60, devanagariDigit: '६०', santaliDevanagari: 'तुरुई गेल', santaliRoman: 'Turui Gel', hindiWord: 'साठ' },
  { num: 70, devanagariDigit: '७०', santaliDevanagari: 'एया गेल', santaliRoman: 'Eya Gel', hindiWord: 'सत्तर' },
  { num: 80, devanagariDigit: '८०', santaliDevanagari: 'इरुल गेल', santaliRoman: 'Irul Gel', hindiWord: 'अस्सी' },
  { num: 90, devanagariDigit: '९०', santaliDevanagari: 'आरे गेल', santaliRoman: 'Arey Gel', hindiWord: 'नब्बे' },
  { num: 100, devanagariDigit: '१००', santaliDevanagari: 'मोंड़े इसी / साय', santaliRoman: 'Mone Isi / Say', hindiWord: 'सौ' }
];

export const SantaliClockNumbers: React.FC = () => {
  const { isAdmin } = useAdmin();

  // Numbers state
  const [numbersList, setNumbersList] = useState<NumberEntry[]>(() =>
    safeLoadFromStorage('hor_katha_clock_numbers_db', BASE_NUMBERS)
  );

  // Time terms state (घंटा, मिनट, सेकंड, सवा, पौने, आधा घंटा etc.)
  const [timeTerms, setTimeTerms] = useState<TimeTermEntry[]>(() =>
    safeLoadFromStorage('hor_katha_time_terms_db', DEFAULT_TIME_TERMS)
  );

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'clock' | 'time_units' | 'numbers'>('clock');
  const [searchNum, setSearchNum] = useState('');
  const [termFilter, setTermFilter] = useState<'all' | 'unit' | 'fraction' | 'pahar'>('all');

  // Admin Modal States for Numbers
  const [isNumModalOpen, setIsNumModalOpen] = useState(false);
  const [editingNum, setEditingNum] = useState<number | null>(null);
  const [formNumber, setFormNumber] = useState<number>(1);
  const [formDevDigit, setFormDevDigit] = useState('१');
  const [formDevName, setFormDevName] = useState('');
  const [formRomanName, setFormRomanName] = useState('');
  const [formHindiWord, setFormHindiWord] = useState('');

  // Admin Modal States for Time Terms
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<TimeTermEntry | null>(null);
  const [termFormData, setTermFormData] = useState<Partial<TimeTermEntry>>({});

  useEffect(() => {
    safeSaveToStorage('hor_katha_clock_numbers_db', numbersList);
  }, [numbersList]);

  useEffect(() => {
    safeSaveToStorage('hor_katha_time_terms_db', timeTerms);
  }, [timeTerms]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const hours12 = hours % 12 || 12;
  const ampm = hours >= 12 ? 'आयुब / तिकिन (PM)' : 'सेताग (AM)';

  const devanagariTime = `${toDevanagariDigits(String(hours12).padStart(2, '0'))}:${toDevanagariDigits(String(minutes).padStart(2, '0'))}:${toDevanagariDigits(String(seconds).padStart(2, '0'))}`;

  // Time announce logic with authentic Santali terms
  const announceCurrentTime = () => {
    let santaliTimeDescription = '';
    if (minutes === 0) {
      santaliTimeDescription = `नितोग दो ठीक ${hours12} ताड़ांग हुई अकाना।`;
    } else if (minutes === 15) {
      santaliTimeDescription = `नितोग दो सावा ${hours12} ताड़ांग हुई अकाना।`;
    } else if (minutes === 30) {
      if (hours12 === 1) {
        santaliTimeDescription = `नितोग दो मित् ताला ताड़ांग हुई अकाना (डेढ़ बजा है)।`;
      } else if (hours12 === 2) {
        santaliTimeDescription = `नितोग दो बार ताला ताड़ांग हुई अकाना (ढाई बजा है)।`;
      } else {
        santaliTimeDescription = `नितोग दो ${hours12} ताला ताड़ांग हुई अकाना।`;
      }
    } else if (minutes === 45) {
      const nextHour = (hours12 % 12) + 1;
      santaliTimeDescription = `नितोग दो पौने ${nextHour} ताड़ांग हुई अकाना (पावा कोम)।`;
    } else {
      santaliTimeDescription = `नितोग दो ${hours12} ताड़ांग ${minutes} टिपिच हुई अकाना।`;
    }

    const fullPhrase = `${santaliTimeDescription} अभी ${hours12} बजकर ${minutes} मिनट हुए हैं।`;
    speakWithFemaleVoice(fullPhrase, { lang: 'hi-IN' });
  };

  // Numbers CRUD
  const handleOpenAddNum = () => {
    setEditingNum(null);
    setFormNumber(numbersList.length > 0 ? Math.max(...numbersList.map(n => n.num)) + 1 : 1);
    setFormDevDigit(toDevanagariDigits(numbersList.length > 0 ? Math.max(...numbersList.map(n => n.num)) + 1 : 1));
    setFormDevName('');
    setFormRomanName('');
    setFormHindiWord('');
    setIsNumModalOpen(true);
  };

  const handleOpenEditNum = (entry: NumberEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNum(entry.num);
    setFormNumber(entry.num);
    setFormDevDigit(entry.devanagariDigit);
    setFormDevName(entry.santaliDevanagari);
    setFormRomanName(entry.santaliRoman);
    setFormHindiWord(entry.hindiWord);
    setIsNumModalOpen(true);
  };

  const handleDeleteNum = (num: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`संख्या #${num} को हटाएं?`)) {
      setNumbersList(numbersList.filter(item => item.num !== num));
    }
  };

  const handleSaveNum = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: NumberEntry = {
      num: formNumber,
      devanagariDigit: formDevDigit || toDevanagariDigits(formNumber),
      santaliDevanagari: formDevName,
      santaliRoman: formRomanName,
      hindiWord: formHindiWord
    };
    if (editingNum !== null) {
      setNumbersList(numbersList.map(item => item.num === editingNum ? newEntry : item));
    } else {
      setNumbersList([...numbersList.filter(item => item.num !== newEntry.num), newEntry].sort((a, b) => a.num - b.num));
    }
    setIsNumModalOpen(false);
  };

  const handleResetNumbers = () => {
    if (confirm('डिफ़ॉल्ट 1-100 संख्या चार्ट रीसेट करें?')) {
      setNumbersList(BASE_NUMBERS);
    }
  };

  // Time Terms CRUD
  const handleOpenAddTerm = () => {
    setEditingTerm(null);
    setTermFormData({
      id: `term_${Date.now()}`,
      category: 'fraction',
      categoryLabel: 'समय अंश',
      hindiTerm: '',
      santaliDevanagari: '',
      santaliRoman: '',
      explanation: '',
      sampleTime: '',
      spokenPhrase: ''
    });
    setIsTermModalOpen(true);
  };

  const handleOpenEditTerm = (term: TimeTermEntry) => {
    setEditingTerm(term);
    setTermFormData(term);
    setIsTermModalOpen(true);
  };

  const handleDeleteTerm = (id: string) => {
    if (confirm('क्या आप इस समय शब्दावली प्रविष्टि को हटाना चाहते हैं?')) {
      setTimeTerms(timeTerms.filter((t) => t.id !== id));
    }
  };

  const handleResetTerms = () => {
    if (confirm('डिफ़ॉल्ट समय शब्दावली (घंटा, मिनट, सवा, पौने) रीसेट करें?')) {
      setTimeTerms(DEFAULT_TIME_TERMS);
    }
  };

  const handleSaveTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termFormData.hindiTerm || !termFormData.santaliDevanagari) return;

    const readyItem: TimeTermEntry = {
      id: editingTerm ? editingTerm.id : `term_${Date.now()}`,
      category: (termFormData.category || 'fraction') as any,
      categoryLabel:
        termFormData.category === 'unit'
          ? 'इकाई'
          : termFormData.category === 'fraction'
          ? 'समय अंश'
          : 'पारंपरिक पहर',
      hindiTerm: termFormData.hindiTerm || '',
      santaliDevanagari: termFormData.santaliDevanagari || '',
      santaliRoman: termFormData.santaliRoman || '',
      explanation: termFormData.explanation || '',
      sampleTime: termFormData.sampleTime || '',
      spokenPhrase: termFormData.spokenPhrase || `${termFormData.santaliDevanagari}. ${termFormData.hindiTerm}`
    };

    if (editingTerm) {
      setTimeTerms(timeTerms.map((t) => (t.id === editingTerm.id ? readyItem : t)));
    } else {
      setTimeTerms([...timeTerms, readyItem]);
    }
    setIsTermModalOpen(false);
  };

  const filteredNumbers = numbersList.filter((item) => {
    if (!searchNum) return true;
    const q = searchNum.toLowerCase();
    return (
      String(item.num).includes(q) ||
      item.santaliRoman.toLowerCase().includes(q) ||
      item.santaliDevanagari.includes(searchNum) ||
      item.hindiWord.includes(searchNum) ||
      item.devanagariDigit.includes(searchNum)
    );
  });

  const filteredTerms = timeTerms.filter((item) => {
    if (termFilter === 'all') return true;
    return item.category === termFilter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-900 to-amber-950 text-white p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Time &amp; Numeracy
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase">
              एल आर ओक्तो (समय, पहर व संख्याएं)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight flex items-center gap-2.5">
            <Clock className="w-7 h-7 text-amber-300" />
            <span>संताली बोलती घड़ी, समय शब्दावली व अंक</span>
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 font-medium mt-1 max-w-xl">
            घंटा, मिनट, सेकंड, सवा, पौने, आधा घंटा, 5-10-15 मिनट व 8 पहर की प्रामाणिक संताली शब्दावली, लाइव क्लॉक और 1-100 संख्या चार्ट।
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex flex-wrap items-center bg-black/30 p-1.5 rounded-2xl border border-white/20 shrink-0 gap-1">
          <button
            onClick={() => setActiveTab('clock')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'clock' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-white hover:bg-white/10'
            }`}
          >
            लाइव घड़ी (Clock)
          </button>
          <button
            onClick={() => setActiveTab('time_units')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'time_units' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-white hover:bg-white/10'
            }`}
          >
            समय शब्दावली (सवा/पौने/पहर)
          </button>
          <button
            onClick={() => setActiveTab('numbers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'numbers' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-white hover:bg-white/10'
            }`}
          >
            संख्या चार्ट (1-100)
          </button>
        </div>
      </div>

      {/* Mode 1: Live Speaking Clock */}
      {activeTab === 'clock' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
              <span>लाइव संताली समय (ताड़ांग आर टिपिच)</span>
            </div>

            {/* Grand Clock Face in Santali Devanagari */}
            <div className="p-8 bg-gradient-to-b from-slate-900 to-amber-950 rounded-3xl text-white shadow-xl max-w-lg mx-auto space-y-3 border-2 border-amber-500/30">
              <span className="text-[11px] uppercase font-bold tracking-widest text-amber-300 block">
                Santali Devanagari Digits (संताली देवनागरी अंक)
              </span>
              <h2 className="text-5xl sm:text-7xl font-mono font-black tracking-wider text-amber-300 drop-shadow-md">
                {devanagariTime}
              </h2>
              <div className="flex justify-center items-center gap-3 text-xs text-amber-200 font-semibold pt-2 border-t border-amber-900/80">
                <span>मानक: {hours12}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
                <span>·</span>
                <span className="text-amber-400 font-bold">{ampm}</span>
              </div>
            </div>

            {/* Announce Button */}
            <div className="flex justify-center">
              <button
                onClick={announceCurrentTime}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-sm flex items-center gap-2.5 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>समय बोलकर सुनाएं (Announce Time in Santali)</span>
              </button>
            </div>
          </div>

          {/* Quick Real-Time Sample Interactive Audio Pills */}
          <div className="bg-amber-50/70 rounded-3xl border border-amber-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" /> तुरंत सुनें: संताली समय बोलने के व्यावहारिक रूप
              </h4>
              <span className="text-[11px] text-amber-800 font-semibold hidden sm:inline">क्लिक कर उच्चारण सुनें</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {[
                { time: '1:15', label: 'सवा एक (1:15)', text: 'सावा मित् ताड़ांग (1:15 - Quarter past one)' },
                { time: '1:30', label: 'डेढ़ (1:30)', text: 'मित् ताला ताड़ांग (1:30 - Half past one)' },
                { time: '2:30', label: 'ढाई (2:30)', text: 'बार ताला ताड़ांग (2:30 - Half past two)' },
                { time: '3:30', label: 'साढ़े तीन (3:30)', text: 'पे ताला ताड़ांग (3:30 - Half past three)' },
                { time: '2:45', label: 'पौने तीन (2:45)', text: 'पौने पे ताड़ांग, यानी पावा कोम (2:45 - Quarter to three)' },
                { time: '5 min', label: '5 मिनट (0:05)', text: 'मोंड़े टिपिच (5 Minutes)' },
                { time: '10 min', label: '10 मिनट (0:10)', text: 'गेल टिपिच (10 Minutes)' },
                { time: '15 min', label: '15 मिनट (0:15)', text: 'गेल मोंड़े टिपिच, यानी पावा घांटा (15 Minutes)' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => speakWithFemaleVoice(item.text, { lang: 'hi-IN' })}
                  className="p-2.5 bg-white hover:bg-amber-100/60 border border-amber-200 rounded-xl text-left font-bold text-amber-950 flex items-center justify-between transition-all cursor-pointer shadow-2xs group"
                >
                  <div>
                    <span className="block text-[11px] text-amber-900 group-hover:text-amber-950">{item.label}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{item.time}</span>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Complete Time Terminology, Fractions & Pahar (NEW HIGH VALUE FEATURE) */}
      {activeTab === 'time_units' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <span>संताली समय शब्दावली कोश (घंटा, मिनट, सेकंड, सवा, पौने, पहर)</span>
                {isAdmin && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                    एडमिन संपादन सक्रिय
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500">
                पारंपरिक संताली काल-गणना, भिन्न (सवा, साढ़े, पौने) एवं दिन-रात के ८ पहरों की सूची।
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin && (
                <>
                  <button
                    onClick={handleOpenAddTerm}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>नयी शब्दावली जोड़ें</span>
                  </button>
                  <button
                    onClick={handleResetTerms}
                    title="डिफ़ॉल्ट शब्दावली रीसेट करें"
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all' as const, label: 'सभी शब्द' },
              { id: 'unit' as const, label: 'मूल इकाइयां (घंटा, मिनट, सेकंड)' },
              { id: 'fraction' as const, label: 'अंश (सवा, पौने, आधा, साढ़े, 5-10-15 min)' },
              { id: 'pahar' as const, label: 'दिन-रात के ८ पहर (सेताह्, तिकिन, आयुब)' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setTermFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  termFilter === f.id
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Term Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term) => (
              <div
                key={term.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-300 bg-slate-50/60 hover:bg-white transition-all space-y-3 group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                      {term.categoryLabel}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => speakWithFemaleVoice(term.spokenPhrase, { lang: 'hi-IN' })}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-800 hover:bg-amber-50 transition-colors cursor-pointer"
                        title="उच्चारण सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {isAdmin && (
                        <>
                          <button
                            onClick={() => handleOpenEditTerm(term)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-800 hover:bg-amber-50 transition-colors cursor-pointer"
                            title="एडमिन संपादन"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTerm(term.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="हटाएं"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-amber-900 transition-colors">
                      {term.hindiTerm}
                    </h4>
                    <p className="text-sm font-black text-amber-900 mt-0.5">
                      संताली: {term.santaliDevanagari}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 italic">
                      {term.santaliRoman}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100">
                    {term.explanation}
                  </p>
                </div>

                {term.sampleTime && (
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-amber-900 font-bold">
                    <span>घड़ी उदाहरण: {term.sampleTime}</span>
                    <button
                      onClick={() => speakWithFemaleVoice(term.spokenPhrase, { lang: 'hi-IN' })}
                      className="text-[10px] text-amber-700 hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" /> सुनें
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: Numbers Chart */}
      {activeTab === 'numbers' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                1 to 100 Counting in Santali Devanagari &amp; Hindi (संताली देवनागरी गिनती)
              </h3>
              <p className="text-xs text-slate-500">किसी भी संख्या पर क्लिक कर संताली व हिंदी उच्चारण सुनें।</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchNum}
                  onChange={(e) => setSearchNum(e.target.value)}
                  placeholder="अंक या नाम से खोजें..."
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              {isAdmin && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleOpenAddNum}
                    className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>अंक जोड़ें</span>
                  </button>
                  <button
                    onClick={handleResetNumbers}
                    title="डिफ़ॉल्ट संख्याएं रीसेट करें"
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredNumbers.map((item) => (
              <div
                key={item.num}
                onClick={() => speakWithFemaleVoice(`${item.num}. ${item.santaliDevanagari}. ${item.hindiWord}`, { lang: 'hi-IN' })}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all text-left group cursor-pointer flex flex-col justify-between relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">#{item.num}</span>
                  <div className="flex items-center gap-1">
                    {isAdmin && (
                      <>
                        <button
                          onClick={(e) => handleOpenEditNum(item, e)}
                          title="सुधारें (Edit)"
                          className="p-1 rounded-md text-slate-400 hover:text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteNum(item.num, e)}
                          title="हटाएं (Delete)"
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    )}
                    <Volume2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 transition-colors" />
                  </div>
                </div>
                <div className="my-1.5">
                  <span className="text-3xl font-black font-serif text-amber-900 group-hover:text-amber-950 block">
                    {item.devanagariDigit}
                  </span>
                  <p className="text-xs font-bold text-slate-800 mt-1">{item.santaliDevanagari}</p>
                  <p className="text-[11px] text-amber-800 font-semibold">{item.santaliRoman}</p>
                  <p className="text-[10px] text-slate-500">{item.hindiWord}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Add/Edit Modal for Numbers */}
      {isNumModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingNum !== null ? `संख्या #${editingNum} संपादित करें` : 'नया अंक जोड़ें'}
              </h3>
              <button onClick={() => setIsNumModalOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNum} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">संख्या मान (Number)</label>
                <input
                  type="number"
                  required
                  value={formNumber}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10) || 0;
                    setFormNumber(val);
                    setFormDevDigit(toDevanagariDigits(val));
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">संताली देवनागरी अंक (Devanagari Digit)</label>
                <input
                  type="text"
                  required
                  value={formDevDigit}
                  onChange={(e) => setFormDevDigit(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-base font-serif"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">संताली देवनागरी शब्द (Santali Devanagari)</label>
                <input
                  type="text"
                  required
                  value={formDevName}
                  onChange={(e) => setFormDevName(e.target.value)}
                  placeholder="उदा. मित’"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">संताली रोमन (Roman Script)</label>
                <input
                  type="text"
                  required
                  value={formRomanName}
                  onChange={(e) => setFormRomanName(e.target.value)}
                  placeholder="e.g. Mit'"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">हिंदी शब्द (Hindi Word)</label>
                <input
                  type="text"
                  required
                  value={formHindiWord}
                  onChange={(e) => setFormHindiWord(e.target.value)}
                  placeholder="उदा. एक"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNumModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सहेजें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Add/Edit Modal for Time Terms */}
      {isTermModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-black text-slate-900">
                  {editingTerm ? 'समय शब्दावली संपादित करें' : 'नयी समय शब्दावली जोड़ें'}
                </h3>
              </div>
              <button onClick={() => setIsTermModalOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTerm} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">हिंदी नाम / रूप</label>
                  <input
                    type="text"
                    required
                    value={termFormData.hindiTerm || ''}
                    onChange={(e) => setTermFormData({ ...termFormData, hindiTerm: e.target.value })}
                    placeholder="उदा. सवा (Quarter Past)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">श्रेणी (Category)</label>
                  <select
                    value={termFormData.category || 'fraction'}
                    onChange={(e) => setTermFormData({ ...termFormData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="unit">मूल इकाई (घंटा, मिनट, सेकंड)</option>
                    <option value="fraction">समय अंश (सवा, पौने, आधा, 5-10-15 min)</option>
                    <option value="pahar">पारंपरिक पहर (सेताह्, तिकिन, आयुब)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">संताली देवनागरी शब्द</label>
                  <input
                    type="text"
                    required
                    value={termFormData.santaliDevanagari || ''}
                    onChange={(e) => setTermFormData({ ...termFormData, santaliDevanagari: e.target.value })}
                    placeholder="उदा. सावा / पावा डेरा"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">रोमन उच्चारण (Roman)</label>
                  <input
                    type="text"
                    value={termFormData.santaliRoman || ''}
                    onChange={(e) => setTermFormData({ ...termFormData, santaliRoman: e.target.value })}
                    placeholder="e.g. Sawa / Pawa Dera"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">व्याख्या एवं उदाहरण</label>
                <textarea
                  rows={2}
                  required
                  value={termFormData.explanation || ''}
                  onChange={(e) => setTermFormData({ ...termFormData, explanation: e.target.value })}
                  placeholder="दैनिक जीवन में इसका कैसे प्रयोग होता है..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">घड़ी उदाहरण (Sample Time)</label>
                  <input
                    type="text"
                    value={termFormData.sampleTime || ''}
                    onChange={(e) => setTermFormData({ ...termFormData, sampleTime: e.target.value })}
                    placeholder="उदा. 1:15"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ऑडियो वाचन वाक्य</label>
                  <input
                    type="text"
                    value={termFormData.spokenPhrase || ''}
                    onChange={(e) => setTermFormData({ ...termFormData, spokenPhrase: e.target.value })}
                    placeholder="उदा. सवा को सावा मित् ताड़ांग कहते हैं"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTermModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>सहेजें (Save)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
