
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import TopNavbar from '@/components/TopNavbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap, Heart, Users } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import AboutSection from '@/components/AboutSection';

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
    <div className="min-h-screen bg-background">
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
          <section className="bg-[#221F26] text-white relative overflow-hidden">
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
            
            <div className="absolute right-0 bottom-0 md:w-1/2 h-full">
              <img 
                src="/lovable-uploads/3051eed2-7c1a-48bc-a7b3-18314dc8dc70.png" 
                alt="Professional headshot" 
                className="w-full h-full object-cover"
              />
            </div>
          </section>
          
          <section className="min-h-screen bg-white py-20">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-cozy-900 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-cozy-100">
                    <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-4 text-cozy-800">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-cozy-900">Collaboration</h3>
                    <p className="text-cozy-700">
                      We believe the best solutions emerge from diverse perspectives working together toward a common goal.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-cozy-100">
                    <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-4 text-cozy-800">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-cozy-900">Continuous Learning</h3>
                    <p className="text-cozy-700">
                      Our industry evolves rapidly, and we embrace the opportunity to grow and adapt alongside it.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-cozy-100">
                    <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-4 text-cozy-800">
                      <Heart className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-cozy-900">Empathy</h3>
                    <p className="text-cozy-700">
                      Understanding the needs, motivations, and pain points of users is fundamental to our design process.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-cozy-100">
                    <div className="w-12 h-12 bg-cozy-100 rounded-full flex items-center justify-center mb-4 text-cozy-800">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-cozy-900">Excellence</h3>
                    <p className="text-cozy-700">
                      We are committed to quality in everything we do, from the smallest details to the overall vision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <AboutSection />
        </ScrollArea>
      </div>
    </div>
  );
};

export default About;
