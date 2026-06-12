import React from 'react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Wijaya',
      role: 'Pengajar Matematika',
      image: '👩‍🏫',
      quote: 'Proses kualifikasi yang transparan dan terstruktur. Saya bisa melihat perkembangan saya di setiap tahap dan merasa lebih percaya diri.',
      rating: 5
    },
    {
      name: 'Andi Pratama',
      role: 'Pengajar Bahasa Inggris',
      image: '👨‍🏫',
      quote: 'Platform yang user-friendly. Jadwal tes yang fleksibel membantu saya mengikuti kualifikasi tanpa mengganggu pekerjaan sehari-hari.',
      rating: 5
    },
    {
      name: 'Dina Kusuma',
      role: 'Pengajar Sains',
      image: '👩‍🔬',
      quote: 'Feedback yang saya terima sangat membantu. Meskipun tidak lolos di tahap pertama, saya bisa belajar dan berhasil di percobaan kedua.',
      rating: 5
    }
  ]

  return (
    <section className="product-tile bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-display-lg font-sf-display mb-4">
          Cerita dari Pengajar
        </h2>
        
        <p className="text-lead text-ink-muted-80 mb-16 max-w-[640px] mx-auto">
          Ribuan pengajar telah menyelesaikan kualifikasi dan memulai karir mengajar mereka.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-surface-pearl rounded-lg p-lg border border-hairline"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-display-lg">
                  {testimonial.image}
                </div>
                <div>
                  <div className="text-body-strong text-ink">
                    {testimonial.name}
                  </div>
                  <div className="text-caption text-ink-muted-80">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>

              <p className="text-body text-ink-muted-80">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-caption text-ink-muted-80">
            Bergabung dengan <span className="text-caption-strong text-primary">2,500+ pengajar</span> yang telah tersertifikasi melalui EduQualify
          </p>
        </div>
      </div>
    </section>
  )
}
