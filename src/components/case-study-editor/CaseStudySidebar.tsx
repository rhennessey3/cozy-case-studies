
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CaseStudy } from '@/data/caseStudies';

interface CaseStudySidebarProps {
  caseStudies: CaseStudy[];
  currentSlug?: string;
}

const CaseStudySidebar: React.FC<CaseStudySidebarProps> = ({ caseStudies, currentSlug }) => {
  const navigate = useNavigate();

  const selectCaseStudy = (slug: string) => {
    navigate(`/admin/case-studies/${slug}`);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-bold mb-3">Case Studies</h3>
      <div className="space-y-2">
        {caseStudies.map(study => (
          <div 
            key={study.id}
            className={cn(
              "p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors",
              study.slug === currentSlug && "bg-gray-200 font-medium"
            )}
            onClick={() => selectCaseStudy(study.slug)}
          >
            {study.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudySidebar;
