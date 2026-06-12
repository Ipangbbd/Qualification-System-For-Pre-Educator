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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-canvas rounded-lg p-lg border border-hairline hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="text-display-lg text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-tagline mb-3">
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
