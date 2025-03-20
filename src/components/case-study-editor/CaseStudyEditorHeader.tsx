
import React from 'react';
import { Button } from '@/components/ui/button';

interface CaseStudyEditorHeaderProps {
  headingText: string;
  onCreateNew: () => void;
  onViewLive: () => void;
  onLogout: () => void;
  showViewLive: boolean;
}

const CaseStudyEditorHeader: React.FC<CaseStudyEditorHeaderProps> = ({
  headingText,
  onCreateNew,
  onViewLive,
  onLogout,
  showViewLive
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#EAEAEA]">
      <h1 className="text-3xl md:text-4xl font-[900] text-[#1b1b1b]">
        {headingText}
      </h1>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onCreateNew}
        >
          New Case Study
        </Button>
        {showViewLive && (
          <Button
            variant="outline"
            onClick={onViewLive}
          >
            View Live
          </Button>
        )}
        <Button
          variant="outline"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default CaseStudyEditorHeader;
