
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import StrapiConnectionTest from '@/components/StrapiConnectionTest';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <HeroSection />
      <AboutSection />
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Strapi CMS Connection</h2>
        <StrapiConnectionTest />
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
