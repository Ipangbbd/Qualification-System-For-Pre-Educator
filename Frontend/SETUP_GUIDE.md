# Quick Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Navigate to Frontend directory
```bash
cd Frontend
```

### 2. Install dependencies
```bash
npm install
```

This will install:
- React 18.3
- Vite 5.3
- Tailwind CSS 3.4
- PostCSS & Autoprefixer

### 3. Start development server
```bash
npm run dev
```

The app will be available at: `http://localhost:5173`

### 4. Build for production
```bash
npm run build
```

Output will be in the `dist/` folder.

### 5. Preview production build
```bash
npm run preview
```

## Project Structure

```
Frontend/
├── index.html                 # Entry HTML
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind + Apple design tokens
├── postcss.config.js         # PostCSS config
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Main app component
│   ├── index.css             # Global styles + Tailwind
│   └── components/
│       ├── GlobalNav.jsx
│       ├── SubNav.jsx
│       ├── HeroSection.jsx       ⭐ Dashboard mockup here
│       ├── FeaturesSection.jsx
│       ├── TestStagesSection.jsx
│       ├── TestimonialsSection.jsx
│       ├── CTASection.jsx
│       └── Footer.jsx
└── README.md
```

## Customization Tips

### Change Colors
Edit `tailwind.config.js` → `theme.extend.colors`

### Update Typography
Edit `tailwind.config.js` → `theme.extend.fontSize`

### Modify Dashboard Mockup
Edit `src/components/HeroSection.jsx` → Dashboard Content section

### Add More Testimonials
Edit `src/components/TestimonialsSection.jsx` → `testimonials` array

## Common Issues

### Port 5173 already in use?
```bash
# Kill the process or use different port
npm run dev -- --port 3000
```

### Tailwind styles not applying?
Make sure all component files are in `src/` folder and check `tailwind.config.js` content paths.

### Font not loading?
The design uses system fonts (`-apple-system, BlinkMacSystemFont`). On non-Apple systems, it will fallback to `system-ui`.

## Next Steps

- Update content in components to match your actual data
- Replace placeholder testimonials with real user quotes
- Add actual imagery for dashboard mockup (if needed)
- Connect to backend API for dynamic data
- Add analytics tracking

## Questions?

Check `LANDING_PAGE_SUMMARY.md` for design decisions and structure overview.
