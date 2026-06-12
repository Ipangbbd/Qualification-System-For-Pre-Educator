import React from 'react'

export default function TestStagesSection() {
  const stages = [
    {
      stage: 'Tahap 1',
      title: 'Tes Kemampuan Dasar',
      description: 'Ukur kemampuan kognitif dan kecerdasan emosional Anda melalui tes IQ & EQ yang terstandar.',
      duration: '90 menit',
      features: ['Tes IQ terstandar', 'Penilaian EQ', 'Lihat status langsung']
    },
    {
      stage: 'Tahap 2',
      title: 'Tes Technical Skill',
      description: 'Tunjukkan keahlian mengajar Anda melalui interview dengan praktisi pendidikan berpengalaman.',
      duration: '60 menit',
      features: ['Pilihan offline/online', 'Wawancara interaktif', 'Feedback konstruktif']
    },
    {
      stage: 'Tahap 3',
      title: 'Tes Praktik Mengajar',
      description: 'Demonstrasikan kemampuan mengajar Anda di hadapan audiens dan dapatkan evaluasi menyeluruh.',
      duration: '45 menit',
      features: ['Simulasi kelas nyata', 'Evaluasi dari audiens', 'Sertifikasi final']
    }
  ]

  return (
    <section id="cara-kerja" className="product-tile bg-surface-tile-1 text-white">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-display-lg font-sf-display mb-4">
          Cara Kerja Kualifikasi
        </h2>
        
        <p className="text-lead-airy text-body-muted mb-16 max-w-[640px] mx-auto">
          Tiga tahapan yang dirancang untuk membantu Anda menunjukkan kompetensi terbaik.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stages.map((item, index) => (
            <div 
              key={index}
              className="bg-surface-tile-2 rounded-lg border border-surface-tile-3 p-lg hover:border-primary-dark/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-caption-strong text-primary-dark">
                  {item.stage}
                </div>
                <div className="bg-surface-tile-3 rounded-sm px-3 py-1">
                  <span className="text-caption text-body-muted">{item.duration}</span>
                </div>
              </div>
              
              <h3 className="text-tagline mb-4">
                {item.title}
              </h3>
              
              <p className="text-body text-body-muted mb-6">
                {item.description}
              </p>

              <ul className="space-y-2">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="text-caption text-body-muted flex items-start gap-2">
                    <span className="text-primary-dark mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-surface-tile-2 rounded-md p-6 max-w-[840px] mx-auto border border-surface-tile-3">
          <p className="text-caption text-body-muted text-center">
            <span className="text-caption-strong text-white">Yang Perlu Anda Ketahui:</span> Anda dapat melihat status lolos/tidak lolos setelah setiap tahap. 
            Hasil skor lengkap dan sertifikasi akan tersedia setelah menyelesaikan ketiga tahapan. 
            Jika belum lolos, Anda dapat mengulang tes setelah periode persiapan yang ditentukan sistem.
          </p>
        </div>
      </div>
    </section>
  )
}
