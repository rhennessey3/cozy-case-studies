
import React, { useEffect } from 'react';
import { CaseStudy } from '@/data/caseStudies';
import ContactSection from '@/components/sections/ContactSection';
import CaseStudyHero from './CaseStudyHero';
import { toast } from 'sonner';
import { useAdminCaseStudySections, usePublicCaseStudySections } from '@/hooks/case-study';
import DatabaseSections from './sections/DatabaseSections';
import LegacyCustomSections from './sections/LegacyCustomSections';
import NoSectionsMessage from './sections/NoSectionsMessage';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
  isAdminView?: boolean;
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ caseStudy, isAdminView = false }) => {
  // Dismiss any lingering toasts when viewing a case study
  useEffect(() => {
    toast.dismiss();
  }, []);

  // Use the appropriate hook based on whether we're in admin view or public view
  const adminResult = isAdminView ? useAdminCaseStudySections(caseStudy?.id) : { dbSections: [], loading: false, error: null };
  const publicResult = !isAdminView ? usePublicCaseStudySections(caseStudy?.id) : { dbSections: [], loading: false, error: null };
  
  // Choose the correct result based on view mode
  const { dbSections, loading, error } = isAdminView ? adminResult : publicResult;
  
  // Log data for debugging
  useEffect(() => {
    console.log("Case study for rendering:", caseStudy);
    console.log(`Database sections for rendering (${isAdminView ? 'admin view' : 'public view'}):`, dbSections);
    
    if (error) {
      console.error("Error loading sections:", error);
    }
  }, [caseStudy, dbSections, error, isAdminView]);

  const renderSections = () => {
    // Use DB sections if available
    if (dbSections && dbSections.length > 0) {
      console.log(`Rendering ${dbSections.length} sections from database`);
      return <DatabaseSections sections={dbSections} isAdminView={isAdminView} />;
    } 
    // If no DB sections but we have custom sections in JSON
    else if (caseStudy.customSections) {
      console.log("No database sections found, checking for customSections JSON");
      return <LegacyCustomSections caseStudy={caseStudy} />;
    } 
    else {
      console.log("No sections found (neither in database nor in custom sections JSON)");
      return <NoSectionsMessage />;
    }
  };

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
      
      {loading ? (
        <div className="max-w-5xl mx-auto my-12 p-6 text-center">
          <p className="text-gray-500">Loading case study sections...</p>
        </div>
      ) : (
        renderSections()
      )}
      
      <ContactSection />
    </>
  );
};

export default CaseStudyContent;
