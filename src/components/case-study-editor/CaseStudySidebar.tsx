
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CaseStudy } from '@/data/caseStudies';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

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
  const location = useLocation();
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  const isCaseStudiesLanding = location.pathname === '/admin/case-studies';
  const isNewCaseStudy = location.pathname === '/admin/case-studies/new';

  // Update isCreatingNew state based on URL changes
  useEffect(() => {
    if (isNewCaseStudy) {
      setIsCreatingNew(true);
    } else {
      setIsCreatingNew(false);
    }
  }, [location.pathname, isNewCaseStudy]);

  const selectCaseStudy = (slug: string) => {
    // Only navigate if the current slug is different
    if (slug !== currentSlug) {
      navigate(`/admin/case-studies/${slug}`);
    }
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    onCreateNew();
  };

  const goToCaseStudies = () => {
    navigate('/admin/case-studies');
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {/* Case Studies Heading with Plus Button */}
      <div className="flex items-center justify-between mb-3">
        <div 
          className={cn(
            "font-bold flex items-center gap-2 cursor-pointer hover:text-primary transition-colors",
            isCaseStudiesLanding && "text-primary"
          )}
          onClick={goToCaseStudies}
        >
          <FileText className="h-4 w-4" />
          <span>Case Studies</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCreateNew}
          className="h-8 w-8 p-0"
          title="Create new case study"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {/* List of Case Studies */}
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {(isCreatingNew || isNewCaseStudy) && (
          <div className={cn(
            "p-2 rounded font-medium",
            isNewCaseStudy ? "bg-gray-200" : "bg-gray-200 animate-pulse"
          )}>
            <div className="truncate">New Case Study</div>
          </div>
        )}
        
        {caseStudies.length === 0 && !isCreatingNew && !isNewCaseStudy ? (
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
