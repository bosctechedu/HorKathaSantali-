/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Hor Katha Suite — Offline status and sync hook
 */

import { useState, useEffect, useCallback } from 'react';
import { getOfflineCacheStats } from '../utils/indexedDB';

export interface OfflineStatus {
  isOnline: boolean;
  isOfflineReady: boolean;
  cachedWordsCount: number;
  lastSyncTime: number | null;
  refreshStats: () => Promise<void>;
}

export function useOfflineStatus(): OfflineStatus {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  const [cachedWordsCount, setCachedWordsCount] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<number | null>(null);
  const [isOfflineReady, setIsOfflineReady] = useState<boolean>(false);

  const refreshStats = useCallback(async () => {
    try {
      const stats = await getOfflineCacheStats();
      setCachedWordsCount(stats.wordCount);
      setLastSyncTime(stats.lastSyncTime);
      setIsOfflineReady(stats.isReady);
    } catch {
      // safe fallback
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      refreshStats();
    };

    const handleOffline = () => {
      setIsOnline(false);
      refreshStats();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    refreshStats();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refreshStats]);

  return {
    isOnline,
    isOfflineReady,
    cachedWordsCount,
    lastSyncTime,
    refreshStats
  };
}
