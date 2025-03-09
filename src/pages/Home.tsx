
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CaseStudiesGrid />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;
