
import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import MobileHero from './hero/MobileHero';
import DesktopHero from './hero/DesktopHero';

export interface CaseStudyHeroProps {
  title: string;
  coverImage: string;
  category: string;
  objective?: string;
  approach?: string;
  results?: string;
  // New fields from Strapi hero component
  objectiveHeading?: string;
  approachHeading?: string;
  resultsHeading?: string;
}

const CaseStudyHero = ({
  title,
  coverImage,
  category,
  objective = "To create a sustainable packaging solution that reduces environmental impact while enhancing brand identity.",
  approach = "Utilizing eco-friendly materials and innovative design techniques to balance functionality and sustainability.",
  results = "30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution.",
  objectiveHeading = "Objective",
  approachHeading = "Approach",
  resultsHeading = "Results"
}: CaseStudyHeroProps) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 450px)');
  
  return (
    <section className={`${isExtraSmallScreen ? 'h-auto' : 'h-screen'} flex`}>
      <div className="w-full bg-[#f5f5f5] relative">
        {isExtraSmallScreen ? (
          <MobileHero 
            title={title}
            coverImage={coverImage}
            objective={objective}
            approach={approach}
            results={results}
            objectiveHeading={objectiveHeading}
            approachHeading={approachHeading}
            resultsHeading={resultsHeading}
          />
        ) : (
          <DesktopHero 
            title={title}
            coverImage={coverImage}
            objective={objective}
            approach={approach}
            results={results}
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
