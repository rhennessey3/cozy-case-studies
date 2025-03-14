
import React from 'react';

const CaseStudyIntro = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" 
                alt="Fundraising platform development" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-8 mb-8 md:mb-0 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-cozy-900 mb-4">Turning Chaos into Opportunity</h2>
            <h3 className="text-2xl font-medium mb-6 text-cozy-600">Building a Streamlined Fundraising Platform</h3>
            
            <div className="inline-block bg-cozy-500 text-white px-3 py-1 text-sm rounded-md mb-6">
              Sustainability
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-left">Managing a fundraiser with pen and paper is inefficient, confusing, and time-consuming for everyone involved. Recognizing this challenge, <strong>HoneyBaked Ham</strong>, in collaboration with its gift card fulfillment agency, set out to create a <strong>modern, digital fundraising platform</strong> that is <strong>easy to use, trustworthy, and highly profitable</strong> for all stakeholders.</p>
              <br />
              <p className="text-left">The goal was clear: <strong>transition from paper-based fundraisers to a seamless online experience</strong>, reducing organizers' time to invest while unlocking a new revenue stream for HoneyBaked Ham.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyIntro;
