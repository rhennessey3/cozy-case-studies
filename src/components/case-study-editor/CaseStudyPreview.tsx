
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import CaseStudyContent from '@/components/case-study/CaseStudyContent';

interface CaseStudyPreviewProps {
  caseStudy: CaseStudy;
  showAllSections?: boolean; // Whether to show unpublished sections
}

/**
 * Component for previewing case studies in the editor
 * Can optionally show all sections, including unpublished ones
 */
const CaseStudyPreview: React.FC<CaseStudyPreviewProps> = ({ 
  caseStudy, 
  showAllSections = false 
}) => {
  return (
    <div className="case-study-preview">
      <CaseStudyContent 
        caseStudy={caseStudy} 
        isAdminView={showAllSections} 
      />
    </div>
  );
};

export default CaseStudyPreview;
