
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="border border-border rounded-xl overflow-hidden shadow-md mx-auto max-w-[1800px] bg-card/50 backdrop-blur-sm">
        <div className="p-3 md:p-5 lg:p-8">
          <Navbar />
          <Hero />
          <CaseStudiesGrid />
          <AboutSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
