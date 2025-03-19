
import React from 'react';
import './HeroSection.css'; // Import the CSS file for the gradient animation
import CompanyLogoBanner from '../CompanyLogoBanner';

const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col">
      <div className="flex flex-grow relative">
        <div className="gradient-background w-1/3 relative">
          {/* Gradient background */}
        </div>
        <div className="w-2/3 bg-[#f5f5f5] flex items-center justify-center relative">
          <div className="max-w-lg px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>Creative Solutions for Modern Challenges</h1>
            <p className="text-lg md:text-xl text-gray-600 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              We craft innovative solutions that transform ideas into impactful experiences, 
              helping businesses achieve their goals in today's digital landscape.
            </p>
          </div>
          
          {/* Added CompanyLogoBanner at the bottom right of the content area */}
          <div className="absolute bottom-0 right-0 left-0">
            <CompanyLogoBanner className="bg-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
