import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { HashRouter, Route, Routes } from 'react-router-dom'
import SanPhamPage from './sanpham/SanPhamPage.jsx'
import 'reset-css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SanPhamPage />
  </StrictMode>
)
