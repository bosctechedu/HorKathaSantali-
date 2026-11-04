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

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
