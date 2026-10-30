import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fontes (já vêm junto no projeto, não dependem de internet)
import '@fontsource/cal-sans/400.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/courier-prime/400.css'
import '@fontsource/courier-prime/700.css'
import '@fontsource/pinyon-script/400.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
