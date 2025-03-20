
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

const sectionComponents = {
  intro: CaseStudyIntro,
  research: UserResearchSection,
  needs: UserNeedsSection,
  flow: UserFlowSection,
  iteration: IterationSection,
  prototype: PrototypingSection
};

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
    } else if (caseStudy.sections && Array.isArray(caseStudy.sections)) {
      // Fall back to regular sections if present
      // Sort sections by sort_order
      const sortedSections = [...caseStudy.sections].sort((a, b) => a.sort_order - b.sort_order);
      
      // Map each section to its corresponding component
      sortedSections.forEach(section => {
        const componentType = section.component;
        
        switch (componentType) {
          case 'intro':
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
          default:
            // Handle custom section types here if needed
            break;
        }
      });
    } else {
      // Fallback to the default order if no sections are defined
      sections.push(
        <CaseStudyIntro key="intro" caseStudy={caseStudy} />,
        <UserResearchSection key="research" caseStudy={caseStudy} />,
        <UserNeedsSection key="needs" caseStudy={caseStudy} />,
        <UserFlowSection key="flow" caseStudy={caseStudy} />,
        <IterationSection key="iteration" caseStudy={caseStudy} />,
        <PrototypingSection key="prototype" caseStudy={caseStudy} />
      );
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
