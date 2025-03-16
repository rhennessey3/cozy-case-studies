
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { useMediaQuery } from '@/hooks/use-media-query';

interface UserResearchSectionProps {
  caseStudy: CaseStudy;
}

const UserResearchSection: React.FC<UserResearchSectionProps> = ({ caseStudy }) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return (
    <section className={`${isExtraSmallScreen ? 'py-4' : 'py-12'} bg-[#f9f9f9]`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-4 md:mb-0">
            <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-cozy-900 mb-2 md:mb-4`}>User Research & Analysis</h2>
            <p className={`${isExtraSmallScreen ? 'text-base' : 'text-lg'} text-cozy-700 mb-0`}>
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
