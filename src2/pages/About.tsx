
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      
      {/* Hero Section */}
      <section className="bg-[#221F26] text-white">
        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/0f9f2e02-4186-40ca-a4e5-6519d4ff7ea2.png" 
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
      
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p>Our case studies platform showcases the best work from our design and development team.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
