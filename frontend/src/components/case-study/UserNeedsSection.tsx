
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { useMediaQuery } from '@/hooks/use-media-query';

interface UserNeedsSectionProps {
  caseStudy: CaseStudy;
}

const UserNeedsSection: React.FC<UserNeedsSectionProps> = ({ caseStudy }) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return (
    <section className={`${isExtraSmallScreen ? 'py-4' : 'py-12'} bg-white`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" 
                alt="User needs analysis" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-8 mb-4 md:mb-0 order-1 md:order-2">
            <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-cozy-900 mb-2 md:mb-4`}>Right Aligned with Photo</h2>
            <p className={`${isExtraSmallScreen ? 'text-base' : 'text-lg'} text-cozy-700 mb-2 md:mb-4`}>
              {caseStudy.content.challenge}
            </p>
            <p className={`${isExtraSmallScreen ? 'text-base' : 'text-lg'} text-cozy-700 mb-0`}>
              Our approach: {caseStudy.content.approach}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserNeedsSection;
