
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
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      <ScrollArea className="h-full pt-16">
        {/* Case Studies Content */}
        <section className="min-h-screen bg-white py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cozy-900">Case Studies</h1>
              <p className="text-xl text-cozy-700 max-w-3xl mx-auto">
                Explore our portfolio of successful projects and discover how we've helped clients achieve their goals.
              </p>
            </div>
            
            {/* Case Studies Grid */}
            <CaseStudiesGrid />
          </div>
        </section>
      </ScrollArea>
    </div>
  );
};

export default CaseStudiesLanding;
