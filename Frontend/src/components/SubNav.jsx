import React from 'react'

export default function SubNav() {
  return (
    <div className="bg-canvas-parchment/80 backdrop-blur-xl sticky top-[44px] z-40 border-b border-hairline">
      <div className="max-w-[1440px] mx-auto px-4 h-[52px] flex items-center justify-between">
        <h2 className="text-tagline font-sf-display">
          Kualifikasi Pengajar Profesional
        </h2>
        
        <button className="btn-primary hidden md:block">
          Daftar Gratis
        </button>
      </div>
    </div>
  )
}
