
import React from 'react';

const HeroSection = () => {
  return (
    <section className="h-screen flex">
      <div className="w-1/3 bg-gradient-to-r from-[#e85d59] to-[#e67573]"></div>
      <div className="w-2/3 bg-[#f5f5f5] flex items-center justify-center">
        <div className="max-w-lg px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Creative Solutions for Modern Challenges</h1>
          <p className="text-lg md:text-xl text-gray-600">
            We craft innovative solutions that transform ideas into impactful experiences, 
            helping businesses achieve their goals in today's digital landscape.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
