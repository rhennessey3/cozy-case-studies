
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import ContactSection from '@/components/sections/ContactSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const Home = () => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  
  useEffect(() => {
    const handleBodyClassChange = () => {
      setIsFlyoutOpen(document.body.classList.contains('flyout-open'));
    };
    
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
          "fixed inset-16 overflow-hidden max-w-[1800px] bg-card/50 backdrop-blur-sm z-10 transition-transform duration-300 ease-in-out",
          isFlyoutOpen ? "translate-x-72 border-l-0" : "translate-x-0"
        )}
      >
        <ScrollArea className="h-full">
          <div className="min-h-full">
            <HeroSection />
            <section className="min-h-screen bg-white py-20 w-full">
              <CaseStudiesGrid />
            </section>
            <ContactSection />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Home;
