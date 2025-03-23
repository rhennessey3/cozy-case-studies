
import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import MobileHero from './hero/MobileHero';
import DesktopHero from './hero/DesktopHero';

export interface CaseStudyHeroProps {
  title: string;
  coverImage: string;
  category: string;
  objectiveHeading?: string;
  approachHeading?: string;
  resultsHeading?: string;
}

const CaseStudyHero = ({
  title,
  coverImage,
  category,
  objectiveHeading = "Challenge",
  approachHeading = "Approach",
  resultsHeading = "Impact"
}: CaseStudyHeroProps) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return (
    <section className={`${isExtraSmallScreen ? 'h-auto' : 'h-screen'} flex`}>
      <div className="w-full bg-[#f5f5f5] relative">
        {isExtraSmallScreen ? (
          <MobileHero 
            title={title}
            coverImage={coverImage}
            objectiveHeading={objectiveHeading}
            approachHeading={approachHeading}
            resultsHeading={resultsHeading}
          />
        ) : (
          <DesktopHero 
            title={title}
            coverImage={coverImage}
            objectiveHeading={objectiveHeading}
            approachHeading={approachHeading}
            resultsHeading={resultsHeading}
          />
        )}
      </div>
    </section>
  );
};

export default CaseStudyHero;
