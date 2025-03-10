
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
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      <div className="fixed inset-16 border border-border rounded-xl overflow-hidden shadow-md max-w-[1800px] bg-card/50 backdrop-blur-sm z-10 mt-16">
        <ScrollArea className="h-full">
          <div className="p-3 md:p-5 lg:p-8">
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
