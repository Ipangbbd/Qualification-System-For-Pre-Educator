import React, { useState } from 'react'
import GlobalNav from './components/GlobalNav'
import SubNav from './components/SubNav'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import TestStagesSection from './components/TestStagesSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

import MockAuth from './usermock/MockAuth'
import MockExam from './usermock/MockExam'
import UserDashboard from './usermock/UserDashboard'

function App() {
  const [route, setRoute] = useState('home')

  const navigate = (to) => setRoute(to)

  return (
    <div className="min-h-screen">
      <GlobalNav />
      <SubNav />
      <main>
        {route === 'home' && (
          <>
            <HeroSection onStart={() => navigate('mockauth')} />
            <FeaturesSection />
            <TestStagesSection />
            <TestimonialsSection />
            <CTASection onStart={() => navigate('mockauth')} />
          </>
        )}

        {route === 'mockauth' && (
          <MockAuth onComplete={() => navigate('dashboard')} onCancel={() => navigate('home')} />
        )}

        {route === 'exam' && (
          <MockExam onComplete={() => navigate('dashboard')} onCancel={() => navigate('dashboard')} />
        )}

        {route === 'dashboard' && (
          <UserDashboard onStartExam={() => navigate('exam')} onSignOut={() => { localStorage.removeItem('edu_user'); localStorage.removeItem('edu_examScore'); localStorage.removeItem('edu_token'); navigate('home') }} />
        )}

      </main>
      <Footer />
    </div>
  )
}

export default App
