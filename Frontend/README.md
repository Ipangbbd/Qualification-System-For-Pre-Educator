# EduQualify Landing Page

Landing page user-oriented untuk platform kualifikasi tenaga pengajar. Dibangun dengan React, Vite, dan Tailwind CSS mengikuti Apple Design System — photography-first, minimalist, dengan dashboard mockup sebagai hero produk sentral.

## Fitur

- ✨ Design minimalis inspirasi Apple (user-centric)
- 🖼️ Dashboard mockup produk sentral (MacBook-style showcase)
- 🎨 Tailwind CSS dengan Apple design tokens
- ⚡ Vite untuk development yang cepat
- 📱 Fully responsive (mobile-first)
- 🎯 Komponen React modular

## Struktur Komponen

```
src/
├── components/
│   ├── GlobalNav.jsx            # Navigation bar atas (sticky black)
│   ├── SubNav.jsx               # Sub-nav dengan backdrop blur
│   ├── HeroSection.jsx          # Hero + Dashboard mockup showcase ⭐
│   ├── FeaturesSection.jsx      # 4 benefit cards untuk user
│   ├── TestStagesSection.jsx    # 3 tahapan tes (dark tile)
│   ├── TestimonialsSection.jsx  # User testimonials
│   ├── CTASection.jsx           # Final CTA dengan metrics
│   └── Footer.jsx               # Footer dengan link columns
├── App.jsx                      # Main app component
├── main.jsx                     # Entry point
└── index.css                    # Global styles + Tailwind utilities
```

## Dashboard Mockup

Dashboard kualifikasi ditampilkan sebagai produk sentral di hero section dengan:
- Window chrome (macOS-style red/yellow/green dots)
- Live progress tracker (3 tahapan)
- Status real-time untuk setiap tahap
- Visual state: Lolos ✓ / In Progress / Locked
- Apple product shadow untuk depth

## User Journey Focus

Landing page ini dirancang dari perspektif calon pengajar:

1. **Hero** - "Wujudkan Karir Mengajar Impian Anda"
2. **Dashboard Showcase** - Lihat produk yang akan mereka gunakan
3. **Benefits** - Progres transparan, jadwal fleksibel, kesempatan mengulang
4. **Cara Kerja** - 3 tahapan dijelaskan dengan durasi dan fitur
5. **Testimonials** - Cerita dari pengajar yang sudah lolos
6. **CTA** - Ajakan daftar dengan promise value (15 mnt registrasi, 3 hari hasil)

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Build untuk production:
```bash
npm run build
```

## Design System

### Warna Utama
- Primary Blue: `#0066cc` - untuk semua elemen interaktif
- Ink: `#1d1d1f` - text utama
- Canvas: `#ffffff` - background terang
- Canvas Parchment: `#f5f5f7` - background alternate
- Surface Tile 1: `#272729` - dark tile

### Typography
- Hero: 56px / 600 weight / -0.28px letter-spacing
- Display Large: 40px / 600 weight
- Display Medium: 34px / 600 weight (dashboard headlines)
- Lead: 28px / 400 weight
- Body: 17px / 400 weight / 1.47 line-height
- Caption: 14px / 400 weight

### Button Styles
- `.btn-primary` - Blue pill button (main CTA)
- `.btn-secondary` - Outline pill button
- `.btn-dark` - Dark utility button (nav actions)

### Product Shadow
- Only applied to dashboard mockup showcase
- `drop-shadow(0 5px 30px rgba(0, 0, 0, 0.22))`
- Gives MacBook-like elevation

## Content Structure

### Hero Dashboard Mockup
Menampilkan:
- Header user: "Halo, Budi Santoso"
- Status progres: "Tahap 2 - Tes Technical Skill"
- 3 cards tahapan dengan visual states berbeda:
  1. Tahap 1: Completed (✓) dengan border primary
  2. Tahap 2: Active (in progress) dengan border primary-dark
  3. Tahap 3: Locked (disabled state)
- CTA button: "Lanjutkan ke Interview"

### Tahapan Tes Kualifikasi
1. **Tes Kemampuan Dasar** (90 menit) - IQ & EQ
2. **Tes Technical Skill** (60 menit) - Interview (offline/online)
3. **Tes Praktik Mengajar** (45 menit) - Dengan audience

### User Benefits Highlighted
1. **Progres Transparan** - Status real-time setiap tahap
2. **Jadwal Fleksibel** - Pilih waktu yang sesuai
3. **Kesempatan Mengulang** - Retry dengan jeda waktu
4. **Hasil Komprehensif** - Evaluasi lengkap & sertifikasi

## Responsive Breakpoints

- Mobile: ≤640px (1-column, tight padding)
- Tablet: 641-1023px (2-column grids)
- Desktop: ≥1024px (3-4 column grids, full layout)
- Dashboard mockup scales fluidly across all sizes

## Tech Stack

- React 18.3
- Vite 5.3
- Tailwind CSS 3.4
- PostCSS + Autoprefixer

## License

Private - EduQualify Platform
