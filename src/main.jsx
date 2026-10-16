import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Safety net: after a new deploy, a page that's still open may ask for a
// code chunk that no longer exists (new hashed filenames). Instead of showing
// a blank screen, reload once to pull the fresh version.
window.addEventListener('vite:preloadError', () => {
  if (!sessionStorage.getItem('hm_reloaded_once')) {
    sessionStorage.setItem('hm_reloaded_once', '1')
    window.location.reload()
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
