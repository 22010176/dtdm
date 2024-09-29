import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { HashRouter, Route, Routes } from 'react-router-dom'
import SanPhamPage from './pages/sanpham/SanPhamPage.jsx'
import HomePage from './pages/home/index.jsx'

import 'reset-css'
import './index.css'
import { BrowserRouter, HashRouter, Route, Router, Routes } from 'react-router-dom'
import ErrorPage from './pages/notFound/index.jsx'
import ThuocTinhPage from './pages/thuoctinh/index.jsx'
import TestPage from './pages/testPage/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sanpham' element={<SanPhamPage />} />
        <Route path='/thuoctinh' element={<ThuocTinhPage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode >
)
