
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
          <p className="text-lg text-gray-700">Honeybaked Ham was looking for a new revenue stream and wanted to test digital gift cards as a way to make that happen.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Challenge</h3>
            <p className="text-gray-700">Honeybaked Ham was looking for a new revenue stream and wanted to test digital gift cards as a way to make that happen.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Approach</h3>
            <p className="text-gray-700">Alongside my team we created a digital platform that transforms the way people are capable of fundraising. Utilizing the latest in payment gateway infrastructure and digital fulfillment we were able to increase the opportunity to revenue by over 200%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
