import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { THEMES } from './constants/themes'
import './index.css'
import { loadThemeId } from './utils/storage'

// 初回描画前にテーマを適用（色のちらつきを防ぐ）
const initialTheme = THEMES[loadThemeId()]
if (initialTheme) {
  Object.entries(initialTheme.vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
