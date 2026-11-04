import React, { useState } from 'react';
import { useOfflineStatus } from '../hooks/useOfflineStatus';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Wifi, WifiOff, Download, Database, CheckCircle2, X } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, isOfflineReady, cachedWordsCount } = useOfflineStatus();
  const { canInstall, isInstalled, promptInstall } = usePWAInstall();
  const [dismissBanner, setDismissBanner] = useState(false);

  return (
    <>
      {/* Offline Alert Strip when disconnected */}
      {!isOnline && !dismissBanner && (
        <div className="bg-amber-950/90 border-b border-amber-600/40 text-amber-200 px-4 py-2 text-xs md:text-sm flex items-center justify-between shadow-md backdrop-blur-md z-40 relative">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
            <span>
              <strong>Offline Mode Active:</strong> You are currently disconnected from internet, but{' '}
              <strong className="text-emerald-300">{cachedWordsCount.toLocaleString()}+ words</strong> and the{' '}
              <strong>Virtual Keyboard</strong> are fully accessible via local IndexedDB storage.
            </span>
          </div>
          <button
            onClick={() => setDismissBanner(true)}
            className="text-amber-300 hover:text-white p-1 rounded transition-colors"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Status & Install Pill in Header or bottom */}
      <div className="flex items-center gap-2">
        {/* Offline Cache Status Pill */}
        <div
          className={`flex items-center gap-1.5 px-2.5 h-9 rounded-xl border transition-all text-xs font-semibold ${
            isOnline
              ? 'bg-emerald-50 border-emerald-200/90 text-emerald-800'
              : 'bg-amber-50 border-amber-300 text-amber-900 animate-pulse'
          }`}
          title={
            isOnline
              ? `Online · ${cachedWordsCount > 0 ? cachedWordsCount.toLocaleString() + ' words cached offline in IndexedDB' : 'IndexedDB syncing...'}`
              : `Offline · ${cachedWordsCount.toLocaleString()} words loaded from IndexedDB`
          }
        >
          {isOnline ? (
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <WifiOff className="w-3.5 h-3.5 text-amber-600" />
          )}
          <span className="hidden lg:inline font-bold">
            {isOnline ? 'Online' : 'Offline'}
          </span>
          {cachedWordsCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] bg-emerald-100/80 text-emerald-900 px-1.5 py-0.5 rounded-md font-bold">
              <Database className="w-2.5 h-2.5 text-emerald-700" />
              <span>{cachedWordsCount >= 1000 ? `${(cachedWordsCount / 1000).toFixed(0)}k+` : cachedWordsCount}</span>
            </span>
          )}
        </div>

        {/* PWA Install Button (Icon Only) */}
        {canInstall && (
          <button
            onClick={promptInstall}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-2xs transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 border border-emerald-500/40"
            title="Install Hor Katha Suite App on Device"
            aria-label="Install App"
          >
            <Download className="w-4 h-4 text-white" />
          </button>
        )}

        {isInstalled && (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-emerald-600 bg-emerald-50 border border-emerald-200 shadow-2xs"
            title="Hor Katha Suite is installed"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
        )}
      </div>
    </>
  );
};
