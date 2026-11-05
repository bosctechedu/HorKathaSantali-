import React, { useState, lazy, Suspense } from 'react';
import { CulturalTree } from './CulturalTree';
import type { PolicyDocId } from './LegalPoliciesModal';

// Policy modal is code-split: loads on first open, then stays mounted
const LegalPoliciesModal = lazy(() => import('./LegalPoliciesModal').then((m) => ({ default: m.LegalPoliciesModal })));
import {
  Keyboard,
  BookOpen,
  Calendar,
  GraduationCap,
  Languages,
  Smartphone,
  PenTool,
  Grid,
  Repeat,
  Printer,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Cookie,
  Bookmark,
  Eye,
  Mail,
  Home,
  X,
  Sparkles,
  CheckCircle2,
  MessageSquareHeart
} from 'lucide-react';

interface FooterProps {
  onOpenAbout?: () => void;
  onNavigateTab?: (tab: string) => void;
  onViewModeChange?: (mode: 'desktop' | 'mobile_simulator' | 'presentation') => void;
  onOpenFeedback?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onNavigateTab,
  onViewModeChange,
  onOpenFeedback
}) => {
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyDocId | null>(null);
  const [policyMounted, setPolicyMounted] = useState(false);
  if (activePolicyModal !== null && !policyMounted) setPolicyMounted(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    if (onNavigateTab) {
      onNavigateTab(tab);
    }
    scrollToTop();
  };

  const handleSwitchView = (mode: 'desktop' | 'mobile_simulator' | 'presentation') => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
    scrollToTop();
  };

  return (
    <>
      <footer className="mt-14 bg-[#050C1A] text-slate-300 border-t border-slate-800/80 relative select-none font-sans">
        {/* Live Quick Links Navigation Strip (Replaced Static Mock Bar) */}
        <div className="border-b border-slate-800/80 bg-[#081329] px-4 lg:px-8 py-3.5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 shrink-0">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase tracking-wider">Live Quick Links:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => handleNavigate('keyboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1C38] hover:bg-[#142B57] text-slate-200 hover:text-white border border-slate-700/80 hover:border-sky-400 font-medium transition-all shadow-2xs group cursor-pointer"
              >
                <Keyboard className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span>Santali Keyboard</span>
              </button>

              <button
                onClick={() => handleNavigate('dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1C38] hover:bg-[#142B57] text-slate-200 hover:text-white border border-slate-700/80 hover:border-amber-400 font-medium transition-all shadow-2xs group cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>10,000+ Dictionary</span>
              </button>

              <button
                onClick={() => handleNavigate('calendar')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1C38] hover:bg-[#142B57] text-slate-200 hover:text-white border border-slate-700/80 hover:border-orange-400 font-medium transition-all shadow-2xs group cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span>Festivals (पर्व)</span>
              </button>

              <button
                onClick={() => handleNavigate('learn')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1C38] hover:bg-[#142B57] text-slate-200 hover:text-white border border-slate-700/80 hover:border-emerald-400 font-medium transition-all shadow-2xs group cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Learn Santali</span>
              </button>

              <button
                onClick={() => handleNavigate('translator')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1C38] hover:bg-[#142B57] text-slate-200 hover:text-white border border-slate-700/80 hover:border-rose-400 font-medium transition-all shadow-2xs group cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                <span>Translator</span>
              </button>

              <button
                onClick={() => handleSwitchView('mobile_simulator')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1C38] hover:bg-[#142B57] text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 font-medium transition-all shadow-2xs group cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Android App</span>
              </button>

              <button
                onClick={() => handleSwitchView('presentation')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1C38] hover:bg-[#142B57] text-slate-200 hover:text-white border border-slate-700/80 hover:border-sky-400 font-medium transition-all shadow-2xs group cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span>UI Presentation Sheet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer 4-Column Layout */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            {/* Column 1: Brand & Pandit Raghunath Murmu Card (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                  <img decoding="async" loading="lazy"
                    src="/assets/aistudio/bosc-main-logo_39d98de6.webp"
                width={192}
                height={192}
                    alt="BOSC Tech & Education"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Hor Katha Suite
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold">
                    v3.7.4 Pro Ultra · BOSC Tech &amp; Edu
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Standardized digital linguistic platform dedicated to Santali language preservation, Santali Devanagari typography, and accessible community learning. 100% Free &amp; Open Access for the Adivasi indigenous community.
              </p>

              {/* Santali Cultural Heritage & Digital Mission */}
              <div className="p-3.5 bg-[#0A162B] rounded-2xl border border-amber-500/30 text-xs space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Bookmark className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Santali Cultural Heritage &amp; Language Mission</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal pl-6">
                  Empowering the Santali language with modern digital accessibility, keyboards, and lexicon tools.
                </p>
              </div>

              {/* Green Motto Line */}
              <p className="text-xs font-semibold text-emerald-400 tracking-wide">
                Preserving Language Heritage · Digital Empowerment
              </p>
            </div>

            {/* Column 2: CORE PLATFORM (2.5 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                CORE PLATFORM
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li
                  onClick={() => onNavigateTab && onNavigateTab('keyboard')}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                >
                  <Keyboard className="w-3.5 h-3.5 text-sky-400" />
                  <span>Santali Keyboard</span>
                </li>
                <li
                  onClick={() => onNavigateTab && onNavigateTab('dashboard')}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>10,000+ Dictionary</span>
                </li>
                <li
                  onClick={() => onNavigateTab && onNavigateTab('calendar')}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>सांस्कृतिक पर्व (पर्व)</span>
                </li>
                <li
                  onClick={() => onNavigateTab && onNavigateTab('learn')}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Learn Santali Academy</span>
                </li>
                <li
                  onClick={() => onNavigateTab && onNavigateTab('translator')}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                >
                  <Languages className="w-3.5 h-3.5 text-rose-400" />
                  <span>Neural Translator</span>
                </li>
                <li className="flex items-center gap-2 text-amber-400 font-semibold cursor-pointer">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Android Suite</span>
                </li>
              </ul>
            </div>

            {/* Column 3: STUDENT TOOLS (2.5 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                STUDENT TOOLS
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li
                  onClick={() => onNavigateTab && onNavigateTab('learn')}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                >
                  <PenTool className="w-3.5 h-3.5 text-amber-400" />
                  <span>Santali Devanagari Akhar Practice</span>
                </li>
                <li
                  onClick={() => onNavigateTab && onNavigateTab('keyboard')}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                >
                  <Grid className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Unicode Character Map</span>
                </li>
                <li
                  onClick={() => onNavigateTab && onNavigateTab('translator')}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                >
                  <Repeat className="w-3.5 h-3.5 text-sky-400" />
                  <span>Text Script Converter</span>
                </li>
                <li
                  onClick={() => window.print()}
                  className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Print Study Reference</span>
                </li>
              </ul>
            </div>

            {/* Column 4: POLICIES & COMPLIANCE (3 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  POLICIES &amp; COMPLIANCE
                </h4>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded-full">
                  100% Compliant
                </span>
              </div>

              {/* 2-Column Policy Buttons Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setActivePolicyModal('disclaimer')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0B172E] border border-slate-700/70 hover:border-amber-500/60 text-slate-200 hover:text-white text-left transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-[11px]">Disclaimer</span>
                </button>

                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0B172E] border border-slate-700/70 hover:border-emerald-500/60 text-slate-200 hover:text-white text-left transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[11px]">Privacy Policy</span>
                </button>

                <button
                  onClick={() => setActivePolicyModal('terms')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0B172E] border border-slate-700/70 hover:border-sky-500/60 text-slate-200 hover:text-white text-left transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="font-semibold text-[11px]">Terms of Service</span>
                </button>

                <button
                  onClick={() => setActivePolicyModal('cookies')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0B172E] border border-slate-700/70 hover:border-amber-500/60 text-slate-200 hover:text-white text-left transition-colors"
                >
                  <Cookie className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-[11px]">Cookie Policy</span>
                </button>

                <button
                  onClick={() => setActivePolicyModal('cultural_ip')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0B172E] border border-slate-700/70 hover:border-amber-500/60 text-slate-200 hover:text-white text-left transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-[11px]">Cultural Heritage IP</span>
                </button>

                <button
                  onClick={() => setActivePolicyModal('accessibility')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0B172E] border border-slate-700/70 hover:border-sky-500/60 text-slate-200 hover:text-white text-left transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="font-semibold text-[11px]">Accessibility</span>
                </button>
              </div>

              {/* Email & Credit Contact Line */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <a
                  href="mailto:bosctechedu@gmail.com"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px]">bosctechedu@gmail.com</span>
                </a>

                {onOpenFeedback && (
                  <button
                    onClick={onOpenFeedback}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
                  >
                    <MessageSquareHeart className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Feedback &amp; Suggestions</span>
                  </button>
                )}

                <span className="text-[11px] font-semibold text-emerald-400">
                  BOSC Tech &amp; Edu
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Link Strip */}
        <div className="border-t border-slate-800/80 bg-[#020713] px-4 lg:px-8 py-3.5 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-slate-400">
              © 2026 <strong className="text-amber-400 font-semibold">Hor Katha Suite</strong>. All rights reserved. | <strong className="text-emerald-400 font-semibold">BOSC Tech &amp; Edu</strong> | <span className="text-amber-300">100% Free &amp; Open Access</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <button
                onClick={() => setActivePolicyModal('disclaimer')}
                className="hover:text-amber-400 transition-colors"
              >
                Disclaimer
              </button>
              <span>·</span>
              <button
                onClick={() => setActivePolicyModal('privacy')}
                className="hover:text-emerald-400 transition-colors"
              >
                Privacy
              </button>
              <span>·</span>
              <button
                onClick={() => setActivePolicyModal('terms')}
                className="hover:text-sky-400 transition-colors"
              >
                Terms
              </button>
              <span>·</span>
              <button
                onClick={() => setActivePolicyModal('cookies')}
                className="hover:text-amber-400 transition-colors"
              >
                Cookies
              </button>
              <span>·</span>
              <button
                onClick={() => setActivePolicyModal('accessibility')}
                className="hover:text-sky-400 transition-colors"
              >
                Accessibility
              </button>
            </div>
          </div>
        </div>

        {/* Floating Real Home Button (Bottom Right) */}
        <button
          onClick={() => handleNavigate('home')}
          title="मुख्य पृष्ठ / Return to Home Dashboard"
          aria-label="Return to Home Dashboard"
          className="fixed bottom-6 right-6 z-40 px-3.5 py-3 rounded-full bg-gradient-to-tr from-sky-500 via-cyan-500 to-blue-600 text-white shadow-[0_6px_28px_rgba(14,165,233,0.6)] flex items-center gap-2 hover:scale-108 active:scale-95 transition-all group border-2 border-white/40 cursor-pointer"
        >
          <Home className="w-5 h-5 text-white group-hover:scale-115 transition-transform drop-shadow-sm" strokeWidth={2.5} />
          <span className="text-xs font-black tracking-wide text-white drop-shadow-xs pr-1">Home</span>
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse shadow-xs" />
        </button>
      </footer>

      {/* Unified Exact Legal & Governance Policy Modal matching User Image */}
      {(policyMounted || activePolicyModal !== null) && (
        <Suspense fallback={null}>
          <LegalPoliciesModal
            isOpen={activePolicyModal !== null}
            initialDoc={activePolicyModal || 'disclaimer'}
            onClose={() => setActivePolicyModal(null)}
          />
        </Suspense>
      )}
    </>
  );
};
