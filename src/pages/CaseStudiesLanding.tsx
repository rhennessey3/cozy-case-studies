
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import { cn } from '@/lib/utils';

const CaseStudiesLanding = () => {
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
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white" />
      <ScrollArea className="h-full pt-16">
        <section className="min-h-screen bg-white py-20">
          <div className="w-full px-0">
            <div className="text-left max-w-screen-2xl mx-auto px-0 mb-8">
              <h1 className="text-4xl md:text-5xl font-[900] mb-3 text-[#1b1b1b]">CASE STUDIES.</h1>
            </div>
            
            <CaseStudiesGrid />
          </div>
        </section>
      </ScrollArea>
    </div>
  );
};

export default CaseStudiesLanding;
