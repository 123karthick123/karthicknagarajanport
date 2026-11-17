import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './theme/ThemeProvider'
import './index.css'

const host = document.getElementById('root')
if (!host) throw new Error('#root element is missing from index.html')

createRoot(host).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
