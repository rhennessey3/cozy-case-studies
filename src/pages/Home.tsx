
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import ContactSection from '@/components/sections/ContactSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CaseStudy } from '@/data/caseStudies';
import { getCaseStudies } from '@/services/strapiService';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  
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
  
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (error) {
        console.error('Failed to fetch case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
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
              {loading ? (
                <div className="w-full px-4 md:px-6 lg:px-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <Skeleton key={n} className="w-full h-64" />
                    ))}
                  </div>
                </div>
              ) : (
                <CaseStudiesGrid caseStudies={caseStudies} />
              )}
            </section>
            <ContactSection />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Home;
