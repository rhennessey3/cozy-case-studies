
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
          isSmallScreen && "pt-16" // Add top padding for the TopNavbar
        )}
      >
        <ScrollArea className="h-full">
          {/* About Hero Section */}
          <section className="bg-[#221F26] text-white">
            <div className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/3051eed2-7c1a-48bc-a7b3-18314dc8dc70.png" 
                    alt="Professional headshot" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <div className="flex flex-col space-y-8">
                  <div>
                    <h4 className="text-xl mb-2">Hi, I'm Sarah.</h4>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#6ECCC8]">
                      I bridge the gap between design, code, marketing, sales and end users.
                    </h1>
                    
                    <p className="text-lg text-[#C8C8C9] leading-relaxed">
                      At my core, I'm a product strategist at the intersection of product design, 
                      development, sales, and marketing. I help end users love products. 
                      I help clients explore end-user problems and guide teams to solutions. 
                      I currently live in San Francisco but available to travel, work in-house or remote.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-serif italic text-2xl">Sarah Johnson</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Values Section */}
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
          
          {/* About Approach Section */}
          <AboutSection />
        </ScrollArea>
      </div>
    </div>
  );
};

export default About;
