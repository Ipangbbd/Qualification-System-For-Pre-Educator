import React from 'react'

export default function HeroSection() {
  return (
    <section className="product-tile bg-canvas pb-0">
      <div className="max-w-[980px] mx-auto">
        <h1 className="text-hero font-sf-display mb-4">
          Wujudkan Karir Mengajar<br />Impian Anda
        </h1>
        
        <p className="text-lead text-ink-muted-80 mb-8 max-w-[640px] mx-auto">
          Buktikan kompetensi Anda melalui tes kualifikasi yang transparan. 
          Pantau progres, lihat hasil, dan raih sertifikasi pengajar profesional.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="btn-primary">
            Mulai Tes Kualifikasi
          </button>
          <a href="#cara-kerja" className="btn-secondary">
            Lihat Cara Kerja
          </a>
        </div>

        {/* Dashboard Product Showcase */}
        <div className="mt-16 pb-section product-shadow max-w-[1200px] mx-auto">
          <div className="bg-surface-tile-1 rounded-lg overflow-hidden border border-surface-tile-3">
            {/* Dashboard Header */}
            <div className="bg-surface-tile-2 px-6 py-4 border-b border-surface-tile-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
                </div>
                <span className="text-caption text-body-muted">Dashboard Kualifikasi</span>
                <div className="w-16"></div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-display-md text-white mb-2">Halo, Budi Santoso</h3>
                  <p className="text-body text-body-muted">Status: Tahap 2 - Tes Technical Skill</p>
                </div>
                <div className="bg-primary/20 rounded-pill px-4 py-2">
                  <span className="text-caption-strong text-primary-dark">In Progress</span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-surface-tile-2 rounded-lg p-6 border-2 border-primary">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-caption-strong">✓</div>
                    <span className="text-caption-strong text-white">Tahap 1</span>
                  </div>
                  <h4 className="text-body-strong text-white mb-2">Tes Kemampuan Dasar</h4>
                  <p className="text-caption text-body-muted mb-3">IQ & EQ Assessment</p>
                  <div className="bg-primary/20 rounded-sm px-3 py-1 inline-block">
                    <span className="text-caption text-primary-dark">Lolos</span>
                  </div>
                </div>

                <div className="bg-surface-tile-2 rounded-lg p-6 border-2 border-primary-dark">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center text-white text-caption-strong">2</div>
                    <span className="text-caption-strong text-primary-dark">Tahap 2</span>
                  </div>
                  <h4 className="text-body-strong text-white mb-2">Tes Technical Skill</h4>
                  <p className="text-caption text-body-muted mb-3">Interview Scheduled</p>
                  <div className="bg-primary-dark/20 rounded-sm px-3 py-1 inline-block">
                    <span className="text-caption text-primary-dark">15 Juni 2026</span>
                  </div>
                </div>

                <div className="bg-surface-tile-2/50 rounded-lg p-6 border border-surface-tile-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-surface-tile-3 flex items-center justify-center text-body-muted text-caption-strong">3</div>
                    <span className="text-caption text-body-muted">Tahap 3</span>
                  </div>
                  <h4 className="text-body-strong text-body-muted mb-2">Tes Praktik Mengajar</h4>
                  <p className="text-caption text-body-muted mb-3">Locked</p>
                  <div className="bg-surface-tile-3 rounded-sm px-3 py-1 inline-block">
                    <span className="text-caption text-body-muted">Menunggu</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button className="bg-primary text-white rounded-pill px-6 py-3 text-body-strong hover:bg-primary-focus transition">
                  Lanjutkan ke Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
