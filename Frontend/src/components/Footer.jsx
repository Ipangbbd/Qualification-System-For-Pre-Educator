import React from 'react'

export default function Footer() {
  const footerLinks = {
    'Untuk Anda': ['Mulai Tes', 'Cara Kerja', 'Jadwal Tes', 'FAQ'],
    'Dukungan': ['Pusat Bantuan', 'Kontak Kami', 'Panduan', 'Video Tutorial'],
    'Tentang': ['Tentang Kami', 'Blog', 'Karir', 'Press Kit'],
    'Legal': ['Syarat & Ketentuan', 'Kebijakan Privasi', 'Cookie Policy', 'Lisensi']
  }

  return (
    <footer className="bg-canvas-parchment py-[64px] px-4 border-t border-hairline">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-caption-strong text-ink mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href="#" 
                      className="text-body text-ink-muted-80 hover:text-ink transition leading-[2.41]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-hairline pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-fine-print text-ink-muted-48">
              © 2026 EduQualify. Platform Kualifikasi Tenaga Pengajar.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="text-fine-print text-ink-muted-48 hover:text-ink transition">
                Indonesia
              </a>
              <a href="#" className="text-fine-print text-ink-muted-48 hover:text-ink transition">
                Bahasa Indonesia
              </a>
            </div>
          </div>
          
          <p className="text-fine-print text-ink-muted-48 mt-4 text-center md:text-left">
            Platform ini menggunakan sistem penilaian yang objektif dan terstandar 
            untuk memastikan kualitas tenaga pengajar di seluruh Indonesia.
          </p>
        </div>
      </div>
    </footer>
  )
}
