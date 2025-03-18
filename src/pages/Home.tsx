
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
