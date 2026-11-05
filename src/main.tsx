import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker with auto-reload upon updates
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('Hor Katha Suite: new offline content available, refreshing...');
    updateSW(true);
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
