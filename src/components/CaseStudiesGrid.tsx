
import React from 'react';
import { CaseStudy } from '@/data/caseStudies';
import CaseStudyCard from './CaseStudyCard';
import { Loader2 } from 'lucide-react';

interface CaseStudiesGridProps {
  caseStudies: CaseStudy[];
  isLoading?: boolean;
  error?: Error | null;
}

const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({ 
  caseStudies, 
  isLoading = false,
  error = null 
}) => {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-cozy-500" />
        <h3 className="text-xl text-cozy-700">Loading case studies...</h3>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg mx-4">
        <h3 className="text-2xl text-red-600 mb-2">Could not load case studies</h3>
        <p className="text-red-500">{error.message}</p>
        <p className="text-cozy-500 mt-4">Using local fallback data instead.</p>
      </div>
    );
  }

  // Handle empty state
  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl text-cozy-700">No case studies found</h3>
        <p className="text-cozy-500 mt-2">
          Please check your Strapi connection and make sure you have case studies created.
        </p>
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
