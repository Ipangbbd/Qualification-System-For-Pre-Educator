import React from 'react'

export default function Footer() {
  const footerLinks = {
    'Untuk Anda': ['Mulai Tes', 'Cara Kerja', 'Jadwal Tes', 'FAQ'],
    'Dukungan': ['Pusat Bantuan', 'Kontak Kami', 'Panduan', 'Video Tutorial'],
    'Tentang': ['Tentang Kami', 'Blog', 'Karir', 'Press Kit'],
    'Legal': ['Syarat & Ketentuan', 'Kebijakan Privasi', 'Cookie Policy', 'Lisensi']
  }

  return (
    <footer className="bg-canvas-parchment py-[32px] px-4 border-t border-surface-chip">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-caption-strong text-ink mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href="#" 
                      className="text-fine-print text-ink-muted-48 hover:text-ink transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-surface-chip pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-fine-print text-ink-muted-48">
              © 2026 EduQualify. Platform Kualifikasi Tenaga Pengajar.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="text-fine-print text-ink-muted-48 hover:text-ink transition">
                Indonesia
              </a>
              <a href="#" className="text-fine-print text-ink-muted-48 hover:text-ink transition">
                Bahasa Indonesia
              </a>
            </div>
          </div>

          <p className="text-fine-print text-ink-muted-48 mt-3 text-center md:text-left">
            Platform ini menggunakan sistem penilaian yang objektif dan terstandar 
            untuk memastikan kualitas tenaga pengajar di seluruh Indonesia.
          </p>
        </div>
      </div>
    </footer>
  )
}
