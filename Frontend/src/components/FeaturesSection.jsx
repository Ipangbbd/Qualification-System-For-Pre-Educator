import React from 'react'

export default function FeaturesSection() {
  const features = [
    {
      title: 'Progres Transparan',
      description: 'Lihat status lolos/tidak lolos setiap tahapan secara real-time',
      icon: '◉'
    },
    {
      title: 'Jadwal Fleksibel',
      description: 'Pilih jadwal tes yang sesuai dengan kesibukan Anda',
      icon: '⚡'
    },
    {
      title: 'Kesempatan Mengulang',
      description: 'Tidak lolos? Sistem memberi kesempatan kedua dengan jeda waktu',
      icon: '↻'
    },
    {
      title: 'Hasil Komprehensif',
      description: 'Dapatkan evaluasi lengkap setelah menyelesaikan semua tahap',
      icon: '✓'
    }
  ]

  return (
    <section id="fitur" className="product-tile bg-canvas-parchment">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-display-lg font-sf-display mb-4">
          Kenapa Memilih EduQualify?
        </h2>
        
        <p className="text-lead text-ink-muted-80 mb-16 max-w-[640px] mx-auto">
          Proses kualifikasi yang dirancang untuk mendukung kesuksesan Anda menjadi pengajar profesional.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={
                `p-lg transition-all ${index === 0 ? 'md:col-span-3 md:row-span-2' : 'md:col-span-1'} bg-canvas-parchment rounded-card`
              }
            >
              <div className="mb-4 text-ink">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                  <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-tagline mb-3 text-ink">
                {feature.title}
              </h3>
              <p className="text-caption text-ink-muted-80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
