
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import { useMediaQuery } from '@/hooks/use-media-query';

interface CaseStudyIntroProps {
  caseStudy: CaseStudy;
}

const CaseStudyIntro: React.FC<CaseStudyIntroProps> = ({ caseStudy }) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="w-full md:w-1/2 order-2 md:order-2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={caseStudy.coverImage} 
                alt={`${caseStudy.title} introduction`} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0 order-1 md:order-1">
            <h2 className={`${isExtraSmallScreen ? 'text-2xl' : 'text-3xl'} font-bold text-cozy-900 mb-4`}>{caseStudy.title}</h2>
            <h3 className={`${isExtraSmallScreen ? 'text-xl' : 'text-2xl'} font-medium mb-6 text-cozy-600`}>{caseStudy.summary}</h3>
            
            <div className="inline-block bg-cozy-500 text-white px-3 py-1 text-sm rounded-md mb-6">
              {caseStudy.category}
            </div>

            <div className="prose prose-lg max-w-none">
              <p className={`text-left ${isExtraSmallScreen ? 'text-base' : ''}`}>{caseStudy.content.intro}</p>
              <br />
              <p className={`text-left ${isExtraSmallScreen ? 'text-base' : ''}`}>{caseStudy.content.challenge}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyIntro;
