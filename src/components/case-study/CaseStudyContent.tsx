
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
    console.log("Using modular sections:", caseStudy.sections);
    
    return (
      <>
        {caseStudy.sections.map((section, index) => {
          // Check if this is a hero section component
          if (section.__component === 'case-study.hero') {
            return (
              <CaseStudyHero 
                key={section.id || index}
                title={caseStudy.title}
                coverImage={caseStudy.coverImage}
                category={caseStudy.category}
                objective={section.objective || "To create a sustainable packaging solution that reduces environmental impact while enhancing brand identity."}
                approach={section.approach || "Utilizing eco-friendly materials and innovative design techniques to balance functionality and sustainability."}
                results={section.results || "30% reduction in material usage, 45% increase in brand recognition, and 100% biodegradable packaging solution."}
              />
            );
          }
          
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
  
  console.log("No sections found, using fallback layout");
  
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
