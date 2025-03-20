
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CaseStudy } from '@/data/caseStudies';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CaseStudySidebarProps {
  caseStudies: CaseStudy[];
  currentSlug?: string;
  onCreateNew: () => void;
}

const CaseStudySidebar: React.FC<CaseStudySidebarProps> = ({ 
  caseStudies, 
  currentSlug,
  onCreateNew
}) => {
  const navigate = useNavigate();

  const selectCaseStudy = (slug: string) => {
    // Only navigate if the current slug is different
    if (slug !== currentSlug) {
      navigate(`/admin/case-studies/${slug}`);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Case Studies</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCreateNew}
          className="h-8 w-8 p-0"
          title="Create new case study"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {caseStudies.length === 0 ? (
          <div className="text-sm text-gray-500 italic p-2">
            No case studies found
          </div>
        ) : (
          caseStudies.map(study => (
            <div 
              key={study.id}
              className={cn(
                "p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors",
                study.slug === currentSlug && "bg-gray-200 font-medium"
              )}
              onClick={() => selectCaseStudy(study.slug)}
            >
              <div className="truncate">{study.title}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CaseStudySidebar;
