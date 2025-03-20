
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import TopNavbar from '@/components/TopNavbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import { cn } from '@/lib/utils';
import { CaseStudy } from '@/data/caseStudies';
import { getCaseStudies } from '@/services';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';

const CaseStudiesLanding = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');
  
  // Use React Query for better caching and auto-refresh
  const { data: caseStudies = [], isLoading, error, refetch } = useQuery({
    queryKey: ['caseStudies'],
    queryFn: getCaseStudies,
    staleTime: 1000 * 60, // Consider data stale after 1 minute
    refetchOnWindowFocus: true, // Refresh when user returns to the tab
  });
  
  useEffect(() => {
    // Force a refresh when the component mounts
    refetch();
    
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
  }, [refetch]);

  return (
    <div className="min-h-screen bg-background">
      {isSmallScreen ? (
        <TopNavbar className="fixed top-0 left-0 right-0 z-50" />
      ) : (
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white" />
      )}
      
      <div 
        className={cn(
          "fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out z-30",
          !isSmallScreen && (isDrawerOpen ? "pl-[364px]" : "pl-[5.95rem]"),
          isSmallScreen && "pt-16" // Add top padding for the TopNavbar
        )}
      >
        <ScrollArea className="h-full">
          <section className="min-h-screen bg-white py-20">
            <div className="w-full px-4 md:px-6 lg:px-8">
              <div className="text-left max-w-screen-2xl mx-auto mb-2">
                <h1 className="text-4xl md:text-5xl font-[900] mb-3 text-[#1b1b1b] pb-4 border-b border-[#EAEAEA] pl-4">CASE STUDIES.</h1>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <Skeleton key={n} className="w-full h-64" />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">Failed to load case studies</p>
                  <button 
                    onClick={() => refetch()}
                    className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <CaseStudiesGrid caseStudies={caseStudies} />
              )}
            </div>
          </section>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CaseStudiesLanding;
