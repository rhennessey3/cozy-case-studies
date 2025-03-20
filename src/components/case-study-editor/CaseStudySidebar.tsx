
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CaseStudy } from '@/data/caseStudies';
import { Button } from '@/components/ui/button';
import { Plus, Home } from 'lucide-react';

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
  
  const isAdminHome = location.pathname === '/admin' || location.pathname === '/admin/';

  const selectCaseStudy = (slug: string) => {
    // Only navigate if the current slug is different
    if (slug !== currentSlug) {
      navigate(`/admin/case-studies/${slug}`);
    }
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    onCreateNew();
    // Reset the state after a delay to provide visual feedback
    setTimeout(() => setIsCreatingNew(false), 300);
  };

  const goToAdminHome = () => {
    navigate('/admin');
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {/* Admin Home Link - First item */}
      <div className="mb-4">
        <div 
          className={cn(
            "p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2",
            isAdminHome && "bg-gray-200 font-medium"
          )}
          onClick={goToAdminHome}
        >
          <Home className="h-4 w-4" />
          <div className="truncate">Admin Home</div>
        </div>
      </div>
      
      {/* Case Studies Heading with Plus Button - Second item */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Case Studies</h3>
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
      
      {/* List of Case Studies - Third item */}
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {isCreatingNew && (
          <div className="p-2 rounded bg-gray-200 font-medium animate-pulse">
            <div className="truncate">New Case Study</div>
          </div>
        )}
        
        {caseStudies.length === 0 && !isCreatingNew ? (
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
