import React from 'react';
import { GlobalViewMode, ScriptType } from '../types';
import { CulturalTree } from './CulturalTree';
import { useAdmin } from '../context/AdminContext';
import { OfflineIndicator } from './OfflineIndicator';
import {
  Monitor,
  Smartphone,
  LayoutGrid,
  Flame,
  PanelLeftClose,
  PanelLeftOpen,
  Lock,
  Unlock,
  ShieldCheck,
  Languages,
  Globe,
  Search
} from 'lucide-react';

interface HeaderProps {
  viewMode: GlobalViewMode;
  onViewModeChange: (mode: GlobalViewMode) => void;
  activeScript: ScriptType;
  onScriptChange: (script: ScriptType) => void;
  onOpenAbout: () => void;
  onOpenAdmin: () => void;
  onOpenFeedback: () => void;
  onOpenDailyQuiz?: () => void;
  onOpenSearch?: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  activeScript,
  onScriptChange,
  onOpenAbout,
  onOpenAdmin,
  onOpenFeedback,
  onOpenDailyQuiz,
  onOpenSearch,
  sidebarOpen,
  onToggleSidebar
}) => {
  const { isAdmin } = useAdmin();
  const [isOnline, setIsOnline] = React.useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Sidebar Toggle & Brand */}
        <div className="flex items-center gap-2.5">
          {/* Hideable Left Menu Toggle Button */}
          {viewMode === 'desktop' && (
            <button
              onClick={onToggleSidebar}
              title={sidebarOpen ? 'Collapse Left Menu' : 'Expand Left Menu'}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/70"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-4 h-4 text-slate-600" />
              ) : (
                <PanelLeftOpen className="w-4 h-4 text-sky-600" />
              )}
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
              <img decoding="async"
                src="/assets/aistudio/bosc-main-logo_39d98de6.webp"
                width={192}
                height={192}
                alt="BOSC Tech & Education"
                className="w-full h-full object-contain drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Hor Katha Suite
                </span>
                <span className="hidden md:inline-block text-[9px] font-bold tracking-wider uppercase text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  v3.7.4 Pro
                </span>
              </div>
              <span className="text-[10px] text-slate-400 hidden lg:inline">
                Santali Platform · BOSC Tech &amp; Edu
              </span>
            </div>
          </div>
        </div>

        {/* Center: View Mode Switcher */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 text-xs font-medium">
          <button
            onClick={() => onViewModeChange('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              viewMode === 'desktop'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Desktop Suite</span>
          </button>

          <button
            onClick={() => onViewModeChange('mobile_simulator')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              viewMode === 'mobile_simulator'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Mobile Android</span>
          </button>

          <button
            onClick={() => onViewModeChange('presentation')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              viewMode === 'presentation'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden md:inline">Original UI Sheet</span>
          </button>
        </div>

        {/* Right: Offline Indicator, Script Selector & Admin Action Button */}
        {/* Right: Offline Indicator, Language Selector, Translator, Daily Quiz & Admin Locked Icon */}
        <div className="flex items-center gap-2">
          {/* Service Worker Offline Status & PWA Install Button */}
          <OfflineIndicator />

          {/* Language Selection: Strictly Santali, Hindi, English */}
          <div className="flex items-center bg-slate-50 border border-slate-200/90 rounded-xl px-2.5 py-1.5 shadow-2xs hover:bg-slate-100 transition-colors h-9">
            <Languages className="w-3.5 h-3.5 text-slate-500 mr-1.5 shrink-0" />
            <select
              value={activeScript === 'english' ? 'english' : activeScript === 'hindi' || activeScript === 'devanagari' ? 'hindi' : 'santali'}
              onChange={(e) => onScriptChange(e.target.value as ScriptType)}
              className="text-xs bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer pr-1"
            >
              <option value="santali">Santali</option>
              <option value="hindi">Hindi (हिन्दी)</option>
              <option value="english">English</option>
            </select>
          </div>

          {/* Global Search Button (Ctrl+K) */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              title="Global Search (Ctrl+K / Cmd+K) — Search 10,000+ words, Santali Devanagari, and tools"
              className="flex items-center gap-2 px-3 h-9 text-xs font-semibold rounded-xl text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 transition-all shadow-2xs cursor-pointer group"
            >
              <Search className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-slate-500 font-medium">Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
                Ctrl K
              </kbd>
            </button>
          )}

          {/* Online Google Translator Direct Button (ICON ONLY as requested) */}
          {isOnline && (
            <button
              onClick={() => window.open('https://translate.google.com/?sl=auto&tl=hi&op=translate', '_blank', 'noopener,noreferrer')}
              title="Launch Google Translator (Online Instant)"
              aria-label="Google Translator"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-blue-600 drop-shadow-xs" />
            </button>
          )}

          {/* Daily Vocab Quiz Streak Button */}
          {onOpenDailyQuiz && (
            <button
              onClick={onOpenDailyQuiz}
              title="Daily Santali Vocabulary Quiz & Streak Tracker"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 border border-orange-400/40 transition-all shadow-xs hover:scale-102 cursor-pointer h-9"
            >
              <Flame className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Daily Quiz</span>
            </button>
          )}

          {/* Admin Login: Beautiful Locked Icon Only */}
          <button
            onClick={onOpenAdmin}
            title={isAdmin ? 'Admin Mode Active (Click to manage)' : 'Admin Authentication (Authorized Personnel Only)'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 relative ${
              isAdmin
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500'
                : 'bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border border-amber-400/50 shadow-amber-500/20 shadow-sm'
            }`}
          >
            {isAdmin ? (
              <>
                <Unlock className="w-4 h-4 text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-white animate-pulse" />
              </>
            ) : (
              <Lock className="w-4 h-4 text-white drop-shadow-xs" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
