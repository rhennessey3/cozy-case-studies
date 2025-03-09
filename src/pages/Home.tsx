
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-4 md:inset-6 lg:inset-8 border border-border rounded-xl overflow-hidden shadow-md max-w-[1800px] bg-card/50 backdrop-blur-sm z-10">
        <ScrollArea className="h-full">
          <div className="p-3 md:p-5 lg:p-8">
            <Navbar />
            <Hero />
            <CaseStudiesGrid />
            <AboutSection />
            <Footer />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Home;
