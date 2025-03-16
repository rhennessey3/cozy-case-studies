
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
  // If we have the new modular sections, use them
  if (caseStudy.sections && caseStudy.sections.length > 0) {
    return (
      <>
        {/* Display Hero section */}
        <CaseStudyHero 
          title={caseStudy.title}
          coverImage={caseStudy.coverImage}
          category={caseStudy.category}
          objective="To create a sustainable packaging solution that reduces environmental impact while enhancing brand identity."
          approach="Utilizing eco-friendly materials and innovative design techniques to balance functionality and sustainability."
          results="30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution."
        />

        {/* Display all sections */}
        <CaseStudyIntro caseStudy={caseStudy} />
        <UserResearchSection caseStudy={caseStudy} />
        <UserNeedsSection caseStudy={caseStudy} />
        <UserFlowSection caseStudy={caseStudy} />
        <IterationSection caseStudy={caseStudy} />
        <PrototypingSection caseStudy={caseStudy} />

        {/* Also display any dynamic sections from Strapi if they exist */}
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
      <CaseStudyHero 
        title={caseStudy.title}
        coverImage={caseStudy.coverImage}
        category={caseStudy.category}
        objective="To create a sustainable packaging solution that reduces environmental impact while enhancing brand identity."
        approach="Utilizing eco-friendly materials and innovative design techniques to balance functionality and sustainability."
        results="30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution."
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
