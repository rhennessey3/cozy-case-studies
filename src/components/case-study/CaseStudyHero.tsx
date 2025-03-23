
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
  objectiveHeading?: string;
  approachHeading?: string;
  resultsHeading?: string;
}

const CaseStudyHero = ({
  title,
  coverImage,
  category,
  objective = "Honeybaked Ham was looking for a new revenue stream and wanted to test digital gift cards as a way to make that happen.",
  approach = "Alongside my team we created a digital platform that transforms the way people are capable of fundraising. Utilizing the latest in payment gateway infrastructure and digital fulfillment we were able to increase the opportunity to revenue by over 200%.",
  results = "30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution.",
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
