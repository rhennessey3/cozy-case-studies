
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import CaseStudyCard from './CaseStudyCard';

interface CaseStudiesGridProps {
  caseStudies: CaseStudy[];
}

const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({ caseStudies }) => {
  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl text-cozy-700">No case studies found</h3>
        <p className="text-cozy-500 mt-2">Please check back later for new content.</p>
      </div>
    );
  }

  return (
    <section id="case-studies" className="px-4 w-full py-[9px]">
      <div className="mx-auto max-w-screen-2xl">
        <div className="masonry-grid">
          {caseStudies.map(study => (
            <div key={study.id} className="masonry-item">
              <CaseStudyCard caseStudy={study} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesGrid;
