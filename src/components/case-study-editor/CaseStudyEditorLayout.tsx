
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/Navbar';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';

interface CaseStudyEditorLayoutProps {
  children: React.ReactNode;
}

const CaseStudyEditorLayout: React.FC<CaseStudyEditorLayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');
  
  // Track drawer state
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
          !isSmallScreen && (isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]"),
          isSmallScreen && "pt-16"
        )}
      >
        <ScrollArea className="h-full">
          <section className="min-h-screen bg-white py-20">
            <div className="w-full px-4 md:px-6 lg:px-8">
              <div className="text-left max-w-screen-2xl mx-auto mb-6">
                {children}
              </div>
            </div>
          </section>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CaseStudyEditorLayout;
