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
    
    if (caseStudy.sections && Array.isArray(caseStudy.sections)) {
      const sortedSections = [...caseStudy.sections].sort((a, b) => a.sort_order - b.sort_order);
      
      sortedSections.forEach(section => {
        if (section.component === 'intro') {
          sections.push(<CaseStudyIntro key={section.id} caseStudy={caseStudy} />);
        } 
        else if (section.component === 'research') {
          sections.push(<UserResearchSection key={section.id} caseStudy={caseStudy} />);
        }
        else if (section.component === 'needs') {
          sections.push(<UserNeedsSection key={section.id} caseStudy={caseStudy} />);
        }
        else if (section.component === 'flow') {
          sections.push(<UserFlowSection key={section.id} caseStudy={caseStudy} />);
        }
        else if (section.component === 'iteration') {
          sections.push(<IterationSection key={section.id} caseStudy={caseStudy} />);
        }
        else if (section.component === 'prototype') {
          sections.push(<PrototypingSection key={section.id} caseStudy={caseStudy} />);
        }
      });
    } else {
      sections.push(
        <CaseStudyIntro key="intro" caseStudy={caseStudy} />,
        <UserResearchSection key="research" caseStudy={caseStudy} />,
        <UserNeedsSection key="needs" caseStudy={caseStudy} />,
        <UserFlowSection key="flow" caseStudy={caseStudy} />,
        <IterationSection key="iteration" caseStudy={caseStudy} />,
        <PrototypingSection key="prototype" caseStudy={caseStudy} />
      );
    }
    
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
