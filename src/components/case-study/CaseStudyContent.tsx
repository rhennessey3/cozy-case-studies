
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

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ caseStudy }) => {
  // If we have the new modular sections, use them
  if (caseStudy.sections && caseStudy.sections.length > 0) {
    return (
      <>
        {caseStudy.sections.map((section, index) => {
          // Create a modified section for the second section with no image
          if (index === 1) {
            const modifiedSection = {
              ...section,
              image: undefined // Remove the image for the second section
            };
            return <DynamicSection key={section.id || index} section={modifiedSection} />;
          }
          return <DynamicSection key={section.id || index} section={section} />;
        })}
        <ContactSection />
        <Footer />
      </>
    );
  }
  
  // Fallback to the original structure
  return (
    <>
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
