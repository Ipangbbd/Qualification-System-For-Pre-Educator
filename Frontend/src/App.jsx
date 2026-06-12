import React from 'react'
import GlobalNav from './components/GlobalNav'
import SubNav from './components/SubNav'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import TestStagesSection from './components/TestStagesSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <GlobalNav />
      <SubNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestStagesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
