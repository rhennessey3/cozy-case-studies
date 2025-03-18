
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex">
      <Navbar />
      <div className="flex-1 ml-[4.5rem]">
        <HeroSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
