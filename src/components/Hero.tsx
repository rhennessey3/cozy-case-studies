
import React from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToStudies = () => {
    const element = document.getElementById('case-studies');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 md:py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-cozy-900 animate-fade-in">
            Showcasing Our Best Work
          </h1>
          <p className="text-xl md:text-2xl text-cozy-700 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A collection of carefully crafted case studies highlighting our design and development expertise.
          </p>
          <Button 
            className="mt-4 animate-fade-in bg-cozy-800 hover:bg-cozy-900 text-white"
            onClick={scrollToStudies}
            style={{ animationDelay: '0.4s' }}
          >
            View Case Studies <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-b from-cozy-50 to-background"></div>
      
      {/* Black bar taking up 20% of the space at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-black"></div>
    </section>
  );
};

export default Hero;
