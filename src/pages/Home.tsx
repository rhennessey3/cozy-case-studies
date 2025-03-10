
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const Home = () => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  
  useEffect(() => {
    const handleBodyClassChange = () => {
      setIsFlyoutOpen(document.body.classList.contains('flyout-open'));
    };
    
    // Use MutationObserver to watch for changes to body classes
    const observer = new MutationObserver(handleBodyClassChange);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      <div 
        className={cn(
          "fixed inset-16 border border-border rounded-xl overflow-hidden shadow-md max-w-[1800px] bg-card/50 backdrop-blur-sm z-10 mt-16 transition-transform duration-300 ease-in-out",
          isFlyoutOpen ? "translate-x-[4.5rem]" : "translate-x-0"
        )}
      >
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
