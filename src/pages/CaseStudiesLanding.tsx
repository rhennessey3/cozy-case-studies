import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import { cn } from '@/lib/utils';
const CaseStudiesLanding = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    const handleBodyClassChange = () => {
      setIsDrawerOpen(document.body.classList.contains('drawer-open'));
    };
    const observer = new MutationObserver(handleBodyClassChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return <div className="min-h-screen bg-background">
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white" />
      <div className={cn("fixed inset-0 overflow-hidden max-w-[1800px] transition-all duration-300 ease-in-out", isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]")}>
        <ScrollArea className="h-full pt-16 py-0">
          <section className="min-h-screen bg-white py-20">
            <div className="w-full px-4 md:px-6 lg:px-8">
              <div className="text-left max-w-screen-2xl mx-auto mb-2">
                <h1 className="text-4xl md:text-5xl font-[900] mb-3 text-[#1b1b1b] pb-4 border-b border-[#EAEAEA] pl-4">CASE STUDIES.</h1>
              </div>
              
              <CaseStudiesGrid />
            </div>
          </section>
        </ScrollArea>
      </div>
    </div>;
};
export default CaseStudiesLanding;