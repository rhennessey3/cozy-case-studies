
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';

interface UserResearchSectionProps {
  caseStudy: CaseStudy;
}

const UserResearchSection: React.FC<UserResearchSectionProps> = ({ caseStudy }) => {
  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-cozy-900 mb-4">User Research & Analysis</h2>
            <p className="text-lg text-cozy-700 mb-6">
              {caseStudy.content.approach}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800" 
                alt="User research process" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserResearchSection;
