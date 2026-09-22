import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n/i18n'
import { UnheadProvider, createHead } from '@unhead/react/client'
import App from './App.tsx'

const head = createHead()
const rootElement = document.getElementById('root')!

const app = (
  <StrictMode>
    <UnheadProvider head={head}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UnheadProvider>
  </StrictMode>
)

if (rootElement.innerHTML === '<!--ssr-outlet-->') {
  // Fallback to CSR if not pre-rendered
  createRoot(rootElement).render(app)
} else {
  // Hydrate SSG with graceful recoverable error handling to avoid full root teardown
  hydrateRoot(rootElement, app, {
    onRecoverableError(error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Recoverable hydration note:', error);
      }
    }
  })
}

// Service worker update & cache management
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // Auto-reload once when a new service worker version activates
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) {
        reg.update().catch(() => {});
      }
    });

    // Clean up oversized legacy wasm caches from browser CacheStorage
    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          // If cache name indicates previous bloated version, prune it
          if (name.includes('workbox-precache') && !name.includes('-v2')) {
            caches.open(name).then((cache) => {
              cache.keys().then((requests) => {
                for (const req of requests) {
                  if (req.url.endsWith('.wasm')) {
                    cache.delete(req);
                  }
                }
              });
            });
          }
        }
      }).catch(() => {});
    }
  });
}
