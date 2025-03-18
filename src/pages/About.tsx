
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import TopNavbar from '@/components/TopNavbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Separator } from '@/components/ui/separator';
import ContactSection from '@/components/sections/ContactSection';

const About = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  
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
    <div className="min-h-screen bg-background flex flex-col">
      {isSmallScreen ? (
        <TopNavbar className="fixed top-0 left-0 right-0 z-50" />
      ) : (
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white" />
      )}
      
      <div 
        className={cn(
          "fixed inset-0 overflow-hidden transition-all duration-300 ease-in-out",
          !isSmallScreen && (isDrawerOpen ? "pl-[280px]" : "pl-[4.5rem]"),
          isSmallScreen && "pt-16"
        )}
      >
        <ScrollArea className="h-full">
          <section className="bg-[#221F26] text-white relative overflow-hidden pt-8 md:pt-10">
            <div className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col space-y-8">
                  <div>
                    <h4 className="text-xl mb-2">Hi, I'm Rick.</h4>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#6ECCC8]">
                      I bridge the gap between design, code, marketing, sales and end users.
                    </h1>
                    
                    <p className="text-lg text-[#C8C8C9] leading-relaxed">
                      10 years of experience in product management and UX strategy. My work focuses on user-driven product development that balances business needs with real-world usability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute right-0 bottom-0 md:w-2/5 h-4/5">
              <img 
                src="/lovable-uploads/3051eed2-7c1a-48bc-a7b3-18314dc8dc70.png" 
                alt="Professional headshot" 
                className="w-full h-full object-cover"
              />
            </div>
          </section>
          
          {/* Experience Statistics Section */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
              <Separator className="mb-16 bg-gray-200" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                <div className="text-center md:text-left">
                  <h2 className="text-6xl font-bold text-gray-800">10</h2>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-6xl font-bold text-gray-800">4</h2>
                  <p className="text-gray-600">years remote<br />management experience</p>
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-6xl font-bold text-gray-800">6570+</h2>
                  <p className="text-gray-600">Project<br />Management<br />Hours</p>
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-6xl font-bold text-gray-800">6210</h2>
                  <p className="text-gray-600">Business<br />Analyst<br />Hours</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact Section */}
          <ContactSection />
          
        </ScrollArea>
      </div>
    </div>
  );
};

export default About;
