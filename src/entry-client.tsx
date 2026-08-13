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
  // Hydrate SSG
  hydrateRoot(rootElement, app)
}
