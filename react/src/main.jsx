import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './sanpham/App.jsx'
import 'reset-css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
