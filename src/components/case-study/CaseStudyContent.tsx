
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
        {caseStudy.sections.map((section, index) => (
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
