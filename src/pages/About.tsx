
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap, Heart, Users } from 'lucide-react';

const About = () => {
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
        <ScrollArea className="h-full pt-16">
          {/* About Content */}
          <section className="min-h-screen bg-white py-20">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cozy-900">About Us</h1>
                <p className="text-xl text-cozy-700 max-w-3xl mx-auto">
                  We are a team of passionate designers and developers dedicated to creating meaningful digital experiences that make a difference.
                </p>
              </div>
              
              {/* Values Section */}
              <div className="mb-16">
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default About;
