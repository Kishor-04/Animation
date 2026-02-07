import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Valentine from './Valentine.jsx'
import RoseDay from './RoseDay.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Valentine />} />
        <Route path="/rose-day" element={<RoseDay />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
