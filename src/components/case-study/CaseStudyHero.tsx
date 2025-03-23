
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
  
  // Hardcoded text for all case studies
  const objective = "The existing app had a complex navigation structure, outdated UI, and was difficult for new users to learn. The client wanted to modernize the experience while ensuring all existing functionality remained accessible.";
  const approach = "We conducted extensive user research and workshops to identify pain points, then created a simplified information architecture and design system that maintained feature parity while significantly improving usability.";
  const results = "The redesigned app saw a 42% increase in daily active users, 68% reduction in customer support tickets, and a 4.8/5 rating in app stores, up from 3.2/5 previously.";
  
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
