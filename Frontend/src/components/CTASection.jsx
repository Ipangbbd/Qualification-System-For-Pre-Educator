import React from 'react'

export default function CTASection() {
  return (
    <section className="product-tile bg-canvas-parchment">
      <div className="max-w-[980px] mx-auto">
        <h2 className="text-display-lg font-sf-display mb-4">
          Mulai Perjalanan Anda<br />Hari Ini
        </h2>
        
        <p className="text-lead text-ink-muted-80 mb-8 max-w-[640px] mx-auto">
          Daftar sekarang dan ambil langkah pertama menuju karir mengajar yang profesional dan tersertifikasi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="btn-primary text-[18px] font-light px-[28px] py-[14px]">
            Daftar Gratis
          </button>
          <a href="#cara-kerja" className="text-primary text-body hover:text-primary-focus transition">
            Lihat cara kerjanya →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-display-md text-primary mb-3">
              15 mnt
            </div>
            <div className="text-caption-strong text-ink mb-2">
              Registrasi Cepat
            </div>
            <p className="text-caption text-ink-muted-80">
              Isi profil dan mulai tes kualifikasi dalam hitungan menit
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-display-md text-primary mb-3">
              3 Hari
            </div>
            <div className="text-caption-strong text-ink mb-2">
              Hasil Maksimal
            </div>
            <p className="text-caption text-ink-muted-80">
              Selesaikan ketiga tahapan dan dapatkan hasil dalam 3 hari kerja
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-display-md text-primary mb-3">
              ∞
            </div>
            <div className="text-caption-strong text-ink mb-2">
              Akses Selamanya
            </div>
            <p className="text-caption text-ink-muted-80">
              Dashboard dan sertifikasi Anda dapat diakses kapan saja
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
