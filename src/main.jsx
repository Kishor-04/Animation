import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Valentine from './Valentine.jsx'
import RoseDay from './RoseDay.jsx'
import ChocolateSilk from './ChocolateSilk.jsx'
import TeddyDay from './TeddyDay.jsx'
import TeddyJigsaw from './TeddyJigsaw.jsx'
import TeddyComplete from './TeddyComplete.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChocolateSilk />} />
        <Route path="/valentine" element={<Valentine />} />
        <Route path="/rose-day" element={<RoseDay />} />
        <Route path="/teddy-day" element={<TeddyDay />} />
        <Route path="/teddy-jigsaw" element={<TeddyJigsaw />} />
        <Route path="/teddy-complete" element={<TeddyComplete />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
