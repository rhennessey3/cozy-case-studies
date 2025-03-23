
import React from 'react';

const ProfileHeroSection = () => {
  return (
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
  );
};

export default ProfileHeroSection;
