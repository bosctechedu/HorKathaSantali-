import React from 'react';
import { ActiveDesktopTab, MobileScreen } from '../types';
import { CulturalTree } from './CulturalTree';
import {
  Monitor,
  Smartphone,
  Keyboard as KeyboardIcon,
  BookOpen,
  Camera,
  GraduationCap,
  Languages,
  Check,
  Search,
  Volume2,
  Share2,
  Copy,
  Sparkles,
  ArrowRight,
  Calendar
} from 'lucide-react';

interface PresentationViewProps {
  onSelectDesktopModule: (tab: ActiveDesktopTab) => void;
  onSelectMobileScreen: (screen: MobileScreen) => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  onSelectDesktopModule,
  onSelectMobileScreen,
}) => {
  return (
    <div className="space-y-10 pb-16">
      {/* Presentation Header Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-sky-50/70 rounded-2xl border border-sky-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <CulturalTree variant="emblem" className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              Hor Katha Suite v3.7.4 Pre Ultra — BOSC Tech &amp; Edu
            </h1>
            <p className="text-xs text-slate-600">
              Santali Language &amp; Learning Platform · Full Visual Design System
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-sky-800 bg-white px-3 py-1.5 rounded-xl border border-sky-200 shadow-2xs">
          Interactive Design Showcase
        </span>
      </div>

      {/* SECTION 1: Desktop Website Views (Top Half of User's Image) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <Monitor className="w-5 h-5 text-sky-600" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Desktop Website Views (Hor Katha Suite v3.7.4 Pre Ultra — BOSC Tech &amp; Edu)
          </h2>
        </div>

        {/* Desktop Container Window Frame */}
        <div className="rounded-3xl border border-slate-300 bg-white shadow-xl overflow-hidden">
          {/* Browser Window Chrome */}
          <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[11px] font-mono text-slate-500 bg-white px-6 py-1 rounded-lg border border-slate-200">
              https://horkathasuite.bosc.edu/santali-platform
            </div>
            <div className="w-10" />
          </div>

          {/* Recreated Desktop View (Interactive preview) */}
          <div className="p-4 sm:p-6 bg-slate-50 flex flex-col md:flex-row gap-6">
            {/* Mini Sidebar */}
            <div className="w-48 bg-white p-3 rounded-2xl border border-slate-200 shrink-0 hidden md:block space-y-4 text-xs">
              <div className="flex items-center gap-2">
                <CulturalTree variant="emblem" className="w-6 h-6" />
                <span className="font-bold text-slate-800">Hor Katha Suite</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <div className="p-1.5 bg-sky-50 text-sky-700 font-semibold rounded-lg">🏠 Home</div>
                <div className="p-1.5 hover:bg-slate-50 rounded-lg">⌨️ Keyboard</div>
                <div className="p-1.5 hover:bg-slate-50 rounded-lg">📊 Dashboard</div>
                <div className="p-1.5 hover:bg-slate-50 rounded-lg">🎉 Festivals (पर्व)</div>
                <div className="p-1.5 hover:bg-slate-50 rounded-lg">🎓 Learn Santali</div>
                <div className="p-1.5 hover:bg-slate-50 rounded-lg">🌐 Translator</div>
              </div>
            </div>

            {/* Main Center */}
            <div className="flex-1 space-y-4">
              {/* Johar Hero Banner */}
              <div className="p-6 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-200/60 rounded-2xl border border-amber-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-amber-950">Johar! Welcome to Hor Katha Suite</h3>
                  <p className="text-xs text-amber-900/80 mt-1">Santali Language &amp; Learning Platform · Type · Learn · Preserve</p>
                  <button
                    onClick={() => onSelectDesktopModule('home')}
                    className="mt-3 px-4 py-2 bg-amber-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Launch Live Desktop View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <CulturalTree variant="banner" className="w-36 h-24 hidden sm:block" />
              </div>

              {/* 5 Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                {[
                  { name: 'Santali Keyboard', bg: 'bg-sky-500', tab: 'keyboard' as ActiveDesktopTab, icon: KeyboardIcon },
                  { name: 'Dictionary', bg: 'bg-amber-500', tab: 'dashboard' as ActiveDesktopTab, icon: BookOpen },
                  { name: 'सांस्कृतिक पर्व (पर्व)', bg: 'bg-amber-600', tab: 'calendar' as ActiveDesktopTab, icon: Calendar },
                  { name: 'Learn Santali', bg: 'bg-emerald-500', tab: 'learn' as ActiveDesktopTab, icon: GraduationCap },
                  { name: 'Translator', bg: 'bg-rose-500', tab: 'translator' as ActiveDesktopTab, icon: Languages },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => onSelectDesktopModule(item.tab)}
                    className={`${item.bg} text-white p-3 rounded-xl text-left shadow-xs flex flex-col justify-between h-24 hover:opacity-90 transition-opacity`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-bold text-[11px] leading-tight">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Mobile App Views (Android — Hor Katha Suite Keyboard) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-sky-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Mobile App Views (Android — Hor Katha Suite Keyboard)
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">8 Full Screens</span>
        </div>

        {/* 8 Android Phones Grid matching bottom section of image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {/* Phone 1: Splash Screen */}
          <div
            onClick={() => onSelectMobileScreen('splash')}
            className="group cursor-pointer bg-white rounded-3xl p-3 border border-slate-200 shadow-md hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between h-[420px]"
          >
            <div className="h-full bg-slate-50 rounded-2xl p-4 flex flex-col justify-between items-center text-center border border-slate-100">
              <div className="space-y-2 mt-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto">
                  <CulturalTree variant="emblem" className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Hor Katha Suite</h4>
                <p className="text-[10px] text-slate-500">v3.7.4 Pro Ultra</p>
                <p className="text-[10px] text-amber-800 font-semibold">BOSC Tech &amp; Edu</p>
              </div>

              <div className="w-full space-y-2">
                <CulturalTree variant="banner" className="w-32 h-20 mx-auto" />
                <div className="w-full py-2 bg-sky-500 text-white rounded-xl text-xs font-bold text-center">
                  Get Started &gt;
                </div>
              </div>
            </div>
            <p className="text-xs font-bold text-center text-slate-700 mt-2 group-hover:text-sky-600">
              Splash Screen
            </p>
          </div>

          {/* Phone 2: Language Selection */}
          <div
            onClick={() => onSelectMobileScreen('language')}
            className="group cursor-pointer bg-white rounded-3xl p-3 border border-slate-200 shadow-md hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between h-[420px]"
          >
            <div className="h-full bg-slate-50 rounded-2xl p-3.5 flex flex-col justify-between border border-slate-100">
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900">Choose Language &amp; Script</h4>
                <p className="text-[10px] text-slate-500">Select preferred script for better experience</p>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2 bg-white rounded-xl border border-sky-400 font-medium text-sky-900 flex justify-between">
                    <span>Roman Santali</span>
                    <Check className="w-3.5 h-3.5 text-sky-600" />
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200 font-medium text-slate-700">
                    <span>Santali (संताली देवनागरी)</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200 font-medium text-slate-700">
                    <span>Hindi (Devanagari)</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200 font-medium text-slate-700">
                    <span>English</span>
                  </div>
                </div>
              </div>

              <div className="w-full py-2 bg-sky-500 text-white rounded-xl text-xs font-bold text-center">
                Continue →
              </div>
            </div>
            <p className="text-xs font-bold text-center text-slate-700 mt-2 group-hover:text-sky-600">
              Language Selection
            </p>
          </div>

          {/* Phone 3: Home Dashboard (Mobile) */}
          <div
            onClick={() => onSelectMobileScreen('home')}
            className="group cursor-pointer bg-white rounded-3xl p-3 border border-slate-200 shadow-md hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between h-[420px]"
          >
            <div className="h-full bg-slate-50 rounded-2xl p-3 flex flex-col justify-between border border-slate-100">
              <div className="space-y-2">
                <div className="p-2.5 bg-amber-100/70 rounded-xl border border-amber-200">
                  <p className="text-[11px] font-bold text-amber-950">Johar! Welcome</p>
                  <p className="text-[9px] text-amber-800">Santali Language Platform</p>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="p-2 bg-sky-500 text-white rounded-xl font-bold h-14 flex flex-col justify-between">
                    <KeyboardIcon className="w-3.5 h-3.5" />
                    <span>Santali Keyboard</span>
                  </div>
                  <div className="p-2 bg-amber-500 text-white rounded-xl font-bold h-14 flex flex-col justify-between">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Dictionary</span>
                  </div>
                  <div className="p-2 bg-rose-600 text-white rounded-xl font-bold h-14 flex flex-col justify-between">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Festivals</span>
                  </div>
                  <div className="p-2 bg-emerald-500 text-white rounded-xl font-bold h-14 flex flex-col justify-between">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Learn Santali</span>
                  </div>
                </div>

                <div className="p-2 bg-rose-500 text-white rounded-xl font-bold text-[10px] flex items-center justify-between">
                  <span>Translator</span>
                  <Languages className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex justify-around text-[9px] text-slate-400 pt-2 border-t border-slate-200">
                <span>Home</span>
                <span>Learn</span>
                <span>Keyboard</span>
              </div>
            </div>
            <p className="text-xs font-bold text-center text-slate-700 mt-2 group-hover:text-sky-600">
              Home Dashboard (Mobile)
            </p>
          </div>

          {/* Phone 4: Keyboard (Santali Devanagari & Roman) */}
          <div
            onClick={() => onSelectMobileScreen('keyboard')}
            className="group cursor-pointer bg-white rounded-3xl p-3 border border-slate-200 shadow-md hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between h-[420px]"
          >
            <div className="h-full bg-slate-50 rounded-2xl p-2.5 flex flex-col justify-between border border-slate-100">
              <div className="space-y-1.5">
                <div className="flex gap-1 text-[9px]">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold">संताली देवनागरी</span>
                  <span className="px-2 py-0.5 bg-white text-slate-500 rounded">Roman</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200 text-xs font-serif font-bold text-slate-800">
                  संताली देवनागरी ते...
                </div>
                <div className="flex gap-1 text-[9px] text-slate-500">
                  <span className="bg-slate-200 px-1 rounded">जोहार</span>
                  <span className="bg-slate-200 px-1 rounded">सागुनदाराम</span>
                </div>
              </div>

              {/* Virtual keypad preview */}
              <div className="grid grid-cols-6 gap-1 bg-white p-1.5 rounded-xl border border-slate-200 text-[10px] text-center font-bold">
                {['क', 'ख', 'ग', 'घ', 'ङ', "क'", "च'", "त'", "प'", 'ऽ', '़', '्'].map((k) => (
                  <span key={k} className="p-1 bg-slate-50 rounded border border-slate-100">{k}</span>
                ))}
              </div>
            </div>
            <p className="text-xs font-bold text-center text-slate-700 mt-2 group-hover:text-sky-600">
              Keyboard (संताली देवनागरी &amp; Roman)
            </p>
          </div>

          {/* Phone 5: Dictionary */}
          <div
            onClick={() => onSelectMobileScreen('dictionary')}
            className="group cursor-pointer bg-white rounded-3xl p-3 border border-slate-200 shadow-md hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between h-[420px]"
          >
            <div className="h-full bg-slate-50 rounded-2xl p-3 flex flex-col justify-between border border-slate-100">
              <div className="space-y-2">
                <div className="p-2 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-400 flex items-center gap-1">
                  <Search className="w-3 h-3" />
                  <span>Search words...</span>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900">Johar (जोहार)</span>
                    <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <p className="text-[10px] text-slate-600">Hindi: नमस्ते / प्रणाम</p>
                  <p className="text-[10px] text-slate-600">English: Greeting / Hello</p>
                  <p className="text-[9px] text-amber-900 italic">"Johar, am celed menama?"</p>
                </div>
              </div>

              <div className="w-full py-1.5 bg-amber-600 text-white rounded-xl text-[10px] font-bold text-center">
                Copy / Share
              </div>
            </div>
            <p className="text-xs font-bold text-center text-slate-700 mt-2 group-hover:text-sky-600">
              Dictionary
            </p>
          </div>

          {/* Phone 6: Cultural Festivals */}
          <div
            onClick={() => onSelectMobileScreen('calendar')}
            className="group cursor-pointer bg-white rounded-3xl p-3 border border-slate-200 shadow-md hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between h-[420px]"
          >
            <div className="h-full bg-slate-50 rounded-2xl p-3 flex flex-col justify-between border border-slate-100">
              <div className="space-y-2">
                <div className="h-28 bg-gradient-to-r from-amber-700 to-orange-700 rounded-xl overflow-hidden relative flex items-center justify-center p-3 text-center">
                  <div className="text-white text-xs font-black">
                    सोहराय परोब (Sohrai)
                  </div>
                </div>

                <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-slate-800 space-y-0.5">
                  <span className="font-bold text-amber-900 block">पर्व विवरण:</span>
                  <p className="font-bold">5 दिवसीय कृषि व पशु वंदना महापर्व</p>
                  <p className="text-slate-500 italic">सोहराय, बाहा, करम, माघे, एरोक</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-amber-600 text-white rounded-xl text-[10px] font-bold">
                  पर्व देखें
                </button>
              </div>
            </div>
            <p className="text-xs font-bold text-center text-slate-700 mt-2 group-hover:text-amber-600">
              सांस्कृतिक पर्व (पर्व)
            </p>
          </div>

          {/* Phone 7: Learn Santali */}
          <div
            onClick={() => onSelectMobileScreen('learn')}
            className="group cursor-pointer bg-white rounded-3xl p-3 border border-slate-200 shadow-md hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between h-[420px]"
          >
            <div className="h-full bg-slate-50 rounded-2xl p-3 flex flex-col justify-between border border-slate-100">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-emerald-800">
                  <span>Level 1 - Letters</span>
                  <span>3/10</span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
                  <span className="font-serif text-3xl font-black text-emerald-950 block">अ</span>
                  <p className="text-xs font-bold text-slate-900">स्वर: अ (a)</p>
                  <p className="text-[10px] text-slate-600">अड़ांग (आवाज), ओड़ाक (घर)</p>
                </div>

                <div className="p-2 bg-white rounded-xl border border-slate-200 text-[10px]">
                  <span className="font-bold text-amber-800 block">Today's Word:</span>
                  <p>Johar (जोहार) - Traditional Greeting</p>
                </div>
              </div>

              <div className="w-full py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold text-center">
                Continue Lesson →
              </div>
            </div>
            <p className="text-xs font-bold text-center text-slate-700 mt-2 group-hover:text-sky-600">
              Learn Santali
            </p>
          </div>

          {/* Phone 8: Translator */}
          <div
            onClick={() => onSelectMobileScreen('translator')}
            className="group cursor-pointer bg-white rounded-3xl p-3 border border-slate-200 shadow-md hover:border-sky-400 hover:shadow-lg transition-all flex flex-col justify-between h-[420px]"
          >
            <div className="h-full bg-slate-50 rounded-2xl p-3 flex flex-col justify-between border border-slate-100">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                  <span>From: Santali</span>
                  <span>To: Hindi</span>
                </div>

                <div className="p-2 bg-white rounded-xl border border-slate-200 text-xs">
                  जोहार, सागुनदाराम!
                </div>

                <div className="w-full py-1 bg-rose-600 text-white rounded-lg text-[10px] font-bold text-center">
                  Translate
                </div>

                <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-[10px] space-y-1">
                  <span className="font-bold text-rose-900 block">Translation Result:</span>
                  <p className="font-bold text-slate-900">नमस्ते, आपका हार्दिक स्वागत है।</p>
                  <p className="font-semibold text-rose-800">जोहार, सागुनदाराम!</p>
                </div>
              </div>

              <div className="flex justify-around text-slate-500 pt-2 border-t border-slate-200">
                <Volume2 className="w-3.5 h-3.5" />
                <Copy className="w-3.5 h-3.5" />
                <Share2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-xs font-bold text-center text-slate-700 mt-2 group-hover:text-sky-600">
              Translator
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Bottom Presentation Strip (Hor Katha Suite v3.7.4 Pro Ultra - BOSC Tech & Edu) */}
      <footer className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
            <CulturalTree variant="emblem" className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Hor Katha Suite</h3>
            <p className="text-xs text-slate-400">
              v3.7.4 Pro Ultra · BOSC Tech &amp; Edu
            </p>
          </div>
        </div>

        {/* Feature Icons Row */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <KeyboardIcon className="w-4 h-4 text-sky-400" />
            <span>Santali Keyboard (Santali Devanagari &amp; Roman)</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Dictionary (10,000+ Words)</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-400" />
            <span>Festivals (सांस्कृतिक पर्व एवं रीति-रिवाज)</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Learn Santali (Alphabet · Words · Quiz)</span>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-rose-400" />
            <span>Translator (Santali · Hindi · English)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-amber-400 font-serif italic text-xs">
          <span>"Our Language Our Pride"</span>
          <CulturalTree variant="emblem" className="w-5 h-5 inline" />
        </div>
      </footer>
    </div>
  );
};
