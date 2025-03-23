
import React from 'react';

interface IntroductionSectionProps {
  title: string;
  content: string;
  challengeContent?: string;
  approachContent?: string;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  title,
  content,
  challengeContent,
  approachContent
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">{title}</h2>
        
        <div className="prose max-w-none mb-8">
          <p className="text-lg text-gray-700">Our team was tasked with reimagining the digital experience for a major financial institution's mobile banking platform.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Challenge</h3>
            <p className="text-gray-700">The existing app had a complex navigation structure, outdated UI, and was difficult for new users to learn. The client wanted to modernize the experience while ensuring all existing functionality remained accessible.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Approach</h3>
            <p className="text-gray-700">We conducted extensive user research and workshops to identify pain points, then created a simplified information architecture and design system that maintained feature parity while significantly improving usability.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
