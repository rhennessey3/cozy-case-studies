
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap, Heart, Users } from 'lucide-react';

const About = () => {
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
      <div 
        className={cn(
          "fixed inset-16 overflow-hidden max-w-[1800px] bg-card/50 backdrop-blur-sm z-10 transition-transform duration-300 ease-in-out",
          isFlyoutOpen ? "translate-x-72 border-l-0" : "translate-x-0"
        )}
      >
        <ScrollArea className="h-full">
          <div className="min-h-full">
            {/* About Hero Section */}
            <section className="h-screen flex">
              <div className="w-1/3 bg-gradient-to-r from-[#e85d59] to-[#e67573]"></div>
              <div className="w-2/3 bg-[#f5f5f5]"></div>
            </section>

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
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default About;
