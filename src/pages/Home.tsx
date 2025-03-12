
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import ContactSection from '@/components/sections/ContactSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  useEffect(() => {
    const handleBodyClassChange = () => {
      setIsDrawerOpen(document.body.classList.contains('drawer-open'));
    };
    
    const observer = new MutationObserver(handleBodyClassChange);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar className="fixed top-0 left-0 right-0" />
      <div 
        className={cn(
          "fixed inset-0 overflow-hidden max-w-[1800px] transition-all duration-300 ease-in-out z-30",
          isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]"
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
