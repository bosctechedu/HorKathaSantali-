import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker. A new version installs quietly in the background; the page is NOT reloaded
// while someone is reading. It switches over the next time the tab is hidden (or right away if the
// update lands in the first 3 s after opening, before the user has done anything).
const swOpenedAt = Date.now();
let swUserActed = false;
['pointerdown', 'keydown', 'scroll'].forEach((ev) => window.addEventListener(ev, () => { swUserActed = true; }, { once: true, passive: true }));
registerSW({
  onNeedReload() {
    if (!swUserActed && Date.now() - swOpenedAt < 3000) { window.location.reload(); return; }
    const onHide = () => {
      if (document.visibilityState === 'hidden') {
        document.removeEventListener('visibilitychange', onHide);
        window.location.reload();
      }
    };
    document.addEventListener('visibilitychange', onHide);
  },
  onOfflineReady() {
    console.log('Hor Katha Suite: App ready for offline usage via Service Worker & IndexedDB');
  },
});

// Lazy chunks are no longer all precached: if a tab opened before a deploy asks for an old chunk that is
// gone, reload once to pick up the new build instead of showing an error.
window.addEventListener('vite:preloadError', (event) => {
  try {
    if (sessionStorage.getItem('hks_chunk_reload') === '1') return;
    sessionStorage.setItem('hks_chunk_reload', '1');
  } catch { /* storage blocked */ }
  event.preventDefault();
  window.location.reload();
});
window.addEventListener('load', () => {
  setTimeout(() => { try { sessionStorage.removeItem('hks_chunk_reload'); } catch { /* ignore */ } }, 10000);
});

// Keep an early install prompt for the lazy-loaded PwaInstallPrompt banner
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  (window as Window & { __hkInstallPrompt?: Event | null }).__hkInstallPrompt = e;
});

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
