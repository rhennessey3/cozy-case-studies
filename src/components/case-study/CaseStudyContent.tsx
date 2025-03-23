
import React, { useEffect } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import ContactSection from '@/components/sections/ContactSection';
import CaseStudyHero from './CaseStudyHero';
import { toast } from 'sonner';
import LegacyCustomSections from './sections/LegacyCustomSections';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
  isAdminView?: boolean;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ caseStudy, isAdminView = false }) => {
  // Dismiss any lingering toasts when viewing a case study
  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <>
      <CaseStudyHero 
        title={caseStudy.title}
        coverImage={caseStudy.coverImage}
        category={caseStudy.category}
        objective={caseStudy.content.challenge}
        approach={caseStudy.content.approach}
        results={caseStudy.content.results}
        objectiveHeading="Challenge"
        approachHeading="Approach"
        resultsHeading="Impact"
      />
      
      {/* Render case study sections from caseStudy.customSections if available */}
      {caseStudy.customSections && <LegacyCustomSections caseStudy={caseStudy} />}
      
      <ContactSection />
    </>
  );
};

export default CaseStudyContent;
