
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';

interface IterationSectionProps {
  caseStudy: CaseStudy;
}

const IterationSection: React.FC<IterationSectionProps> = ({ caseStudy }) => {
  return (
    <section className="py-16 bg-[#221F26]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-left">Implementation Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1642964057919-6c2ce94ffc13?auto=format&fit=crop&q=80&w=800" 
                alt="Initial wireframes" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#89c5cc] mb-4 text-left">Planning</h3>
            <p className="text-gray-300 text-left">
              {caseStudy.content.approach.split('.')[0]}. 
            </p>
          </div>
          
          <div className="flex flex-col items-start">
            <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" 
                alt="Development process" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#89c5cc] mb-4 text-left">Development</h3>
            <p className="text-gray-300 text-left">
              {caseStudy.content.solution.split('.')[0]}.
            </p>
          </div>
          
          <div className="flex flex-col items-start">
            <div className="w-full aspect-square mb-6 overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800" 
                alt="Final implementation" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#89c5cc] mb-4 text-left">Results</h3>
            <p className="text-gray-300 text-left">
              {caseStudy.content.results}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IterationSection;
