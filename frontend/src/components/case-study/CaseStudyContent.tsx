
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import CaseStudyIntro from './CaseStudyIntro';
import UserResearchSection from './UserResearchSection';
import UserNeedsSection from './UserNeedsSection';
import UserFlowSection from './UserFlowSection';
import IterationSection from './IterationSection';
import PrototypingSection from './PrototypingSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import DynamicSection from './DynamicSection';
import CaseStudyHero from './CaseStudyHero';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ caseStudy }) => {
  // Find hero section data if it exists in sections
  const heroSection = caseStudy.sections?.find(section => section.__component === 'case-study.hero');
  
  // If we have the new modular sections, use them
  if (caseStudy.sections && caseStudy.sections.length > 0) {
    return (
      <>
        {/* Display Hero section */}
        <CaseStudyHero 
          title={heroSection?.casestudytitle || caseStudy.title}
          coverImage={caseStudy.coverImage}
          category={caseStudy.category}
          objective={heroSection?.objectiveparagraph || caseStudy.content.challenge}
          approach={heroSection?.approachparagraph || caseStudy.content.approach}
          results={heroSection?.resultsparagraph || caseStudy.content.results}
          objectiveHeading={heroSection?.objectiveheading || "Objective"}
          approachHeading={heroSection?.approachheading || "Approach"}
          resultsHeading={heroSection?.resultsheading || "Results"}
        />

        {/* Display dynamic sections from Strapi */}
        {caseStudy.sections
          .filter(section => section.__component !== 'case-study.hero') // Skip hero section as it's already displayed
          .map((section, index) => (
            <DynamicSection key={section.id || index} section={section} />
          ))}
        
        <ContactSection />
        <Footer />
      </>
    );
  }
  
  // Fallback to the original structure
  return (
    <>
      <CaseStudyHero 
        title={caseStudy.title}
        coverImage={caseStudy.coverImage}
        category={caseStudy.category}
        objective={caseStudy.content.challenge}
        approach={caseStudy.content.approach}
        results={caseStudy.content.results}
      />
      <CaseStudyIntro caseStudy={caseStudy} />
      <UserResearchSection caseStudy={caseStudy} />
      <UserNeedsSection caseStudy={caseStudy} />
      <UserFlowSection caseStudy={caseStudy} />
      <IterationSection caseStudy={caseStudy} />
      <PrototypingSection caseStudy={caseStudy} />
      <ContactSection />
      <Footer />
    </>
  );
};

export default CaseStudyContent;
