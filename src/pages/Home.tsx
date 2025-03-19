
import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import TopNavbar from '@/components/TopNavbar';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

const Home: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {isDesktop ? (
        <div className="flex">
          <Navbar />
          <div className="flex-1">
            <HeroSection />
            <AboutSection />
            <ContactSection />
          </div>
        </div>
      ) : (
        <>
          <TopNavbar />
          <HeroSection />
          <AboutSection />
          <ContactSection />
        </>
      )}
    </div>
  );
};

export default Home;
