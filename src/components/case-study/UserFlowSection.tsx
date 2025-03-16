
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { useMediaQuery } from '@/hooks/use-media-query';

interface UserFlowSectionProps {
  caseStudy: CaseStudy;
}

const UserFlowSection: React.FC<UserFlowSectionProps> = ({ caseStudy }) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return (
    <section className={`${isExtraSmallScreen ? 'py-8' : 'py-16'} bg-[#f9f9f9]`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-cozy-900 mb-4`}>Solution Design</h2>
            <p className="text-lg text-cozy-700 mb-6">
              {caseStudy.content.solution}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800" 
                alt="Solution design and user flows" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserFlowSection;
