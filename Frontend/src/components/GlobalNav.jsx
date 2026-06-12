import React, { useState } from 'react'

export default function GlobalNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-surface-black text-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 h-[44px] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-[12px] font-sf-text tracking-[-0.12px] hover:text-body-muted transition">
            EduQualify
          </a>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#fitur" className="text-[12px] font-sf-text tracking-[-0.12px] hover:text-body-muted transition">
              Fitur
            </a>
            <a href="#cara-kerja" className="text-[12px] font-sf-text tracking-[-0.12px] hover:text-body-muted transition">
              Cara Kerja
            </a>
            <a href="#testimoni" className="text-[12px] font-sf-text tracking-[-0.12px] hover:text-body-muted transition">
              Testimoni
            </a>
            <a href="#faq" className="text-[12px] font-sf-text tracking-[-0.12px] hover:text-body-muted transition">
              FAQ
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block btn-dark">
            Masuk
          </button>
          
          <button 
            className="md:hidden text-[12px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-black border-t border-ink-muted-80 py-4 px-4">
          <a href="#fitur" className="block py-2 text-[12px] hover:text-body-muted">Fitur</a>
          <a href="#cara-kerja" className="block py-2 text-[12px] hover:text-body-muted">Cara Kerja</a>
          <a href="#testimoni" className="block py-2 text-[12px] hover:text-body-muted">Testimoni</a>
          <a href="#faq" className="block py-2 text-[12px] hover:text-body-muted">FAQ</a>
          <button className="btn-dark w-full mt-4">Masuk</button>
        </div>
      )}
    </nav>
  )
}
