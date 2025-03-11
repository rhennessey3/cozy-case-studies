
import React from 'react';
import { caseStudies } from '@/data/caseStudies';
import CaseStudyCard from './CaseStudyCard';

const CaseStudiesGrid = () => {
  return (
    <section id="case-studies" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="masonry-grid">
          {caseStudies.map((study) => (
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
