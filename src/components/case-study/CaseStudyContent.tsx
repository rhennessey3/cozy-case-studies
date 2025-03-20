
import React, { useEffect, useState } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import CaseStudyIntro from './CaseStudyIntro';
import UserResearchSection from './UserResearchSection';
import UserNeedsSection from './UserNeedsSection';
import UserFlowSection from './UserFlowSection';
import IterationSection from './IterationSection';
import PrototypingSection from './PrototypingSection';
import ContactSection from '@/components/sections/ContactSection';
import CaseStudyHero from './CaseStudyHero';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ caseStudy }) => {
  const [orderedSections, setOrderedSections] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const sections: React.ReactNode[] = [];
    
    // Check for custom sections in the case study data
    console.log("Case study for rendering:", caseStudy);
    
    let customSectionsData: any[] = [];
    
    // Try to parse custom sections if they exist
    try {
      if (caseStudy.customSections) {
        console.log("Custom sections found:", caseStudy.customSections);
        customSectionsData = JSON.parse(caseStudy.customSections as string);
        console.log("Parsed custom sections:", customSectionsData);
      }
    } catch (error) {
      console.error("Failed to parse custom sections:", error);
    }
    
    // If we have custom sections, use them
    if (customSectionsData && customSectionsData.length > 0) {
      console.log("Rendering custom sections:", customSectionsData);
      // Sort sections by order
      const sortedSections = [...customSectionsData].sort((a, b) => a.order - b.order);
      
      // Map each section to its corresponding component
      sortedSections.forEach(section => {
        const componentType = section.type;
        
        switch (componentType) {
          case 'intro':
          case 'introduction':
            // Only render if we need the introduction section
            sections.push(<CaseStudyIntro key={section.id} caseStudy={caseStudy} />);
            break;
          case 'research':
            sections.push(<UserResearchSection key={section.id} caseStudy={caseStudy} />);
            break;
          case 'needs':
            sections.push(<UserNeedsSection key={section.id} caseStudy={caseStudy} />);
            break;
          case 'flow':
            sections.push(<UserFlowSection key={section.id} caseStudy={caseStudy} />);
            break;
          case 'iteration':
            sections.push(<IterationSection key={section.id} caseStudy={caseStudy} />);
            break;
          case 'prototype':
            sections.push(<PrototypingSection key={section.id} caseStudy={caseStudy} />);
            break;
          // Handle other custom section types here
          default:
            console.log(`Custom section type not recognized: ${componentType}`);
            break;
        }
      });
      
      // Log the sections we've prepared for rendering
      console.log(`Prepared ${sections.length} sections for rendering from custom sections`);
    } else {
      // Important change: Don't automatically add all sections as fallback
      // This was causing deleted sections to still appear
      console.log("No custom sections found, NOT using fallback sections");
    }
    
    console.log("Final sections to render:", sections.length);
    setOrderedSections(sections);
  }, [caseStudy]);

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
      {orderedSections}
      <ContactSection />
    </>
  );
};

export default CaseStudyContent;
