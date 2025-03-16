
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { useMediaQuery } from '@/hooks/use-media-query';

interface CaseStudyIntroProps {
  caseStudy: CaseStudy;
}

const CaseStudyIntro: React.FC<CaseStudyIntroProps> = ({ caseStudy }) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return (
    <section className={`${isExtraSmallScreen ? 'py-4' : 'py-8'} bg-white`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-4 md:mb-0">
            <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-cozy-900 mb-2 md:mb-4`}>{caseStudy.title}</h2>
            <h3 className={`${isExtraSmallScreen ? 'text-xl' : 'text-2xl'} font-medium mb-2 md:mb-4 text-cozy-600`}>{caseStudy.summary}</h3>
            
            <div className="prose prose-lg max-w-none">
              <p className={`text-left ${isExtraSmallScreen ? 'text-base' : ''} mb-2 md:mb-4`}>{caseStudy.content.intro}</p>
              <p className={`text-left ${isExtraSmallScreen ? 'text-base' : ''} mb-0`}>{caseStudy.content.challenge}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyIntro;
