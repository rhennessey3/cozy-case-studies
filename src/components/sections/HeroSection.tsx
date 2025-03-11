
import React from 'react';

const HeroSection = () => {
  return (
    <section className="h-screen flex">
      <div className="w-1/3 bg-gradient-to-r from-[#e85d59] to-[#e67573] flex items-center justify-center">
        <h1 className="font-custom text-4xl text-white font-bold">Your Text Here</h1>
      </div>
      <div className="w-2/3 bg-[#f5f5f5]"></div>
    </section>
  );
};

export default HeroSection;
