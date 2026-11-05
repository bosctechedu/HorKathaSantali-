import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// main.tsx captures an early `beforeinstallprompt` (it can fire before this lazy chunk loads)
declare global {
  interface Window { __hkInstallPrompt?: Event | null }
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Capture beforeinstallprompt
    const applyPromptEvent = (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show banner if not dismissed before
      let dismissed: string | null = null;
      try { dismissed = localStorage.getItem('hor_katha_pwa_dismissed'); } catch { /* storage blocked */ }
      if (!dismissed) {
        setShowBanner(true);
      }
    };
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      window.__hkInstallPrompt = e;
      applyPromptEvent(e);
    };
    if (window.__hkInstallPrompt) applyPromptEvent(window.__hkInstallPrompt);

    const handleInstalled = () => { setIsInstalled(true); setShowBanner(false); window.__hkInstallPrompt = null; };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowBanner(false);
    }
    setDeferredPrompt(null);
    window.__hkInstallPrompt = null;
  };

  const handleDismiss = () => {
    setShowBanner(false);
    try { localStorage.setItem('hor_katha_pwa_dismissed', 'true'); } catch { /* storage blocked */ }
  };

  return (
    <>
      {/* Offline strip is shown by the Header's OfflineIndicator */}
      {/* PWA Install Promotion Banner */}
      {showBanner && !isInstalled && (
        <div className="mx-3 sm:mx-6 my-3 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm flex items-center gap-2">
                <span>फोन में ऐप इंस्टॉल करें (Install Hor Katha App)</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                  बिना इंटरनेट भी चलेगा
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                १०,०००+ शब्दकोश, बाल कथाएं, वर्णमाला व सांस्कृतिक टूल्स को ऑफ़लाइन उपयोग के लिए होम स्क्रीन पर जोड़ें।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" />
              <span>इंस्टॉल करें</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="बंद करें"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
